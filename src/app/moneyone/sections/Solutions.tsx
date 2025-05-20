'use client';

import React, { useState } from "react";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background"; // Reusing from onemoney for now
import { motion } from "framer-motion";
import Image from "next/image"; // Import next/image
import { CustomAccordion, CustomAccordionItemProps } from "@/components/ui/CustomAccordion"; // Added import

// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Define the structure for tab data
interface TabData {
  id: string;
  title: string;
  introContent: React.ReactNode; // Renamed from textContent to introContent
  accordionItems: CustomAccordionItemProps[]; // Added for accordion sub-points
  imageSrc: string;
  imageAlt: string;
}

// Sample tab data - replace with your actual content
const tabsData: TabData[] = [
  {
    id: "wealth-management",
    title: "Wealth Management",
    introContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200 sm:text-xl text-center lg:text-left ">Wealth Management for MFDs, Securities Brokerages and AMCs</h3>
        <h4 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300 md:text-sm text-center lg:text-left">Enhance your services and give your users valuable insights into their investment portfolios through the Account Aggregator Ecosystem and MoneyOne's TSP. Key features include:</h4>
      </>
    ),
    accordionItems: [
      { id: "wm-1", title: "Consolidated Portfolio View", content: "Gain a complete overview of all investments in one place for better decision-making." },
      { id: "wm-2", title: "Portfolio Management", content: "Tools and analytics for effective management and tracking of investment portfolios." },
      { id: "wm-3", title: "Goal Suggestion", content: "AI-driven suggestions to help users define and achieve their financial goals." },
      { id: "wm-4", title: "Analytics and Savings Plans", content: "In-depth analytics on portfolio performance and tools to create tailored savings plans." },
      { id: "wm-5", title: "Personal Finance Management", content: "Comprehensive PFM tools to help users budget, track expenses, and manage finances holistically." },
    ],
    imageSrc: "/analytics.png", // Replace with actual image path
    imageAlt: "Wealth Management illustration",
  },
  {
    id: "lending",
    title: "Lending",
    introContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200 sm:text-xl text-center lg:text-left ">Optimize Lending Processes</h3>
        <h4 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300 sm:text-md text-center lg:text-left">Streamline every step of the lending lifecycle, from application to collection, with data-driven insights. Our solutions cover:</h4>
      </>
    ),
    accordionItems: [
      { id: "lending-1", title: "Standard Loans", content: "Efficient processing and management for various types of standard loan products." },
      { id: "lending-2", title: "Loans Against Mutual Funds and Shares", content: "Simplified loan applications and approvals using mutual funds and shares as collateral." },
      { id: "lending-3", title: "Consumer Durables", content: "Fast and easy financing options for consumer durable purchases at the point of sale." },
      { id: "lending-4", title: "Loans Through GST", content: "Leverage GST data for quicker credit assessment and loan disbursal to businesses." },
      { id: "lending-5", title: "Loan Monitoring and Collection", content: "Advanced tools for monitoring loan performance and optimizing collection strategies." },
    ],
    imageSrc: "/images/placeholder-lending.jpg", // Replace with actual image path
    imageAlt: "Lending process illustration",
  },
  {
    id: "advisory",
    title: "Advisory",
    introContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200 sm:text-xl text-center lg:text-left ">Data-Driven Financial Advisory</h3>
        <h4 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300 sm:text-md text-center lg:text-left">Empower advisors to provide holistic and proactive financial guidance with consolidated data and advanced analytics. Our platform enables:</h4>
      </>
    ),
    accordionItems: [
      { id: "advisory-1", title: "Holistic Client Financial View", content: "Consolidate client data from various sources to provide comprehensive financial advice and tailored recommendations." },
      { id: "advisory-2", title: "Proactive Insights & Recommendations", content: "Utilize advanced analytics to forecast financial scenarios, offer proactive insights, and guide clients towards long-term goals." },
    ],
    imageSrc: "/images/placeholder-advisory.jpg", // Replace with actual image path
    imageAlt: "Financial advisory illustration",
  },
  {
    id: "brokerage",
    title: "Brokerage",
    introContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200 sm:text-xl text-center lg:text-left ">Enhance Brokerage Operations</h3>
        <h4 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300 sm:text-md text-center lg:text-left">Equip brokers with tools for streamlined operations, better client service, and improved compliance. Key capabilities include:</h4>
      </>
    ),
    accordionItems: [
      { id: "brokerage-1", title: "Instant Data Access", content: "Provide brokers with immediate access to market data, client profiles, and critical compliance information." },
      { id: "brokerage-2", title: "Streamlined Trade Lifecycle", content: "Optimize the entire trade lifecycle from execution and settlement to reporting." },
      { id: "brokerage-3", title: "Customizable Client Reporting", content: "Improve client communication and transparency with customizable dashboards and automated updates." },
    ],
    imageSrc: "/images/placeholder-brokerage.jpg", // Replace with actual image path
    imageAlt: "Brokerage operations illustration",
  },
];

export function Solutions() {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

  const currentTabContent = tabsData.find(tab => tab.id === activeTab);

  return (
    <motion.section 
      className="relative w-full py-12" // Increased padding
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
      
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Tailored Solutions for</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md"> {/* Styled "All Use Cases" */}
              All Use Cases
            </span>
          </h2>
          <p className=" mx-auto text-lg text-slate-700 dark:text-slate-300">
            Explore how MoneyOne addresses diverse industry challenges with adaptable and effective data solutions.
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex justify-center mb-4">
          <div className="flex overflow-x-auto py-2 space-x-4 sm:space-x-2 sm:dark:bg-slate-700 sm:p-2 sm:rounded-lg sm:bg-[#F6F6F7] sm:backdrop-blur-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
        {currentTabContent && (
          <motion.div
            key={activeTab} // Ensures animation runs on tab change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-xl dark:ring-slate-700"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Side: Text Content & Accordion */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {currentTabContent.introContent}
                {currentTabContent.accordionItems && currentTabContent.accordionItems.length > 0 && (
                  <div className="mt-6">
                    <CustomAccordion 
                      items={currentTabContent.accordionItems} 
                      type="multiple" 
                      collapsible={false}
                    />
                  </div>
                )}
              </div>
              {/* Right Side: Image */}
              <motion.div 
                className="hidden md:block relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden"
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                <Image
                  src={currentTabContent.imageSrc}
                  alt={currentTabContent.imageAlt}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={tabsData.findIndex(t => t.id === activeTab) < 2} // Prioritize first two images
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
} 