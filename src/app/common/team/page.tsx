"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Team } from "@/components/aurora-background-demo/components/Team";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { MainHeader } from "@/components/global/MainHeader";
import { GlowingDivider } from "@/components/ui/glowing-divider";

// Define metallic black class
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Company logos for the hero section
const companyLogos = [
  { id: "logo-1", src: "/client-logos/Frame 5.png", alt: "Equal" },
  { id: "logo-2", src: "/client-logos/Frame 6.png", alt: "OneMoney" },
  { id: "logo-3", src: "/client-logos/Frame 8.png", alt: "Verified" },
  { id: "logo-4", src: "/client-logos/Frame 12.png", alt: "OM Logo" }
];

export default function TeamPage() {
  return (
    <AuroraBackground>
      <BackgroundGrid />
      <MainHeader />
      
      <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        {/* Hero Section */}
        <div className="container px-4 md:px-6 mx-auto">
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
            

            {/* Company Logos Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-12 md:mt-16"
            >
              <div className="flex items-center justify-center">
                <h2 className="text-center font-semibold text-sm md:text-left tracking-widest mb-4 mx-auto">
                  HAND-PICKED BY INDUSTRY LEADERS FROM
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center max-w-2xl mx-auto">
                {companyLogos.map((logo, index) => (
                  <motion.div
                    key={logo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + (index * 0.1), 
                      ease: "easeOut" 
                    }}
                    className="relative w-32 h-32 filter grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 64px, 80px"
                    />
                  </motion.div>
                ))}
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