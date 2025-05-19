'use client';

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Initial placeholder data for server render and initial client render
const initialGraphDataset = {
  week: Array.from({ length: 7 }, () => ({ 
    value: 0, 
    label: '',
    secondaryValue: 0 
  })),
  month: Array.from({ length: 7 }, () => ({ 
    value: 0, 
    label: '',
    secondaryValue: 0 
  })),
  sixMonths: Array.from({ length: 6 }, () => ({ 
    value: 0, 
    label: '',
    secondaryValue: 0 
  })),
};

// Tab types and their labels
const tabs = [
  { id: 'week', label: 'Last Week' },
  { id: 'month', label: 'Last Month' },
  { id: 'sixMonths', label: 'Last 6 Months' }
];

// Define props type for the component
interface LineGraphCardProps {
  onAnimationComplete?: () => void;
  disableAutoRotate?: boolean;
}

export const LineGraphCard = ({ 
  onAnimationComplete: onExternalAnimationComplete, 
  disableAutoRotate = false 
}: LineGraphCardProps) => {
  const [activeTab, setActiveTab] = useState('week');
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [clientGraphDatasets, setClientGraphDatasets] = useState(initialGraphDataset);
  const [clientLastUpdated, setClientLastUpdated] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Add states for animated counter values
  const [displayedRaised, setDisplayedRaised] = useState(0);
  const [displayedApproved, setDisplayedApproved] = useState(0);
  const [animatingCount, setAnimatingCount] = useState(false);

  useEffect(() => {
    // This effect runs once on the client after hydration
    setIsClient(true);
    
    // Generate datasets for each tab
    const weekData = Array.from({ length: 7 }, (_, i) => {
      const primaryValue = Math.floor(Math.random() * 40) + 40; // 40-80
      const secondaryValue = Math.floor(primaryValue * (0.5 + Math.random() * 0.3)); // 50-80% of primary value
      return {
        value: primaryValue,
        secondaryValue: secondaryValue,
        label: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })
      };
    });
    
    const monthData = Array.from({ length: 7 }, (_, i) => {
      const primaryValue = Math.floor(Math.random() * 40) + 40;
      const secondaryValue = Math.floor(primaryValue * (0.5 + Math.random() * 0.3));
      return {
        value: primaryValue,
        secondaryValue: secondaryValue,
        label: new Date(Date.now() - (6 - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      };
    });
    
    const sixMonthsData = Array.from({ length: 6 }, (_, i) => {
      const primaryValue = Math.floor(Math.random() * 40) + 40;
      const secondaryValue = Math.floor(primaryValue * (0.5 + Math.random() * 0.3));
      return {
        value: primaryValue,
        secondaryValue: secondaryValue,
        label: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' })
      };
    });
    
    setClientGraphDatasets({
      week: weekData,
      month: monthData,
      sixMonths: sixMonthsData
    });
    
    setClientLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
  }, []); 

  // Handle tab change
  const changeTab = (tabId: string) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setAnimationCompleted(false);
    setActiveTab(tabId);
  };

  // Auto rotate tabs after animation completes
  useEffect(() => {
    // Only auto-rotate if not disabled and animation has completed
    if (animationCompleted && isClient && !disableAutoRotate) { 
      animationTimeoutRef.current = setTimeout(() => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        changeTab(tabs[nextIndex].id);
      }, 2000); 
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [animationCompleted, activeTab, isClient, disableAutoRotate]);

  // Effect to call external onAnimationComplete when appropriate
  useEffect(() => {
    if (animationCompleted && onExternalAnimationComplete && disableAutoRotate) {
      onExternalAnimationComplete();
    }
  }, [animationCompleted, onExternalAnimationComplete, disableAutoRotate]);

  // Animation controls
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const secondaryPathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2,
        delay: 0.3, // Slight delay for the blue line
        ease: "easeInOut"
      }
    }
  };

  const fillVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 1.5,
        duration: 1.5
      }
    }
  };

  const secondaryFillVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 1.8, // Slight delay for blue gradient
        duration: 1.5
      }
    }
  };

  // Calculate path data
  const width = 560;
  const height = 240;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  // Use client-side generated data if available, otherwise initial placeholders
  const currentData = (isClient ? clientGraphDatasets : initialGraphDataset)[activeTab as keyof typeof initialGraphDataset];
  
  // Create the primary line path (green)
  const points = currentData.map((point, i) => {
    const x = padding + (i * (chartWidth / (currentData.length - 1)));
    const y = height - padding - (point.value / 100 * chartHeight);
    return `${x},${y}`;
  }).join(' ');
  
  // Create path for primary line
  const linePath = `M ${points}`;

  // Create area path for primary line (gradient fill)
  const areaPath = `${linePath} L ${padding + chartWidth},${height - padding} L ${padding},${height - padding} Z`;

  // Create the secondary line path (blue)
  const secondaryPoints = currentData.map((point, i) => {
    const x = padding + (i * (chartWidth / (currentData.length - 1)));
    const y = height - padding - (point.secondaryValue / 100 * chartHeight);
    return `${x},${y}`;
  }).join(' ');
  
  // Create path for secondary line
  const secondaryLinePath = `M ${secondaryPoints}`;

  // Create area path for secondary line (gradient fill)
  const secondaryAreaPath = `${secondaryLinePath} L ${padding + chartWidth},${height - padding} L ${padding},${height - padding} Z`;

  // Animation completion handler for Framer Motion (internal)
  const handleInternalAnimationComplete = () => {
    if(isClient) setAnimationCompleted(true);
  };

  // Calculate totals based on the current dataset
  const calculateTotals = (data: typeof currentData) => {
    if (!data || data.length === 0) return { raised: 0, approved: 0 };
    
    return {
      raised: data.reduce((sum, point) => (sum + point.value)*10, 0),
      approved: data.reduce((sum, point) => (sum + point.secondaryValue)*10, 0)
    };
  };

  const totals = isClient ? calculateTotals(currentData) : { raised: 0, approved: 0 };

  // Animate count when totals change
  useEffect(() => {
    if (!isClient || (totals.raised === 0 && totals.approved === 0)) return;
    
    // Set initial values if first time
    if (displayedRaised === 0 && displayedApproved === 0) {
      setDisplayedRaised(totals.raised);
      setDisplayedApproved(totals.approved);
      return;
    }
    
    setAnimatingCount(true);
    
    // Animation settings
    const duration = 1000; // 1 second duration
    const frameRate = 60;
    const framesCount = duration / (1000 / frameRate);
    
    const startRaised = displayedRaised;
    const startApproved = displayedApproved;
    const diffRaised = totals.raised - startRaised;
    const diffApproved = totals.approved - startApproved;
    
    let frame = 0;
    
    // Clear any existing animation
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    const animateFrame = () => {
      if (frame >= framesCount) {
        setDisplayedRaised(totals.raised);
        setDisplayedApproved(totals.approved);
        setAnimatingCount(false);
        return;
      }
      
      // Easing function - ease out cubic: t * t * (3.0 - 2.0 * t)
      const progress = frame / framesCount;
      const easeProgress = progress * progress * (3.0 - 2.0 * progress);
      
      setDisplayedRaised(Math.round(startRaised + diffRaised * easeProgress));
      setDisplayedApproved(Math.round(startApproved + diffApproved * easeProgress));
      
      frame++;
      
      animationTimeoutRef.current = setTimeout(animateFrame, 1000 / frameRate);
    };
    
    animateFrame();
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isClient, totals.raised, totals.approved]);

  return (
    <motion.div 
      className="bg-background/70 backdrop-blur-md dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="p-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-slate-800 dark:text-neutral-200">Consent Trend</h3>
          
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

      {/* Description text */}
      <div className="px-4 pt-3">
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          Understand overall trend and day-wise performance of consents
        </p>
      </div>

      {/* Total metrics in modern tabs */}
      {isClient && (
        <div className="px-4 py-3 grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full border-4 border-blue-500 mr-2"></div>
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Total Raised</span>
            </div>
            <div className="mt-1">
              <span className={`text-2xl font-bold text-blue-600 dark:text-blue-300 ${animatingCount ? 'transition-all duration-75' : ''}`}>
                {displayedRaised.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full border-4 border-green-500 mr-2"></div>
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Total Approved</span>
            </div>
            <div className="mt-1">
              <span className={`text-2xl font-bold text-green-600 dark:text-green-300 ${animatingCount ? 'transition-all duration-75' : ''}`}>
                {displayedApproved.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${isClient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isClient && currentData && currentData.length > 0 && currentData[0].label !== '' ? (
              <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Graph grid lines */}
                {[0, 1, 2, 3, 4].map((line) => {
                  const y = padding + (line * (chartHeight / 4));
                  return (
                    <line 
                      key={`grid-${line}`}
                      x1={padding} 
                      y1={y} 
                      x2={width - padding} 
                      y2={y} 
                      stroke="#f4f4f4" 
                      strokeWidth="1" 
                      strokeDasharray="5,5"
                    />
                  );
                })}
                
                {/* X-axis labels */}
                {currentData.map((point, i) => {
                  if (point.label) {
                    const x = padding + (i * (chartWidth / (currentData.length - 1)));
                    return (
                      <text
                        key={`label-${i}`}
                        x={x}
                        y={height - 10} 
                        fill="#94a3b8" 
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {point.label}
                      </text>
                    );
                  }
                  return null;
                })}
                
                <defs>
                  {/* Primary (green) gradient */}
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                  </linearGradient>
                  
                  {/* Secondary (blue) gradient */}
                  <linearGradient id="secondaryAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3cd070" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3cd070" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* Secondary (blue) area */}
                <motion.path
                  d={secondaryAreaPath}
                  fill="url(#secondaryAreaGradient)"
                  variants={secondaryFillVariants}
                  initial="hidden"
                  animate="visible"
                />
                
                {/* Secondary (blue) line */}
                <motion.path
                  d={secondaryLinePath}
                  fill="none"
                  stroke="#00b140"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={secondaryPathVariants}
                  initial="hidden"
                  animate="visible"
                />
                
                {/* Primary (green) area */}
                <motion.path
                  d={areaPath}
                  fill="url(#areaGradient)"
                  variants={fillVariants}
                  initial="hidden"
                  animate="visible"
                />
                
                {/* Primary (green) line */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  onAnimationComplete={handleInternalAnimationComplete}
                />
                
                {/* Data points for primary (green) line */}
                {currentData.map((point, i) => {
                  const x = padding + (i * (chartWidth / (currentData.length - 1)));
                  const y = height - padding - (point.value / 100 * chartHeight);
                  return (
                    <motion.circle
                      key={`point-${i}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3b82f6"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 1.8 + (i * (0.8 / currentData.length)), 
                        duration: 0.3 
                      }}
                    />
                  );
                })}
                
                {/* Data points for secondary (blue) line */}
                {currentData.map((point, i) => {
                  const x = padding + (i * (chartWidth / (currentData.length - 1)));
                  const y = height - padding - (point.secondaryValue / 100 * chartHeight);
                  return (
                    <motion.circle
                      key={`secondary-point-${i}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#00b140"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 2.0 + (i * (0.8 / currentData.length)), 
                        duration: 0.3 
                      }}
                    />
                  );
                })}
              </svg>
            ) : (
              // Placeholder for SSR and initial client render before data is ready
              <div style={{ width: `${width}px`, height: `${height}px` }} className="w-full h-auto flex items-center justify-center text-slate-400">
                Loading graph...
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="p-4 dark:bg-neutral-800/50">


            {/* Legend with hollow circles - moved outside the SVG */}
            {isClient && currentData && currentData.length > 0 && currentData[0].label !== '' && (
              <div className="flex justify-center items-center space-x-6 pb-4">
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="#3b82f6" strokeWidth="4" />
                  </svg>
                  <span className="text-xs text-slate-600 dark:text-neutral-400">Consents Raised</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="#00b140" strokeWidth="4" />
                  </svg>
                  <span className="text-xs text-slate-600 dark:text-neutral-400">Consents Approved</span>
                </div>
              </div>
            )}
    
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-500 dark:text-neutral-400">
            Last updated: {isClient ? clientLastUpdated : ''}
          </div>
          <motion.div 
            className="text-sm font-medium text-green-600 dark:text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClient ? 1 : 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            {isClient && (activeTab === 'week' ? '+24% growth' : 
             activeTab === 'month' ? '+32% growth' : '+47% growth')}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}; 