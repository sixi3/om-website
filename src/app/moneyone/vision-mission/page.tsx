import React from "react";
import { TiltCard } from "../../onemoney/components/ui/tilt-card";
import { BackgroundGrid } from "@/components/ui/background-grid";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const visionContent = {
  title: "Our Vision & Mission",
  body: (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-[#00b140] mb-3">Our Vision</h3>
        <p className="text-foreground/80">
          To become India's most trusted and innovative Account Aggregator Technical Service Provider, 
          democratizing financial data access and empowering every individual and business with actionable 
          insights that drive informed financial decisions and inclusive growth.
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-[#00b140] mb-3">Our Mission</h3>
        <p className="text-foreground/80 mb-4">
          MoneyOne is revolutionizing how financial data flows in India's digital economy. As a leading 
          Account Aggregator TSP, we securely aggregate, analyze, and deliver comprehensive financial 
          insights that transform raw data into meaningful opportunities.
        </p>
        
        <p className="text-foreground/80 mb-4">
          We believe financial empowerment begins with understanding. Through our secure, consent-driven 
          platform built on India's Account Aggregator framework, we break down data silos and create 
          a unified view of financial health for individuals, businesses, and institutions.
        </p>
        
        <p className="text-foreground/80 mb-4">
          <strong>Our commitment extends beyond data aggregation:</strong>
        </p>
        
        <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
          <li><strong>Intelligent Insights:</strong> Transform complex financial data into clear, actionable insights that guide better decisions</li>
          <li><strong>Financial Inclusion:</strong> Bridge the gap between traditional banking and modern financial services for underserved communities</li>
          <li><strong>Trust & Security:</strong> Maintain the highest standards of data protection and user privacy with enterprise-grade security</li>
          <li><strong>Innovation:</strong> Continuously evolve our platform to meet the changing needs of India's dynamic financial landscape</li>
          <li><strong>Empowerment:</strong> Enable users to take control of their financial journey with comprehensive tools and personalized recommendations</li>
        </ul>
        
        <p className="text-foreground/80 mt-4">
          At MoneyOne, we're not just moving data — we're moving lives forward. Every connection we facilitate, 
          every insight we deliver, and every decision we empower contributes to building a more financially 
          inclusive and prosperous India.
        </p>
      </div>
    </div>
  ),
};

// Gallery Component with Team Photos
const TeamGallery = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 md:my-12 p-4">
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${metallicBlackTextClasses}`}>
        The MoneyOne Team
      </h2>
      <p className="text-center text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
        Meet the passionate innovators, engineers, and financial experts driving India's Account Aggregator revolution.
      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-neutral-300 dark:bg-neutral-700 rounded-xl overflow-hidden shadow-xl">
          <img 
            src="/team-pictures/moneyone-team.jpg" 
            alt="MoneyOne team - passionate innovators and financial experts driving India's Account Aggregator revolution" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};


export default function VisionMissionPage() {
  return (
    <>
      <BackgroundGrid />
      
      <main className="relative w-full overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16 mt-12">
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className={metallicBlackTextClasses}>Empowering Financial</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Futures</span>
            </h1>
            <p className="text-center mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              MoneyOne is India's leading Account Aggregator TSP, transforming financial data into actionable insights 
              that empower individuals and businesses to make smarter financial decisions.
            </p>
          </div>

          {/* Content Sections */}
          <div
            className="flex flex-col items-center gap-8 md:gap-12 max-w-7xl mx-auto"
            style={{ perspective: '1000px' }}
          >
            {/* Mission Section */}
            <TiltCard
              className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
            >
              <div className="relative z-20 text-foreground/90">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                  {visionContent.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-md md:text-lg">
                  {visionContent.body}
                </div>
              </div>
            </TiltCard>

            {/* Team Gallery Section */}
            <TeamGallery />
          </div>
        </div>
      </main>
    </>
  );
} 