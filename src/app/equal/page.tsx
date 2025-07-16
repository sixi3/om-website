import React, { useMemo } from 'react';
import { Hero } from './sections/Hero';
import { WhatMakesEqualDifferent } from './sections/WhatMakesEqualDifferent';
import { UseCaseGrid } from './sections/UseCaseGrid';
import { ProductShowcase } from './sections/ProductShowcase';
import { TrustSecurity } from './sections/TrustSecurity';
import { Stats } from './sections/Stats';
import { ContactUs } from './sections/ContactUs';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { GlowingDivider } from "@/components/ui/glowing-divider";

export default function EqualPage() {
  // Memoize static props for performance
  const glowingDividerProps = useMemo(() => ({
    width: "3/4" as const,
    intensity: "high" as const,
    className: "my-8 md:my-16"
  }), []);

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
      
      <UseCaseGrid />
      
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