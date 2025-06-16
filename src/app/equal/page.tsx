import React from 'react';
import { Hero } from './sections/Hero';
import { WhatMakesEqualDifferent } from './sections/WhatMakesEqualDifferent';
import { UseCaseGrid } from './sections/UseCaseGrid';
import { ProductShowcase } from './sections/ProductShowcase';
import { Solutions } from './sections/Solutions';
import { TrustSecurity } from './sections/TrustSecurity';

export default function EqualPage() {
  return (
    <div>
      <Hero />
      <WhatMakesEqualDifferent />
      <UseCaseGrid />
      <ProductShowcase />
      <Solutions />
      <TrustSecurity />
      {/* Other sections will be added here */}
    </div>
  );
} 