"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UseCase } from "../data/useCases";
import { UseCaseLayout } from "./UseCaseLayout";

interface UseCaseCardStackProps {
  items: UseCase[];
}

export const UseCaseCardStack = ({
  items,
}: UseCaseCardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <div className="w-full">
      <div className="flex justify-center pt-2">
        <div className="flex items-center gap-2 p-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
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
      
      <div className="w-full p-4 md:p-8">
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