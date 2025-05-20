'use client';

import React from "react";
import Image from "next/image"; // Added for card headers
import { GridBackground } from "@/app/onemoney/components/ui/grid-background";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid"; // Added for product cards
import { motion } from "framer-motion";
import { 
  Star, // Keep Star if TitlePill still uses it (user removed it, but keeping for safety if it's added back)
  Lightbulb, 
  DatabaseZap, 
  Workflow, 
  ShieldCheck, 
  PieChart,
  // Icons for moved featuresPills
  FileText, 
  BanknoteArrowUp, 
  CandlestickChart, 
  // ShieldCheck is already imported
  LineChart, 
  ReceiptIndianRupee, 
  Briefcase 
} from "lucide-react"; // Added new specific icons
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter"; // Added import

// Styling classes
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const moneyOneMetallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent"; // Added from WhatIsMoneyOne

// Helper for the title pill (with Star)
const TitlePill = ({ text }: { text: string }) => (
  <span className="ml-2 whitespace-nowrap rounded-full bg-background/10 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-green-700 flex items-center border border-green-200">
    {text}
  </span>
);

// Helper for feature pills (above the title)
interface FeaturePillProps {
  text: string;
  icon: React.ReactNode;
  className?: string;
}
const FeaturePill = ({ text, icon, className }: FeaturePillProps) => (
  <span className={`whitespace-nowrap rounded-sm bg-green-50 border border-green-200 px-2 py-1.5 text-xs font-medium text-green-700 flex items-center justify-center ${className || ''}`}>
    {icon}
    {text}
  </span>
);

// Content for Feature Pills (to avoid repetition in productsData)
const finProFeaturePills = (
  <div className="grid grid-cols-2 lg:flex w-full gap-2 mt-4 mb-1">
    <FeaturePill text="Advanced Insights" icon={<Lightbulb className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="md:flex-1" />
    <FeaturePill text="Manual/Auto Data Fetch" icon={<DatabaseZap className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="md:flex-1" />
    <FeaturePill text="Custom Consent Flows" icon={<Workflow className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="col-span-2 md:flex-1" />
  </div>
);

const finShareFeaturePills = (
  <div className="grid grid-cols-2 lg:flex w-full gap-2 mt-4 mb-1">
    <FeaturePill text="ReBIT-Compliant APIs" icon={<ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="md:flex-1" />
    <FeaturePill text="FIU-Based Data Analysis" icon={<PieChart className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="md:flex-1" />
    <FeaturePill text="Custom Consent Flows" icon={<Workflow className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="col-span-2 md:flex-1" />
  </div>
);

// Product data
const productsData = [
  {
    id: 1,
    title: (
      <div className="flex items-center text-xl">
        <span>FinPro</span>
        <TitlePill text="For Financial Information Users" />
      </div>
    ),
    description: (
      <>
        Efficiently integrate and request financial data through the account aggregator ecosystem and other consent based sharing under DPDP Act 2023
        {finProFeaturePills}
      </>
    ),
    header: (
      <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
        <Image 
          src="/finpro-image.png" // Placeholder image
          alt="FinPro illustration"
          fill={true}
          className="object-cover"
          sizes="(max-width: 767px) 90vw, 50vw"
          quality={80}
        />
      </div>
    ),
    icon: null, // Pills moved to description
    className: "md:col-span-1", // Each card takes half width on md screens and up
  },
  {
    id: 2,
    title: (
      <div className="flex items-center text-xl">
        <span>FinShare</span>
        <TitlePill text="For Financial Information Providers" />
      </div>
    ),
    description: (
      <>
        A specialised solution for FIPs to manage, secure, and share consent-based financial data while tracking consent and ensuring highest levels of data governance
        {finShareFeaturePills}
      </>
    ),
    header: (
      <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
        <Image 
          src="/finpro-image.png" // Placeholder image
          alt="FinShare illustration"
          fill={true}
          className="object-cover"
          sizes="(max-width: 767px) 90vw, 50vw"
          quality={80}
        />
      </div>
    ),
    icon: null, // Pills moved to description
    className: "md:col-span-1",
  },
];

// ADDED: Stats data from MoneyOne
const moneyOneStatsData = [
  { id: "fips", value: 120, label: "FIPs use MoneyOne", prefix: "", suffix: "+" },
  { id: "traffic", value: 50, label: "of all AA traffic", prefix: "", suffix: "%" },
  { id: "transfers", value: 160, label: "Data transfers complete", prefix: "", suffix: "M" },
];

// ADDED: Features pills from MoneyOne
const featuresPills = [
  { text: "Bank Statements", icon: FileText },
  { text: "Term & Recurring Deposits", icon: BanknoteArrowUp },
  { text: "Mutual Fund", icon: CandlestickChart },
  { text: "Insurance", icon: ShieldCheck }, // ShieldCheck is also used by finShareFeaturePills, ensure it's imported once
  { text: "Equities", icon: LineChart },
  { text: "GSTN Data", icon: ReceiptIndianRupee },
  { text: "National Pension Scheme", icon: Briefcase },
];

export function Products() {
  return (
    <motion.section 
      className="relative w-full py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
      
        {/* Title and Subtitle */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Our</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              Core
            </span>
            <span className={metallicBlackTextClasses}> Products</span>
          </h2>
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
            Discover the innovative solutions designed to enhance your financial data management and governance capabilities.
          </p>
        </div>

        {/* Product Cards Section */}
        <BentoGrid className="mx-auto md:grid-cols-2"> {/* Using md:grid-cols-2 for two cards side-by-side */}
          {productsData.map((item) => (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>

        {/* MOVED: Stats Section from WhatIsMoneyOne - Placed inside the container */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 justify-items-center mx-auto mt-16 mb-12 md:mb-16"> {/* Added mt-16 for spacing */}
          {moneyOneStatsData.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-2">
                <span className={moneyOneMetallicTextClasses}>{stat.prefix}</span>
                <AnimatedCounter 
                  value={stat.value} 
                  className={moneyOneMetallicTextClasses}
                  // If hasBeenInView logic is needed for AnimatedCounter, ensure Products component manages it.
                  // For now, assuming AnimatedCounter triggers on its own or via main section animation.
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

      {/* MOVED: Container for the title and lines for Pills section - Placed OUTSIDE the container for full-width lines */}
      <div className="w-full">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8 px-4 md:px-6">
          <div className="flex-grow h-px bg-foreground/20"></div>
          <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
            Unlock access to diverse data sets
          </h2>
          <div className="flex-grow h-px bg-foreground/20"></div>
        </div>
      </div>

      {/* MOVED: Pills Section - Placed OUTSIDE the container, follows the header above */}
      <div className="mt-8 mb-16 flex flex-col items-center space-y-4"> {/* Added mb-16 for bottom spacing */}
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