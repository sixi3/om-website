"use client";

import React from "react";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';
import { MainHeader } from "@/components/global/MainHeader";
import { HeroSection } from "./aurora-background-demo/components/HeroSection";
import { ModularSolutions } from "./aurora-background-demo/components/ModularSolutions";
import { Team } from "./aurora-background-demo/components/Team";
import { BoardOfDirectors } from "./aurora-background-demo/components/BoardOfDirectors";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { BackgroundGrid } from "@/components/ui/background-grid";

export default function AuroraBackgroundDemo() {
  return (
    <>
      <MainHeader />
      <AuroraBackground className="min-h-full">
        {/* Subtle vertical grid lines for guiding users */}
        <BackgroundGrid zIndex={1} />
        <div className="relative flex flex-col min-h-screen w-full z-10">
          <HeroSection />
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.2}
            className="my-8 md:my-16"
          />
          <ModularSolutions />
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.4}
            className="my-8 md:my-16"
          />
          <Team />
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.6}
            className="my-8 md:my-16"
          />
          <BoardOfDirectors />
        </div>
      </AuroraBackground>
    </>
  );
} 