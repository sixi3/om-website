'use client';
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid"; 
import { Network, Plug, BrainCircuit, ShieldCheck } from "lucide-react"; 
import { motion } from "framer-motion";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const pillarsData = [
  {
    id: "aggregator",
    title: "Aggregator of Aggregators",
    description: "50+ data partners, real-time failover, and smart routing to ensure the highest success rates.",
    icon: <Network size={32} strokeWidth={2} />,
    colSpan: 2 as const,
    rowSpan: 1 as const,
    image: {
      src: "/Aggregator of Aggregators.png",
      alt: "Aggregator of Aggregators"
    },
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-40px] w-32 h-32 lg:w-40 lg:h-40 lg:top-[-40px] lg:right-[-10px] lg:w-40 lg:h-40 xl:top-[-50px] xl:right-[-50px] xl:w-72 xl:h-72"
  },
  {
    id: "integration",
    title: "Integration-First Design",
    description: "Native HRMS embedding, workflow automation, and white-labeled delivery for a seamless experience.",
    icon: <Plug size={32} strokeWidth={2} />,
    colSpan: 1 as const,
    rowSpan: 1 as const,
    image: {
      src: "/Integration-First.png",
      alt: "Integration-First Design"
    },
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-30px] w-32 h-32 lg:top-[-30px] lg:right-[-30px] lg:w-40 lg:h-40"
  },
  {
    id: "ai-layer",
    title: "AI Intelligence Layer",
    description: "Advanced risk scoring, continuous monitoring, and predictive hiring insights powered by AI.",
    icon: <BrainCircuit size={32} strokeWidth={2} />,
    colSpan: 1 as const,
    rowSpan: 1 as const,
    image: {
      src: "/AI Intelligence.png",
      alt: "AI Intelligence Layer"
    },
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-30px] w-32 h-32 lg:top-[-30px] lg:right-[-30px] lg:w-40 lg:h-40"
  },
  {
    id: "compliance",
    title: "Compliance-First Approach",
    description: "RBI-licensed, GDPR-compliant, and ISO-certified to ensure the highest standards of security and privacy.",
    icon: <ShieldCheck size={32} strokeWidth={2} />,
    colSpan: 2 as const,
    rowSpan: 1 as const,
    image: {
      src: "/Compliance.png",
      alt: "Compliance-First Approach"
    },
    imagePosition: "custom" as const,
    imageClassName: "absolute top-[-20px] right-[-40px] w-32 h-32 lg:w-40 lg:h-40 lg:top-[-40px] lg:right-[-10px] lg:w-40 lg:h-40 xl:top-[-50px] xl:right-[-50px] xl:w-72 xl:h-72"
  },
];

export function WhatMakesEqualDifferent() {
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
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Why Equal is a</span>{" "}
            <span className={highlightBgClass}>
              Category of One
            </span>
          </h2>
          <p className="w-4/5 mx-auto font-medium text-lg text-slate-700 dark:text-slate-300">
            Equal combines cutting-edge AI, comprehensive data aggregation, and enterprise-grade security to deliver identity verification that goes beyond traditional solutions.
          </p>
        </div>

        <BentoGrid className="gap-4">
          {pillarsData.map((item) => (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              icon={<div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white">
                {item.icon}
              </div>}
              colSpan={item.colSpan}
              rowSpan={item.rowSpan}
              image={item.image}
              imagePosition={item.imagePosition}
              imageClassName={item.imageClassName}
            />
          ))}
        </BentoGrid>
      </div>
    </motion.section>
  );
} 