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
  PieChart 
} from "lucide-react"; // Added new specific icons

// Styling classes
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Helper for the title pill (with Star)
const TitlePill = ({ text }: { text: string }) => (
  <span className="ml-2 whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 flex items-center">
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
  <div className="grid grid-cols-2 md:flex w-full gap-2 mt-4 mb-1">
    <FeaturePill text="Advanced Insights" icon={<Lightbulb className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="md:flex-1" />
    <FeaturePill text="Manual/Auto Data Fetch" icon={<DatabaseZap className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="md:flex-1" />
    <FeaturePill text="Custom Consent Flows" icon={<Workflow className="h-3.5 w-3.5 mr-1.5 text-green-700" />} className="col-span-2 md:flex-1" />
  </div>
);

const finShareFeaturePills = (
  <div className="grid grid-cols-2 md:flex w-full gap-2 mt-4 mb-1">
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
          src="/Bnl.png" // Placeholder image
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
        A specialised solution for FIPs to manage, secure, and share consent-based financial data while tracking consent and ensuring data governance
        {finShareFeaturePills}
      </>
    ),
    header: (
      <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
        <Image 
          src="/Ins.png" // Placeholder image
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

      </div>
    </motion.section>
  );
} 