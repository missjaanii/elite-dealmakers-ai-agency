"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    // Check if particle is close enough to its target to slow down
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    // Add force towards target
    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    // Move particle
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    // Blend towards target color
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    // Calculate current color
    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.fillRect(this.pos.x, this.pos.y, 3, 3)
    } else {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      // Set target outside the scene
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 1.5)
      this.target.x = randomPos.x
      this.target.y = randomPos.y

      // Increase speed for dramatic dispersal effect
      this.maxSpeed = Math.random() * 15 + 10
      this.maxForce = this.maxSpeed * 0.1

      // Begin blending color to black for fade out effect
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.colorBlendRate = 0.02 // Faster fade to black

      this.isKilled = true
    }
  }

  private generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }
}

interface ParticleTextEffectProps {
  words?: string[]
  onComplete?: () => void
  limeGreen?: boolean
}

const DEFAULT_WORDS = ["Elite Dealmakers"]

export function ParticleTextEffect({ words = DEFAULT_WORDS, onComplete, limeGreen = true }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const completedWordsRef = useRef(0)
  const isDispersingRef = useRef(false)
  const dispersalStartedRef = useRef(false)

  const drawAsPoints = true

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    // Account for device pixel ratio for high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1
    const isMobile = canvas.width <= 768
    
    // Create off-screen canvas for text rendering with proper scaling
    const offscreenCanvas = document.createElement("canvas")
    const scaledWidth = canvas.width * devicePixelRatio
    const scaledHeight = canvas.height * devicePixelRatio
    offscreenCanvas.width = scaledWidth
    offscreenCanvas.height = scaledHeight
    const offscreenCtx = offscreenCanvas.getContext("2d")!
    
    // Scale context for high-DPI displays
    offscreenCtx.scale(devicePixelRatio, devicePixelRatio)

    // Calculate responsive font size - larger on mobile for better particle formation
    let fontSize
    if (isMobile) {
      // Use a larger percentage of screen for better particle density
      const baseSize = Math.min(canvas.width, canvas.height) * 0.12
      fontSize = Math.max(24, Math.min(50, baseSize))
      
      // Ensure text fits within 85% of screen width
      offscreenCtx.font = `bold ${fontSize}px Arial`
      const testMetrics = offscreenCtx.measureText(word)
      if (testMetrics.width > canvas.width * 0.85) {
        fontSize = Math.max(24, fontSize * (canvas.width * 0.85) / testMetrics.width)
      }
    } else {
      fontSize = 80
    }

    // Draw text with improved settings
    offscreenCtx.fillStyle = "white"
    offscreenCtx.font = `bold ${fontSize}px Arial`
    offscreenCtx.textAlign = "center"
    offscreenCtx.textBaseline = "middle"
    
    // Add subtle letter spacing for better particle separation
    if (isMobile) {
      offscreenCtx.letterSpacing = "1px"
    }
    
    offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)

    // Get image data from the scaled canvas
    const imageData = offscreenCtx.getImageData(0, 0, scaledWidth, scaledHeight)
    const pixels = imageData.data

    // Cyan color (#00ffff)
    const cyanColor = { r: 0, g: 255, b: 255 }
    const newColor = limeGreen ? cyanColor : {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }

    const particles = particlesRef.current
    let particleIndex = 0

    // Adjust pixel sampling density based on device type
    const pixelSteps = isMobile ? 2 : 4 // Higher density sampling on mobile for better text formation

    // Collect coordinates
    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i)
    }

    // Shuffle coordinates for fluid motion
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex
      const alpha = pixels[pixelIndex + 3]

      if (alpha > 0) {
        // Scale coordinates back to canvas dimensions
        const x = ((pixelIndex / 4) % scaledWidth) / devicePixelRatio
        const y = Math.floor((pixelIndex / 4) / scaledWidth) / devicePixelRatio

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()

          const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y

          // Adjust particle properties for mobile - slower, more precise movement
          if (isMobile) {
            particle.maxSpeed = Math.random() * 4 + 3 // Slower speed for better convergence
            particle.maxForce = particle.maxSpeed * 0.08 // Higher force for better text formation
            particle.particleSize = Math.random() * 3 + 3 // Smaller particles for mobile
            particle.closeEnoughTarget = 50 // Tighter convergence
            particle.colorBlendRate = Math.random() * 0.015 + 0.008
          } else {
            particle.maxSpeed = Math.random() * 8 + 6
            particle.maxForce = particle.maxSpeed * 0.05
            particle.particleSize = Math.random() * 4 + 4
            particle.colorBlendRate = Math.random() * 0.02 + 0.01
          }

          particles.push(particle)
        }

        // Set color transition
        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor
        particle.colorWeight = 0

        particle.target.x = x
        particle.target.y = y
      }
    }

    // Kill remaining particles
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Background with motion blur
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, drawAsPoints)

      // Remove dead particles that are out of bounds
      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1)
        }
      }
    }

    // Hold "Elite Dealmakers" for longer on mobile to ensure proper formation
    frameCountRef.current++
    const canvasIsMobile = canvas.width <= 768
    const holdFrames = canvasIsMobile ? 360 : 240 // 6 seconds on mobile, 4 seconds on desktop
    
    if (frameCountRef.current >= holdFrames && !dispersalStartedRef.current) {
      // Start dispersing particles
      dispersalStartedRef.current = true
      isDispersingRef.current = true
      
      // Kill all particles to create dramatic dispersal effect
      particles.forEach((particle) => {
        particle.kill(canvas.width, canvas.height)
      })
    }
    
    // Check if all particles have dispersed
    if (isDispersingRef.current && particles.length === 0 && onComplete) {
      // All particles have been removed, complete the preloader
      setTimeout(() => {
        onComplete()
      }, 200)
      return
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Better mobile viewport handling
    const getCanvasSize = () => {
      // Use document.documentElement for more reliable viewport on mobile
      const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      
      // For mobile devices, use viewport dimensions but ensure minimum usable space
      const isMobile = viewportWidth <= 768
      
      if (isMobile) {
        // Use visual viewport if available (better for mobile browsers)
        const visualViewport = (window as any).visualViewport
        const width = visualViewport?.width || viewportWidth
        const height = visualViewport?.height || viewportHeight
        
        // Ensure minimum dimensions for text visibility
        return {
          width: Math.max(width, 320), // Minimum iPhone SE width
          height: Math.max(height, 480) // Minimum usable height
        }
      }
      
      return {
        width: viewportWidth,
        height: viewportHeight
      }
    }

    const { width, height } = getCanvasSize()
    canvas.width = width
    canvas.height = height

    // Initialize with first word
    nextWord(words[0], canvas)

    // Start animation
    animate()

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      // Debounce resize to avoid performance issues on mobile
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (canvas) {
          const { width, height } = getCanvasSize()
          canvas.width = width
          canvas.height = height
          // Re-initialize text after resize
          nextWord(words[0], canvas)
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    // Listen for orientation changes on mobile
    window.addEventListener('orientationchange', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-full max-h-full"
        style={{ 
          touchAction: 'none', // Prevent mobile scroll issues
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      />
    </div>
  )
}