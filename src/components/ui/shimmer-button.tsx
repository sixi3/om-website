"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-full border-b-4 border-[#008000] bg-linear-to-tr from-[#00b140] to-[#baff29] shadow-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#087C32] focus:border-b-1 min-h-[44px] min-w-[44px] transition-border duration-300 ease-out",
        // Only apply dynamic width classes after hydration
        isMounted && "lg:hover:pr-8",
        className
      )}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
      
      {/* Button content with arrow */}
      <span className="relative flex items-center justify-center">
        <span className="transition-all duration-300 ease-out">{children}</span>
        
        {/* Arrow container with dynamic width - only show on client */}
        <span className={cn(
          "inline-flex items-center justify-center transition-all duration-300 ease-out overflow-hidden",
          isMounted ? "w-6 lg:w-0 lg:group-hover:w-6" : "w-6"
        )}>
          <ArrowRight className={cn(
            "h-4 w-4 ml-2 text-white transition-all duration-300 ease-out",
            isMounted 
              ? "opacity-100 transform rotate-0 lg:opacity-0 lg:rotate-0 lg:group-hover:opacity-100 lg:group-hover:-rotate-45"
              : "opacity-100 transform rotate-0"
          )} />
        </span>
      </span>
    </button>
  );
} 