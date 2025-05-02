import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


// Updated content - Added startTime and endTime for video segments
const stepsContent = [
  {
    title: "Step 1: Connect Your Accounts",
    description:
      "Securely link your financial accounts using our consent-driven platform. Your data remains encrypted and under your control.",
    startTime: 0,
    endTime: 18,
  },
  {
    title: "Step 2: Grant Consent",
    description:
      "Review and approve data access requests from verified institutions. You decide who sees your data and for how long.",
    startTime: 18,
    endTime: 32,
  },
  {
    title: "Step 3: Share Securely",
    description:
      "OneMoney facilitates the secure transfer of your financial data based on your explicit consent, enabling faster services.",
    startTime: 32,
    endTime: 43, // Or videoDuration if known
  },
];

// Copied from Solutions.tsx for consistency
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Use the local video file from the public directory
const localVideoSrc = "/2025-05-01 22-21-31 (1).mp4";

export function WhatIsOneMoney() {
  return (
    <section className="w-full py-24">
      <div className="container px-4 md:px-6 mx-auto mb-12 md:mb-16">
        {/* Title and Subtitle */}
        <div className="text-center">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>How</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              OneMoney
            </span>{" "}
            <span className={metallicBlackTextClasses}>Works</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-lg text-slate-700 dark:text-slate-300">
            Experience a seamless and secure way to manage and share your financial data, all powered by your consent.
          </p>
        </div>
      </div>

      {/* Sticky Scroll Component Integration with video */}
      <div className="px-4 md:px-6 lg:px-8">
        <StickyScroll 
          content={stepsContent} 
          videoSrc={localVideoSrc} // Pass the local video source
        />
      </div>
    </section>
  );
} 