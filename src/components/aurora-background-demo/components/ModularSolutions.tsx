"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";

const MotionLink = motion(Link);

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
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2 | 3;
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
    id: "employment",
    title: "Employment Solutions",
    subtitle: "WORKFORCE MANAGEMENT",
    description: "Identity verification and background check solutions for workforce management across all industries and company sizes.",
    items: [
      {
        id: "enterprise-hiring",
        title: "Enterprise Hiring",
        description: "Advanced identity and KYC solutions for enterprise hiring with real-time verification and seamless HRMS integration.",
        image: {
          src: "/Recruitment.png",
          alt: "Enterprise Hiring",
          width: 80,
          height: 80
        },
        href: "/equal/products/identity-gateway",
        colSpan: 2
      },
      {
        id: "gig-hiring",
        title: "Gig Economy Hiring",
        description: "Onboard gig workers at scale with ease using our streamlined verification process.",
        image: {
          src: "/Gig Economy Hiring.png",
          alt: "Gig Hiring",
          width: 80,
          height: 80
        },
        href: "/equal/products/console",
        colSpan: 1
      },
      {
        id: "staffing-contract",
        title: "Staffing & Contract Roles",
        description: "High-volume contract staffing needs a modern verification engine for rapid onboarding.",
        image: {
          src: "/Staffing & Contract Roles.png",
          alt: "Staffing & Contract Roles",
          width: 80,
          height: 80
        },
        href: "/equal/products/console",
        colSpan: 1
      },
      {
        id: "workforce-management",
        title: "Workforce Management",
        description: "Complete employee lifecycle management solutions with automated compliance tracking.",
        image: {
          src: "/Live Status Dashboard.png",
          alt: "Workforce Management",
          width: 80,
          height: 80
        },
        href: "/solutions/workforce",
        colSpan: 2
      }
    ]
  },
  {
    id: "financial",
    title: "Financial Services",
    subtitle: "BFSI SOLUTIONS",
    description: "Banking, Financial Services & Insurance technology solutions powered by data aggregation and AI analytics.",
    items: [
      {
        id: "onemoney-aa",
        title: "OneMoney AA",
        description: "India's largest Account Aggregator platform enabling consent-driven financial data sharing for better lending decisions.",
        image: {
          src: "/Candidate Consent Records.png",
          alt: "OneMoney AA",
          width: 80,
          height: 80
        },
        href: "/onemoney",
        colSpan: 2
      },
      {
        id: "finpro-fiu",
        title: "FinPro FIU TSP",
        description: "Financial Information User Technology Service Provider for seamless data consumption.",
        image: {
          src: "/HR OPS.png",
          alt: "FinPro FIU TSP",
          width: 80,
          height: 80
        },
        href: "/moneyone/products/finpro",
        colSpan: 1
      },
      {
        id: "financial-analytics",
        title: "Financial Analytics",
        description: "Get powerful insights from financial data, powered by AI and machine learning algorithms.",
        image: {
          src: "/Financial Analytics.png",
          alt: "Financial Analytics",
          width: 80,
          height: 80
        },
        href: "/solutions/analytics",
        colSpan: 1
      },
      {
        id: "oneapp",
        title: "OneApp Platform",
        description: "Unified financial application platform with customizable UI and advanced analytics dashboard.",
        image: {
          src: "/Mobile UX.png",
          alt: "OneApp",
          width: 80,
          height: 80
        },
        href: "/oneapp",
        colSpan: 2
      }
    ]
  },
  {
    id: "industry",
    title: "Industry Solutions",
    subtitle: "VERTICAL SPECIALIZATION",
    description: "Specialized solutions tailored for specific industry verticals and their unique compliance requirements.",
    items: [
      {
        id: "healthcare",
        title: "Healthcare",
        description: "Secure patient data management and verification with HIPAA compliance and advanced encryption.",
        image: {
          src: "/Healthcare.png",
          alt: "Healthcare",
          width: 80,
          height: 80
        },
        href: "/solutions/healthcare",
        colSpan: 2
      },
      {
        id: "government",
        title: "Government Contracts",
        description: "Compliance-ready solutions for government projects with enhanced security protocols.",
        image: {
          src: "/Government Contracts.png",
          alt: "Government Contracts",
          width: 80,
          height: 80
        },
        href: "/solutions/government",
        colSpan: 1
      },
      {
        id: "compliance",
        title: "Compliance & Risk",
        description: "Automated compliance checks and risk assessment with real-time monitoring and alerts.",
        image: {
          src: "/Compliance.png",
          alt: "Compliance",
          width: 80,
          height: 80
        },
        href: "/solutions/compliance",
        colSpan: 1
      },
      {
        id: "recruitment",
        title: "Recruitment Solutions",
        description: "End-to-end background verification for HR teams with bulk processing capabilities and detailed reporting.",
        image: {
          src: "/Recruitment.png",
          alt: "Recruitment",
          width: 80,
          height: 80
        },
        href: "/solutions/recruitment",
        colSpan: 2
      }
    ]
  }
];

const getColSpanClass = (colSpan?: 1 | 2 | 3) => {
  switch (colSpan) {
    case 2:
      return "md:col-span-2";
    case 3:
      return "md:col-span-3";
    default:
      return "md:col-span-1";
  }
};

const SolutionSection = React.memo<{ section: SolutionSection; sectionIndex: number }>(({ section, sectionIndex }) => {
  const isEven = sectionIndex % 2 === 0;

  return (
    <section className="relative w-full py-20 px-24">
      <div className=" mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* Title and Description Column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut",
              delay: 0.2
            }}
            className={`space-y-6 lg:col-span-2 ${!isEven ? 'lg:col-start-4' : ''}`}
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
              className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES}`}
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
              className="text-lg text-slate-600 leading-relaxed"
            >
              {section.description}
            </motion.p>
          </motion.div>

          {/* Bento Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              ease: "easeOut",
              delay: 0.4
            }}
            className={`lg:col-span-3 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
          >
            <BentoGrid className="gap-4">
              {section.items.map((item, index) => (
                <MotionLink
                  key={item.id}
                  href={item.href}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1
                  }}
                  className={cn("group block h-full", getColSpanClass(item.colSpan))}
                >
                  <BentoGridItem
                    title={
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-[#00b140] transition-colors duration-300">
                          {item.title}
                        </span>
                        <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                          <ArrowRight className="w-4 h-4 text-[#00b140]" />
                        </div>
                      </div>
                    }
                    description={item.description}
                    image={{
                      src: item.image.src,
                      alt: item.image.alt
                    }}
                    imagePosition="top-right"
                    imageSize="w-16 h-16 md:w-20 md:h-20"
                    imageClassName="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    className="h-full bg-white/50 hover:bg-[#00b140]/5 border-slate-200/80 hover:border-[#00b140]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00b140]/10"
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
      <section className="relative w-full py-20 px-4">
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
            <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
              Modular solutions
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-7xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES} max-w-5xl mx-auto`}>
              A fully integrated suite of{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
                financial
              </span>{" "}
              and identity products
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Reduce costs, grow revenue, and run your business more efficiently on a fully integrated, 
              AI-powered platform. Our modular approach lets you choose exactly what you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Sections */}
      {solutionSections.map((section, index) => (
        <SolutionSection 
          key={section.id} 
          section={section} 
          sectionIndex={index} 
        />
      ))}
    </div>
  );
});

ModularSolutions.displayName = 'ModularSolutions';

export { ModularSolutions }; 