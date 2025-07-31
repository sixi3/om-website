'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load heavy components with error handling
const AnimatedFOIRChartCard = dynamic(
  () => import('@/app/equal/components/AnimatedFOIRChartCard').then(mod => ({ default: mod.AnimatedFOIRChartCard })),
  { 
    loading: () => <div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />,
    ssr: true
  }
);

const AnimatedExpensePieChartCard = dynamic(
  () => import('@/app/equal/components/AnimatedExpensePieChartCard').then(mod => ({ default: mod.AnimatedExpensePieChartCard })),
  { 
    loading: () => <div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />,
    ssr: true
  }
);

const AnimatedEODBarChartCard = dynamic(
  () => import('@/app/equal/components/AnimatedEODBarChartCard').then(mod => ({ default: mod.AnimatedEODBarChartCard })),
  { 
    loading: () => <div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />,
    ssr: true
  }
);

// Lazy load Marquee component
const Marquee = dynamic(() => import('react-fast-marquee'));

// FOIR-related features for the marquee
const foirFeaturesPillTexts = [
  "Bank Statements", 
  "Income Analysis", 
  "Expense Tracking", 
  "Debt-to-Income Ratio", 
  "Credit Assessment", 
  "Loan Eligibility", 
  "Financial Health Score",
  "Risk Assessment",
  "Compliance Monitoring",
  "Audit Trails",
  "Real-time Analytics",
  "Regulatory Reporting",
  "Data Security",
  "Consent Management",
  "API Integration"
];

// Define content for the clickable cards
const foirCardsData = [
  {
    id: 'foir',
    title: 'FOIR Percentage',
    description: 'Monitor Fixed Obligation to Income Ratio with real-time insights and comprehensive financial data analysis.',
    duration: 8,
  },
  {
    id: 'eod',
    title: 'Average EOD Balance',
    description: 'Track end-of-day balance patterns to understand cash flow trends and financial stability indicators.',
    duration: 6,
  },
  {
    id: 'expense',
    title: 'Expense Summary',
    description: 'Analyze spending patterns and categorize expenses to identify optimization opportunities.',
    duration: 10,
  },
];

// Simplified animations for lower-powered devices
const cardSlideVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "50%" : "-50%",
    opacity: 0,
  }),
  animate: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "50%" : "-50%",
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  }),
};

// Performance monitoring hook
const usePerformanceMode = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleReducedMotionChange);

    // Check device performance capabilities
    const checkPerformance = () => {
      const connection = (navigator as any).connection;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // Determine if device is low performance - more conservative approach
      const isLowPerf = (
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g' ||
        hardwareConcurrency <= 1 ||
        memory > 200 * 1024 * 1024 // 200MB threshold - much higher
      );
      
      setIsLowPerformance(isLowPerf);
    };

    checkPerformance();

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return { isLowPerformance, isReducedMotion };
};

export function FOIRSection() {
  const [activeCardId, setActiveCardId] = useState(foirCardsData[0].id);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressResetKey, setProgressResetKey] = useState(0);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isMarqueeVisible, setIsMarqueeVisible] = useState(false);

  const { isLowPerformance, isReducedMotion } = usePerformanceMode();

  // Memoize expensive computations
  const activeCardData = useMemo(() => 
    foirCardsData.find(card => card.id === activeCardId), 
    [activeCardId]
  );

  // Only disable animations for very low performance devices, but always render charts
  const shouldDisableAnimations = (isLowPerformance && isReducedMotion) || isReducedMotion;
  


  // Debounce function for performance
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    
    const debouncedResize = debounce(checkScreenSize, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, [debounce]);

  useEffect(() => {
    // Delay setting hasBeenInView to reduce initial load
    const timer = setTimeout(() => setHasBeenInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = useCallback((cardId: string, direction = 1) => {
    const currentIdx = foirCardsData.findIndex(c => c.id === activeCardId);
    const nextIdx = foirCardsData.findIndex(c => c.id === cardId);
    setSlideDirection(nextIdx > currentIdx ? 1 : -1);

    setActiveCardId(cardId);
    setProgressResetKey(prev => prev + 1);
  }, [activeCardId]);

  useEffect(() => {
    if (!hasBeenInView || shouldDisableAnimations) {
      return;
    }

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    const currentCardIndex = foirCardsData.findIndex(card => card.id === activeCardId);
    const currentCard = foirCardsData[currentCardIndex];

    if (currentCard) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        const nextIndex = (currentCardIndex + 1) % foirCardsData.length;
        handleCardClick(foirCardsData[nextIndex].id, 1);
      }, currentCard.duration * 1000);
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [activeCardId, progressResetKey, hasBeenInView, isSmallScreen, shouldDisableAnimations, handleCardClick]);

  const handlePrevCard = useCallback(() => {
    const currentIndex = foirCardsData.findIndex(card => card.id === activeCardId);
    const prevIndex = currentIndex === 0 ? foirCardsData.length - 1 : currentIndex - 1;
    setSlideDirection(-1);
    handleCardClick(foirCardsData[prevIndex].id, -1);
  }, [activeCardId, handleCardClick]);

  const handleNextCard = useCallback(() => {
    const currentIndex = foirCardsData.findIndex(card => card.id === activeCardId);
    const nextIndex = (currentIndex + 1) % foirCardsData.length;
    setSlideDirection(1);
    handleCardClick(foirCardsData[nextIndex].id, 1);
  }, [activeCardId, handleCardClick]);

  // Intersection Observer for marquee
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLowPerformance) {
          setIsMarqueeVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const marqueeElement = document.querySelector('[data-marquee-trigger]');
    if (marqueeElement) {
      observer.observe(marqueeElement);
    }

    return () => observer.disconnect();
  }, [isLowPerformance]);

  return (
    <>
      <motion.section 
        className="relative w-full overflow-hidden"
        initial={shouldDisableAnimations ? undefined : { opacity: 0, y: 50 }}
        whileInView={shouldDisableAnimations ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: shouldDisableAnimations ? 0 : 0.5, ease: "easeInOut" }}
      >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              Complete
            </span>{" "}
            <span className="font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900">
              Financial Analytics Suite
            </span>
          </h2>
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
            Comprehensive financial data analysis with real-time insights and monitoring capabilities.
          </p>
        </div>

        {/* Interactive Showcase */}
        <motion.div 
          className={cn(
            "flex gap-8 p-4 pb-0 min-h-[500px]",
            isSmallScreen ? "flex-col" : "flex-col md:flex-row"
          )}
          initial={shouldDisableAnimations ? undefined : { opacity: 0 }} 
          animate={shouldDisableAnimations ? undefined : { opacity: 1 }} 
          transition={{ duration: shouldDisableAnimations ? 0 : 0.3 }}
        >
          {/* Left Panel: Clickable Cards */}
          <div className={cn("space-y-4", isSmallScreen ? "w-full" : "w-full md:w-1/2")}>
            {isSmallScreen ? (
              <div className="relative">
                <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                  {activeCardData && (
                    <motion.div
                      key={activeCardData.id}
                      custom={slideDirection}
                      variants={shouldDisableAnimations ? {} : cardSlideVariants}
                      initial={shouldDisableAnimations ? undefined : "initial"}
                      animate={shouldDisableAnimations ? undefined : "animate"}
                      exit={shouldDisableAnimations ? undefined : "exit"}
                      className={'p-6 rounded-lg border bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600'}
                    >
                      <h3 className={'text-xl font-semibold mb-3 flex items-center text-slate-800 dark:text-green-400'}>
                        {!shouldDisableAnimations && (
                          <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                          </span>
                        )}
                        {activeCardData.title}
                      </h3>
                      <p className={'text-sm mb-4 text-slate-700 dark:text-neutral-300'}>
                        {activeCardData.description}
                      </p>
                      {!shouldDisableAnimations && (
                        <div 
                          className={'mt-auto h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-neutral-700'}
                        >
                          <motion.div
                            key={`progress-${activeCardData.id}-${progressResetKey}`}
                            className="h-full bg-green-500"
                            initial={{ width: "0%" }}
                            animate={hasBeenInView ? { width: "100%" } : { width: "0%" }}
                            transition={{ duration: hasBeenInView ? activeCardData.duration : 0, ease: "linear" }}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pagination with navigation for small screens */}
                <div className="flex items-center justify-center mt-6 gap-2">
                  <button 
                    onClick={handlePrevCard}
                    className="p-1 rounded-full bg-slate-100 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors"
                    aria-label="Previous card"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-neutral-200" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    {foirCardsData.map((card, index) => (
                      <button
                        key={`dot-${card.id}`}
                        onClick={() => {
                          const currentIndex = foirCardsData.findIndex(c => c.id === activeCardId);
                          setSlideDirection(index > currentIndex ? 1 : -1);
                          handleCardClick(card.id);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          activeCardId === card.id 
                            ? 'bg-green-500 scale-150' 
                            : 'bg-slate-300 dark:bg-neutral-600 hover:bg-slate-400 dark:hover:bg-neutral-500'
                        }`}
                        aria-label={`Go to ${card.title}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleNextCard}
                    className="p-1 rounded-full bg-slate-100 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors"
                    aria-label="Next card"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700 dark:text-neutral-200" />
                  </button>
                </div>
              </div>
            ) : (
              // Desktop: Stacked View
              foirCardsData.map((card, index) => {
                const isActive = activeCardId === card.id;
                return (
                  <motion.div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out 
                    ${ isActive 
                      ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600 scale-105' 
                      : ' dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:bg-slate-100 hover:border-slate-300 dark:hover:border-neutral-600'
                    }`}
                    initial={shouldDisableAnimations ? undefined : { opacity: 0, y: 20 }}
                    animate={shouldDisableAnimations ? undefined : { opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.1} }}
                  >
                    <h3 className={`text-xl font-semibold mb-3 flex items-center ${isActive ? 'text-slate-800 dark:text-green-400' : 'text-slate-400 dark:text-neutral-200'}`}>
                      {isActive && !shouldDisableAnimations && (
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                      )}
                      {card.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isActive ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-500 dark:text-neutral-400'}`}>
                      {card.description}
                    </p>
                    {!shouldDisableAnimations && (
                      <div 
                        className={`mt-auto h-2 rounded-full overflow-hidden transition-colors duration-300 ease-in-out ${
                          isActive ? 'bg-slate-200 dark:bg-neutral-700' : 'bg-transparent'
                        }`}
                      >
                        <motion.div
                          key={`progress-${card.id}-${progressResetKey}`}
                          className="h-full bg-green-500"
                          initial={{ width: "0%" }}
                          animate={isActive && hasBeenInView ? { width: "100%" } : { width: "0%" }}
                          transition={{ duration: isActive && hasBeenInView ? card.duration : 0, ease: "linear" }}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Right Panel: Chart Display Area */}
          <div className={cn("relative", isSmallScreen ? "w-full min-h-[600px]" : "w-full md:w-2/3 min-h-[600px]")}>
            <Suspense fallback={<div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />}>
              <AnimatePresence mode="wait">
                {activeCardId === 'foir' && (
                  <motion.div
                    key="foir"
                    initial={shouldDisableAnimations ? undefined : { opacity: 0, x: 20 }}
                    animate={shouldDisableAnimations ? undefined : { opacity: 1, x: 0 }}
                    exit={shouldDisableAnimations ? undefined : { opacity: 0, x: -20 }}
                    transition={{ duration: shouldDisableAnimations ? 0 : 0.4, ease: 'easeInOut' }}
                  >
                    <Suspense fallback={<div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />}>
                      <AnimatedFOIRChartCard 
                        onAnimationComplete={() => console.log('FOIR chart animation complete')}
                        disableAutoRotate={shouldDisableAnimations}
                      />
                    </Suspense>
                  </motion.div>
                )}
                {activeCardId === 'eod' && (
                  <motion.div
                    key="eod"
                    initial={shouldDisableAnimations ? undefined : { opacity: 0, x: 20 }}
                    animate={shouldDisableAnimations ? undefined : { opacity: 1, x: 0 }}
                    exit={shouldDisableAnimations ? undefined : { opacity: 0, x: -20 }}
                    transition={{ duration: shouldDisableAnimations ? 0 : 0.4, ease: 'easeInOut' }}
                  >
                    <Suspense fallback={<div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />}>
                      <AnimatedEODBarChartCard 
                        onAnimationComplete={() => console.log('EOD chart animation complete')}
                        disableAutoRotate={shouldDisableAnimations}
                      />
                    </Suspense>
                  </motion.div>
                )}
                {activeCardId === 'expense' && (
                  <motion.div
                    key="expense"
                    initial={shouldDisableAnimations ? undefined : { opacity: 0, x: 20 }}
                    animate={shouldDisableAnimations ? undefined : { opacity: 1, x: 0 }}
                    exit={shouldDisableAnimations ? undefined : { opacity: 0, x: -20 }}
                    transition={{ duration: shouldDisableAnimations ? 0 : 0.4, ease: 'easeInOut' }}
                  >
                    <Suspense fallback={<div className="w-full h-[400px] bg-slate-100 dark:bg-neutral-800 rounded-lg animate-pulse" />}>
                      <AnimatedExpensePieChartCard 
                        onAnimationComplete={() => console.log('Expense chart animation complete')}
                        disableAutoRotate={shouldDisableAnimations}
                      />
                    </Suspense>
                  </motion.div>
                )}
              </AnimatePresence>
            </Suspense>
          </div>
        </motion.div>

        {/* AND MANY MORE Text */}
        <motion.div 
          className="text-center mt-8 mb-6"
          initial={shouldDisableAnimations ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldDisableAnimations ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldDisableAnimations ? 0 : 0.5, delay: 0.3 }}
          data-marquee-trigger
        >
          <h3 className="text-md font-light text-slate-600 dark:text-slate-200">
            AND MANY MORE
          </h3>
        </motion.div>

      </div>
    </motion.section>

    {/* Marquee Banner - Placed OUTSIDE the section for full width */}
    {isMarqueeVisible && !isLowPerformance && (
      <div className="w-full py-4">
        <Marquee gradient={false} speed={30} pauseOnHover={true} direction="left">
          {foirFeaturesPillTexts.map((text, index) => (
            <div
              key={`foir-pill-${index}`}
              className="inline-block bg-background/10 backdrop-blur-md rounded-sm border border-slate-200 dark:border-neutral-700 mr-3 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {text}
            </div>
          ))}
        </Marquee>
      </div>
    )}
    </>
  );
} 