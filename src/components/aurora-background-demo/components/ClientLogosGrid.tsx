"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CLIENT_LOGOS, METALLIC_BLACK_TEXT_CLASSES } from '../constants';

interface ClientLogoProps {
  logo: string;
  index: number;
}

const ClientLogo = React.memo<ClientLogoProps>(({ logo, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      delay: 0.3 + index * 0.05,
      duration: 0.4,
      ease: "easeOut"
    }}
    className="relative w-full h-12 hover:scale-105 transition-transform duration-300 mb-6 flex justify-start items-center"
  >
    <Image
      src={`/client-logos/${logo}`}
      alt={`Client logo ${index + 1}`}
      fill
      className="object-contain object-left filter grayscale hover:grayscale-0 transition-all duration-300"
      sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
      priority={index < 8} // Prioritize loading for first 8 logos
    />
  </motion.div>
));

ClientLogo.displayName = 'ClientLogo';

export const ClientLogosGrid = React.memo(() => {
  // Take only first 8 logos for 2 rows of 4
  const firstEightLogos = CLIENT_LOGOS.slice(0, 8);
  
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
      <div className="grid grid-cols-4 grid-rows-2 gap-x-0.5 justify-items-start">
        {firstEightLogos.map((logo, index) => (
          <ClientLogo key={logo} logo={logo} index={index} />
        ))}
      </div>
    </div>
  );
});

ClientLogosGrid.displayName = 'ClientLogosGrid'; 