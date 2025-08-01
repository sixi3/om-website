"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { motion, AnimatePresence } from "framer-motion";
import { Building, FileText, Zap, MessageCircle, ShieldCheck, Link, CreditCard, Vote, Car, Share2, Scale, Globe, AlertTriangle, MapPin, Map, GraduationCap, Briefcase, Users, UserCheck, FileCheck, Settings, Code, Webhook, Terminal, TrendingUp, PieChart, BarChart3, Target, Lightbulb, Brain, BookOpen, Award, Star, Compass, DollarSign, Clock, Leaf } from "lucide-react";
import { CLIENT_LOGOS } from "@/components/aurora-background-demo/constants";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/onemoney/components/ui/dialog";
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";

// Lazy load heavy components
const Stats = lazy(() => import('@/app/equal/sections/Stats').then(module => ({ default: module.Stats })));
const ProductShowcase = lazy(() => import("@/app/equal/sections/ProductShowcase").then(module => ({ default: module.ProductShowcase })));
const IndustrySection = lazy(() => import("@/components/aurora-background-demo/components/industries").then(module => ({ default: module.IndustrySection })));
const Marquee = lazy(() => import("react-fast-marquee"));

// Loading component
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00b140]"></div>
  </div>
);

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export default function AdvisoryHero() {
  return (
    <div className="overflow-x-hidden">
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
                <span>Data-Driven Financial Advisory</span>
              </span>
              <h1 className="text-4xl tracking-tight leading-tight sm:text-8xl md:text-3xl lg:text-4xl xl:text-7xl">
                <span className={metallicBlackTextClasses}>Intelligent</span>{" "}
                <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                  Financial Advisory
                </span>{" "}
                <span className={metallicBlackTextClasses}>with MoneyOne</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-8">
                Empower financial advisors with consolidated data, advanced analytics, and AI-driven insights to provide personalized financial planning and investment recommendations.
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
                  Book Advisory Demo
                </ShimmerButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Book a Demo</DialogTitle>
                  <DialogDescription>
                    See how MoneyOne can transform your financial advisory services. Fill out the form below to schedule a demo with our team.
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
      <Suspense fallback={<SectionLoader />}>
        <Stats showVerifyBanner={false} />
      </Suspense>
      {/* Advisory Services Section */}
      <section className="relative w-full pb-12 md:py-10 overflow-hidden">
        <Suspense fallback={<SectionLoader />}>
          {/* First Marquee - Full Width */}
          <div className="mb-0 md:mb-2">
            <Marquee gradient={false} speed={80} pauseOnHover={true} className="py-2 scale-75 md:scale-100">
              {[...advisoryServicesRow1, ...advisoryServicesRow1].map((type, index) => (
                <ServiceCard key={`row1-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
          </div>

          {/* Second Marquee - Full Width - Reverse Direction */}
          <div className="md:py-4">
            <Marquee gradient={false} speed={80} pauseOnHover={true} direction="right" className="py-2 scale-75 md:scale-100">
              {[...advisoryServicesRow2, ...advisoryServicesRow2].map((type, index) => (
                <ServiceCard key={`row2-${index}`} name={type.name} icon={type.icon} />
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
              <span className={metallicBlackTextClasses}>Why Advisors Choose</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">MoneyOne</span>{" "}
              <span className={metallicBlackTextClasses}>for Financial Planning</span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
              Advanced analytics, AI-driven insights, and comprehensive financial planning tools for modern advisors.
            </p>
          </div>
          <div className="space-y-6">
            {/* First Row - 2 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              {advisoryReasons.slice(0, 2).map((item, idx) => (
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
              {advisoryReasons.slice(2, 5).map((item, idx) => (
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
        <ProductShowcase />
      </Suspense>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <IndustrySection />
      </Suspense>
      {/* Integration & Developer Features Tabbed Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Build & Deploy with</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">MoneyOne</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-4xl md:text-lg">
              Choose from multiple integration modes and leverage powerful developer tools to implement MoneyOne's Advisory platform in your workflow.
            </p>
          </div>

          {/* Tab Indicator */}
          <IntegrationDeveloperTabs />
        </div>
      </section>
    </div>
  );
}

const advisoryReasons = [
  {
    title: "AI-Driven Insights",
    description: "Advanced AI algorithms provide personalized investment recommendations and market analysis.",
    image: {
      src: "/Staffing & Contract Roles.png",
      alt: "AI Insights"
    },
    icon: <Brain size={20} className="text-white" />
  },
  {
    title: "Consolidated Data",
    description: "Unified view of client portfolios across multiple accounts and investment platforms.",
    image: {
      src: "/Consolidated Report Manager.png",
      alt: "Consolidated Data"
    },
    icon: <PieChart size={20} className="text-white" />
  },
  {
    title: "Goal-Based Planning",
    description: "Comprehensive financial planning aligned with client goals and risk tolerance.",
    image: {
      src: "/Custom Workflow Builder.png",
      alt: "Goal Planning"
    },
    icon: <Target size={20} className="text-white" />
  },
  {
    title: "Real-Time Analytics",
    description: "Live portfolio performance tracking with advanced risk and return analytics.",
    image: {
      src: "/Financial Analytics.png",
      alt: "Real-Time Analytics"
    },
    icon: <BarChart3 size={20} className="text-white" />
  },
  {
    title: "Compliance Automation",
    description: "Built-in regulatory compliance with automated reporting and audit trails.",
    image: {
      src: "/Compliance.png",
      alt: "Compliance"
    },
    icon: <ShieldCheck size={20} className="text-white" />
  }
]; 

const advisoryServicesRow1 = [
  { name: "Financial Planning", icon: <Compass className="w-6 h-6" /> },
  { name: "Investment Advisory", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Retirement Planning", icon: <Target className="w-6 h-6" /> },
  { name: "Tax Planning", icon: <FileText className="w-6 h-6" /> },
  { name: "Estate Planning", icon: <Building className="w-6 h-6" /> },
  { name: "Insurance Advisory", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Risk Assessment", icon: <AlertTriangle className="w-6 h-6" /> },
  { name: "Portfolio Analysis", icon: <BarChart3 className="w-6 h-6" /> },
  { name: "Asset Allocation", icon: <PieChart className="w-6 h-6" /> },
  { name: "Market Research", icon: <Globe className="w-6 h-6" /> },
  { name: "Performance Tracking", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Rebalancing", icon: <Settings className="w-6 h-6" /> },
  { name: "Client Communication", icon: <MessageCircle className="w-6 h-6" /> },
  { name: "Regulatory Compliance", icon: <Scale className="w-6 h-6" /> },
];

const advisoryServicesRow2 = [
  { name: "Goal Setting", icon: <Target className="w-6 h-6" /> },
  { name: "Cash Flow Analysis", icon: <DollarSign className="w-6 h-6" /> },
  { name: "Debt Management", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Education Planning", icon: <GraduationCap className="w-6 h-6" /> },
  { name: "Healthcare Planning", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Legacy Planning", icon: <Users className="w-6 h-6" /> },
  { name: "Behavioral Finance", icon: <Brain className="w-6 h-6" /> },
  { name: "Market Timing", icon: <Clock className="w-6 h-6" /> },
  { name: "Alternative Investments", icon: <Star className="w-6 h-6" /> },
  { name: "ESG Investing", icon: <Leaf className="w-6 h-6" /> },
  { name: "International Markets", icon: <Globe className="w-6 h-6" /> },
  { name: "Currency Hedging", icon: <DollarSign className="w-6 h-6" /> },
  { name: "Derivatives Advisory", icon: <Scale className="w-6 h-6" /> },
];

const ServiceCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
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

const integrationOptions = [
  {
    title: "CRM Integration",
    description: "Seamless integration with existing CRM and advisory platforms",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Portfolio Management",
    description: "Connect with portfolio management systems and custodians",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Support.png",
  },
  {
    title: "Client Portal",
    description: "White-label client portal for financial planning",
    icon: <Settings className="w-6 h-6" />,
    image: "/Hosted Page.png",
  },
  {
    title: "Mobile Advisory App",
    description: "Native mobile applications for advisors and clients",
    icon: <Terminal className="w-6 h-6" />,
    image: "/JavaScript SDK.png",
  }
];

const developerFeatures = [
  {
    title: "Advisory API",
    description: "Comprehensive API for financial planning and advisory services",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Real-Time Data", 
    description: "Live market data and portfolio updates via WebSocket",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Notification.png",
  },
  {
    title: "Analytics Engine",
    description: "Advanced analytics and AI-driven insights",
    icon: <Settings className="w-6 h-6" />,
    image: "/Field-level Config.png",
  },
  {
    title: "Reporting SDK",
    description: "Customizable reporting and visualization tools",
    icon: <Terminal className="w-6 h-6" />,
    image: "/JavaScript SDK.png",
  }
];

function IntegrationDeveloperTabs() {
  const [activeTab, setActiveTab] = React.useState<string>("integration");
  const tabsData = [
    { id: "integration", title: "Integration Modes" },
    { id: "developer", title: "Developer Features" }
  ];
  const [progressKey, setProgressKey] = React.useState(0);

  return (
    <div className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
      <div className="flex justify-center my-8 mx-2">
        <div className="flex items-center gap-2 sm:gap-4 p-2 rounded-full border-b-4 border border-slate-200 bg-linear-to-br from-white to-slate-100 backdrop-blur-md shadow-sm overflow-x-auto scrollbar-hide min-w-0 max-w-full">
          {tabsData.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 sm:px-8 py-4 text-sm sm:text-md font-medium rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0 ${
                activeTab === tab.id
                  ? "text-white font-semibold"
                  : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-moneyone-tab"
                  className="absolute inset-0 bg-[#00b140] border-b-4 border-[#008000] rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "integration" ? (
            <>
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                    <span className={metallicBlackTextClasses}>Multiple Ways to Integrate</span>
                  </h3>
                  <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-7xl">
                    From CRM integration to mobile apps, choose the method that best fits your advisory platform.
                  </p>
                </div>
                <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4 shadow-none">
                  {integrationOptions.map((option, index) => (
                    <BentoGridItem
                      key={index}
                      className="shadow-sm"
                      icon={
                        <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                          {option.icon}
                        </div>
                      }
                      title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{option.title}</span>}
                      description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{option.description}</span>}
                      image={{
                        src: option.image,
                        alt: option.title
                      }}
                      imagePosition="top-right"
                      imageSize="w-40 h-40 -top-10 -right-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-40 xl:h-40 xl:-top-10 xl:-right-10 2xl:w-64 2xl:h-64 2xl:-top-5 2xl:-right-10"
                    />
                  ))}
                </BentoGrid>
              </div>
              {/* Integration Architecture Visual */}
              <div className="hidden md:block overflow-hidden h-100 relative mt-8">
                <div className="mt-8 text-center">
                  <Image
                    src="/Aggregator of Aggregators.png"
                    alt="Integration Architecture Diagram"
                    width={600}
                    height={600}
                    className="mx-auto"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none"></div>
              </div>
            </>
          ) : (
            <>
              <div className="px-8 pt-8 pb-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                    <span className={metallicBlackTextClasses}>Developer-First Platform</span>
                  </h3>
                  <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                    Built with developers in mind, MoneyOne provides comprehensive APIs, SDKs, and tools for seamless advisory integration.
                  </p>
                </div>
                {/* Developer Features Grid */}
                <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
                  {developerFeatures.map((feature, index) => (
                    <BentoGridItem
                      key={index}
                      className="shadow-sm"
                      icon={
                        <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                          {feature.icon}
                        </div>
                      }
                      title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{feature.title}</span>}
                      description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                      image={{
                        src: feature.image,
                        alt: feature.title
                      }}
                      imagePosition="top-right"
                      imageSize="w-40 h-40 -top-10 -right-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-40 xl:h-40 xl:-top-10 xl:-right-10 2xl:w-64 2xl:h-64 2xl:-top-20 2xl:-right-15"
                    />
                  ))}
                </BentoGrid>
              </div>
              {/* Developer Code Example - Edge to Edge */}
              <div className="hidden md:block overflow-hidden h-100 relative mt-8">
                <div className="mt-8 text-center">
                  <Image
                    src="/dev-image.png"
                    alt="Developer API Code Example"
                    width={1200}
                    height={1200}
                    className="mx-auto"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none"></div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 