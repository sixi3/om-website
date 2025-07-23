"use client";

import React, { Suspense, useEffect, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';
import { MainHeader } from "@/components/global/MainHeader";
import { HeroSection } from "./aurora-background-demo/components/HeroSection";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { BackgroundGrid } from "@/components/ui/background-grid";
import Image from "next/image";

// Enhanced lazy loading with better loading strategies
const ModularSolutions = dynamic(() => 
  import("./aurora-background-demo/components/ModularSolutions").then(mod => ({ default: mod.ModularSolutions })), {
  loading: () => <ModularSolutionsLoader />,
  ssr: false
});

const SolutionsSection = dynamic(() => 
  import("./aurora-background-demo/components/SolutionsSection").then(mod => ({ default: mod.SolutionsSection })), {
  loading: () => <SolutionsSectionLoader />,
  ssr: false
});

const BoardOfDirectors = dynamic(() => 
  import("./aurora-background-demo/components/BoardOfDirectors").then(mod => ({ default: mod.BoardOfDirectors })), {
  loading: () => <BoardLoader />,
  ssr: false
});

const IndustrySection = dynamic(() => 
  import("./aurora-background-demo/components/industries").then(mod => ({ default: mod.IndustrySection })), {
  loading: () => <IndustrySectionLoader />,
  ssr: false
});

const Team = dynamic(() => 
  import("./aurora-background-demo/components/Team").then(mod => ({ default: mod.Team })), {
  loading: () => <TeamLoader />,
  ssr: false
});

// Global Page Loader Component
const PageLoader = React.memo(() => {
  return (
    <div className="fixed inset-0 z-50 bg-[#F3FFEA] to-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Equal Logo with smooth pulsating animation */}
        <div className="relative">
          <Image
            src="/equal-logo.svg"
            alt="Equal"
            width={142}
            height={42}
            priority
            className="animate-pulse"
            style={{
              animation: 'smooth-pulse 1s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Loading text */}
        <p className="text-lg text-slate-500 font-medium text-center">
          Meet India's Largest Data Sharing Platform
        </p>
      </div>
      
      {/* Custom CSS for smooth pulsating animation */}
      <style jsx>{`
        @keyframes smooth-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
});

PageLoader.displayName = 'PageLoader';

// Content Loading Manager Hook
const useContentLoadingState = () => {
  const [isContentReady, setIsContentReady] = useState(false);
  const [criticalResourcesLoaded, setCriticalResourcesLoaded] = useState(false);
  const [componentsReady, setComponentsReady] = useState(false);

  // Track critical resources
  useEffect(() => {
    const criticalImages = [
      '/client-logos/Frame 5.png',
      '/client-logos/Frame 6.png',
      '/client-logos/Frame 7.png',
      '/client-logos/Frame 8.png',
      '/Aggregator of Aggregators.png'
    ];

    let loadedCount = 0;
    const totalResources = criticalImages.length;

    const checkResourceLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalResources) {
        setCriticalResourcesLoaded(true);
      }
    };

    // Preload critical images
    criticalImages.forEach(src => {
      const img = new window.Image();
      img.onload = checkResourceLoaded;
      img.onerror = checkResourceLoaded; // Count errors as "loaded" to not block forever
      img.src = src;
    });

    // Fallback timer - don't wait forever
    const fallbackTimer = setTimeout(() => {
      setCriticalResourcesLoaded(true);
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Track component readiness
  useEffect(() => {
    // Wait for next tick to ensure all components are mounted
    const timer = setTimeout(() => {
      setComponentsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Determine overall content readiness
  useEffect(() => {
    if (criticalResourcesLoaded && componentsReady) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setIsContentReady(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [criticalResourcesLoaded, componentsReady]);

  return isContentReady;
};

// Enhanced Performance Monitor with more optimizations
const PerformanceMonitor = React.memo(() => {
  const prefetchCriticalResources = useCallback(() => {
    const criticalImages = [
      '/client-logos/Frame 5.png',
      '/client-logos/Frame 6.png',
      '/client-logos/Frame 7.png',
      '/client-logos/Frame 8.png',
      '/Aggregator of Aggregators.png',
      '/main-landing-1.mp4'
    ];
    
    // Use requestIdleCallback for non-critical prefetching
    const prefetchBatch = (images: string[], batchSize = 2) => {
      for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);
        
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            batch.forEach(src => {
              if (src.endsWith('.mp4')) {
                // Prefetch video differently
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.src = src;
              } else {
                // Prefetch images
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = src;
                link.as = 'image';
                document.head.appendChild(link);
              }
            });
          }, { timeout: 2000 });
        }
      }
    };

    prefetchBatch(criticalImages);
  }, []);

  const optimizePerformance = useCallback(() => {
    // Reduce main thread work
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      (window as any).scheduler.postTask(() => {
        prefetchCriticalResources();
      }, { priority: 'background' });
    } else {
      setTimeout(prefetchCriticalResources, 100);
    }

    // Memory management
    const memoryOptimization = () => {
      // Suggest garbage collection if available (Chrome DevTools)
      if ('gc' in window && process.env.NODE_ENV === 'development') {
        setTimeout(() => (window as any).gc(), 5000);
      }
    };

    memoryOptimization();
  }, [prefetchCriticalResources]);

  useEffect(() => {
    optimizePerformance();

    // Web Vitals monitoring (production only)
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        const reportMetric = (metric: any) => {
          // Only log significant issues
          if (metric.value > metric.threshold) {
            console.warn(`Performance Issue - ${metric.name}:`, metric.value);
          }
        };

        onCLS(reportMetric);
        onINP(reportMetric);
        onFCP(reportMetric);
        onLCP(reportMetric);
        onTTFB(reportMetric);
      }).catch(() => {
        // Fail silently
      });
    }

    // Cleanup any performance observers on unmount
    return () => {
      // Clean up any lingering performance observers
      if ('PerformanceObserver' in window) {
        try {
          PerformanceObserver.supportedEntryTypes.forEach(type => {
            const observer = new PerformanceObserver(() => {});
            observer.disconnect();
          });
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [optimizePerformance]);

  return null;
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

// Optimized loading skeletons with better visual hierarchy
const ModularSolutionsLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="text-center space-y-6 mb-16">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-64 mx-auto"></div>
          <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-96 mx-auto"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-80 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-48"></div>
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-64"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded"></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gradient-to-r from-slate-200 to-slate-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
));

ModularSolutionsLoader.displayName = 'ModularSolutionsLoader';

const BoardLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="text-center space-y-6 mb-16">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-64 mx-auto"></div>
          <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-96 mx-auto"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-80 mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full"></div>
              <div className="space-y-2 text-center">
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 mx-auto"></div>
                <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20 mx-auto"></div>
                <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-28 mx-auto"></div>
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
  <div className="relative w-full py-12 px-8">
    <div className="animate-pulse">
      <div className="mx-auto max-w-6xl text-center flex flex-col items-center mb-8">
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-48 mb-4"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-96 mb-4"></div>
        <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-80 mb-8"></div>
        <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-32"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
));

IndustrySectionLoader.displayName = 'IndustrySectionLoader';

const TeamLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4">
    <div className="animate-pulse">
      <div className="max-w-7xl mx-auto text-center space-y-6 mb-8">
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-48 mx-auto"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-96 mx-auto"></div>
        <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-80 mx-auto"></div>
      </div>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80 h-96 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
));

TeamLoader.displayName = 'TeamLoader';

const SolutionsSectionLoader = React.memo(() => (
  <div className="relative w-full py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="text-center space-y-6 mb-16">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-64 mx-auto"></div>
          <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-96 mx-auto"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-80 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2 h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
          <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
          <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
          <div className="md:col-span-2 h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
));

SolutionsSectionLoader.displayName = 'SolutionsSectionLoader';

// Enhanced Section Wrapper with Intersection Observer
interface SectionWrapperProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  className?: string;
  rootMargin?: string;
}

const SectionWrapper = React.memo<SectionWrapperProps>(({ 
  children, 
  fallback, 
  className = "",
  rootMargin = "100px"
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, stop observing
        }
      },
      {
        rootMargin,
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

// Memoized Divider component
const MemoizedGlowingDivider = React.memo(GlowingDivider);

export default function AuroraBackgroundDemo() {
  const isContentReady = useContentLoadingState();

  // Memoize static props
  const glowingDividerProps = useMemo(() => ({
    width: "3/4" as const,
    intensity: "high" as const,
    className: "my-8 md:my-16"
  }), []);

  // Memoize background grid props
  const backgroundGridProps = useMemo(() => ({
    zIndex: 1
  }), []);

  // Show loader until content is ready
  if (!isContentReady) {
    return <PageLoader />;
  }

  return (
    <>
      <PerformanceMonitor />
      <MainHeader />
      <AuroraBackground className="min-h-full overflow-x-hidden">
        <BackgroundGrid {...backgroundGridProps} />
        <div 
          className="relative flex flex-col min-h-screen w-full z-5 overflow-x-hidden"
          style={{ 
            contain: 'layout style',
            willChange: 'auto' // More conservative than 'transform'
          }}
        >
          {/* Critical above-the-fold content */}
          <HeroSection />
          
          <MemoizedGlowingDivider 
            {...glowingDividerProps}
            delay={0.2}
          />
          
          {/* Enhanced lazy loading with intersection observer */}
          <SectionWrapper 
            fallback={<ModularSolutionsLoader />}
            rootMargin="200px"
          >
            <Suspense fallback={<ModularSolutionsLoader />}>
              <ModularSolutions />
            </Suspense>
          </SectionWrapper>
          
          <MemoizedGlowingDivider 
            {...glowingDividerProps}
            delay={0.3}
          />
          
          <SectionWrapper 
            fallback={<SolutionsSectionLoader />}
            rootMargin="150px"
          >
            <Suspense fallback={<SolutionsSectionLoader />}>
              <SolutionsSection />
            </Suspense>
          </SectionWrapper>
          
          <SectionWrapper 
            fallback={<BoardLoader />}
            rootMargin="150px"
          >
            <Suspense fallback={<BoardLoader />}>
              <BoardOfDirectors />
            </Suspense>
          </SectionWrapper>
          
          <MemoizedGlowingDivider 
            {...glowingDividerProps}
            delay={0.4}
          />
          
          <SectionWrapper 
            fallback={<IndustrySectionLoader />}
            rootMargin="150px"
          >
            <Suspense fallback={<IndustrySectionLoader />}>
              <IndustrySection />
            </Suspense>
          </SectionWrapper>
          
          <MemoizedGlowingDivider 
            {...glowingDividerProps}
            delay={0.4}
          />
          
          <SectionWrapper 
            fallback={<TeamLoader />}
            rootMargin="100px"
          >
            <Suspense fallback={<TeamLoader />}>
              <Team />
            </Suspense>
          </SectionWrapper>
        </div>
      </AuroraBackground>
    </>
  );
} 