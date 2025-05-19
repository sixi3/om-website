'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { BarChart, BarElementSlotProps } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface AnimatedBarChartCardProps {
  onAnimationComplete?: () => void;
  disableAutoRotate?: boolean;
}

// Updated Tab types and their labels
const tabs = [
  { id: 'successRate', label: 'Success Rate' },
  { id: 'failureRate', label: 'Failure Rate' },
];

const bankDataBase = [
  // Data for Success Rate (current graph - using 'week' data as a base)
  { bank: 'SBI', category: 'successRate', requested: 10000, delivered: 9500 },
  { bank: 'HDFC', category: 'successRate', requested: 9000, delivered: 8500 },
  { bank: 'ICICI', category: 'successRate', requested: 8000, delivered: 7000 },
  { bank: 'RBL', category: 'successRate', requested: 7000, delivered: 6000 },
  { bank: 'BoB', category: 'successRate', requested: 6000, delivered: 5000 },

  // Data for Failure Rate (new banks and data)
  { bank: 'ABC Bank', category: 'failureRate', requested: 10000, delivered: 7000 },
  { bank: 'XYZ Bank', category: 'failureRate', requested: 9000, delivered: 5000 },
  { bank: 'JKL Bank', category: 'failureRate', requested: 8000, delivered: 3000 },
  { bank: 'EFG Bank', category: 'failureRate', requested: 7000, delivered: 6000 },
  { bank: 'LMN Bank', category: 'failureRate', requested: 6000, delivered: 2000 },

];

const getChartDataForTab = (tabId: string, zeroed: boolean = false) => {
  const data = bankDataBase.filter(d => d.category === tabId);
  if (zeroed) {
    return data.map(item => ({ ...item, requested: 0, delivered: 0 })).sort((a,b) => b.requested - a.requested); // Sort by requested for consistency if delivered is zero
  }
  // For failure rate, maybe sort by the magnitude of failure, or just keep consistent by requested or delivered.
  // For now, let's sort by delivered for success, and by delivered (ascending to show worst first) or requested for failure.
  if (tabId === 'failureRate') {
    return data.sort((a, b) => a.delivered - b.delivered); // Example: show highest failure (lowest delivered) first
  } 
  return data.sort((a, b) => b.delivered - a.delivered); // Original sort for success rate
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
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

const barChartContainerAnimationDelay = 0.5; // Base delay for chart container to start animating

// Variants for the chart content switching (opacity fade)
const chartContentVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

// Updated BarWithTopRadius to correctly type props and avoid spreading internal MUI props
const BarWithTopRadius = React.forwardRef<
  SVGPathElement,
  any // Reverted to any to bypass linter errors for now
>(function BarWithTopRadius(props, ref) {
  const { 
    x, y, width, height, 
    color: seriesColor, // from series
    ownerState,      // for potential theme or other stateful styling from MUI
    // Explicitly destructure known MUI internal/slot props to prevent them from being spread to the <path> element
    dataIndex,
    seriesId,
    formattedValue,
    xOrigin,
    yOrigin,
    skipAnimation,
    // We accept `other` but will only spread known SVG attributes if necessary, or just pass ref and minimal style props
    ...other 
  } = props;
  const radius = 5;
  // Ensure barColor has a fallback if seriesColor or ownerState.color is not available
  const barColor = seriesColor || (ownerState && ownerState.color) || 'currentColor';

  // Do not render if dimensions are invalid or effectively zero (height might be 0 during animation)
  if (height === undefined || width === undefined || x === undefined || y === undefined || width <= 0) { // allow height to be 0
    return null; 
  }

  const actualHeight = Math.max(0, height); // Ensure height is not negative, can be 0

  // If actualHeight is 0, we could return null or a 0-height path, depending on desired visual for animation start
  if (actualHeight === 0) {
      // Optionally return null to not render a 0-height bar, or draw a horizontal line
      // For simplicity, let's allow the path to be drawn with 0 height which should be visually empty or a line
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

export const AnimatedBarChartCard = ({ onAnimationComplete, disableAutoRotate = false }: AnimatedBarChartCardProps) => {
  const cardControls = useAnimation();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [chartData, setChartData] = useState(() => getChartDataForTab(tabs[0].id));
  const [clientLastUpdated, setClientLastUpdated] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const tabAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(false); // Initialize to false, set to true once mounted and client-side

  useEffect(() => {
    setIsClient(true);
    setClientLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
    mountedRef.current = true; // Explicitly set to true when component has mounted on client
    
    // Optional: Log to confirm this runs as expected when shown via InteractiveShowcase
    // console.log('[BarChart] Initial useEffect: isClient=true, mountedRef.current=true');

    return () => {
      mountedRef.current = false;
      if (tabAnimationTimeoutRef.current) {
        clearTimeout(tabAnimationTimeoutRef.current);
        tabAnimationTimeoutRef.current = null; // Clear timer on unmount
      }
      // console.log('[BarChart] Unmounted');
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  const seriesData = [
    { dataKey: 'requested', label: 'Data Requested', color: '#3b82f6' },
    { dataKey: 'delivered', label: 'Data Delivered', color: '#22c55e' },
  ];

  // Calculate delays for animations
  const legendAnimationDelayStart = barChartContainerAnimationDelay + 0.2; // After chart content animates in
  const footerAnimationDelayStart = legendAnimationDelayStart + (seriesData.length * 0.15) + 0.1; // Start after legend animation
  // Note: totalOnCompleteDelay is now managed by the tab cycling logic for the external onAnimationComplete

  useEffect(() => {
    cardControls.start('visible'); // Card entrance animation
  }, [cardControls]);

  // Effect to update chart data when activeTab or isClient changes
  useEffect(() => {
    if (!mountedRef.current || !isClient) return;
    setChartData(getChartDataForTab(activeTab, false));
  }, [activeTab, isClient]); // Depends on activeTab and isClient

  // Effect for auto-rotation and onAnimationComplete callback
  useEffect(() => {
    // console.log(`[BarChart] Auto-rotation effect check: isClient=${isClient}, mounted=${mountedRef.current}, activeTab=${activeTab}, disableAutoRotate=${disableAutoRotate}, cycleCount=${cycleCount}`);
    if (!mountedRef.current || !isClient) {
      // console.log('[BarChart] Auto-rotation PREVENTED: not mounted or not client.');
      return; 
    }

    if (tabAnimationTimeoutRef.current) {
      clearTimeout(tabAnimationTimeoutRef.current);
      tabAnimationTimeoutRef.current = null; 
    }
    // console.log('[BarChart] Cleared existing timer for auto-rotation.');

    const currentTabDisplayDuration = 3000;

    if (disableAutoRotate) {
      // console.log('[BarChart] Auto-rotation DISABLED.');
      if (cycleCount === 0 && onAnimationComplete) {
        // console.log('[BarChart] Setting timer for onAnimationComplete (disableAutoRotate=true)');
        tabAnimationTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            // console.log('[BarChart] Firing onAnimationComplete (disableAutoRotate=true)');
            onAnimationComplete();
            setCycleCount(1); 
          }
        }, currentTabDisplayDuration);
      }
      return; 
    }

    // console.log('[BarChart] Setting timer for NEXT TAB auto-rotation.');
    tabAnimationTimeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) {
        // console.log('[BarChart] Auto-rotation callback SKIPPED: unmounted before fire.');
        return;
      }
      // console.log(`[BarChart] Auto-rotation TIMER FIRED. Current activeTab: ${activeTab}`);

      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      let nextIndex = (currentIndex + 1) % tabs.length;
      
      let currentCycle = cycleCount;
      if (nextIndex === 0) { 
        currentCycle = cycleCount + 1;
        setCycleCount(currentCycle); 
        // console.log(`[BarChart] Cycle completed. New cycleCount: ${currentCycle}`);
      }

      if (currentCycle === 1 && nextIndex === 0 && onAnimationComplete) {
        // console.log('[BarChart] Firing onAnimationComplete (full cycle).');
        onAnimationComplete();
      }
      
      // console.log(`[BarChart] Switching to next tab: ${tabs[nextIndex].id}`);
      setActiveTab(tabs[nextIndex].id);
    }, currentTabDisplayDuration);

    return () => {
      if (tabAnimationTimeoutRef.current) {
        clearTimeout(tabAnimationTimeoutRef.current);
        tabAnimationTimeoutRef.current = null;
        // console.log('[BarChart] Auto-rotation timer CLEARED (cleanup of effect).');
      }
    };
  }, [activeTab, disableAutoRotate, onAnimationComplete, cycleCount, isClient, mountedRef.current]); // Added mountedRef.current to dependencies

  const formatYAxisLabel = (value: number): string => {
    if (value >= 10000000) {
      return `${(value / 10000000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}K`;
    }
    return value.toString();
  };

  const chartSetting = {
    yAxis: [{
      tickLabelStyle: { 
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '12px',
        fill: '#475569', // text-slate-600 from user's change
      },
      valueFormatter: formatYAxisLabel,
      sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-20px, 0)',
        },
        ".MuiChartsAxis-line": {
          stroke: '#e2e8f0', // slate-300
          strokeOpacity: 0.8,
        },
        ".MuiChartsAxis-tick": {
          stroke: '#e2e8f0', // slate-300
          strokeOpacity: 0.8,
        }
      }
    }],
    height: 300,
    margin: { top: 20, right: 20, bottom: 20, left: 5 },
  };

  const legendItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: legendAnimationDelayStart + i * 0.15, duration: 0.3 }
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

  // Manual tab change function for button clicks
  const handleManualTabChange = (tabId: string) => {
    if (!mountedRef.current) return;
    // Clear any ongoing automatic tab switching timer
    if (tabAnimationTimeoutRef.current) {
      clearTimeout(tabAnimationTimeoutRef.current);
      tabAnimationTimeoutRef.current = null;
    }
    // Reset cycleCount on manual change. This ensures that if auto-rotate is re-enabled or was never disabled,
    // the onAnimationComplete for a full cycle is correctly triggered after the next full auto-cycle.
    // It also helps if disableAutoRotate=true, then user clicks, then disableAutoRotate becomes false.
    setCycleCount(0); 
    setActiveTab(tabId);
  };

  return (
    <motion.div
      className="bg-background/70 backdrop-blur-md dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate={cardControls}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <motion.h3
            custom={0}
            variants={headerItemVariants}
            className="text-lg font-medium text-slate-800 dark:text-neutral-200"
          >
            FIP Data Health
          </motion.h3>
          <div className="flex">
            <div className="flex space-x-1 bg-slate-400/10 backdrop-blur-md dark:bg-neutral-800 rounded-full p-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleManualTabChange(tab.id)}
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

      {/* Subtitle can be added here if needed, similar to PieChart */}
      <motion.div
        custom={1} // If subtitle is added, ensure custom prop is unique or part of header animation sequence
        variants={headerItemVariants}
        className="px-4 pt-3 mb-4"
      >
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          Overview of data request and delivery status across FIPs.
        </p>
      </motion.div>

      {/* Bar Chart Section with AnimatePresence */}
      <div className="pt-2 pb-0 min-h-[320px]"> {/* Added min-h to prevent layout shift during transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // This key is crucial for AnimatePresence to detect changes
            variants={chartContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-[320px]" // Ensure consistent height during transitions
          >
            {isClient && chartData && chartData.length > 0 && (
              <BarChart
                dataset={chartData}
                xAxis={[{ 
                  scaleType: 'band', 
                  dataKey: 'bank',
                  tickLabelStyle: { 
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    fill: '#475569' // text-slate-600
                  },
                  sx: {
                    ".MuiChartsAxis-line": {
                      stroke: '#e2e8f0', // slate-300
                      strokeOpacity: 0.8,
                    },
                    ".MuiChartsAxis-tick": {
                      stroke: '#e2e8f0', // slate-300
                      strokeOpacity: 0.8,
                    }
                  }
                }]}
                series={seriesData.map(s => ({ 
                  dataKey: s.dataKey, 
                  label: s.label, 
                  color: s.color,
                }))}
                {...chartSetting}
                slots={{ bar: BarWithTopRadius }}
                borderRadius={5} 
                skipAnimation={false}
                hideLegend
              />
            )}
            {/* Basic fallback if no data or not client yet */}
            {(!isClient || !chartData || chartData.length === 0) && (
              <div className="w-full min-h-[320px] flex items-center justify-center">
                <p className="text-slate-500">Loading chart data...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom Legend Section */}
      <motion.div 
        className="flex justify-center items-center space-x-6 pb-4"
        initial="hidden"
        animate="visible"
        variants={{ // Container variant for staggering children
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { 
                    delayChildren: legendAnimationDelayStart,
                    staggerChildren: 0.15 
                }
            }
        }}
      >
        {seriesData.map((item, index) => (
          <motion.div 
            key={item.label}
            className="flex items-center space-x-2"
            custom={index} // Pass index for staggering
            variants={legendItemVariants} // Apply item variants here
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

      {/* Last Updated and Growth Rate Footer */}
      <div className="p-4 dark:bg-neutral-800/30">
        <motion.div 
          className="flex justify-between items-center"
          initial="hidden"
          animate="visible"
          variants={footerItemVariants} 
        >
          <div className="text-xs text-slate-500 dark:text-neutral-400">
            Last updated: {isClient ? clientLastUpdated : '...'}
          </div>
          <div className="text-xs font-medium text-green-600 dark:text-green-400">
            {isClient && (activeTab === 'successRate' ? 'SBI Bank displayed performance gain of 15%.' : 
                         activeTab === 'failureRate' ? 'XYZ Bank displayed performance decline of 10%.' : '')}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AnimatedBarChartCard; 