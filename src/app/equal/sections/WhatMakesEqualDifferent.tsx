'use client';
import React from "react";
import { BentoGrid } from "@/app/onemoney/components/ui/bento-grid"; 
import { ServiceBentoCard } from "@/app/moneyone/components/ui/ServiceBentoCard";
import { Network, Plug, BrainCircuit } from "lucide-react"; 
import { motion } from "framer-motion";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const pillarsData = [
  {
    id: "aggregator",
    title: "Aggregator of Aggregators",
    description: "50+ data partners, real-time failover, and smart routing to ensure the highest success rates.",
    icon: <Network size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
  {
    id: "integration",
    title: "Integration-First Design",
    description: "Native HRMS embedding, workflow automation, and white-labeled delivery for a seamless experience.",
    icon: <Plug size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
  {
    id: "ai-layer",
    title: "AI Intelligence Layer",
    description: "Advanced risk scoring, continuous monitoring, and predictive hiring insights powered by AI.",
    icon: <BrainCircuit size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
];

export function WhatMakesEqualDifferent() {
  return (
    <motion.section
      className="relative w-full py-12 dark:bg-slate-900/60"
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
        </div>

        <BentoGrid className="gap-4 md:grid-cols-3"> 
          {pillarsData.map((item) => (
            <ServiceBentoCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </motion.section>
  );
} 