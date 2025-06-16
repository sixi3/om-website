'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, Fingerprint, LayoutDashboard, Send, UploadCloud, FileCheck, ShieldCheck, Link, Settings } from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';

const productsData = [
  {
    id: 'gateway',
    title: 'Identity Verification Gateway',
    description: 'One gateway to verify all candidate identities — instantly.',
    heroHeadline: 'One Gateway to Verify All Candidate Identities — Instantly.',
    heroSubheadline: "Equal's Identity Verification Gateway (IDG) is your digital front door for onboarding. Collect, verify, and confirm identity documents from any user in real-time — no coding, no chasing.",
    features: [
      { icon: <Send />, text: 'Multi-Channel Candidate Access (WhatsApp, SMS, Email)' },
      { icon: <UploadCloud />, text: 'Real-Time Document Upload & Validation' },
      { icon: <FileCheck />, text: 'Smart Document Parsing (OCR & AI)' },
      { icon: <ShieldCheck />, text: 'Secure Consent Capture with Audit Trails' },
    ],
    cta: { text: 'Try Gateway Demo', href: '#' },
  },
  {
    id: 'console',
    title: 'Equal Console',
    description: 'Your single pane of glass for all background verifications.',
    heroHeadline: 'Your Single Pane of Glass for All Background Verifications.',
    heroSubheadline: 'The Equal Console is your real-time dashboard to monitor candidate progress, resolve issues, generate reports, and manage bulk hiring — all in one place.',
    features: [
        { icon: <LayoutDashboard />, text: 'Real-time dashboard to monitor candidate progress' },
        { icon: <Fingerprint />, text: 'Resolve issues and manage bulk hiring' },
        { icon: <Link />, text: 'Export to Darwinbox, Workday, SAP' },
        { icon: <Settings />, text: 'Connect BI dashboards (PowerBI, Tableau)' },
    ],
    cta: { text: 'Book Console Demo', href: '#' },
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
  const activeProduct = productsData.find(p => p.id === activeProductId);

  return (
    <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Left Panel: Clickable Cards */}
                <div className="w-full md:w-1/3 space-y-4">
                {productsData.map((product, index) => {
                    const isActive = activeProductId === product.id;
                    return (
                    <motion.div
                        key={product.id}
                        onClick={() => setActiveProductId(product.id)}
                        className={cn(
                        'p-6 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out',
                        isActive 
                            ? 'bg-background/10 backdrop-blur-md dark:bg-neutral-800 shadow-xl border-slate-300 dark:border-neutral-600 scale-105' 
                            : 'dark:bg-neutral-800/60 dark:border-neutral-700/70 hover:shadow-lg hover:bg-slate-100 dark:hover:border-neutral-600'
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    >
                        <h3 className={cn('text-xl font-semibold mb-2', isActive ? 'text-slate-800 dark:text-green-400' : 'text-slate-600 dark:text-neutral-200')}>
                        {product.title}
                        </h3>
                        <p className={cn('text-sm', isActive ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-500 dark:text-neutral-400')}>
                        {product.description}
                        </p>
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
                        className="p-6 md:p-8 rounded-lg bg-slate-100/50 dark:bg-neutral-800/50 border border-slate-200 dark:border-neutral-700 h-full"
                    >
                        <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-white">{activeProduct.heroHeadline}</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8">{activeProduct.heroSubheadline}</p>
                        
                        <h4 className="font-semibold text-lg mb-4 text-slate-800 dark:text-white">Key Features</h4>
                        <ul className="space-y-3 mb-8">
                            {activeProduct.features.map((feature, index) => (
                                <FeatureItem key={index} icon={feature.icon} text={feature.text} />
                            ))}
                        </ul>

                        <GlowingButton>
                            {activeProduct.cta.text}
                        </GlowingButton>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
        </div>
    </section>
  );
} 