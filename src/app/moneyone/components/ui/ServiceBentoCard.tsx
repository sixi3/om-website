'use client';

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ServiceBentoCardProps {
  className?: string;
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export const ServiceBentoCard = ({ 
  className, 
  icon, 
  title, 
  description, 
  imageSrc, 
  imageAlt = "Feature illustration" 
}: ServiceBentoCardProps) => {
  const isWide = className?.includes('col-span-2');
  
  return (
    <div
      className={cn(
        "flex h-full flex-col items-start justify-start space-y-3 p-6", 
        "bg-background/10 dark:bg-slate-800/70 backdrop-blur-md",
        "rounded-xl border border-slate-200 dark:border-slate-700",
        "shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out",
        "relative overflow-hidden", 
        className
      )}
    >
      {icon && <div className="text-[#00b140] dark:text-sky-400 mb-2">{icon}</div>}
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className={cn(
          "text-base text-slate-600 dark:text-slate-300 leading-relaxed",
          isWide ? "max-w-[70%]" : "max-w-[85%]" // Adjust text width based on card width
        )}
      >
        {description}
      </p>
      
      {imageSrc && (
        <div className={cn(
          "absolute pointer-events-none select-none",
          isWide 
            ? "bottom-[-120px] right-[-100px] w-44 h-44 lg:w-72 lg:h-72" // Large image at bottom right for wide cards
            : "top-[-40] right-[-30] w-20 h-20 lg:w-40 lg:h-40" // Small image at top right for narrow cards
        )}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={isWide ? 360 : 240}
            height={isWide ? 360 : 240}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}; 