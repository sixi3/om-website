"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClientLogosGrid } from "./ClientLogosGrid";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import { 
  METALLIC_GREEN_TEXT_CLASSES, 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";

const STATNUMBER = "font-extrabold bg-gradient-to-b from-[#00b140] to-[#008000] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Custom MetricsCounter component that uses parent's viewport detection
const MetricsCounter = React.memo<{ 
  value: number; 
  className?: string; 
  fixedDecimals?: number; 
  duration?: number;
  id: string;
  isInView: boolean;
  delay?: number;
}>(({ value, className, fixedDecimals, duration = 2, id, isInView, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        const controls = animate(0, value, {
          duration: duration,
          ease: "easeOut",
          onUpdate(latest) {
            setDisplayValue(fixedDecimals !== undefined ? parseFloat(latest.toFixed(fixedDecimals)) : Math.round(latest));
          },
        });
        return () => controls.stop();
      }, delay);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, value, fixedDecimals, duration, delay]);

  return (
    <span className={className}>
      {displayValue}
    </span>
  );
});

MetricsCounter.displayName = 'MetricsCounter';
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
      className="text-center lg:text-left w-full"
    >
      <div className="space-y-6">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ 
            duration: ANIMATION_CONFIG.duration,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className={`text-3xl lg:text-5xl xl:text-7xl 2xl:text-[72px] dark:text-neutral-200 leading-tight ${METALLIC_GREEN_TEXT_CLASSES}`}
        >
          India's Largest{' '}
          <span className="lg:inline-block">
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Consumer -</span>
            <br className="lg:hidden" />
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Consented</span>
          </span>
          <br /> Data Sharing Platform
        </motion.h1>
      </div>
    </motion.div>
  );
});

MainTitle.displayName = 'MainTitle';

const VideoPlayer = React.memo(() => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });

  useEffect(() => {
    if (isInView && videoRef.current) {
      // Ensure video plays when in view
      videoRef.current.play().catch(() => {
        // Fallback: try to play again after a short delay
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              setHasError(true);
            });
          }
        }, 100);
      });
    }
  }, [isInView]);

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <div ref={containerRef} className="hidden lg:block lg:col-span-2 relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 1.0
        }}
        className="relative w-full flex items-center justify-center"
      >
        {hasError && (
          <div className="w-full h-full bg-gradient-to-br from-[#00b140]/20 to-[#baff29]/20 rounded-2xl flex items-center justify-center">
            <div className="text-slate-500 text-center">
              <p>Video not available</p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover lg:mr-16 lg:mb-12 xl:ml-12 2xl:mr-56 xl:scale-105 xl:mr-40 2xl:mb-24 2xl:scale-120"
          style={{ backgroundColor: 'transparent' }}
          preload="metadata"
          onError={handleVideoError}
        >
          <source src="/main-landing-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

const StatsSection = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const stats = [
    { id: "data", value: 1.2, label: "data transactions yearly", suffix: "B", fixedDecimals: 1 },
    { id: "consents", value: 95, label: "Unique Indians Users", suffix: "M+" },
    { id: "checks", value: 30, label: "ID Checks in Production", suffix: "+" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: ANIMATION_CONFIG.duration,
        delay: 0.8,
      }}
      className="w-full"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.4,
              delay: 1.0 + index * 0.1,
              ease: "easeOut"
            }}
            className={`flex flex-col items-center text-center md:items-start md:text-left ${index === 2 ? 'col-span-2 md:col-span-1 mt-4 md:mt-0' : ''}`}
          >
            <div className="text-2xl md:text-3xl lg:text-4xl mb-1">
              <MetricsCounter 
                value={stat.value} 
                className={STATNUMBER}
                id={stat.id}
                duration={2}
                isInView={isInView}
                delay={800 + index * 200}
                {...(stat.fixedDecimals !== undefined && { fixedDecimals: stat.fixedDecimals })}
              />
              <span className={STATNUMBER}>{stat.suffix}</span>
            </div>
            <p className="text-sm md:text-base text-center md:text-left font-medium text-slate-600 dark:text-slate-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

StatsSection.displayName = 'StatsSection';

const LookingForSection = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const router = useRouter();

  const buttons = [
    { text: "Background Verifications", href: "/equal/solutions" },
    { text: "Account Aggregator", href: "/onemoney" }, 
    { text: "Financial Data Analytics", href: "/equal/solutions/financial-services" },
  ];

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: ANIMATION_CONFIG.duration,
        delay: 0.1,
      }}
      className="w-full"
    >
      {/* Mobile Layout - Title on top */}
      <div className="block md:hidden">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut"
          }}
          className={`text-sm font-extrabold text-slate-600 tracking-widest text-center mb-3 ${METALLIC_BLACK_TEXT_CLASSES}`}
        >
          I'M LOOKING FOR:
        </motion.h3>
        <div className="bg-linear-to-br from-background/20 to-background/50 backdrop-blur-md rounded-full border-b-2 border-slate-200 border border-slate-200 overflow-hidden w-full max-w-[calc(100vw-2rem)] mx-auto">
                      <motion.div
              initial={{ x: 0 }}
              animate={isInView ? { x: [0, -10, 0] } : { x: 0 }}
              transition={{
                duration: 2,
                delay: 1.0,
                ease: "easeInOut",
                repeat: 2,
                repeatDelay: 3
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 overflow-x-auto scrollbar-hide" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {buttons.map((button, index) => (
                              <motion.button
                  key={button.text}
                  initial={{ opacity: 0, y: 2 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 2 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut"
                  }}
                  onClick={() => handleButtonClick(button.href)}
                  className="group inline-flex items-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[00b140]/50 text-[#00b140] text-sm font-medium rounded-full transition-all duration-300 overflow-hidden flex-shrink-0 whitespace-nowrap"
                >
                <span>{button.text}</span>
                <ArrowRight className="h-4 w-4 text-[#00b140] transition-all duration-300 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout - Title inline */}
      <div className="hidden md:block">
        <div className="inline-flex bg-linear-to-br from-background/20 to-background/50 backdrop-blur-md rounded-full border-b-2 border-slate-200 border border-slate-200 mx-auto lg:mx-0 overflow-hidden w-auto min-w-0 max-w-[90vw] lg:max-w-none">
          <div className="flex items-center gap-4 px-4 py-2 overflow-x-auto scrollbar-hide min-w-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <h3 className={`text-sm font-extrabold text-slate-600 tracking-widest flex-shrink-0 whitespace-nowrap ${METALLIC_BLACK_TEXT_CLASSES}`}>
              I'M LOOKING FOR: 
            </h3>
            <div className="flex gap-2">
              {buttons.map((button, index) => (
                <motion.button
                  key={button.text}
                  initial={{ opacity: 0, y: 2 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 2 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut"
                  }}
                  onClick={() => handleButtonClick(button.href)}
                  className="group inline-flex items-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[00b140]/50 text-[#00b140] text-sm xl:text-base font-medium rounded-full transition-all duration-300 overflow-hidden flex-shrink-0 whitespace-nowrap"
                >
                  <span>{button.text}</span>
                  <ArrowRight className="h-4 w-4 text-[#00b140] transition-all duration-300 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

LookingForSection.displayName = 'LookingForSection';

export const HeroSection = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative w-full pt-32 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-6 items-center px-4 lg:px-6">
        {/* Left Column - Title, Glow Bar, and Client Logos */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left w-full max-w-6xl mx-auto lg:mx-0">
          <MainTitle />
          
          {/* Stats Section */}
          <StatsSection />
          
          {/* Client Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              delay: 1.2,
            }}
            className="w-full"
          >
            <ClientLogosGrid />
          </motion.div>

          {/* I'm Looking For Section */}
          <LookingForSection />
        </div>

        {/* Right Column - Video */}
        <VideoPlayer />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection'; 