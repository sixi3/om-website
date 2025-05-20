'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { LineGraphCard } from './AnimatedLineGraphCard';
import { AnimatedPieChartCard } from './AnimatedPieChartCard';
import { AnimatedBarChartCard } from './AnimatedBarChartCard';
import { cn } from '@/lib/utils';

// Define content for the clickable cards
const showcaseCardsData = [
  {
    id: 'line',
    title: 'Understand Consent Trends',
    description: 'Track consent trends to measure operational efficiency and user conversion. Spot anomalies and optimise workflows for better data availability.',
    duration: 12, // Example duration in seconds
  },
  {
    id: 'pie',
    title: 'Understand Consent Distribution',
    description: 'Monitor consent health in real-time to ensure steady data inflow. Identify delays and improve user conversion through proactive actions.',
    duration: 8, // Example duration in seconds
  },
  {
    id: 'bar',
    title: 'Understand FIP Performance',
    description: 'Analyse FIP efficiency in fulfilling data requests. Make informed decisions on prioritisation and reduce data retrieval failures.',
    duration: 6, // Example duration in seconds
  },
];

const cardSlideVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  }),
};

export const InteractiveShowcase = () => {
  const [activeCardId, setActiveCardId] = useState(showcaseCardsData[0].id);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressResetKey, setProgressResetKey] = useState(0);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1); // 1 for next, -1 for prev (if needed)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setHasBeenInView(true); 
  }, []);

  const handleCardClick = (cardId: string, direction = 1) => {
    const currentIdx = showcaseCardsData.findIndex(c => c.id === activeCardId);
    const nextIdx = showcaseCardsData.findIndex(c => c.id === cardId);
    setSlideDirection(nextIdx > currentIdx ? 1 : -1); // Basic direction, assumes sequential or direct click

    setActiveCardId(cardId);
    setProgressResetKey(prev => prev + 1);
  };

  useEffect(() => {
    if (!hasBeenInView || isSmallScreen) { // Auto-advance only on desktop for now, or adjust if needed
      // For mobile, auto-advance will trigger the slide.
    }

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    const currentCardIndex = showcaseCardsData.findIndex(card => card.id === activeCardId);
    const currentCard = showcaseCardsData[currentCardIndex];

    if (currentCard) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        const nextIndex = (currentCardIndex + 1) % showcaseCardsData.length;
        handleCardClick(showcaseCardsData[nextIndex].id, 1); // Explicitly set direction for auto-advance
      }, currentCard.duration * 1000);
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [activeCardId, progressResetKey, hasBeenInView, isSmallScreen]);

  const activeCardData = showcaseCardsData.find(card => card.id === activeCardId);

  return (
    <motion.div 
      className={cn(
        "flex gap-8 p-4 md:p-8 min-h-[700px]",
        isSmallScreen ? "flex-col" : "flex-col md:flex-row" // Ensure flex-col on small, allow md:flex-row
      )}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
    >
      {/* Left Panel: Clickable Cards */}
      <div className={cn("space-y-4", isSmallScreen ? "w-full" : "w-full md:w-1/2")}>
        {isSmallScreen ? (
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            {activeCardData && (
              <motion.div
                key={activeCardData.id}
                custom={slideDirection}
                variants={cardSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={'p-6 rounded-lg border bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600'}
                // onClick={() => { /* For mobile, clicks might be disabled or cycle */ }}
              >
                <h3 className={'text-xl font-semibold mb-3 flex items-center text-slate-800 dark:text-green-400'}>
                  <span className="relative flex h-2.5 w-2.5 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  {activeCardData.title}
                </h3>
                <p className={'text-sm mb-4 text-slate-700 dark:text-neutral-300'}>
                  {activeCardData.description}
                </p>
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
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          // Desktop: Stacked View
          showcaseCardsData.map((card, index) => {
            const isActive = activeCardId === card.id;
            return (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out 
                ${ isActive 
                  ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600 scale-105' 
                  : ' dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:ng-background/10 hover:border-slate-300 dark:hover:border-neutral-600' // Corrected hover:ng-background to something valid like hover:bg-slate-100
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.1} }}
              >
                <h3 className={`text-xl font-semibold mb-3 flex items-center ${isActive ? 'text-slate-800 dark:text-green-400' : 'text-slate-400 dark:text-neutral-200'}`}>
                  {isActive && (
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
              </motion.div>
            );
          })
        )}
      </div>

      {/* Right Panel: Chart Display Area */}
      <div className={cn("relative", isSmallScreen ? "w-full h-[500px] overflow-hidden" : "w-full md:w-2/3 min-h-[600px]")}> {/* Changed to fixed height + overflow-hidden on mobile */}
        <AnimatePresence mode="wait">
          {activeCardId === 'line' && (
            <motion.div
              key="line"
              initial={{ opacity: 0, x: 20 }} // Adjusted for a softer entry
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <LineGraphCard disableAutoRotate={false} />
            </motion.div>
          )}
          {activeCardId === 'pie' && (
            <motion.div
              key="pie"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <AnimatedPieChartCard />
            </motion.div>
          )}
          {activeCardId === 'bar' && (
            <motion.div
              key="bar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <AnimatedBarChartCard disableAutoRotate={false}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InteractiveShowcase; 