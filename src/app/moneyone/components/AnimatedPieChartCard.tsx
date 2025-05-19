'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion'; // Placeholder for the consent icon

interface AnimatedPieChartCardProps {
  onAnimationComplete?: () => void;
}

const newPieData = [
  { name: 'Approved', value: 500, color: '#22c55e' }, // Emerald 500 (Green)
  { name: 'Pending', value: 250, color: '#3b82f6' },  // Blue 500
  { name: 'Rejected', value: 200, color: '#ef4444' }, // Red 500
  { name: 'Expired', value: 50, color: '#f97316' },   // Orange 500
];

// Tab types and their labels (from AnimatedLineGraphCard)
const tabs = [
  { id: 'week', label: 'Last Week' },
  { id: 'month', label: 'Last Month' },
  { id: 'sixMonths', label: 'Last 6 Months' }
];

const getDonutSlicePath = (
  cx: number, 
  cy: number, 
  outerRadius: number, 
  innerRadius: number, 
  startAngle: number, 
  endAngle: number,
  paddingAngle: number
) => {
  const actualStartAngle = startAngle + paddingAngle / 2;
  const actualEndAngle = endAngle - paddingAngle / 2;

  const outerStart = polarToCartesian(cx, cy, outerRadius, actualEndAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, actualStartAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, actualEndAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, actualStartAngle);

  const largeArcFlagOuter = actualEndAngle - actualStartAngle <= 180 ? '0' : '1';
  // For the inner arc, if it's part of the same segment, the sweep direction is reversed relative to the path drawing direction.
  // However, since we draw OuterArc then InnerArc, it's simpler to keep largeArcFlag consistent if calculated on segment angle.
  const largeArcFlagInner = actualEndAngle - actualStartAngle <= 180 ? '0' : '1'; 

  const d = [
    'M', outerStart.x, outerStart.y,
    'A', outerRadius, outerRadius, 0, largeArcFlagOuter, 0, outerEnd.x, outerEnd.y,
    'L', innerEnd.x, innerEnd.y,
    'A', innerRadius, innerRadius, 0, largeArcFlagInner, 1, innerStart.x, innerStart.y,
    'Z'
  ].join(' ');
  return d;
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

const sliceVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.6 + i * 0.15,
    },
  }),
};

const centerLabelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 1.2, duration: 0.5, ease: 'easeOut' },
  },
};

const legendContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.5, // Start legend items after center label
      staggerChildren: 0.15,
    },
  },
};

const legendItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const AnimatedPieChartCard = ({ onAnimationComplete }: AnimatedPieChartCardProps) => {
  const controls = useAnimation();
  const [pieData, setPieData] = useState(newPieData);
  const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);
  const [activeTab, setActiveTab] = useState('week'); // Default tab

  const changeTab = (tabId: string) => {
    setActiveTab(tabId);
    // Add logic here if pie chart data should change based on tab
    // For now, it just changes the active tab visually.
  };

  useEffect(() => {
    const animateSequence = async () => {
      await controls.start('visible');
      if (onAnimationComplete) {
        const lastLegendItemAnimationEnd = 1.5 + (pieData.length -1) * 0.15 + 0.3;
        setTimeout(() => {
          onAnimationComplete();
          // console.log('AnimatedPieChartCard: onAnimationComplete would have been called here.');
        }, lastLegendItemAnimationEnd * 1000 + 200);
      }
    };
    animateSequence();
  }, [controls, onAnimationComplete, pieData.length]);

  const svgSize = 220; // Adjusted for a more compact look like the screenshot
  const outerRadius = svgSize / 2 - 10; // Outer radius of the donut
  const innerRadius = outerRadius * 0.6;  // Inner radius, making it a donut
  const paddingAngle = 2; // Degrees of padding between slices
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  let cumulativeAngle = 90;

  return (
    <motion.div
      className="bg-background/70 backdrop-blur-md dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Updated Header Section based on AnimatedLineGraphCard */}
      <div className="p-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <motion.h3
            custom={0}
            variants={headerItemVariants}
            className="text-lg font-medium text-slate-800 dark:text-neutral-200"
          >
            Consent Distribution
          </motion.h3>
          <div className="flex">
            <div className="flex space-x-1 bg-slate-400/10 backdrop-blur-md dark:bg-neutral-800 rounded-full p-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-neutral-700 text-green-600 dark:text-green-400 shadow-sm"
                      : "text-slate-600 dark:text-neutral-400 hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        custom={1}
        variants={headerItemVariants}
        className="px-4 pt-3 mb-4" // Added mb-4 for spacing, similar to LineGraphCard's structure
      >
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          Understand overall distribution of consents raised
        </p>
      </motion.div>

      {/* Donut Chart and Center Label - Ensure top margin is adjusted if needed */}
      <div className="relative flex justify-center items-center mb-6 px-4"> {/* Added px-4 for consistency if content inside needs padding */}
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} className="transform -rotate-90">
          <title>Overall Consents Distribution</title>
          {pieData.map((slice, index) => {
            const sliceAngle = (slice.value / totalValue) * 360;
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + sliceAngle;
            const pathData = getDonutSlicePath(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, paddingAngle);
            cumulativeAngle = endAngle;
            return (
              <motion.path
                key={slice.name}
                d={pathData}
                fill={slice.color}
                variants={sliceVariants}
                custom={index}
              />
            );
          })}
        </svg>
        <motion.div 
          className="absolute flex flex-col items-center justify-center text-center"
          variants={centerLabelVariants}
        >
          <span className="text-xs text-slate-500 dark:text-neutral-400">CONSENTS</span>
          <span className="text-xs text-slate-500 dark:text-neutral-400">RAISED</span>
          <span className="text-3xl font-bold text-slate-800 dark:text-neutral-200 mt-1">
            {totalValue.toLocaleString()}
          </span>
        </motion.div>
      </div>

      {/* Legend Section */}
      <motion.div 
        className="w-full grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 p-4 md:pl-10 pb-4" // Added px-4 and pb-4 for consistency
        variants={legendContainerVariants}
      >
        {pieData.map((slice, index) => (
          <motion.div 
            key={`legend-${slice.name}`}
            className="flex flex-col items-start"
            variants={legendItemVariants}
          >
            <div className="flex items-center mb-0.5">
              <span 
                className="w-2.5 h-2.5 rounded-xs mr-1.5 flex-shrink-0"
                style={{ backgroundColor: slice.color }}
              ></span>
              <span className="text-xs text-slate-600 dark:text-neutral-400">
                {slice.name}
              </span>
            </div>
            <span className="text-base font-bold text-slate-800 dark:text-neutral-200">
              {slice.value.toLocaleString()}
              <span className="text-xs font-normal text-slate-500 dark:text-neutral-500 ml-1">
                ({(slice.value / totalValue * 100).toFixed(0)}%)
              </span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPieChartCard; 