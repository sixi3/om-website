'use client';

import React, { useState } from "react";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background"; // Reusing from onemoney for now
import { motion } from "framer-motion";
import Image from "next/image"; // Import next/image

// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Define the structure for tab data
interface TabData {
  id: string;
  title: string;
  textContent: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}

// Sample tab data - replace with your actual content
const tabsData: TabData[] = [
  {
    id: "wealth-management",
    title: "Wealth Management",
    textContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Wealth Management for MFDs, Securities Brokerages and AMCs</h3>
        <h4 className="text-lg font-medium mb-4 text-slate-600 dark:text-slate-200">Enhance your services and give your users valuable insights into their investment portfolios through the Account Aggregator Ecosystem and MoneyOne’s TSP</h4>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
         Consolidated Portfolio View
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Portfolio Management
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Goal Suggestion
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Analytics and Savings Plans
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Personal Finance Management
        </p>
      </>
    ),
    imageSrc: "/images/placeholder-wealth.jpg", // Replace with actual image path
    imageAlt: "Wealth Management illustration",
  },
  {
    id: "lending",
    title: "Lending",
    textContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Optimize Lending Processes</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Standard Loans
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Loans Against Mutual Funds and Shares
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Consumer Durables
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Loans Through GST
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Loan Monitoring and Collection
        </p>
      </>
    ),
    imageSrc: "/images/placeholder-lending.jpg", // Replace with actual image path
    imageAlt: "Lending process illustration",
  },
  {
    id: "advisory",
    title: "Advisory",
    textContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Data-Driven Financial Advisory</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Provide clients with holistic financial advice by consolidating data from various sources. Offer proactive insights and tailored recommendations.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Utilize advanced analytics to forecast financial scenarios and guide clients towards their long-term goals.
        </p>
      </>
    ),
    imageSrc: "/images/placeholder-advisory.jpg", // Replace with actual image path
    imageAlt: "Financial advisory illustration",
  },
  {
    id: "brokerage",
    title: "Brokerage",
    textContent: (
      <>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Enhance Brokerage Operations</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Equip brokers with instant access to market data, client profiles, and compliance information. Streamline trade execution and settlement.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Improve client reporting and communication with customizable dashboards and automated updates.
        </p>
      </>
    ),
    imageSrc: "/images/placeholder-brokerage.jpg", // Replace with actual image path
    imageAlt: "Brokerage operations illustration",
  },
];

export function Solutions() {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

  const currentTabContent = tabsData.find(tab => tab.id === activeTab);

  return (
    <motion.section 
      className="relative w-full py-16 md:py-24" // Increased padding
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
          <div className="flex space-x-8 dark:bg-slate-700 p-2 sm rounded-lg bg-slate-400/10 backdrop-blur-md">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-200 ease-in-out focus:outline-none
                  ${activeTab === tab.id 
                    ? "bg-white border border-slate-50 dark:bg-slate-800 text-slate-700 dark:text-sky-400 shadow-md" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
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
            className="bg-background/10 backdrop-blur-md dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side: Text Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {currentTabContent.textContent}
              </div>
              {/* Right Side: Image */}
              <motion.div 
                className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden"
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                <Image
                  src={currentTabContent.imageSrc}
                  alt={currentTabContent.imageAlt}
                  fill
                  style={{ objectFit: "cover" }}
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