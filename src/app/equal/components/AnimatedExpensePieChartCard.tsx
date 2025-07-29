'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, Variants, Transition, TargetAndTransition } from 'framer-motion';

interface AnimatedExpensePieChartCardProps {
  onAnimationComplete?: () => void;
  disableAutoRotate?: boolean;
}

// Tab types and their labels
const tabs = [
  { id: 'incoming', label: 'Incoming' },
  { id: 'outgoing', label: 'Outgoing' },
];

const incomingData = [
  { name: 'Salary', value: 67000, color: '#166534' }, // Dark green
  { name: 'Investment', value: 22000, color: '#22c55e' }, // Medium green
  { name: 'Rental Income', value: 18000, color: '#4ade80' }, // Light green
  { name: 'Transfers', value: 10000, color: '#86efac' }, // Very light green
  { name: 'Refunds', value: 4000, color: '#bbf7d0' }, // Lightest green
];

const outgoingData = [
  { name: 'Rent', value: 25000, color: '#dc2626' }, // Red
  { name: 'Utilities', value: 15000, color: '#ea580c' }, // Orange
  { name: 'Groceries', value: 12000, color: '#d97706' }, // Amber
  { name: 'Transport', value: 8000, color: '#f59e0b' }, // Yellow
  { name: 'Entertainment', value: 5000, color: '#fbbf24' }, // Light yellow
];

const getChartDataForTab = (tabId: string) => {
  switch (tabId) {
    case 'incoming':
      return incomingData;
    case 'outgoing':
      return outgoingData;
    default:
      return incomingData;
  }
};

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
      delayChildren: 1.5,
      staggerChildren: 0.15,
    },
  },
};

const legendItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const notificationVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.8, duration: 0.4, ease: 'easeOut' },
  },
};

export const AnimatedExpensePieChartCard = ({ onAnimationComplete, disableAutoRotate = false }: AnimatedExpensePieChartCardProps) => {
  const cardControls = useAnimation();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [currentChartData, setCurrentChartData] = useState(() => getChartDataForTab(tabs[0].id));
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const totalValue = currentChartData.reduce((sum: number, item: any) => sum + item.value, 0);
  const highestValue = currentChartData.reduce((max: number, item: any) => item.value > max ? item.value : max, 0);
  const highestValueItem = currentChartData.find((item: any) => item.value === highestValue);

  const tabSwitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getAnimationDelay = (baseDelay: number) => {
    return animationCycle > 0 ? baseDelay * 0.5 : baseDelay; 
  };

  // Effect to update chart data when activeTab changes
  useEffect(() => {
    setCurrentChartData(getChartDataForTab(activeTab));
  }, [activeTab]);

  // Effect for auto-rotation and onAnimationComplete callback
  useEffect(() => {
    const lastLegendItemIndex = currentChartData.length - 1;
    const sliceAnimationEnd = getAnimationDelay(0.6 + lastLegendItemIndex * 0.15 + 0.5);
    const centerLabelAnimationEnd = getAnimationDelay(1.2 + 0.5);
    const legendAnimationEnd = getAnimationDelay(1.5 + lastLegendItemIndex * 0.15 + 0.3);
    const maxAnimationDuration = Math.max(sliceAnimationEnd, centerLabelAnimationEnd, legendAnimationEnd);

    const animateCardAndChart = async () => {
      await cardControls.start('visible');
      
      if (tabSwitchTimerRef.current) clearTimeout(tabSwitchTimerRef.current);
      if (onCompleteTimerRef.current) clearTimeout(onCompleteTimerRef.current);

      if (activeTab === 'incoming' && !disableAutoRotate) {
        tabSwitchTimerRef.current = setTimeout(() => {
          setActiveTab('outgoing');
          setCurrentChartData(getChartDataForTab('outgoing'));
          setAnimationCycle(prev => prev + 1);
        }, (maxAnimationDuration + 0.5) * 1000);
      } else if (activeTab === 'outgoing' && onAnimationComplete) {
        onCompleteTimerRef.current = setTimeout(() => {
          onAnimationComplete();
        }, (maxAnimationDuration + 0.2) * 1000);
      } else if (disableAutoRotate && onAnimationComplete) {
        onCompleteTimerRef.current = setTimeout(() => {
          onAnimationComplete();
        }, (maxAnimationDuration + 0.2) * 1000);
      }
    };

    animateCardAndChart();

    return () => {
      if (tabSwitchTimerRef.current) clearTimeout(tabSwitchTimerRef.current);
      if (onCompleteTimerRef.current) clearTimeout(onCompleteTimerRef.current);
    };
  }, [cardControls, activeTab, disableAutoRotate, onAnimationComplete, animationCycle, currentChartData.length]);

  const svgSize = isSmallScreen ? 140 : 240;
  const outerRadius = svgSize / 2 - (isSmallScreen ? 6 : 8);
  const innerRadius = outerRadius * 0.6;
  const paddingAngle = 2;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  let cumulativeAngle = 90;

  const currentSliceVariants: Variants = {
    ...sliceVariants,
    visible: (i: number) => {
      const baseVisible = (sliceVariants.visible as (custom: any) => TargetAndTransition)(i);
      return {
        ...baseVisible,
        transition: {
          ...(baseVisible.transition as Transition),
          delay: getAnimationDelay(0.6 + i * 0.15),
        },
      };
    },
  };

  const currentCenterLabelVariants: Variants = {
    ...centerLabelVariants,
    visible: {
      ...(centerLabelVariants.visible as TargetAndTransition),
      transition: {
        ...((centerLabelVariants.visible as TargetAndTransition).transition as Transition),
        delay: getAnimationDelay(1.2),
      },
    },
  };

  const currentLegendContainerVariants: Variants = {
    ...legendContainerVariants,
    visible: {
      ...(legendContainerVariants.visible as TargetAndTransition),
      transition: {
        ...((legendContainerVariants.visible as TargetAndTransition).transition as Transition),
        delayChildren: getAnimationDelay(1.5),
      },
    },
  };

  return (
    <motion.div
      className="bg-background/70 backdrop-blur-md dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate={cardControls}
    >
      <div className="p-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <motion.h3
            custom={0}
            variants={headerItemVariants}
            initial="hidden"
            animate={cardControls}
            className="text-md lg:text-lg font-medium text-slate-800 dark:text-neutral-200"
          >
            {activeTab === 'incoming' ? 'Income' : 'Expense'} Breakdown
          </motion.h3>
          <motion.div initial="hidden" animate={cardControls} custom={1} variants={headerItemVariants} className="flex">
            <div className="flex space-x-1 bg-slate-400/10 backdrop-blur-md dark:bg-neutral-800 rounded-full p-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (disableAutoRotate || activeTab === tab.id) {
                      if (activeTab !== tab.id) {
                        if (tabSwitchTimerRef.current) clearTimeout(tabSwitchTimerRef.current);
                        if (onCompleteTimerRef.current) clearTimeout(onCompleteTimerRef.current);
                        setActiveTab(tab.id);
                        setCurrentChartData(getChartDataForTab(tab.id));
                        setAnimationCycle(prev => prev + 1);
                      }
                    }
                  }}
                  disabled={!disableAutoRotate && activeTab !== tab.id}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-neutral-700 text-green-600 dark:text-green-400 shadow-sm"
                      : "text-slate-600 dark:text-neutral-400 hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  } ${(!disableAutoRotate && activeTab !== tab.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      

      <motion.div
        custom={1}
        variants={headerItemVariants}
        initial="hidden"
        animate={cardControls}
        className="px-4 pt-1 mt-4"
      >
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          Comprehensive breakdown of total income sources and their contributions
        </p>
      </motion.div>

      {/* Notification Banner */}
      <motion.div
        variants={notificationVariants}
        initial="hidden"
        animate="visible"
        className="px-4 pt-3 mb-2"
      >
        <div className="flex items-center p-2">
          <span className="relative flex h-2.5 w-2.5 mr-3">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            We have detected Highest {activeTab === 'incoming' ? 'Income' : 'Expense'} of ₹{highestValueItem?.value.toLocaleString()}
          </span>
        </div>
      </motion.div>

      <motion.div key={`chart-cycle-${animationCycle}`} className="contents">
        <div className="flex items-center justify-center px-2 mb-6">
          {/* Chart on the left */}
          <div className="relative flex-shrink-0">
            <motion.svg 
              key={`svg-expense-${animationCycle}`} 
              width={svgSize} 
              height={svgSize} 
              viewBox={`0 0 ${svgSize} ${svgSize}`} 
              className="transform -rotate-90"
              initial="hidden"
              animate="visible"
            >
                          <title>{activeTab === 'incoming' ? 'Income' : 'Expense'} Breakdown Distribution</title>
            {currentChartData.map((slice: any, index: number) => {
                const sliceAngle = (slice.value / totalValue) * 360;
                const startAngle = cumulativeAngle;
                const endAngle = cumulativeAngle + sliceAngle;
                const pathData = getDonutSlicePath(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, paddingAngle);
                cumulativeAngle = endAngle;
                return (
                  <motion.path
                    key={`${slice.name}-${animationCycle}`}
                    d={pathData}
                    fill={slice.color}
                    variants={currentSliceVariants}
                    custom={index}
                    initial="hidden" animate="visible"
                  />
                );
              })}
            </motion.svg>
            <motion.div 
              key={`centerlabel-expense-${animationCycle}`}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
              variants={currentCenterLabelVariants}
              initial="hidden" animate="visible"
            >
              <span className="text-[8px] lg:text-[12px] text-slate-500 font-medium dark:text-neutral-400">Total {activeTab === 'incoming' ? 'Income' : 'Expense'}</span>
              <span className="text-md lg:text-2xl font-bold text-slate-700 dark:text-neutral-200 mt-1">
                ₹{totalValue.toLocaleString()}
              </span>
            </motion.div>
          </div>

          {/* Legend on the right */}
          <motion.div 
            key={`legend-expense-${animationCycle}`}
            className={`${isSmallScreen ? 'ml-4' : 'ml-8'} flex flex-col gap-y-3`}
            variants={currentLegendContainerVariants}
            initial="hidden" animate="visible"
          >
            {currentChartData.map((slice: any, index: number) => (
              <motion.div 
                key={`legend-item-${slice.name}-${animationCycle}`}
                className={`flex items-center justify-between ${isSmallScreen ? 'min-w-[140px]' : 'min-w-[200px]'}`}
                variants={legendItemVariants}
              >
                <div className="flex items-center">
                  <span 
                    className={`${isSmallScreen ? 'w-2 h-2' : 'w-3 h-3'} rounded-sm mr-2 flex-shrink-0`}
                    style={{ backgroundColor: slice.color }}
                  ></span>
                  <span className={`${isSmallScreen ? 'text-xs' : 'text-sm'} text-slate-600 font-medium dark:text-neutral-400 mr-4`}>
                    {slice.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`${isSmallScreen ? 'text-xs' : 'text-sm'} font-bold text-slate-800 dark:text-neutral-200`}>
                    ₹{slice.value.toLocaleString()}
                  </span>
                  <span className={`${isSmallScreen ? 'text-[10px]' : 'text-xs'} text-slate-500 dark:text-neutral-500 ml-1`}>
                    ({(slice.value / totalValue * 100).toFixed(0)}%)
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedExpensePieChartCard; 