"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
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
    className="text-center"
  >
    <div className="h-20 md:h-24 lg:h-48 flex items-center justify-center">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: ANIMATION_CONFIG.duration,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className={`text-4xl md:text-6xl lg:text-[120px] font-bold dark:text-white text-center drop-shadow-xl ${METALLIC_GREEN_TEXT_CLASSES}`}
      >
        OneEqual
      </motion.h1>
    </div>

    {/* Glowing Light Bar */}
    <motion.div 
      className="w-[40rem] h-8 relative mx-auto my-2"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.6, duration: ANIMATION_CONFIG.duration }}
    >
      <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00b140] to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00b140] to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#baff29] to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#baff29] to-transparent h-px w-1/4" />
    </motion.div>
    
    <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center">
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: ANIMATION_CONFIG.duration,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.1
        }}
        className={`text-2xl md:text-4xl lg:text-5xl dark:text-neutral-200 py-1 text-center ${METALLIC_BLACK_TEXT_CLASSES}`}
      >
        India's <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Most Advanced</span> Data Sharing Platform
      </motion.p>
    </div>
  </motion.div>
));

MainTitle.displayName = 'MainTitle';

const LandingAssets = React.memo(() => (
  <>
    <motion.div
      className="absolute -top-12 -right-20 xl:-top-16 xl:-right-16 w-32 h-32 md:w-48 md:h-48 xl:w-64 xl:h-64"
      initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, duration: ANIMATION_CONFIG.duration }}
    >
      <Image
        src="/Vehicle + Legal Verification.png"
        alt="Landing Asset 1"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
        priority
      />
    </motion.div>

    <motion.div
      className="absolute -top-12 -left-20 xl:-top-16 xl:-left-16 w-32 h-32 md:w-48 md:h-48 xl:w-64 xl:h-64"
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.3, duration: ANIMATION_CONFIG.duration }}
    >
      <Image
        src="/Field-level Config.png"
        alt="Landing Asset 2"
        fill
        className="object-contain transform -scale-x-100"
        sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
        priority
      />
    </motion.div>
  </>
));

LandingAssets.displayName = 'LandingAssets';

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
        <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl lg:text-[80px] mb-4">
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
        <div className="relative flex flex-col min-h-screen w-full pt-20">

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <MainTitle />
        </div>

        <div className="mt-auto">
          <div className="relative min-h-[480px]">
            <motion.div
              className="absolute top-6 left-0 right-0 bottom-0 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-[#00b140]/10 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: ANIMATION_CONFIG.duration }}
              style={GLASSMORPHIC_STYLE}
            >
              <LandingAssets />
            </motion.div>

            <div className="relative z-10 pt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION_CONFIG.duration,
                  delay: 1.2,
                }}
                className="w-full px-4"
              >
                <ClientLogosGrid />
              </motion.div>
            </div>
          </div>
        </div>

        <ProductCards />
      </div>
    </AuroraBackground>
    </>
  );
} 