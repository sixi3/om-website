'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronsRight } from 'lucide-react'; // For slider mode
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion
// We might need a Button component if the button mode requires more than basic styling
// For now, we'll use a simple <button> and style it.

interface PhoneScreenFooterProps {
  mode: 'slider' | 'button' | 'none';
  infoText?: string;
  sliderAccentColor?: string; // e.g., "bg-purple-600"
  sliderText?: string; // Text for the slider, e.g. "Slide to Approve Consent"
  buttonText?: string;
  onButtonClick?: () => void;
  isButtonDisabled?: boolean;
  buttonAccentColor?: string; // e.g., "bg-green-600 text-white"
  showPoweredBy?: boolean;
  className?: string;
  isSliderProcessing?: boolean;
  onSlideAnimationComplete?: () => void; // New callback prop
}

export const PhoneScreenFooter: React.FC<PhoneScreenFooterProps> = ({
  mode,
  infoText,
  sliderAccentColor = 'bg-neutral-600', // Default slider color
  sliderText = 'Slide to Action',
  buttonText = 'Submit',
  onButtonClick,
  isButtonDisabled = false,
  buttonAccentColor = 'bg-blue-600 text-white', // Default button style
  showPoweredBy = true,
  className,
  isSliderProcessing = false, 
  onSlideAnimationComplete, // Destructure new prop
}) => {
  // isProcessing is now effectively the same as isSliderProcessing for animation purposes
  // The sliderText check for 'Processing...' is no longer needed to trigger the slide animation itself.

  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const sliderIconRef = useRef<HTMLDivElement>(null);
  const [slideDistance, setSlideDistance] = useState(0);

  useEffect(() => {
    // Calculate distance if mode is slider and refs are available.
    // This can run even if not immediately processing, to have distance ready.
    if (mode ==='slider' && sliderTrackRef.current && sliderIconRef.current) {
      const trackWidth = sliderTrackRef.current.offsetWidth;
      const iconWidth = sliderIconRef.current.offsetWidth;
      const rightPadding = 4; 
      setSlideDistance(trackWidth - iconWidth - rightPadding);
    }
  }, [mode]); // Recalculate if mode changes (e.g. element becomes visible/changes role)

  const handleAnimationComplete = () => {
    if (isSliderProcessing && onSlideAnimationComplete) {
      onSlideAnimationComplete();
    }
  };

  return (
    <div className={cn("bg-white dark:bg-neutral-800 p-3 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_5px_rgba(0,0,0,0.2)] rounded-t-lg", className)}>
      {infoText && (
        <p className="text-[8px] text-center text-slate-500 dark:text-slate-400 mb-1.5 px-2">
          {infoText}
        </p>
      )}

      {mode === 'slider' && (
        <div 
          ref={sliderTrackRef}
          className={cn(
          "flex items-center justify-start bg-slate-100 dark:bg-neutral-700 rounded-md h-10 select-none relative overflow-hidden",
          isSliderProcessing ? "cursor-default" : "cursor-pointer" 
        )}>
          <motion.div 
            ref={sliderIconRef}
            className={cn("h-8 w-8 ml-1 flex items-center justify-center rounded-sm absolute", sliderAccentColor)}
            initial={{ x: 0 }} // Explicitly start at 0
            animate={isSliderProcessing && slideDistance > 0 ? { x: slideDistance } : { x: 0 }}
            transition={{
              duration: 1.0, // Slightly faster for a one-way slide
              ease: "easeInOut"
            }}
            onAnimationComplete={handleAnimationComplete} // Call when animation finishes
          >
            <ChevronsRight className="h-4 w-4 text-white" />
          </motion.div>
          <span className="flex-grow text-center text-xs font-medium text-slate-700 dark:text-slate-200 pl-10 pr-2">
            {sliderText}
          </span>
        </div>
      )}

      {mode === 'button' && (
        <button
          onClick={onButtonClick}
          disabled={isButtonDisabled}
          className={cn(
            'w-full h-10 flex items-center justify-center rounded-md text-sm font-medium',
            'transition-colors transition-opacity duration-300 ease-in-out',
            buttonAccentColor,
            isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer',
          )}
        >
          {buttonText}
        </button>
      )}
      
      {/* If mode is 'none', this section will be empty, providing padding if infoText is also absent. Adjust if specific height needed for 'none' mode. */}

      {showPoweredBy && (
        <div className="flex items-center justify-center text-[9px] text-slate-400 dark:text-slate-500 mt-2.5 mb-0.5">
          <span>powered by</span>
          <Image src="/om-logo.svg" alt="OneMoney Logo" width={50} height={12} className="ml-1" />
        </div>
      )}
    </div>
  );
}; 