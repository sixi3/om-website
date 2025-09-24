'use client';
import React, { useMemo, useState, useEffect, Suspense } from 'react';
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

  // Handle hash-based navigation and auto-scroll
  useEffect(() => {
    // Check if there's a hash in the URL (e.g., #use-cases)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      
      if (hash === 'use-cases') {
        // Add a small delay to ensure the page content is fully rendered
        const timer = setTimeout(() => {
          const element = document.getElementById('use-cases');
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }
  }, []); // Empty dependency array means this runs once when component mounts

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
      
      <section id="use-cases" className="relative w-full py-20 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <Suspense fallback={<div className="w-full h-96 flex justify-center items-center"><p>Loading...</p></div>}>
            <UseCaseCardStack 
              items={allUseCases} 
              activeIndex={activeIndex} 
              onTabChange={setActiveIndex} 
            />
          </Suspense>
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