"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-full border-b-4 border-[#008000] bg-linear-to-br from-[#00b140] to-[#baff29] shadow-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#087C32] focus:border-b-1 min-h-[44px] min-w-[44px] hover:pr-8 transition-border duration-300 ease-out",
        className
      )}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
      
      {/* Button content */}
      <span className="relative flex items-center">
        <span className="transition-all duration-300 ease-out">{children}</span>
        
        {/* Arrow container with fixed width to prevent layout shift */}
        <span className="inline-flex items-center justify-center w-0 group-hover:w-6 transition-all duration-300 ease-out overflow-hidden">
          <ArrowRight className="h-4 w-4 ml-2 text-white transition-all duration-300 ease-out transform translate-x-[-16px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </span>
    </button>
  );
} 