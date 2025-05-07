'use client';

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

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
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
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
  videoHeaderSrc,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  videoHeaderSrc?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rewindAnimationRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (rewindAnimationRef.current) {
      cancelAnimationFrame(rewindAnimationRef.current);
      rewindAnimationRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (videoRef.current) {
      videoRef.current.pause();
      
      const rewind = () => {
        if (videoRef.current && videoRef.current.currentTime > 0) {
          videoRef.current.currentTime -= 0.03;
          if (videoRef.current.currentTime < 0.03 && videoRef.current.currentTime > 0) {
            videoRef.current.currentTime = 0;
          }
          if (videoRef.current.currentTime > 0) {
            rewindAnimationRef.current = requestAnimationFrame(rewind);
          } else {
            rewindAnimationRef.current = null;
          }
        } else {
          if(videoRef.current) videoRef.current.currentTime = 0;
          rewindAnimationRef.current = null;
        }
      };
      rewindAnimationRef.current = requestAnimationFrame(rewind);
    }
  };

  return (
    <div
      className={cn(
        "group/bento shadow-xl row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-slate-200 bg-background/10 backdrop-blur-md p-4 transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        !isMobile && "hover:shadow-xl",
        className,
      )}
      onMouseEnter={videoHeaderSrc && !isMobile ? handleMouseEnter : undefined}
      onMouseLeave={videoHeaderSrc && !isMobile ? handleMouseLeave : undefined}
    >
      <div className="transition-transform duration-300 ease-in-out flex-1">
        {videoHeaderSrc ? (
          <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
            <video
              ref={videoRef}
              src={videoHeaderSrc}
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          header
        )}
      </div>
      <div className={cn(
        "transition duration-200",
        !isMobile && "group-hover/bento:translate-x-2"
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