'use client';
import React from "react";
import Image from "next/image";
import { BarChart3, Workflow, Users, Headphones } from "lucide-react"; 
import { motion } from "framer-motion";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

// Card component for the new layout
const FeatureCard = ({ title, description, icon, imageSrc, imageAlt, mirrorImage }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  mirrorImage?: boolean;
}) => (
  <motion.div 
    className="group relative flex flex-col bg-white/10 backdrop-blur-md dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-2 hover:shadow-lg transition-all duration-300"
    
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Image at the top */}
    <div className="relative w-full aspect-video mb-4 rounded-lg border border-slate-100 dark:border-slate-700 overflow-hidden bg-slate-200/10 backdrop-blur-md dark:bg-slate-700">
      <Image 
        src={imageSrc}
        alt={imageAlt}
        fill={true}
        className={`object-cover transition-transform duration-300 ease-in-out group-hover:-translate-y-2 ${mirrorImage ? 'scale-x-[-1]' : ''}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
    </div>
    
    {/* Icon and title */}
    <div className="flex flex-col items-start mb-2 px-2">
      <div className="w-10 h-10 rounded-lg bg-[#00b140] flex items-center justify-center mr-3 text-white mb-2">
        {icon}
      </div>
      <h3 className={`text-xl font-bold ${metallicBlackTextClasses}`}>
        {title}
      </h3>
    </div>
    
    {/* Description */}
    <p className="text-sm px-2 pb-2 text-slate-600 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const featuresData = [
  {
    id: "analytics",
    title: "Custom Analytics / Report Builder",
    description: "Build comprehensive reports with advanced analytics to gain insights into your verification processes and drive decisions.",
    icon: <BarChart3 size={24} strokeWidth={2} />,
    imageSrc: "/ADMIN.png",
    imageAlt: "Custom Analytics Dashboard"
  },
  {
    id: "workflow",
    title: "Fully Customisable Workflow Builder",
    description: "Design and implement tailored verification workflows that match your specific business requirements and compliance needs.",
    icon: <Workflow size={24} strokeWidth={2} />,
    imageSrc: "/kye-uc/Enterprise Hiring.png",
    imageAlt: "Custom Workflow Builder"
  },
  {
    id: "deployment",
    title: "Deploy Human & Machine for CRM",
    description: "Seamlessly integrate human expertise with AI-powered automation to optimize your customer relationship management processes.",
    icon: <Users size={24} strokeWidth={2} />,
    imageSrc: "/kye-uc/Staffing & Contract.png",
    imageAlt: "Human and Machine CRM Integration",
    
  },
  {
    id: "support",
    title: "Managed Support & Client Success Team",
    description: "Get dedicated support from our expert team to ensure successful implementation, ongoing optimization, and maximum ROI.",
    icon: <Headphones size={24} strokeWidth={2} />,
    imageSrc: "/One Billing Layer.png",
    imageAlt: "Support and Client Success Team"
  },
];

export function WhatMakesEqualDifferent() {
  return (
    <motion.section
      className="relative w-full py-20 md:py-24 dark:bg-slate-900/60"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Why Equal is a</span>{" "}
            <span className={highlightBgClass}>
              Category of One
            </span>
          </h2>
          <p className="w-4/5 mx-auto font-medium text-lg text-slate-700 dark:text-slate-300">
            Equal delivers enterprise-grade solutions with advanced customization, seamless integration, and dedicated support to transform your verification processes.
          </p>
        </div>

        {/* Responsive grid: single line on large screens, 2x2 on smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
              
            />
          ))}
        </div>
        
        {/* Client Logos Section */}
        <div className="w-full mt-16">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mb-8">
            <div className="flex-grow h-px bg-foreground/20"></div>
            <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
              DEEPLY INTEGRATED WITH INDUSTRY LEADERS
            </h2>
            <div className="flex-grow h-px bg-foreground/20"></div>
          </div>
          
          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center w-full h-20 md:h-24">
              <img 
                src="/kye-clients/Airtel.png" 
                alt="Airtel" 
                className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-full h-20 md:h-24">
              <img 
                src="/kye-clients/L&T.png" 
                alt="L&T" 
                className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-full h-20 md:h-24">
              <img 
                src="/kye-clients/JSW.png" 
                alt="JSW" 
                className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-full h-20 md:h-24">
              <img 
                src="/kye-clients/McDonalds.png" 
                alt="McDonalds" 
                className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center w-full h-20 md:h-24 md:col-span-1 col-span-2">
              <img 
                src="/kye-clients/EY.png" 
                alt="EY" 
                className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 