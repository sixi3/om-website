import React from 'react';
import { Hero } from './sections/Hero';
import { WhatMakesEqualDifferent } from './sections/WhatMakesEqualDifferent';
import { UseCaseGrid } from './sections/UseCaseGrid';
import { ProductShowcase } from './sections/ProductShowcase';
import { TrustSecurity } from './sections/TrustSecurity';
import { Stats } from './sections/Stats';
import { ContactUs } from './sections/ContactUs';
import { BackgroundGrid } from '@/components/ui/background-grid';

export default function EqualPage() {
  return (
    <div className="relative">
      <BackgroundGrid zIndex={-1} />
      <Hero />
      <Stats />
      <ProductShowcase />
      <WhatMakesEqualDifferent />
      <UseCaseGrid />
      <TrustSecurity />
      <ContactUs />
      {/* Other sections will be added here */}
    </div>
  );
} 