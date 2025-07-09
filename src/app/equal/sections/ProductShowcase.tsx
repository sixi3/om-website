'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, Fingerprint, LayoutDashboard, Send, UploadCloud, FileCheck, ShieldCheck, Link as LinkIcon, Settings, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GreenMetallicPhoneMockup } from '../components/ui/GreenMetallicPhoneMockup';
import { AnimatedVerificationFlow } from '../components/AnimatedVerificationFlow';
import Image from 'next/image';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const productsData = [
  {
    id: 'gateway',
    title: 'Identity Verification Gateway',
    description: 'One gateway to verify all candidate identities — instantly.',
    icon: <ShieldCheck size={28} className="text-green-500" />,
    heroHeadline: 'One Gateway to Verify All Candidate Identities — Instantly',
    heroSubheadline: "Equal's Identity Verification Gateway (IDG) is your digital front door for onboarding. Collect, verify, and confirm identity documents from any user in real-time — no coding, no chasing.",
    features: [
      { icon: <Send />, text: 'Multi-Channel Candidate Access (WhatsApp, SMS, Email)' },
      { icon: <UploadCloud />, text: 'Real-Time Document Upload & Validation' },
      { icon: <FileCheck />, text: 'Smart Document Parsing (OCR & AI)' },
      { icon: <ShieldCheck />, text: 'Secure Consent Capture with Audit Trails' },
    ],
    cta: { text: 'Learn About Gateway', href: '/equal/products/identity-gateway' },
  },
  {
    id: 'console',
    title: 'Equal Console',
    description: 'Your single pane of glass for all background verifications.',
    icon: <LayoutDashboard size={28} className="text-green-500" />,
    heroHeadline: 'Your Single Pane of Glass for All Background Verifications',
    heroSubheadline: 'The Equal Console is your real-time dashboard to monitor candidate progress, resolve issues, generate reports, and manage bulk hiring — all in one place.',
    features: [
        { icon: <LayoutDashboard />, text: 'Real-time dashboard to monitor candidate progress' },
        { icon: <Fingerprint />, text: 'Resolve issues and manage bulk hiring' },
        { icon: <LinkIcon />, text: 'Export to Darwinbox, Workday, SAP' },
        { icon: <Settings />, text: 'Connect BI dashboards (PowerBI, Tableau)' },
    ],
    cta: { text: 'Learn About Console', href: '/equal/products/console' },
  },
];

const FeatureItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <motion.li 
        className="flex items-center gap-4 text-slate-700 dark:text-slate-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
    >
        <span className="text-green-500">{icon}</span>
        <span>{text}</span>
    </motion.li>
);



export function ProductShowcase() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const activeProduct = productsData[activeProductIndex];
  const PROGRESS_DURATION_S = 8; // Duration for each product showcase

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint is 768px
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-progression logic
  useEffect(() => {
    if (!hasBeenInView) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
        const nextIndex = (activeProductIndex + 1) % productsData.length;
        setActiveProductIndex(nextIndex);
        setProgressKey(prev => prev + 1);
    }, PROGRESS_DURATION_S * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeProductIndex, hasBeenInView]);

  const handleProductChange = useCallback((index: number) => {
    setActiveProductIndex(index);
    setProgressKey(prev => prev + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    const prevIndex = activeProductIndex === 0 ? productsData.length - 1 : activeProductIndex - 1;
    handleProductChange(prevIndex);
  }, [activeProductIndex, handleProductChange]);

  const handleNext = useCallback(() => {
    const nextIndex = (activeProductIndex + 1) % productsData.length;
    handleProductChange(nextIndex);
  }, [activeProductIndex, handleProductChange]);
  
  return (
    <motion.section 
      id="products"
      className="relative w-full py-12 md:py-20"
      onViewportEnter={() => setHasBeenInView(true)}
      viewport={{ once: true, amount: 0.2 }}
    >
        
        <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
                <span className={metallicBlackTextClasses}>One Platform, Two</span>{" "}
                <span className={highlightBgClass}>
                Powerful 
                </span>
                {" "}<span className={metallicBlackTextClasses}>Tools</span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300">
                Seamless verification and smart oversight, together.
            </p>
            </div>

            {/* Main content container */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Panel: Product Navigation (Desktop) / Top Panel (Mobile) */}
                <div className="w-full lg:w-1/3">
                    {isSmallScreen ? (
                        // Mobile: Single product card with pagination
                        <div className="space-y-6">
                            {/* Single Product Card Carousel */}
                            <div className="relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProductIndex}
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={{ x: "0%", opacity: 1 }}
                                        exit={{ x: "-100%", opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        onClick={() => handleProductChange(activeProductIndex)}
                                        className={cn(
                                            'p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out',
                                            'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-[#00b140]/20 dark:border-neutral-600'
                                        )}
                                    >
                                        <div className="mb-3">{activeProduct.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-green-400">
                                            {activeProduct.title}
                                        </h3>
                                        <p className="text-sm mb-4 text-slate-700 dark:text-neutral-300">
                                            {activeProduct.description}
                                        </p>
                                        <div className="mt-auto h-1.5 w-full rounded-full overflow-hidden bg-slate-200/80 dark:bg-neutral-700/80">
                                            <motion.div
                                                key={`mobile-card-progress-${progressKey}`}
                                                className="h-full bg-green-500"
                                                initial={{ width: "0%" }}
                                                animate={hasBeenInView ? { width: "100%" } : { width: "0%" }}
                                                transition={{ duration: hasBeenInView ? PROGRESS_DURATION_S : 0, ease: "linear" }}
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Pagination controls */}
                            <div className="flex items-center justify-center gap-4">
                                <button 
                                    onClick={handlePrevious}
                                    className="p-2 rounded-full bg-background/10 backdrop-blur-md border border-[#00b140]/20 dark:border-neutral-700 hover:bg-[#00b140]/10 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                </button>
                                
                                <div className="flex gap-2">
                                    {productsData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleProductChange(index)}
                                            className={cn(
                                                "w-3 h-3 rounded-full transition-all duration-300",
                                                index === activeProductIndex 
                                                    ? "bg-green-500 scale-125" 
                                                    : "bg-slate-300 dark:bg-neutral-600 hover:bg-slate-400 dark:hover:bg-neutral-500"
                                            )}
                                        />
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={handleNext}
                                    className="p-2 rounded-full bg-background/10 backdrop-blur-md border border-[#00b140]/20 dark:border-neutral-700 hover:bg-[#00b140]/10 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Desktop: Product cards
                        <div className="space-y-4">
                        {productsData.map((product, index) => {
                            const isActive = activeProductIndex === index;
                            return (
                            <motion.div
                                key={product.id}
                                onClick={() => handleProductChange(index)}
                                className={cn(
                                'p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out',
                                isActive 
                                    ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-[#00b140]/20 dark:border-neutral-600 scale-105' 
                                    : 'dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:bg-background/20 hover:border border-[#00b140]/20 dark:hover:border-neutral-600'
                                )}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                            >
                                <div className="mb-3 ">{product.icon}</div>
                                <h3 className={cn('text-xl font-semibold mb-2', isActive ? 'text-slate-800 dark:text-green-400' : 'text-slate-600 dark:text-neutral-200')}>
                                {product.title}
                                </h3>
                                <p className={cn('text-sm mb-4', isActive ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-500 dark:text-neutral-400')}>
                                {product.description}
                                </p>
                                <div className="mt-auto h-1.5 w-full rounded-full overflow-hidden bg-slate-200/80 dark:bg-neutral-700/80">
                                    <motion.div
                                        key={`${progressKey}-${index}`}
                                        className="h-full bg-green-500"
                                        initial={{ width: "0%" }}
                                        animate={isActive && hasBeenInView ? { width: "100%" } : { width: "0%" }}
                                        transition={{ duration: isActive ? PROGRESS_DURATION_S : 0, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                            );
                        })}
                        </div>
                    )}
                </div>

                {/* Right Panel: Active Product Content */}
                <div className="w-full lg:w-2/3">
                <AnimatePresence mode="wait">
                    {activeProduct && (
                    <motion.div
                        key={activeProduct.id}
                        onClick={() => activeProduct && router.push(activeProduct.cta.href)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="group relative cursor-pointer overflow-hidden p-6 md:p-8 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md dark:bg-neutral-800/50 border border-[#00b140]/20 dark:border-neutral-700 h-full shadow-lg"
                    >
                        <h2 className="text-xl text-center sm:text-left lg:text-3xl font-bold mb-3 text-slate-800 dark:text-white">{activeProduct.heroHeadline}</h2>
                        <p className="text-sm text-center sm:text-left lg:text-lg text-slate-800 dark:text-slate-300 mb-8">{activeProduct.heroSubheadline}</p>
                        
                        <h4 className="font-semibold text-lg mb-4 text-slate-600 dark:text-white">Key Features</h4>
                        
                        <ul className="space-y-6 mb-6 md:mb-12">
                            {activeProduct.features.map((feature, index) => (
                                <div key={index}>
                                    <FeatureItem icon={feature.icon} text={feature.text} />
                                    {index < activeProduct.features.length - 1 && (
                                        <div className="h-0.5 w-6 mt-4 bg-slate-200 dark:bg-neutral-700/80" />
                                    )}
                                </div>
                            ))}
                        </ul>

                        <span className="mt-auto inline-flex items-center justify-center rounded-full bg-background/30 backdrop-blur-md border border-[#00b140]/20 dark:border-neutral-700 px-4 py-3 text-md font-semibold text-[#00b140] group-hover:bg-[#00b140] group-hover:text-white transition-colors duration-300">
                            {activeProduct.cta.text}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                        </span>

                        {activeProduct.id === 'gateway' && (
                            <div className="absolute hidden md:block lg:scale-90 lg:bottom-[-170px] lg:right-[5px] bottom-[-200px] right-[50px] scale-110 pointer-events-none">
                                <GreenMetallicPhoneMockup>
                                    <AnimatedVerificationFlow />
                                </GreenMetallicPhoneMockup>
                            </div>
                        )}
                        {activeProduct.id === 'console' && (
                            <div className="absolute hidden md:block w-[600px] h-[600px] bottom-[-150px] right-[-280px] 2xl:bottom-[-120px] 2xl:right-[-120px] 2xl:w-[600px] 2xl:h-[600px] pointer-events-none">
                                <Image
                                    src="/console-graphic.png"
                                    alt="Equal Console Graphic"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
        </div>
    </motion.section>
  );
} 