"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { AuroraBackground } from '@/components/ui/aurora-background';
import { MainHeader } from "@/components/global/MainHeader";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Import our optimized components and data
import { ClientLogosGrid } from "./aurora-background-demo/components/ClientLogosGrid";
import { HERO_SECTIONS } from "./aurora-background-demo/components/HeroSections";
import { 
  METALLIC_GREEN_TEXT_CLASSES, 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG,
  GLASSMORPHIC_STYLE 
} from "./aurora-background-demo/constants";

// Memoized sub-components - NavigationTabs replaced by MainHeader

const MainTitle = React.memo(() => (
  <motion.div
    initial={{ opacity: 0.0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    }}
    className="text-center lg:text-left w-full"
  >
    <div className="space-y-6">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: ANIMATION_CONFIG.duration,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className={`text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px] dark:text-neutral-200 leading-tight ${METALLIC_GREEN_TEXT_CLASSES}`}
      >
        India's <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Largest</span><br /> Data Sharing Platform
      </motion.h1>

      {/* Glowing Light Bar */}
      <motion.div 
        className="w-full max-w-lg h-8 relative mx-auto lg:mx-0 mt-8"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6, duration: ANIMATION_CONFIG.duration }}
        style={{ transformOrigin: 'left' }}
      >
        <div className="absolute left-0 lg:left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00b140] via-[#00b140] to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute left-0 lg:left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00b140] via-[#00b140] to-transparent h-px w-3/4" />
        <div className="absolute left-0 lg:left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#baff29] via-[#baff29] to-transparent h-[5px] w-1/3 blur-sm" />
        <div className="absolute left-0 lg:left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#baff29] via-[#baff29] to-transparent h-px w-1/3" />
      </motion.div>
    </div>
  </motion.div>
));

MainTitle.displayName = 'MainTitle';

interface ProductCardProps {
  section: typeof HERO_SECTIONS[0];
  index: number;
}

const ProductCard = React.memo<ProductCardProps>(({ section, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px 0px -50px 0px",
    amount: 0.3
  });

  const BentoComponent = section.bentoComponent;
  const titleParts = section.title.split(section.highlightWord);
  
  // Map section IDs to logo paths
  const logoMap: Record<string, string> = {
    'onemoney': '/om-logo.svg',
    'moneyone': '/moneyone-header.svg',
    'equal': '/equal-logo.svg'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 60
      }}
      transition={{
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99],
        delay: 0.1
      }}
      className="w-full mb-12 md:mb-16"
    >
      <div 
        className="w-full border border-[#00b140]/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl"
        style={GLASSMORPHIC_STYLE}
      >
        <div className="p-8">
          <section className="relative w-full flex flex-col items-center space-y-8">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1
              }}
              className="flex justify-center mb-4"
            >
              <div>
                <Image
                  src={logoMap[section.id] || '/om-logo.svg'}
                  alt={`${section.company} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain mb-2"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2
              }}
              className="flex flex-col items-center space-y-6 text-center px-4"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center pl-1 pr-3 py-1 text-xs lg:text-lg font-semibold text-slate-800 mb-4 space-x-2">
                  <Image
                    src={section.badgeIcon}
                    alt="Badge icon"
                    width={24}
                    height={24}
                  />
                  <span>{section.badgeText}</span>
                </span>
                <h1 className="text-2xl tracking-tight leading-tight md:text-3xl lg:text-[80px]">
                  <span className={METALLIC_BLACK_TEXT_CLASSES}>{titleParts[0]}</span>
                  <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                    {section.highlightWord}
                  </span>
                  <span className={METALLIC_BLACK_TEXT_CLASSES}>{titleParts[1] || ''}</span>
                </h1>
                <p className="font-medium text-lg lg:text-2xl text-slate-600 dark:text-slate-300 mb-2">
                  {section.subtitle}
                </p>
              </div>
              <div>
                <Link
                  href={section.ctaLink}
                  className="group inline-flex items-center gap-2 px-6 py-3 mb-6 bg-[#00b140]/10 backdrop-blur-md border border-[#00b140]/80 hover:bg-[#00b140] text-[#00b140] hover:text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.3
              }}
              className="w-full max-w-7xl mx-auto"
            >
              <BentoComponent />
            </motion.div>
          </section>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

const ProductCards = React.memo(() => (
  <section className="relative w-full py-12 md:py-20">
    <div className="w-full px-4 md:px-6">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-5xl tracking-tight leading-tight sm:text-4xl md:text-5xl lg:text-[80px] mb-4">
          <span className={METALLIC_BLACK_TEXT_CLASSES}>Our</span>{" "}
          <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Product</span>{" "}
          <span className={METALLIC_BLACK_TEXT_CLASSES}>Portfolio</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-5xl mx-auto">
          Discover our comprehensive suite of financial technology solutions designed to transform how businesses handle data, identity verification, and financial services.
        </p>
      </motion.div>

      <div className="space-y-0">
        {HERO_SECTIONS.map((section, index) => (
          <ProductCard 
            key={section.id} 
            section={section} 
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
));

ProductCards.displayName = 'ProductCards';

export default function AuroraBackgroundDemo() {
  return (
    <>
      <MainHeader />
      <AuroraBackground className="min-h-full">
        <div className="relative flex flex-col min-h-screen w-full">

        {/* Hero Section with Two-Column Layout */}
        <section className="relative w-full grid grid-cols-1 lg:grid-cols-6 items-center pt-32 pb-12 px-4">
          {/* Left Column - Title, Glow Bar, and Client Logos */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            <MainTitle />
            
            {/* Client Logos Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 1.2,
              }}
              className="w-full"
            >
              <ClientLogosGrid />
            </motion.div>

            {/* I'm Looking For Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                delay: 1.4,
              }}
              className="w-full"
            >
              <div className="inline-flex bg-white rounded-full border-b-4 border-slate-200 border border-slate-200 mx-auto lg:mx-0 overflow-hidden w-auto min-w-0 max-w-[90vw] lg:max-w-none">
                <div className="flex items-center gap-4 px-4 py-2 overflow-x-auto scrollbar-hide min-w-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <h3 className={`text-sm font-extrabold text-slate-600 tracking-widest flex-shrink-0 whitespace-nowrap ${METALLIC_BLACK_TEXT_CLASSES}`}>
                    I'M LOOKING FOR: 
                  </h3>
                  <div className="flex gap-2">
                {[
                  "HRMS BGV Integration",
                  "Financial Services", 
                  "Gig & Platform Staffing"
                ].map((text, index) => (
                  <motion.button
                    key={text}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 1.6 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="group inline-flex items-center px-4 py-2 shadow-sm bg-[#00b140] backdrop-blur-md border-b-3 border-[#008000] text-white text-sm xl:text-base font-medium rounded-full transition-all duration-300 overflow-hidden flex-shrink-0 whitespace-nowrap"
                  >
                    <span>{text}</span>
                       <ArrowRight className="h-4 w-4 text-[#baff29] transition-all duration-300 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0" />
                  </motion.button>
                ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Video */}
          <div className="hidden lg:block lg:col-span-2 relative w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 1.0
              }}
              className="relative w-full flex items-center justify-center"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover lg:mr-16 lg:mb-12 xl:mr-32 xl:mb-24 lg:scale-120 xl:scale-140"
                style={{ backgroundColor: 'transparent' }}
                preload="metadata"
              >
                <source src="/main-video-2.webm" type="video/webm; codecs=vp9" />
                <source src="/main-video-2.mp4" type="video/mp4" />
                {/* Fallback for unsupported browsers */}
                <div className="w-full h-full bg-gradient-to-br from-[#00b140]/20 to-[#baff29]/20 rounded-2xl flex items-center justify-center">
                  <div className="text-slate-500 text-center">
                    <p>Video not supported</p>
                  </div>
                </div>
              </video>
            </motion.div>
          </div>
        </section>

        <ProductCards />
      </div>
    </AuroraBackground>
    </>
  );
} 