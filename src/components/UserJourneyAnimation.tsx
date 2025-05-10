'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PhoneScreenHeader } from './ui/PhoneScreenHeader';
import { PhoneScreenFooter } from './ui/PhoneScreenFooter';
import { BrandedConsentScreenBody, AccentColors, ConsentTerms, BrandedConsentScreenBodyProps } from './AnimatedScreenContent';

// JourneyInput and JourneyButton are no longer used in this component, can be removed.

interface UserJourneyAnimationProps {
  onStageChange?: (stageIndex: number) => void;
}

// Updated JourneySubStep: Merged OTP steps
type JourneySubStep = 'otp-entry' | 'consent-initial' | 'consent-account-deselected' | 'consent-sliding' | 'success';

// New OtpEntryScreen component
interface OtpEntryScreenProps {
  phoneNumber: string;
  onOtpAnimationComplete: () => void; // Callback when OTP auto-fill is done
}

const OtpEntryScreen: React.FC<OtpEntryScreenProps> = ({ phoneNumber, onOtpAnimationComplete }) => {
  const [displayedOtp, setDisplayedOtp] = useState("");
  const demoOtp = "123456"; // Target OTP

  useEffect(() => {
    setDisplayedOtp(""); // Reset OTP display on mount or when key changes
    let currentIndex = 0;
    const fillInterval = setInterval(() => {
      if (currentIndex < demoOtp.length) {
        const charToAdd = demoOtp[currentIndex];
        // Defensive check: Ensure charToAdd is not undefined (should not happen with correct bounds)
        if (charToAdd !== undefined) { 
          setDisplayedOtp(prev => prev + charToAdd);
          currentIndex++;
        } else {
          // This case should ideally not be reached if logic is correct
          console.error("OTP animation error: charToAdd is undefined");
          clearInterval(fillInterval);
          onOtpAnimationComplete(); // Still call complete to unblock UI
        }
      } else {
        clearInterval(fillInterval);
        onOtpAnimationComplete();
      }
    }, 400); // Animation speed: 400ms per digit

    return () => {
      clearInterval(fillInterval);
    };
  // onOtpAnimationComplete is memoized by parent. demoOtp is constant.
  }, [onOtpAnimationComplete, demoOtp]);

  const commonInputStyle = "flex h-10 items-center rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm dark:border-neutral-600";
  const lightModeTextStyle = "text-slate-700"; // Base text color for light mode
  const darkModeTextStyle = "dark:text-slate-200"; // Base text color for dark mode
  const lightModeBgStyle = "bg-white"; // White background for light mode inputs
  const darkModeBgStyle = "dark:bg-neutral-700"; // Darker background for dark mode inputs

  return (
    <motion.div 
      className="w-full p-6 flex flex-col items-center justify-center flex-grow space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center w-full max-w-xs">
        {/* Title is now in PhoneScreenHeader */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Enter the 6-digit OTP sent to your mobile number.
        </p>
      </div>
      
      <div className="w-full max-w-xs mb-3">
        <label htmlFor="phoneDisplayFixed" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          Mobile Number
        </label>
        <div 
          id="phoneDisplayFixed"
          className={cn(commonInputStyle, lightModeBgStyle, "dark:bg-neutral-800", lightModeTextStyle, darkModeTextStyle, "text-slate-500 dark:text-slate-400 bg-slate-100")}
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
          className={cn(commonInputStyle, lightModeBgStyle, darkModeBgStyle, lightModeTextStyle, darkModeTextStyle, "justify-start relative overflow-hidden min-h-[2.5rem]")}
          aria-live="polite"
          aria-label={`OTP value: ${displayedOtp}`}
        >
          <span className="tracking-[0.2em] text-base font-medium"> 
            {demoOtp.split('').map((digit, index) => (
              <span key={index} className={cn(index < displayedOtp.length ? 'opacity-100' : 'opacity-30')}>
                {index < displayedOtp.length ? displayedOtp[index] : '·'} 
              </span>
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Modified JourneyConsentScreen component for deselection animation
interface JourneyConsentScreenProps {
  currentSubStep: JourneySubStep; // To control deselection state
  // onDeselectionComplete?: () => void; // If UserJourneyAnimation needs to know
}

const JourneyConsentScreen: React.FC<JourneyConsentScreenProps> = ({ currentSubStep }) => {
  // State to manage deselection of the *second* account (Current Account)
  const [isCurrentAccountDeselected, setIsCurrentAccountDeselected] = useState(false);

  const journeyAccentColors: AccentColors = {
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-500',
    backgroundLight: 'bg-sky-50 dark:bg-sky-900/30',
    sliderButtonBackground: 'bg-sky-600', 
  };

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
};

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
    footerInfoText: 'An OTP is being auto-filled for verification.',
    stageIndex: 0,
  },
  'consent-initial': {
    headerTitle: 'Confirm Consent',
    footerMode: 'slider',
    footerSliderText: 'Slide to Approve Consent',
    footerInfoText: 'By proceeding, you agree to share your financial statement.',
    footerSliderAccentColor: 'bg-sky-600',
    stageIndex: 1,
  },
  'consent-account-deselected': {
    headerTitle: 'Confirm Consent',
    footerMode: 'slider',
    footerSliderText: 'Slide to Approve Consent',
    footerInfoText: 'By proceeding, you agree to share your financial statement.',
    footerSliderAccentColor: 'bg-sky-600',
    stageIndex: 1,
  },
  'consent-sliding': { 
    headerTitle: 'Confirming...',
    footerMode: 'slider',
    footerSliderText: 'Slide to Approve Consent',
    footerInfoText: 'By proceeding, you agree to share your financial statement.',
    footerSliderAccentColor: 'bg-sky-600',
    stageIndex: 2,
  },
  'success': {
    headerTitle: 'Confirmation',
    footerMode: 'none',
    stageIndex: 2,
  },
};

export const UserJourneyAnimation: React.FC<UserJourneyAnimationProps> = ({ onStageChange }) => {
  const [currentSubStep, setCurrentSubStep] = useState<JourneySubStep>('otp-entry');
  const [isVerificationEnabled, setIsVerificationEnabled] = useState(false);
  const autoProceedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const consentTimers = useRef<{ deselection?: NodeJS.Timeout, sliding?: NodeJS.Timeout, deselectionAction?: NodeJS.Timeout }>({}); // Added deselectionAction timer
  const screenContentRef = useRef<HTMLDivElement>(null); // Ref for the scrollable content area

  const currentConfig = journeyConfig[currentSubStep];
  const actualFooterIsDisabled = currentSubStep === 'otp-entry' ? !isVerificationEnabled : currentConfig.footerIsDisabled;

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
      if (isVerificationEnabled) {
        autoProceedTimerRef.current = setTimeout(() => {
          setCurrentSubStep('consent-initial');
          setIsVerificationEnabled(false); 
        }, 2000); 
      }
    } else if (currentSubStep === 'consent-initial') {
      consentTimers.current.deselection = setTimeout(() => {
        setCurrentSubStep('consent-account-deselected');
      }, 2500); 
    } else if (currentSubStep === 'consent-account-deselected') {
       consentTimers.current.sliding = setTimeout(() => {
        setCurrentSubStep('consent-sliding');
      }, 2200); 
    }

    // Scroll to top of the phone screen content area when sub-step changes,
    // deferred to prevent interference with page scroll.
    if (screenContentRef.current) {
      const scrollTimer = setTimeout(() => {
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
    };
  }, [currentSubStep, memoizedOnStageChange, isVerificationEnabled]);

  const handleOtpAnimationComplete = useCallback(() => {
    setIsVerificationEnabled(true);
    clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
    autoProceedTimerRef.current = setTimeout(() => {
      setCurrentSubStep('consent-initial');
    }, 2000); // Changed from 3000ms to 2000ms
  }, []); 

  // This function now primarily serves the OTP button, slider is automated.
  const handleFooterAction = useCallback(() => {
    if (currentSubStep === 'otp-entry' && isVerificationEnabled) {
      clearTimeout(autoProceedTimerRef.current as NodeJS.Timeout);
      setCurrentSubStep('consent-initial'); 
    }
    // Slider action is now fully automated by useEffect timers.
    // Kept else-if structure in case of future manual override needs for slider.
    // else if (currentSubStep === 'consent-initial' || currentSubStep === 'consent-account-deselected') {
    //   clearTimeout(consentTimers.current.deselection as NodeJS.Timeout);
    //   clearTimeout(consentTimers.current.sliding as NodeJS.Timeout);
    //   setCurrentSubStep('consent-sliding');
    //   consentTimers.current.sliding = setTimeout(() => setCurrentSubStep('success'), 1500);
    // }
  }, [currentSubStep, isVerificationEnabled]);

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
         return <motion.div key="success" className="p-4 text-center flex-grow flex items-center justify-center">Success Screen Placeholder</motion.div>;
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
        showMoreButton={false} 
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
        buttonAccentColor="bg-green-600 text-white" 
        showPoweredBy={true}
      />
    </div>
  );
}; 