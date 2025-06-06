'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ClayPhoneMockup } from '@/app/onemoney/components/ui/ClayPhoneMockup';
import { AnimatedScreenContent } from '@/app/onemoney/components/AnimatedScreenContent';
import { PhoneSlideshowAnimation } from './PhoneSlideshowAnimation';

// Define content for the clickable cards
const showcaseCardsData = [
  {
    id: 'line',
    title: 'Plug-n-Play UI',
    description: 'Leverage our exclusive UI, crafted through extensive research and testing to meet all your business needs. Customise our UI with your brand\'s colours, fonts, and logos to go live faster.',
    duration: 12, // Example duration in seconds
  },
  {
    id: 'pie',
    title: 'Custom UI',
    description: 'Create fully custom user journeys tailored to your exact needs from scratch. Offload the tedious UI/UX building process to our experts for screens that seamlessly match your brand for a unified user experience.',
    duration: 8, // Example duration in seconds
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

export const CustomisableUIShowcase = () => {
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

  const handlePrevCard = () => {
    const currentIndex = showcaseCardsData.findIndex(card => card.id === activeCardId);
    const prevIndex = currentIndex === 0 ? showcaseCardsData.length - 1 : currentIndex - 1;
    setSlideDirection(-1);
    handleCardClick(showcaseCardsData[prevIndex].id, -1);
  };

  const handleNextCard = () => {
    const currentIndex = showcaseCardsData.findIndex(card => card.id === activeCardId);
    const nextIndex = (currentIndex + 1) % showcaseCardsData.length;
    setSlideDirection(1);
    handleCardClick(showcaseCardsData[nextIndex].id, 1);
  };

  return (
    <motion.div 
      className={cn(
        "flex gap-8 p-4 min-h-[500px]",
        isSmallScreen ? "flex-col" : "flex-col md:flex-row" // Ensure flex-col on small, allow md:flex-row
      )}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
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
                  variants={cardSlideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={'p-6 rounded-lg border bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600'}
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
                {showcaseCardsData.map((card, index) => (
                  <button
                    key={`dot-${card.id}`}
                    onClick={() => {
                      const currentIndex = showcaseCardsData.findIndex(c => c.id === activeCardId);
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
      <div className={cn("relative flex justify-center items-center", isSmallScreen ? "w-full h-[650px] overflow-hidden" : "w-full md:w-2/3 min-h-[650px]")}>
        <AnimatePresence mode="wait">
          {activeCardId === 'line' && (
            <motion.div
              key="line"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full h-full flex justify-center items-center"
            >
              <ClayPhoneMockup className="h-[650px] w-[310px]">
                <AnimatedScreenContent />
              </ClayPhoneMockup>
            </motion.div>
          )}
          {activeCardId === 'pie' && (
            <motion.div
              key="pie"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
               className="w-full h-full flex justify-center items-center"
            >
              <PhoneSlideshowAnimation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CustomisableUIShowcase; 