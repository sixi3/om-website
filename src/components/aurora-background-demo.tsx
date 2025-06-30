"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";
import Link from 'next/link';

const metallicBlackTextClasses = "font-bold  bg-gradient-to-b from-[#00b140] to-[#087C32] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const productData = {
  default: {
    title: "OneEqual",
    description: "India's Most Advanced Data Sharing Platform"
  },
  onemoney: {
    title: "OneMoney",
    description: "India's First & Largest Account Aggregator"
  },
  moneyone: {
    title: "MoneyOne",
    description: "Take Control Over Your Financial Data"
  },
  equal: {
    title: "Equal",
    description: "Smart Identity Verification and Onboarding"
  }
};

export default function AuroraBackgroundDemo() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
  const currentContent = hoveredProduct ? productData[hoveredProduct as keyof typeof productData] : productData.default;
  return (
    <AuroraBackground>
      <div className="relative flex flex-col h-screen">
        {/* Centered Title and Description */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-center"
          >
            <div className="h-20 md:h-24 lg:h-48 flex items-center justify-center mb-4">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentContent.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className={`text-4xl md:text-6xl lg:text-[200px] font-bold dark:text-white text-center ${metallicBlackTextClasses}`}
                >
                  {currentContent.title}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Glowing Light Bar - Between Title and Description */}
            <motion.div 
              className="w-[40rem] h-8 relative mx-auto my-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Gradient Light Bars */}
              <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00b140] to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00b140] to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#baff29] to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#baff29] to-transparent h-px w-1/4" />
            </motion.div>
            
            <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentContent.description}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1],
                    delay: 0.1
                  }}
                  className="font-extralight text-lg md:text-5xl dark:text-neutral-200 text-gray-700 py-4 max-w-6xl text-center"
                >
                  {currentContent.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Book Demo Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <GlowingButton>
                Book Demo
              </GlowingButton>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Product Suite Text */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p className="text-sm md:text-base font-bold tracking-widest text-slate-600 dark:text-gray-400 uppercase">
            EXPLORE OUR PRODUCT SUITE
          </p>
        </motion.div>

        {/* Bottom Buttons - Full Width */}
        <motion.div 
          className="w-screen grid grid-cols-1 md:grid-cols-3 -mx-4 md:-mx-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/onemoney" passHref>
            <motion.button 
              className="relative w-full bg-gradient-to-r from-[#00b140] to-[#087C32] text-white font-bold py-8 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400 text-2xl md:text-3xl rounded-none md:rounded-none overflow-hidden group"
              onMouseEnter={() => setHoveredProduct('onemoney')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#baff29] to-[#98E100] transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">OneMoney</span>
            </motion.button>
          </Link>
          <Link href="/moneyone" passHref>
            <motion.button 
              className="relative w-full bg-gradient-to-r from-[#087C32] to-[#00b140] text-white font-bold py-8 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-400 text-2xl md:text-3xl rounded-none md:rounded-none overflow-hidden group"
              onMouseEnter={() => setHoveredProduct('moneyone')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#baff29] to-[#98E100] transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">Moneyone</span>
            </motion.button>
          </Link>
          <Link href="/equal" passHref>
            <motion.button 
              className="relative w-full bg-gradient-to-r from-[#00b140] to-[#087C32] text-white font-bold py-8 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-400 text-2xl md:text-3xl rounded-none md:rounded-none overflow-hidden group"
              onMouseEnter={() => setHoveredProduct('equal')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#baff29] to-[#98E100] transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">Equal</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </AuroraBackground>
  );
} 