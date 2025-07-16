"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ShieldCheck, LayoutDashboard, IndianRupee, Building2, ArrowRight, Send, UploadCloud, FileCheck, Link as LinkIcon, Settings, Fingerprint, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GreenMetallicPhoneMockup } from '../../components/ui/GreenMetallicPhoneMockup';
import { AnimatedVerificationFlow } from '../../components/AnimatedVerificationFlow';
import { AnimatedScreenContent } from '../../../onemoney/components/AnimatedScreenContent';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  heroHeadline: string;
  heroSubheadline: string;
  features: { icon: React.ReactNode; text: string }[];
  cta: { text: string; href: string };
  visualization?: 'phone' | 'console' | 'chart';
}

export const allProducts: Product[] = [
  {
    id: 'gateway',
    title: 'Identity Verification Gateway',
    description: 'One gateway to verify all candidate identities — instantly.',
    icon: <ShieldCheck size={28} />,
    heroHeadline: 'One Gateway to Verify All Candidate Identities — Instantly',
    heroSubheadline: "Equal's Identity Verification Gateway (IDG) is your digital front door for onboarding. Collect, verify, and confirm identity documents from any user in real-time — no coding, no chasing.",
    features: [
      { icon: <Send />, text: 'Multi-Channel Candidate Access (WhatsApp, SMS, Email)' },
      { icon: <UploadCloud />, text: 'Real-Time Document Upload & Validation' },
      { icon: <FileCheck />, text: 'Smart Document Parsing (OCR & AI)' },
      { icon: <ShieldCheck />, text: 'Secure Consent Capture with Audit Trails' },
    ],
    cta: { text: 'Learn About Gateway', href: '/equal/products/identity-gateway' },
    visualization: 'phone'
  },
  {
    id: 'console',
    title: 'Equal Console',
    description: 'Your single pane of glass for all background verifications.',
    icon: <LayoutDashboard size={28} />,
    heroHeadline: 'Your Single Pane of Glass for All Background Verifications',
    heroSubheadline: 'The Equal Console is your real-time dashboard to monitor candidate progress, resolve issues, generate reports, and manage bulk hiring — all in one place.',
    features: [
      { icon: <LayoutDashboard />, text: 'Real-time dashboard to monitor candidate progress' },
      { icon: <Fingerprint />, text: 'Resolve issues and manage bulk hiring' },
      { icon: <LinkIcon />, text: 'Export to Darwinbox, Workday, SAP' },
      { icon: <Settings />, text: 'Connect BI dashboards (PowerBI, Tableau)' },
    ],
    cta: { text: 'Learn About Console', href: '/equal/products/console' },
    visualization: 'console'
  },
  {
    id: 'onemoney-aa',
    title: 'OneMoney AA',
    description: "India's largest Account Aggregator platform for consent-driven data sharing.",
    icon: <IndianRupee size={28}/>,
    heroHeadline: "India's Largest Account Aggregator Platform",
    heroSubheadline: 'OneMoney AA enables secure, consent-driven financial data sharing across banks and fintech platforms, powering the future of open banking in India.',
    features: [
      { icon: <ShieldCheck />, text: 'RBI-compliant data sharing framework' },
      { icon: <LinkIcon />, text: 'Connected to 120+ Financial Information Providers' },
      { icon: <Settings />, text: 'Real-time consent management and revocation' },
      { icon: <FileCheck />, text: 'Comprehensive audit trails and data lineage' },
    ],
    cta: { text: 'Learn About OneMoney', href: '/onemoney' }
  },
  {
    id: 'finpro',
    title: 'FinPro FIU TSP',
    description: 'Financial Information User TSP for seamless data consumption.',
    icon: <Building2 size={28} />,
    heroHeadline: 'Financial Information User Technology Service Provider',
    heroSubheadline: 'FinPro FIU TSP enables businesses to consume financial data through the Account Aggregator ecosystem for lending, wealth management, and financial planning.',
    features: [
      { icon: <LayoutDashboard />, text: 'Pre-built workflows for digital lending' },
      { icon: <Settings />, text: 'Real-time bank statement analysis' },
      { icon: <ShieldCheck />, text: 'Automated income verification' },
      { icon: <FileCheck />, text: 'Credit risk assessment tools' },
    ],
    cta: { text: 'Learn About FinPro', href: '/moneyone/products/finpro' }
  }
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

interface ProductsShowcaseProps {
  relevantProductIds?: string[];
  className?: string;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({ 
  relevantProductIds = ['gateway', 'console'], 
  className = '' 
}) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Filter products based on relevantProductIds
  const relevantProducts = allProducts.filter(product => 
    relevantProductIds.includes(product.id)
  );

  // Ensure activeProductIndex is valid and fallback to gateway if current product not available
  useEffect(() => {
    if (relevantProducts.length > 0) {
      // If current active product is not in the new relevant products, reset to first product
      const currentActiveProduct = relevantProducts[activeProductIndex];
      if (!currentActiveProduct) {
        // Try to find gateway first, otherwise use first available product
        const gatewayIndex = relevantProducts.findIndex(p => p.id === 'gateway');
        setActiveProductIndex(gatewayIndex >= 0 ? gatewayIndex : 0);
        setProgressKey(prev => prev + 1);
      }
    }
  }, [relevantProductIds, relevantProducts, activeProductIndex]);

  const activeProduct = relevantProducts[activeProductIndex];
  const PROGRESS_DURATION_S = 8;

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-progression logic
  useEffect(() => {
    setHasBeenInView(true); // Always set to true for sticky component
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      const nextIndex = (activeProductIndex + 1) % relevantProducts.length;
      setActiveProductIndex(nextIndex);
      setProgressKey(prev => prev + 1);
    }, PROGRESS_DURATION_S * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeProductIndex, relevantProducts.length]);

  const handleProductChange = useCallback((index: number) => {
    setActiveProductIndex(index);
    setProgressKey(prev => prev + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    const prevIndex = activeProductIndex === 0 ? relevantProducts.length - 1 : activeProductIndex - 1;
    handleProductChange(prevIndex);
  }, [activeProductIndex, handleProductChange, relevantProducts.length]);

  const handleNext = useCallback(() => {
    const nextIndex = (activeProductIndex + 1) % relevantProducts.length;
    handleProductChange(nextIndex);
  }, [activeProductIndex, handleProductChange, relevantProducts.length]);

  if (relevantProducts.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Product Navigation Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {relevantProducts.map((product, index) => (
            <motion.button
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => handleProductChange(index)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                index === activeProductIndex
                  ? 'bg-linear-to-br from-white to-slate-50 dark:bg-neutral-800/50 border border-slate-300 border-b-4 dark:border-neutral-700 text-[#00b140]'
                  : 'bg-transparent text-slate-600 hover:bg-white border border-slate-200'
              }`}
            >
              {product.icon}
              <span className="hidden sm:inline">{product.title}</span>
              <span className="sm:hidden">{product.title.split(' ')[0]}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Active Product Content - Detailed Card */}
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

            {/* Product Visualization */}
            {activeProduct.visualization === 'phone' && (
              <div className="absolute hidden md:block lg:scale-70 lg:bottom-[-170px] lg:right-[120px] xl:bottom-[-200px] xl:right-[100px] bottom-[-200px] right-[50px] xl:scale-105 pointer-events-none">
                <GreenMetallicPhoneMockup>
                  <AnimatedVerificationFlow />
                </GreenMetallicPhoneMockup>
              </div>
            )}
            {activeProduct.visualization === 'console' && (
              <div className="absolute hidden md:block w-[600px] h-[600px] bottom-[-150px] right-[-280px] xl:bottom-[-150px] xl:right-[-320px] 2xl:bottom-[-120px] 2xl:right-[-120px] 2xl:w-[600px] 2xl:h-[600px] pointer-events-none">
                <Image
                  src="/console-graphic.png"
                  alt="Equal Console Graphic"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {activeProduct.id === 'finpro' && (
              <div className="absolute hidden md:block w-[600px] h-[600px] bottom-[-150px] right-[-280px] xl:bottom-[-150px] xl:right-[-320px] 2xl:bottom-[-120px] 2xl:right-[-120px] 2xl:w-[600px] 2xl:h-[600px] pointer-events-none">
                <Image
                  src="/finpro.png"
                  alt="FinPro Graphic"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {(activeProduct.id === 'onemoney-aa') && (
              <div className="absolute hidden md:block lg:scale-70 lg:bottom-[-170px] lg:right-[120px] xl:bottom-[-200px] xl:right-[100px] bottom-[-200px] right-[50px] xl:scale-105 pointer-events-none">
                <GreenMetallicPhoneMockup>
                  <AnimatedScreenContent />
                </GreenMetallicPhoneMockup>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 