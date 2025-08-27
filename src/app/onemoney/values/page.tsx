"use client";
import React from "react";
import { Rocket, Users, Brain, Shield, Star } from 'lucide-react';
import { GlowingDivider } from "@/components/ui/glowing-divider";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const ourValues = [
  {
    title: "Founder Mindset, Relentless Execution",
    description: "Take Charge. Think Big. Execute Relentlessly.",
    icon: Rocket,
    image: "/values/Foundermindset.png",
  },
  {
    title: "Stronger Together, Greater Forever",
    description: "Collaboration is Our Competitive Advantage.",
    icon: Users,
    image: "/values/Strongertogether.png",
  },
  {
    title: "AI for India, Built for Scale",
    description: "Innovate with Purpose. Build for a Billion.",
    icon: Brain,
    image: "/values/AIforindia.png",
  },
  {
    title: "Privacy Complete, Trust Total",
    description: "Trust is Earned. Privacy is Sacred.",
    icon: Shield,
    image: "/values/Privacy.png",
  },
  {
    title: "Deliver the Extraordinary",
    description: "Excellence is the Standard, Not the Goal.",
    icon: Star,
    image: "/values/Extraordinary.png",
  }
];

export default function ValuesPage() {
  return (
    <main className="relative w-full pb-12 md:pb-16 overflow-hidden">
        
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
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

          {/* Values Cards Section */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-2">
            {ourValues.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-2xl shadow-lg w-full"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#baff29]/30 to-white/20 backdrop-blur-md border border-[#2F5734]/10 rounded-2xl" />
                  
                  {/* Card Content */}
                  <div className="relative p-4 pt-6 flex flex-col h-full">
                    {/* Title */}
                    <h3 className={`text-lg text-center font-bold mb-6 leading-wide tracking-wide text-[#062E14] drop-shadow-lg bg-clip-text dark:from-neutral-700 dark:to-neutral-900`}>
                      {item.title}
                    </h3>
                    
                    {/* Image */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#baff29]/30 blur-xl rounded-full scale-110"></div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-40 h-40 object-contain relative z-10"
                        />
                      </div>
                    </div>
                    
                    {/* Glowing Divider */}
                    <div className="mb-6">
                      <GlowingDivider 
                        width="1/2" 
                        intensity="medium" 
                        delay={idx * 0.1}
                      />
                    </div>
                    
                    {/* Description */}
                    <p className="text-[#2F5734] font-medium text-md text-center leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
    </main>
  );
} 