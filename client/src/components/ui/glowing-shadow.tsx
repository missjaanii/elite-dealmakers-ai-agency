"use client"

import { useEffect, type ReactNode } from "react"

interface GlowingShadowButtonProps {
  children: ReactNode
}

export function GlowingShadow({ children }: GlowingShadowButtonProps) {
  
  useEffect(() => {
    // Inject CSS properties if not already present
    if (!document.querySelector('#glowing-shadow-styles')) {
      const style = document.createElement('style')
      style.id = 'glowing-shadow-styles'
      style.textContent = `
        @property --hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 120;
        }
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-translate-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --glow-radius {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --white-shadow {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .glow-container {
          --card-color: hsl(0 0% 0%);
          --text-color: hsl(0 0% 100%);
          --card-radius: 12px;
          --border-width: 2px;
          --bg-size: 1;
          --hue: 180;
          --hue-speed: 0;
          --rotate: 0;
          --animation-speed: 4s;
          --interaction-speed: 0.55s;
          --glow-scale: 1.5;
          --scale-factor: 1;
          --glow-blur: 6;
          --glow-opacity: 0.4;
          --glow-radius: 100;
          --glow-rotate-unit: 1deg;

          width: 100%;
          height: 100%;
          color: white;
          display: flex;
          align-items: stretch;
          justify-content: center;
          position: relative;
          z-index: 2;
          border-radius: var(--card-radius);
          cursor: pointer;
        }

        .glow-container:before,
        .glow-container:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        .glow-content {
          position: relative; 
          background: var(--card-color);
          border-radius: calc(var(--card-radius) * 0.9);
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }

        .glow-content:before {
          content: "";
          display: block;
          position: absolute;
          width: calc(100% + var(--border-width));
          height: calc(100% + var(--border-width));
          top: calc(var(--border-width) * -0.5);
          left: calc(var(--border-width) * -0.5);
          border-radius: var(--card-radius);
          box-shadow: 0 0 20px black;
          mix-blend-mode: color-burn;
          z-index: -1;
          background: hsl(0deg 0% 8%) radial-gradient(
            30% 30% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            hsl(180deg 100% 50%) calc(0% * var(--bg-size)),
            hsl(180deg 100% 40%) calc(20% * var(--bg-size)),
            hsl(180deg 100% 30%) calc(40% * var(--bg-size)),
            transparent 100%
          );
          animation: rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow {
          display: none;
        }


        .glow-container:hover .glow-content {
          mix-blend-mode: darken;
          --text-color: white;
        }

        .glow-container:hover .glow-content:before {
          --bg-size: 4;
          animation-play-state: paused;
          transition: --bg-size var(--interaction-speed) ease;
        }



        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }


      `
      document.head.appendChild(style)
    }
  }, [])
   
  return (
    <div className="glow-container" role="button">
      <span className="glow"></span>
      <div className="glow-content">{children}</div>
    </div>
  )
}