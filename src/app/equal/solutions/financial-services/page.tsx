"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Building, FileText, Zap, MessageCircle, ShieldCheck, Link, CreditCard, Vote, Car, Share2, Scale, Globe, AlertTriangle, MapPin, Map, GraduationCap, Briefcase, Users, UserCheck, FileCheck, Settings, Code, Webhook, Terminal } from "lucide-react";
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
const FinancialServicesStats = lazy(() => import('./FinancialServicesStats').then(module => ({ default: module.FinancialServicesStats })));
const HowAAWorks = lazy(() => import("./HowAAWorks").then(module => ({ default: module.HowAAWorks })));
const MoneyOneSection = lazy(() => import("./MoneyOneSection").then(module => ({ default: module.MoneyOneSection })));
const Solutions = lazy(() => import("@/app/onemoney/sections/Solutions").then(module => ({ default: module.Solutions })));
const ContactUs = lazy(() => import("@/app/moneyone/sections/ContactUs").then(module => ({ default: module.ContactUs })));

// Loading component
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00b140]"></div>
  </div>
);
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const financialReasons = [
  {
    title: "India’s Largest AA Platform",
    description: "Powering 120+ FIPs and 50% of all Account Aggregator traffic in India.",
    image: {
      src: "/Collect Now, Verify Later.png",
      alt: "Account Aggregator"
    },
    icon: <CreditCard size={20} className="text-white" />
  },
  {
    title: "Consent-Driven Data Sharing",
    description: "Empower users with secure, consent-based access to their financial data.",
    image: {
      src: "/Secure Consent Capture.png",
      alt: "Consent Driven"
    },
    icon: <ShieldCheck size={20} className="text-white" />
  },
  {
    title: "AI-Powered Financial Analytics",
    description: "Unlock actionable insights with advanced analytics and reporting tools.",
    image: {
      src: "/Financial Analytics.png",
      alt: "Financial Analytics"
    },
    icon: <Zap size={20} className="text-white" />
  },
  {
    title: "Compliant & Secure",
    description: "RBI, SEBI, IRDAI compliant. ISO 27001, SOC 2, and GDPR-ready infrastructure.",
    image: {
      src: "/Role-based Access Control.png",
      alt: "Compliance"
    },
    icon: <FileText size={20} className="text-white" />
  }
];

// HERO SECTION - CUSTOMIZED FOR FINANCIAL SERVICES
export default function FinancialServicesHero() {
  const [showMarquee, setShowMarquee] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowMarquee(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to MoneyOne section if hash is present
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#moneyone-section') {
      const timer = setTimeout(() => {
        const element = document.getElementById('moneyone-section');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 1000); // Wait for content to load
      return () => clearTimeout(timer);
    }
  }, []);
  const clientLogos = [
    { src: "/client-logos/Frame 5.png", alt: "Client Logo 5" },
    { src: "/client-logos/Frame 6.png", alt: "Client Logo 6" },
    { src: "/client-logos/Frame 7.png", alt: "Client Logo 7" },
    { src: "/client-logos/Frame 8.png", alt: "Client Logo 8" },
    { src: "/client-logos/Frame 9.png", alt: "Client Logo 9" },
  ];
  return (
    <div className="overflow-x-hidden">
      <>
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-16 pb-12 overflow-hidden min-h-[600px]">
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
                <span>India’s Most Trusted Financial Data Infrastructure</span>
              </span>
              <h1 className="text-4xl tracking-tight leading-tight sm:text-8xl md:text-4xl lg:text-5xl xl:text-7xl">
                <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">Comprehensive</span>{" "}
                <span className={metallicBlackTextClasses}>
                  Financial Suite
                </span>{" "}
                <span className={metallicBlackTextClasses}>for All</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-4">
                Empowering financial institutions with secure, consent-driven data access and analytics.
              </p>
            </div>
            
            <div className="w-full flex flex-col items-center md:items-start mb-8">
              <span className="text-xs font-semibold tracking-widest text-slate-500 mb-2 uppercase">Trusted by Industry Leaders</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl items-center justify-items-center">
                {clientLogos.slice(0, 4).map((logo, idx) => (
                  <div key={logo.src} className="relative w-32 h-10 flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
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
                <ShimmerButton className="w-full md:w-auto text-md md:text-lg uppercase">
                  Book a Demo
                </ShimmerButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Get in touch with us today!</DialogTitle>
                  <DialogDescription>
                    Ready to leverage India’s most trusted financial data infrastructure?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <TalkToUsForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Right: Video or Lottie */}
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
      <GlowingDivider width="3/4" intensity="high" delay={0.2} className="my-12" />
      <Suspense fallback={<SectionLoader />}>
        <FinancialServicesStats />
      </Suspense>
      <GlowingDivider width="3/4" intensity="high" delay={0.2} className="my-12" />
      {/* WHY CHOOSE EQUAL SECTION - CUSTOMIZED FOR FINANCIAL SERVICES */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Why Choose Equal for</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Financial Services</span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
              India's most advanced, secure, and integrated financial data platform
            </p>
          </div>
          <div className="space-y-6">
          <div className="space-y-6">
            {/* First Row - 2 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              {financialReasons.slice(0, 2).map((item, idx) => (
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
            {/* First Row - 2 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              {financialReasons.slice(2, 4).map((item, idx) => (
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
        </div>
      </section>
    
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <HowAAWorks/>
      </Suspense>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <div id="moneyone-section">
          <MoneyOneSection />
        </div>
      </Suspense>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <Solutions />
      </Suspense>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      <Suspense fallback={<SectionLoader />}>
        <ContactUs />
      </Suspense>
      
      </>
    </div>
  );
}

const reasons = [
  {
    title: "Zero Workflow Disruption",
    description: "Trigger pre- and post-offer background checks directly from your HRMS dashboard.",
    image: {
      src: "/HRMS Integration.png",
      alt: "HRMS Integration"
    },
    icon: <Zap size={20} className="text-white" />
  },
  {
    title: "Single Vendor, Single Invoice",
    description: "Consolidate all BGV vendors into one contract, one dashboard, and one billing layer.",
    image: {
      src: "/One Billing Layer.png",
      alt: "One Billing Layer"
    },
    icon: <FileText size={20} className="text-white" />
  },
  {
    title: "Real-Time Results",
    description: "Most identity checks are completed in seconds, with auto-consolidated reports available instantly.",
    image: {
      src: "/Real-Time Verification.png",
      alt: "Real-Time Verification"
    },
    icon: <Zap size={20} className="text-white" />
  },
  {
    title: "Multi-Channel Candidate Communication",
    description: "Engage candidates via WhatsApp, SMS, and Email for higher completion rates.",
    image: {
      src: "/Candidate Communication.png",
      alt: "Candidate Communication"
    },
    icon: <MessageCircle size={20} className="text-white" />
  },
  {
    title: "Enterprise-Grade Security",
    description: "ISO 27001, SOC 2, and GDPR-compliant infrastructure.",
    image: {
      src: "/iso-cert.png",
      alt: "ISO Certification"
    },
    icon: <ShieldCheck size={20} className="text-white" />
  }
]; 

const verificationTypesRow1 = [
  { name: "Aadhaar", icon: <FileText className="w-6 h-6" /> },
  { name: "PAN Basic", icon: <FileText className="w-6 h-6" /> },
  { name: "PAN Advanced", icon: <Link className="w-6 h-6" /> },
  { name: "Bank Account Validation", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Voter ID", icon: <Vote className="w-6 h-6" /> },
  { name: "Driving License", icon: <Car className="w-6 h-6" /> },
  { name: "Vehicle RC", icon: <Car className="w-6 h-6" /> },
  { name: "ESIC", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Social Media", icon: <Share2 className="w-6 h-6" /> },
  { name: "Criminal Court", icon: <Scale className="w-6 h-6" /> },
  { name: "Police Verification", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Global Database", icon: <Globe className="w-6 h-6" /> },
  { name: "Payslip", icon: <FileText className="w-6 h-6" /> },
  { name: "Bank Statement", icon: <CreditCard className="w-6 h-6" /> },
];

const verificationTypesRow2 = [
  { name: "Credit Check", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Credit Default Database", icon: <AlertTriangle className="w-6 h-6" /> },
  { name: "Permanent Address", icon: <MapPin className="w-6 h-6" /> },
  { name: "Current Address", icon: <MapPin className="w-6 h-6" /> },
  { name: "Digital Address", icon: <Map className="w-6 h-6" /> },
  { name: "Education", icon: <GraduationCap className="w-6 h-6" /> },
  { name: "Employment & Conduct", icon: <Briefcase className="w-6 h-6" /> },
  { name: "Self-Employment", icon: <Building className="w-6 h-6" /> },
  { name: "PF UAN Advanced", icon: <FileText className="w-6 h-6" /> },
  { name: "CV Validation", icon: <FileCheck className="w-6 h-6" /> },
  { name: "Directorship Check", icon: <Users className="w-6 h-6" /> },
  { name: "Right to Work", icon: <UserCheck className="w-6 h-6" /> },
  { name: "Professional Reference", icon: <Users className="w-6 h-6" /> },
];

const VerificationCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
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
    title: "Hosted Page",
    description: "Zero code, white-labeled solution ready to use",
    icon: <Link className="w-6 h-6" />,
    image: "/Hosted Page.png",
  },
  {
    title: "HR Portal Embed",
    description: "Seamlessly embed in your existing HR portal",
    icon: <Settings className="w-6 h-6" />,
    image: "/HRMS Integration.png",
  },
  {
    title: "API Integration",
    description: "REST API to trigger gateway & receive updates",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Webhook Support",
    description: "Real-time status updates via webhooks",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Support.png",
  }
];

const developerFeatures = [
  {
    title: "REST API Integration",
    description: "Trigger gateway & receive real-time updates via comprehensive REST API endpoints",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Webhook Notifications", 
    description: "Push notifications on document upload or verification status changes",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Notification.png",
  },
  {
    title: "Field-Level Configuration",
    description: "Granular control and customization for each verification check",
    icon: <Settings className="w-6 h-6" />,
    image: "/Field-level Config.png",
  },
  {
    title: "JavaScript SDK",
    description: "Ready-to-use SDK and hosted environments for rapid development",
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
      <div className="flex justify-center mb-8 mt-8">
        <div className="flex items-center gap-2 p-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
          {tabsData.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 text-sm sm:text-base font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                activeTab === tab.id
                  ? "text-white"
                  : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-integration-tab"
                  className="absolute inset-0 bg-[#00b140] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
