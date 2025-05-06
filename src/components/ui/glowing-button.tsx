"use client"; // Needs to be a client component for potential event handlers

import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react"; // Import useState, useRef

// Keeping the interface name for now, though it's not "glowing" anymore
interface GlowingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm'; // Add size prop
}

// Keeping the export name the same to avoid breaking imports
export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, className, size = 'default', ...props }, ref) => {
    const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
    const [isHovering, setIsHovering] = useState(false);
    const internalRef = useRef<HTMLButtonElement>(null); // Use internal ref if external ref is not provided
    const buttonRef = ref || internalRef; // Decide which ref to use

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef && typeof buttonRef !== 'function') {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
          setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: -1, y: -1 });
    };

    // Define size-specific classes including font properties
    const sizeClasses = {
      default: "px-8 py-2 text-lg uppercase font-semibold",
      sm: "px-4 py-1.5 text-sm uppercase font-semibold", // Added uppercase and font-semibold
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          // Base styles common to all sizes
          "relative overflow-hidden rounded-sm border border-[#d2ff61]", 
          "bg-gradient-to-b from-[#d2ff61] to-[#aadd20]",
          "shadow-md shadow-[#212121]", // Corrected shadow based on your file
          "transition-all duration-300 ease-in-out",
          // Apply size-specific classes (which now include text, padding, and font weight/case)
          sizeClasses[size], 
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Shine element */}
        <span
          className="pointer-events-none absolute inset-0 rounded-md transition-opacity duration-300 ease-in-out"
          style={{
            opacity: isHovering ? 0.8 : 0, // Control shine visibility/intensity from your file
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent 90%)`,
          }}
        />
        {/* Content Span - Apply text color here */}
        <span
          className={cn(
            "relative z-10",
            "text-[#002E11]" 
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

GlowingButton.displayName = "GlowingButton"; 