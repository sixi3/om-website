'use client';

import React, { useState } from "react";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background";
import { motion } from "framer-motion";
import { InteractiveShowcase } from '../components/InteractiveShowcase';
import { SmartRoutingShowcase } from '../components/SmartRoutingShowcase';
import { CustomisableUIShowcase } from '../components/CustomisableUIShowcase';
import { NudgesInsightsShowcase } from '../components/NudgesInsightsShowcase';
import Marquee from 'react-fast-marquee';

// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const tabsData = [
  { id: 'analytics', title: 'Analytics' },
  { id: 'smart-routing', title: 'Smart Routing' },
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

export function WhatIsMoneyOne() {
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <motion.section 
      className="relative w-full py-12 md:py-12 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setHasBeenInView(true)}
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

        {/* Tab Buttons Container */}
        <div className="flex justify-center mb-8">
          <div 
            className="flex overflow-x-auto py-2 space-x-2 sm:space-x-2 sm:dark:bg-slate-700 sm:p-2 sm:rounded-lg sm:bg-[#F6F6F7] sm:backdrop-blur-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-200 ease-in-out focus:outline-none whitespace-nowrap 
                  ${activeTab === tab.id 
                    ? "bg-white border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-sky-400 shadow-md" 
                    : "text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 sm:border-transparent sm:hover:bg-slate-100 sm:dark:hover:bg-slate-600"
                  }
                `}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full"
        >
          {activeTab === 'analytics' && <InteractiveShowcase />}
          {activeTab === 'smart-routing' && <SmartRoutingShowcase />}
          {activeTab === 'customisable-ui' && <CustomisableUIShowcase />}
          {activeTab === 'nudges-insights' && <NudgesInsightsShowcase />}
        </motion.div>
            
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
