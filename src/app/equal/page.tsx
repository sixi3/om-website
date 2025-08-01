'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { Hero } from './sections/Hero';
import { WhatMakesEqualDifferent } from './sections/WhatMakesEqualDifferent';
import { ProductShowcase } from './sections/ProductShowcase';
import { TrustSecurity } from './sections/TrustSecurity';
import { Stats } from './sections/Stats';
import { ContactUs } from './sections/ContactUs';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { useCasesData, UseCase } from './data/useCases';
import { UseCaseCardStack } from "./components/UseCaseCardStack";

export default function EqualPage() {
  // Memoize static props for performance
  const glowingDividerProps = useMemo(() => ({
    width: "3/4" as const,
    intensity: "high" as const,
    className: "my-8 md:my-16"
  }), []);

  // Solutions section state - similar to solutions page
  const orderedUseCaseIds = [
    'hrms',
    'gig-economy',
    'bfsi',
    'staffing',
  ];
  
  const allUseCases = orderedUseCaseIds
    .map(id => useCasesData.find(uc => uc.id === id))
    .filter((uc): uc is UseCase => !!uc);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full overflow-x-hidden">
      <BackgroundGrid zIndex={-1} />
      <Hero />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.2}
      />
      
      <Stats />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.3}
      />
      
      <ProductShowcase />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.4}
      />
      
      <WhatMakesEqualDifferent />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.5}
      />
      
      <section className="relative w-full py-20 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <UseCaseCardStack 
            items={allUseCases} 
            activeIndex={activeIndex} 
            onTabChange={setActiveIndex} 
          />
        </div>
      </section>
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.6}
      />
      
      <TrustSecurity />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.7}
      />
      
      <ContactUs />
    </div>
  );
} 