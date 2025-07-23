"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Team } from "@/components/aurora-background-demo/components/Team";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { MainHeader } from "@/components/global/MainHeader";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { EqualBreadcrumb } from "@/components/ui/breadcrumb";

// Define metallic black class
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";



export default function TeamPage() {
  return (
    <AuroraBackground>
      <BackgroundGrid />
      <MainHeader />
      
      <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <EqualBreadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
        </div>
        {/* Hero Section */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 justify-center items-center">
          <div className="text-center mb-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className={metallicBlackTextClasses}>Meet Our</span>{" "}
                <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Expert</span>{" "}
                <span className={metallicBlackTextClasses}>Team</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                We are a passionate team of innovators, engineers, and visionaries dedicated to transforming the future of digital identity and financial services.
              </p>
            </motion.div>
            

            {/* Team Image Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-12 md:mt-16"
            >
              <div className="flex items-center justify-center">
                <h2 className="text-center font-semibold text-sm md:text-base tracking-widest mb-6 mx-auto text-[#00b140]">
                  OUR AMAZING TEAM
                </h2>
              </div>
              <div className="relative max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4, 
                    ease: "easeOut" 
                  }}
                  className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/team.png"
                    alt="Our amazing team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <GlowingDivider 
            width="1/3" 
            intensity="high" 
            delay={0.2}
            className="my-8 md:my-16 mx-auto"
          />

        {/* Team Showcase Section */}
        <div className="mt-4">
          
          <Team />
        </div>
      </main>
    </AuroraBackground>
  );
} 