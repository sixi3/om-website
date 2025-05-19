'use client';

import React, { useState } from "react";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background";
import { motion } from "framer-motion";
import { InteractiveShowcase } from '../components/InteractiveShowcase';
import { ChevronDown } from 'lucide-react';
import Marquee from 'react-fast-marquee';

// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";


// Pill texts for the marquee (derived from previous featuresPills)
const moneyOneFeaturesPillTexts = [
  "Bank Statements", 
  "Term & Recurring Deposits", 
  "Mutual Fund", 
  "Insurance", 
  "Equities", 
  "GSTN Data", 
  "National Pension Scheme",
  // Add more relevant MoneyOne features/use-cases if desired
  "Consent Management",
  "Data Governance",
  "Secure Data Sharing",
  "Regulatory Compliance",
  "Audit Trails",
  "User Analytics",
  "Developer APIs"
];

export function WhatIsMoneyOne() {
  const [hasBeenInView, setHasBeenInView] = useState(false); // This state variable might become unused if AnimatedCounter was its only user for triggering animations.
                                                            // For now, keeping it as InteractiveShowcase or other elements might use it.

  return (
    <motion.section 
      className="relative w-full py-12 md:py-12 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setHasBeenInView(true)} // Keep for potential other uses or main section animation trigger
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
      
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>What is</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              MoneyOne
            </span>{" "}
            <span className={metallicBlackTextClasses}>?</span>
          </h2>
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
          MoneyOne is a data governance platform that helps institutions securely manage and share financial data in India's digital economy
          </p>
        </div>

        {/* Custom Line Graph Animation replaced with InteractiveShowcase */}
          <div className="flex justify-center items-center my-8">
            <div className="w-full">
            <InteractiveShowcase /> 
          </div>
        </div>

        {/* "AND MANY MORE" Header - Placed inside the container */}
        <div className="flex justify-center my-2"> 
          <div
            className="inline-flex items-center backdrop-blur-md dark:border-neutral-700 px-6 py-3 text-sm font-medium text-slate-600 dark:bg-neutral-800 dark:text-neutral-300"
          >
            + AND MANY MORE CAPABILITIES
          </div>
        </div>
            
      </div> {/* End of the main container div */}

      {/* Marquee Banner - Placed OUTSIDE the container for full width */}
      <div className="mt-8 w-full mb-4"> {/* Added mb for spacing before section end */}
        <Marquee gradient={false} speed={40} pauseOnHover={true} direction="left">
          {moneyOneFeaturesPillTexts.map((text, index) => (
            <div
              key={`moneyone-pill-${index}`}
              className="inline-block bg-background/10 backdrop-blur-md rounded-sm border border-slate-200 dark:border-neutral-700 mr-3 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {text}
            </div>
          ))}
        </Marquee>
      </div>
      
    </motion.section>
  );
} 
