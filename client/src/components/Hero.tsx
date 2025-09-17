import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Target, TrendingUp, Globe } from "lucide-react";
import heroImage from '@assets/generated_images/Professional_business_hero_background_cbae5f06.png';
import { Vortex } from "@/components/ui/vortex";
import { useEffect, useState } from "react";
import HeroBadge from "@/components/ui/hero-badge";
import { Icons } from "@/components/ui/icons";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookCall = () => {
    window.open('https://skool.com/elite-dealmakers-placeholder', '_blank');
  };

  const handleWatchDemo = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if section doesn't exist yet
      console.log('Services section not found - scrolling to placeholder');
    }
  };

  const FloatingElement = ({ children, delay, duration, amplitude }: any) => (
    <div
      className={`absolute animate-pulse`}
      style={{
        animation: `float ${duration}s ease-in-out infinite ${delay}s`,
      }}
    >
      {children}
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted animate-pulse" />
      
      {/* Vortex Animation Background */}
      <Vortex
        backgroundColor="transparent"
        particleCount={isMobile ? 150 : 350}
        baseHue={180}
        rangeY={300}
        baseSpeed={isMobile ? 0.3 : 0.5}
        rangeSpeed={isMobile ? 1.0 : 1.5}
        baseRadius={2}
        rangeRadius={4}
        containerClassName="absolute inset-0 opacity-50 z-10"
      />
      
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      >
        <img
          src={heroImage}
          alt="Professional business background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60" />
      </div>

      {/* Floating Background Elements - Behind Text */}
      <div className="absolute inset-0 z-20">
        {/* Large Floating Orbs */}
        <FloatingElement delay={0} duration={8} amplitude={30}>
          <div 
            className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/10 to-primary/20 blur-2xl"
            style={{ top: '15%', left: '10%' }}
          />
        </FloatingElement>
        
        <FloatingElement delay={2} duration={10} amplitude={25}>
          <div 
            className="w-24 h-24 rounded-full bg-gradient-to-l from-primary/15 to-primary/5 blur-xl"
            style={{ top: '70%', right: '15%' }}
          />
        </FloatingElement>
        
        <FloatingElement delay={4} duration={12} amplitude={20}>
          <div 
            className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/8 to-primary/3 blur-3xl"
            style={{ top: '40%', right: '5%' }}
          />
        </FloatingElement>

        <FloatingElement delay={1} duration={9} amplitude={35}>
          <div 
            className="w-20 h-20 rounded-full bg-gradient-to-t from-primary/12 to-primary/4 blur-xl"
            style={{ bottom: '20%', left: '5%' }}
          />
        </FloatingElement>

        {/* Medium Floating Icons */}
        <FloatingElement delay={1.5} duration={7} amplitude={15}>
          <div style={{ top: '25%', right: '20%' }}>
            <Zap className="h-8 w-8 text-primary/30" />
          </div>
        </FloatingElement>

        <FloatingElement delay={3.5} duration={6} amplitude={20}>
          <div style={{ bottom: '30%', right: '30%' }}>
            <Target className="h-6 w-6 text-primary/25" />
          </div>
        </FloatingElement>

        <FloatingElement delay={2.5} duration={8} amplitude={18}>
          <div style={{ top: '60%', left: '15%' }}>
            <TrendingUp className="h-7 w-7 text-primary/35" />
          </div>
        </FloatingElement>

        <FloatingElement delay={4.5} duration={5.5} amplitude={22}>
          <div style={{ top: '35%', left: '20%' }}>
            <Globe className="h-5 w-5 text-primary/20" />
          </div>
        </FloatingElement>

        {/* Small Floating Particles - Distributed */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingElement key={i} delay={i * 0.4} duration={6 + (i % 4)} amplitude={8 + (i % 3) * 5}>
            <div
              className="w-1.5 h-1.5 rounded-full bg-primary/20"
              style={{
                top: `${15 + (i % 8) * 10}%`,
                left: `${10 + (i % 7) * 12}%`,
              }}
            />
          </FloatingElement>
        ))}

        {/* Geometric Shapes */}
        <FloatingElement delay={3} duration={11} amplitude={12}>
          <div 
            className="w-6 h-6 border border-primary/20 rotate-45"
            style={{ top: '20%', left: '70%' }}
          />
        </FloatingElement>

        <FloatingElement delay={5} duration={9} amplitude={16}>
          <div 
            className="w-4 h-4 bg-primary/15 rotate-12"
            style={{ bottom: '25%', left: '80%' }}
          />
        </FloatingElement>

        <FloatingElement delay={1.8} duration={7} amplitude={14}>
          <div 
            className="w-3 h-3 border-2 border-primary/25 rounded-full"
            style={{ top: '80%', right: '60%' }}
          />
        </FloatingElement>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(132, 204, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 204, 22, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-h-screen flex items-center justify-center">
        <div className="space-y-6 sm:space-y-8">
          {/* Announcement Banner */}
          <div className="flex justify-center animate-fadeInUp px-4">
            <HeroBadge
              text="For Entrepreneurs, Agency Owners & Developers"
              icon={<Icons.users className="h-3 w-3 sm:h-4 sm:w-4" />}
              endIcon={<Icons.chevronRight className="h-3 w-3 sm:h-4 sm:w-4" />}
              variant="outline"
              size="md"
              className="bg-black/20 backdrop-blur-sm border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 max-w-full text-center whitespace-nowrap overflow-hidden text-ellipsis sm:whitespace-normal"
              data-testid="badge-announcement"
            />
          </div>

          {/* Main Headline */}
          <div className="space-y-4 animate-fadeInUp">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight transform transition-all duration-1000 hover:scale-105 px-2 sm:px-0" 
              data-testid="text-hero-headline"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'textShimmer 3s ease-in-out infinite alternate'
              }}
            >
              You're One Step Away From Learning How To Build A Wildly Profitable AI Business.
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fadeInUp delay-500 px-4 sm:px-0">
            <Button
              size="lg"
              className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 h-auto w-full sm:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              onClick={handleBookCall}
              data-testid="button-join-community"
            >
              Join Elite Community
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 h-auto w-full sm:w-auto transform transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-background/10 border-primary/50"
              onClick={handleWatchDemo}
              data-testid="button-see-inside"
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300" />
              See What's Inside
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}