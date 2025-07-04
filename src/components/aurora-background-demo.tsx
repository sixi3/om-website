"use client";

import React from "react";
import { AuroraBackground } from '@/components/ui/aurora-background';
import { MainHeader } from "@/components/global/MainHeader";
import { HeroSection } from "./aurora-background-demo/components/HeroSection";
import { ModularSolutions } from "./aurora-background-demo/components/ModularSolutions";

export default function AuroraBackgroundDemo() {
  return (
    <>
      <MainHeader />
      <AuroraBackground className="min-h-full">
        <div className="relative flex flex-col min-h-screen w-full">
          <HeroSection />
          <ModularSolutions />
        </div>
      </AuroraBackground>
    </>
  );
} 