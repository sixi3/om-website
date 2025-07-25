"use client";

import React, { lazy, Suspense } from "react";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Users, Clock, MessageCircle, ShieldCheck, Zap, Building, FileText, Link, CreditCard, Vote, Car, Share2, Scale, Globe, AlertTriangle, MapPin, Map, GraduationCap, UserCheck, FileCheck, Settings, Code, Webhook, Terminal } from "lucide-react";
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

export default function StaffingPage() {
  return (
    <div className="overflow-x-hidden">
      <>
      {/* Hero Section */}
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-12 pb-12 overflow-hidden min-h-[600px]">
        {/* Left: Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 z-10">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center pl-1 pr-3 py-1 text-xs lg:text-md font-semibold text-slate-800 mb-6 md:mb-4 space-x-2 mx-auto lg:mx-0">
                <Image
                  src="/Staffing & Contract Roles.png"
                  alt="Staffing icon"
                  width={24}
                  height={24}
                />
                <span>Flexible, Fast, and Compliant Staffing</span>
              </span>
              <h1 className="text-4xl tracking-tight leading-tight sm:text-8xl md:text-3xl lg:text-4xl xl:text-7xl">
                <span className={metallicBlackTextClasses}>Staffing & Contract</span>{" "}
                <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                  Roles Made Easy
                </span>{" "}
                <span className={metallicBlackTextClasses}>with Equal</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-8">
                Instantly verify, onboard, and manage contract and temporary staff. Equal empowers you to fill roles fast, control costs, and stay compliant—no matter how your workforce needs change.
              </p>
            </div>
            <div className="w-full flex flex-col items-center md:items-start mb-8">
              <span className="text-xs font-semibold tracking-widest text-slate-500 mb-2 uppercase">Trusted by top staffing agencies</span>
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
                <ShimmerButton className="w-full md:w-auto text-md md:text-lg uppercase">
                  Book a Staffing Demo
                </ShimmerButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Book a Demo</DialogTitle>
                  <DialogDescription>
                    See how Equal can help you scale your staffing and contract workforce with speed and compliance. Fill out the form below to schedule a demo with our team.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <TalkToUsForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Right: Video or Image */}
        <div className="hidden lg:flex relative w-full h-full items-center justify-center z-0">
          <Image
            src="/Staffing & Contract Roles.png"
            alt="Staffing Visual"
            width={600}
            height={600}
            className="object-contain w-[90%] h-[90%] max-h-[600px] max-w-[700px]"
            priority
          />
        </div>
      </section>
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      {/* Why Choose Equal Section */}
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
              <span className={metallicBlackTextClasses}>Why Choose</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Equal</span>{" "}
              <span className={metallicBlackTextClasses}>for Staffing & Contract Roles?</span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
              The fastest, most flexible, and most compliant way to hire and manage contract and temporary staff at scale.
            </p>
          </div>
          <div className="space-y-6">
            {/* First Row - 2 Cards */}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              {staffingReasons.slice(0, 2).map((item, idx) => (
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
              {staffingReasons.slice(2, 5).map((item, idx) => (
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
      {/* Stats Section */}
      <Suspense fallback={<SectionLoader />}>
        <Stats showVerifyBanner={false} />
      </Suspense>
      {/* World of IDs Section */}
      <section className="relative w-full pb-12 md:py-10 overflow-hidden">
        <Suspense fallback={<SectionLoader />}>
          {/* First Marquee - Full Width */}
          <div className="mb-0 md:mb-2">
            <Marquee gradient={false} speed={80} pauseOnHover={true} className="py-2 scale-75 md:scale-100">
              {[...verificationTypesRow1, ...verificationTypesRow1].map((type, index) => (
                <VerificationCard key={`row1-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
          </div>
          {/* Second Marquee - Full Width - Reverse Direction */}
          <div className="md:py-4">
            <Marquee gradient={false} speed={80} pauseOnHover={true} direction="right" className="py-2 scale-75 md:scale-100">
              {[...verificationTypesRow2, ...verificationTypesRow2].map((type, index) => (
                <VerificationCard key={`row2-${index}`} name={type.name} icon={type.icon} />
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
      <GlowingDivider
        width="3/4"
        intensity="high"
        delay={0.2}
        className="my-12"
      />
      {/* Stats Section */}
      <Suspense fallback={<SectionLoader />}>
        <Stats showVerifyBanner={false} />
      </Suspense>
      {/* World of IDs Section */}
      <section className="relative w-full pb-12 md:py-10 overflow-hidden">
        <Suspense fallback={<SectionLoader />}>
          {/* First Marquee - Full Width */}
          <div className="mb-0 md:mb-2">
            <Marquee gradient={false} speed={80} pauseOnHover={true} className="py-2 scale-75 md:scale-100">
              {[...verificationTypesRow1, ...verificationTypesRow1].map((type, index) => (
                <VerificationCard key={`row1-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
          </div>
          {/* Second Marquee - Full Width - Reverse Direction */}
          <div className="md:py-4">
            <Marquee gradient={false} speed={80} pauseOnHover={true} direction="right" className="py-2 scale-75 md:scale-100">
              {[...verificationTypesRow2, ...verificationTypesRow2].map((type, index) => (
                <VerificationCard key={`row2-${index}`} name={type.name} icon={type.icon} />
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
      {/* Integration & Developer Features Tabbed Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Build & Deploy with</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Equal</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-4xl md:text-lg">
              Choose from multiple integration modes and leverage powerful developer tools to implement Equal's Identity Gateway in your workflow.
            </p>
          </div>
          {/* Tab Indicator */}
          <IntegrationDeveloperTabs />
        </div>
      </section>
      </>
    </div>
  );
}

const staffingReasons = [
  {
    title: "Speed to Hire",
    description: "Fill critical contract and temp roles in hours, not days. Instantly verify and onboard staff to keep your business moving.",
    image: {
      src: "/Real-Time Verification.png",
      alt: "Real-Time Verification"
    },
    icon: <Clock size={20} className="text-white" />
  },
  {
    title: "Workforce Flexibility",
    description: "Easily scale your team up or down to match project surges, seasonal demand, or unexpected absences.",
    image: {
      src: "/Bulk Onboarding.png",
      alt: "Bulk Onboarding"
    },
    icon: <Users size={20} className="text-white" />
  },
  {
    title: "Automated Compliance",
    description: "Stay compliant with labor laws and regulations for contract and temp staff, with built-in checks and audit trails.",
    image: {
      src: "/Compliance.png",
      alt: "Compliance"
    },
    icon: <ShieldCheck size={20} className="text-white" />
  },
  {
    title: "Cost Control",
    description: "Avoid the overhead of full-time salaries and benefits. Only pay for the talent you need, when you need it.",
    image: {
      src: "/One Billing Layer.png",
      alt: "One Billing Layer"
    },
    icon: <Briefcase size={20} className="text-white" />
  },
  {
    title: "Specialized Skills On Demand",
    description: "Access niche expertise for short-term initiatives without needing a permanent hire.",
    image: {
      src: "/Smart Document parsing.png",
      alt: "Smart Document Parsing"
    },
    icon: <Zap size={20} className="text-white" />
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
                    From zero-code solutions to full API integration, choose the method that best fits your technical requirements.
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
                    Built with developers in mind, Equal provides comprehensive APIs, SDKs, and tools for seamless integration.
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