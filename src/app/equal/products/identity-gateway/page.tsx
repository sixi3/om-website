'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, UploadCloud, FileCheck, ShieldCheck, Link, Settings, CheckCircle, XCircle, FileText, GraduationCap, CreditCard, MapPin, UserCheck, Code, Webhook, Terminal } from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const problemSolutions = [
  {
    problem: "Collecting IDs via email, WhatsApp, Excel is error-prone and untrackable",
    solution: "Unified digital gateway with pre-built flows",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    problem: "Manual back-and-forth with candidates delays onboarding",
    solution: "Real-time document capture and status tracking",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    problem: "Inconsistent documents = low verification success rate",
    solution: "Built-in validations and auto-format checks",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  }
];

const keyFeatures = [
  {
    title: "Multi-Channel Candidate Access",
    description: "Send links via WhatsApp, SMS, Email. Mobile-first UI for gig and field workers. No logins, no app installs.",
    icon: <Send className="w-6 h-6" />,
  },
  {
    title: "Real-Time Document Upload & Validation",
    description: "Accepts photos, scans, PDFs — intelligently validated. Front/back checks, selfie uploads, live video (optional). Smart reminders for incomplete uploads.",
    icon: <UploadCloud className="w-6 h-6" />,
  },
  {
    title: "Smart Document Parsing",
    description: "OCR and AI parsing of Aadhaar, PAN, DL, Passport, Mark Sheets. Auto-verification where government APIs are available. Flagging of low-confidence entries for manual QA.",
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    title: "Collect Now, Verify Later Mode",
    description: "Great for pre-offer hiring: gather data now, run checks only for final candidates. Saves verification cost until decision point.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Secure Consent Capture",
    description: "Digital signature with time-stamped logs. Optional check-level consent for regulated industries. Hosted on secure HTTPS with audit trails.",
    icon: <ShieldCheck className="w-6 h-6" />,
  }
];

const verificationOptions = [
  {
    category: "ID Proof",
    checks: ["Aadhaar", "PAN", "Passport", "DL"],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    category: "Employment",
    checks: ["Payslips", "UAN", "Offer Letter", "Relieving Letter"],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    category: "Education",
    checks: ["Provisional", "Degree Certificate", "Consolidated Marksheet"],
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    category: "Financial",
    checks: ["Bank Statement", "ITR", "CIBIL Report"],
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    category: "Address",
    checks: ["Utility Bill", "Rent Agreement", "GPS check"],
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    category: "Face Match",
    checks: ["Photo ID vs selfie live capture"],
    icon: <UserCheck className="w-6 h-6" />,
  }
];

const integrationOptions = [
  {
    title: "Hosted Page",
    description: "Zero code, white-labeled solution ready to use",
    icon: <Link className="w-6 h-6" />,
  },
  {
    title: "HR Portal Embed",
    description: "Seamlessly embed in your existing HR portal",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    title: "API Integration",
    description: "REST API to trigger gateway & receive updates",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "Webhook Support",
    description: "Real-time status updates via webhooks",
    icon: <Webhook className="w-6 h-6" />,
  }
];

const useCases = [
  "Gig onboarding: Send WhatsApp-based identity gateway to drivers/riders",
  "Enterprise hiring: Collect pre-offer documents before confirmation",
  "Staffing agencies: Create client-specific data flows",
  "BFSI roles: Capture multi-point ID + regulatory proof in one shot"
];

const developerFeatures = [
  "REST API to trigger gateway & receive updates",
  "Webhook push notifications on document upload or verification status",
  "Field-level configuration for each check",
  "JavaScript SDK and hosted environments"
];

export default function IdentityGatewayPage() {
  return (
    <div className="relative">
      <GridBackground />
      
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
              <span className={metallicBlackTextClasses}>One Gateway to Verify All</span>{" "}
              <span className={highlightBgClass}>Candidate Identities — Instantly</span>
            </h1>
            <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
              Equal's Identity Verification Gateway (IDG) is your digital front door for onboarding. 
              Collect, verify, and confirm identity documents from any user in real-time — no coding, no chasing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowingButton>
                Try Live Gateway Demo
              </GlowingButton>
              <GlowingButton className="bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10">
                View Technical Documentation
              </GlowingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Why Use</span>{" "}
            <span className={highlightBgClass}>Equal's ID Gateway?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemSolutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <div className="flex items-start gap-4 mb-4">
                  {item.problemIcon}
                  <p className="text-slate-600 dark:text-slate-300">
                    {item.problem}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  {item.solutionIcon}
                  <p className="text-slate-800 dark:text-white font-medium">
                    {item.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Key Features of the</span>{" "}
            <span className={highlightBgClass}>Identity Gateway</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Options Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Built-In</span>{" "}
            <span className={highlightBgClass}>Verification Options</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verificationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {option.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {option.checks.map((check, checkIndex) => (
                    <li key={checkIndex} className="text-slate-600 dark:text-slate-300">
                      • {check}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Options Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Integration</span>{" "}
            <span className={highlightBgClass}>Options</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {option.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Use</span>{" "}
            <span className={highlightBgClass}>Cases</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <p className="text-slate-600 dark:text-slate-300">
                  {useCase}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Features Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Developer</span>{" "}
            <span className={highlightBgClass}>Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">
            From Aadhaar to address – verify it all in under 5 minutes.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingButton>
              Try Gateway Demo
            </GlowingButton>
            <GlowingButton className="bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10">
              Request SDK Access
            </GlowingButton>
          </div>
        </div>
      </section>
    </div>
  );
} 