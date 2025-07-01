'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Shield, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Route,
  FileText,
  CreditCard,
  TrendingUp,
  Building,
  Users,
  CheckCircle,
  XCircle,
  ArrowRight,
  Code,
  Webhook,
  Settings,
  Globe,
  Lock,
  Eye,
  FileCheck,
  Smartphone,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import { InteractiveShowcase } from '../../components/InteractiveShowcase';
import { CustomisableUIShowcase } from '../../components/CustomisableUIShowcase';
import { NudgesInsightsShowcase } from '../../components/NudgesInsightsShowcase';
import { AnimatedCounter } from '@/app/onemoney/components/ui/animated-counter';
import Marquee from "react-fast-marquee";
import { cn } from '@/lib/utils';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

// Tab data for the showcase section
const tabsData = [
  { id: 'analytics', title: 'Analytics' },
  { id: 'customisable-ui', title: 'Customisable UI' },
  { id: 'nudges-insights', title: 'Nudges/Insights' },
];

// Pill texts for the marquee
const finProFeaturesPillTexts = [
  "Bank Statements", 
  "Term & Recurring Deposits", 
  "Mutual Fund", 
  "Insurance", 
  "Equities", 
  "GSTN Data", 
  "National Pension Scheme",
  "Consent Management",
  "Data Governance",
  "Secure Data Sharing",
  "Regulatory Compliance",
  "Audit Trails",
  "User Analytics",
  "Developer APIs"
];

// Stats data for FinPro
const finProStatsData = [
  { id: "banks", value: 50, label: "Banks & NBFCs use FinPro", prefix: "", suffix: "+" },
  { id: "integrations", value: 15, label: "AA Integrations", prefix: "", suffix: "" },
  { id: "requests", value: 2.5, label: "Data Requests Monthly", prefix: "", suffix: "M", fixedDecimals: 1 },
  { id: "uptime", value: 99.9, label: "Uptime Guarantee", prefix: "", suffix: "%", fixedDecimals: 1 },
];

// Define metallic text classes for stats
const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

// Features pills for FinPro
const finProFeaturesPills = [
  { text: "Bank Statements", icon: FileText },
  { text: "Term & Recurring Deposits", icon: CreditCard },
  { text: "Mutual Fund", icon: TrendingUp },
  { text: "Insurance", icon: Shield },
  { text: "Equities", icon: BarChart3 },
  { text: "GSTN Data", icon: FileCheck },
  { text: "National Pension Scheme", icon: Building },
];

const coreCapabilities = [
  {
    title: "Multi-AA Interoperability",
    description: "Access all licensed AAs in India via a single integration. Seamlessly connect with the entire Account Aggregator ecosystem through one unified API.",
    icon: <Globe className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Smart Consent Flows",
    description: "Pre-built consent journey UI with customizable branding. Streamline user onboarding with intuitive, compliant consent management.",
    icon: <Shield className="w-6 h-6" />,
    image: "/Secure Consent Capture.png",
  },
  {
    title: "DPDP & RBI Compliant",
    description: "Aligned with ReBIT schema and DPDP Act 2023. Ensure full regulatory compliance with built-in security and privacy controls.",
    icon: <FileCheck className="w-6 h-6" />,
    image: "/Compliance.png",
  },
  {
    title: "Real-Time Data Fetch",
    description: "Fetch and process Bank Statements, Mutual Fund holdings, ITR, GST and more in real-time with industry-leading speed and accuracy.",
    icon: <Zap className="w-6 h-6" />,
    image: "/Real-Time Document Upload.png",
  },
  {
    title: "Insight Layer",
    description: "Enriched analysis and derived insights for faster credit decisioning. Transform raw financial data into actionable business intelligence.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/Financial Analytics.png",
  },
  {
    title: "Auto-Routing",
    description: "Our Smart AA Router optimizes traffic to the best-performing AA in real-time. Maximize success rates with intelligent routing algorithms.",
    icon: <Route className="w-6 h-6" />,
    image: "/Smart routing.png",
  }
];

const useCases = [
  {
    title: "Digital Lending",
    description: "Automate income verification with real-time bank statement data",
    icon: <CreditCard className="w-6 h-6" />,
    image: "/Financial Services.png",
    features: ["Instant Income Verification", "Cash Flow Analysis", "Credit Risk Assessment"]
  },
  {
    title: "Wealth Management", 
    description: "Tailor advice based on customer asset mix (MF, FDs, Stocks)",
    icon: <TrendingUp className="w-6 h-6" />,
    image: "/PFM.png",
    features: ["Portfolio Consolidation", "Asset Allocation Analysis", "Investment Recommendations"]
  },
  {
    title: "BNPL & Credit Cards",
    description: "Pre-screen users with cashflow insights from AA data",
    icon: <Smartphone className="w-6 h-6" />,
    image: "/Mobile UX.png",
    features: ["Real-time Eligibility", "Spending Pattern Analysis", "Risk Profiling"]
  },
  {
    title: "Insurance",
    description: "Match premiums to user profile using verified financial history",
    icon: <Shield className="w-6 h-6" />,
    image: "/Healthcare.png",
    features: ["Risk Assessment", "Premium Calculation", "Claims Validation"]
  }
];

const complianceFeatures = [
  "Fully compliant with NBFC-AA Master Directions",
  "Integrated with all major AAs (e.g., CAMS Finserv, OneMoney, Finvu, etc.)",
  "Consent architecture aligned with ReBIT v1.1 & DPDP Act 2023",
  "Built-in user consent ledger, revocation flow, and audit logs"
];

const developerTools = [
  {
    title: "REST APIs",
    description: "Comprehensive API endpoints for seamless integration",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Java SDKs",
    description: "Ready-to-use SDKs for rapid development",
    icon: <FileText className="w-6 h-6" />,
    image: "/JavaScript SDK.png",
  },
  {
    title: "Sandbox Environment",
    description: "Plug-and-play testing environment",
    icon: <Settings className="w-6 h-6" />,
    image: "/Field-level Config.png",
  },
  {
    title: "Webhook Support",
    description: "Real-time updates via webhooks",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Support.png",
  }
];

const whyFinPro = [
  {
    title: "Trusted by Leaders",
    description: "Used by India's largest bank & NBFC",
    icon: <Building className="w-6 h-6" />,
  },
  {
    title: "Prebuilt Analytics",
    description: "Advanced analytics modules out of the box",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "Smart Routing",
    description: "Seamless retry and fallback logic",
    icon: <Route className="w-6 h-6" />,
  },
  {
    title: "Enterprise Grade",
    description: "Enterprise-grade encryption & uptime guarantees",
    icon: <Lock className="w-6 h-6" />,
  }
];

// Without FinPro vs With FinPro comparison
const withoutFinPro = [
  "Complex multi-AA integration challenges",
  "Manual consent management processes",
  "Compliance gaps and regulatory risks",
  "Slow data fetching and processing delays",
  "Limited insights from raw financial data",
  "High development and maintenance costs"
];

const withFinPro = [
  "Single API for all AA integrations",
  "Automated, compliant consent flows",
  "Full DPDP & RBI compliance built-in",
  "Real-time data processing and insights",
  "Advanced analytics and decisioning tools",
  "Reduced development time by 70%"
];

// Horizontal Point List Component
const HorizontalPointList = ({ items, textColor }: { items: (string | undefined)[], textColor: string }) => {
  const validItems = items.filter(Boolean);
  if (validItems.length === 0) return null;

  const content = validItems.map((point, idx) => (
    <React.Fragment key={idx}>
      <span className="whitespace-nowrap">{point}</span>
      {idx < validItems.length - 1 && <span className="text-white mx-2">&bull;</span>}
    </React.Fragment>
  ));

  return (
    <div className="w-full overflow-hidden">
      <Marquee gradient={false} speed={30} pauseOnHover={true}>
        <div className={`flex items-center gap-x-4 text-sm font-medium text-[16px] ${textColor} mr-8`}>
          {content}
          <span className="text-white mx-2">&bull;</span>
        </div>
      </Marquee>
    </div>
  );
};

export default function FinProPage() {
  const [activeUseCaseId, setActiveUseCaseId] = useState(useCases[0].title);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const activeUseCase = useCases.find(u => u.title === activeUseCaseId);
  const LOADER_DURATION_S = 6;

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Auto-cycle through use cases
  useEffect(() => {
    if (!hasBeenInView) return;

    const interval = setInterval(() => {
      const currentIndex = useCases.findIndex(u => u.title === activeUseCaseId);
      const nextIndex = (currentIndex + 1) % useCases.length;
      setActiveUseCaseId(useCases[nextIndex].title);
      setProgressKey(prev => prev + 1);
    }, LOADER_DURATION_S * 1000);

    return () => clearInterval(interval);
  }, [activeUseCaseId, hasBeenInView]);

  const handleUseCaseClick = (id: string) => {
    setActiveUseCaseId(id);
    setProgressKey(prev => prev + 1);
  };

  return (
    <div className="relative">
      <GridBackground />
      
      {/* Hero Section */}
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-12 pb-12 lg:min-h-[700px] overflow-hidden">
        <div className="container mx-auto px-6 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center pl-1 pr-3 py-1 text-md font-semibold text-slate-800 mb-4 space-x-2 mx-auto lg:mx-0">
                <Image
                  src="/icons8-medal-94.png"
                  alt="Medal icon"
                  width={24}
                  height={24}
                />
                <span>India&apos;s Leading FIU TSP Solution</span>
              </span>
              <h1 className="text-3xl tracking-tight leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-6xl">
                <span className={metallicBlackTextClasses}>Empower Your Financial Product with</span>{" "}
                <span className={highlightBgClass}>Intelligent Data Access</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-4">
                FinPro is MoneyOne's flagship FIU TSP solution, enabling seamless integration with the Account Aggregator ecosystem to help financial institutions access, analyze, and act on consented financial data — fast, secure, and compliant.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowingButton>
                Book FinPro Demo
              </GlowingButton>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex relative w-full h-full items-center justify-center">
          <Image
            src="/FinPro-Header.png"
            alt="FinPro Hero"
            width={1000}
            height={700}
            className="object-contain mt-20 mr-24"
          />
        </div>
      </section>

      {/* What is FinPro Section */}
      <motion.section 
        className="relative w-full py-12 md:py-20 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>What is</span>{" "}
              <span className={highlightBgClass}>FinPro</span>{" "}
              <span className={metallicBlackTextClasses}>?</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-8xl md:text-lg">
              FinPro is a robust FIU (Financial Information User) TSP solution that allows banks, NBFCs, insurers, and fintechs to pull user-permissioned financial data through the Account Aggregator framework. Built on industry-first standards and compliant with RBI and DPDP norms, FinPro simplifies onboarding, improves decisioning, and reduces friction in lending and underwriting.
            </p>
          </div>

          {/* Tab Buttons Container */}
          <div className="flex items-center justify-center pt-2 px-4 mb-8">
            <div className="flex items-center gap-2 p-2 rounded-full border border-[#baff29]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
              {tabsData.map((tab, index) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                    activeTab === index
                      ? "text-white"
                      : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {activeTab === index && (
                    <motion.div
                      layoutId="active-finpro-tab"
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

          {/* Stats Section */}
          <div className="mt-16 mb-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                <span className={metallicBlackTextClasses}>Trusted by</span>{" "}
                <span className={highlightBgClass}>Financial Leaders</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center mx-auto">
              {finProStatsData.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
                  <div className="text-4xl md:text-5xl lg:text-6xl mb-2">
                    <span className={metallicTextClasses}>{stat.prefix}</span>
                    <AnimatedCounter 
                      value={stat.value} 
                      fixedDecimals={stat.fixedDecimals}
                      className={metallicTextClasses}
                    />
                    <span className={metallicTextClasses}>{stat.suffix}</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-600 pt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Container for the title and lines - Full width */} 
        <div className="w-full">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8">
            <div className="flex-grow h-px bg-foreground/20"></div>
            <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
              Unlock access to diverse data sets
            </h2>
            <div className="flex-grow h-px bg-foreground/20"></div>
          </div>
        </div>

        {/* Pills Section */}
        <div className="mt-8 mb-16 flex flex-col items-center space-y-4">
          {/* Row 1 (4 pills) */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-medium">
            {finProFeaturesPills.slice(0, 4).map((pill, index) => {
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
            {finProFeaturesPills.slice(4, 7).map((pill, index) => {
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

      {/* Core Capabilities Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Core</span>{" "}
              <span className={highlightBgClass}>Capabilities</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              FinPro delivers comprehensive FIU capabilities through a single, powerful platform designed for modern financial institutions.
            </p>
          </div>
          <div className="space-y-6">
            {/* First Row - Long + Short */}
            <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
              <BentoGridItem
                key={0}
                className="shadow-sm md:col-span-2"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {coreCapabilities[0].icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{coreCapabilities[0].title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{coreCapabilities[0].description}</span>}
                image={{
                  src: coreCapabilities[0].image,
                  alt: coreCapabilities[0].title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
              <BentoGridItem
                key={1}
                className="shadow-sm md:col-span-1"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {coreCapabilities[1].icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{coreCapabilities[1].title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{coreCapabilities[1].description}</span>}
                image={{
                  src: coreCapabilities[1].image,
                  alt: coreCapabilities[1].title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
            </BentoGrid>
            
            {/* Second Row - Short + Long */}
            <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
              <BentoGridItem
                key={2}
                className="shadow-sm md:col-span-1"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {coreCapabilities[2].icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{coreCapabilities[2].title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{coreCapabilities[2].description}</span>}
                image={{
                  src: coreCapabilities[2].image,
                  alt: coreCapabilities[2].title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
              <BentoGridItem
                key={3}
                className="shadow-sm md:col-span-2"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {coreCapabilities[3].icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{coreCapabilities[3].title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{coreCapabilities[3].description}</span>}
                image={{
                  src: coreCapabilities[3].image,
                  alt: coreCapabilities[3].title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
            </BentoGrid>

            {/* Third Row - Long + Short */}
            <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
              <BentoGridItem
                key={4}
                className="shadow-sm md:col-span-2"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {coreCapabilities[4].icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{coreCapabilities[4].title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{coreCapabilities[4].description}</span>}
                image={{
                  src: coreCapabilities[4].image,
                  alt: coreCapabilities[4].title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
              <BentoGridItem
                key={5}
                className="shadow-sm md:col-span-1"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {coreCapabilities[5].icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{coreCapabilities[5].title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{coreCapabilities[5].description}</span>}
                image={{
                  src: coreCapabilities[5].image,
                  alt: coreCapabilities[5].title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* Before and After Banners */}
      <section className="relative w-full">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden bg-linear-to-r from-[#ce4257] to-[#720026] dark:bg-red-500/10 pt-2 pb-4 text-center">
            <h3 className="text-lg font-medium tracking-widest text-white uppercase mb-4 mt-2">WITHOUT FINPRO</h3>
            <HorizontalPointList items={withoutFinPro} textColor="text-white" />
            <Image 
              src="/thumbs-up.png"
              alt="Thumbs Down"
              width={100}
              height={100}
              className="absolute -top-2 -right-4 rotate-180 opacity-70"
            />
          </div>
          <div className="relative overflow-hidden bg-linear-to-l from-[#40916c] to-[#2d6a4f] dark:bg-green-500/10 pt-2 pb-4 text-center">
            <h3 className="text-lg font-medium tracking-wider text-white uppercase mb-4 mt-2">WITH FINPRO</h3>
            <HorizontalPointList items={withFinPro} textColor="text-white" />
            <Image 
              src="/thumbs-up.png"
              alt="Thumbs Up"
              width={100}
              height={100}
              className="absolute -bottom-2 -left-4 opacity-70"
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <motion.section 
        className="relative w-full py-12 md:py-20"
        onViewportEnter={() => setHasBeenInView(true)}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Sample Use Cases for</span>{" "}
              <span className={highlightBgClass}>FinPro</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              Discover how FinPro transforms financial services across various industries with intelligent data access and insights.
            </p>
          </div>

          {/* Mobile: Single Card with Navigation */}
          <div className="block md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeUseCase && (
                  <motion.div
                    key={activeUseCase.title}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="group relative overflow-hidden p-6 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md dark:bg-neutral-800/50 border border-[#00b140]/20 dark:border-neutral-700 min-h-[500px] shadow-lg"
                  >
                    <div className="p-2 rounded-lg bg-[#00b140] text-white inline-block mb-3">{activeUseCase.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-green-400">
                      {activeUseCase.title}
                    </h3>
                    <p className="text-sm mb-4 text-slate-700 dark:text-neutral-300">
                      {activeUseCase.description}
                    </p>
                    
                    <h4 className="font-light tracking-widest text-sm mb-3 uppercase text-darkgreen dark:text-white">Key Features</h4>
                    <div className="mb-6 space-y-2">
                      {activeUseCase.features.map((feature, index) => (
                        <div key={index} className="inline-block px-3 py-1 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm mr-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-100 font-semibold">{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute -bottom-[120px] left-0 w-full h-[400px] pointer-events-none overflow-hidden">
                      <Image
                        src={activeUseCase.image}
                        alt={activeUseCase.title}
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-1.5 w-full rounded-full overflow-hidden bg-slate-200/80 dark:bg-neutral-700/80">
                      <motion.div
                        key={progressKey}
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={hasBeenInView ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: hasBeenInView ? LOADER_DURATION_S : 0, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="flex space-x-2">
                {useCases.map((_, index) => {
                  const isActive = useCases[index].title === activeUseCaseId;
                  return (
                    <button
                      key={index}
                      onClick={() => handleUseCaseClick(useCases[index].title)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all duration-200',
                        isActive 
                          ? 'bg-[#00b140] w-6' 
                          : 'bg-slate-300 dark:bg-neutral-600 hover:bg-slate-400 dark:hover:bg-neutral-500'
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden p-6 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md dark:bg-neutral-800/50 border border-[#00b140]/20 dark:border-neutral-700 min-h-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-2 rounded-lg bg-[#00b140] text-white inline-block mb-3">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-green-400">
                  {useCase.title}
                </h3>
                <p className="text-sm mb-4 text-slate-700 dark:text-neutral-300">
                  {useCase.description}
                </p>
                
                <h4 className="font-light tracking-widest text-sm mb-3 uppercase text-darkgreen dark:text-white">Key Features</h4>
                <div className="mb-6 space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="inline-block px-3 py-1 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm mr-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-100 font-semibold">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute -bottom-[100px] right-0 w-[200px] h-[300px] pointer-events-none overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust & Compliance Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Built-in Trust &</span>{" "}
              <span className={highlightBgClass}>Compliance</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              FinPro ensures the highest standards of security, compliance, and regulatory adherence for your financial operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md border border-[#00b140]/20 shadow-sm"
              >
                <div className="p-2 rounded-full bg-[#00b140] text-white flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Toolkit Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Developer</span>{" "}
              <span className={highlightBgClass}>Toolkit</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              Everything developers need to integrate FinPro quickly and efficiently.
            </p>
          </div>

          <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
            {developerTools.map((tool, index) => (
              <BentoGridItem
                key={index}
                className="shadow-sm"
                icon={
                  <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                    {tool.icon}
                  </div>
                }
                title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{tool.title}</span>}
                description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{tool.description}</span>}
                image={{
                  src: tool.image,
                  alt: tool.title
                }}
                imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Why FinPro Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Why</span>{" "}
              <span className={highlightBgClass}>FinPro</span>{" "}
              <span className={metallicBlackTextClasses}>?</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              Join India's leading financial institutions who trust FinPro for their Account Aggregator needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFinPro.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md border border-[#00b140]/20 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-3 rounded-full bg-[#00b140] text-white inline-block mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Ready to Transform Your</span>{" "}
              <span className={highlightBgClass}>Financial Services</span>{" "}
              <span className={metallicBlackTextClasses}>?</span>
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              Join India's largest financial institutions and experience the power of intelligent data access with FinPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowingButton>
                Book FinPro Demo
              </GlowingButton>
              <button className="px-8 py-3 rounded-full border border-[#00b140] text-[#00b140] hover:bg-[#00b140] hover:text-white transition-colors duration-300 font-medium">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 