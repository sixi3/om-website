'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedFOIRChartCard } from '@/app/equal/components/AnimatedFOIRChartCard';
import Marquee from 'react-fast-marquee';

// Styling classes (consistent with other sections)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// FOIR-related features for the marquee
const foirFeaturesPillTexts = [
  "Bank Statements", 
  "Income Analysis", 
  "Expense Tracking", 
  "Debt-to-Income Ratio", 
  "Credit Assessment", 
  "Loan Eligibility", 
  "Financial Health Score",
  "Risk Assessment",
  "Compliance Monitoring",
  "Audit Trails",
  "Real-time Analytics",
  "Regulatory Reporting",
  "Data Security",
  "Consent Management",
  "API Integration"
];

export function FOIRSection() {
  const [hasBeenInView, setHasBeenInView] = useState(false);

  return (
    <motion.section 
      className="relative w-full py-12 md:py-12 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setHasBeenInView(true)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
      
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              FOIR Analysis
            </span>{" "}
            <span className={metallicBlackTextClasses}>for Financial Health</span>
          </h2>
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
            Monitor Fixed Obligation to Income Ratio with real-time insights and comprehensive financial data analysis.
          </p>
        </div>

        {/* FOIR Chart Card */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <AnimatedFOIRChartCard 
              onAnimationComplete={() => console.log('FOIR chart animation complete')}
              disableAutoRotate={true}
            />
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Comprehensive Financial Health Monitoring
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our FOIR analysis provides deep insights into financial obligations and income patterns, 
              helping institutions make informed lending decisions while ensuring regulatory compliance 
              and risk management.
            </p>
          </div>
        </motion.div>
            
      </div>

      {/* Marquee Banner - Placed OUTSIDE the container for full width */}
      <div className="mt-12 w-full mb-4">
        <Marquee gradient={false} speed={40} pauseOnHover={true} direction="left">
          {foirFeaturesPillTexts.map((text, index) => (
            <div
              key={`foir-pill-${index}`}
              className="inline-block bg-background/10 backdrop-blur-md rounded-sm border border-slate-200 dark:border-neutral-700 mr-3 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {text}
            </div>
          ))}
        </Marquee>
      </div>
      
    </motion.section>
  );
} 