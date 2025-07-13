"use client";

import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';
import { MainHeader } from "@/components/global/MainHeader";
import { HeroSection } from "./aurora-background-demo/components/HeroSection";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { BackgroundGrid } from "@/components/ui/background-grid";

// Lazy load heavy components with dynamic imports
const ModularSolutions = dynamic(() => import("./aurora-background-demo/components/ModularSolutions").then(mod => ({ default: mod.ModularSolutions })), {
  loading: () => <ModularSolutionsLoader />,
  ssr: false // Disable SSR for heavy interactive components
});

const BoardOfDirectors = dynamic(() => import("./aurora-background-demo/components/BoardOfDirectors").then(mod => ({ default: mod.BoardOfDirectors })), {
  loading: () => <BoardLoader />,
  ssr: false
});

const IndustrySection = dynamic(() => import("./aurora-background-demo/components/industries").then(mod => ({ default: mod.IndustrySection })), {
  loading: () => <IndustrySectionLoader />,
  ssr: false
});

const Team = dynamic(() => import("./aurora-background-demo/components/Team").then(mod => ({ default: mod.Team })), {
  loading: () => <TeamLoader />,
  ssr: false
});

// Performance monitoring component
const PerformanceMonitor = React.memo(() => {
  useEffect(() => {
    // Prefetch critical resources
    const prefetchResources = () => {
      const links = [
        '/client-logos/Frame 5.png',
        '/client-logos/Frame 6.png',
        '/client-logos/Frame 7.png',
        '/client-logos/Frame 8.png',
      ];
      
      links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Performance optimizations
    const optimizePerformance = () => {
      // Hint browser about critical rendering path
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          prefetchResources();
        });
      } else {
        setTimeout(prefetchResources, 100);
      }
    };

    // Monitor Web Vitals (in production)
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onINP(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
      }).catch(() => {
        // Fail silently if web-vitals is not available
      });
    }

    optimizePerformance();
  }, []);

  return null;
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

// Loading skeleton components with improved styling
const ModularSolutionsLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4" style={{ contain: 'layout style' }}>
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="text-center space-y-6 mb-16">
          <div className="h-4 bg-slate-200/80 rounded w-64 mx-auto"></div>
          <div className="h-12 bg-slate-200/80 rounded w-96 mx-auto"></div>
          <div className="h-6 bg-slate-200/80 rounded w-80 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-8 bg-slate-200/80 rounded w-48"></div>
            <div className="h-6 bg-slate-200/80 rounded w-64"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-slate-200/80 rounded"></div>
              <div className="h-16 bg-slate-200/80 rounded"></div>
              <div className="h-16 bg-slate-200/80 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-slate-200/80 rounded"></div>
            <div className="h-40 bg-slate-200/80 rounded"></div>
            <div className="h-40 bg-slate-200/80 rounded"></div>
            <div className="h-40 bg-slate-200/80 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

ModularSolutionsLoader.displayName = 'ModularSolutionsLoader';

const BoardLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4" style={{ contain: 'layout style' }}>
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="text-center space-y-6 mb-16">
          <div className="h-4 bg-slate-200/80 rounded w-64 mx-auto"></div>
          <div className="h-12 bg-slate-200/80 rounded w-96 mx-auto"></div>
          <div className="h-6 bg-slate-200/80 rounded w-80 mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-200/80 rounded-full"></div>
              <div className="space-y-2 text-center">
                <div className="h-4 bg-slate-200/80 rounded w-24 mx-auto"></div>
                <div className="h-3 bg-slate-200/80 rounded w-20 mx-auto"></div>
                <div className="h-3 bg-slate-200/80 rounded w-28 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
));

BoardLoader.displayName = 'BoardLoader';

const IndustrySectionLoader = React.memo(() => (
  <div className="relative w-full py-12 px-8" style={{ contain: 'layout style' }}>
    <div className="animate-pulse">
      <div className="mx-auto max-w-6xl text-center flex flex-col items-center mb-8">
        <div className="h-4 bg-slate-200/80 rounded w-48 mb-4"></div>
        <div className="h-12 bg-slate-200/80 rounded w-96 mb-4"></div>
        <div className="h-6 bg-slate-200/80 rounded w-80 mb-8"></div>
        <div className="h-10 bg-slate-200/80 rounded w-32"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-slate-200/80 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
));

IndustrySectionLoader.displayName = 'IndustrySectionLoader';

const TeamLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4" style={{ contain: 'layout style' }}>
    <div className="animate-pulse">
      <div className="max-w-7xl mx-auto text-center space-y-6 mb-8">
        <div className="h-4 bg-slate-200/80 rounded w-48 mx-auto"></div>
        <div className="h-12 bg-slate-200/80 rounded w-96 mx-auto"></div>
        <div className="h-6 bg-slate-200/80 rounded w-80 mx-auto"></div>
      </div>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80 h-96 bg-slate-200/80 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
));

TeamLoader.displayName = 'TeamLoader';

export default function AuroraBackgroundDemo() {
  return (
    <>
      <PerformanceMonitor />
      <MainHeader />
      <AuroraBackground className="min-h-full overflow-x-hidden">
        {/* Subtle vertical grid lines for guiding users */}
        <BackgroundGrid zIndex={1} />
        <div 
          className="relative flex flex-col min-h-screen w-full z-5 overflow-x-hidden"
          style={{ 
            contain: 'layout style',
            willChange: 'transform' // Hint browser for optimization
          }}
        >
          {/* Critical above-the-fold content - load immediately */}
          <HeroSection />
          
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.2}
            className="my-8 md:my-16"
          />
          
          {/* Lazy load below-the-fold sections with Suspense fallbacks */}
          <Suspense fallback={<ModularSolutionsLoader />}>
            <ModularSolutions />
          </Suspense>
          
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.4}
            className="my-8 md:my-16"
          />
          
          <Suspense fallback={<BoardLoader />}>
            <BoardOfDirectors />
          </Suspense>
          
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.4}
            className="my-8 md:my-16"
          />
          
          <Suspense fallback={<IndustrySectionLoader />}>
            <IndustrySection />
          </Suspense>
          
          <GlowingDivider 
            width="3/4" 
            intensity="high" 
            delay={0.4}
            className="my-8 md:my-16"
          />
          
          <Suspense fallback={<TeamLoader />}>
            <Team />
          </Suspense>
        </div>
      </AuroraBackground>
    </>
  );
} 