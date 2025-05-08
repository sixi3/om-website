'use client';

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

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
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3",
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
  mobileHeaderImageSrc,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  videoHeaderSrc?: string;
  mobileHeaderImageSrc?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile && mobileHeaderImageSrc) return;
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile && mobileHeaderImageSrc) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={cn(
        "group/bento shadow-xl row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-slate-200 bg-background/10 backdrop-blur-md p-4 transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        !(isMobile && mobileHeaderImageSrc) && "hover:shadow-xl",
        className,
      )}
      onMouseEnter={videoHeaderSrc && !(isMobile && mobileHeaderImageSrc) ? handleMouseEnter : undefined}
      onMouseLeave={videoHeaderSrc && !(isMobile && mobileHeaderImageSrc) ? handleMouseLeave : undefined}
    >
      <div className="transition-transform duration-300 ease-in-out flex-1">
        {isMobile && mobileHeaderImageSrc ? (
          <div className="relative flex flex-1 w-full h-full min-h-[2rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
            <Image
              src={mobileHeaderImageSrc}
              alt={typeof title === 'string' ? title : "Header image"}
              width={1600}
              height={900}
              className="object-contain w-full h-full"
            />
          </div>
        ) : videoHeaderSrc ? (
          <div className="relative flex flex-1 w-full h-full min-h-[2rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
            <video
              ref={videoRef}
              src={videoHeaderSrc}
              muted
              playsInline
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          header
        )}
      </div>
      <div className={cn(
        "transition duration-200",
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