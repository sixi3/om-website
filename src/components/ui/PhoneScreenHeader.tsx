'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PhoneScreenHeaderProps {
  logoSrc: string;
  altText: string;
  title: string;
  gradientClass: string;
  activeKey?: string | number; // Key for AnimatePresence, optional if not animating
  showBackButton?: boolean;
  showMoreButton?: boolean;
  className?: string; 
  animateTransition?: boolean; // New prop for conditional animation
}

// Animation variants for header items
const headerItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeInOut" } },
};

export const PhoneScreenHeader: React.FC<PhoneScreenHeaderProps> = ({
  logoSrc,
  altText,
  title,
  gradientClass,
  activeKey, // Keep for when animateTransition is true
  showBackButton = true,
  showMoreButton = true,
  className,
  animateTransition = true, // Default to true to maintain existing behavior
}) => {
  return (
    <div
      className={cn(
        'w-full px-4 flex items-center justify-between text-white shadow-md pt-6 overflow-hidden',
        'transition-colors duration-700 ease-in-out',
        gradientClass,
        className // Allow parent to pass additional classes
      )}
      style={{ height: '68px' }} // This height is specific, might want to make it a prop if it varies
    >
      <div className="flex items-center gap-x-1.5">
        {showBackButton && <ArrowLeft className="h-5 w-5 flex-shrink-0 z-10" />}
        {animateTransition && activeKey !== undefined ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey} // Use activeKey when animating
              className="flex items-center gap-x-2"
              variants={headerItemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image 
                src={logoSrc}
                alt={altText}
                width={16} 
                height={16} 
                className="flex-shrink-0"
              />
              <span className="font-bold text-md whitespace-nowrap">{title}</span>
            </motion.div>
          </AnimatePresence>
        ) : (
          // Render directly without animation
          <div className="flex items-center gap-x-2">
            <Image 
              src={logoSrc}
              alt={altText}
              width={16} 
              height={16} 
              className="flex-shrink-0"
            />
            <span className="font-bold text-md whitespace-nowrap">{title}</span>
          </div>
        )}
      </div>
      
      {showMoreButton && <MoreVertical className="h-5 w-5 flex-shrink-0 z-10" />}
    </div>
  );
}; 