'use client';

import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
// @ts-ignore
import { Component as EtheralShadow } from './etheral-shadow';
import equalAiIntroAnimation from '../../../public/equal-ai-intro.json';

// Dynamically import Lottie with better loading strategy
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-[200px] h-[200px] animate-pulse bg-white/10 rounded-lg" />
});

const metallicBlackTextClasses = "font-semibold drop-shadow-lg bg-gradient-to-b from-white to-[#f6f6f6] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

interface EqualAIPortraitProps {
  isVisible: boolean;
  className?: string;
  height?: number | 'auto';
}

export const EqualAIPortrait = memo<EqualAIPortraitProps>(({ 
  isVisible, 
  className = '',
  height = 'auto'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const lottieRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setIsMounted(true)
    // Delay Lottie loading even further to ensure smooth dropdown animation
    const timer = setTimeout(() => {
      setShowLottie(true)
    }, 200)
    
    return () => clearTimeout(timer)
  }, []);

  const handleAnimationComplete = () => {
    setHasAnimated(true);
  };

  // Optimized entrance animation - slide in from right
  const containerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      x: 100, // Start from right
      rotateY: -15 // Slight 3D rotation effect
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.4,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94), // easeOutCubic
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }), [])

  // Simplified gradient animation
  const gradientAnimation = useMemo(() => ({
    background: [
      `linear-gradient(135deg, 
        rgba(0, 177, 64, 0.9) 0%, 
        rgba(186, 255, 41, 0.7) 50%,
        rgba(0, 177, 64, 0.8) 100%
      )`,
      `linear-gradient(135deg, 
        rgba(186, 255, 41, 0.8) 0%, 
        rgba(0, 177, 64, 0.7) 50%,
        rgba(186, 255, 41, 0.9) 100%
      )`
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: cubicBezier(0.42, 0, 0.58, 1)
    }
  }), [])

  const contentVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
      }
    }
  }), [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`
        relative w-[280px] rounded-xl overflow-hidden shadow-2xl
        border border-[#baff29]/80 backdrop-blur-sm cursor-pointer
        ${className}
      `}
      style={{
        height: typeof height === 'number' ? `${height}px` : height === 'auto' ? 'auto' : '350px',
        transform: 'translate3d(0,0,0)', // Force GPU acceleration
        perspective: '1000px'
      }}
    >
      {/* Title at the top */}
      <div className="absolute top-6 left-0 w-full flex justify-start z-20 pointer-events-none">
        <h2 className="text-md font-semibold tracking-widest text-white uppercase px-4 py-1 rounded">
          CONSUMER PRODUCT
        </h2>
      </div>
      {/* Etheral Shadow Background - Simplified */}
      <div className="absolute inset-0">
        <EtheralShadow
          color="#00b140"
          animation={{ scale: 60, speed: 50 }} // Reduced intensity
          noise={{ opacity: 0.8, scale: 1.2 }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>
      {/* Simplified Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0"
        animate={gradientAnimation}
      />
      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col h-full px-8"
        variants={contentVariants}
      >
        {/* Spacer to push logo to center */}
        <div className="flex-1" />
        {/* Equal AI Logo - Optimized Loading */}
        <div className="flex justify-center">
          <motion.div
            variants={contentVariants}
          >
            {isMounted && showLottie ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={equalAiIntroAnimation}
                loop={false}
                autoplay={isVisible && !hasAnimated}
                onComplete={handleAnimationComplete}
                style={{ width: 200, height: 200 }} // Reduced size for better performance
                className="filter drop-shadow-lg"
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                  progressiveLoad: true // Enable progressive loading
                }}
              />
            ) : (
              <div className="w-[200px] h-[200px] animate-pulse bg-white/10 rounded-lg filter drop-shadow-lg" />
            )}
          </motion.div>
        </div>
        {/* AI Assistants for Everything text below Lottie */}
        <div className="flex justify-center mb-4">
          <h3 className="text-[12px] drop-shadow-lg flex items-center justify-center gap-1 uppercase">
            <span className={metallicBlackTextClasses}>
              India's AI Assistant
            </span>
            <span className="text-md">⚡️</span>
          </h3>
        </div>
        {/* Always show Explore button below the text */}
        <div className="flex justify-center mb-2">
          <motion.a
            href="https://www.myequal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00b140]/40  drop-shadow-lg rounded-full px-6 py-2 flex items-center gap-2 text-white font-semibold text-sm hover:bg-linear-to-r hover:from-[#00b140] hover:to-[#baff29] transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            EXPLORE NOW
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
        {/* Spacer to center logo vertically */}
        <div className="flex-1" />
        {/* Simplified Decorative Elements */}
        <motion.div
          className="absolute top-6 right-6 w-3 h-3 bg-white/30 rounded-full"
          variants={contentVariants}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: cubicBezier(0.42, 0, 0.58, 1)
          }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-2 h-2 bg-white/40 rounded-full"
          variants={contentVariants}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: cubicBezier(0.42, 0, 0.58, 1),
            delay: 0.5
          }}
        />
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
      </motion.div>
      {/* Simplified Hover Effect Overlay - can be removed since button is always visible */}
    </motion.div>
  );
});

EqualAIPortrait.displayName = 'EqualAIPortrait'; 