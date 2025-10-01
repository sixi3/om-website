'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Smartphone
} from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import { InteractiveShowcase } from '../../components/InteractiveShowcase';
import { CustomisableUIShowcase } from '../../components/CustomisableUIShowcase';
import { NudgesInsightsShowcase } from '../../components/NudgesInsightsShowcase';
import { AnimatedCounter } from '@/app/onemoney/components/ui/animated-counter';
import Marquee from "react-fast-marquee";
import { BackgroundGrid } from '@/components/ui/background-grid';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { GlowingDivider } from '@/components/ui/glowing-divider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/onemoney/components/ui/dialog";
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";


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
  { id: "integrations", value: 8, label: "AA Integrations", prefix: "", suffix: "+" },
  { id: "requests", value: 2.5, label: "Consent Requests Monthly", prefix: "", suffix: "Mn", fixedDecimals: 1 },
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
    image: "/Financial Analytics.png",
    features: ["Instant Income Verification", "Cash Flow Analysis", "Credit Risk Assessment"]
  },
  {
    title: "Wealth Management",
    description: "Tailor advice based on customer asset mix (MF, FDs, Stocks)",
    icon: <TrendingUp className="w-6 h-6" />,
    image: "/Staffing & Contract Roles.png",
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
    image: "/Real-Time Monitoring.png",
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
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

  return (
    <div className="relative">
      <BackgroundGrid />

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
              <ShimmerButton onClick={openDialog} className='text-lg uppercase'>
                Book FinPro Demo
              </ShimmerButton>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex relative w-full h-full items-center justify-center">
          <Image
            src="/FinPro-Header.png"
            alt="FinPro Hero"
            width={1000}
            height={700}
            className="object-contain ml-12 2xl:mr-32 xl:w-[700px] xl:h-[450px] 2xl:w-[1000px] 2xl:h-[600px]"
          />
        </div>
      </section>

      {/* Glowing Divider */}
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-8 md:my-16 mx-auto"
      />

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
            <p className="mx-auto text-sm text-slate-700 dark:text-slate-300 max-w-8xl md:text-lg">
              FinPro is a robust FIU (Financial Information User) TSP solution that allows banks, NBFCs, insurers, and fintechs to pull user-permissioned financial data through the Account Aggregator framework.
            </p>
          </div>

          {/* Tab Buttons Container */}
          <div className="w-full pt-2 px-2 sm:px-4 mb-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 sm:gap-4 p-2 rounded-full border-b-4 border border-slate-200 bg-linear-to-br from-white to-slate-100 backdrop-blur-md shadow-sm overflow-x-auto scrollbar-hide max-w-full">
                {tabsData.map((tab, index) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-md font-medium rounded-full cursor-pointer transition-colors duration-300 whitespace-nowrap flex-shrink-0 ${activeTab === index
                      ? "text-white font-semibold"
                      : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                  >
                    {activeTab === index && (
                      <motion.div
                        layoutId="active-finpro-tab"
                        className="absolute inset-0 bg-[#00b140] border-b-4 border-[#008000] rounded-full shadow-md z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="w-full">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 0 && <InteractiveShowcase />}
              {activeTab === 1 && <CustomisableUIShowcase />}
              {activeTab === 2 && <NudgesInsightsShowcase />}
            </motion.div>
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

      {/* Glowing Divider */}
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.3}
        className="my-8 md:my-16 mx-auto"
      />

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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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

          {/* Grid Layout - 4 cards on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex-shrink-0"
              >
                <BentoGridItem
                  title={
                    <div className="flex flex-col items-start w-full mt-auto mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center text-white mb-4">
                        {useCase.icon}
                      </div>
                      <span className="text-slate-800 dark:text-slate-100 text-md md:text-xl font-semibold">
                        {useCase.title}
                      </span>
                    </div>
                  }
                  description={
                    <div className="text-left w-full">
                      <p className="text-sm mb-4 text-slate-700 dark:text-slate-300 line-clamp-3">
                        {useCase.description}
                      </p>
                      <div className="space-y-2">
                        {useCase.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="inline-block px-3 py-1 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md mr-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                              </span>
                              <p className="text-xs text-slate-600 dark:text-slate-100 font-semibold">{feature}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                  image={{
                    src: useCase.image,
                    alt: useCase.title
                  }}
                  imagePosition="top-right"
                  imageSize="w-48 h-48 top-[-40px] right-[-30px] xl:w-48 xl:h-48 xl:top-[-50px] xl:right-[-45px]"
                  className="h-full min-h-[320px] md:min-h-[380px] bg-white/50 backdrop-blur-md border-slate-200 shadow-sm flex flex-col justify-end items-start p-6"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Glowing Divider */}
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.6}
        className="my-8 md:my-16 mx-auto"
      />

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

      {/* FinPro Demo Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Book Your FinPro Demo Today!</DialogTitle>
            <DialogDescription>
              Ready to see how FinPro can transform your financial data access? Let's schedule a personalized demo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-1">
            <TalkToUsForm source="moneyone-finpro" />
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
} 