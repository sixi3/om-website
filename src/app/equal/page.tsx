import React from 'react';
import { Hero } from './sections/Hero';
import { WhatMakesEqualDifferent } from './sections/WhatMakesEqualDifferent';
import { UseCaseGrid } from './sections/UseCaseGrid';
import { ProductShowcase } from './sections/ProductShowcase';
import { TrustSecurity } from './sections/TrustSecurity';
import { Stats } from './sections/Stats';
import { ContactUs } from './sections/ContactUs';

export default function EqualPage() {
  return (
    <div>
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