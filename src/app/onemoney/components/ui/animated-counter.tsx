"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  fixedDecimals?: number; // New prop for fixed decimal places
  duration?: number; // New prop for animation duration
}

export function AnimatedCounter({ 
  value, 
  className, 
  fixedDecimals, 
  duration = 1.5 // Default duration
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Adjust margin if needed

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration, // Use the new duration prop
        ease: "easeOut",
        onUpdate(latest) {
          // Use toFixed if fixedDecimals is provided, otherwise round
          setDisplayValue(fixedDecimals !== undefined ? parseFloat(latest.toFixed(fixedDecimals)) : Math.round(latest));
        },
      });
      // Optional: Cleanup function to stop animation if component unmounts during animation
      return () => controls.stop();
    } else {
      // Optional: Reset to 0 if it scrolls out of view and `once` is false
      // setDisplayValue(0);
    }
  }, [isInView, value, fixedDecimals, duration]); // Add duration to dependency array

  return (
    <span ref={ref} className={className}>
      {/* Remove toLocaleString() - parent component will handle formatting/suffix */}
      {displayValue}
    </span>
  );
} 