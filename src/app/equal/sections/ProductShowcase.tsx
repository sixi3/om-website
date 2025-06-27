'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, Fingerprint, LayoutDashboard, Send, UploadCloud, FileCheck, ShieldCheck, Link as LinkIcon, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';
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
  const [activeProductId, setActiveProductId] = useState(productsData[0].id);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeProduct = productsData.find(p => p.id === activeProductId);
  const LOADER_DURATION_S = 10;

  useEffect(() => {
    if (!hasBeenInView) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
        const currentIndex = productsData.findIndex(p => p.id === activeProductId);
        const nextIndex = (currentIndex + 1) % productsData.length;
        setActiveProductId(productsData[nextIndex].id);
        setProgressKey(prev => prev + 1);
    }, LOADER_DURATION_S * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeProductId, hasBeenInView, productsData]);

  const handleCardClick = (id: string) => {
    setActiveProductId(id);
    setProgressKey(prev => prev + 1);
  };
  
  return (
    <motion.section 
      id="products"
      className="relative w-full py-12 md:py-20"
      onViewportEnter={() => setHasBeenInView(true)}
      viewport={{ once: true, amount: 0.2 }}
    >
        <GridBackground />
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
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Left Panel: Clickable Cards */}
                <div className="w-full md:w-1/3 space-y-4">
                {productsData.map((product, index) => {
                    const isActive = activeProductId === product.id;
                    return (
                    <motion.div
                        key={product.id}
                        onClick={() => handleCardClick(product.id)}
                        className={cn(
                        'p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out',
                        isActive 
                            ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-[#00b140]/20 dark:border-neutral-600 scale-105' 
                            : 'dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:bg-slate-100 dark:hover:border-neutral-600'
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    >
                        <div className="mb-3">{product.icon}</div>
                        <h3 className={cn('text-xl font-semibold mb-2', isActive ? 'text-slate-800 dark:text-green-400' : 'text-slate-600 dark:text-neutral-200')}>
                        {product.title}
                        </h3>
                        <p className={cn('text-sm mb-4', isActive ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-500 dark:text-neutral-400')}>
                        {product.description}
                        </p>
                        <div className="mt-auto h-1.5 w-full rounded-full overflow-hidden bg-slate-200/80 dark:bg-neutral-700/80">
                            <motion.div
                                key={progressKey}
                                className="h-full bg-green-500"
                                initial={{ width: "0%" }}
                                animate={isActive && hasBeenInView ? { width: "100%" } : { width: "0%" }}
                                transition={{ duration: isActive ? LOADER_DURATION_S : 0, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                    );
                })}
                </div>

                {/* Right Panel: Active Product Content */}
                <div className="w-full md:w-2/3">
                <AnimatePresence mode="wait">
                    {activeProduct && (
                    <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="relative overflow-hidden p-6 md:p-8 rounded-lg bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md dark:bg-neutral-800/50 border border-[#00b140]/20 dark:border-neutral-700 h-full shadow-lg"
                    >
                        <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-white">{activeProduct.heroHeadline}</h2>
                        <p className="text-slate-800 dark:text-slate-300 mb-8">{activeProduct.heroSubheadline}</p>
                        
                        <h4 className="font-semibold text-lg mb-4 text-slate-600 dark:text-white">Key Features</h4>
                        <ul className="space-y-6 mb-12">
                            {activeProduct.features.map((feature, index) => (
                                <div key={index}>
                                    <FeatureItem icon={feature.icon} text={feature.text} />
                                    {index < activeProduct.features.length - 1 && (
                                        <div className="h-0.5 w-6 mt-4 bg-slate-200 dark:bg-neutral-700/80" />
                                    )}
                                </div>
                            ))}
                        </ul>

                        <Link href={activeProduct.cta.href} passHref>
                            <span className="group mt-auto inline-flex items-center justify-center rounded-full bg-background/30 backdrop-blur-md border border-[#00b140]/20 dark:border-neutral-700 px-4 py-3 text-md font-semibold text-[#00b140] hover:bg-[#00b140] hover:text-white transition-colors duration-300">
                                {activeProduct.cta.text}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                            </span>
                        </Link>

                        {activeProduct.id === 'gateway' && (
                            <div className="absolute bottom-[-200px] right-[50px] scale-110 pointer-events-none">
                                <GreenMetallicPhoneMockup>
                                    <AnimatedVerificationFlow />
                                </GreenMetallicPhoneMockup>
                            </div>
                        )}
                        {activeProduct.id === 'console' && (
                            <div className="absolute bottom-[-120px] right-[-120px] w-[600px] h-[600px] pointer-events-none">
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