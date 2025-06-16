'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from '@/app/onemoney/components/ui/tilt-card';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { Shield, Lock, FileCheck, Server, Activity, Database } from 'lucide-react';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const securityFeatures = [
  {
    title: "Zero-Trust Architecture",
    description: "End-to-end encryption with zero data persistence. Your data never touches our servers.",
    icon: <Shield className="w-6 h-6" />,
    subPoints: [
      "Data encrypted in transit and at rest",
      "No data persistence on our servers",
      "Secure data transmission protocols"
    ]
  },
  {
    title: "Compliance & Audit",
    description: "Built for regulated industries with comprehensive audit trails and compliance reporting.",
    icon: <FileCheck className="w-6 h-6" />,
    subPoints: [
      "RBI & PMLA compliant",
      "Detailed audit logs",
      "Automated compliance reporting"
    ]
  },
  {
    title: "Continuous Monitoring",
    description: "Real-time monitoring and alerts for suspicious activities and system health.",
    icon: <Activity className="w-6 h-6" />,
    subPoints: [
      "24/7 system monitoring",
      "Real-time threat detection",
      "Automated incident response"
    ]
  }
];

export function TrustSecurity() {
  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <GridBackground />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Trust &</span>{" "}
            <span className={highlightBgClass}>Security</span>
          </h2>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
            Built with enterprise-grade security and compliance at its core, Equal ensures your data is always protected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {securityFeatures.map((feature, index) => (
            <TiltCard key={index} className="p-6 md:p-8 border border bg-background/10 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.subPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
} 