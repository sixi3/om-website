"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { Building2, Truck, Banknote, Users, Globe, FlaskConical } from "lucide-react";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const useCases = [
  {
    icon: <Building2 className="w-7 h-7 text-green-500" />, // HRMS Integration
    title: "HRMS Integration",
    bestFor: "Large enterprises with existing HR tech stacks",
    problems: [
      "BGV delays due to workflow switching",
      "Multiple vendor touchpoints",
      "Untrackable onboarding progress"
    ],
    approach: [
      "Embed directly into Darwinbox, SAP, or Workday",
      "Pre- and post-offer checks triggered inside HRMS",
      "Auto-consolidated BGV reports"
    ],
    integrations: "Darwinbox, Oracle, Zoho, SAP SuccessFactors",
    cta: { text: "See HRMS Flow Demo", href: "#" }
  },
  {
    icon: <Truck className="w-7 h-7 text-green-500" />, // Gig Economy Hiring
    title: "Gig Economy Hiring",
    bestFor: "Delivery platforms, marketplaces, ride-share apps",
    problems: [
      "High attrition, fast onboarding cycles",
      "Safety compliance pressure",
      "Low digital literacy among workers"
    ],
    approach: [
      "WhatsApp-first BGV flow",
      "Real-time driving license, RC, criminal, and ID check",
      "Auto-routing based on geography"
    ],
    integrations: "",
    results: "Reduce onboarding TAT from 5 days to under 24 hours",
    cta: { text: "Try Gig Worker Demo", href: "#" }
  },
  {
    icon: <Banknote className="w-7 h-7 text-green-500" />, // Financial Services
    title: "Financial Services (BFSI)",
    bestFor: "Banks, NBFCs, insurance firms, fintech lenders",
    problems: [
      "Compliance risk and audit failures",
      "Manual BGV recordkeeping",
      "Delay in sales rep deployment"
    ],
    features: [
      "CIBIL, PAN, Aadhaar, income tax and sanctions checks",
      "RBI/PMLA-compliant verification flows",
      "Real-time exception resolution"
    ],
    metrics: "50% faster onboarding, 25% OpEx savings",
    cta: { text: "Download BFSI Compliance Sheet", href: "#" }
  },
  {
    icon: <Users className="w-7 h-7 text-green-500" />, // Staffing & Contract Roles
    title: "Staffing & Contract Roles",
    bestFor: "Logistics firms, temp staffing agencies, high-churn businesses",
    before: [
      "7–10 day turnarounds",
      "Separate vendors for address, education, criminal checks",
      "Manual consolidation of PDFs"
    ],
    after: [
      "One dashboard for uploads and verifications",
      "Consolidated digital reports",
      "Bulk download support for enterprise clients"
    ],
    bonus: "Client-specific branding, workflows, and billing",
    cta: { text: "Watch Staffing Workflow Video", href: "#" }
  },
  {
    icon: <Globe className="w-7 h-7 text-green-500" />, // Platform Trust & Safety
    title: "Platform Trust & Safety",
    bestFor: "Peer-to-peer marketplaces, real estate platforms, gig aggregators",
    challenges: [
      "Continuous vetting of user-side agents",
      "Re-verification for returning workers",
      "Need for trust layer to avoid incidents"
    ],
    delivers: [
      "API-first identity layer",
      "Continuous monitoring (criminal updates, job status)",
      "Modular checks triggered at every interaction"
    ],
    examples: "Marketplace sellers, repair service providers, co-living agents",
    cta: { text: "Explore API-based Trust Layer", href: "#" }
  },
  {
    icon: <FlaskConical className="w-7 h-7 text-green-500" />, // Tech-Forward Startups / SMEs
    title: "Tech-Forward Startups / SMEs",
    bestFor: "API-first companies that want developer ownership",
    needs: [
      "Fast setup without sales calls",
      "Transparent pricing",
      "Developer-focused documentation"
    ],
    solution: [
      "Self-serve API access",
      "SDKs, Postman collections",
      "Slack-based dev support"
    ],
    bonus: "Hackathon-ready for rapid deployment"
  }
];

export function Solutions() {
  return (
    <section className="relative w-full py-12 md:py-20">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className={metallicBlackTextClasses}>Solutions for Every Industry, Role, and Risk Profile</span>
          </h2>
          <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
            Equal's modular architecture and intelligent routing make it suitable for enterprises, platforms, and startups alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingButton>
              Explore Industry Templates
            </GlowingButton>
            <GlowingButton className="bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10">
              Schedule Use Case Consultation
            </GlowingButton>
          </div>
        </div>

        {/* Use Case Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((uc, idx) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                {uc.icon}
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{uc.title}</h3>
              </div>
              <div className="mb-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                <span className="font-semibold">Best For:</span> {uc.bestFor}
              </div>
              {uc.problems && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Key Problems Solved:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.problems.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              )}
              {uc.challenges && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Key Challenges:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.challenges.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              )}
              {uc.before && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Before Equal:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.before.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}
              {uc.after && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">With Equal:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.after.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}
              {uc.approach && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Equal's Approach:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.approach.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}
              {uc.features && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Features:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
              {uc.solution && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Equal's Solution:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.solution.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
              {uc.delivers && (
                <div className="mb-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-200">Equal Delivers:</div>
                  <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300">
                    {uc.delivers.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              )}
              {uc.results && (
                <div className="mb-2 text-green-700 dark:text-green-400 font-semibold">Results: {uc.results}</div>
              )}
              {uc.metrics && (
                <div className="mb-2 text-green-700 dark:text-green-400 font-semibold">Key Metrics: {uc.metrics}</div>
              )}
              {uc.bonus && (
                <div className="mb-2 text-sky-700 dark:text-sky-400 font-semibold">Bonus: {uc.bonus}</div>
              )}
              {uc.examples && (
                <div className="mb-2 text-sky-700 dark:text-sky-400 font-semibold">Examples: {uc.examples}</div>
              )}
              {uc.integrations && (
                <div className="mb-2 text-slate-700 dark:text-slate-200"><span className="font-semibold">Key Integrations:</span> {uc.integrations}</div>
              )}
              {uc.cta && (
                <div className="mt-4">
                  <a href={uc.cta.href} className="inline-block text-primary font-semibold hover:underline">
                    {uc.cta.text} &rarr;
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 