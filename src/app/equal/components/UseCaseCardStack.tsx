"use client";
import React, { useRef, useState } from "react";
import { useTransform, useScroll, motion, useMotionValueEvent } from "framer-motion";
import { UseCase } from "../data/useCases";
import { UseCaseLayout } from "./UseCaseLayout";

interface UseCaseCardStackProps {
  items: UseCase[];
  offset?: number;
  scaleFactor?: number;
}

export const UseCaseCardStack = ({
  items,
  offset = 30,
  scaleFactor = 0.05,
}: UseCaseCardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest * items.length), items.length - 1);
    if (newIndex >= 0) {
        setActiveIndex(newIndex);
    }
  });

  const containerHeight = items.length * 100;

  return (
    <div ref={containerRef} className="relative" style={{ height: `${containerHeight}vh`}} >
      <div className="sticky top-24 z-20 flex justify-center">
        <div className="flex items-center gap-2 p-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                activeIndex === index
                  ? "bg-[#00b140] text-white shadow-lg"
                  : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {item.title}
            </motion.div>
          ))}
        </div>
      </div>
      {items.map((item, i) => {
        return (
          <Card
            key={item.id}
            i={i}
            {...item}
            progress={scrollYProgress}
            range={[i / items.length, (i + 1) / items.length]}
            targetScale={1 - (items.length - 1 - i) * scaleFactor}
            offset={offset}
          />
        );
      })}
    </div>
  );
};

interface CardProps extends UseCase {
  i: number;
  progress: any;
  range: [number, number];
  targetScale: number;
  offset: number;
}

const Card = ({ i, progress, range, targetScale, offset, ...item }: CardProps) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className="h-screen sticky top-36 flex items-start justify-center pt-8">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * offset}px)`,
        }}
        className="relative h-full w-full"
      >
        <div className="w-full h-full p-4 md:p-8">
            <UseCaseLayout {...item} />
        </div>
      </motion.div>
    </div>
  );
}; 