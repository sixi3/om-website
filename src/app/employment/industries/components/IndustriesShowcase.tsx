"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { industryContent, Industry } from "../industryContent";
import { ProductsShowcase, allProducts } from "./ProductsShowcase";
import { METALLIC_BLACK_TEXT_CLASSES, ANIMATION_CONFIG } from "@/components/aurora-background-demo/constants";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  Activity, 
  Pill, 
  GraduationCap, 
  Code, 
  Smartphone, 
  IndianRupee, 
  TrendingUp, 
  Factory, 
  Building2, 
  Shield, 
  Car, 
  ShoppingBag, 
  Coffee, 
  Plane,
  ArrowRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/onemoney/components/ui/dialog";
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";

const industryIcons: Record<string, React.ReactNode> = {
  "real-estate": <Home size={24} />,
  "co-working": <Briefcase size={24} />,
  "healthcare": <Activity size={24} />,
  "pharmaceuticals": <Pill size={24} />,
  "education": <GraduationCap size={24} />,
  "it-services": <Code size={24} />,
  "digital-services": <Smartphone size={24} />,
  "banking-financial-services": <IndianRupee size={24} />,
  "broking": <TrendingUp size={24} />,
  "manufacturing-construction": <Factory size={24} />,
  "housing-finance": <Building2 size={24} />,
  "insurance": <Shield size={24} />,
  "automotive": <Car size={24} />,
  "retail-ecommerce": <ShoppingBag size={24} />,
  "hospitality": <Coffee size={24} />,
  "travel-transportation": <Plane size={24} />
};

// Custom MetricsCounter component
const MetricsCounter = React.memo<{ 
  value: string; 
  className?: string; 
  duration?: number;
  id: string;
}>(({ value, className, duration = 2, id }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Extract numeric value and suffix
      const numericMatch = value.match(/^(\d+(?:\.\d+)?)/);
      const suffix = value.replace(/^(\d+(?:\.\d+)?)/, '');
      
      if (numericMatch) {
        const numericValue = parseFloat(numericMatch[1]);
        const controls = animate(0, numericValue, {
          duration: duration,
          ease: "easeOut",
          onUpdate(latest) {
            const roundedValue = Math.round(latest);
            setDisplayValue(`${roundedValue}${suffix}`);
          },
        });
        return () => controls.stop();
      } else {
        // If no numeric value found, just display the original value
        setDisplayValue(value);
      }
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
});

MetricsCounter.displayName = 'MetricsCounter';

// Utility hook to detect mobile (screen < 1024px)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Product Pills for mobile
const ProductPills = ({ productIds }: { productIds?: string[] }) => {
  if (!productIds || productIds.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 mt-6 w-full">
      {productIds.map(pid => {
        const prod = allProducts.find(p => p.id === pid);
        if (!prod) return null;
        return (
          <Link
            key={prod.id}
            href={prod.cta.href}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-[#00b140]/40 bg-background/20 backdrop-blur-md text-[#00b140] text-base font-medium shadow-sm hover:bg-[#00b140] hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">{prod.icon}<span>{prod.title}</span></span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        );
      })}
    </div>
  );
};

// Industry Section Component
const IndustrySection = React.memo<{ 
  industry: Industry; 
  index: number; 
  onInView: (industry: Industry) => void;
  isActive: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isMobile?: boolean;
}>(({ industry, index, onInView, isActive, setIsDialogOpen, isMobile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(industry);
    }
  }, [isInView, industry, onInView]);

  const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";

  // On mobile, always treat as active
  const active = isMobile ? true : isActive;

  return (
    <motion.section
      id={industry.id}
      ref={ref}
      initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: ANIMATION_CONFIG.duration,
        ease: "easeOut",
        delay: 0.2
      }}
      className={`transition-all duration-300 w-full ${
        active ? 'bg-background/20 backdrop-blur-md border border-[#00b140]/20' : ''
      } ${isMobile ? 'p-5 rounded-xl' : 'md:rounded-2xl md:px-6 py-8 md:py-16'}`}
      style={isMobile ? { margin: 0 } : {}}
    >
      <div className="space-y-6 w-full">
        <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center text-white mb-4">
          {industryIcons[industry.id] || <Building2 size={24} />}
        </div>
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight transition-colors duration-300 ${
          active ? METALLIC_BLACK_TEXT_CLASSES : 'text-slate-400'
        }`}>
          {industry.name}
        </h2>
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl transition-colors duration-300 ${
          active ? 'text-slate-600' : 'text-slate-400'
        }`}>
          {industry.description}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-12 pt-2 md:pt-4 pb-4 md:pb-8">
          {industry.highlights.map((highlight, highlightIndex) => (
            <div key={highlightIndex} className="text-left">
              <div className="text-xl md:text-3xl lg:text-4xl mb-1 md:mb-2">
                <MetricsCounter
                  value={highlight.stat}
                  className={active ? metallicTextClasses : 'text-slate-400'}
                  id={`${industry.id}-${highlightIndex}`}
                  duration={2}
                />
              </div>
              <p className={`text-xs md:text-md font-medium transition-colors duration-300 ${
                active ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {highlight.label}
              </p>
            </div>
          ))}
        </div>
        <div className={`transition-opacity duration-300 w-full ${!active ? 'opacity-50' : ''}`}>
          <ShimmerButton
            className="text-base w-full justify-center"
            onClick={() => setIsDialogOpen(true)}
          >
            Explore {industry.name} Solutions
          </ShimmerButton>
        </div>
        {/* Product Pills for mobile */}
        {isMobile && <ProductPills productIds={industry.relatedProducts} />}
      </div>
    </motion.section>
  );
});

IndustrySection.displayName = 'IndustrySection';

export const IndustriesShowcase = React.memo(() => {
  const [currentIndustry, setCurrentIndustry] = useState<Industry>(industryContent[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  // Handle hash-based scrolling on page load
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.slice(1); // Remove the '#' character
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Small delay to ensure page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 100);
        }
      }
    };

    // Handle initial page load
    handleHashScroll();

    // Handle hash changes (for client-side navigation)
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  const handleIndustryInView = (industry: Industry) => {
    setCurrentIndustry(industry);
  };

  if (isMobile) {
    // Mobile: stack all cards, no active/inactive, no sticky sidebar
    return (
      <section className="relative w-full py-0 px-2">
        <div className="flex flex-col w-full">
          {industryContent.map((industry, index) => (
            <div key={industry.id} className={`mb-4 last:mb-0`}>
              <IndustrySection
                industry={industry}
                index={index}
                onInView={() => {}}
                isActive={true}
                setIsDialogOpen={setIsDialogOpen}
                isMobile={true}
              />
            </div>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Get in touch with us today!</DialogTitle>
              <DialogDescription>
                Ready to boost your business with India's largest data sharing network?
              </DialogDescription>
            </DialogHeader>
            <div className="py-1">
              <TalkToUsForm source="employment-industries" />
            </div>
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  // Desktop: keep current experience
  return (
    <section className="relative w-full py-12">
      <div className=" mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Industries List */}
          <div className="lg:col-span-2 space-y-0">
            {industryContent.map((industry, index) => (
              <IndustrySection
                key={industry.id}
                industry={industry}
                index={index}
                onInView={handleIndustryInView}
                isActive={currentIndustry.id === industry.id}
                setIsDialogOpen={setIsDialogOpen}
                isMobile={false}
              />
            ))}
          </div>
          {/* Right Column - Sticky Products Showcase */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 pb-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: ANIMATION_CONFIG.duration,
                  ease: "easeOut",
                  delay: 0.4
                }}
                className="max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-2 mt-20">
                  Recommended Products
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  Products specifically designed for {currentIndustry.name.toLowerCase()} workflows
                </p>
                <ProductsShowcase
                  relevantProductIds={currentIndustry.relatedProducts}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Get in touch with us today!</DialogTitle>
            <DialogDescription>
              Ready to boost your business with India's largest data sharing network?
            </DialogDescription>
          </DialogHeader>
          <div className="py-1">
            <TalkToUsForm source="employment-industries" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
});

IndustriesShowcase.displayName = 'IndustriesShowcase'; 