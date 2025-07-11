"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { industryContent, Industry } from "../industryContent";
import { ProductsShowcase } from "./ProductsShowcase";
import { METALLIC_BLACK_TEXT_CLASSES, ANIMATION_CONFIG } from "@/components/aurora-background-demo/constants";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

// Custom MetricsCounter component
const MetricsCounter = React.memo<{ 
  value: string; 
  className?: string; 
  duration?: number;
  id: string;
}>(({ value, className, duration = 2, id }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Extract numeric value and suffix
      const numericMatch = value.match(/^(\d+(?:\.\d+)?)/);
      const suffix = value.replace(/^(\d+(?:\.\d+)?)/, '');
      
      if (numericMatch) {
        const numericValue = parseFloat(numericMatch[1]);
        const controls = animate(0, numericValue, {
          duration: duration,
          ease: "easeOut",
          onUpdate(latest) {
            const roundedValue = Math.round(latest);
            setDisplayValue(`${roundedValue}${suffix}`);
          },
        });
        return () => controls.stop();
      } else {
        // If no numeric value found, just display the original value
        setDisplayValue(value);
      }
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
});

MetricsCounter.displayName = 'MetricsCounter';

// Industry Section Component
const IndustrySection = React.memo<{ 
  industry: Industry; 
  index: number; 
  onInView: (industry: Industry) => void;
}>(({ industry, index, onInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });

  useEffect(() => {
    if (isInView) {
      onInView(industry);
    }
  }, [isInView, industry, onInView]);

  const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: ANIMATION_CONFIG.duration,
        ease: "easeOut",
        delay: 0.2
      }}
      className="py-16 border-b border-slate-200 last:border-b-0"
    >
      <div className="space-y-6">
        {/* Industry Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: 0.1
          }}
          className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES}`}
        >
          {industry.name}
        </motion.h2>

        {/* Industry Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: 0.2
          }}
          className="text-lg text-slate-600 leading-relaxed max-w-2xl"
        >
          {industry.description}
        </motion.p>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: 0.3
          }}
          className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-12 pt-4 pb-8"
        >
          {industry.highlights.map((highlight, highlightIndex) => (
            <div key={highlightIndex} className="text-left">
              <div className="text-2xl md:text-3xl lg:text-4xl mb-2">
                <MetricsCounter 
                  value={highlight.stat} 
                  className={metallicTextClasses}
                  id={`${industry.id}-${highlightIndex}`}
                  duration={2}
                />
              </div>
              <p className="text-sm md:text-md text-slate-600 font-medium">
                {highlight.label}
              </p>
            </div>
          ))}
        </motion.div>

        

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: 0.5
          }}
        >
          <Link href={`/equal/industries/${industry.id}`}>
            <ShimmerButton className="text-sm md:text-base">
              Explore {industry.name} Solutions
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
});

IndustrySection.displayName = 'IndustrySection';

export const IndustriesShowcase = React.memo(() => {
  const [currentIndustry, setCurrentIndustry] = useState<Industry>(industryContent[0]);

  const handleIndustryInView = (industry: Industry) => {
    setCurrentIndustry(industry);
  };

  return (
    <section className="relative w-full py-12">
      <div className=" mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column - Industries List */}
          <div className="lg:col-span-2 space-y-0">
            {industryContent.map((industry, index) => (
              <IndustrySection 
                key={industry.id}
                industry={industry}
                index={index}
                onInView={handleIndustryInView}
              />
            ))}
          </div>

          {/* Right Column - Sticky Products Showcase */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 pb-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: ANIMATION_CONFIG.duration,
                  ease: "easeOut",
                  delay: 0.4
                }}
                className="max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-2 mt-8">
                  Recommended Products
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Products specifically designed for {currentIndustry.name.toLowerCase()} workflows
                </p>
                <ProductsShowcase 
                  relevantProductIds={currentIndustry.relatedProducts}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

IndustriesShowcase.displayName = 'IndustriesShowcase'; 