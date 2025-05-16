'use client';

import React, { useState } from "react";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import { motion } from "framer-motion";
import { 
  FileText, BanknoteArrowUp, CandlestickChart, ShieldCheck, 
  LineChart, ReceiptIndianRupee, Briefcase 
} from 'lucide-react';
import { LineGraphCard } from '../components/AnimatedLineGraphCard';

// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
// New metallic text class for MoneyOne stats
const moneyOneMetallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

// Stats data for MoneyOne
const moneyOneStatsData = [
  { id: "fips", value: 120, label: "FIPs use MoneyOne", prefix: "", suffix: "+" },
  { id: "traffic", value: 50, label: "of all AA traffic", prefix: "", suffix: "%" },
  { id: "transfers", value: 160, label: "Data transfers complete", prefix: "", suffix: "M" },
];

// Features pills (same as Stats.tsx for now)
const featuresPills = [
  { text: "Bank Statements", icon: FileText },
  { text: "Term & Recurring Deposits", icon: BanknoteArrowUp },
  { text: "Mutual Fund", icon: CandlestickChart },
  { text: "Insurance", icon: ShieldCheck },
  { text: "Equities", icon: LineChart },
  { text: "GSTN Data", icon: ReceiptIndianRupee },
  { text: "National Pension Scheme", icon: Briefcase },
];

export function WhatIsMoneyOne() {
  const [hasBeenInView, setHasBeenInView] = useState(false);

  return (
    <motion.section 
      className="relative w-full py-12 md:py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setHasBeenInView(true)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
      
        {/* Title and Subtitle */}
        <div className="text-center mb-12 md:mb-16">
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

        {/* Custom Line Graph Animation */}
        <div className="flex justify-center items-center my-12 md:my-16">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
            <LineGraphCard />
          </div>
        </div>
            
        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 justify-items-center mx-auto mt-12 md:mt-16 mb-12 md:mb-16">
          {moneyOneStatsData.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-2">
                <span className={moneyOneMetallicTextClasses}>{stat.prefix}</span>
                <AnimatedCounter 
                  value={stat.value} 
                  className={moneyOneMetallicTextClasses}
                />
                <span className={moneyOneMetallicTextClasses}>{stat.suffix}</span>
              </div>
              <p className="text-lg font-semibold text-slate-600 pt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div> {/* End of the main container div */}

      {/* Container for the title and lines for Pills section - NOW OUTSIDE THE MAIN CONTAINER */}
      <div className="w-full">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8 px-4 md:px-6"> {/* Added padding here to align text content if needed, but lines will go to edge of w-full parent */}
          <div className="flex-grow h-px bg-foreground/20"></div>
          <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
            Unlock access to diverse data sets
          </h2>
          <div className="flex-grow h-px bg-foreground/20"></div>
        </div>
      </div>
      {/* Pills Section - NOW OUTSIDE THE MAIN CONTAINER */}
      <div className="mt-8 flex flex-col items-center space-y-4">
            {/* Row 1 (4 pills) */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-medium">
              {featuresPills.slice(0, 4).map((pill, index) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={`pill-row1-${index}`}
                    className="flex items-center whitespace-nowrap rounded-full bg-background/10 backdrop-blur-md border border-slate-200 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <Icon className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                    {pill.text}
                  </div>
                );
              })}
            </div>
            {/* Row 2 (3 pills) */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {featuresPills.slice(4, 7).map((pill, index) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={`pill-row2-${index}`}
                    className="flex items-center whitespace-nowrap rounded-full bg-background/10 backdrop-blur-md border border-slate-200 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <Icon className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                    {pill.text}
                  </div>
                );
              })}
            </div>
          </div>

    </motion.section>
  );
}
