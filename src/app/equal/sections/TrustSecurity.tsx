'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TiltCard } from '@/app/onemoney/components/ui/tilt-card';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { Shield, FileCheck, Activity, CheckCircle, ArrowRight } from 'lucide-react';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

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
    <section className="relative w-full py-20 md:py-24 overflow-hidden">
      
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>We take</span>{" "}
            <span className={highlightBgClass}>Compliance</span>{" "}
            <span className={metallicBlackTextClasses}>as</span>{" "}
            <span className={highlightBgClass}>Seriously</span>{" "}
            <span className={metallicBlackTextClasses}>as you do</span>
          </h2>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-5xl">
            Built with enterprise-grade security and compliance at its core, Equal ensures your data is always protected
          </p>
          <div className="mt-8">
            <Link href="/equal/trust-security" passHref>
              <span className="group inline-flex items-center justify-center rounded-full bg-linear-to-br from-white to-slate-100 border border-b-4 border-slate-200 dark:border-neutral-700 px-4 py-2 text-md font-medium text-slate-600 hover:bg-[#00b140] hover:text-[#00b140] transition-colors duration-300">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityFeatures.map((feature, index) => (
            <TiltCard key={index} className="p-6 border border-slate-200 dark:border-slate-800/50 bg-linear-to-br from-white to-[#baff29]/10 backdrop-blur-md hover:border-green-400/50 transition-all duration-300 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#00b140] text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-md font-medium text-slate-700 dark:text-slate-300 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.subPoints.map((point, idx) => (
                  <li key={idx}>
                    <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <Image src={"/3dcheck.png"} alt={point} width={20} height={20} />
                      <span>{point}</span>
                    </div>
                    {idx < feature.subPoints.length - 1 && (
                       <div className="h-0.5 w-6 mt-3 bg-slate-200 dark:bg-neutral-700/80" />
                    )}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
          <div className="w-full">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8">
              <div className="flex-grow h-px bg-foreground/20"></div>
              <h2 className="text-lg md:text-xl font-medium text-foreground/80 tracking-wider uppercase text-center flex-shrink">
                Certified & Compliant
              </h2>
              <div className="flex-grow h-px bg-foreground/20"></div>
            </div>
          </div>
            <div className="flex justify-center items-center gap-8 md:gap-24 flex-wrap">
                <Image src="/iso-cert.png" alt="ISO Certification" width={120} height={40} className="object-contain" />
                <Image src="/aicpa-cert.png" alt="AICPA Certification" width={120} height={40} className="object-contain" />
                <Image src="/aws-logo.png" alt="AWS Logo" width={120} height={40} className="object-contain" />
            </div>
        </div>
    </section>
  );
} 