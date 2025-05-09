'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, MoreVertical, CheckSquare, Square, PlusCircle, ChevronDown, ChevronRight, ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface AccentColors {
  text: string; // e.g., "text-purple-600 dark:text-purple-400"
  border: string; // e.g., "border-purple-500"
  backgroundLight: string; // e.g., "bg-purple-50 dark:bg-purple-900/30"
  // Could add more specific button colors if needed, e.g. slider button background
  sliderButtonBackground?: string; // e.g. "bg-purple-600"
}

interface ConsentTerms {
  purpose: string;
  duration: string;
  dateRange: [string, string];
  dataFetched: string;
  // Potentially add other fields if they vary by brand
}

interface ScreenBodyProps {
  accentColors: AccentColors;
  consentTerms: ConsentTerms;
}

// New interface for the consolidated body component
interface BrandedConsentScreenBodyProps extends ScreenBodyProps {
  bodyLogoSrc: string;
  bodyBankName: string;
}

// Original headerData is replaced by screenData
// const headerData = [ ... ];

// New variants for header items, now matching textVariants from BrandedConsentScreenBody
const headerItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeInOut" } },
};

// Unified BrandedConsentScreenBody component
const BrandedConsentScreenBody: React.FC<BrandedConsentScreenBodyProps> = ({ accentColors, consentTerms, bodyLogoSrc, bodyBankName }) => {
  // Content copied from former MobilePeConsentScreenBody, adapted to use new props
  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const itemGroupVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="text-xs text-slate-700 dark:text-slate-300 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden">
        <h2 className="text-base font-semibold text-center mb-1.5 text-slate-800 dark:text-slate-100">Consent to share</h2>
        <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 mb-3">Choose Account where you receive salary:</p>
        
        <div className="mb-3 p-2.5 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <AnimatePresence mode="wait">
            <motion.div 
              key={bodyBankName} // Keyed by bank name to trigger animation on change
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center mb-2.5"
            >
              <Image src={bodyLogoSrc} alt={`${bodyBankName} Logo`} width={16} height={16} className="mr-2" />
              <span className="font-medium text-xs text-slate-800 dark:text-slate-100">{bodyBankName}</span>
            </motion.div>
          </AnimatePresence>
          
          <div className="space-y-2.5">
            <div className={cn("flex items-center p-2 rounded-lg border-1", accentColors.border)}>
              <CheckSquare className={cn("h-4 w-4 mr-2 flex-shrink-0", accentColors.text)} />
              <div>
                <p className="font-medium text-sm text-slate-800 dark:text-slate-100">Savings Account</p>
                {/* Account numbers can be made dynamic via props if they change per brand too */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400">XXXXXXXX4001</p>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-md border border-slate-300 dark:border-neutral-700">
              <Square className="h-4 w-4 text-slate-400 dark:text-neutral-500 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-slate-700 dark:text-slate-300">Current Account</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">XXXXXXXX4651</p>
              </div>
            </div>
          </div>
          <button className={cn("flex items-center justify-center w-full pt-1 mt-2 transition-colors duration-700 ease-in-out", accentColors.text)}>
            <PlusCircle className="h-4 w-4 mr-1.5" />
            <span className="text-xs">Link More Accounts</span>
          </button>
        </div>

        <div className="w-full text-[11px] mb-3 border border-slate-200 dark:border-neutral-600 rounded-md">
          <div className="flex justify-between items-start py-2 px-2 border-b border-slate-200 dark:border-neutral-700">
            <div className="pr-2 text-slate-500 dark:text-slate-400">PURPOSE</div>
            <div className="pl-2 font-medium text-slate-700 dark:text-slate-200 text-right">
              <AnimatePresence mode="wait">
                <motion.span key={`purpose-${consentTerms.purpose}`} variants={textVariants} initial="initial" animate="animate" exit="exit" className="inline-block">
                  {consentTerms.purpose}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="py-2 px-2 border-b border-slate-200 dark:border-neutral-700">
            <div className="flex justify-between items-center">
              <div className="pr-2 text-slate-500 dark:text-slate-400">DURATION</div>
              <div className="pl-2 font-medium text-slate-700 dark:text-slate-200 text-right">
                <AnimatePresence mode="wait">
                  <motion.span key={`duration-${consentTerms.duration}`} variants={textVariants} initial="initial" animate="animate" exit="exit" className="inline-block">
                    {consentTerms.duration}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="mt-1.5 bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300 text-[10px] whitespace-nowrap w-full flex justify-between items-center">
              <AnimatePresence mode="wait">
                <motion.span key={`daterange-start-${consentTerms.dateRange[0]}`} variants={textVariants} initial="initial" animate="animate" exit="exit" className="px-1 inline-block">
                  {consentTerms.dateRange[0]}
                </motion.span>
              </AnimatePresence>
              <div className="flex-grow h-px bg-slate-400 dark:bg-neutral-600 mx-2"></div>
              <AnimatePresence mode="wait">
                <motion.span key={`daterange-end-${consentTerms.dateRange[1]}`} variants={textVariants} initial="initial" animate="animate" exit="exit" className="px-1 inline-block">
                  {consentTerms.dateRange[1]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-between items-start py-2 px-2">
            <div className="pr-2 text-slate-500 dark:text-slate-400">DATA FETCHED</div>
            <div className="pl-2 font-medium text-slate-700 dark:text-slate-200 text-right">
              <AnimatePresence mode="wait">
                <motion.span key={`datafetched-${consentTerms.dataFetched}`} variants={textVariants} initial="initial" animate="animate" exit="exit" className="inline-block">
                  {consentTerms.dataFetched}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <button className={cn("flex items-center justify-center w-full py-1.5 mb-2 text-[11px] font-medium transition-colors duration-700 ease-in-out", accentColors.text)}>
          <span>VIEW CONSENT DETAILS</span>
          <ChevronDown className="h-3.5 w-3.5 ml-1" />
        </button>
      </div>
      
      <div className="bg-white dark:bg-neutral-800 p-2 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] rounded-t-md">
         <p className="text-[7px] text-center text-slate-500 dark:text-slate-400 mb-1.5">By proceeding, you agree to share your financial statement</p>
         <div className="flex items-center justify-between bg-slate-100 dark:bg-neutral-700 rounded-md mt-2 mb-2 cursor-pointer h-10">
            <div className={cn("h-8 w-8 ml-1 flex items-center justify-center px-1.5 rounded-sm transition-colors duration-700 ease-in-out", accentColors.sliderButtonBackground)}>
               <ChevronsRight className="h-4 w-4 text-white" />
            </div>
            <span className="flex-grow text-center text-xs font-medium text-slate-700 dark:text-slate-200">Slide to Approve Consent</span>
         </div>
        <div className="flex items-center justify-center text-[9px] text-slate-400 dark:text-slate-500 mt-2 mb-1">
          <span>powered by</span>
          <Image src="/om-logo.svg" alt="OneMoney Logo" width={50} height={12} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

const screenData = [
  {
    id: 'mobilepe',
    logoSrc: '/mobilepelogo.svg', // This is for the main header
    title: 'MOBILEPE', // This is for the main header
    altText: 'MobilePe Logo',
    gradientClass: 'bg-gradient-to-r from-[#5A2989] to-[#22152E]',
    // New props for body content
    bodyLogoSrc: '/mobilepelogo.svg',
    bodyBankName: 'MOBILEPE',
    accentColors: {
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500',
      backgroundLight: 'bg-purple-50 dark:bg-purple-900/30',
      sliderButtonBackground: 'bg-purple-600',
    },
    consentTerms: {
      purpose: "Income Verification",
      duration: "1 year",
      dateRange: ["Jun 20,2023", "Jun 20,2024"] as [string, string],
      dataFetched: "Once",
    }
  },
  {
    id: 'homebank',
    logoSrc: '/homebanklogo.svg', // This is for the main header
    title: 'HOME Bank', // This is for the main header
    altText: 'HOME Bank Logo',
    gradientClass: 'bg-gradient-to-r from-orange-500 to-orange-800',
    // New props for body content
    bodyLogoSrc: '/homebanklogo.svg',
    bodyBankName: 'HOME Bank',
    accentColors: {
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-500',
      backgroundLight: 'bg-orange-50 dark:bg-orange-900/30',
      sliderButtonBackground: 'bg-orange-600',
    },
    consentTerms: {
      purpose: "Loan Application",
      duration: "6 months",
      dateRange: ["Jul 01,2023", "Jan 01,2024"] as [string, string],
      dataFetched: "Multiple times",
    }
  },
  // New Kred variant
  {
    id: 'kred',
    logoSrc: '/kred.svg',
    title: 'KRED',
    altText: 'Kred Logo',
    gradientClass: 'bg-gradient-to-r from-neutral-600 to-neutral-800',
    bodyLogoSrc: '/kred.svg',
    bodyBankName: 'KRED',
    accentColors: {
      text: 'text-neutral-700 dark:text-neutral-300',
      border: 'border-neutral-500',
      backgroundLight: 'bg-neutral-200 dark:bg-neutral-700/50',
      sliderButtonBackground: 'bg-neutral-700',
    },
    consentTerms: {
      purpose: "Credit Line Approval",
      duration: "6 months",
      dateRange: ["Sep 01,2023", "Mar 01,2024"] as [string, string],
      dataFetched: "As needed",
    }
  }
];

export const AnimatedScreenContent: React.FC = () => {
  const [activeHeaderIndex, setActiveHeaderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveHeaderIndex((prevIndex) => (prevIndex + 1) % screenData.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  const currentScreen = screenData[activeHeaderIndex];

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-neutral-900 text-slate-800 dark:text-slate-200 overflow-hidden">
      <div
        className={cn(
          'w-full px-4 flex items-center justify-between text-white shadow-md pt-6 overflow-hidden',
          'transition-colors duration-700 ease-in-out',
          currentScreen.gradientClass
        )}
        style={{ height: '68px' }}
      >
        <div className="flex items-center gap-x-1.5">
          <ArrowLeft className="h-5 w-5 flex-shrink-0 z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHeaderIndex}
              className="flex items-center gap-x-2"
              variants={headerItemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image 
                src={currentScreen.logoSrc}
                alt={currentScreen.altText}
                width={16} 
                height={16} 
                className="flex-shrink-0"
              />
              <span className="font-bold text-md whitespace-nowrap">{currentScreen.title}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <MoreVertical className="h-5 w-5 flex-shrink-0 z-10" />
      </div>

      {/* Dynamically Rendered Body Content */}
      <div className="flex-grow overflow-y-auto relative">
        {/* AnimatePresence and motion.div for the whole body block removed/neutralized for now */}
        {/* The BrandedConsentScreenBody itself is NOT a motion component yet */}
        <BrandedConsentScreenBody 
          accentColors={currentScreen.accentColors}
          consentTerms={currentScreen.consentTerms}
          bodyLogoSrc={currentScreen.bodyLogoSrc}
          bodyBankName={currentScreen.bodyBankName}
        />
      </div>
    </div>
  );
}; 