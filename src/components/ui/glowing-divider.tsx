"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingDividerProps {
  className?: string;
  delay?: number;
  width?: "full" | "3/4" | "1/2" | "1/3";
  intensity?: "low" | "medium" | "high";
  animate?: boolean;
}

export function GlowingDivider({ 
  className = "",
  delay = 0,
  width = "full",
  intensity = "medium",
  animate = true
}: GlowingDividerProps) {
  const widthClasses = {
    "full": "w-full",
    "3/4": "w-3/4",
    "1/2": "w-1/2", 
    "1/3": "w-1/3"
  };

  const intensityClasses = {
    "low": "shadow-[0_0_10px_rgba(0,177,64,0.3)]",
    "medium": "shadow-[0_0_20px_rgba(0,177,64,0.5)]",
    "high": "shadow-[0_0_30px_rgba(0,177,64,0.7)]"
  };

  const glowAnimation = {
    initial: { 
      opacity: 0, 
      scaleX: 0,
      filter: "blur(2px)"
    },
    animate: { 
      opacity: 1, 
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        delay: delay,
        ease: easeOut
      }
    }
  };

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <motion.div
        className={cn(
          "relative h-[2px] mx-auto",
          widthClasses[width]
        )}
        variants={animate ? glowAnimation : undefined}
        initial={animate ? "initial" : undefined}
        whileInView={animate ? "animate" : undefined}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Base gradient bar */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent via-[#00b140] to-transparent rounded-full",
            intensityClasses[intensity]
          )}
        />
        
        {/* Additional glow layers for more intensity */}
        {intensity === "high" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#baff29]/50 to-transparent rounded-full blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00b140]/30 to-transparent rounded-full blur-[2px] scale-150" />
          </>
        )}
      </motion.div>
    </div>
  );
} 