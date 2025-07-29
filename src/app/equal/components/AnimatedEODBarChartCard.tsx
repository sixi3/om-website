'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { BarChart, BarElementSlotProps } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface AnimatedEODBarChartCardProps {
  onAnimationComplete?: () => void;
  disableAutoRotate?: boolean;
}

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
      
      // Determine if device is low performance
      const isLowPerf = (
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g' ||
        hardwareConcurrency <= 2 ||
        memory > 50 * 1024 * 1024 // 50MB threshold
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

// EOD Balance data structure
interface EODDataPoint {
  month: string;
  balance: number;
  [key: string]: string | number;
}

const eodData: EODDataPoint[] = [
  { month: 'Jan 23', balance: 70000 },
  { month: 'Feb 23', balance: 100000 },
  { month: 'Mar 23', balance: 80000 },
  { month: 'Apr 23', balance: 75000 },
  { month: 'May 23', balance: 85000 },
  { month: 'Jun 23', balance: 130000 },
];

// Simplified animations for lower-powered devices
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
};

const chartContentVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

const notificationVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.3, ease: 'easeOut' },
  },
};

// Custom bar component with top radius
const BarWithTopRadius = React.forwardRef<
  SVGPathElement,
  any
>(function BarWithTopRadius(props, ref) {
  const { 
    x, y, width, height, 
    color: seriesColor,
    ownerState,
    dataIndex,
    seriesId,
    formattedValue,
    xOrigin,
    yOrigin,
    skipAnimation,
    ...other 
  } = props;
  
  const radius = 5;
  const barColor = seriesColor || (ownerState && ownerState.color) || 'currentColor';

  if (height === undefined || width === undefined || x === undefined || y === undefined || width <= 0) {
    return null; 
  }

  const actualHeight = Math.max(0, height);

  if (actualHeight === 0) {
    return null;
  }

  const path = 
    `M ${x},${y + radius}` +
    ` Q ${x},${y} ${x + radius},${y}` +
    ` L ${x + width - radius},${y}` +
    ` Q ${x + width},${y} ${x + width},${y + radius}` +
    ` L ${x + width},${y + actualHeight}` +
    ` L ${x},${y + actualHeight}` +
    ` Z`;

  return <path d={path} fill={barColor} ref={ref} {...other} />;
});

export const AnimatedEODBarChartCard = ({ onAnimationComplete, disableAutoRotate = false }: AnimatedEODBarChartCardProps) => {
  const cardControls = useAnimation();
  const [isClient, setIsClient] = useState(false);
  const [clientLastUpdated, setClientLastUpdated] = useState('');
  const [animationCycle, setAnimationCycle] = useState(0);

  const { isLowPerformance, isReducedMotion } = usePerformanceMode();
  const shouldDisableAnimations = isLowPerformance || isReducedMotion;

  const onCompleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize expensive computations
  const chartSetting = useMemo(() => ({
    height: 320,
    margin: { top: 20, right: 20, bottom: 20, left: 5 },
  }), []);

  const formatYAxisLabel = useCallback((value: number): string => {
    if (value >= 100000) {
      return `₹${(value / 100000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}K`;
    }
    return `₹${value.toLocaleString()}`;
  }, []);

  const legendItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: shouldDisableAnimations ? 0.1 : 0.8 + i * 0.05, duration: 0.3 }
    }),
  };

  const footerItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: shouldDisableAnimations ? 0.2 : 1.2, duration: 0.3 }
    }
  };

  useEffect(() => {
    setIsClient(true);
    setClientLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
  }, []);

  const getAnimationDelay = useCallback((baseDelay: number) => {
    return shouldDisableAnimations ? baseDelay * 0.2 : animationCycle > 0 ? baseDelay * 0.5 : baseDelay; 
  }, [shouldDisableAnimations, animationCycle]);

  useEffect(() => {
    const maxAnimationDuration = shouldDisableAnimations ? 1.0 : 2.0; // Reduced duration for low performance

    const animateCardAndChart = async () => {
      await cardControls.start('visible');
      
      if (onCompleteTimerRef.current) clearTimeout(onCompleteTimerRef.current);

      if (onAnimationComplete) {
        onCompleteTimerRef.current = setTimeout(() => {
          onAnimationComplete();
        }, (maxAnimationDuration + 0.2) * 1000);
      }
    };

    animateCardAndChart();

    return () => {
      if (onCompleteTimerRef.current) clearTimeout(onCompleteTimerRef.current);
    };
  }, [cardControls, onAnimationComplete, animationCycle, shouldDisableAnimations]);

  return (
    <motion.div
      className="bg-background/70 backdrop-blur-md dark:bg-neutral-900 rounded-xl shadow-lg overflow-visible max-w-xl mx-auto flex flex-col"
      variants={shouldDisableAnimations ? {} : cardVariants}
      initial={shouldDisableAnimations ? undefined : "hidden"}
      animate={shouldDisableAnimations ? undefined : cardControls}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <motion.h3
            custom={0}
            variants={shouldDisableAnimations ? {} : headerItemVariants}
            initial={shouldDisableAnimations ? undefined : "hidden"}
            animate={shouldDisableAnimations ? undefined : cardControls}
            className="text-md lg:text-lg font-medium text-slate-800 dark:text-neutral-200"
          >
            Average EOD Balance
          </motion.h3>
        </div>
      </div>

      {/* Notification Banner */}
      <motion.div
        variants={shouldDisableAnimations ? {} : notificationVariants}
        initial={shouldDisableAnimations ? undefined : "hidden"}
        animate={shouldDisableAnimations ? undefined : "visible"}
        className="px-4 pt-3 mb-2"
      >
        <div className="flex items-center p-2">
          <span className="relative flex h-2.5 w-2.5 mr-3">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            We have detected No Negative EOD Balance
          </span>
        </div>
      </motion.div>

      <motion.div
        custom={1}
        variants={shouldDisableAnimations ? {} : headerItemVariants}
        initial={shouldDisableAnimations ? undefined : "hidden"}
        animate={shouldDisableAnimations ? undefined : cardControls}
        className="px-4 pt-1 mb-4"
      >
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          Average End of Day Bank Balance per month
        </p>
      </motion.div>

      {/* Bar Chart Section */}
      <div className="pt-2 pb-4 min-h-[340px] px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`eod-chart-${animationCycle}`}
            variants={shouldDisableAnimations ? {} : chartContentVariants}
            initial={shouldDisableAnimations ? undefined : "initial"}
            animate={shouldDisableAnimations ? undefined : "animate"}
            exit={shouldDisableAnimations ? undefined : "exit"}
            className="w-full min-h-[340px]"
          >
            {isClient && eodData && eodData.length > 0 && (
              <div className="relative w-full">
                <BarChart
                  dataset={eodData}
                  xAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'month',
                    tickLabelStyle: { 
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      fill: '#475569'
                    },
                    sx: {
                      ".MuiChartsAxis-line": {
                        stroke: '#e2e8f0',
                        strokeOpacity: 0.8,
                      },
                      ".MuiChartsAxis-tick": {
                        stroke: '#e2e8f0',
                        strokeOpacity: 0.8,
                      }
                    }
                  }]}
                  yAxis={[{
                    tickLabelStyle: { 
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      fill: '#475569',
                    },
                    valueFormatter: formatYAxisLabel,
                    min: 0,
                    max: 140000,
                    sx: {
                      [`.${axisClasses.left} .${axisClasses.label}`]: {
                        transform: 'translate(-20px, 0)',
                      },
                      ".MuiChartsAxis-line": {
                        stroke: '#e2e8f0',
                        strokeOpacity: 0.8,
                      },
                      ".MuiChartsAxis-tick": {
                        stroke: '#e2e8f0',
                        strokeOpacity: 0.8,
                      }
                    }
                  }]}
                  series={[{ 
                    dataKey: 'balance', 
                    label: 'Monthly Average EOD Balance', 
                    color: '#22c55e',
                  }]}
                  {...chartSetting}
                  slots={{ bar: BarWithTopRadius }}
                  borderRadius={5} 
                  skipAnimation={shouldDisableAnimations}
                  hideLegend
                />
                
                {/* Balance Labels on top of bars */}
                <div className="absolute inset-0 pointer-events-none flex justify-between items-start px-8 pt-2 ml-4">
                  {eodData.map((item, index) => (
                    <div
                      key={item.month}
                      className="flex-1 flex justify-center"
                    >
                      <div className="bg-slate-200 text-slate-600 text-[10px] md:text-xs font-semibold px-1 md:px-2 py-0.5 py-1 rounded-xl">
                        ₹{(item.balance / 1000).toFixed(0)}K
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(!isClient || !eodData || eodData.length === 0) && (
              <div className="w-full min-h-[340px] flex items-center justify-center">
                <p className="text-slate-500">Loading chart data...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom Legend Section */}
      <motion.div 
        className="flex justify-center items-center space-x-6 pb-6"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { 
                    delayChildren: shouldDisableAnimations ? 0.1 : 0.8,
                    staggerChildren: shouldDisableAnimations ? 0.05 : 0.1 
                }
            }
        }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          custom={0}
          variants={legendItemVariants}
        >
          <svg width="12" height="12" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="5" fill="none" stroke="#22c55e" strokeWidth="3" />
          </svg>
          <span className="text-xs text-slate-600 dark:text-neutral-400 font-medium">
            Average EOD Balance
          </span>
        </motion.div>
      </motion.div>

      {/* Last Updated Footer */}
      <div className="p-4 pb-6 dark:bg-neutral-800/30">
        <motion.div 
          className="flex justify-between items-center"
          initial="hidden"
          animate="visible"
          variants={footerItemVariants} 
        >
          <div className="text-xs text-slate-500 dark:text-neutral-400">
            Last updated: {isClient ? clientLastUpdated : '...'}
          </div>
          <div className="text-xs text-right font-medium text-green-600 dark:text-green-400">
            Consistent positive balance maintained
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AnimatedEODBarChartCard; 