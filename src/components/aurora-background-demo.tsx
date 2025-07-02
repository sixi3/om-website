"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import Link from 'next/link';
import { ChevronDown, BarChart3, ShieldCheck, Zap, Users, Building, Puzzle, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import { DropdownMenu, TriggerWrapper, Trigger, TabsContainer, Tab } from "@/components/ui/dropdown-menu";
import { ProductDropdownContent } from "@/components/ui/product-dropdown-content";
import { SolutionsDropdownContent } from "@/components/ui/solutions-dropdown-content";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";

const metallicGreenTextClasses = "font-bold  bg-gradient-to-b from-[#00b140] to-[#087C32] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// --- Data for Bento Grids ---

interface BentoItem {
  title: string;
  description: string;
  colSpan: 1 | 2 | 3;
  icon: React.ReactNode;
  image?: { src: string; alt: string };
  imagePosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  imageSize?: string;
}

const oneMoneyBentoData: BentoItem[] = [
  { 
    title: "OneMoney Account Aggregator", 
    description: "Consent-driven data sharing platform for financial institutions", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><BarChart3 size={24} strokeWidth={2} /></div>,
    image: { src: "/Candidate Consent Records.png", alt: "OneMoney Account Aggregator" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-64 md:h-64 -top-12 -right-12"
  },
  { 
    title: "Lending & Insurance Underwriting", 
    description: "Streamline loan processing and customer onboarding with secure data access", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><ShieldCheck size={24} strokeWidth={2} /></div>,
    image: { src: "/Real-Time Monitoring.png", alt: "Lending & Insurance Underwriting" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-16 -right-12"
  },
  { 
    title: "Wealth Managament", 
    description: "Gain a holistic view of client assets for personalized financial planning and advice.", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Zap size={24} strokeWidth={2} /></div>,
    image: { src: "/Financial Analytics.png", alt: "Wealth Management" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-16 -right-12"
  },
  { 
    title: "Personal Finance Management", 
    description: "Manage your personal finances with ease", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><TrendingUp size={24} strokeWidth={2} /></div>,
    image: { src: "/ADMIN.png", alt: "Personal Finance Management" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-16 -right-12"
  },
];

const moneyOneBentoData: BentoItem[] = [
  { 
    title: "FinPro FIU TSP", 
    description: "Efficiently integrate and request financial data through the account aggregator ecosystem and other consent based sharing under DPDP Act 2023", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Building size={24} strokeWidth={2} /></div>,
    image: { src: "/HR OPS.png", alt: "FinPro FIU TSP" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "FinShare FIP TSP", 
    description: "A specialised solution for FIPs to manage, secure, and share consent-based financial data while tracking consent and ensuring highest levels of data governance", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Briefcase size={24} strokeWidth={2} /></div>,
    image: { src: "/Exception Managment Engine.png", alt: "FinShare FIP TSP" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "Lending", 
    description: "Streamline every step of the lending lifecycle, from application to collection, with data-driven insights and comprehensive loan management tools", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><BarChart3 size={24} strokeWidth={2} /></div>,
    image: { src: "/Live Status Dashboard.png", alt: "Lending" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Advisory", 
    description: "Empower advisors to provide holistic and proactive financial guidance with consolidated data and advanced analytics for better client outcome", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Puzzle size={24} strokeWidth={2} /></div>,
    image: { src: "/Bulk Onboarding.png", alt: "Advisory" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Brokerage", 
    description: "Equip brokers with tools for streamlined operations, better client service, and improved compliance with real-time data access and reporting", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><ShieldCheck size={24} strokeWidth={2} /></div>,
    image: { src: "/Webhook Support.png", alt: "Brokerage" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
];

const equalBentoData: BentoItem[] = [
  { 
    title: "Equal ID Gateway", 
    description: "Advanced identity verification and KYC solutions", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Users size={24} strokeWidth={2} /></div>,
    image: { src: "/HRMS Integration.png", alt: "Equal ID Gateway" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "Equal Console", 
    description: "Comprehensive dashboard for verification management", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Building size={24} strokeWidth={2} /></div>,
    image: { src: "/Webhook Support.png", alt: "Equal Console" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "HRMS Itegration", 
    description: "Seamless background verification inside your HRMS", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Zap size={24} strokeWidth={2} /></div>,
    image: { src: "/Bulk Managment Tools.png", alt: "HRMS Integration" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Gig Economy Hiring", 
    description: "Verify and activate your gig workforce in real-time", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><Puzzle size={24} strokeWidth={2} /></div>,
    image: { src: "/Gig Economy Hiring.png", alt: "Gig Economy Hiring" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Financial Services (BFSI)", 
    description: "Compliance-first verification engine for banks & NBFCs", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><TrendingUp size={24} strokeWidth={2} /></div>,
    image: { src: "/Smart routing.png", alt: "Financial Services BFSI" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-12 -right-12"
  },
  { 
    title: "Staffing & Contract Roles", 
    description: "High-volume contract staffing needs a modern verification engine", 
    colSpan: 1, 
    icon: <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"><ShieldCheck size={24} strokeWidth={2} /></div>,
    image: { src: "/Recruitment.png", alt: "Staffing & Contract Roles" },
    imagePosition: "top-right" as const,
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
];


// Client logos data
const clientLogos = [
  "Frame 5.png",
  "Frame 6.png", 
  "Frame 7.png",
  "Frame 8.png",
  "Frame 9.png",
  "Frame 10.png",
  "Frame 11.png",
  "Frame 12.png",
  "Frame 13.png",
  "Frame 14.png",
  "Frame 15.png",
  "Frame 16.png",
  "Frame 17.png",
  "Frame 18.png",
  "Frame 19.png",
  "Frame 20.png"
];

const productData = {
  default: {
    title: "OneEqual",
    description: (
      <>
        India's <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Most Advanced</span> Data Sharing Platform
      </>
    )
  },
  onemoney: {
    title: "OneMoney",
    description: (
      <>
        India's <span className="inline-block bg-[#baff29] px-2 text-black font-bold">First & Largest</span> Account Aggregator
      </>
    )
  },
  moneyone: {
    title: "MoneyOne",
    description: (
      <>
        <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Take Control</span> Over Your Financial Data
      </>
    )
  },
  equal: {
    title: "Equal",
    description: (
      <>
        <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Smart Identity</span> Verification and Onboarding
      </>
    )
  }
};

const OneMoneyBentoGrid = () => (
  <div className="space-y-4">
    {/* First Row - 1 card */}
    <BentoGrid className="grid-cols-1 md:grid-cols-1">
      {oneMoneyBentoData.slice(0, 1).map((item, i) => (
        <button key={i} className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer">
          <BentoGridItem
            {...item}
            colSpan={1}
            title={
              <div className="flex items-center ">
                <span className="group-hover:text-[#00b140] transition-colors duration-200 text-xl font-semibold">{item.title}</span>
                <ArrowRight className="h-4 w-4 ml-2 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
              </div>
            }
            className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
            image={item.image}
            imagePosition={item.imagePosition as any}
            imageSize={item.imageSize}
          />
        </button>
      ))}
    </BentoGrid>
    {/* Second Row - 3 cards */}
    <BentoGrid className="grid-cols-1 md:grid-cols-3">
      {oneMoneyBentoData.slice(1, 4).map((item, i) => (
        <button key={i + 1} className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer">
          <BentoGridItem
            {...item}
            colSpan={1}
            title={
              <div className="flex items-center">
                <span className="group-hover:text-[#00b140] transition-colors duration-200 text-xl font-semibold">{item.title}</span>
                <ArrowRight className="h-4 w-4 ml-2 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
              </div>
            }
            className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
            image={item.image}
            imagePosition={item.imagePosition as any}
            imageSize={item.imageSize}
          />
        </button>
      ))}
    </BentoGrid>
  </div>
);

const MoneyOneBentoGrid = () => (
  <div className="space-y-4">
    <BentoGrid className="grid-cols-1 md:grid-cols-2">
      {moneyOneBentoData.slice(0, 2).map((item, i) => (
        <button key={i} className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer">
          <BentoGridItem
            {...item}
            title={
              <div className="flex items-center">
                <span className="group-hover:text-[#00b140] transition-colors duration-200 text-xl font-semibold">{item.title}</span>
                <ArrowRight className="h-4 w-4 ml-2 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
              </div>
            }
            colSpan={1}
            className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
            image={item.image}
            imagePosition={item.imagePosition as any}
            imageSize={item.imageSize}
          />
        </button>
      ))}
    </BentoGrid>
    <BentoGrid className="grid-cols-1 md:grid-cols-3">
      {moneyOneBentoData.slice(2, 5).map((item, i) => (
        <button key={i + 2} className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer">
          <BentoGridItem
            {...item}
            title={
              <div className="flex items-center">
                <span className="group-hover:text-[#00b140] transition-colors duration-200 text-xl font-semibold">{item.title}</span>
                <ArrowRight className="h-4 w-4 ml-2 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
              </div>
            }
            colSpan={1}
            className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
            image={item.image}
            imagePosition={item.imagePosition as any}
            imageSize={item.imageSize}
          />
        </button>
      ))}
    </BentoGrid>
  </div>
);

const EqualBentoGrid = () => (
  <div className="space-y-4">
    {/* First Row - 2 cards */}
    <BentoGrid className="grid-cols-1 md:grid-cols-2">
      {equalBentoData.slice(0, 2).map((item, i) => (
        <button key={i} className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer">
          <BentoGridItem
            {...item}
            colSpan={1}
            title={
              <div className="flex items-center">
                <span className="group-hover:text-[#00b140] transition-colors duration-200 text-xl font-semibold">{item.title}</span>
                <ArrowRight className="ml-2 w-4 h-4 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
              </div>
            }
            className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
            image={item.image}
            imagePosition={item.imagePosition as any}
            imageSize={item.imageSize}
          />
        </button>
      ))}
    </BentoGrid>
    {/* Second Row - 4 cards */}
    <BentoGrid className="grid-cols-1 md:grid-cols-4">
      {equalBentoData.slice(2, 6).map((item, i) => (
        <button key={i + 2} className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer">
          <BentoGridItem
            {...item}
            colSpan={1}
            title={
              <div className="flex items-center">
                <span className="group-hover:text-[#00b140] transition-colors duration-200 text-xl font-semibold">{item.title}</span>
                <ArrowRight className="h-4 w-4 ml-2 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
              </div>
            }
            className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
            image={item.image}
            imagePosition={item.imagePosition as any}
            imageSize={item.imageSize}
          />
        </button>
      ))}
    </BentoGrid>
  </div>
);

const ClientLogosGrid = () => (
  <div className="mt-2">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`text-center font-medium text-lg tracking-widest md:text-xl mb-12 ${metallicBlackTextClasses}`}
    >
      TRUSTED BY INDUSTRY LEADERS
    </motion.h2>
    <div className="grid grid-cols-4 gap-2 md:gap-3 lg:gap-4">
      {clientLogos.map((logo, index) => (
        <motion.div
          key={logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.3 + index * 0.05,
            duration: 0.4,
            ease: "easeOut"
          }}
          className="relative w-full h-12 hover:scale-105 transition-transform duration-300 mb-6"
        >
          <Image
            src={`/client-logos/${logo}`}
            alt={`Client logo ${index + 1}`}
            fill
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
          />
        </motion.div>
      ))}
    </div>
  </div>
);

export default function AuroraBackgroundDemo() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [hoveredFooterButton, setHoveredFooterButton] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  React.useEffect(() => {
    // Disable the initial load flag after the first animation sequence is complete
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Adjust time to be longer than your initial load animation
    return () => clearTimeout(timer);
  }, []);
  
  const currentContent = hoveredProduct ? productData[hoveredProduct as keyof typeof productData] : productData.default;

  const renderContent = () => {
    switch (hoveredFooterButton) {
      case 'onemoney':
        return <OneMoneyBentoGrid />;
      case 'moneyone':
        return <MoneyOneBentoGrid />;
      case 'equal':
        return <EqualBentoGrid />;
      default:
        return <ClientLogosGrid />;
    }
  };

  return (
    <AuroraBackground>
      <div className="relative flex flex-col h-screen">
        {/* Top Navigation Tabs */}
        <motion.div 
          className="flex justify-center items-center pt-8 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <DropdownMenu>
            <TriggerWrapper>
              <Trigger>
                PRODUCTS
              </Trigger>
              <Trigger>
                SOLUTIONS
              </Trigger>
            </TriggerWrapper>
            
            <TabsContainer>
              <Tab>
                <ProductDropdownContent />
              </Tab>
              <Tab>
                <SolutionsDropdownContent />
              </Tab>
            </TabsContainer>
          </DropdownMenu>
        </motion.div>

        {/* Centered Title and Description */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-center"
          >
            <div className="h-20 md:h-24 lg:h-48 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentContent.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className={`text-4xl md:text-6xl lg:text-[120px] font-bold dark:text-white text-center ${metallicGreenTextClasses}`}
                >
                  {currentContent.title}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Glowing Light Bar - Between Title and Description */}
            <motion.div 
              className="w-[40rem] h-8 relative mx-auto my-2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Gradient Light Bars */}
              <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00b140] to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00b140] to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#baff29] to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#baff29] to-transparent h-px w-1/4" />
            </motion.div>
            
            <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentContent.title + '-description'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1],
                    delay: 0.1
                  }}
                  className={`text-2xl md:text-4xl lg:text-5xl dark:text-neutral-200 py-1 max-w-7xl text-center ${metallicBlackTextClasses}`}
                >
                  {currentContent.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div 
          className="mt-auto"
          onMouseLeave={() => {
            setHoveredProduct(null);
            setHoveredFooterButton(null);
          }}
        >
          {/* Glassmorphic Container for Bottom Half */}
          <div className="relative min-h-[480px]">
            {/* Glassmorphic Background Container - positioned to cut through heading middle */}
            <motion.div
              className="absolute top-6 left-0 right-0 bottom-0 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-[#00b140]/10 backdrop-blur-md dark:border-white/10 rounded-t-3xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(186, 245, 41, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Landing Asset 1 - Top Right */}
              <motion.div
                className="absolute -top-12 -right-20 xl:-top-16 xl:-right-16 w-32 h-32 md:w-48 md:h-48 xl:w-64 xl:h-64"
                initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Image
                  src="/Vehicle + Legal Verification.png"
                  alt="Landing Asset 1"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                />
              </motion.div>

              {/* Landing Asset 2 - Top Left */}
              <motion.div
                className="absolute -top-12 -left-20 xl:-top-16 xl:-left-16 w-32 h-32 md:w-48 md:h-48 xl:w-64 xl:h-64"
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <Image
                  src="/Field-level Config.png"
                  alt="Landing Asset 2"
                  fill
                  className="object-contain transform -scale-x-100"
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                />
              </motion.div>
            </motion.div>

            {/* Content that sits on top of glassmorphic background */}
            <div className="relative z-10 pt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredFooterButton || 'default'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    // Delay only on the initial load for the stats grid
                    delay: isInitialLoad && !hoveredFooterButton ? 1.2 : 0,
                  }}
                  className="w-full max-w-7xl mx-auto px-4"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Bottom Buttons - Full Width */}
          <motion.div 
            className="w-screen grid grid-cols-1 md:grid-cols-3 -mx-4 md:-mx-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/onemoney" passHref>
              <motion.button 
                className="relative w-full bg-gradient-to-r from-[#00b140] to-[#087C32] text-white font-bold py-8 px-6 text-2xl md:text-3xl rounded-none md:rounded-none overflow-hidden"
                onMouseEnter={() => { setHoveredProduct('onemoney'); setHoveredFooterButton('onemoney'); }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-[#baff29] to-[#98E100] transform transition-transform duration-200 ease-out ${hoveredFooterButton === 'onemoney' ? 'translate-y-0' : 'translate-y-full'}`}></div>
                <div className="relative z-10 flex items-center justify-center">
                  <span className={`transition-colors duration-200 ${hoveredFooterButton === 'onemoney' ? 'text-black' : ''}`}>OneMoney</span>
                  <ArrowRight 
                    className={`ml-2 mt-1 w-6 h-6 transition-all duration-200 ${
                      hoveredFooterButton === 'onemoney' 
                        ? 'translate-x-1 text-black' 
                        : 'translate-x-0 text-white'
                    }`} 
                  />
                </div>
              </motion.button>
            </Link>
            <Link href="/moneyone" passHref>
              <motion.button 
                className="relative w-full bg-gradient-to-r from-[#087C32] to-[#00b140] text-white font-bold py-8 px-6 text-2xl md:text-3xl rounded-none md:rounded-none overflow-hidden"
                onMouseEnter={() => { setHoveredProduct('moneyone'); setHoveredFooterButton('moneyone'); }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-[#baff29] to-[#98E100] transform transition-transform duration-200 ease-out ${hoveredFooterButton === 'moneyone' ? 'translate-y-0' : 'translate-y-full'}`}></div>
                <div className="relative z-10 flex items-center justify-center">
                  <span className={`transition-colors duration-200 ${hoveredFooterButton === 'moneyone' ? 'text-black' : ''}`}>Moneyone</span>
                  <ArrowRight 
                    className={`ml-2 w-6 h-6 transition-all duration-200 ${
                      hoveredFooterButton === 'moneyone' 
                        ? 'translate-x-1 text-black' 
                        : 'translate-x-0 text-white'
                    }`} 
                  />
                </div>
              </motion.button>
            </Link>
            <Link href="/equal" passHref>
              <motion.button 
                className="relative w-full bg-gradient-to-r from-[#00b140] to-[#087C32] text-white font-bold py-8 px-6 text-2xl md:text-3xl rounded-none md:rounded-none overflow-hidden"
                onMouseEnter={() => { setHoveredProduct('equal'); setHoveredFooterButton('equal'); }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-[#baff29] to-[#98E100] transform transition-transform duration-200 ease-out ${hoveredFooterButton === 'equal' ? 'translate-y-0' : 'translate-y-full'}`}></div>
                <div className="relative z-10 flex items-center justify-center">
                  <span className={`transition-colors duration-200 ${hoveredFooterButton === 'equal' ? 'text-black' : ''}`}>Equal</span>
                  <ArrowRight 
                    className={`ml-2 w-6 h-6 transition-all duration-200 ${
                      hoveredFooterButton === 'equal' 
                        ? 'translate-x-1 text-black' 
                        : 'translate-x-0 text-white'
                    }`} 
                  />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
} 