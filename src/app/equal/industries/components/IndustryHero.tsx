"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { METALLIC_BLACK_TEXT_CLASSES, ANIMATION_CONFIG } from "@/components/aurora-background-demo/constants";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Image from "next/image";

const MainTitle = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.0, y: 40 }}
      transition={{
        delay: 0.3,
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
      }}
      className="space-y-6"
    >
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ 
          duration: ANIMATION_CONFIG.duration,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-neutral-200 leading-tight ${METALLIC_BLACK_TEXT_CLASSES}`}
      >
        <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
          Custom workflows
        </span>
        <br />
        <span className="">for every industry</span>
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ 
          duration: ANIMATION_CONFIG.duration,
          delay: 0.2,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className="text-lg md:text-xl text-slate-600 max-w-3xl"
      >
        Specialized solutions tailored for specific industry verticals and their unique compliance requirements.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: ANIMATION_CONFIG.duration,
          delay: 0.4
        }}
      >
        <ShimmerButton className="mt-4 text-base md:text-lg">Book a Demo</ShimmerButton>
      </motion.div>
    </motion.div>
  );
});

MainTitle.displayName = 'MainTitle';

export const IndustryHero = React.memo(() => {
  return (
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-32 pb-16 px-8 gap-8">
      {/* Left Column - Title, Subtitle, CTA */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl mx-auto lg:mx-0 space-y-8">
        <MainTitle />
      </div>
      {/* Right Column - HRMS Integration Illustration */}
      <div className="hidden lg:flex w-full h-[340px] items-center justify-center">
        <div className="relative w-full h-full max-w-[400px] max-h-[340px] flex items-center justify-center">
          <Image
            src="/HRMS Integration.png"
            alt="HRMS Integration Illustration"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 300px, 400px"
            priority
          />
        </div>
      </div>
    </section>
  );
});

IndustryHero.displayName = 'IndustryHero'; 