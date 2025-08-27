'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PhoneScreenHeader } from './ui/PhoneScreenHeader';
import { PhoneScreenFooter } from './ui/PhoneScreenFooter';
import { BrandedConsentScreenBody, AccentColors, ConsentTerms, BrandedConsentScreenBodyProps } from './AnimatedScreenContent';
import Image from 'next/image';
import { Download } from 'lucide-react';

// Define MobilePe specific accent colors here for the journey
const mobilePeJourneyAccentColors: AccentColors = {
  text: 'text-purple-800 dark:text-purple-400',
  border: 'border-purple-800',
  backgroundLight: 'bg-purple-50 dark:bg-purple-900/30',
  sliderButtonBackground: 'bg-purple-800',
};

interface UserJourneyAnimationProps {
  onStageChange?: (stageIndex: number) => void;
  disableAutoTransitions?: boolean;
  jumpToStage?: number | null;
  onJumpComplete?: () => void;
}

// Updated JourneySubStep: Merged OTP steps
type JourneySubStep = 'otp-entry' | 'consent-initial' | 'consent-account-deselected' | 'consent-sliding' | 'success';

// New OtpEntryScreen component
interface OtpEntryScreenProps {
  phoneNumber: string;
  onOtpAnimationComplete: () => void; // Callback when OTP auto-fill is done
}

const OtpEntryScreen: React.FC<OtpEntryScreenProps> = React.memo(({ phoneNumber, onOtpAnimationComplete }) => {
  const [displayedOtp, setDisplayedOtp] = useState("");
  const otpRef = useRef<string>(""); // Use a ref to store the OTP for the current render cycle

  useEffect(() => {
    // Generate a random 6-digit OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpRef.current = randomOtp;
    setDisplayedOtp(""); // Reset OTP display

    let currentIndex = 0;
    const fillInterval = setInterval(() => {
      if (currentIndex < otpRef.current.length) {
        const charToAdd = otpRef.current[currentIndex];
        if (charToAdd !== undefined) { 
          setDisplayedOtp(prev => prev + charToAdd);
          currentIndex++;
        } else {
          console.error("OTP animation error: charToAdd is undefined");
          clearInterval(fillInterval);
          onOtpAnimationComplete(); 
        }
      } else {
        clearInterval(fillInterval);
        onOtpAnimationComplete();
      }
    }, 400); 

    return () => {
      clearInterval(fillInterval);
    };
  }, [onOtpAnimationComplete]);

  const commonInputStyle = "flex h-10 items-center rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm dark:border-neutral-600";
  const lightModeTextStyle = "text-slate-700"; // Base text color for light mode
  const darkModeTextStyle = "dark:text-slate-200"; // Base text color for dark mode
  const lightModeBgStyle = "bg-white"; // White background for light mode inputs
  const darkModeBgStyle = "dark:bg-neutral-700"; // Darker background for dark mode inputs

  return (
    <motion.div 
      className="w-full p-4 flex flex-col items-center justify-start flex-grow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center w-full max-w-xs mb-3">
        <div className="mb-2">
          <Image 
            src="/login-image.png" 
            alt="Secure Login Illustration" 
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Login to OneMoney</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
          Verify your mobile to share your account data
        </p>
      </div>
      
      <div className="w-full max-w-xs mb-3">
        <label htmlFor="phoneDisplayFixed" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          Mobile Number
        </label>
        <div 
          id="phoneDisplayFixed"
          className={cn(commonInputStyle, lightModeBgStyle, "dark:bg-neutral-800", lightModeTextStyle, darkModeTextStyle, "text-slate-500 dark:text-slate-400 bg-slate-50")}
        >
          {phoneNumber}
        </div>
      </div>

      {/* Single OTP Display Field */}
      <div className="w-full max-w-xs">
        <label htmlFor="otpDisplay" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          One-Time Password (OTP)
        </label>
        <div 
          id="otpDisplay"
          className={cn(
            commonInputStyle, 
            "bg-slate-50 dark:bg-neutral-800", 
            "text-slate-500 dark:text-slate-400", 
            "justify-start relative overflow-hidden"
          )}
          aria-live="polite"
          aria-label={`OTP value: ${displayedOtp}`}
        >
          <span className="tracking-[0.2em]">
            {otpRef.current.split('').map((digit, index) => (
              <span key={index} className={cn(index < displayedOtp.length ? 'opacity-100' : 'opacity-30')}>
                {index < displayedOtp.length ? displayedOtp[index] : '#'} 
              </span>
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

// Modified JourneyConsentScreen component for deselection animation
interface JourneyConsentScreenProps {
  currentSubStep: JourneySubStep; // To control deselection state
  // onDeselectionComplete?: () => void; // If UserJourneyAnimation needs to know
}

const JourneyConsentScreen: React.FC<JourneyConsentScreenProps> = React.memo(({ currentSubStep }) => {
  // State to manage deselection of the *second* account (Current Account)
  const [isCurrentAccountDeselected, setIsCurrentAccountDeselected] = useState(false);

  // Use the defined MobilePe accent colors
  const journeyAccentColors: AccentColors = mobilePeJourneyAccentColors;

  const journeyConsentTerms: ConsentTerms = {
    purpose: "Account Verification for Service Setup",
    duration: "One-time access",
    dateRange: [new Date().toLocaleDateString('en-CA'), new Date().toLocaleDateString('en-CA')] as [string, string],
    dataFetched: "Account details & balance",
  };
  
  // Props for BrandedConsentScreenBody, modified for deselection
  const brandedBodyProps: BrandedConsentScreenBodyProps = {
    accentColors: journeyAccentColors,
    consentTerms: journeyConsentTerms,
    bodyLogoSrc: "/HDFC.svg", 
    bodyBankName: "HDFC Bank", 
    externalFooter: true,
    isAccountADeselected: false, 
    isAccountBDeselected: isCurrentAccountDeselected, 
  };

  useEffect(() => {
    if (currentSubStep === 'consent-account-deselected') {
      // Trigger deselection after a short delay when this step becomes active
      const timer = setTimeout(() => {
        setIsCurrentAccountDeselected(true);
        // if (onDeselectionComplete) onDeselectionComplete(); // Call if parent needs to know
      }, 1000); // 1s delay before deselection animation starts
      return () => clearTimeout(timer);
    } else if (currentSubStep === 'consent-initial') {
      setIsCurrentAccountDeselected(false); // Ensure it's selected on initial view
    }
  }, [currentSubStep]);

  return (
    <motion.div
      className="w-full h-full flex-grow"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <BrandedConsentScreenBody {...brandedBodyProps} />
    </motion.div>
  );
});

interface StepConfig {
  headerTitle: string;
  footerMode: 'slider' | 'button' | 'none';
  footerButtonText?: string;
  footerIsDisabled?: boolean;
  footerInfoText?: string;
  footerSliderText?: string; 
  footerSliderAccentColor?: string;
  stageIndex: number; 
}

const journeyConfig: Record<JourneySubStep, StepConfig> = {
  'otp-entry': {
    headerTitle: 'Verify Mobile OTP',
    footerMode: 'button',
    footerButtonText: 'Continue',
    footerIsDisabled: true, 
    footerInfoText: "OneMoney is India's first RBI-regulated account aggregator",
    stageIndex: 0,
  },
  'consent-initial': {
    headerTitle: 'Confirm Consent',
    footerMode: 'slider',
    footerSliderText: 'Slide to Approve Consent',
    footerInfoText: 'By proceeding, you agree to share your financial statement.',
    footerSliderAccentColor: mobilePeJourneyAccentColors.sliderButtonBackground,
    stageIndex: 1,
  },
  'consent-account-deselected': {
    headerTitle: 'Confirm Consent',
    footerMode: 'slider',
    footerSliderText: 'Slide to Approve Consent',
    footerInfoText: 'By proceeding, you agree to share your financial statement.',
    footerSliderAccentColor: mobilePeJourneyAccentColors.sliderButtonBackground,
    stageIndex: 1,
  },
  'consent-sliding': { 
    headerTitle: 'Confirming...',
    footerMode: 'slider',
    footerSliderText: 'Slide to Approve Consent',
    footerInfoText: 'By proceeding, you agree to share your financial statement.',
    footerSliderAccentColor: mobilePeJourneyAccentColors.sliderButtonBackground,
    stageIndex: 2,
  },
  'success': {
    headerTitle: 'Confirmation',
    footerMode: 'none',
    stageIndex: 2,
  },
};

export const UserJourneyAnimation: React.FC<UserJourneyAnimationProps> = ({ 
  onStageChange, 
  disableAutoTransitions = false, 
  jumpToStage,
  onJumpComplete
}) => {
  const [currentSubStep, setCurrentSubStep] = useState<JourneySubStep>('otp-entry');
  const [isVerificationEnabled, setIsVerificationEnabled] = useState(false);
  const autoProceedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const consentTimers = useRef<{ deselection?: NodeJS.Timeout, sliding?: NodeJS.Timeout, deselectionAction?: NodeJS.Timeout }>({}); // Added deselectionAction timer
  const screenContentRef = useRef<HTMLDivElement>(null); // Ref for the scrollable content area
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null); // Ref for the scroll timer

  const currentConfig = journeyConfig[currentSubStep];
  const actualFooterIsDisabled = currentSubStep === 'otp-entry' ? !isVerificationEnabled : currentConfig.footerIsDisabled;

  // Effect to handle jumping to a specific stage
  useEffect(() => {
    if (jumpToStage !== null && jumpToStage !== undefined) {
      // Clear all existing timers first
      clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
      clearTimeout(consentTimers.current.deselection as NodeJS.Timeout);
      clearTimeout(consentTimers.current.sliding as NodeJS.Timeout);
      clearTimeout(consentTimers.current.deselectionAction as NodeJS.Timeout);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // Reset relevant states
      setIsVerificationEnabled(false);
      // Potentially reset other states if they persist across stages and shouldn't

      let targetSubStep: JourneySubStep = 'otp-entry';
      if (jumpToStage === 0) {
        targetSubStep = 'otp-entry';
      } else if (jumpToStage === 1) {
        targetSubStep = 'consent-initial';
      } else if (jumpToStage === 2) {
        targetSubStep = 'consent-sliding'; // Or 'success' if preferred, but sliding shows action
      }
      setCurrentSubStep(targetSubStep);

      if (onJumpComplete) {
        onJumpComplete(); // Signal parent that jump has been processed
      }
    }
  }, [jumpToStage, onJumpComplete]);

  const memoizedOnStageChange = useCallback(() => {
    if (onStageChange) {
      onStageChange(currentConfig.stageIndex);
    }
  }, [onStageChange, currentConfig.stageIndex]);

  // New callback for when slide animation finishes
  const handleSlideComplete = useCallback(() => {
    setCurrentSubStep('success');
  }, []);

  useEffect(() => {
    memoizedOnStageChange();

    // Clear any existing auto-proceed timers
    clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
    clearTimeout(consentTimers.current.deselection as NodeJS.Timeout);
    clearTimeout(consentTimers.current.sliding as NodeJS.Timeout);
    clearTimeout(consentTimers.current.deselectionAction as NodeJS.Timeout);

    // Logic for each step
    if (currentSubStep === 'otp-entry') {
      if (isVerificationEnabled && !disableAutoTransitions) {
        autoProceedTimerRef.current = setTimeout(() => {
          setCurrentSubStep('consent-initial');
          setIsVerificationEnabled(false); 
        }, 2000); 
      }
    } else if (currentSubStep === 'consent-initial') {
      if (!disableAutoTransitions) {
        consentTimers.current.deselection = setTimeout(() => {
          setCurrentSubStep('consent-account-deselected');
        }, 2500); 
      }
    } else if (currentSubStep === 'consent-account-deselected') {
      if (!disableAutoTransitions) {
        consentTimers.current.sliding = setTimeout(() => {
          setCurrentSubStep('consent-sliding');
        }, 2200); 
      }
    }

    // Scroll to top of the phone screen content area when sub-step changes,
    // deferred to prevent interference with page scroll.
    if (screenContentRef.current) {
      // Clear any existing scroll timer before setting a new one
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = setTimeout(() => {
        if (screenContentRef.current) { // Re-check ref in case of unmount
          screenContentRef.current.scrollTop = 0;
        }
      }, 0);
      // It's good practice to clear this timeout if the component unmounts or dependencies change before it runs.
      // For simplicity in this change, we're relying on the main useEffect cleanup.
      // A more robust way would be to store `scrollTimer` in a ref and clear it in the return function.
    }

    return () => {
      clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
      clearTimeout(consentTimers.current.deselection as NodeJS.Timeout);
      clearTimeout(consentTimers.current.sliding as NodeJS.Timeout);
      clearTimeout(consentTimers.current.deselectionAction as NodeJS.Timeout);
      // If scrollTimer was stored in a ref, clear it here too.
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [currentSubStep, memoizedOnStageChange, isVerificationEnabled, disableAutoTransitions]);

  const handleOtpAnimationComplete = useCallback(() => {
    setIsVerificationEnabled(true);
    clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
    if (!disableAutoTransitions) {
      autoProceedTimerRef.current = setTimeout(() => {
        setCurrentSubStep('consent-initial');
      }, 2000); // Changed from 3000ms to 2000ms
    }
  }, [disableAutoTransitions]);

  // This function now primarily serves the OTP button, slider is automated.
  const handleFooterAction = useCallback(() => {
    if (currentSubStep === 'otp-entry' && isVerificationEnabled) {
      clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
      setCurrentSubStep('consent-initial'); 
    }
  }, [currentSubStep, isVerificationEnabled]);

  const handleRestartJourney = useCallback(() => {
    // Clear all existing timers
    clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
    clearTimeout(consentTimers.current.deselection as NodeJS.Timeout);
    clearTimeout(consentTimers.current.sliding as NodeJS.Timeout);
    clearTimeout(consentTimers.current.deselectionAction as NodeJS.Timeout);
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    // Reset relevant states
    setIsVerificationEnabled(false);
    // Set currentSubStep to the beginning
    setCurrentSubStep('otp-entry');
    // The main useEffect watching currentSubStep will handle calling onStageChange
  }, []); // No dependencies needed as it's resetting to initial state constants

  const renderScreenContent = () => {
    switch (currentSubStep) {
      case 'otp-entry':
        return <OtpEntryScreen key="otp-entry" phoneNumber="+91 98765 43210" onOtpAnimationComplete={handleOtpAnimationComplete} />;
      case 'consent-initial':
      case 'consent-account-deselected': 
        // Use a consistent key for the consent stage to prevent re-animating the screen slide,
        // JourneyConsentScreen will handle internal changes based on the currentSubStep prop.
        return <JourneyConsentScreen key="consent-screen" currentSubStep={currentSubStep} />;
      case 'consent-sliding':
        // Also render JourneyConsentScreen during sliding, key is the same to keep it mounted.
        // The footer will indicate processing via its slide animation.
        return <JourneyConsentScreen key="consent-screen" currentSubStep={currentSubStep} />;
      case 'success':
         return (
          <motion.div 
            key="success"
            className="p-4 text-center flex-grow flex flex-col items-center justify-center space-y-4"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3 }}
          >
            <Image 
              src="/success-screen (1).png" 
              alt="Consent Approved Illustration" 
              width={80} 
              height={80} 
              className="mx-auto mb-2"
            />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Consent Approved</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Thank you for sharing consent.</p>
            
          </motion.div>
        );
      default:
        return <motion.div key={currentSubStep} className="p-4 text-center flex-grow flex items-center justify-center">Screen for {currentSubStep}</motion.div>;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-neutral-900 overflow-hidden">
      <PhoneScreenHeader 
        title="MobilePe"
        logoSrc="/mobilepelogo.svg" 
        altText="MobilePe Logo"
        gradientClass="bg-gradient-to-r from-[#5A2989] to-[#22152E]" 
        activeKey={currentSubStep}
        animateTransition={false}
        showBackButton={currentSubStep !== 'otp-entry'} 
        showMoreButton={true}
      />
      
      <div ref={screenContentRef} className="flex-grow overflow-y-auto relative flex flex-col">
        <AnimatePresence mode="wait">
          {renderScreenContent()} 
        </AnimatePresence>
      </div>

      <PhoneScreenFooter 
        mode={currentConfig.footerMode}
        infoText={currentConfig.footerInfoText}
        sliderText={currentConfig.footerSliderText}
        sliderAccentColor={currentConfig.footerSliderAccentColor || 'bg-green-500'} 
        isSliderProcessing={currentSubStep === 'consent-sliding'}
        onSlideAnimationComplete={handleSlideComplete}
        buttonText={currentConfig.footerButtonText}
        onButtonClick={handleFooterAction} 
        isButtonDisabled={actualFooterIsDisabled} 
        buttonAccentColor="bg-[#5A2989] text-white"
        showPoweredBy={true}
      />
    </div>
  );
};

OtpEntryScreen.displayName = "OtpEntryScreen";
JourneyConsentScreen.displayName = "JourneyConsentScreen"; 