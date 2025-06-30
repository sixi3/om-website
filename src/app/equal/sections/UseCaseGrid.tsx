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
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

export function UseCaseGrid() {
  return (
    <motion.section
      className="relative w-full py-20 md:py-24"
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
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 md:text-lg">
                From enterprise to startups, Equal is built to handle every identity verification challenge.
            </p>
        </div>

        <BentoGrid className="gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {useCasesData.map((item) => {
            // Map specific images to each use case
            const getImageSrc = (id: string) => {
              switch (id) {
                case "hrms":
                  return "/HRMS Integration.png";
                case "gig-economy":
                  return "/Gig Economy Hiring.png";
                case "bfsi":
                  return "/Financial Services.png";
                case "staffing":
                  return "/Staffing & Contract Roles.png";
                default:
                  return "/placeholder.png";
              }
            };

            return (
              <Link href={`/equal/solutions?tab=${item.id}`} key={item.id} className="block">
                <BentoGridItem
                  className="group/bento flex flex-col transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
                  title={
                    <div className="flex flex-col">
                      <span className="mb-2">{item.icon}</span>
                      <span className="text-lg font-semibold">{item.title}</span>
                    </div>
                  }
                                   header={
                     <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden bg-linear-to-br from-background/10 to-[#00b140]/10 border border-slate-200 dark:border-neutral-700">
                       <Image 
                         src={getImageSrc(item.id)}
                         alt={item.title}
                         fill={true}
                         className="object-cover transition-transform duration-300 ease-in-out group-hover/bento:scale-110"
                         sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 22vw"
                       />
                     </div>
                   }
                description={
                  <div className="flex-grow flex flex-col justify-between">
                    <p className="text-md text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.heroHeadline}
                    </p>
                    <span className="mt-auto inline-flex items-center justify-center rounded-full bg-background/30 backdrop-blur-md border border-[#00b140]/20 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-[#00b140] group-hover/bento:bg-[#00b140] group-hover/bento:text-white transition-colors duration-300">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover/bento:translate-x-1" />
                    </span>
                  </div>
                }
              />
              </Link>
            );
          })}
        </BentoGrid>
      </div>
    </motion.section>
  );
} 