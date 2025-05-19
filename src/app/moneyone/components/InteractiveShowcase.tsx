'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineGraphCard } from './AnimatedLineGraphCard'; // Import the actual LineGraphCard
import { AnimatedPieChartCard } from './AnimatedPieChartCard'; // Import the actual AnimatedPieChartCard
import { AnimatedBarChartCard } from './AnimatedBarChartCard'; // Import the new Bar Chart

// Placeholder for Sankey chart remains for now
// const AnimatedPieChartCard = ... // Placeholder removed

const AnimatedSankeyChartCard = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => (
  <motion.div
    key="sankey"
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.5 }}
    className="w-full h-96 bg-yellow-200/70 dark:bg-yellow-900/70 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center"
  >
    <h2 className="text-xl font-semibold mb-4">Animated Sankey Chart Card (Placeholder)</h2>
    <button 
      onClick={onAnimationComplete} 
      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
    >
      Finish Sankey Chart Animation
    </button>
  </motion.div>
);

// Define the order and components
const components = [
  // { 
  //   id: 'line', 
  //   Component: LineGraphCard, 
  //   props: { disableAutoRotate: true } 
  // }, // Temporarily hide LineGraphCard for styling Bar Chart
  // { 
  //   id: 'pie', 
  //   Component: AnimatedPieChartCard,
  //   props: {} 
  // }, // Temporarily hide PieChartCard for styling Bar Chart
  { 
    id: 'bar', 
    Component: AnimatedBarChartCard, // Focus on Bar Chart
    props: {} 
  },
  // { id: 'sankey', Component: AnimatedSankeyChartCard, props: {} }, // Temporarily hide SankeyChartCard
];

export const InteractiveShowcase = () => {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0); // Start with Bar Chart for styling

  const handleAnimationComplete = () => {
    console.log(`DEV MODE: Animation completed for: ${components[currentComponentIndex].id}, but not transitioning.`); // For debugging
    // setCurrentComponentIndex((prevIndex) => {
    //   const nextIndex = prevIndex + 1;
    //   return nextIndex >= components.length ? 0 : nextIndex; 
    // }); // Temporarily disable transition for styling Bar Chart
  };

  const { Component, id, props } = components[currentComponentIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 relative">
      {/* Optional: Add a title or description for the showcase here */}
      {/* <h2 className="text-2xl font-bold text-center mb-6">Interactive Showcase</h2> */}
      <AnimatePresence mode="wait">
        <Component
          key={id} // Use the id from the components array as key
          onAnimationComplete={handleAnimationComplete}
          {...props} // Spread any additional props for the component
        />
      </AnimatePresence>
      
      {/* Manual controls for testing - can be removed later */}
      <div className="mt-8 flex justify-center space-x-2">
        <button 
          onClick={() => setCurrentComponentIndex(prev => (prev - 1 + components.length) % components.length)}
          className="px-3 py-1 bg-slate-200 dark:bg-neutral-700 rounded text-sm"
        >
          Previous
        </button>
        <button 
          onClick={handleAnimationComplete} // Manually trigger next for testing
          className="px-3 py-1 bg-slate-200 dark:bg-neutral-700 rounded text-sm"
        >
          Next (Manual)
        </button>
      </div>
      <div className="mt-2 text-center text-xs text-slate-500 dark:text-neutral-400">
        Showing: {id.toUpperCase()}
      </div>
    </div>
  );
};

export default InteractiveShowcase; 