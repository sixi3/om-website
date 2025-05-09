'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const headerData = [
  {
    logoSrc: '/mobilepelogo.svg',
    title: 'MOBILEPE',
    altText: 'MobilePe Logo',
    gradientClass: 'bg-gradient-to-r from-[#5A2989] to-[#22152E]',
  },
  {
    logoSrc: '/homebanklogo.svg',
    title: 'HOME Bank',
    altText: 'HOME Bank Logo',
    gradientClass: 'bg-gradient-to-r from-orange-500 to-amber-500',
  },
];

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.7,
};

const variants = {
  initial: { opacity: 0, y: 0, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1, transition: springTransition },
  exit: { opacity: 0, y: 0, scale: 0.8, transition: { ...springTransition, damping: 35 } },
};

export const AnimatedScreenContent: React.FC = () => {
  const [activeHeaderIndex, setActiveHeaderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveHeaderIndex((prevIndex) => (prevIndex + 1) % headerData.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  const currentHeader = headerData[activeHeaderIndex];

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 dark:bg-neutral-900 text-slate-800 dark:text-slate-200">
      <div
        className={cn(
          'w-full px-4 flex items-center justify-between text-white shadow-md pt-6 overflow-hidden',
          'transition-colors duration-700 ease-in-out',
          currentHeader.gradientClass
        )}
        style={{ height: '80px' }}
      >
        <div className="flex items-center gap-x-2">
          <ArrowLeft className="h-6 w-6 flex-shrink-0 z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHeaderIndex}
              className="flex items-center gap-x-2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image 
                src={currentHeader.logoSrc} 
                alt={currentHeader.altText} 
                width={24} 
                height={24} 
                className="flex-shrink-0"
              />
              <span className="font-bold text-lg whitespace-nowrap">{currentHeader.title}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <MoreVertical className="h-6 w-6 flex-shrink-0 z-10" />
      </div>

      {/* Body Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
          This is the body content of the screen.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          It can contain various UI elements as needed.
        </p>
        <div className="mt-4 space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-200 dark:bg-neutral-800 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}; 