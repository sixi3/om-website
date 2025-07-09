'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GreenMetallicPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const GreenMetallicPhoneMockup: React.FC<GreenMetallicPhoneMockupProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'relative mx-auto border-[#2C6755] dark:border-[#0f362d] border-[12px] rounded-[2.8rem] h-[598px] w-[280px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]',
        'bg-[#154B3E]',
        className
      )}
    >
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="h-[22px] w-[120px] bg-[#154B3E] dark:bg-[#0f362d] rounded-b-xl"></div>
        </div>
        {/* Screen Content */}
        <div className="relative w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}; 