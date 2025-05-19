'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { BarChart, BarElementSlotProps } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface AnimatedBarChartCardProps {
  onAnimationComplete?: () => void;
}

// Tab types and their labels (from AnimatedLineGraphCard)
const tabs = [
  { id: 'week', label: 'Last Week' },
  { id: 'month', label: 'Last Month' },
  { id: 'sixMonths', label: 'Last 6 Months' },
];

const initialBankData = [
  { bank: 'SBI', requested: 10000, delivered: 9500 },
  { bank: 'HDFC', requested: 9000, delivered: 8500 },
  { bank: 'ICICI', requested: 8000, delivered: 7000 },
  { bank: 'RBL', requested: 7000, delivered: 6000 },
  { bank: 'BoB', requested: 6000, delivered: 5000 }, // Bank of Baroda
].sort((a, b) => b.delivered - a.delivered); // Ensure descending by delivered

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

const barChartVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: barChartContainerAnimationDelay, duration: 0.5 }, // Simplified transition for container
  },
};

// Custom Bar component for top radius
const BarWithTopRadius = React.forwardRef<SVGPathElement, any>(
  function BarWithTopRadius(props, ref) {
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

    if (height === undefined || width === undefined || x === undefined || y === undefined || height <= 0 || width <= 0) {
      return null; // Don't render if dimensions are invalid or zero/negative
    }

    const path = 
      `M ${x},${y + radius}` +
      ` Q ${x},${y} ${x + radius},${y}` +
      ` L ${x + width - radius},${y}` +
      ` Q ${x + width},${y} ${x + width},${y + radius}` +
      ` L ${x + width},${y + height}` +
      ` L ${x},${y + height}` +
      ` Z`;

    return <path d={path} fill={barColor} ref={ref} {...other} />;
  }
);

export const AnimatedBarChartCard = ({ onAnimationComplete }: AnimatedBarChartCardProps) => {
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState('week');
  const [chartData, setChartData] = useState(initialBankData);
  const [clientLastUpdated, setClientLastUpdated] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs once on the client after hydration
    setIsClient(true);
    setClientLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
  }, []);

  // TODO: Add logic to update chartData based on activeTab if necessary
  // For now, data is static

  const changeTab = (tabId: string) => {
    setActiveTab(tabId);
    // Potentially fetch/filter data for the new tab
    // For this example, we'll just re-animate or could show static data
    // If data changes, ensure the chart updates and re-animates if desired.
  };

  const seriesData = [
    { dataKey: 'requested', label: 'Data Requested', color: '#3b82f6' },
    { dataKey: 'delivered', label: 'Data Delivered', color: '#22c55e' },
  ];

  // Calculate delays for animations
  const legendAnimationDelayStart = barChartContainerAnimationDelay + 0.5; // Start after chart container animation
  const footerAnimationDelayStart = legendAnimationDelayStart + (seriesData.length * 0.15) + 0.1; // Start after legend animation
  const totalOnCompleteDelay = footerAnimationDelayStart + 0.3 + 500; // Ensure onAnimationComplete fires after all visual elements

  useEffect(() => {
    const animateSequence = async () => {
      await controls.start('visible');
      if (onAnimationComplete) {
        setTimeout(() => {
          onAnimationComplete();
          console.log('AnimatedBarChartCard: Animation complete.');
        }, totalOnCompleteDelay);
      }
    };
    animateSequence();
  }, [controls, onAnimationComplete, totalOnCompleteDelay]);

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
    }],
    series: seriesData.map(s => ({ dataKey: s.dataKey, color: s.color })),
    height: 300,
    margin: { top: 20, right: 20, bottom: 20, left: 5 }, // Adjusted for centering
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
      // General .MuiChartsAxis-tickLabel styling removed as it's now specific to yAxis/xAxis tickLabelStyle
      ".MuiChartsAxis-line": {
        stroke: '#e2e8f0',
        strokeOpacity: 0.9,
      },
      ".MuiChartsAxis-tick": {
        stroke: '#e2e8f0',
        strokeOpacity: 0.9,
      }
    },
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

  return (
    <motion.div
      className="bg-background/70 backdrop-blur-md dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
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

      {/* Bar Chart Section */}
      <motion.div
        className="pt-2 pb-0" // Removed px-4 from chart container
        variants={barChartVariants}
      >
        <BarChart
          dataset={chartData}
          xAxis={[{ scaleType: 'band', dataKey: 'bank', tickLabelStyle: { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fill: '#475569'} }]}
          {...chartSetting}
          slots={{ bar: BarWithTopRadius }}
        />
      </motion.div>

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
            {isClient && (activeTab === 'week' ? '+15% growth' : 
                         activeTab === 'month' ? '+22% growth' : '+30% growth')}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AnimatedBarChartCard; 