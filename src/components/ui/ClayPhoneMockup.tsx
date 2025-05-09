'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ClayPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const ClayPhoneMockup: React.FC<ClayPhoneMockupProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'relative mx-auto border-slate-100 dark:border-gray-700 border-[12px] rounded-[2.8rem] h-[598px] w-[280px] shadow-xl', // Adjusted height for 360x800 screen ratio
        'bg-slate-200 dark:bg-neutral-800', // Clay colors
        className
      )}
    >
      {/* Optional: Inner shadow for depth, or side buttons - keeping it simple for now */}
      {/* <div className="absolute -left-[13px] top-[65px] rounded-l-lg h-[28px] w-[3px] bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute -left-[13px] top-[105px] rounded-l-lg h-[44px] w-[3px] bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute -left-[13px] top-[160px] rounded-l-lg h-[44px] w-[3px] bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute -right-[13px] top-[100px] rounded-r-lg h-[60px] w-[3px] bg-gray-800 dark:bg-gray-700"></div> */}

      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="h-[22px] w-[120px] bg-slate-100 dark:bg-gray-700 rounded-b-xl"></div>
        </div>
        {/* Screen Content */}
        <div className="relative w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}; 