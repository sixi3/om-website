"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
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

  return (
    <motion.div
      className="relative flex h-[50rem] justify-center space-x-10 rounded-md dark:bg-neutral-900"
      ref={ref}
    >
      {/* Left side: Scrolling Text Content */}
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
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
          ))}
        </div>
      </div>

      {/* Right side: Sticky Video Player */}
      <div
        className={cn(
          "sticky top-10 hidden h-80 w-[30rem] overflow-hidden rounded-md lg:block",
          contentClassName
        )}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          width="100%"
          height="100%"
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
}; 