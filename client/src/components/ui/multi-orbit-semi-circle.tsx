"use client";
import React, { useState, useEffect } from "react";
import { Vortex } from "@/components/ui/vortex";
import { useIsMobile } from "@/hooks/use-mobile";

// B2B Lead Generation and Automation Tools  
const TOOL_ICONS = [
  { name: "Apollo.com", logo: "/logos/apollo logo_1757760025438.png" },
  { name: "PhantomBuster", logo: "/logos/phantombuster logo_1757760062255.png" },
  { name: "Instantly", logo: "/logos/instantly logo_1757760093767.png" },
  { name: "SmartLead", logo: "/logos/smartlead logo_1757760123897.png" },
  { name: "Clay.com", logo: "/logos/clay logo_1757760151990.jpeg" },
  { name: "n8n", logo: "/logos/n8n logo_1757760184209.png" },
  { name: "Make.com", logo: "/logos/make logo_1757760238488.jpeg" },
  { name: "Zapier", logo: "/logos/zapier logo_1757760271585.png" },
  { name: "Airtable", logo: "/logos/airtble logo_1757760334893.png" },
  { name: "Google Sheets", logo: "/logos/sheets logo_1757760385924.png" },
  { name: "Calendly", logo: "/logos/calendly logo_1757760418292.png" },
  { name: "Zoom", logo: "/logos/zoom logo_1757760458433.png" },
  { name: "Claude", logo: "/logos/claude logo_1757760487838.png" },
  { name: "ChatGPT", logo: "/logos/chatgot logo_1757760575794.png" },
  { name: "Groq", logo: "/logos/groq logo_1757760517412.png" },
  { name: "Slack", logo: "/logos/slack logo_1757760544760.png" },
  { name: "Hostinger", logo: "/logos/hostinger logo_1757760606232.png" },
  { name: "WarmupInbox", logo: "/logos/warmup logo_1757760642433.png" },
];

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex }: any) {
  return (
    <>
      {/* Semi-circle glow background with cyan theme */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const tool = TOOL_ICONS[startIndex + index];

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            <div
              className="
                flex items-center justify-center 
                rounded-2xl bg-white border border-card-border
                cursor-pointer transition-all duration-300 
                hover:scale-110 hover:border-primary/50
                shadow-lg hover:shadow-xl
                backdrop-blur-sm
                p-2
              "
              style={{ 
                width: iconSize, 
                height: iconSize,
                minWidth: iconSize, 
                minHeight: iconSize 
              }}
              data-testid={`tool-icon-${tool.name.toLowerCase()}`}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain"
                style={{ 
                  maxWidth: iconSize * 0.8, 
                  maxHeight: iconSize * 0.8 
                }}
              />
            </div>

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
              } hidden group-hover:block w-max rounded-lg bg-black/90 backdrop-blur-sm px-3 py-2 text-xs text-white shadow-lg text-center border border-primary/20`}
              data-testid={`tooltip-${tool.name.toLowerCase()}`}
            >
              {tool.name}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/90 border border-primary/20 ${
                  tooltipAbove ? "top-full -mt-1.5" : "bottom-full -mb-1.5"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const baseWidth = Math.min(size.width * 0.8, 700);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(32, baseWidth * 0.06)
      : size.width < 768
      ? Math.max(40, baseWidth * 0.07)
      : Math.max(48, baseWidth * 0.08);

  return (
    <section className="py-24 relative min-h-screen w-full overflow-hidden bg-black">
      <Vortex
        backgroundColor="transparent"
        particleCount={isMobile ? 150 : 350}
        baseHue={180}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        containerClassName="w-full h-full"
        baseSpeed={isMobile ? 0.05 : 0.1}
        rangeSpeed={isMobile ? 0.5 : 1.0}
      >
        <div className="relative flex flex-col items-center text-center z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white" data-testid="text-tools-title">
            Tools We Teach You To Use
          </h2>
          <p className="mb-16 max-w-2xl text-gray-400 text-lg lg:text-xl" data-testid="text-tools-description">
            Connect your favourite apps to your workflow with our comprehensive suite of B2B tools and integrations.
          </p>

          <div
            className="relative"
            style={{ width: baseWidth, height: baseWidth * 0.6 }}
            data-testid="tools-orbit-container"
          >
            <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={6} iconSize={iconSize} startIndex={0} />
            <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={6} iconSize={iconSize} startIndex={6} />
            <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} count={6} iconSize={iconSize} startIndex={12} />
          </div>

          <p className="mt-12 text-gray-500 text-lg" data-testid="text-tools-more">
            ...and many more
          </p>
        </div>
      </Vortex>
    </section>
  );
}