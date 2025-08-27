"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { motion, AnimatePresence } from "framer-motion";
import { Building, FileText, Zap, MessageCircle, ShieldCheck, Link, CreditCard, Vote, Car, Share2, Scale, Globe, AlertTriangle, MapPin, Map, GraduationCap, Briefcase, Users, UserCheck, FileCheck, Settings, Code, Webhook, Terminal, TrendingUp, PieChart, BarChart3, Target, Activity, TrendingDown, ArrowUpDown, DollarSign, Clock, CheckCircle, Bell, Smartphone } from "lucide-react";
import { CLIENT_LOGOS } from "@/components/aurora-background-demo/constants";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { BackgroundGrid } from "@/components/ui/background-grid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/onemoney/components/ui/dialog";
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";

// Lazy load heavy components
const Products = lazy(() => import("@/app/moneyone/sections/Products").then(module => ({ default: module.ProductsWithoutStats })));
const Marquee = lazy(() => import("react-fast-marquee"));
const FOIRSection = lazy(() => import("@/app/equal/products/financial-services/FOIRSection").then(module => ({ default: module.FOIRSection })));
const ContactUs = lazy(() => import("@/app/moneyone/sections/ContactUs").then(module => ({ default: module.ContactUs })));

// Loading component
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00b140]"></div>
  </div>
);

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const moneyOneMetallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

// Combined stats data from both Products.tsx and Stats.tsx
const combinedStatsData = [
  { id: "fip", value: 1, label: "FIP Coverage in India", prefix: "#", suffix: "" },
  { id: "fiu", value: 49, label: "FIUs use MoneyOne", prefix: "", suffix: "%" },
  { id: "data", value: 79.9, label: "Monthly Data Packets Delivered", prefix: "", suffix: "M", fixedDecimals: 1 },
  { id: "consents", value: 28, label: "Consents Fulfilled Monthly", prefix: "", suffix: "M" },
];

// Features pills from both files
const featuresPills = [
  { text: "Bank Statements", icon: FileText },
  { text: "Term & Recurring Deposits", icon: CreditCard },
  { text: "Mutual Fund", icon: TrendingUp },
  { text: "Insurance", icon: ShieldCheck },
  { text: "Equities", icon: BarChart3 },
  { text: "GSTN Data", icon: FileCheck },
  { text: "National Pension Scheme", icon: Briefcase },
];

export default function BrokerageHero() {
  return (
    <div className="overflow-x-hidden">
      <BackgroundGrid />
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-12 pb-12 overflow-hidden min-h-[600px]">
        {/* Left: Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 z-10">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center pl-1 pr-3 py-1 text-xs lg:text-md font-semibold text-slate-800 mb-6 md:mb-4 space-x-2 mx-auto lg:mx-0">
                <Image
                  src="/icons8-medal-94.png"
                  alt="Medal icon"
                  width={24}
                  height={24}
                />
                <span>Enhanced Brokerage Operations</span>
              </span>
              <h1 className="text-4xl tracking-tight leading-tight sm:text-8xl md:text-3xl lg:text-4xl xl:text-7xl">
                <span className={metallicBlackTextClasses}>Streamlined</span>{" "}
                <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                  Brokerage
                </span>{" "}
                <span className={metallicBlackTextClasses}>with MoneyOne</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-8">
                Optimize brokerage operations with streamlined trade lifecycle management, real-time compliance monitoring, and enhanced client experience for modern trading platforms.
              </p>
            </div>
            <div className="w-full flex flex-col items-center md:items-start mb-8">
              <span className="text-xs font-semibold tracking-widest text-slate-500 mb-2 uppercase">Trusted by leading financial institutions</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl items-center justify-items-center">
                {CLIENT_LOGOS.slice(0, 4).map((logo, idx) => (
                  <div key={logo} className="relative w-32 h-10 flex items-center justify-center">
                    <Image
                      src={`/client-logos/${logo}`}
                      alt={`Client logo ${idx + 1}`}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <ShimmerButton className="w-full md:w-auto md:text-lg uppercase">
                  Book Brokerage Demo
                </ShimmerButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Book a Demo</DialogTitle>
                  <DialogDescription>
                    See how MoneyOne can transform your brokerage operations. Fill out the form below to schedule a demo with our team.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <TalkToUsForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Right: Video */}
        <div className="hidden lg:flex relative w-full h-full items-center justify-center z-0">
          <video
            src="/main-video-2.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="object-contain w-[90%] h-[90%] max-h-[600px] max-w-[700px]"
          />
        </div>
      </section>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      {/* Combined Stats Section */}
      <section className="relative w-full py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
              <span className={metallicBlackTextClasses}>India&apos;s</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                Largest
              </span>{" "}
              <span className={metallicBlackTextClasses}>Account Aggregator</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center mx-auto">
            {combinedStatsData.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
                <div className="text-4xl md:text-5xl lg:text-[90px] mb-2">
                  <span className={moneyOneMetallicTextClasses}>{stat.prefix}</span>
                  {stat.id === 'fip' ? (
                    <span className={moneyOneMetallicTextClasses}>1</span>
                  ) : (
                    <AnimatedCounter 
                      value={stat.value} 
                      fixedDecimals={stat.fixedDecimals}
                      className={moneyOneMetallicTextClasses}
                    />
                  )}
                  <span className={moneyOneMetallicTextClasses}>{stat.suffix}</span>
                </div>
                <p className="text-lg font-semibold text-slate-600 pt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Container for the title and lines */}
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
        <div className="mt-8 flex flex-col items-center space-y-4">
          {/* Row 1 (4 pills) */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-medium">
            {featuresPills.slice(0, 4).map((pill, index) => {
              const Icon = pill.icon;
              return (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap rounded-full bg-linear-to-br from-white to-[#baff29]/20 backdrop-blur-md border border-[#00b140]/30 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
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
                  key={index + 4}
                  className="flex items-center whitespace-nowrap rounded-full bg-linear-to-br from-white to-[#baff29]/20 backdrop-blur-md border border-[#00b140]/30 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
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
      </section>
      {/* Trading Operations Section */}
      <section className="relative w-full pb-12 md:py-10 overflow-hidden">
        <Suspense fallback={<SectionLoader />}>
          {/* First Marquee - Full Width */}
          <div className="mb-0 md:mb-2">
            <Marquee gradient={false} speed={80} pauseOnHover={true} className="py-2 scale-75 md:scale-100">
              {[...tradingOperationsRow1, ...tradingOperationsRow1].map((type, index) => (
                <OperationCard key={`row1-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
          </div>

          {/* Second Marquee - Full Width - Reverse Direction */}
          <div className="md:py-4">
            <Marquee gradient={false} speed={80} pauseOnHover={true} direction="right" className="py-2 scale-75 md:scale-100">
              {[...tradingOperationsRow2, ...tradingOperationsRow2].map((type, index) => (
                <OperationCard key={`row2-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
          </div>
        </Suspense>
      </section>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <motion.section
        className="relative w-full py-12 md:py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Why Brokers Choose</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">MoneyOne</span>{" "}
              <span className={metallicBlackTextClasses}>for Operations</span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
              Advanced trading infrastructure, real-time compliance, and streamlined operations for modern brokerage firms.
            </p>
          </div>
          <div className="space-y-6">
            {/* First Row - 2 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              {brokerageReasons.slice(0, 2).map((item, idx) => (
                <BentoGridItem
                  key={item.title}
                  className="shadow-sm"
                  title={
                    <div className="flex flex-col items-start w-full mt-auto mb-2">
                      <div className="w-10 h-10 rounded-lg bg-[#00b140] flex items-center justify-center text-white mb-2">
                        {item.icon}
                      </div>
                      <span className="text-lg font-semibold">{item.title}</span>
                    </div>
                  }
                  description={<p className="text-md text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>}
                  image={{
                    src: item.image.src,
                    alt: item.image.alt
                  }}
                  imagePosition="top-right"
                  imageSize="w-24 h-24 top-[-20px] right-[-10px] md:w-20 md:h-20 md:top-[-10px] md:right-[-5px] xl:w-32 xl:h-32 xl:top-[-30px] xl:right-[-20px]"
                />
              ))}
            </BentoGrid>
            {/* Second Row - 3 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
              {brokerageReasons.slice(2, 5).map((item, idx) => (
                <BentoGridItem
                  key={item.title}
                  className="shadow-sm"
                  title={
                    <div className="flex flex-col items-start w-full mt-auto mb-2">
                      <div className="w-10 h-10 rounded-lg bg-[#00b140] flex items-center justify-center text-white mb-2">
                        {item.icon}
                      </div>
                      <span className="text-lg font-semibold">{item.title}</span>
                    </div>
                  }
                  description={<p className="text-md text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>}
                  image={{
                    src: item.image.src,
                    alt: item.image.alt
                  }}
                  imagePosition="top-right"
                  imageSize="w-24 h-24 top-[-20px] right-[-10px] md:w-20 md:h-20 md:top-[-10px] md:right-[-5px] xl:w-32 xl:h-32 xl:top-[-30px] xl:right-[-20px]"
                />
              ))}
            </BentoGrid>
          </div>
        </div>
      </motion.section>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <Products />
      </Suspense>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <div className="mt-24">
        <Suspense fallback={<SectionLoader />}>
          <FOIRSection />
        </Suspense>
      </div>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <Products />
      </Suspense>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <div className="-mt-20">
        <Suspense fallback={<SectionLoader />}>
          <ContactUs />
        </Suspense>
      </div>
    </div>
  );
}

const brokerageReasons = [
  {
    title: "Trade Lifecycle Management",
    description: "End-to-end trade processing from order placement to settlement with real-time tracking.",
    image: {
      src: "/Collect Now, Verify Later.png",
      alt: "Trade Lifecycle"
    },
    icon: <Activity size={20} className="text-white" />
  },
  {
    title: "Real-Time Compliance",
    description: "Automated compliance monitoring and regulatory reporting for seamless operations.",
    image: {
      src: "/Compliance.png",
      alt: "Compliance"
    },
    icon: <ShieldCheck size={20} className="text-white" />
  },
  {
    title: "Order Management",
    description: "Advanced order routing and execution with smart order management capabilities.",
    image: {
      src: "/Field-level Config.png",
      alt: "Order Management"
    },
    icon: <ArrowUpDown size={20} className="text-white" />
  },
  {
    title: "Risk Management",
    description: "Comprehensive risk monitoring and position management for trading operations.",
    image: {
      src: "/Real-Time Monitoring.png",
      alt: "Risk Management"
    },
    icon: <AlertTriangle size={20} className="text-white" />
  },
  {
    title: "Client Experience",
    description: "Enhanced client portal with real-time portfolio tracking and trading capabilities.",
    image: {
      src: "/Hosted Page.png",
      alt: "Client Experience"
    },
    icon: <Users size={20} className="text-white" />
  }
]; 

const tradingOperationsRow1 = [
  { name: "Order Entry", icon: <ArrowUpDown className="w-6 h-6" /> },
  { name: "Order Routing", icon: <Activity className="w-6 h-6" /> },
  { name: "Execution", icon: <CheckCircle className="w-6 h-6" /> },
  { name: "Confirmation", icon: <FileText className="w-6 h-6" /> },
  { name: "Settlement", icon: <DollarSign className="w-6 h-6" /> },
  { name: "Clearing", icon: <Scale className="w-6 h-6" /> },
  { name: "Custody", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Reporting", icon: <BarChart3 className="w-6 h-6" /> },
  { name: "Compliance", icon: <CheckCircle className="w-6 h-6" /> },
  { name: "Risk Monitoring", icon: <AlertTriangle className="w-6 h-6" /> },
  { name: "Portfolio Tracking", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Performance Analytics", icon: <BarChart3 className="w-6 h-6" /> },
  { name: "Client Communication", icon: <MessageCircle className="w-6 h-6" /> },
  { name: "Regulatory Updates", icon: <Globe className="w-6 h-6" /> },
];

const tradingOperationsRow2 = [
  { name: "Market Data", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Real-Time Quotes", icon: <Activity className="w-6 h-6" /> },
  { name: "Chart Analysis", icon: <BarChart3 className="w-6 h-6" /> },
  { name: "Technical Indicators", icon: <TrendingDown className="w-6 h-6" /> },
  { name: "Fundamental Data", icon: <FileText className="w-6 h-6" /> },
  { name: "News Integration", icon: <Globe className="w-6 h-6" /> },
  { name: "Alerts & Notifications", icon: <Bell className="w-6 h-6" /> },
  { name: "Mobile Trading", icon: <Smartphone className="w-6 h-6" /> },
  { name: "API Trading", icon: <Code className="w-6 h-6" /> },
  { name: "Algorithmic Trading", icon: <Settings className="w-6 h-6" /> },
  { name: "Backtesting", icon: <Clock className="w-6 h-6" /> },
  { name: "Strategy Builder", icon: <Target className="w-6 h-6" /> },
  { name: "Portfolio Rebalancing", icon: <PieChart className="w-6 h-6" /> },
];

const OperationCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="relative w-48 h-48 bg-background/10 backdrop-blur-md border border-[#00b140]/20 rounded-2xl p-4 mx-2 flex-shrink-0 shadow-md">
    <div className="absolute top-4 left-4">
      <div className="p-3 rounded-full bg-[#00b140] text-white">
        {icon}
      </div>
    </div>
    <div className="absolute bottom-4 right-4 px-2 text-right">
      <span className="text-md font-medium text-slate-800 leading-tight">{name}</span>
    </div>
  </div>
); 



