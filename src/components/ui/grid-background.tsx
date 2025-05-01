"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  gridColor?: string; // e.g., 'rgba(128, 128, 128, 0.1)'
  gridSize?: number; // e.g., 40
  fadeStartPercent?: number; // Percentage radius where fade starts
  fadeEndPercent?: number; // Percentage radius where fade ends (fully transparent)
}

export function GridBackground({ 
  className, 
  gridColor = 'rgba(32, 173, 55, 0.08)', // Subtle grey grid
  gridSize = 50, // Grid line spacing
  fadeStartPercent = 0, // Start fade immediately from center
  fadeEndPercent = 75 // Fully faded at 75% radius
}: GridBackgroundProps) {
  
  // Ensure percentages are within valid range
  const start = Math.max(0, Math.min(100, fadeStartPercent));
  const end = Math.max(start, Math.min(100, fadeEndPercent)); // End must be >= start

  const gridStyle = {
    '--grid-color': gridColor,
    '--grid-size': `${gridSize}px`,
    '--fade-start': `${start}%`,
    '--fade-end': `${end}%`,
    // Repeating linear gradients for the grid lines
    backgroundImage: `
      repeating-linear-gradient(to right, var(--grid-color) 0, var(--grid-color) 1px, transparent 1px, transparent var(--grid-size)),
      repeating-linear-gradient(to bottom, var(--grid-color) 0, var(--grid-color) 1px, transparent 1px, transparent var(--grid-size))
    `,
    // Radial gradient mask: solid white in center, fades to transparent
    maskImage: `radial-gradient(ellipse at center, white var(--fade-start), transparent var(--fade-end))`,
    // Webkit prefix for broader browser support
    WebkitMaskImage: `radial-gradient(ellipse at center, white var(--fade-start), transparent var(--fade-end))`
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full -z-10", // Position behind content, ignore pointer events
        className
      )}
      style={gridStyle}
    />
  );
} 