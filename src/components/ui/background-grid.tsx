"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
  color?: string;
  opacity?: number;
  zIndex?: number;
}

// Utility to get responsive number of lines
function getLineCount(width: number) {
  if (width < 640) return 6; // mobile
  if (width < 1024) return 10; // tablet
  if (width < 1536) return 16; // desktop
  return 18; // xl screens
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  className = "",
  color = "#00b140",
  opacity = 0.08,
  zIndex = 0,
}) => {
  const [lineCount, setLineCount] = useState(10);
  const [show, setShow] = useState(false);

  // Responsive line count
  useEffect(() => {
    function updateLineCount() {
      setLineCount(getLineCount(window.innerWidth));
    }
    updateLineCount();
    window.addEventListener("resize", updateLineCount);
    return () => window.removeEventListener("resize", updateLineCount);
  }, []);

  // Show grid after content loads (simulate with slight delay)
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 400); // 400ms after mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "pointer-events-none fixed inset-0 w-full h-full overflow-hidden",
            className
          )}
          style={{ zIndex }}
        >
          <div className="relative w-full h-full">
            {Array.from({ length: lineCount }).map((_, i) => {
              const left = `${(i / (lineCount - 1)) * 100}%`;
              return (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.2 + i * 0.04, // staggered
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left,
                    width: "2px",
                    height: "100%",
                    // background: color, // Remove solid background
                    opacity,
                    transformOrigin: "top center",
                    borderRadius: 9999,
                    borderLeft: `1px dashed ${color}`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 