'use client';
import React from "react";
import { BentoGrid } from "@/app/onemoney/components/ui/bento-grid"; 
import { ServiceBentoCard } from "@/app/moneyone/components/ui/ServiceBentoCard";
import { motion } from "framer-motion";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";
import { useCasesData } from "../data/useCases";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

export function UseCaseGrid() {
  return (
    <motion.section
      className="relative w-full py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
                <span className={metallicBlackTextClasses}>One Platform,</span>{" "}
                <span className={highlightBgClass}>
                Every Use Case
                </span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300">
                From enterprise to startups, Equal is built to handle every identity verification challenge.
            </p>
        </div>

        <BentoGrid className="gap-4 md:grid-cols-3">
          {useCasesData.map((item) => (
            <ServiceBentoCard
              key={item.id}
              title={item.title}
              description={item.heroHeadline}
              icon={item.icon}
            />
          ))}
        </BentoGrid>

        <div className="text-center mt-12">
            <GlowingButton>
                Schedule a Free Use Case Mapping Call
            </GlowingButton>
        </div>
      </div>
    </motion.section>
  );
} 