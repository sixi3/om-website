import React from 'react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { UseCase } from '../data/useCases';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const HorizontalPointList = ({ items, textColor }: { items: (string | undefined)[], textColor: string }) => {
    const validItems = items.filter(Boolean);
    if (validItems.length === 0) return null;

    return (
        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium ${textColor}`}>
            {validItems.map((point, idx) => (
                <React.Fragment key={idx}>
                    <span>{point}</span>
                    {idx < validItems.length - 1 && <span className="text-white">&bull;</span>}
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
  
  return (
    <section id={id} className="w-full dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">

        {/* Bento Grid for Capabilities */}
        <div className="max-w-8xl mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
          <div className="px-8 py-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-6">
                <span className={metallicBlackTextClasses}>{heroHeadline}</span>
              </h2>
              <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
                {heroSubheadline}
              </p>
              <div className="inline-block px-4 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-md text-slate-800 dark:text-slate-100 font-regular">{bestFor}</p>
                </div>
              </div>
            </div>
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-6">
                  {allCapabilities.map((cap, idx) => {
                      let className = "md:col-span-2"; // Default for first row
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
                              title={cap.feature}
                              description={cap.description}
                          />
                      );
                  })}
              </BentoGrid>
            </div>
            {/* Before and After Banners */}
            <div className="grid grid-cols-1">
                <div className="bg-linear-to-br from-[#ce4257]/90 to-[#720026]/90 dark:bg-red-500/10 pt-2 pb-4 text-center">
                    <h3 className="text-sm font-medium tracking-widest text-[#ff8fa3] uppercase mb-2">WITHOUT EQUAL</h3>
                    <HorizontalPointList items={beforeEqual} textColor="text-white dark:text-red-300" />
                </div>
                <div className="bg-linear-to-r from-[#40916c]/90 to-[#2d6a4f]/90 dark:bg-green-500/10 p-2 text-center">
                    <h3 className="text-sm font-medium tracking-wider text-[#70e000] uppercase mb-2 mt-1">WITH EQUAL</h3>
                    <HorizontalPointList items={withEqual} textColor="text-white dark:text-green-300" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
} 