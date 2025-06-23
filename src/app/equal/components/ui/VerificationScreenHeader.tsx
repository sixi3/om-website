'use client';

import React from 'react';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationScreenHeaderProps {
  logoSrc: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

const textVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3, ease: "easeInOut" } },
};

const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } },
}

export const VerificationScreenHeader: React.FC<VerificationScreenHeaderProps> = ({
  logoSrc,
  title,
  subtitle,
  backgroundColor,
}) => {
  return (
    <div className={cn("pt-8 px-2 h-20 text-white relative overflow-hidden", backgroundColor, "transition-all duration-700 ease-in-out")}>
        <div className="flex items-center justify-between relative z-10">
            <div className="w-24 h-8 flex justify-center items-center bg-white px-2 rounded-md">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={logoSrc}
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="relative w-full h-full"
                    >
                        <Image 
                            src={logoSrc} 
                            alt={title}
                            fill
                            className="object-contain"
                            sizes="80px"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="flex-grow text-left ml-2">
                <AnimatePresence mode="wait">
                    <motion.h1 key={title} variants={textVariants} initial="initial" animate="animate" exit="exit" className="text-[12px] font-bold">
                        {title}
                    </motion.h1>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    <motion.p key={subtitle} variants={textVariants} initial="initial" animate="animate" exit="exit" className="text-[10px] font-regular">
                        {subtitle}
                    </motion.p>
                </AnimatePresence>
            </div>
            <MoreVertical className="h-6 w-6" />
        </div>
    </div>
  );
}; 