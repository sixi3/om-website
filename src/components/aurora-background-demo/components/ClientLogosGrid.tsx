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
        src={`/client-logos/${logo}`}
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
  const firstEightLogos = CLIENT_LOGOS.slice(0, 8);
  
  // Create sets of 4 logos for mobile rotation
  const logoSets = [
    firstEightLogos.slice(0, 4), // First 4 logos
    firstEightLogos.slice(4, 8), // Next 4 logos
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % logoSets.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [logoSets.length]);
  
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
      
      {/* Mobile: 2x2 rotating grid */}
      <div className="block md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSet}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2 justify-items-center"
          >
            {logoSets[currentSet].map((logo, index) => (
              <ClientLogo 
                key={`${currentSet}-${logo}`} 
                logo={logo} 
                index={index} 
                priority={currentSet === 0 && index < 4} // Prioritize first set
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop: 4x2 static grid */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-x-0.5 justify-items-start">
        {firstEightLogos.map((logo, index) => (
          <ClientLogo 
            key={logo} 
            logo={logo} 
            index={index} 
            priority={index < 4} // Prioritize first row
          />
        ))}
      </div>
    </div>
  );
});

ClientLogosGrid.displayName = 'ClientLogosGrid'; 