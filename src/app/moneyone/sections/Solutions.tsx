'use client';

import React, { useState, useRef, useEffect } from "react";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background"; // Reusing from onemoney for now
import { motion } from "framer-motion";
import Image from "next/image"; // Import next/image
import { CustomAccordion, CustomAccordionItemProps } from "@/components/ui/CustomAccordion"; // Added import
import { ArrowRight } from "lucide-react";
// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// No longer needed - using direct imageClasses for flexible positioning

// Define the structure for tab data
interface TabData {
  id: string;
  title: string;
  introContent: React.ReactNode; // Renamed from textContent to introContent
  accordionItems: CustomAccordionItemProps[]; // Added for accordion sub-points
  imageSrc: string;
  imageAlt: string;
  imageSize?: string; // Optional custom image size
  imageClasses?: string; // Optional custom positioning classes (e.g., "bottom-0 left-1/2 transform -translate-x-1/2")
}

// Sample tab data - replace with your actual content
const tabsData: TabData[] = [
  {
    id: "wealth-management",
    title: "Wealth Management",
    introContent: (
      <>
        <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
          <span className={metallicBlackTextClasses}>Wealth Management for MFDs, Securities Brokerages and AMCs</span>
        </h3>
        <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl">
          Enhance your services and give your users valuable insights into their investment portfolios through the Account Aggregator Ecosystem and MoneyOne's TSP.
        </p>
      </>
    ),
    accordionItems: [
      { id: "wm-1", title: "Consolidated Portfolio View", content: "Gain a complete overview of all investments in one place for better decision-making." },
      { id: "wm-2", title: "Portfolio Management", content: "Tools and analytics for effective management and tracking of investment portfolios." },
      { id: "wm-3", title: "Goal Suggestion", content: "AI-driven suggestions to help users define and achieve their financial goals." },
      { id: "wm-4", title: "Analytics and Savings Plans", content: "In-depth analytics on portfolio performance and tools to create tailored savings plans." },
      { id: "wm-5", title: "Personal Finance Management", content: "Comprehensive PFM tools to help users budget, track expenses, and manage finances holistically." },
    ],
    imageSrc: "/Smart Document parsing.png",
    imageAlt: "Wealth Management illustration",
    imageSize: "w-120 h-120",
    imageClasses: "-bottom-48 md:right-40 lg:right-80 xl:right-120 transform ",
  },
  {
    id: "lending",
    title: "Lending",
    introContent: (
      <>
        <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
          <span className={metallicBlackTextClasses}>Optimize Lending Processes</span>
        </h3>
        <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl">
          Streamline every step of the lending lifecycle, from application to collection, with data-driven insights and comprehensive loan management tools.
        </p>
      </>
    ),
    accordionItems: [
      { id: "lending-1", title: "Standard Loans", content: "Efficient processing and management for various types of standard loan products." },
      { id: "lending-2", title: "Loans Against Mutual Funds and Shares", content: "Simplified loan applications and approvals using mutual funds and shares as collateral." },
      { id: "lending-3", title: "Consumer Durables", content: "Fast and easy financing options for consumer durable purchases at the point of sale." },
      { id: "lending-4", title: "Loans Through GST", content: "Leverage GST data for quicker credit assessment and loan disbursal to businesses." },
      { id: "lending-5", title: "Loan Monitoring and Collection", content: "Advanced tools for monitoring loan performance and optimizing collection strategies." },
    ],
    imageSrc: "/Field-level Config.png",
    imageAlt: "Lending process illustration",
    imageSize: "w-100 h-100",
    imageClasses: "-bottom-24 md:right-40 lg:right-80 xl:right-150 transform ",
  },
  {
    id: "advisory",
    title: "Advisory",
    introContent: (
      <>
        <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
          <span className={metallicBlackTextClasses}>Data-Driven Financial Advisory</span>
        </h3>
        <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl">
          Empower advisors to provide holistic and proactive financial guidance with consolidated data and advanced analytics for better client outcomes.
        </p>
      </>
    ),
    accordionItems: [
      { id: "advisory-1", title: "Holistic Client Financial View", content: "Consolidate client data from various sources to provide comprehensive financial advice and tailored recommendations." },
      { id: "advisory-2", title: "Proactive Insights & Recommendations", content: "Utilize advanced analytics to forecast financial scenarios, offer proactive insights, and guide clients towards long-term goals." },
      { id: "advisory-3", title: "Goal-Based Planning", content: "Create personalized financial plans aligned with client goals and risk tolerance." },
      { id: "advisory-4", title: "Performance Tracking", content: "Monitor and track client portfolio performance with detailed analytics and reporting." },
    ],
    imageSrc: "/Staffing & Contract Roles.png",
    imageAlt: "Financial advisory illustration",
    imageSize: "w-120 h-120",
    imageClasses: "-bottom-40 md:right-40 lg:right-80 xl:right-110 transform ",
  },
  {
    id: "brokerage",
    title: "Brokerage",
    introContent: (
      <>
        <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
          <span className={metallicBlackTextClasses}>Enhance Brokerage Operations</span>
        </h3>
        <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl">
          Equip brokers with tools for streamlined operations, better client service, and improved compliance with real-time data access and reporting.
        </p>
      </>
    ),
    accordionItems: [
      { id: "brokerage-1", title: "Instant Data Access", content: "Provide brokers with immediate access to market data, client profiles, and critical compliance information." },
      { id: "brokerage-2", title: "Streamlined Trade Lifecycle", content: "Optimize the entire trade lifecycle from execution and settlement to reporting." },
      { id: "brokerage-3", title: "Customizable Client Reporting", content: "Improve client communication and transparency with customizable dashboards and automated updates." },
      { id: "brokerage-4", title: "Risk Management", content: "Advanced risk assessment and monitoring tools for better portfolio management." },
      { id: "brokerage-5", title: "Compliance Automation", content: "Automated compliance checks and reporting to meet regulatory requirements." },
    ],
    imageSrc: "/Collect Now, Verify Later.png",
    imageAlt: "Brokerage operations illustration",
    imageSize: "w-120 h-120",
    imageClasses: "-bottom-40 md:right-40 lg:right-80 xl:right-120 transform ",
  },
];

export function Solutions() {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolled = useRef<boolean>(false);

  const currentTabContent = tabsData.find(tab => tab.id === activeTab);

  // Auto-scroll effect for mobile
  useEffect(() => {
    const checkIfMobile = () => window.innerWidth < 640; // sm breakpoint
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && checkIfMobile() && !hasAutoScrolled.current && tabsContainerRef.current) {
        // Set flag to prevent repeated animations
        hasAutoScrolled.current = true;
        
        const container = tabsContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        // First scroll to right to show the last tab
        setTimeout(() => {
          container.scrollTo({
            left: scrollWidth - clientWidth,
            behavior: 'smooth'
          });
          
          // Then scroll back to the beginning after a delay
          setTimeout(() => {
            container.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          }, 1200);
        }, 800);
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.5 
    });
    
    if (tabsContainerRef.current) {
      observer.observe(tabsContainerRef.current);
    }
    
    return () => {
      if (tabsContainerRef.current) {
        observer.unobserve(tabsContainerRef.current);
      }
    };
  }, []);

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
        <div className="flex items-center justify-center pt-2 px-4 mb-8">
          <div 
            ref={tabsContainerRef}
            className="flex items-center gap-2 p-2 rounded-full border border-[#baff29]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {tabsData.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white"
                    : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-solutions-tab"
                    className="absolute inset-0 bg-[#00b140] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.title}</span>
              </div>
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
            className="w-full mx-auto border border-[#baff29]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden"
          >
            <div className="p-8 relative">
              <div className="text-center mb-8">
                {currentTabContent.introContent}
                
                {/* Learn More Button */}
                <div className="mt-6">
                  <button className="inline-flex items-center justify-center rounded-full bg-background/30 backdrop-blur-md border border-[#00b140]/20 dark:border-neutral-700 px-6 py-3 text-sm font-medium text-[#00b140] hover:bg-[#00b140] hover:text-white transition-colors duration-300 group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover/bento:translate-x-1" />
                  </button>
                </div>
              </div>
              
              {/* Feature Pills */}
              {currentTabContent.accordionItems && currentTabContent.accordionItems.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {currentTabContent.accordionItems.map((item) => (
                    <div key={item.id} className="inline-block px-4 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="text-md text-slate-800 dark:text-slate-100 font-regular">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Positioned Image - Flexible positioning */}
              <div className="relative -mx-8 -mb-8 mt-8 h-70 overflow-hidden">
                <div 
                  className={`absolute ${currentTabContent.imageClasses || 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'} ${currentTabContent.imageSize || 'w-140 h-120'} z-10`}
                >
                  <Image
                    src={currentTabContent.imageSrc}
                    alt={currentTabContent.imageAlt}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority={tabsData.findIndex(t => t.id === activeTab) < 2}
                  />
                </div>
                                 {/* Gradient overlay for better text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
} 