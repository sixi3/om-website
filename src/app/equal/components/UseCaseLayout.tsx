import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { UseCase } from '../data/useCases';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const HorizontalPointList = ({ items, textColor }: { items: (string | undefined)[], textColor: string, }) => {
    const validItems = items.filter(Boolean);
    if (validItems.length === 0) return null;

    return (
        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-[16px] ${textColor}`}>
            {validItems.map((point, idx) => (
                <React.Fragment key={idx}>
                    <span>{point}</span>
                    {idx < validItems.length - 1 && <span className="text-slate-600">&bull;</span>}
                </React.Fragment>
            ))}
        </div>
    );
};

export function UseCaseLayout(props: UseCase) {
  const {
    id,
    heroHeadline,
    heroSubheadline,
    bottomCta,
    bestFor,
    problems,
    approach,
    features,
    before,
    after,
    challenges,
    delivers,
    needs,
    solution,
    capabilities,
    coreBenefits,
    designedForScale
  } = props;

  const allCapabilities = [
      ...(capabilities || []), 
      ...(coreBenefits || []), 
      ...(designedForScale || [])
  ];

  const beforeEqual = [
    ...(problems || []),
    ...(challenges || []),
    ...(needs || []),
    ...(before || [])
  ].filter(Boolean);

  const withEqual = [
    ...(approach || []),
    ...(solution || []),
    ...(delivers || []),
    ...(after || []),
    ...(Array.isArray(features) ? features.map(f => typeof f === 'string' ? f : `${f.feature} - ${f.description}`) : [])
  ].filter(Boolean);

  const allFeatures = [
      ...(Array.isArray(features) ? features : []),
  ];

  const allSolutions = [...(approach || []), ...(solution || [])];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id={id} className="w-full dark:border-slate-800">
      <motion.div 
        className="w-full px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Bento Grid for Capabilities */}
        <motion.div 
          className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                <span className={metallicBlackTextClasses}>{heroHeadline}</span>
              </h2>
              <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                {heroSubheadline}
              </p>
              <div className="flex justify-center items-center flex-wrap gap-3">
                <p className="text-md text-slate-800 dark:text-slate-100 font-regular">Best for:</p>
                {bestFor.map((item, index) => (
                  <div key={index} className="inline-block px-4 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
                      <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <p className="text-md text-slate-800 dark:text-slate-100 font-regular">{item}</p>
                      </div>
                  </div>
                ))}
              </div>
            </div>
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-6 w-full max-w-none">
                  {allCapabilities.map((cap, idx) => {
                      let className = "md:col-span-2 pt-12 px-4"; // Default for first row
                      const total = allCapabilities.length;

                      if (total === 4) {
                          if (idx === 3) {
                              className = "md:col-span-6"; // Full width for the single item on row 2
                          }
                      } else if (total === 5) {
                          if (idx >= 3) {
                              className = "md:col-span-3"; // Equal width for the two items on row 2
                          }
                      }
                      
                      return (
                          <BentoGridItem
                              key={idx}
                              className={className}
                              title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{cap.feature}</span>}
                              description={<span className="text-lg text-slate-800 dark:text-slate-100">{cap.description}</span>}
                          />
                      );
                  })}
              </BentoGrid>
            </div>
            {/* Before and After Banners */}
            <motion.div className="grid grid-cols-1" variants={itemVariants}>
                <div className="relative overflow-hidden bg-linear-to-r from-[#ce4257]/10 to-[#720026]/20 dark:bg-red-500/10 border-t border-[#720026]/20 pt-2 pb-4 text-center">
                    <h3 className="text-md font-medium tracking-widest text-[#bc4749] uppercase mb-2">WITHOUT EQUAL</h3>
                    <HorizontalPointList items={beforeEqual} textColor="text-[#bc4749] dark:text-red-300" />
                    <Image 
                        src="/thumbs-up.png"
                        alt="Thumbs Down"
                        width={100}
                        height={100}
                        className="absolute -top-2 -right-4 -z-10 rotate-180 opacity-20 xl:opacity-100"
                    />
                </div>
                <div className="relative overflow-hidden bg-linear-to-l from-[#40916c]/20 to-[#2d6a4f]/20 dark:bg-green-500/10 pt-2 pb-4 text-center border-t border-[#2d6a4f]/20">
                    <h3 className="text-md font-medium tracking-wider text-[#386641] uppercase mb-2 mt-1">WITH EQUAL</h3>
                    <HorizontalPointList items={withEqual} textColor="text-[#386641] dark:text-green-300" />
                    <Image 
                        src="/thumbs-up.png"
                        alt="Thumbs Up"
                        width={100}
                        height={100}
                        className="absolute -bottom-2 -left-4 -z-10 opacity-20 xl:opacity-100"
                    />
                    
                </div>
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 