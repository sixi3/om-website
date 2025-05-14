import React from "react";
import { TiltCard } from "../components/ui/tilt-card";
import { GridBackground } from "../components/ui/grid-background";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const missionContent = {
  title: "Our Mission",
  body: (
    <p>
      At OneMoney, our mission is to empower individuals and businesses with secure, consent-driven access to financial data, fostering transparency, innovation, and financial inclusion.
      <br /><br />
      We aim to create a seamless digital ecosystem that unlocks the potential of data to enable informed decision-making, personalised financial solutions, and equitable growth for all stakeholders. Through cutting-edge technology and unwavering commitment to trust, we strive to redefine the way financial information is shared and utilised.
    </p>
  ),
};

const visionContent = {
  title: "Our Vision",
  body: (
    <>
      <p className="mb-3">A future where:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Every Indian citizen, regardless of socioeconomic status, has equal access to tailored financial products and services.</li>
        <li>Fostering a financially inclusive society where finance is democratised & consent is key.</li>
        <li>Even the most underserved communities are empowered to achieve their financial goals.</li>
      </ul>
    </>
  ),
};

// Simple Bento Grid Placeholder Component
const BentoGridPlaceholder = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 md:my-12 p-4">
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
       <p className="text-center mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        (Placeholder bento grid - replace with actual images and layout as needed)
      </p>
    </div>
  );
};


export default function VisionMissionPage() {
  return (
    <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Vision & Mission</span>
          </h1>
        </div>

        {/* Content Sections */}
        <div
          className="flex flex-col items-center gap-8 md:gap-12 max-w-4xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {/* Mission Section */}
          <TiltCard
            className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
          >
            <div className="relative z-20 text-foreground/90">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                {missionContent.title}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {missionContent.body}
              </div>
            </div>
          </TiltCard>

          {/* Bento Grid Section Placeholder */}
          <BentoGridPlaceholder />

          {/* Vision Section */}
          <TiltCard
            className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
          >
            <div className="relative z-20 text-foreground/90">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                {visionContent.title}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {visionContent.body}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </main>
  );
} 