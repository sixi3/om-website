'use client';
import React from "react";
import { BentoGrid } from "@/app/onemoney/components/ui/bento-grid"; 
import { ServiceBentoCard } from "@/app/moneyone/components/ui/ServiceBentoCard";
import { Building, Factory, Handshake, HeartHandshake, Rocket, Users } from "lucide-react"; 
import { motion } from "framer-motion";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const useCasesData = [
  {
    id: "hrms",
    title: "HRMS Integration",
    description: "Embed BGV checks directly into Darwinbox, SAP, or Workday for seamless pre- and post-offer verification.",
    icon: <Building size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
  {
    id: "gig-economy",
    title: "Gig Economy Hiring",
    description: "Onboard your gig workforce in real-time with WhatsApp-first flows and instant ID, RC, and criminal checks.",
    icon: <Factory size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
  {
    id: "bfsi",
    title: "Financial Services (BFSI)",
    description: "Ensure compliance with RBI/PMLA-compliant flows for CIBIL, PAN, Aadhaar, and income tax checks.",
    icon: <HeartHandshake size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
    {
    id: "staffing",
    title: "Staffing & Contract Roles",
    description: "Consolidate vendors and manage high-volume staffing with a single dashboard and consolidated digital reports.",
    icon: <Users size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
  {
    id: "trust-safety",
    title: "Platform Trust & Safety",
    description: "Deploy an API-first identity layer with continuous monitoring for marketplaces and P2P platforms.",
    icon: <Handshake size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
  {
    id: "sme",
    title: "Tech-Forward Startups / SMEs",
    description: "Get up and running fast with self-serve API access, SDKs, and developer-focused documentation.",
    icon: <Rocket size={32} strokeWidth={2} />,
    className: "md:col-span-1",
  },
];

export function UseCaseGrid() {
  return (
    <motion.section
      className="relative w-full py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
                <span className={metallicBlackTextClasses}>One Platform,</span>{" "}
                <span className={highlightBgClass}>
                Every Use Case
                </span>
            </h2>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300">
                From enterprise to startups, Equal is built to handle every identity verification challenge.
            </p>
        </div>

        <BentoGrid className="gap-4 md:grid-cols-3"> 
          {useCasesData.map((item) => (
            <ServiceBentoCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>

        <div className="text-center mt-12">
            <GlowingButton>
                Schedule a Free Use Case Mapping Call
            </GlowingButton>
        </div>
      </div>
    </motion.section>
  );
} 