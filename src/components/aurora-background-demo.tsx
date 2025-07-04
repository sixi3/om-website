"use client";

import React from "react";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';
import { MainHeader } from "@/components/global/MainHeader";
import { HeroSection } from "./aurora-background-demo/components/HeroSection";
import { ModularSolutions } from "./aurora-background-demo/components/ModularSolutions";
import { Team } from "./aurora-background-demo/components/Team";
import { BoardOfDirectors } from "./aurora-background-demo/components/BoardOfDirectors";

export default function AuroraBackgroundDemo() {
  return (
    <>
      <MainHeader />
      <AuroraBackground className="min-h-full">
        <div className="relative flex flex-col min-h-screen w-full">
          <HeroSection />
          <ModularSolutions />
          <Team />
          <BoardOfDirectors />
        </div>
      </AuroraBackground>
    </>
  );
} 