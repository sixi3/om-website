'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationScreenFooterProps {
  buttonColor: string;
  itemsCompleted: number;
  itemsTotal: number;
}

const textVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.3, ease: "easeInOut" } },
};

export const VerificationScreenFooter: React.FC<VerificationScreenFooterProps> = ({ buttonColor, itemsCompleted, itemsTotal }) => {
  const progressText = `${itemsCompleted}/${itemsTotal} Verifications Complete`;
  return (
    <div className="p-2 bg-slate-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="text-center mb-1 h-4">
        <AnimatePresence mode="wait">
            <motion.p 
                key={progressText} 
                variants={textVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="text-[9px] font-medium"
            >
                {progressText}
            </motion.p>
        </AnimatePresence>
      </div>
      <button className={cn("w-full text-white text-[12px] font-medium py-3 rounded-md shadow-lg transition-all duration-700 ease-in-out", buttonColor)}>
        SUBMIT
      </button>
      <div className="flex items-center justify-center mt-2">
        <span className="text-[8px] text-gray-400 mr-1">powered by</span>
        <Image src="/equal-logo.svg" alt="Equal Logo" width={50} height={12} />
      </div>
    </div>
  );
}; 