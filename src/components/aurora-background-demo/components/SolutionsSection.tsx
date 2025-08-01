'use client';
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid"; 
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, Users, Shield, BarChart3 } from "lucide-react";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const solutionsData = [
  {
    id: "financial-services",
    title: "Financial Services",
    description: "Digital transformation for banks and NBFCs with comprehensive identity verification and compliance solutions.",
    image: {
      src: "/Hosted Page.png",
      alt: "Financial Services",
      width: 56,
      height: 56
    },
    href: "/moneyone/financial-services",
    icon: <Building size={24} />,
    colSpan: 2 as const,
    rowSpan: 1 as const,
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-40px] w-32 h-32 lg:w-40 lg:h-40 lg:top-[-40px] lg:right-[-10px] lg:w-40 lg:h-40 xl:top-[-50px] xl:right-[-80px] xl:w-72 xl:h-72"
  },
  {
    id: "verification-services",
    title: "Verification Services",
    description: "Verify candidates across multiple platforms with comprehensive background checks and employment verification.",
    image: {
      src: "/HR OPS.png",
      alt: "Employee Verification",
      width: 56,
      height: 56
    },
    href: "/equal",
    icon: <Users size={24} />,
    colSpan: 1 as const,
    rowSpan: 1 as const,
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-30px] w-32 h-32 lg:top-[-30px] lg:right-[-30px] lg:w-40 lg:h-40"
  },
  {
    id: "identity-verification",
    title: "Identity Verification",
    description: "Advanced identity verification with multi-factor authentication and real-time document validation.",
    image: {
      src: "/Candidate Communication.png",
      alt: "Identity Verification",
      width: 56,
      height: 56
    },
    href: "/equal",
    icon: <Shield size={24} />,
    colSpan: 1 as const,
    rowSpan: 1 as const,
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-10px] right-[-30px] w-32 h-32 lg:top-[-50px] lg:right-[-50px] lg:w-40 lg:h-40"
  },
  {
    id: "financial-tsp",
    title: "Financial TSPs",
    description: "Explore our financial technology service providers",
    image: {
      src: "/Financial Analytics.png",
      alt: "Financial Analytics",
      width: 56,
      height: 56
    },
    href: "/moneyone",
    icon: <BarChart3 size={24} />,
    colSpan: 2 as const,
    rowSpan: 1 as const,
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-40px] w-32 h-32 lg:w-40 lg:h-40 lg:top-[-40px] lg:right-[-10px] lg:w-40 lg:h-40 xl:top-[-50px] xl:right-[-100px] xl:w-72 xl:h-72"
  },
];

export function SolutionsSection() {
  return (
    <motion.section
      className="relative w-full py-20 md:py-24 dark:bg-slate-900/60"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Empowering business with </span>{" "}
            <span className={highlightBgClass}>
              purpose-built solutions
            </span>
          </h2>
          <p className="w-4/5 mx-auto font-medium text-sm md:text-lg text-slate-700 dark:text-slate-300">
          A unified suite tailored for BFSI, HR, and compliance needs — enabling secure identity verification, analytics, and digital transformation.
          </p>
        </div>

        <BentoGrid className="gap-4">
          {solutionsData.map((item) => (
            <BentoGridItem
              key={item.id}
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
              description={<p className="text-sm max-w-xl text-slate-700 dark:text-slate-300">{item.description}</p>}
              icon={
                <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white">
                  {item.icon}
                </div>
              }
              colSpan={item.colSpan}
              rowSpan={item.rowSpan}
              image={item.image}
              imagePosition={item.imagePosition}
              imageClassName={item.imageClassName}
              className="group cursor-pointer h-full bg-white/50 backdrop-blur-md border-slate-200/80 hover:border-[#00b140]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00b140]/10"
              header={
                <div 
                  className="absolute inset-0 z-10 cursor-pointer" 
                  onClick={() => {
                    // Open first and last items in new tab
                    if (item.id === "financial-services" || item.id === "financial-tsp") {
                      window.open(item.href, '_blank', 'noopener,noreferrer');
                    } else {
                      window.location.href = item.href;
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // Open first and last items in new tab
                      if (item.id === "financial-services" || item.id === "financial-tsp") {
                        window.open(item.href, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.href = item.href;
                      }
                    }
                  }}
                />
              }
            />
          ))}
        </BentoGrid>
      </div>
    </motion.section>
  );
} 