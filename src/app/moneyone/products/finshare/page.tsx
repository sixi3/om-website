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
  Smartphone,
  Share2,
  Activity,
  AlertTriangle,
  Clock,
  Key,
  Monitor
} from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import { AnimatedCounter } from '@/app/onemoney/components/ui/animated-counter';
import Marquee from "react-fast-marquee";
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { BackgroundGrid } from '@/components/ui/background-grid';
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

// Pill texts for the marquee
const finShareFeaturesPillTexts = [
  "Bank Account Statements", 
  "Mutual Fund & Investment Data", 
  "Fixed Deposits & Recurring Deposits", 
  "Loan Repayment & EMI Information",
  "Credit Card Statements",
  "Insurance Premium History",
  "GST & ITR Filings",
  "Consent Ledger",
  "DPDP + ReBIT Ready",
  "Multi-AA Support",
  "Load-Balancing Router",
  "Data Security Vault",
  "Audit & Compliance Dashboard",
  "Developer First"
];

// Stats data for FinShare
const finShareStatsData = [
  { id: "fips", value: 25, label: "FIPs use FinShare", prefix: "", suffix: "+" },
  { id: "aas", value: 10, label: "Exclusive FIP Integrations", prefix: "", suffix: "+" },
  { id: "requests", value: 1.8, label: "Data Requests Monthly", prefix: "", suffix: "M", fixedDecimals: 1 },
  { id: "uptime", value: 99.9, label: "Uptime Guarantee", prefix: "", suffix: "%", fixedDecimals: 1 },
];

// Define metallic text classes for stats
const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

// Features pills for FinShare
const finShareFeaturesPills = [
  { text: "Bank Account Statements", icon: FileText },
  { text: "Mutual Fund Data", icon: TrendingUp },
  { text: "Fixed Deposits", icon: CreditCard },
  { text: "Loan Repayment Info", icon: FileCheck },
  { text: "Credit Card Statements", icon: CreditCard },
  { text: "Insurance Premium", icon: Shield },
  { text: "GST & ITR Filings", icon: FileCheck },
];

const coreCapabilities = [
  {
    title: "Consent Ledger",
    description: "End-to-end tracking of user-given consents, with revocation and time-bound access. Complete audit trail for all consent operations.",
    icon: <FileText className="w-6 h-6" />,
    image: "/Secure Consent Capture.png",
  },
  {
    title: "DPDP + ReBIT Ready",
    description: "Handles sensitive personal and financial data with certified compliance. Built-in controls for DPDP Act and ReBIT framework.",
    icon: <Shield className="w-6 h-6" />,
    image: "/Compliance.png",
  },
  {
    title: "Multi-AA Support",
    description: "Seamless integration with all active AAs in India. Single API to connect with the entire Account Aggregator ecosystem.",
    icon: <Globe className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Load-Balancing Router",
    description: "Smart distribution of data fetches to prevent system bottlenecks. Optimized routing for maximum performance and reliability.",
    icon: <Route className="w-6 h-6" />,
    image: "/Smart routing.png",
  },
  {
    title: "Data Security Vault",
    description: "All information encrypted at rest and in transit using FIPS 140-2 standards. Enterprise-grade security for sensitive financial data.",
    icon: <Lock className="w-6 h-6" />,
    image: "/Multi-Zone Storage.png",
  },
  {
    title: "Audit & Compliance Dashboard",
    description: "Real-time visibility into logs, errors, consent records. Comprehensive monitoring for compliance officers and product owners.",
    icon: <Monitor className="w-6 h-6" />,
    image: "/Exportable Audit Trails.png",
  }
];

const useCases = [
  {
    title: "Banks as Data Sources",
    description: "Enable secure data sharing for AA journeys with full consent management",
    icon: <Building className="w-6 h-6" />,
    image: "/Financial Services.png",
    features: ["Account Statement Sharing", "Consent Management", "Real-time Data Access"]
  },
  {
    title: "Insurance Providers", 
    description: "Enable better underwriting for FIUs with verified financial data",
    icon: <Shield className="w-6 h-6" />,
    image: "/Real-Time Monitoring.png",
    features: ["Premium History Sharing", "Risk Assessment Data", "Underwriting Support"]
  },
  {
    title: "AMCs & R&T Agents",
    description: "Facilitate real-time NAV & SIP data sharing for investment decisions",
    icon: <TrendingUp className="w-6 h-6" />,
    image: "/Financial Analytics.png",
    features: ["NAV Data Sharing", "SIP Information", "Portfolio Analytics"]
  },
  {
    title: "NBFCs & MFIs",
    description: "Monetize data responsibly while maintaining regulatory compliance",
    icon: <CreditCard className="w-6 h-6" />,
    image: "/Bulk Managment Tools.png",
    features: ["Loan Data Sharing", "Repayment History", "Credit Assessment"]
  }
];

const complianceFeatures = [
  "Conforms to RBI's NBFC-AA FIP responsibilities",
  "Implements DPDP Act's Data Principal Rights",
  "Role-based access control for internal teams",
  "Auto-alerts for consent expiry, volume anomalies, or compliance drift"
];

const developerTools = [
  {
    title: "Multi-language SDKs",
    description: "Java, Node, Python SDKs for rapid integration",
    icon: <Code className="w-6 h-6" />,
    image: "/JavaScript SDK.png",
  },
  {
    title: "API Health Monitoring",
    description: "Comprehensive monitoring with retry logic and failover",
    icon: <Activity className="w-6 h-6" />,
    image: "/Real-Time Monitoring.png",
  },
  {
    title: "OAuth & eSign Support",
    description: "Embedded flows for seamless user authentication",
    icon: <Key className="w-6 h-6" />,
    image: "/Secure Consent Capture.png",
  },
  {
    title: "Webhook Integration",
    description: "Real-time updates via webhooks for delivery & failover events",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Support.png",
  }
];

const whyFinShare = [
  {
    title: "FIP-First Design",
    description: "Built specifically for Financial Information Providers",
    icon: <Building className="w-6 h-6" />,
  },
  {
    title: "Regulatory Compliance",
    description: "DPDP & ReBIT compliant out of the box",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Smart Load Balancing",
    description: "Prevents system bottlenecks with intelligent routing",
    icon: <Route className="w-6 h-6" />,
  },
  {
    title: "Enterprise Security",
    description: "FIPS 140-2 encryption and enterprise-grade security",
    icon: <Lock className="w-6 h-6" />,
  }
];

// Without FinShare vs With FinShare comparison
const withoutFinShare = [
  "Complex consent management across multiple AAs",
  "Manual audit trail maintenance and compliance reporting",
  "Security vulnerabilities in data sharing processes",
  "System bottlenecks during peak data request periods",
  "Limited visibility into consent and usage metrics",
  "High development costs for AA integration"
];

const withFinShare = [
  "Unified consent ledger with automated tracking",
  "Built-in compliance controls and audit dashboards",
  "FIPS 140-2 encrypted data vault and secure sharing",
  "Intelligent load balancing prevents system overload",
  "Real-time analytics and monitoring dashboards",
  "Plug-and-play integration reduces development time by 60%"
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

export default function FinSharePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

  return (
    <div className="relative">
      <BackgroundGrid zIndex={-10} />
      
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
                <span>Data Governance and Sharing, Redefined for FIPs</span>
              </span>
              <h1 className="text-3xl tracking-tight leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-6xl">
                <span className={metallicBlackTextClasses}>Securely Share Financial Data With</span>{" "}
                <span className={highlightBgClass}>Consent</span>{" "}
                <span className={metallicBlackTextClasses}>and Control</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-4">
                FinShare helps Financial Information Providers (FIPs) like banks, insurers, AMCs, and registrars to securely manage and share consented data under the AA ecosystem — with full audit trails and real-time control.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <ShimmerButton onClick={openDialog} className='text-lg uppercase'>
                Book FinShare Demo
              </ShimmerButton>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex relative w-full h-full items-center justify-center">
          <Image
            src="/API Integration.png"
            alt="FinShare Hero"
            width={600}
            height={600}
            className="object-contain mt-20 mr-24"
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

      {/* What is FinShare Section */}
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
              <span className={highlightBgClass}>FinShare</span>{" "}
              <span className={metallicBlackTextClasses}>?</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-8xl md:text-lg">
              FinShare is a powerful TSP service tailored for FIPs that need to deliver verified financial data to authorized FIUs, in real time and under full regulatory compliance. 
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-16 mb-12">
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center mx-auto">
              {finShareStatsData.map((stat) => (
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
            <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink ">
              Unlock access to different data types
            </h2>
            <div className="flex-grow h-px bg-foreground/20"></div>
          </div>
        </div>

        {/* Pills Section */}
        <div className="mt-8 mb-16 flex flex-col items-center space-y-4">
          {/* Row 1 (4 pills) */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-medium">
            {finShareFeaturesPills.slice(0, 4).map((pill, index) => {
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
            {finShareFeaturesPills.slice(4, 7).map((pill, index) => {
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
              <span className={metallicBlackTextClasses}>Key</span>{" "}
              <span className={highlightBgClass}>Features</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              FinShare delivers comprehensive FIP capabilities through a single, powerful platform designed for modern financial institutions.
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

      {/* Glowing Divider */}
      <GlowingDivider 
        width="3/4" 
        intensity="high" 
        delay={0.4}
        className="my-8 md:my-16 mx-auto"
      />

      {/* Before and After Banners */}
      <section className="relative w-full">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden bg-linear-to-r from-[#ce4257] to-[#720026] dark:bg-red-500/10 pt-2 pb-4 text-center">
            <h3 className="text-lg font-medium tracking-widest text-white uppercase mb-4 mt-2">WITHOUT FINSHARE</h3>
            <HorizontalPointList items={withoutFinShare} textColor="text-white" />
            <Image 
              src="/thumbs-up.png"
              alt="Thumbs Down"
              width={100}
              height={100}
              className="absolute -top-2 -right-4 rotate-180 opacity-70"
            />
          </div>
          <div className="relative overflow-hidden bg-linear-to-l from-[#40916c] to-[#2d6a4f] dark:bg-green-500/10 pt-2 pb-4 text-center">
            <h3 className="text-lg font-medium tracking-wider text-white uppercase mb-4 mt-2">WITH FINSHARE</h3>
            <HorizontalPointList items={withFinShare} textColor="text-white" />
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

      {/* Glowing Divider */}
      <GlowingDivider 
        width="3/4" 
        intensity="high" 
        delay={0.5}
        className="my-8 md:my-16 mx-auto"
      />

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
              <span className={metallicBlackTextClasses}>Ideal For</span>{" "}
              <span className={highlightBgClass}>FinShare</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              Discover how FinShare transforms data sharing across various financial institutions with secure, compliant, and efficient solutions.
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
              <span className={highlightBgClass}>Benefits</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              Everything developers need to integrate FinShare quickly and efficiently.
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

      {/* FinShare Demo Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Book Your FinShare Demo Today!</DialogTitle>
            <DialogDescription>
              Ready to see how FinShare can streamline your data sharing processes? Let's schedule a personalized demo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-1">
            <TalkToUsForm />
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
} 