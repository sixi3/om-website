'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
// @ts-ignore
import { Component as EtheralShadow } from './etheral-shadow';
import equalAiIntroAnimation from '../../../public/equal-ai-intro.json';

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-[400px] h-[400px] animate-pulse bg-white/10 rounded-lg" />
});

const metallicBlackTextClasses = "font-semibold drop-shadow-lg bg-gradient-to-b from-white to-[#f6f6f6] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

interface EqualAIPortraitProps {
  isVisible: boolean;
  className?: string;
  height?: number | 'auto';
}

export const EqualAIPortrait: React.FC<EqualAIPortraitProps> = ({ 
  isVisible, 
  className = '',
  height = 'auto'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lottieRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAnimationComplete = () => {
    setHasAnimated(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: 1, 
        x: 0
      } : { 
        opacity: 0, 
        scale: 0.95, 
        x: 20 
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        delay: isVisible ? 0.1 : 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-[280px] rounded-xl overflow-hidden shadow-2xl
        border border-[#baff29]/80 backdrop-blur-sm cursor-pointer
        ${className}
      `}
      style={{
        height: typeof height === 'number' ? `${height}px` : height === 'auto' ? 'auto' : '350px'
      }}
    >
      {/* Etheral Shadow Background */}
      <div className="absolute inset-0">
        <EtheralShadow
          color="#00b140"
          animation={{ scale: 80, speed: 70 }}
          noise={{ opacity: 1, scale: 1.5 }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>

      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0"
        animate={{
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
            )`,
            `linear-gradient(135deg, 
              rgba(0, 177, 64, 0.9) 0%, 
              rgba(186, 255, 41, 0.7) 50%,
              rgba(0, 177, 64, 0.8) 100%
            )`
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Spacer to push logo to center */}
        <div className="flex-1" />
        
        {/* Equal AI Logo - Fixed Center Position */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.4, 
              delay: isVisible ? 0.3 : 0,
              ease: "easeOut" 
            }}
          >
{isMounted ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={equalAiIntroAnimation}
                loop={false}
                autoplay={isVisible && !hasAnimated}
                onComplete={handleAnimationComplete}
                style={{ width: 400, height: 400 }}
                className="filter drop-shadow-lg"
              />
            ) : (
              <div className="w-[400px] h-[400px] animate-pulse bg-white/10 rounded-lg filter drop-shadow-lg" />
            )}
          </motion.div>
        </div>
        
        {/* Spacer to center logo vertically */}
        <div className="flex-1" />

        {/* Text Content / Button - Fixed Height Container */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut" 
                  }}
                  className="text-center"
                >
                  <h3 className="text-[14px] drop-shadow-lg flex items-center justify-center gap-1 uppercase">
                    <span className={metallicBlackTextClasses}>
                      AI Assitants for Everything
                    </span>
                    <span className="text-lg">⚡️</span>
                  </h3>
                </motion.div>
              ) : (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut" 
                  }}
                  className="flex justify-center"
                >
                  <motion.button
                    className="bg-[#00b140]/30 backdrop-blur-sm border border-[#00b140]/30 rounded-full px-6 py-3 flex items-center gap-2 text-white font-semibold text-sm hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    EXPLORE NOW
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { 
            opacity: [0.3, 0.8, 0.3], 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: isVisible ? 0.6 : 0,
            ease: "easeOut",
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="absolute top-6 right-6"
        >
          <div className="w-3 h-3 bg-white/30 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { 
            opacity: [0.4, 0.9, 0.4], 
            scale: [1, 1.3, 1] 
          } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: isVisible ? 0.7 : 0,
            ease: "easeOut",
            opacity: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            },
            scale: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
          className="absolute bottom-6 left-6"
        >
          <div className="w-2 h-2 bg-white/40 rounded-full" />
        </motion.div>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/5 pointer-events-none"
      />
    </motion.div>
  );
}; 