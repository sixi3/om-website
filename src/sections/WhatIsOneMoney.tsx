'use client';

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
// import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"; // Removed StickyScroll import
import { GridBackground } from "@/components/ui/grid-background";
import { ClayPhoneMockup } from "@/components/ui/ClayPhoneMockup"; // Added import
import { UserJourneyAnimation } from "@/components/UserJourneyAnimation"; // Added import (will be created next)


// Updated content - startTime and endTime will be removed in a later step
const stepsContent = [
  {
    title: "Step 1: Secure OTP Login",
    description:
      "Enter your mobile number and verify with a secure One-Time Password to begin the process. Your identity is confirmed swiftly and safely.",
    // startTime: 0, // To be removed
    // endTime: 18,  // To be removed
  },
  {
    title: "Step 2: Review & Grant Consent",
    description:
      "Carefully review the data access request, choose the accounts you wish to share, and grant explicit consent. You are in full control.",
    // startTime: 18, // To be removed
    // endTime: 32,   // To be removed
  },
  {
    title: "Step 3: Action & Confirmation",
    description:
      "The platform securely processes your request based on your consent. Receive instant confirmation once the action is successfully completed.",
    // startTime: 32, // To be removed
    // endTime: 43,   // To be removed
  },
];

// Copied from Solutions.tsx for consistency
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// const localVideoSrc = "/test-1.webm"; // Removed video source

export function WhatIsOneMoney() {
  const [currentActiveCardIndex, setCurrentActiveCardIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleStageChange = useCallback((index: number) => {
    setCurrentActiveCardIndex(index);
  }, []);

  // Durations for progress bar fill animations (in seconds)
  const progressBarFillDurations = [4.4, 5.7, 3.0];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint is 768px
    };
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24">
      <GridBackground />
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
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
            Experience a seamless and secure way to manage and share your financial data, all powered by your consent.
          </p>
        </div>
      </div>

      {/* Main content: flex-col by default, md:grid for larger screens */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:grid md:grid-cols-2 md:gap-12 items-start">
        {/* Card container: order-1 on small screens, md:order-none for grid */}
        <div className="w-full md:order-none mb-8 md:mb-0">
          {isSmallScreen ? (
            // Mobile: Carousel View (only active card with slide animation)
            <AnimatePresence mode="wait">
              {/* Render only the currently active card for the carousel effect */}
              {stepsContent[currentActiveCardIndex] && (
                <motion.div
                  key={currentActiveCardIndex} 
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={cn(
                    "p-6 rounded-lg", // Removed transition-all from here, motion handles it
                    "bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-md border border-slate-200 dark:border-neutral-700"
                  )}
                >
                  <h3 className="text-xl font-semibold mb-2 flex items-center text-slate-800 dark:text-slate-100">
                    <span className="relative flex h-2 w-2 mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {stepsContent[currentActiveCardIndex].title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {stepsContent[currentActiveCardIndex].description}
                  </p>
                  <div className="mt-4 h-2 rounded-full overflow-hidden bg-slate-300 dark:bg-neutral-700">
                    <motion.div 
                      className="h-full bg-green-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: progressBarFillDurations[currentActiveCardIndex], ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            // Desktop: Stacked View (all cards, active one highlighted)
            <div className="space-y-8">
              {stepsContent.map((step, index) => {
                const isActive = index === currentActiveCardIndex;
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "p-6 rounded-lg transition-all duration-300 ease-in-out",
                      isActive 
                        ? "bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-md border border-slate-200 dark:border-neutral-700"
                        : "border border-transparent" 
                    )}
                  >
                    <h3 
                      className={cn(
                        "text-xl font-semibold mb-2 flex items-center",
                        isActive ? "text-slate-800 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {isActive && (
                        <span className="relative flex h-2 w-2 mr-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      )}
                      {step.title}
                    </h3>
                    <p 
                      className={cn(
                        isActive ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {step.description}
                    </p>
                    <div className={cn(
                      "mt-4 h-2 rounded-full overflow-hidden",
                      isActive ? "bg-slate-300 dark:bg-neutral-700" : "bg-transparent"
                      )}>
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={{ duration: isActive ? progressBarFillDurations[index] : 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column / Bottom on small: Phone Mockup - order-2 on small, md:order-none */}
        <div className="w-full sticky top-28 flex justify-center items-start py-8 md:py-0 md:order-none">
          <ClayPhoneMockup>
            <UserJourneyAnimation onStageChange={handleStageChange} />
          </ClayPhoneMockup>
        </div>
      </div>
    </section>
  );
} 