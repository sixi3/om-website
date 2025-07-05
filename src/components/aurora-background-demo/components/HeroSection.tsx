"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ClientLogosGrid } from "./ClientLogosGrid";
import { 
  METALLIC_GREEN_TEXT_CLASSES, 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";

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
        className={`text-4xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-[80px] dark:text-neutral-200 leading-tight ${METALLIC_GREEN_TEXT_CLASSES}`}
      >
        India's <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Largest</span><br /> Data Sharing Platform
      </motion.h1>

      
    </div>
  </motion.div>
));

MainTitle.displayName = 'MainTitle';

export const HeroSection = React.memo(() => {
  return (
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-6 items-center pt-32 pb-12 px-4">
      {/* Left Column - Title, Glow Bar, and Client Logos */}
      <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left max-w-6xl mx-auto lg:mx-0">
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
          {/* Mobile Layout - Title on top */}
          <div className="block md:hidden">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 1.5,
                ease: "easeOut"
              }}
              className={`text-sm font-extrabold text-slate-600 tracking-widest text-center mb-3 ${METALLIC_BLACK_TEXT_CLASSES}`}
            >
              I'M LOOKING FOR:
            </motion.h3>
            <div className="bg-linear-to-br from-background/20 to-background/50 backdrop-blur-md rounded-full border-b-2 border-slate-200 border border-slate-200 overflow-hidden max-w-[calc(100vw-2rem)] mx-auto">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  delay: 2.5,
                  ease: "easeInOut",
                  repeat: 2,
                  repeatDelay: 3
                }}
                className="flex items-center gap-2 px-3 py-2 overflow-x-auto scrollbar-hide" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[
                  "Background Verifications",
                  "Account Aggregator",
                  "Financial Data Analytics",
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
                    className="group inline-flex items-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[00b140]/50 text-[#00b140] text-sm font-medium rounded-full transition-all duration-300 overflow-hidden flex-shrink-0 whitespace-nowrap"
                  >
                    <span>{text}</span>
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
                  {[
                    "Background Verifications",
                    "Account Aggregator",
                    "Financial Data Analytics",
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
                      className="group inline-flex items-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[00b140]/50 text-[#00b140] text-sm xl:text-base font-medium rounded-full transition-all duration-300 overflow-hidden flex-shrink-0 whitespace-nowrap"
                    >
                      <span>{text}</span>
                      <ArrowRight className="h-4 w-4 text-[#00b140] transition-all duration-300 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0" />
                    </motion.button>
                  ))}
                </div>
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
            className="w-full h-full object-cover lg:mr-16 lg:mb-12 xl:ml-12 2xl:mr-56 xl:scale-105 xl:mr-40 2xl:mb-24 2xl:scale-120"
            style={{ backgroundColor: 'transparent' }}
            preload="metadata"
          >
            <source src="/main-landing-1.mp4" type="video/webm; codecs=vp9" />
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
  );
});

HeroSection.displayName = 'HeroSection'; 