'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineGraphCard } from './AnimatedLineGraphCard';
import { AnimatedPieChartCard } from './AnimatedPieChartCard';
import { AnimatedBarChartCard } from './AnimatedBarChartCard';

// Define content for the clickable cards
const showcaseCardsData = [
  {
    id: 'line',
    title: 'Understand Consent Trends',
    description: 'Track consent trends to measure operational efficiency and user conversion. Spot anomalies and optimise workflows for better data availability.',
  },
  {
    id: 'pie',
    title: 'Understand Consent Distribution',
    description: 'Monitor consent health in real-time to ensure steady data inflow. Identify delays and improve user conversion through proactive actions.',
  },
  {
    id: 'bar',
    title: 'Understand FIP Performance',
    description: 'Analyse FIP efficiency in fulfilling data requests. Make informed decisions on prioritisation and reduce data retrieval failures.',
  },
];

export const InteractiveShowcase = () => {
  const [activeCardId, setActiveCardId] = useState(showcaseCardsData[0].id);
  const [hasBeenInView, setHasBeenInView] = useState(false); // To start animations when in view

  // Placeholder for viewport enter, can be more robust with IntersectionObserver or Framer Motion's whileInView on parent
  useEffect(() => {
    setHasBeenInView(true); // Simplified for now, assume it's in view on mount for this component
  }, []);

  const handleCardClick = (cardId: string) => {
    setActiveCardId(cardId);
  };

  return (
    // Wrapping with motion.div for onViewportEnter if needed later, or use viewport on individual elements
    <motion.div 
      className="flex flex-col md:flex-row gap-8 p-4 md:p-8 min-h-[600px]"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
      // onViewportEnter={() => setHasBeenInView(true)} // More robust in-view detection
    >
      {/* Left Panel: Clickable Cards */}
      <div className="w-full md:w-1/2 space-y-4">
        {showcaseCardsData.map((card, index) => {
          const isActive = activeCardId === card.id;
          return (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out 
              ${ isActive 
                ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600 scale-105' 
                : ' dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:ng-background/10 hover:border-slate-300 dark:hover:border-neutral-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.1} }} // Staggered entrance slightly after main container
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
            </motion.div>
          );
        })}
      </div>

      {/* Right Panel: Chart Display Area */}
      <div className="w-full md:w-2/3 relative">
        <AnimatePresence mode="wait">
          {activeCardId === 'line' && (
            <motion.div
              key="line"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <LineGraphCard 
                // onAnimationComplete={handleAnimationComplete} // Will be re-evaluated for card control
                disableAutoRotate={false} // Allow internal cycling for now
              />
            </motion.div>
          )}
          {activeCardId === 'pie' && (
            <motion.div
              key="pie"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <AnimatedPieChartCard 
                // onAnimationComplete={handleAnimationComplete}
              />
            </motion.div>
          )}
          {activeCardId === 'bar' && (
            <motion.div
              key="bar"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <AnimatedBarChartCard 
                // onAnimationComplete={handleAnimationComplete}
                disableAutoRotate={false} // Allow internal cycling for now
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InteractiveShowcase; 