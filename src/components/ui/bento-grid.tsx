'use client';

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  // const [isMobile, setIsMobile] = useState(false); // Temporarily comment out if not used elsewhere

  // useEffect(() => { // Temporarily comment out if not used elsewhere
  //   const checkMobile = () => setIsMobile(window.innerWidth < 768);
  //   checkMobile();
  //   window.addEventListener('resize', checkMobile);
  //   return () => window.removeEventListener('resize', checkMobile);
  // }, []);

  return (
    <div
      className={cn(
        "group/bento shadow-xl row-span-1 flex flex-col justify-start space-y-4 rounded-xl border border-slate-200 bg-background/10 p-4 transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        // !isMobile && "hover:shadow-xl", // Removed hover:shadow-xl
        className,
      )}
    >
      <div className="transition-transform duration-300 ease-in-out">
        {header}
      </div>
      
      <div className={cn(
        "transition duration-200"
        // !isMobile && "group-hover/bento:translate-x-2" // Removed group-hover:translate-x-2
      )}>
        {icon}
        <div className="mt-2 mb-2 font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
}; 