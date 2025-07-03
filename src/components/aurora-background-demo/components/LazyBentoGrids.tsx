"use client";

import React, { lazy, Suspense } from 'react';

// Lazy load the bento grid components
const OneMoneyBentoGridLazy = lazy(() => 
  import('./BentoGrids').then(module => ({ default: module.OneMoneyBentoGrid }))
);

const MoneyOneBentoGridLazy = lazy(() => 
  import('./BentoGrids').then(module => ({ default: module.MoneyOneBentoGrid }))
);

const EqualBentoGridLazy = lazy(() => 
  import('./BentoGrids').then(module => ({ default: module.EqualBentoGrid }))
);

// Loading fallback component
const BentoGridSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      <div className="h-64 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="h-48 bg-gray-200 rounded-lg"></div>
      <div className="h-48 bg-gray-200 rounded-lg"></div>
      <div className="h-48 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

// Wrapper components with suspense
export const LazyOneMoneyBentoGrid = React.memo(() => (
  <Suspense fallback={<BentoGridSkeleton />}>
    <OneMoneyBentoGridLazy />
  </Suspense>
));

export const LazyMoneyOneBentoGrid = React.memo(() => (
  <Suspense fallback={<BentoGridSkeleton />}>
    <MoneyOneBentoGridLazy />
  </Suspense>
));

export const LazyEqualBentoGrid = React.memo(() => (
  <Suspense fallback={<BentoGridSkeleton />}>
    <EqualBentoGridLazy />
  </Suspense>
));

LazyOneMoneyBentoGrid.displayName = 'LazyOneMoneyBentoGrid';
LazyMoneyOneBentoGrid.displayName = 'LazyMoneyOneBentoGrid';
LazyEqualBentoGrid.displayName = 'LazyEqualBentoGrid'; 