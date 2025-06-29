"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from "framer-motion";
import { UseCase } from "../data/useCases";

const UseCaseLayout = dynamic(() => import('./UseCaseLayout').then(mod => mod.UseCaseLayout), {
  loading: () => <div className="w-full h-96 flex justify-center items-center"><p>Loading...</p></div>,
  ssr: false
});

interface UseCaseCardStackProps {
  items: UseCase[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export const UseCaseCardStack = ({
  items,
  activeIndex,
  onTabChange,
}: UseCaseCardStackProps) => {
  const activeItem = items[activeIndex];
  const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
  const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

  return (
    <div className="w-full">
      <div className="text-center my-8">
        <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Real-World Problems,</span>{" "}
            <span className={highlightBgClass}>Solved with Equal</span>
        </h2>
        <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
            From HRMS integration to gig worker onboarding, Equal provides tailored solutions for your most complex verification challenges.
        </p>
      </div>

      <div className="flex items-center justify-center pt-2 px-4">
        <div className="flex items-center gap-2 p-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onTabChange(index)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                activeIndex === index
                  ? "text-white"
                  : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {activeIndex === index && (
                <motion.div
                  layoutId="active-use-case-tab"
                  className="absolute inset-0 bg-[#00b140] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeItem && <UseCaseLayout {...activeItem} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}; 