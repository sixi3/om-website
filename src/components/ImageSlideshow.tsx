'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSlideshowProps {
  images: string[];
  interval?: number; // Interval in milliseconds
}

export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, interval = 6000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearTimeout(timer);
  }, [currentIndex, images, interval]);

  if (!images || images.length === 0) {
    return null; // Or some placeholder if no images are provided
  }

  return (
    <AnimatePresence>
      <motion.div
        key={currentIndex} // Important for AnimatePresence to detect changes
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full shadow-lg" // Ensure motion.div fills and overlaps
      >
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          priority={currentIndex === 0} // Prioritize loading the first image
        />
      </motion.div>
    </AnimatePresence>
  );
}; 