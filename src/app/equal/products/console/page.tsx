'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, BarChart, Settings, Zap, Shield, CheckCircle, XCircle, AlertTriangle, Workflow, Users, LineChart, Building, UserCheck, FileSpreadsheet, Database } from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import Marquee from "react-fast-marquee";
import { cn } from '@/lib/utils';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const withoutEqual = [
  "Scattered emails, PDFs, WhatsApp screenshots",
  "Multiple vendors = multiple logins",
  "Manual report compilation = delays",
];

const withEqual = [
  "Centralized dashboard with status tracking",
  "Unified control over all vendors through Equal",
  "Auto-consolidated BGV reports, ready to download",
];

const consoleModules = [
  {
    title: "Live Status Dashboard",
    description: "Track candidates by name, ID, location, batch, or job role. Filter by 'pending', 'in-progress', 'failed', 'completed'. See timestamps of every step in the verification lifecycle.",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },
  {
    title: "Consolidated Report Manager",
    description: "Download all reports (PDF, CSV) for an individual or in bulk. Supports interim and final reports. Filter by verification type or date range.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Exception Management Engine",
    description: "Get real-time alerts for insufficiencies, delays, or mismatches. Approve, reject, escalate from the dashboard. Auto-assign to internal teams or re-route to backup vendors.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    title: "Custom Workflow Builder",
    description: "Build different flows for full-time vs contract vs gig roles. Create client-specific workflows if you're a staffing aggregator. Set mandatory/optional checks per job category.",
    icon: <Workflow className="w-6 h-6" />,
  },
  {
    title: "Bulk Management Tools",
    description: "Upload spreadsheets of 1000+ candidates. Trigger batch BGV with one click. Download all verification results as one zip.",
    icon: <FileSpreadsheet className="w-6 h-6" />,
  },
];

const reportsAndAnalytics = [
  {
    title: "TAT Dashboards",
    description: "Track average time-to-complete per check, role, or location to identify and resolve bottlenecks.",
    icon: <LineChart className="w-6 h-6" />,
    image: "/TATs.png",
    features: ["Role-Based Time Tracking", "Bottleneck Identification", "SLA Monitoring"]
  },
  {
    title: "Drop-off Analysis",
    description: "Visualize where candidates abandon the process, helping you optimize the verification flow for higher completion rates.",
    icon: <BarChart className="w-6 h-6" />,
    image: "/funnels.png",
    features: ["Funnel Visualization", "User Journey Analysis", "Completion Rate Optimization"]
  },
  {
    title: "Verification Timeline",
    description: "Get a detailed, chronological view of every candidate's journey, with timestamps for each verification step.",
    icon: <Workflow className="w-6 h-6" />,
    image: "/timeline.png",
    features: ["Chronological Timestamps", "Event-by-Event Tracking", "Complete Audit Trail"]
  },
  {
    title: "Exception Handling",
    description: "Make Equal Console your single source of truth for insufficiencies. Approve, reject, or escalate right from the dashboard.",
    icon: <Shield className="w-6 h-6" />,
    image: "/exceptions.png",
    features: ["Centralized Insufficiency Queue", "One-Click Case Resolution", "Automated Re-routing"]
  }
];

const teamRoles = [
  {
    role: "HR Ops",
    description: "Track onboarding, upload docs, download reports",
    icon: <Users className="w-6 h-6" />,
  },
  {
    role: "Compliance",
    description: "Verify audit trails, approve exceptions",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    role: "Recruitment",
    description: "Monitor candidate stages, retry failed BGVs",
    icon: <UserCheck className="w-6 h-6" />,
  },
  {
    role: "IT/Admin",
    description: "Set up API/webhook configs, role permissions",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    role: "CXOs",
    description: "View analytics on verification health",
    icon: <Building className="w-6 h-6" />,
  }
];

const integrations = [
  "Export to Darwinbox, Workday, SAP",
  "Push reports into internal CRMs or DMS",
  "Connect BI dashboards (PowerBI, Tableau) via webhook/API"
];

// Horizontal Point List Component
const HorizontalPointList = ({ items, textColor }: { items: (string | undefined)[], textColor: string }) => {
    const validItems = items.filter(Boolean);
    const listRef = React.useRef<HTMLDivElement>(null);
    const [useMarquee, setUseMarquee] = React.useState(false);

    React.useLayoutEffect(() => {
        const checkOverflow = () => {
            if (listRef.current) {
                const { scrollWidth, clientWidth } = listRef.current;
                const isOverflowing = scrollWidth > clientWidth;
                if (isOverflowing !== useMarquee) {
                    setUseMarquee(isOverflowing);
                }
            }
        };

        // A small delay can help ensure the DOM is fully rendered before measurement.
        const timer = setTimeout(checkOverflow, 50);
        window.addEventListener('resize', checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [validItems, useMarquee]);

    if (validItems.length === 0) return null;

    const content = validItems.map((point, idx) => (
        <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{point}</span>
            {idx < validItems.length - 1 && <span className="text-white mx-2">&bull;</span>}
        </React.Fragment>
    ));

    if (useMarquee) {
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
    }

    return (
        <div
            ref={listRef}
            className={`flex flex-nowrap items-center justify-center gap-x-4 text-sm font-medium text-[16px] ${textColor} w-full overflow-x-hidden`}
        >
            {content}
        </div>
    );
};

export default function ConsolePage() {
  const [activeReportId, setActiveReportId] = useState(reportsAndAnalytics[0].title);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeReport = reportsAndAnalytics.find(p => p.title === activeReportId);
  const LOADER_DURATION_S = 8;

  useEffect(() => {
    if (!hasBeenInView) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
        const currentIndex = reportsAndAnalytics.findIndex(p => p.title === activeReportId);
        const nextIndex = (currentIndex + 1) % reportsAndAnalytics.length;
        setActiveReportId(reportsAndAnalytics[nextIndex].title);
        setProgressKey(prev => prev + 1);
    }, LOADER_DURATION_S * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeReportId, hasBeenInView]);

  const handleCardClick = (id: string) => {
    setActiveReportId(id);
    setProgressKey(prev => prev + 1);
  };

  return (
    <div className="relative">
      <GridBackground />
      
      {/* Hero Section */}
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-12 pb-12 min-h-screen lg:min-h-[700px] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center pl-1 pr-3 py-1 text-md font-semibold text-slate-800 mb-4 space-x-2 mx-auto lg:mx-0">
                <Image
                  src="/icons8-medal-94.png"
                  alt="Medal icon"
                  width={24}
                  height={24}
                />
                <span>India&apos;s Most Powerful Verification Console</span>
              </span>
              <h1 className="text-3xl tracking-tight leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-6xl">
                <span className={metallicBlackTextClasses}>Your Single Pane of Glass for</span>{" "}
                <span className={highlightBgClass}>All Verifications</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-4">
                The Equal Console is your real-time dashboard to monitor candidate progress, resolve issues, 
                generate reports, and manage bulk hiring — all in one place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowingButton>
                Book Console Demo
              </GlowingButton>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex relative w-full h-full items-center justify-center">
          <Image
            src="/console-graphic.png"
            alt="Equal Console Graphic"
            width={800}
            height={600}
            className="object-contain"
          />
        </div>
      </section>

      {/* Console Modules Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">
              <span className={metallicBlackTextClasses}>Transform Your</span>{" "}
              <span className={highlightBgClass}>Verification Workflow</span>
            </h2>
            <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 max-w-6xl">
              From live tracking and exception handling to bulk operations and custom workflows, the Equal Console centralises every aspect of your verification process.
            </p>
          </div>
          <div className="space-y-6">
            {/* First Row - 2 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              {consoleModules.slice(0, 2).map((feature, index) => (
                <BentoGridItem
                  key={index}
                  className="shadow-sm"
                  icon={
                    <div className="p-3 rounded-lg bg-[#00b140] text-white  inline-block mb-2">
                      {feature.icon}
                    </div>
                  }
                  title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{feature.title}</span>}
                  description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                />
              ))}
            </BentoGrid>
            
            {/* Second Row - 3 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
              {consoleModules.slice(2, 5).map((feature, index) => (
                <BentoGridItem
                  key={index + 2}
                  className="shadow-sm"
                  icon={
                    <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                      {feature.icon}
                    </div>
                  }
                  title={<span className="text-xl font-bold text-slate-900 dark:text-slate-100">{feature.title}</span>}
                  description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                />
              ))}
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* Before and After Banners - Edge to Edge */}
      <section className="relative w-full">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden bg-linear-to-r from-[#ce4257] to-[#720026] dark:bg-red-500/10 pt-2 pb-4 text-center">
            <h3 className="text-lg font-medium tracking-widest text-white uppercase mb-4 mt-2">WITHOUT EQUAL</h3>
            <HorizontalPointList items={withoutEqual} textColor="text-white" />
            <Image 
              src="/thumbs-up.png"
              alt="Thumbs Down"
              width={100}
              height={100}
              className="absolute -top-2 -right-4 rotate-180 opacity-70"
            />
          </div>
          <div className="relative overflow-hidden bg-linear-to-l from-[#40916c] to-[#2d6a4f] dark:bg-green-500/10 pt-2 pb-4 text-center">
             <h3 className="text-lg font-medium tracking-wider text-white uppercase mb-4 mt-2">WITH EQUAL</h3>
             <HorizontalPointList items={withEqual} textColor="text-white" />
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

      {/* Reports & Analytics Section */}
      <motion.section 
        className="relative w-full py-12 md:py-20"
        onViewportEnter={() => setHasBeenInView(true)}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
                <span className={metallicBlackTextClasses}>Data-Driven Insights,</span>{" "}
                <span className={highlightBgClass}>Actionable Analytics</span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
                The Equal Console doesn't just manage verifications; it provides powerful analytics to optimize your entire onboarding strategy.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Panel: Clickable Cards */}
            <div className="w-full md:w-1/3 space-y-4">
              {reportsAndAnalytics.map((report, index) => {
                const isActive = activeReportId === report.title;
                return (
                  <motion.div
                    key={report.title}
                    onClick={() => handleCardClick(report.title)}
                    className={cn(
                      'p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out',
                      isActive 
                        ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-[#00b140]/20 dark:border-neutral-600 scale-105' 
                        : 'dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:bg-background/20 hover:border-transparent dark:hover:border-neutral-600'
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  >
                    <div className="p-2 rounded-lg bg-[#00b140] text-white inline-block mb-3">{report.icon}</div>
                    <h3 className={cn('text-xl font-semibold mb-2', isActive ? 'text-slate-800 dark:text-green-400' : 'text-slate-600 dark:text-neutral-200')}>
                      {report.title}
                    </h3>
                    <p className={cn('text-sm mb-4', isActive ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-500 dark:text-neutral-400')}>
                      {report.description}
                    </p>
                    <div className="mt-auto h-1.5 w-full rounded-full overflow-hidden bg-slate-200/80 dark:bg-neutral-700/80">
                      <motion.div
                        key={progressKey}
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={isActive && hasBeenInView ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: isActive ? LOADER_DURATION_S : 0, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Panel: Active Image and Content */}
            <div className="w-full md:w-2/3 sticky top-24">
              <AnimatePresence mode="wait">
                {activeReport && (
                  <motion.div
                    key={activeReport.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="group relative overflow-hidden p-6 md:p-8 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md dark:bg-neutral-800/50 border border-[#00b140]/20 dark:border-neutral-700 h-full min-h-[550px] shadow-lg"
                  >
                    <h4 className="font-light tracking-widest text-lg mb-4 uppercase text-darkgreen dark:text-white">Key Capabilities</h4>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {activeReport.features.map((feature, index) => (
                          <div key={index} className="inline-block px-4 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
                              <div className="flex items-center gap-2">
                                  <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                  </span>
                                  <p className="xl:text-base text-sm text-slate-600 dark:text-slate-100 font-semibold">{feature}</p>
                              </div>
                          </div>
                        ))}
                    </div>

                    <div className="absolute md:bottom-[-250px] md:left-[10px] left-[10px] bottom-[-450px] xl:bottom-[-580px] xl:left-[15px] md:bottom-[-400px] w-[700px] h-[1000px] xl:w-[1000px] xl:h-[1200px] pointer-events-none">
                        <Image
                            src={activeReport.image}
                            alt={activeReport.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Built for Teams & Integrations Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
                  <span className={metallicBlackTextClasses}>Built for Your Entire Team,</span>{" "}
                  <span className={highlightBgClass}>Ready for Your Stack</span>
              </h2>
              <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
                  Equal Console is designed for every stakeholder in the hiring process and connects seamlessly with the tools you already use.
              </p>
          </div>

          <div className="mt-12 text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="inline-block px-4 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-base text-slate-800 dark:text-slate-100 font-medium">{integration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamRoles.slice(0, 3).map((role, index) => (
                <BentoGridItem
                  key={index}
                  className="shadow-sm"
                  icon={
                    <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                      {role.icon}
                    </div>
                  }
                  title={<span className="text-xl font-bold text-slate-900 dark:text-slate-100">{role.role}</span>}
                  description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{role.description}</span>}
                />
              ))}
            </BentoGrid>
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
                {teamRoles.slice(3, 5).map((role, index) => (
                <BentoGridItem
                    key={index}
                    className="shadow-sm"
                    icon={
                        <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                            {role.icon}
                        </div>
                    }
                    title={<span className="text-xl font-bold text-slate-900 dark:text-slate-100">{role.role}</span>}
                    description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{role.description}</span>}
                />
                ))}
            </BentoGrid>
          </div>
        </div>
      </section>
    </div>
  );
} 