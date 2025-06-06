'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ClayPhoneMockup } from '@/app/onemoney/components/ui/ClayPhoneMockup';

const images = [
  '/images/ui-theme-1.png',
  '/images/ui-theme-2.png',
  '/images/ui-theme-3.png',
];

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
};

export const PhoneSlideshowAnimation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
        <ClayPhoneMockup className="h-[650px] w-[310px]">
            <div className="relative w-full h-full bg-white dark:bg-neutral-900">
                <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={index}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                >
                    <Image
                    src={images[index]}
                    alt={`UI Theme ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[2rem]"
                    priority={index === 0}
                    />
                </motion.div>
                </AnimatePresence>
            </div>
        </ClayPhoneMockup>
    </div>
  );
}; 