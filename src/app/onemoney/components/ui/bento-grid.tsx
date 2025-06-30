'use client';

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

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
        "mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3",
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
  image,
  imagePosition = "top-right",
  imageSize = "w-12 h-12",
  imageClassName,
  colSpan = 1,
  rowSpan = 1,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  imagePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center" | "custom";
  imageSize?: string;
  imageClassName?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2 | 3;
}) => {
  const getImagePositionClasses = () => {
    switch (imagePosition) {
      case "top-left":
        return "absolute top-4 left-4";
      case "top-right":
        return "absolute top-4 right-4";
      case "bottom-left":
        return "absolute bottom-4 left-4";
      case "bottom-right":
        return "absolute bottom-4 right-4";
      case "center":
        return "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      case "custom":
        return ""; // Allow custom positioning via imageClassName
      default:
        return "absolute top-4 right-4";
    }
  };

  const getColSpanClass = () => {
    switch (colSpan) {
      case 2:
        return "md:col-span-2";
      case 3:
        return "md:col-span-3";
      default:
        return "md:col-span-1";
    }
  };

  const getRowSpanClass = () => {
    switch (rowSpan) {
      case 2:
        return "md:row-span-2";
      case 3:
        return "md:row-span-3";
      default:
        return "row-span-1";
    }
  };

  return (
    <div
      className={cn(
        "group/bento shadow-xl flex flex-col justify-start space-y-4 rounded-xl border border-slate-200 bg-background/10 backdrop-blur-md p-4 transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none relative overflow-hidden",
        getColSpanClass(),
        getRowSpanClass(),
        className,
      )}
    >
      {/* Image in specified position */}
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            getImagePositionClasses(),
            imageSize,
            "object-contain z-10",
            imageClassName
          )}
        />
      )}

      <div className="transition-transform duration-300 ease-in-out">
        {header}
      </div>
      
      <div className={cn(
        "transition duration-200"
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