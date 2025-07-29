'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { BarChart, BarElementSlotProps } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface AnimatedFOIRChartCardProps {
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

// Duration selector options
const durationTabs = [
  { id: 'lastmonth', label: 'Last Month' },
  { id: '3months', label: '3 Months' },
  { id: '6months', label: '6 Months' },
];

// FOIR data structure
interface FOIRDataPoint {
  month: string;
  inflow: number;
  outflow: number;
}

const foirDataLastMonth: FOIRDataPoint[] = [
  { month: 'Week 1', inflow: 65000, outflow: 55000 },
  { month: 'Week 2', inflow: 70000, outflow: 60000 },
  { month: 'Week 3', inflow: 75000, outflow: 65000 },
  { month: 'Week 4', inflow: 80000, outflow: 70000 },
];

const foirData3Months: FOIRDataPoint[] = [
  { month: 'Apr 23', inflow: 70000, outflow: 60000 },
  { month: 'May 23', inflow: 70000, outflow: 60000 },
  { month: 'Jun 23', inflow: 80000, outflow: 70000 },
];

const foirData6Months: FOIRDataPoint[] = [
  { month: 'Jan 23', inflow: 60000, outflow: 40000 },
  { month: 'Feb 23', inflow: 90000, outflow: 70000 },
  { month: 'Mar 23', inflow: 70000, outflow: 60000 },
  { month: 'Apr 23', inflow: 70000, outflow: 60000 },
  { month: 'May 23', inflow: 70000, outflow: 60000 },
  { month: 'Jun 23', inflow: 80000, outflow: 70000 },
];

const getFOIRDataForDuration = (durationId: string): FOIRDataPoint[] => {
  switch (durationId) {
    case 'lastmonth':
      return foirDataLastMonth;
    case '3months':
      return foirData3Months;
    case '6months':
      return foirData6Months;
    default:
      return foirDataLastMonth;
  }
};

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

export const AnimatedFOIRChartCard = ({ onAnimationComplete, disableAutoRotate = false }: AnimatedFOIRChartCardProps) => {
  const cardControls = useAnimation();
  const [activeDuration, setActiveDuration] = useState('lastmonth');
  const [chartData, setChartData] = useState(() => getFOIRDataForDuration('lastmonth'));
  const [isClient, setIsClient] = useState(false);
  const [clientLastUpdated, setClientLastUpdated] = useState('');
  const [cycleCount, setCycleCount] = useState(0);

  const { isLowPerformance, isReducedMotion } = usePerformanceMode();
  const shouldDisableAnimations = isLowPerformance || isReducedMotion;

  const durationAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(false);

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

  // Transform data for the combined chart with FOIR percentage
  const transformedChartData = useMemo(() => 
    chartData.map(item => ({
      month: item.month,
      inflow: item.inflow,
      outflow: item.outflow,
      foirPercentage: Math.round((item.outflow / item.inflow) * 100),
    })), [chartData]
  );

  const barSeries = useMemo(() => [
    { dataKey: 'inflow', label: 'Inflow', color: '#166534' }, // dark green
    { dataKey: 'outflow', label: 'Outflow', color: '#22c55e' }, // light green
  ], []);

  // Calculate delays for animations
  const legendAnimationDelayStart = shouldDisableAnimations ? 0.3 : 0.7 + 0.2; // After chart content animates in
  const footerAnimationDelayStart = legendAnimationDelayStart + (barSeries.length) * 0.1 + 0.1;

  const legendItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: legendAnimationDelayStart + i * 0.1, duration: 0.3 }
    }),
  };

  const footerItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: footerAnimationDelayStart, duration: 0.3 }
    }
  };

  useEffect(() => {
    setIsClient(true);
    setClientLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      if (durationAnimationTimeoutRef.current) {
        clearTimeout(durationAnimationTimeoutRef.current);
        durationAnimationTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    cardControls.start('visible');
  }, [cardControls]);

  // Effect to update chart data when activeDuration or isClient changes
  useEffect(() => {
    if (!isClient) return;
    setChartData(getFOIRDataForDuration(activeDuration));
  }, [activeDuration, isClient]);

  // Effect for auto-rotation and onAnimationComplete callback
  useEffect(() => {
    if (!mountedRef.current || !isClient) {
      return; 
    }

    if (durationAnimationTimeoutRef.current) {
      clearTimeout(durationAnimationTimeoutRef.current);
      durationAnimationTimeoutRef.current = null; 
    }

    const currentDurationDisplayTime = shouldDisableAnimations ? 2000 : 3000;

    if (disableAutoRotate || shouldDisableAnimations) {
      if (cycleCount === 0 && onAnimationComplete) {
        durationAnimationTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            onAnimationComplete();
            setCycleCount(1); 
          }
        }, currentDurationDisplayTime);
      }
      return; 
    }

    durationAnimationTimeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) {
        return;
      }

      const currentIndex = durationTabs.findIndex(tab => tab.id === activeDuration);
      let nextIndex = (currentIndex + 1) % durationTabs.length;
      
      let currentCycle = cycleCount;
      if (nextIndex === 0) { 
        currentCycle = cycleCount + 1;
        setCycleCount(currentCycle); 
      }

      if (currentCycle === 1 && nextIndex === 0 && onAnimationComplete) {
        onAnimationComplete();
      }
      
      setActiveDuration(durationTabs[nextIndex].id);
    }, currentDurationDisplayTime);

    return () => {
      if (durationAnimationTimeoutRef.current) {
        clearTimeout(durationAnimationTimeoutRef.current);
        durationAnimationTimeoutRef.current = null;
      }
    };
  }, [activeDuration, disableAutoRotate, onAnimationComplete, cycleCount, isClient, shouldDisableAnimations]);

  // Manual duration change function for button clicks
  const handleManualDurationChange = useCallback((durationId: string) => {
    if (!mountedRef.current) return;
    // Clear any ongoing automatic duration switching timer
    if (durationAnimationTimeoutRef.current) {
      clearTimeout(durationAnimationTimeoutRef.current);
      durationAnimationTimeoutRef.current = null;
    }
    // Reset cycleCount on manual change
    setCycleCount(0); 
    setActiveDuration(durationId);
  }, []);

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
          <motion.div
            custom={0}
            variants={shouldDisableAnimations ? {} : headerItemVariants}
            initial={shouldDisableAnimations ? undefined : "hidden"}
            animate={shouldDisableAnimations ? undefined : cardControls}
            className="flex items-center space-x-2"
          >
            <h3 className="text-md lg:text-lg font-medium text-slate-800 dark:text-neutral-200">
              FOIR Percentage
            </h3>
          </motion.div>
          <motion.div 
            initial={shouldDisableAnimations ? undefined : "hidden"} 
            animate={shouldDisableAnimations ? undefined : cardControls} 
            custom={1} 
            variants={shouldDisableAnimations ? {} : headerItemVariants} 
            className="flex"
          >
            <div className="flex space-x-1 bg-slate-400/10 backdrop-blur-md dark:bg-neutral-800 rounded-full p-0.5">
              {durationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleManualDurationChange(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    activeDuration === tab.id
                      ? "bg-white dark:bg-neutral-700 text-green-600 dark:text-green-400 shadow-sm"
                      : "text-slate-600 dark:text-neutral-400 hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOIR Explainer Section */}
      <motion.div
        custom={2}
        variants={shouldDisableAnimations ? {} : headerItemVariants}
        initial={shouldDisableAnimations ? undefined : "hidden"}
        animate={shouldDisableAnimations ? undefined : cardControls}
        className="px-4 pt-3 mb-4"
      >
        <div className="text-left">
          <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed ">
            Understand FOIR (Fixed Income to Obligation Ratio) of your users
          </p>
        </div>
      </motion.div>

      {/* Combined Chart Section */}
      <div className="pt-2 pb-4 min-h-[340px] px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDuration}
            variants={shouldDisableAnimations ? {} : chartContentVariants}
            initial={shouldDisableAnimations ? undefined : "initial"}
            animate={shouldDisableAnimations ? undefined : "animate"}
            exit={shouldDisableAnimations ? undefined : "exit"}
            className="w-full min-h-[340px]"
          >
            {isClient && transformedChartData && transformedChartData.length > 0 && (
              <div className="relative w-full">
                {/* Bar Chart */}
                <BarChart
                  dataset={transformedChartData}
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
                    max: 100000,
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
                  series={barSeries.map(s => ({ 
                    dataKey: s.dataKey, 
                    label: s.label, 
                    color: s.color,
                  }))}
                  {...chartSetting}
                  slots={{ bar: BarWithTopRadius }}
                  borderRadius={5} 
                  skipAnimation={shouldDisableAnimations}
                  hideLegend
                />
                
                {/* FOIR Percentage Labels */}
                <div className="absolute inset-0 pointer-events-none flex justify-between items-start px-8 pt-2 ml-8">
                  {transformedChartData.map((item, index) => (
                    <div
                      key={item.month}
                      className="flex-1 flex justify-center"
                    >
                      <div className="bg-slate-200 text-slate-600 text-[10px] md:text-xs font-semibold px-1 md:px-2 py-0.5 py-1 rounded-xl">
                        {item.foirPercentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(!isClient || !transformedChartData || transformedChartData.length === 0) && (
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
                    delayChildren: legendAnimationDelayStart,
                    staggerChildren: shouldDisableAnimations ? 0.05 : 0.15 
                }
            }
        }}
      >
        {barSeries.map((item, index) => (
          <motion.div 
            key={item.label}
            className="flex items-center space-x-2"
            custom={index}
            variants={legendItemVariants}
          >
            <svg width="12" height="12" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="5" fill="none" stroke={item.color} strokeWidth="3" />
            </svg>
            <span className="text-xs text-slate-600 dark:text-neutral-400 font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}

      </motion.div>

      {/* Last Updated Footer */}
      <div className="p-4 pb-6 dark:bg-neutral-800/30">
        <motion.div 
          className="flex justify-between items-center"
          initial="hidden"
          animate="visible"
          variants={footerItemVariants} 
        >
          <div className="text-[10px] md:text-xs text-slate-500 dark:text-neutral-400">
            Last updated: {isClient ? clientLastUpdated : '...'}
          </div>
          <div className="text-xs text-right font-medium text-green-600 dark:text-green-400">
            User has consistent FOIR of &gt;80%
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AnimatedFOIRChartCard; 