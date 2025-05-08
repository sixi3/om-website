"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the structure for content items including time ranges
interface ContentItem {
  title: string;
  description: string;
  startTime: number;
  endTime: number;
}

export const StickyScroll = ({
  content,
  contentClassName,
  videoSrc,
}: {
  content: ContentItem[]; // Use the interface for stricter typing
  contentClassName?: string;
  videoSrc: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0); // State for segment progress
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Added state for small screen detection
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use useInView hook to track viewport visibility
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" }); // Trigger once, with margin

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !content || content.length === 0) return;

    const currentTime = video.currentTime;
    let newActiveCard = -1;
    let currentSegmentProgress = 0;

    // Find which content segment the current time falls into
    for (let i = 0; i < content.length; i++) {
      const segment = content[i];
      const nextSegmentStartTime = i + 1 < content.length ? content[i+1].startTime : Infinity;
      
      // Determine if this card should be active
      // Handle last card potentially going to end of video
      const isActive = (i === content.length - 1)
         ? (currentTime >= segment.startTime)
         : (currentTime >= segment.startTime && currentTime < nextSegmentStartTime);

      if (isActive) {
        newActiveCard = i;
        // Calculate progress within this active segment
        const segmentDuration = segment.endTime - segment.startTime;
        if (segmentDuration > 0) {
          const progress = (currentTime - segment.startTime) / segmentDuration;
          currentSegmentProgress = Math.max(0, Math.min(1, progress));
        }
        break; // Found the active card
      }
    }

    // If time is before the first start time, default to first card, progress 0
    if (newActiveCard === -1 && currentTime < content[0]?.startTime) {
      newActiveCard = 0;
      currentSegmentProgress = 0;
    }

    // Update states
    setSegmentProgress(currentSegmentProgress);
    if (newActiveCard !== -1 && newActiveCard !== activeCard) {
      console.log(`Video time ${currentTime.toFixed(2)}s -> Activating card ${newActiveCard}`);
      setActiveCard(newActiveCard);
    }

  }, [content, activeCard]); // Dependencies

  // Effect to attach timeupdate listener
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      console.log("Attached timeupdate listener");
      // Initial check in case video is already playing/at a specific time
      handleTimeUpdate(); 
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        console.log("Removed timeupdate listener");
      };
    }
  }, [videoSrc, handleTimeUpdate]); // Re-attach if src or handler changes

  // Effect to trigger video play when component is in view
  useEffect(() => {
    if (isInView && videoRef.current) {
      console.log("Component in view, attempting to play video...");
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Autoplay started!
          console.log("Video autoplay started successfully.");
        })
        .catch(error => {
          // Autoplay was prevented.
          console.warn("Video autoplay was prevented:", error);
          // Show controls, allow user interaction etc.
        });
      }
    }
  }, [isInView]); // Trigger when isInView changes

  // Effect to detect small screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <motion.div
      className={cn(
        "relative rounded-md dark:bg-neutral-900",
        isSmallScreen ? "flex flex-col items-center py-10" : "flex h-[50rem] justify-center space-x-10" // Conditional layout
      )}
      ref={ref}
    >
      {/* Text Content Area - Layout changes based on isSmallScreen */}
      <div className={cn(
        "relative flex items-start px-4",
        isSmallScreen ? "w-full order-1 mb-8" : "div" // Full width, above video on small screens
      )}>
        <div className={cn(
          isSmallScreen ? "w-full" : "max-w-2xl" // Full width on small screens
        )}>
          {isSmallScreen ? (
            <AnimatePresence mode="wait">
              {content.filter((_, index) => index === activeCard).map((item, index) => (
                <motion.div
                  key={item.title + activeCard} // Key ensures re-render on activeCard change
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative my-4 p-6 rounded-lg border border-slate-200 bg-background/10 backdrop-blur-md dark:bg-black/50"
                  // Style active card as before, but only one is rendered at a time
                >
                  <motion.h2
                    className="flex items-center text-xl font-bold text-slate-800 dark:text-slate-100" // Adjusted size for mobile
                  >
                    <span className="relative flex h-2 w-2 mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {item.title}
                  </motion.h2>
                  <motion.p
                    className="text-sm mt-4 text-slate-600 dark:text-slate-300" // Adjusted size for mobile
                  >
                    {item.description}
                  </motion.p>
                  <div className="relative mt-6 h-2 shadow-xs w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00b140] to-[#baff29] origin-left"
                      animate={{ scaleX: segmentProgress }}
                      transition={{ type: "tween", duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            content.map((item, index) => (
              // Outer div for spacing, removed margin
              <div
                key={item.title + index}
                // Removed my-20
              >
                {/* Wrapper div for card styling and layout animation */}
                <motion.div
                  layout // Enable layout animation
                  className={cn(
                    "relative my-8 p-6 rounded-lg", // Reduced margin my-8
                    index === activeCard
                      ? "border border-slate-200 bg-background/10 backdrop-blur-md shadow-xl dark:bg-black/50"
                      : "bg-transparent"
                  )}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                    // Added flex items-center
                    className="flex items-center text-2xl font-bold text-slate-800 dark:text-slate-100"
                  >
                    {/* Conditionally Render Live Indicator Dot */}
                    {index === activeCard && (
                      <span className="relative flex h-2 w-2 mr-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                    className="text-kg mt-10 max-w-sm text-slate-600 dark:text-slate-300"
                  >
                    {item.description}
                  </motion.p>
                  {/* Progress Bar Container */}
                  <div className="relative mt-6 h-2 shadow-xs w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    {/* Main Progress Bar with Gradient */}
                    <motion.div 
                      // Added gradient, removed single bg color
                      className="h-full bg-gradient-to-r from-[#00b140] to-[#baff29] origin-left"
                      animate={{ scaleX: index === activeCard ? segmentProgress : (index < activeCard ? 1 : 0) }}
                      // Re-added transition to try and smooth updates
                      transition={{ type: "tween", duration: 0.2 }}
                    />
                    {/* Removed Glow Effect Element */}
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Video Player Area - Layout changes based on isSmallScreen */}
      <div
        className={cn(
          isSmallScreen ? "w-full max-w-sm order-2 px-4" : "sticky top-10 hidden w-[20rem] lg:block", // Ensured w-[18rem] is here for large screens
          contentClassName
        )}
      >
        {/* Simplified Video Wrapper */}
        <div className={cn(
          "relative w-full rounded-[2.7rem] overflow-hidden object-cover shadow-xl", // Combined styling
          isSmallScreen ? "h-auto aspect-[9/16]" : "h-[43rem]" // Conditional height/aspect
        )}>
          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            width="100%" 
            height="100%"
            muted
            playsInline
            preload="metadata"
            className={cn(
              "h-full w-full",
              isSmallScreen ? "object-contain" : "object-cover" // Conditional object-fit
            )}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.div>
  );
}; 