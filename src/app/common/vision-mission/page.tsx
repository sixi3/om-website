import React from "react";
import { TiltCard } from "../../onemoney/components/ui/tilt-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { MainHeader } from "@/components/global/MainHeader";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const visionContent = {
  title: "Our Vision",
  body: (
    <p>
      At Equal, we envision a future where every Indian — from urban professionals to rural entrepreneurs — can access secure, seamless, and consent-driven financial services with complete trust and transparency. India stands at the forefront of digital transformation, powered by initiatives like Aadhaar, UPI, and the Account Aggregator framework. Equal aspires to be the enabling infrastructure behind this shift — providing the trusted rails for KYC onboarding and verification, Account Aggregator connectivity, and FIU/FIP TSP platform services that power financial institutions, NBFCs, fintechs, and public utilities. Our goal is to simplify and standardize how individuals and institutions share and consume financial data. We believe access to finance should not be limited by location, literacy, or legacy systems. Through our secure and scalable platforms, we enable faster onboarding, real-time data access, and meaningful financial inclusion — all while ensuring compliance with India’s evolving data privacy and regulatory frameworks. In a rapidly digitizing economy, Equal stands for fairness, transparency, and interoperability. By creating trust-first infrastructure for data and identity, we aim to become the backbone of India’s digital financial future — where every citizen’s data works for them, not against them. We are Equal — powering trust, access, and opportunity in India’s digital economy.
    </p>
  ),
};

// Simple Bento Grid Placeholder Component
const BentoGridPlaceholder = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 md:my-12 p-4">
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${metallicBlackTextClasses}`}>
        Gallery
      </h2>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px]">
        {/* Replace these divs with your Image components */}
        <div className="col-span-2 row-span-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500">Image 1 (2x2)</div>
        <div className="col-span-1 row-span-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500">Image 2 (1x1)</div>
        <div className="col-span-1 row-span-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500">Image 3 (1x1)</div>
        <div className="col-span-1 row-span-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500">Image 4 (1x1)</div>
        <div className="col-span-2 row-span-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500">Image 5 (2x1)</div>
      </div>
    </div>
  );
};


export default function VisionMissionPage() {
  return (
    <AuroraBackground>
      <BackgroundGrid />
      <MainHeader />
      
      <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
        </div>
        <div className="container px-4 md:px-6 mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className={metallicBlackTextClasses}>The Equal Vision</span>
            </h1>
            <p className="text-center mt-4 text-md text-neutral-500 dark:text-neutral-400">
              Equal is a platform that allows you to share your data with the world, safely and securely with your consent
            </p>
          </div>

          {/* Content Sections */}
          <div
            className="flex flex-col items-center gap-8 md:gap-12 max-w-7xl mx-auto"
            style={{ perspective: '1000px' }}
          >
            {/* Mission Section */}
            <TiltCard
              className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
            >
              <div className="relative z-20 text-foreground/90">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                  {visionContent.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-md md:text-lg">
                  {visionContent.body}
                </div>
              </div>
            </TiltCard>

            {/* Bento Grid Section Placeholder */}
            <BentoGridPlaceholder />
          </div>
        </div>
      </main>
    </AuroraBackground>
  );
} 