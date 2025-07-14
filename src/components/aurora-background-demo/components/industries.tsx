"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Heart, Building, Users } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { METALLIC_BLACK_TEXT_CLASSES, ANIMATION_CONFIG } from "../constants";

import { industryContent } from "@/app/equal/industries/industryContent";
import { 
  Home, 
  Briefcase, 
  Activity, 
  Pill, 
  GraduationCap, 
  Code, 
  Smartphone, 
  DollarSign, 
  TrendingUp, 
  Factory, 
  Building2, 
  Shield, 
  Car, 
  ShoppingBag, 
  Coffee, 
  Plane 
} from "lucide-react";

// Icon mapping for industries
const industryIcons: Record<string, React.ReactNode> = {
  "real-estate": <Home size={24} />,
  "co-working": <Briefcase size={24} />,
  "healthcare": <Activity size={24} />,
  "pharmaceuticals": <Pill size={24} />,
  "education": <GraduationCap size={24} />,
  "it-services": <Code size={24} />,
  "digital-services": <Smartphone size={24} />,
  "banking-financial-services": <DollarSign size={24} />,
  "broking": <TrendingUp size={24} />,
  "manufacturing-construction": <Factory size={24} />,
  "housing-finance": <Building2 size={24} />,
  "insurance": <Shield size={24} />,
  "automotive": <Car size={24} />,
  "retail-ecommerce": <ShoppingBag size={24} />,
  "hospitality": <Coffee size={24} />,
  "travel-transportation": <Plane size={24} />
};

// Image mapping for industries (using available images from public folder)
const industryImages: Record<string, string> = {
  "real-estate": "/Candidate Consent Records.png",
  "co-working": "/Gig & Platform Economy.png",
  "healthcare": "/Healthcare.png",
  "pharmaceuticals": "/Healthcare.png", // Reuse healthcare image
  "education": "/Recruitment.png", // Reuse recruitment image
  "it-services": "/L&M-tech.png",
  "digital-services": "/L&M-tech.png", // Reuse tech image
  "banking-financial-services": "/Financial Services.png",
  "broking": "/Financial Services.png", // Reuse financial services image
  "manufacturing-construction": "/Government Contracts.png",
  "housing-finance": "/homeloan.png",
  "insurance": "/Financial Services.png", // Reuse financial services image
  "automotive": "/Vehicle + Legal Verification.png",
  "retail-ecommerce": "/Gig & Platform Economy.png", // Reuse gig economy image
  "hospitality": "/Gig & Platform Economy.png", // Reuse gig economy image
  "travel-transportation": "/Vehicle + Legal Verification.png" // Reuse vehicle image
};

// Industry section data (using new industryContent)
const industrySection = {
  id: "industry",
  title: "Custom Workflows for your Industry",
  subtitle: "ONE SOLUTION FOR ALL",
  description: "Specialised solutions tailored for specific industry verticals and their unique compliance requirements.",
  items: industryContent.map(industry => ({
    id: industry.id,
    title: industry.name,
    description: industry.description,
    image: {
      src: industryImages[industry.id] || "/L&M-tech.png", // Fallback image
      alt: industry.name,
      width: 80,
      height: 80
    },
    href: `/equal/industries#${industry.id}`,
    icon: industryIcons[industry.id] || <Building size={24} />
  }))
};

const CARD_WIDTH = 320; // w-80 in px
const CARD_GAP = 24; // space-x-6 in px

const IndustrySection = React.memo(() => {
  const section = industrySection;
  const cta = { text: "Explore Industries", href: "/equal/industries" };
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -(CARD_WIDTH + CARD_GAP) : (CARD_WIDTH + CARD_GAP);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full px-8 py-12">
      <div className="mx-auto max-w-6xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.1 }}
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase mb-8 block">
            {section.subtitle}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.2 }}
          className={`text-2xl md:text-4xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES} mb-4`}
        >
          <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
            Custom workflows
          </span>{" "}
          for your industry
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.3 }}
          className="text-sm md:text-xl text-slate-600 leading-relaxed mb-8"
        >
          {section.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.4 }}
          className="mb-8"
        >
          <Link href={cta.href}>
            <ShimmerButton className="w-full md:w-auto text-md md:text-lg">
              {cta.text}
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
      {/* Full-bleed horizontal scroll container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: ANIMATION_CONFIG.duration,
          delay: 0.5
        }}
        className="relative"
      >
        <div 
          ref={scrollRef} 
          className="overflow-x-auto overflow-y-hidden pb-8 scrollbar-hide w-screen -mx-8 min-h-[380px] touch-pan-x"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex space-x-6 w-max" style={{ paddingLeft: 'max(2rem, calc((100vw - 1280px) / 2))', paddingRight: '2rem' }}>
            {section.items.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex-shrink-0 w-80"
              >
                <Link
                  href={item.href}
                  className="block w-full h-full"
                >
                  <BentoGridItem
                    title={
                      <div className="flex flex-col items-start w-full mt-auto mb-4 md:mb-4 md:transition-transform md:duration-300 md:group-hover:-translate-y-8">
                        <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center text-white mb-4 ml-0 md:transition-transform md:duration-300 md:group-hover:-translate-y-2">
                          {item.icon}
                        </div>
                        <span className="group-hover:text-[#00b140] transition-colors duration-300 text-md md:text-xl">
                          {item.title}
                        </span>
                      </div>
                    }
                    description={
                      <div className="text-left w-full md:mb-4 md:transition-transform md:duration-300 md:group-hover:-translate-y-8">
                        <p className="text-sm line-clamp-3">{item.description}</p>
                        <div className="block md:hidden mt-4">
                          <div className="inline-flex items-center justify-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[#00b140]/50 text-[#00b140] text-sm font-medium rounded-full transition-all duration-300 overflow-hidden">
                            <span>Learn More</span>
                            <ArrowRight className="h-4 w-4 text-[#00b140] ml-2" />
                          </div>
                        </div>
                      </div>
                    }
                    image={{
                      src: item.image.src,
                      alt: item.image.alt
                    }}
                    imagePosition="top-right"
                    imageSize="w-20 h-20 top-[-20px] right-[-15px] xl:w-48 xl:h-48 xl:top-[-60px] xl:right-[-55px]"
                    className="h-full min-h-[300px] md:min-h-[320px] bg-white/50 backdrop-blur-md border-slate-200 hover:border-[#00b140]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00b140]/10 flex flex-col justify-end items-start p-6"
                  />
                </Link>
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="w-full inline-flex items-center justify-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[#00b140]/50 text-[#00b140] text-sm font-medium rounded-full transition-all duration-300 overflow-hidden group-hover:bg-[#00b140]/5">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 text-[#00b140] transition-all duration-500 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0 delay-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chevron controls centered under cards */}
        <div className="w-full flex justify-center items-center space-x-3 z-10 mt-4 mb-2">
          <button
            type="button"
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#00b140]/10 hover:bg-[#00b140] transition-colors"
            aria-label="Scroll left"
            onClick={() => scrollByCard("left")}
          >
            <ChevronLeft className="w-6 h-6 text-[#00b140] group-hover:text-white transition-colors" />
          </button>
          <button
            type="button"
            className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#00b140]/10 hover:bg-[#00b140] transition-colors"
            aria-label="Scroll right"
            onClick={() => scrollByCard("right")}
          >
            <ChevronRight className="w-6 h-6 text-[#00b140] group-hover:text-white transition-colors" />
          </button>
        </div>
      </motion.div>
      
      
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

IndustrySection.displayName = 'IndustrySection';

export { IndustrySection }; 