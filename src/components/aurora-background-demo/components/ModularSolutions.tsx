"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, Shield, Building, IndianRupee, BarChart3, Smartphone, Heart, Building2, AlertTriangle, UserCheck } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";

const MotionLink = motion(Link);

// Custom MetricsCounter component with better viewport detection
const MetricsCounter = React.memo<{ 
  value: number; 
  className?: string; 
  fixedDecimals?: number; 
  duration?: number;
  id: string;
}>(({ value, className, fixedDecimals, duration = 2, id }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Less restrictive margin

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplayValue(fixedDecimals !== undefined ? parseFloat(latest.toFixed(fixedDecimals)) : Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, fixedDecimals, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
});

MetricsCounter.displayName = 'MetricsCounter';

// Metrics data for each section
const employmentMetrics = [
  { id: "uptime", value: 99, label: "Service Uptime", prefix: "", suffix: "%" },
  { id: "users", value: 10, label: "Indians Using Equal", prefix: "", suffix: "L+" },
  { id: "companies", value: 50, label: "Companies using Equal", prefix: "", suffix: "+" },
];

const financialMetrics = [
  { id: "fips", value: 120, label: "FIPs use MoneyOne", prefix: "", suffix: "+" },
  { id: "traffic", value: 50, label: "of all AA traffic", prefix: "", suffix: "%" },
  { id: "transfers", value: 160, label: "Data transfers complete", prefix: "", suffix: "M" },
];

const industryMetrics = [
  { id: "fip", value: 1, label: "FIP Coverage in India", prefix: "#", suffix: "" },
  { id: "data", value: 79.9, label: "Data Packets Delivered", prefix: "", suffix: "M", fixedDecimals: 1 },
  { id: "consents", value: 28, label: "Consents Fulfilled Monthly", prefix: "", suffix: "M" },
] as Array<{ id: string; value: number; label: string; prefix: string; suffix: string; fixedDecimals?: number }>;

const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

// Metrics component
const MetricsGrid = React.memo<{ metrics: Array<{ id: string; value: number; label: string; prefix: string; suffix: string; fixedDecimals?: number }> }>(({ metrics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION_CONFIG.duration,
        delay: 0.4
      }}
      className="grid grid-cols-3 gap-8 md:gap-4 mt-8"
    >
      {metrics.map((stat) => (
        <div key={stat.id} className="flex flex-col items-center md:items-start text-center">
          <div className="text-2xl md:text-3xl lg:text-4xl mb-1">
            <span className={metallicTextClasses}>{stat.prefix}</span>
            {stat.id === 'fip' ? (
              <span className={metallicTextClasses}>1</span>
            ) : (
              <MetricsCounter 
                value={stat.value} 
                {...(stat.fixedDecimals !== undefined && { fixedDecimals: stat.fixedDecimals })}
                className={metallicTextClasses}
                id={stat.id}
                duration={2}
              />
            )}
            <span className={metallicTextClasses}>{stat.suffix}</span>
          </div>
          <p className="text-xs md:text-sm text-center md:text-left font-medium text-slate-600">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
});

MetricsGrid.displayName = 'MetricsGrid';

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt:string;
    width: number;
    height: number;
  };
  href: string;
  icon: React.ReactNode;
}

interface SolutionSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: SolutionItem[];
}

const solutionSections: SolutionSection[] = [
  
  {
    id: "financial",
    title: "Financial Services",
    subtitle: "BFSI Products",
    description: "Banking, Financial Services & Insurance technology solutions powered by data aggregation and AI analytics.",
    items: [
      {
        id: "financial-analytics",
        title: "Financial Analytics",
        description: "Powerful insights from financial data with AI analytics.",
        image: {
          src: "/Financial Analytics.png",
          alt: "Financial Analytics",
          width: 80,
          height: 80
        },
        href: "/equal/solutions/financial-services#moneyone-section",
        icon: <BarChart3 size={24} />
      },
      {
        id: "finpro-fiu",
        title: "FinPro FIU TSP",
        description: "Financial Information User TSP for seamless data consumption.",
        image: {
          src: "/HR OPS.png",
          alt: "FinPro FIU TSP",
          width: 80,
          height: 80
        },
        href: "/moneyone/products/finpro",
        icon: <Building2 size={24} />
      },
      {
        id: "finshare",
        title: "FinShare",
        description: "A powerful TSP service tailored for FIPs",
        image: {
          src: "/Exception Managment Engine.png",
          alt: "FinShare",
          width: 80,
          height: 80
        },
        href: "/moneyone/products/finshare",
        icon: <Smartphone size={24} />
      },
      {
        id: "onemoney-aa",
        title: "OneMoney AA",
        description: "India's largest Account Aggregator platform for consent-driven data sharing.",
        image: {
          src: "/Candidate Consent Records.png",
          alt: "OneMoney AA",
          width: 80,
          height: 80
        },
        href: "/onemoney",
        icon: <IndianRupee size={24} />
      }
    ]
  },
  {
    id: "employment",
    title: "Employee Verification",
    subtitle: "KYE Products",
    description: "Identity verification and background check solutions for workforce management across all industries and company sizes.",
    items: [
      {
        id: "enterprise-hiring",
        title: "Enterprise Hiring",
        description: "Advanced identity and KYC solutions with real-time verification.",
        image: {
          src: "/Recruitment.png",
          alt: "Enterprise Hiring",
          width: 80,
          height: 80
        },
        href: "/equal/solutions/enterprise-hiring",
        icon: <Building size={24} />
      },
      {
        id: "gig-hiring",
        title: "Gig Economy Hiring",
        description: "Onboard gig workers at scale with streamlined verification.",
        image: {
          src: "/Gig Economy Hiring.png",
          alt: "Gig Hiring",
          width: 80,
          height: 80
        },
        href: "/equal/solutions/gig-hiring",
        icon: <Users size={24} />
      },
      {
        id: "staffing-contract",
        title: "Staffing & Contract Roles",
        description: "Modern verification engine for rapid contract onboarding.",
        image: {
          src: "/Staffing & Contract Roles.png",
          alt: "Staffing & Contract Roles",
          width: 80,
          height: 80
        },
        href: "/equal/solutions/staffing",
        icon: <Briefcase size={24} />
      },
      {
        id: "financial-services",
        title: "Financial Services",
        description: "Gain in-depth insights into financial history with our AI-powered analytics.",
        image: {
          src: "/Financial Analytics.png",
          alt: "Financial Analytics",
          width: 80,
          height: 80
        },
        href: "/equal/solutions/financial-services",
        icon: <UserCheck size={24} />
      }
    ]
  }
];

// New Industry Innovation Section Component
const IndustryInnovationSection = React.memo(() => {
  const metrics = industryMetrics;
  const cta = { text: "Download Equal AI", href: "/innovation" };

  return (
    <section className="relative w-full px-8 pt-16 mt-12 pb-16 md:py-20 xl:px-12 2xl:px-24 transform -skew-y-2 overflow-hidden mb-24">
      {/* Ethereal Shadow Background */}
      <div className="absolute inset-0 z-0">
        <EtherealShadow
          color="#00b140"
          animation={{
            scale: 60,
            speed: 50
          }}
          noise={{
            opacity: 0.8,
            scale: 1.2
          }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: [
            `linear-gradient(135deg, 
              rgba(0, 120, 40, 0.95) 0%, 
              rgba(186, 255, 41, 0.8) 35%,
              rgba(0, 90, 30, 0.9) 70%,
              rgba(186, 255, 41, 0.7) 100%
            )`,
            `linear-gradient(135deg, 
              rgba(186, 255, 41, 0.85) 0%, 
              rgba(0, 100, 35, 0.9) 30%,
              rgba(186, 255, 41, 0.8) 65%,
              rgba(0, 120, 40, 0.95) 100%
            )`
          ],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      />

      <div className="relative z-10 mx-auto transform skew-y-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut",
              delay: 0.2
            }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.1
              }}
            >
              <span className="text-sm text-center md:text-left font-semibold text-white tracking-widest uppercase mb-4 block">
                ✨ CONSUMER
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.2
              }}
              className={`text-3xl md:text-4xl lg:text-8xl drop-shadow-lg leading-tight text-center md:text-left text-white font-bold`}
            >
              India's <br />
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
                AI Assistant
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.3
              }}
              className="text-md md:text-lg text-center md:text-left text-white font-medium leading-relaxed"
            >
              Let Equal AI handle all your unknown calls
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.5
              }}
              className="mt-8 flex justify-center md:justify-start"
            >
              <Link href={cta.href}>
                <ShimmerButton className="text-md md:text-lg">
                  {cta.text}
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut",
              delay: 0.4
            }}
            className="relative"
          >
            <div className="relative w-full h-96 hidden md:block">
              <Image
                src="/AI Intelligence.png"
                alt="AI Intelligence and Innovation"
                width={600}
                height={600}
                className=" absolute h-auto object-contain bottom-[-120px] right-[-150px]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

IndustryInnovationSection.displayName = 'IndustryInnovationSection';

// Removed getColSpanClass function to ensure equal card widths

const SolutionSection = React.memo<{ section: SolutionSection; sectionIndex: number }>(({ section, sectionIndex }) => {
  // Get metrics based on section id
  const getMetricsForSection = (sectionId: string) => {
    switch (sectionId) {
      case "employment":
        return employmentMetrics;
      case "financial":
        return financialMetrics;
      case "industry":
        return industryMetrics;
      default:
        return [];
    }
  };

  // Get CTA data based on section id
  const getCTAForSection = (sectionId: string) => {
    switch (sectionId) {
      case "employment":
        return { text: "Explore Equal BGV", href: "/equal" };
      case "financial":
        return { 
          primary: { text: "Explore MoneyOne", href: "/moneyone" },
          secondary: { text: "Explore OneMoney AA", href: "/onemoney" }
        };
      case "industry":
        return { text: "Explore Solutions", href: "/solutions" };
      default:
        return { text: "Learn More", href: "#" };
    }
  };

  const metrics = getMetricsForSection(section.id);
  const cta = getCTAForSection(section.id);



  return (
    <section className="relative w-full px-8 pt-4 pb-12 md:py-12 xl:px-12 2xl:px-24">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Title and Description Column - Always on the left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut",
              delay: 0.2
            }}
            className="space-y-4 lg:col-span-2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.1
              }}
            >
              <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase mb-4 block">
                {section.subtitle}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.2
              }}
              className={`text-2xl md:text-4xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES}`}
            >
              {section.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.3
              }}
              className="text-sm text-slate-600 leading-relaxed"
            >
              {section.description}
            </motion.p>

            {/* Metrics Grid */}
            <MetricsGrid metrics={metrics} />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 0.5
              }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              {cta.primary ? (
                // Dual CTA layout for financial section
                <>
                  <Link href={cta.primary.href}>
                    <ShimmerButton className="text-md md:text-lg">
                      {cta.primary.text}
                    </ShimmerButton>
                  </Link>
                  <Link href={cta.secondary.href}>
                    <button className="group inline-flex items-center px-4 py-3 bg-gradient-to-tr from-slate-100 to-white backdrop-blur-md border border-b-4 border-[#00b140]/20 text-[#00b140] text-md md:text-lg font-semibold rounded-full transition-all duration-300 overflow-hidden flex-shrink-0 whitespace-nowrap hover:border-[#00b140] hover:shadow-md">
                      <span>{cta.secondary.text}</span>
                      <ArrowRight className="h-4 w-4 text-[#00b140] transition-all duration-300 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0" />
                    </button>
                  </Link>
                </>
              ) : (
                // Single CTA layout for other sections
                <Link href={cta.href}>
                  <ShimmerButton className="text-md md:text-lg">
                    {cta.text}
                  </ShimmerButton>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Bento Grid Column - Always on the right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut",
              delay: 0.4
            }}
            className="lg:col-span-3"
          >
            <BentoGrid className="gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {section.items.map((item, index) => (
                <MotionLink
                  key={item.id}
                  href={item.href}
                  target={item.id === "onemoney-aa" || item.id === "finpro-fiu" || item.id === "finshare" ? "_blank" : undefined}
                  rel={item.id === "onemoney-aa" || item.id === "finpro-fiu" || item.id === "finshare" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1
                  }}
                  className="group block h-full"
                >
                  <BentoGridItem
                    title={
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-[#00b140] transition-colors duration-300 text-md md:text-lg">
                          {item.title}
                        </span>
                        <div className="translate-x-0 group-hover:translate-x-1 group-hover:text-[#00b140] transition-all duration-300 ease-out">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    }
                    description={item.description}
                    icon={
                      <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white">
                        {item.icon}
                      </div>
                    }
                    image={{
                      src: item.image.src,
                      alt: item.image.alt
                    }}
                    imagePosition="top-right"
                    imageSize="w-40 h-40 top-[-50px] right-[-50px] md:w-20 md:h-20 xl:w-36 xl:h-36 xl:top-[-40px] xl:right-[-30px] 2xl:w-48 2xl:h-48 2xl:top-[-65px] 2xl:right-[-50px]"
                    className="h-full bg-white/50 backdrop-blur-md border-slate-200/80 hover:border-[#00b140]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00b140]/10"
                  />
                </MotionLink>
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

SolutionSection.displayName = 'SolutionSection';

const ModularSolutions = React.memo(() => {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <section className="relative w-full pt-12 pb-4 md:py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut"
            }}
            className="space-y-6"
          >
            <span className="text-sm md:text-base font-semibold text-[#00b140] tracking-widest uppercase">
              OUR PRODUCT SUITE
            </span>
            <h1 className={`text-2xl md:text-5xl lg:text-5xl mt-8 leading-tight ${METALLIC_BLACK_TEXT_CLASSES} max-w-6xl mx-auto`}>
              A
              {" "}<span className="inline-block bg-[#baff29] px-2 text-black font-bold">
                fully-integrated
              </span>{" "}
              suite of data sharing products
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Solution Sections */}
      {solutionSections.map((section, index) => (
        <React.Fragment key={section.id}>
          <SolutionSection 
            section={section} 
            sectionIndex={index} 
          />
          {/* Add Industry Innovation Section after Employment */}
          {section.id === "employment" && <IndustryInnovationSection />}
        </React.Fragment>
      ))}
    </div>
  );
});

ModularSolutions.displayName = 'ModularSolutions';

export { ModularSolutions }; 