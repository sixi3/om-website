'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { BarChart, BarElementSlotProps } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface AnimatedFOIRChartCardProps {
  onAnimationComplete?: () => void;
  disableAutoRotate?: boolean;
}

// FOIR data structure
interface FOIRDataPoint {
  month: string;
  inflow: number;
  outflow: number;
  foirPercentage: number;
}

const foirData: FOIRDataPoint[] = [
  { month: 'Jan 23', inflow: 60000, outflow: 40000, foirPercentage: 30 },
  { month: 'Feb 23', inflow: 90000, outflow: 70000, foirPercentage: 30 },
  { month: 'Mar 23', inflow: 70000, outflow: 60000, foirPercentage: 30 },
  { month: 'Apr 23', inflow: 70000, outflow: 60000, foirPercentage: 30 },
  { month: 'May 23', inflow: 70000, outflow: 60000, foirPercentage: 30 },
  { month: 'Jun 23', inflow: 80000, outflow: 70000, foirPercentage: 40 },
];

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

const chartContentVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
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
  const [isClient, setIsClient] = useState(false);
  const [clientLastUpdated, setClientLastUpdated] = useState('');

  useEffect(() => {
    setIsClient(true);
    setClientLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
  }, []);

  useEffect(() => {
    cardControls.start('visible');
  }, [cardControls]);

  const formatYAxisLabel = (value: number): string => {
    if (value >= 100000) {
      return `₹${(value / 100000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}K`;
    }
    return `₹${value.toLocaleString()}`;
  };

  const formatPercentageLabel = (value: number): string => {
    return `${value}%`;
  };

  const chartSetting = {
    height: 240,
    margin: { top: 20, right: 40, bottom: 20, left: 60 },
  };

  const legendItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.7 + i * 0.15, duration: 0.3 }
    }),
  };

  const footerItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 1.2, duration: 0.3 }
    }
  };

  // Transform data for the combined chart
  const chartData = foirData.map(item => ({
    month: item.month,
    inflow: item.inflow,
    outflow: item.outflow,
    foirPercentage: item.foirPercentage,
  }));

  const barSeries = [
    { dataKey: 'inflow', label: 'Inflow: Average End of Day Bank Balance per month', color: '#166534' }, // dark green
    { dataKey: 'outflow', label: 'Outflow: Average End of Day Bank Balance per month', color: '#22c55e' }, // light green
  ];

  const lineSeries = [
    { dataKey: 'foirPercentage', label: 'FOIR Percentage: Average End of Day Bank Balance per month', color: '#6b7280' }, // grey
  ];

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
          <motion.div
            custom={0}
            variants={headerItemVariants}
            className="flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-md lg:text-lg font-medium text-slate-800 dark:text-neutral-200">
              FOIR Percentage
            </h3>
          </motion.div>
          <motion.div
            custom={1}
            variants={headerItemVariants}
            className="text-right"
          >
            <div className="text-xs text-slate-600 dark:text-neutral-400">
              DURATION AVAILABLE: January 23 - June 23
            </div>
            <div className="text-xs text-slate-600 dark:text-neutral-400">
              INSIGHT: Less than 40%
            </div>
          </motion.div>
        </div>
      </div>

      {/* Insights Section */}
      <motion.div
        custom={2}
        variants={headerItemVariants}
        className="px-4 pt-3 mb-4"
      >
        <div className="space-y-1">
          <p className="text-sm text-slate-600 dark:text-neutral-400">
            • We have detected FOIR(Fixed Obligation to Income Ratio) Percentage less than 40%
          </p>
          <p className="text-sm text-slate-600 dark:text-neutral-400">
            • We have detected FOIR(Fixed Obligation to Income Ratio) Percentage less than 40%
          </p>
        </div>
      </motion.div>

      {/* Combined Chart Section */}
      <div className="pt-2 pb-0 min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key="foir-chart"
            variants={chartContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-[240px]"
          >
            {isClient && chartData && chartData.length > 0 && (
              <div className="relative">
                {/* Bar Chart */}
                <BarChart
                  dataset={chartData}
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
                  skipAnimation={false}
                  hideLegend
                />
                
                {/* Line Chart Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <LineChart
                    dataset={chartData}
                    xAxis={[{ 
                      scaleType: 'band', 
                      dataKey: 'month',
                      sx: {
                        ".MuiChartsAxis-line": { display: 'none' },
                        ".MuiChartsAxis-tick": { display: 'none' },
                        ".MuiChartsAxis-label": { display: 'none' },
                      }
                    }]}
                    yAxis={[{
                      min: 0,
                      max: 70,
                      valueFormatter: formatPercentageLabel,
                      sx: {
                        ".MuiChartsAxis-line": { display: 'none' },
                        ".MuiChartsAxis-tick": { display: 'none' },
                        ".MuiChartsAxis-label": { display: 'none' },
                      }
                    }]}
                    series={lineSeries.map(s => ({ 
                      dataKey: s.dataKey, 
                      label: s.label, 
                      color: s.color,
                      curve: 'linear',
                      strokeDasharray: '5,5',
                    }))}
                    {...chartSetting}
                    hideLegend
                  />
                </div>
              </div>
            )}
            {(!isClient || !chartData || chartData.length === 0) && (
              <div className="w-full min-h-[240px] flex items-center justify-center">
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
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { 
                    delayChildren: 0.7,
                    staggerChildren: 0.15 
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
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-slate-600 dark:text-neutral-400 font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}
        {lineSeries.map((item, index) => (
          <motion.div 
            key={item.label}
            className="flex items-center space-x-2"
            custom={index + barSeries.length}
            variants={legendItemVariants}
          >
            <svg width="12" height="12" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="3" fill={item.color} />
            </svg>
            <span className="text-xs text-slate-600 dark:text-neutral-400 font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Last Updated Footer */}
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
          <div className="text-xs text-right font-medium text-green-600 dark:text-green-400">
            FOIR analysis completed successfully
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AnimatedFOIRChartCard; 