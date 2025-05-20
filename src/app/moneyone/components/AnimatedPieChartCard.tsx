'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, Variants, Transition, TargetAndTransition } from 'framer-motion'; // Placeholder for the consent icon

interface AnimatedPieChartCardProps {
  onAnimationComplete?: () => void;
  disableAutoRotate?: boolean;
}

const overallConsentsData = [
  { name: 'Approved', value: 62783, color: '#22c55e' }, // Emerald 500 (Green)
  { name: 'Pending', value: 27467, color: '#3b82f6' },  // Blue 500
  { name: 'Rejected', value: 8299, color: '#ef4444' }, // Red 500
  { name: 'Expired', value: 5679, color: '#f97316' },   // Orange 500
];

const dataDeliveryData = [
  { name: 'Received', value: 85432, color: '#00754B' },
  { name: 'Pending', value: 15234, color: '#3DADFB' },    
  { name: 'Failed', value: 3012, color: '#FF7C7B' }, 
];

// Tab types and their labels (from AnimatedLineGraphCard)
const tabs = [
  { id: 'consent', label: 'Overall Consents' },
  { id: 'data', label: 'Data Delivery' },
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

export const AnimatedPieChartCard = ({ onAnimationComplete, disableAutoRotate = false }: AnimatedPieChartCardProps) => {
  const cardControls = useAnimation();
  const chartControls = useAnimation();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [currentPieData, setCurrentPieData] = useState(overallConsentsData);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const totalValue = currentPieData.reduce((sum, item) => sum + item.value, 0);
  const tabSwitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getAnimationDelay = (baseDelay: number) => {
    return animationCycle > 0 ? baseDelay * 0.5 : baseDelay; 
  };

  useEffect(() => {
    const lastLegendItemIndex = currentPieData.length - 1;
    const sliceAnimationEnd = getAnimationDelay(0.6 + lastLegendItemIndex * 0.15 + 0.5);
    const centerLabelAnimationEnd = getAnimationDelay(1.2 + 0.5);
    const legendAnimationEnd = getAnimationDelay(1.5 + lastLegendItemIndex * 0.15 + 0.3);
    const maxAnimationDuration = Math.max(sliceAnimationEnd, centerLabelAnimationEnd, legendAnimationEnd);

    const animateCardAndChart = async () => {
      await cardControls.start('visible');
      await chartControls.start('visible');
      
      if (tabSwitchTimerRef.current) clearTimeout(tabSwitchTimerRef.current);
      if (onCompleteTimerRef.current) clearTimeout(onCompleteTimerRef.current);

      if (activeTab === 'consent' && !disableAutoRotate) {
        tabSwitchTimerRef.current = setTimeout(() => {
          setActiveTab('data');
          setCurrentPieData(dataDeliveryData);
          setAnimationCycle(prev => prev + 1);
        }, (maxAnimationDuration + 0.5) * 1000);
      } else if (activeTab === 'data' && onAnimationComplete) {
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
  }, [cardControls, chartControls, activeTab, disableAutoRotate, onAnimationComplete, animationCycle]);

  const svgSize = isSmallScreen ? 180 : 280;
  const outerRadius = svgSize / 2 - (isSmallScreen ? 8 : 10);
  const innerRadius = outerRadius * 0.6;
  const paddingAngle = 2;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  let cumulativeAngle = 90;

  const centerLabelText = activeTab === 'consent' ? ['TOTAL', 'CONSENTS'] : ['TOTAL DATA', 'REQUESTED'];

  const numLegendItems = currentPieData.length;
  let smGridColsResponsiveClass = 'sm:grid-cols-4'; // Default for 4 or more items
  if (numLegendItems === 1) {
    smGridColsResponsiveClass = 'sm:grid-cols-1';
  } else if (numLegendItems === 2) {
    smGridColsResponsiveClass = 'sm:grid-cols-2';
  } else if (numLegendItems === 3) {
    smGridColsResponsiveClass = 'sm:grid-cols-3';
  }

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
            className="text-lg font-medium text-slate-800 dark:text-neutral-200"
          >
            {activeTab === 'consent' ? 'Consent Distribution' : 'Data Delivery Overview'}
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
                        setCurrentPieData(tab.id === 'consent' ? overallConsentsData : dataDeliveryData);
                        setAnimationCycle(prev => prev + 1);
                      }
                    } else {
                      // If auto-rotate is ON, and user clicks a DIFFERENT tab, it's disabled.
                      // This case might need refinement if we want to allow clicks during auto-rotation to interrupt and switch.
                      // For now, simplest is to disable clicks on other tabs if auto-rotate is on.
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
        custom={activeTab === 'consent' ? 1 : 2}
        variants={headerItemVariants}
        initial="hidden"
        animate={cardControls}
        className="px-4 pt-3 mb-4"
      >
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          {activeTab === 'consent' 
            ? 'Understand overall distribution of consents raised' 
            : 'Understand distribution of requested data '}
        </p>
      </motion.div>

      <motion.div animate={chartControls} key={`chart-cycle-${animationCycle}`} className="contents">
        <div className="relative flex justify-center items-center mb-6 px-4">
          <motion.svg 
            key={`svg-${activeTab}-${animationCycle}`} 
            width={svgSize} 
            height={svgSize} 
            viewBox={`0 0 ${svgSize} ${svgSize}`} 
            className="transform -rotate-90"
            initial="hidden"
            animate="visible"
          >
            <title>{activeTab === 'consent' ? 'Overall Consents Distribution' : 'Data Delivery Status'}</title>
            {currentPieData.map((slice, index) => {
              const sliceAngle = (slice.value / totalValue) * 360;
              const startAngle = cumulativeAngle;
              const endAngle = cumulativeAngle + sliceAngle;
              const pathData = getDonutSlicePath(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, paddingAngle);
              cumulativeAngle = endAngle;
              return (
                <motion.path
                  key={`${slice.name}-${activeTab}-${animationCycle}`}
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
            key={`centerlabel-${activeTab}-${animationCycle}`}
            className="absolute flex flex-col items-center justify-center text-center"
            variants={currentCenterLabelVariants}
            initial="hidden" animate="visible"
          >
            <span className="text-[11px] text-slate-500 font-medium dark:text-neutral-400">{centerLabelText[0]}</span>
            <span className="text-[11px] text-slate-500 font-medium dark:text-neutral-400">{centerLabelText[1]}</span>
            <span className="text-2xl font-bold text-slate-700 dark:text-neutral-200 mt-1">
              {totalValue.toLocaleString()}
            </span>
          </motion.div>
        </div>

        <motion.div 
          key={`legend-${activeTab}-${animationCycle}`}
          className={`w-full grid grid-cols-2 ${smGridColsResponsiveClass} gap-x-4 gap-y-3 p-4 md:pl-10 pb-4`}
          variants={currentLegendContainerVariants}
          initial="hidden" animate="visible"
        >
          {currentPieData.map((slice, index) => (
            <motion.div 
              key={`legend-item-${slice.name}-${activeTab}-${animationCycle}`}
              className="flex flex-col items-center"
              variants={legendItemVariants}
            >
              <div className="flex items-center mb-0.5">
                <span 
                  className="w-2.5 h-2.5 rounded-xs mr-1.5 flex-shrink-0"
                  style={{ backgroundColor: slice.color }}
                ></span>
                <span className="text-sm text-slate-600 font-medium dark:text-neutral-400">
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
    </motion.div>
  );
};

export default AnimatedPieChartCard; 