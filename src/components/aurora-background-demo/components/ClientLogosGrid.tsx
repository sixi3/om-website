"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CLIENT_LOGOS, METALLIC_BLACK_TEXT_CLASSES } from '../constants';

interface ClientLogoProps {
  logo: string;
  index: number;
  priority?: boolean;
}

const ClientLogo = React.memo<ClientLogoProps>(({ logo, index, priority = false }) => {
const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }}
      className="relative w-32 md:w-40 h-10 md:h-12 hover:scale-105 transition-transform duration-300 mb-4 md:mb-6 flex justify-start items-center"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-sm" />
      )}
      <Image
        src={logo}
        alt={`Client logo ${index + 1}`}
        fill
        className={`object-contain object-left filter grayscale hover:grayscale-0 transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        quality={75} // Reduce quality for faster loading
      />
    </motion.div>
  );
});

ClientLogo.displayName = 'ClientLogo';

export const ClientLogosGrid = React.memo(() => {
  const [currentSet, setCurrentSet] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Create sets for different screen sizes
  // Desktop: 2 sets of 8 logos (4x2 grid)
  const desktopLogoSets = [
    CLIENT_LOGOS.slice(0, 8), // First 8 logos
    CLIENT_LOGOS.slice(8, 16), // Next 8 logos
  ];
  
  // Mobile: 4 sets of 4 logos (2x2 grid)
  const mobileLogoSets = [
    CLIENT_LOGOS.slice(0, 4),   // First 4 logos
    CLIENT_LOGOS.slice(4, 8),   // Next 4 logos
    CLIENT_LOGOS.slice(8, 12),  // Next 4 logos
    CLIENT_LOGOS.slice(12, 16), // Last 4 logos
  ];

  // Ensure currentSet is within bounds
  const safeCurrentSet = Math.min(currentSet, Math.max(desktopLogoSets.length - 1, mobileLogoSets.length - 1));

  useEffect(() => {
    setIsClient(true);
    
    const interval = setInterval(() => {
      setCurrentSet((prev) => {
        // For mobile: cycle through 4 sets, for desktop: cycle through 2 sets
        const maxSets = window.innerWidth < 768 ? mobileLogoSets.length : desktopLogoSets.length;
        return (prev + 1) % maxSets;
      });
    }, 4000); // Switch every 4 seconds

    return () => clearInterval(interval);
  }, []);
  
  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="mt-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`text-center font-semibold text-sm md:text-left tracking-widest mb-4 ${METALLIC_BLACK_TEXT_CLASSES}`}
        >
          TRUSTED BY INDUSTRY LEADERS
        </motion.h2>
        
        {/* Show first set during SSR */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2 justify-items-center">
            {mobileLogoSets[0].map((logo, index) => (
              <ClientLogo 
                key={`ssr-mobile-${logo}`} 
                logo={logo} 
                index={index} 
                priority={true}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-4 grid-rows-2 gap-x-0.5 justify-items-start">
            {desktopLogoSets[0].map((logo, index) => (
              <ClientLogo 
                key={`ssr-desktop-${logo}`} 
                logo={logo} 
                index={index} 
                priority={true}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-2">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`text-center font-semibold text-sm md:text-left tracking-widest mb-4 ${METALLIC_BLACK_TEXT_CLASSES}`}
      >
        TRUSTED BY INDUSTRY LEADERS
      </motion.h2>
      
      {/* Mobile: 2x2 rotating grid - 4 sets */}
      <div className="block md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeCurrentSet}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2 justify-items-center"
          >
            {mobileLogoSets[safeCurrentSet]?.map((logo, index) => (
              <ClientLogo 
                key={`mobile-${safeCurrentSet}-${logo}`} 
                logo={logo} 
                index={index} 
                priority={safeCurrentSet === 0 && index < 4} // Prioritize first set
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop: 4x2 rotating grid - 2 sets */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeCurrentSet}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-4 grid-rows-2 gap-x-0.5 justify-items-start"
          >
            {desktopLogoSets[safeCurrentSet]?.map((logo, index) => (
              <ClientLogo 
                key={`desktop-${safeCurrentSet}-${logo}`} 
                logo={logo} 
                index={index} 
                priority={safeCurrentSet === 0 && index < 8} // Prioritize first set
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

ClientLogosGrid.displayName = 'ClientLogosGrid'; 