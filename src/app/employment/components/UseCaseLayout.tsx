import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { UseCase } from '../data/useCases';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import {
    FileText, BarChart, Users, Zap, CreditCard, CheckCircle,
    Clock, MessageSquare, Shield, Database, Workflow,
    TrendingUp, Phone, Mail, Globe, Settings,
    Award, Target, Truck, Smartphone, Brain,
    Building, Scale, Eye, Lock, FileCheck, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Marquee from "react-fast-marquee";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

// Mapping for solution pages
const solutionPageMapping: Record<string, string> = {
    'hrms': '/employment/products/enterprise-hiring',
    'gig-economy': '/employment/products/gig-hiring',
    'bfsi': '/employment/products/financial-services',
    'staffing': '/employment/products/staffing',
};

const HorizontalPointList = ({ items, textColor, enableMarquee = false }: { items: (string | undefined)[], textColor: string, enableMarquee?: boolean }) => {
    const validItems = items.filter(Boolean);
    if (validItems.length === 0) return null;

    const content = validItems.map((point, idx) => (
        <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{point}</span>
            {idx < validItems.length - 1 && <span className="text-white mx-2">&bull;</span>}
        </React.Fragment>
    ));

    if (enableMarquee) {
        return (
            <>
                {/* Mobile: Auto-scroll */}
                <div className="w-full overflow-hidden md:hidden">
                    <Marquee gradient={false} speed={30} pauseOnHover={true}>
                        <div className={`flex items-center gap-x-4 text-sm font-medium text-[16px] ${textColor} mr-8`}>
                            {content}
                            <span className="text-white mx-2">&bull;</span>
                        </div>
                    </Marquee>
                </div>
                {/* Desktop: Normal wrapped layout */}
                <div className={`hidden md:flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-[16px] ${textColor}`}>
                    {content}
                </div>
            </>
        );
    }

    return (
        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-[16px] ${textColor}`}>
            {content}
        </div>
    );
};

// Helper function to get relevant image for a capability
const getCapabilityImage = (feature: string, useCaseId: string) => {
    const featureLower = feature.toLowerCase();

    // Use case specific images
    if (useCaseId === 'hrms') {
        if (featureLower.includes('pre-offer') || featureLower.includes('collect')) {
            return { src: '/Pre-Offer BGV.png', alt: 'Pre-offer BGV' };
        }
        if (featureLower.includes('report') || featureLower.includes('consolidated')) {
            return { src: '/Auto-Consolidated Reports.png', alt: 'Auto-Consolidated Reports' };
        }
        if (featureLower.includes('communication') || featureLower.includes('candidate')) {
            return { src: '/Candidate Communication.png', alt: 'Candidate Communication' };
        }
        if (featureLower.includes('real-time') || featureLower.includes('verification')) {
            return { src: '/Real-Time Verification.png', alt: 'Real-time Verification' };
        }
        if (featureLower.includes('billing') || featureLower.includes('one')) {
            return { src: '/One Billing Layer.png', alt: 'One Billing Layer' };
        }
    }

    if (useCaseId === 'gig-economy') {
        if (featureLower.includes('bulk') || featureLower.includes('onboarding')) {
            return { src: '/Bulk Managment Tools.png', alt: 'Bulk Onboarding' };
        }
        if (featureLower.includes('mobile') || featureLower.includes('ux')) {
            return { src: '/Hosted Page.png', alt: 'Mobile UX' };
        }
        if (featureLower.includes('vehicle') || featureLower.includes('legal')) {
            return { src: '/Smart Document parsing.png', alt: 'Vehicle & Legal Verification' };
        }
        if (featureLower.includes('safety') || featureLower.includes('ai')) {
            return { src: '/AI Intelligence.png', alt: 'Safety-first Design' };
        }
        if (featureLower.includes('routing') || featureLower.includes('smart')) {
            return { src: '/routing.png', alt: 'Smart Routing' };
        }
    }

    if (useCaseId === 'bfsi') {
        if (featureLower.includes('compliance') || featureLower.includes('rbi')) {
            return { src: '/Compliance.png', alt: 'RBI & SEBI Compliance' };
        }
        if (featureLower.includes('monitoring') || featureLower.includes('aml')) {
            return { src: '/Live Status Dashboard.png', alt: 'AML Monitoring' };
        }
        if (featureLower.includes('vault') || featureLower.includes('secure')) {
            return { src: '/Secure Consent Capture.png', alt: 'Secure Data Vault' };
        }
        if (featureLower.includes('financial') || featureLower.includes('health')) {
            return { src: '/Financial Services.png', alt: 'Financial Health Checks' };
        }
        if (featureLower.includes('audit') || featureLower.includes('logs')) {
            return { src: '/Exception Managment Engine.png', alt: 'Audit Logs' };
        }
    }

    if (useCaseId === 'staffing') {
        if (featureLower.includes('upload') || featureLower.includes('single')) {
            return { src: '/Real-Time Document Upload.png', alt: 'Single Upload Flow' };
        }
        if (featureLower.includes('routing') || featureLower.includes('auto')) {
            return { src: '/Custom Workflow Builder.png', alt: 'Document Auto-routing' };
        }
        if (featureLower.includes('workflow') || featureLower.includes('custom')) {
            return { src: '/Field-level Config.png', alt: 'Custom Workflows' };
        }
        if (featureLower.includes('report') || featureLower.includes('printable')) {
            return { src: '/Consolidated Report Manager.png', alt: 'Printable Reports' };
        }
        if (featureLower.includes('batch') || featureLower.includes('download')) {
            return { src: '/Bulk Managment Tools.png', alt: 'Batch Download' };
        }
    }

    // Generic fallbacks
    if (featureLower.includes('api') || featureLower.includes('integration')) {
        return { src: '/API Integration.png', alt: 'API Integration' };
    }
    if (featureLower.includes('webhook') || featureLower.includes('notification')) {
        return { src: '/Webhook Notification.png', alt: 'Webhook Support' };
    }
    if (featureLower.includes('dashboard') || featureLower.includes('status')) {
        return { src: '/Live Status Dashboard.png', alt: 'Live Dashboard' };
    }
    if (featureLower.includes('document') || featureLower.includes('parsing')) {
        return { src: '/Smart Document parsing.png', alt: 'Document Processing' };
    }
    if (featureLower.includes('workflow') || featureLower.includes('builder')) {
        return { src: '/Custom Workflow Builder.png', alt: 'Workflow Builder' };
    }

    // Default image
    return { src: '/3dcheck.png', alt: 'Verification Feature' };
};

// Helper function to get image position based on index
const getImagePosition = (index: number, total: number) => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'];
    return positions[index % positions.length] as "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
};

// Helper function to get icon for capability based on use case and feature
const getCapabilityIcon = (feature: string, useCaseId: string, index: number) => {
    const featureLower = feature.toLowerCase();

    // Use case specific icon mappings with unique icons per tab
    if (useCaseId === 'hrms') {
        const hrmsIcons = [
            <Clock className="w-6 h-6" />,           // Pre-Offer BGV - timing/early collection
            <BarChart className="w-6 h-6" />,        // Auto-Consolidated Reports - analytics
            <MessageSquare className="w-6 h-6" />,   // Candidate Communication - messaging
            <Zap className="w-6 h-6" />,             // Real-Time Verification - speed
            <CreditCard className="w-6 h-6" />,      // One Billing Layer - payments
        ];
        return hrmsIcons[index] || <Settings className="w-6 h-6" />;
    }

    if (useCaseId === 'gig-economy') {
        const gigIcons = [
            <Users className="w-6 h-6" />,           // Bulk Onboarding - people management
            <Smartphone className="w-6 h-6" />,      // Mobile UX - mobile-first
            <Truck className="w-6 h-6" />,           // Vehicle + Legal Verification - logistics
            <Shield className="w-6 h-6" />,          // Safety-first Design - security
            <Target className="w-6 h-6" />,          // Smart Routing - optimization
        ];
        return gigIcons[index] || <Workflow className="w-6 h-6" />;
    }

    if (useCaseId === 'bfsi') {
        const bfsiIcons = [
            <Scale className="w-6 h-6" />,           // RBI & SEBI-Grade Compliance - legal/compliance
            <Eye className="w-6 h-6" />,             // Continuous AML/Sanctions Monitoring - surveillance
            <Lock className="w-6 h-6" />,            // Secure Data Vault - security
            <TrendingUp className="w-6 h-6" />,      // Comprehensive Financial Health Checks - financial analysis
            <FileCheck className="w-6 h-6" />,       // Immutable Audit Logs - documentation
        ];
        return bfsiIcons[index] || <Building className="w-6 h-6" />;
    }

    if (useCaseId === 'staffing') {
        const staffingIcons = [
            <FileText className="w-6 h-6" />,        // Single Upload Flow - document management
            <Workflow className="w-6 h-6" />,        // Document Auto-routing - process automation
            <Settings className="w-6 h-6" />,        // Custom Workflows - configuration
            <Award className="w-6 h-6" />,           // Printable Reports - certification/awards
            <Database className="w-6 h-6" />,        // Batch Download Support - data management
        ];
        return staffingIcons[index] || <CheckCircle className="w-6 h-6" />;
    }

    // Fallback icons for other use cases
    const fallbackIcons = [
        <CheckCircle className="w-6 h-6" />,
        <Globe className="w-6 h-6" />,
        <Brain className="w-6 h-6" />,
        <Phone className="w-6 h-6" />,
        <Mail className="w-6 h-6" />,
    ];

    return fallbackIcons[index % fallbackIcons.length];
};

export function UseCaseLayout(props: UseCase) {
    const {
        id,
        heroHeadline,
        heroSubheadline,
        bottomCta,
        bestFor,
        problems,
        approach,
        features,
        before,
        after,
        challenges,
        delivers,
        needs,
        solution,
        capabilities,
        coreBenefits,
        designedForScale
    } = props;

    const allCapabilities = [
        ...(capabilities || []),
        ...(coreBenefits || []),
        ...(designedForScale || [])
    ];

    const beforeEqual = [
        ...(problems || []),
        ...(challenges || []),
        ...(needs || []),
        ...(before || [])
    ].filter(Boolean);

    const withEqual = [
        ...(approach || []),
        ...(solution || []),
        ...(delivers || []),
        ...(after || []),
        ...(Array.isArray(features) ? features.map(f => typeof f === 'string' ? f : `${f.feature} - ${f.description}`) : [])
    ].filter(Boolean);

    const allFeatures = [
        ...(Array.isArray(features) ? features : []),
    ];

    const allSolutions = [...(approach || []), ...(solution || [])];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section id={id} className="w-full dark:border-slate-800 overflow-x-hidden">
            <motion.div
                className="w-full px-2 sm:px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Bento Grid for Capabilities */}
                <motion.div
                    className="w-full mx-auto mb-12 border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="p-4">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                                <span className={metallicBlackTextClasses}>{heroHeadline}</span>
                            </h2>
                            <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                                {heroSubheadline}
                            </p>
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-md text-slate-800 dark:text-slate-100 font-regular">Best for:</p>
                                {/* Mobile: Horizontal scroll */}
                                <div className="w-full overflow-x-auto scrollbar-hide md:hidden">
                                    <div className="flex items-center gap-3 px-4 min-w-max">
                                        {bestFor.map((item, index) => (
                                            <div key={index} className="inline-block px-2 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md flex-shrink-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    <p className="text-md text-slate-800 dark:text-slate-100 font-regular whitespace-nowrap">{item}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Desktop: Original wrapped layout */}
                                <div className="hidden md:flex justify-center items-center flex-wrap gap-3">
                                    {bestFor.map((item, index) => (
                                        <div key={index} className="inline-block px-4 py-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md">
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                <p className="text-md text-slate-800 dark:text-slate-100 font-regular">{item}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Learn More Button */}
                            {solutionPageMapping[id] && (
                                <div className="mt-6 flex justify-center">
                                    <Link href={solutionPageMapping[id]}>
                                        <motion.button
                                            className="inline-flex items-center justify-center rounded-full bg-linear-to-br from-white to-slate-100 border border-b-4 border-slate-200 px-6 py-3 text-md font-medium text-slate-600 hover:text-[#00b140] transition-colors duration-300 group"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                        </motion.button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full max-w-none gap-2 sm:gap-4">
                            {allCapabilities.map((cap, idx) => {
                                let colSpan: 1 | 2 | 3 = 2; // Default for first row
                                const total = allCapabilities.length;

                                if (total === 4) {
                                    if (idx === 3) {
                                        colSpan = 3; // Wider for the single item on row 2
                                    }
                                } else if (total === 5) {
                                    if (idx >= 3) {
                                        colSpan = 3; // Equal width for the two items on row 2
                                    }
                                }

                                const capabilityImage = getCapabilityImage(cap.feature, id);
                                const capabilityIcon = getCapabilityIcon(cap.feature, id, idx);

                                return (
                                    <BentoGridItem
                                        key={idx}
                                        className="shadow-sm"
                                        colSpan={colSpan}
                                        icon={
                                            <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                                                {capabilityIcon}
                                            </div>
                                        }
                                        title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{cap.feature}</span>}
                                        description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{cap.description}</span>}
                                        image={capabilityImage}
                                        imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                                    />
                                );
                            })}
                        </BentoGrid>
                    </div>
                    {/* Before and After Banners */}
                    <motion.div className="grid grid-cols-1" variants={itemVariants}>
                        <div className="relative overflow-hidden bg-linear-to-r from-[#ce4257]/10 to-[#720026]/20 dark:bg-red-500/10 border-t border-[#720026]/20 pt-2 pb-4 text-center">
                            <h3 className="text-md font-medium tracking-widest text-[#bc4749] uppercase mb-2">WITHOUT EQUAL</h3>
                            <HorizontalPointList items={beforeEqual} textColor="text-[#bc4749] dark:text-red-300" enableMarquee={true} />
                            <Image
                                src="/thumbs-up.png"
                                alt="Thumbs Down"
                                width={100}
                                height={100}
                                className="absolute -top-2 -right-4 -z-10 rotate-180 opacity-20 xl:opacity-100"
                            />
                        </div>
                        <div className="relative overflow-hidden bg-linear-to-l from-[#40916c]/20 to-[#2d6a4f]/20 dark:bg-green-500/10 pt-2 pb-4 text-center border-t border-[#2d6a4f]/20">
                            <h3 className="text-md font-medium tracking-wider text-[#386641] uppercase mb-2 mt-1">WITH EQUAL</h3>
                            <HorizontalPointList items={withEqual} textColor="text-[#386641] dark:text-green-300" enableMarquee={true} />
                            <Image
                                src="/thumbs-up.png"
                                alt="Thumbs Up"
                                width={100}
                                height={100}
                                className="absolute -bottom-2 -left-4 -z-10 opacity-20 xl:opacity-100"
                            />

                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
} 