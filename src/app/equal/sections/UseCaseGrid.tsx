'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid"; 
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";
import { useCasesData } from "../data/useCases";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

export function UseCaseGrid() {
  return (
    <motion.section
      className="relative w-full py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
                <span className={metallicBlackTextClasses}>One Platform,</span>{" "}
                <span className={highlightBgClass}>
                Every Use Case
                </span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300">
                From enterprise to startups, Equal is built to handle every identity verification challenge.
            </p>
        </div>

        <BentoGrid className="gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {useCasesData.map((item) => (
            <BentoGridItem
              key={item.id}
              className="group/bento flex flex-col transition-shadow duration-300 hover:shadow-2xl"
              title={
                <div className="flex flex-col">
                  <span className="mb-2">{item.icon}</span>
                  <span className="text-lg font-semibold">{item.title}</span>
                </div>
              }
              header={
                <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
                  <Image 
                    src="/placeholder.png" // Replace with actual images
                    alt={item.title}
                    fill={true}
                    className="object-cover"
                    sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 22vw"
                    quality={80}
                  />
                </div>
              }
              description={
                <div className="flex-grow flex flex-col justify-between">
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.heroHeadline}
                  </p>
                  <Link href={`/equal/solutions/${item.id}`} passHref>
                    <span className="mt-auto inline-flex items-center justify-center rounded-full bg-[#00b140] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover/bento:translate-x-1" />
                    </span>
                  </Link>
                </div>
              }
            />
          ))}
        </BentoGrid>

        <div className="text-center mt-12">
            <Link href="#" passHref>
                <span className="group inline-flex items-center justify-center rounded-full bg-[#00b140] px-6 py-3 text-base font-semibold text-white shadow-lg">
                    Schedule a Free Use Case Mapping Call
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </span>
            </Link>
        </div>
      </div>
    </motion.section>
  );
} 