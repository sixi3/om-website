"use client";
import React from "react";
import { Rocket, Users, Brain, Shield, Star } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import { BackgroundGrid } from "@/components/ui/background-grid";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { EqualBreadcrumb } from "@/components/ui/breadcrumb";
import { MainHeader } from "@/components/global";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const ourValues = [
  {
    title: "Founder Mindset, Relentless Execution",
    description: "Take Charge. Think Big. Execute Relentlessly.",
    icon: Rocket,
    image: "/Leadership.png",
    className: "md:col-span-3"
  },
  {
    title: "Stronger Together, Greater Forever",
    description: "Collaboration is Our Competitive Advantage.",
    icon: Users,
    image: "/team.png",
    className: "md:col-span-3"
  },
  {
    title: "AI for India, Built for Scale",
    description: "Innovate with Purpose. Build for a Billion.",
    icon: Brain,
    image: "/AI Intelligence.png",
    className: "md:col-span-2"
  },
  {
    title: "Privacy Complete, Trust Total",
    description: "Trust is Earned. Privacy is Sacred.",
    icon: Shield,
    image: "/Secure Consent Capture.png",
    className: "md:col-span-2"
  },
  {
    title: "Deliver the Extraordinary",
    description: "Excellence is the Standard, Not the Goal.",
    icon: Star,
    image: "/Bulk Onboarding.png",
    className: "md:col-span-2"
  }
];

export default function ValuesPage() {
  return (
    <AuroraBackground>
      <MainHeader />  
      <BackgroundGrid />  
      <div className="w-full max-w-7xl px-4 md:px-6 relative z-10 pt-12">
        <EqualBreadcrumb />
        {/* Hero Section */}
        <div className="text-center my-12 md:my-16">
          <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className={metallicBlackTextClasses}>The</span>{" "}
            <span className={highlightBgClass}>Values</span>{" "}
            <span className={metallicBlackTextClasses}>That Guide Us</span>
          </h2>
          <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 w-full mb-6">
            Our values are the bedrock of our culture and the driving force behind our commitment to delivering excellence and building trust.
          </p>
        </div>

        {/* Values Section */}
        <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-6 w-full max-w-none">
            {ourValues.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <BentoGridItem
                  key={idx}
                  className={`${item.className} shadow-sm`}
                  icon={
                    <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  }
                  title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{item.title}</span>}
                  description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{item.description}</span>}
                  image={{
                    src: item.image,
                    alt: item.title
                  }}
                  imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-20 md:-right-10 lg:w-40 lg:h-40 lg:-top-15 lg:-right-10 xl:w-40 xl:h-40 xl:-top-15 xl:-right-10 2xl:w-40 2xl:h-40 2xl:-top-15 2xl:-right-10"
                />
              );
            })}
        </BentoGrid>
      </div>
    </AuroraBackground>
  );
} 