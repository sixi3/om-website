'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveShowcase } from '@/app/moneyone/components/InteractiveShowcase';
import { CustomisableUIShowcase } from '@/app/moneyone/components/CustomisableUIShowcase';
import { NudgesInsightsShowcase } from '@/app/moneyone/components/NudgesInsightsShowcase';
import Marquee from 'react-fast-marquee';
// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const tabsData = [
  { id: 'analytics', title: 'Analytics' },
  { id: 'customisable-ui', title: 'Customisable UI' },
  { id: 'nudges-insights', title: 'Nudges/Insights' },
];

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

export function MoneyOneSection() {
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.section 
      className="relative w-full py-12 md:py-12 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setHasBeenInView(true)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
      
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              Complete Visibility
            </span>{" "}
            <span className={metallicBlackTextClasses}>Over Financial Data</span>
          </h2>
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
          Our platform helps institutions securely manage and share financial data in India's digital economy.
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex items-center justify-center pt-2 px-4 mb-8">
          <div className="flex items-center gap-2 sm:gap-4 p-2 rounded-full border-b-4 border border-slate-200 bg-linear-to-br from-white to-slate-100 backdrop-blur-md shadow-sm overflow-x-auto scrollbar-hide min-w-0 max-w-full">
            {tabsData.map((tab, index) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 sm:px-8 py-4 text-sm sm:text-md font-medium rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0 ${
                  activeTab === index
                    ? "text-white font-semibold"
                    : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="active-moneyone-tab"
                    className="absolute inset-0 bg-[#00b140] border-b-4 border-[#008000] rounded-full shadow-md z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 0 && <InteractiveShowcase />}
              {activeTab === 1 && <CustomisableUIShowcase />}
              {activeTab === 2 && <NudgesInsightsShowcase />}
            </motion.div>
          </AnimatePresence>
        </div>
            
      </div>

      {/* Marquee Banner - Placed OUTSIDE the container for full width */}
      <div className="mt-12 w-full mb-4">
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