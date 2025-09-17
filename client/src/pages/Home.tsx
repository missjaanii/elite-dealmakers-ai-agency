import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semi-circle";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const isMobile = useIsMobile();

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Show preloader only on desktop devices
  if (showPreloader && !isMobile) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <MultiOrbitSemiCircle />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}