import React from "react";
import { UseCaseGrid } from "../sections/UseCaseGrid";
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { CheckCircle } from 'lucide-react';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const highlights = [
  { area: "SOC 2 Type II", description: "Independent audit of security, availability & confidentiality", status: "Certified" },
  { area: "ISO 27001 & ISO 27701", description: "Global standard for information security & privacy", status: "Compliant" },
  { area: "GDPR & PMLA", description: "Meets EU privacy law and India's financial compliance norms", status: "Adherent" },
  { area: "PCI-DSS", description: "Secure handling of financial and personal data", status: "Certified" },
  { area: "FIPS 140-2 Encryption", description: "AWS KMS-based 256-bit AES-GCM data encryption", status: "Active" },
  { area: "Zero Trust Architecture", description: "Access control, role-based policies & real-time alerting", status: "Enabled" },
];

const architectureFeatures = [
  "End-to-end encryption at rest and in transit",
  "HTTPS-only communication with signed request verification",
  "Blockchain-based audit trails for key verification records",
  "Multi-zone data storage with disaster recovery",
];

const auditTools = [
  { feature: "Real-time Monitoring", benefit: "View all verification events with timestamps" },
  { feature: "Access Logs", benefit: "Know who accessed what and when" },
  { feature: "Role-based Access Control", benefit: "Only authorized personnel can view sensitive info" },
  { feature: "Candidate Consent Records", benefit: "Capture both general and check-level consent" },
  { feature: "Quarterly VAPT Tests", benefit: "External penetration testing to ensure defenses hold" },
  { feature: "Exportable Audit Trails", benefit: "Easily shareable reports for auditors or regulators" },
];

const industryCompliance = [
  {
    industry: "Financial Services",
    points: [
      "RBI KYC Norms, PMLA, SEBI rules, and more",
      "Digital audit trails and audit-ready reports",
      "Check-level consent for every candidate",
    ],
  },
  {
    industry: "Healthcare",
    points: [
      "HIPAA-aligned identity management",
      "Role-based access for medical recruiters",
    ],
  },
  {
    industry: "Gig & Platform Economy",
    points: [
      "Real-time background checks for public-facing workers",
      "Identity validation and behavior monitoring for safety compliance",
    ],
  },
  {
    industry: "Government Contracts",
    points: [
      "SCOSTA UID compliance",
      "Offline Aadhaar XML or eKYC flows supported",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="relative">
      <GridBackground />
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto text-center mb-12 md:mb-16">
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
        <UseCaseGrid />
      </section>
    </div>
  );
}

export function TrustSecurityPage() {
  return (
    <div className="relative">
      <GridBackground />
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className={metallicBlackTextClasses}>Security, Compliance & Trust — Baked Into Every Layer</span>
          </h2>
          <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
            From encryption to certifications, Equal is designed for the highest levels of enterprise-grade compliance — across industries and geographies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingButton>
              Download Security Whitepaper
            </GlowingButton>
            <GlowingButton className="bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10">
              View Compliance Certificates
            </GlowingButton>
          </div>
        </div>

        {/* Security & Compliance Highlights */}
        <div className="container px-4 md:px-6 mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white text-center">Security & Compliance Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md flex flex-col h-full">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-slate-800 dark:text-white text-lg">{item.area}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 mb-2">{item.description}</div>
                <span className="inline-block mt-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-700">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Layer */}
        <div className="container px-4 md:px-6 mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Enterprise-Ready by Design</h3>
          <ul className="list-disc ml-6 text-slate-700 dark:text-slate-300 space-y-2">
            {architectureFeatures.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Audit & Monitoring Tools */}
        <div className="container px-4 md:px-6 mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Transparent, Traceable, Tamper-proof</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditTools.map((tool, idx) => (
              <div key={idx} className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md">
                <div className="font-semibold text-slate-800 dark:text-white mb-1">{tool.feature}</div>
                <div className="text-slate-600 dark:text-slate-300 text-sm">{tool.benefit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry-Specific Compliance */}
        <div className="container px-4 md:px-6 mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Industry-Specific Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryCompliance.map((item, idx) => (
              <div key={idx} className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md">
                <div className="font-semibold text-slate-800 dark:text-white mb-2">{item.industry}</div>
                <ul className="list-disc ml-5 text-slate-600 dark:text-slate-300 text-sm space-y-1">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust-Centered Design Philosophy */}
        <div className="container px-4 md:px-6 mx-auto mb-12">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Trust-Centered Design Philosophy</h3>
          <blockquote className="italic text-lg text-slate-700 dark:text-slate-300 mb-4 border-l-4 border-green-400 pl-4">"Trust is not a feature — it's the foundation."</blockquote>
          <ul className="list-disc ml-6 text-slate-700 dark:text-slate-300 space-y-2">
            <li>Built on the principle of privacy by design</li>
            <li>Aligned with global zero-trust frameworks</li>
            <li>Trusted by Fortune 500 enterprises, banks, gig unicorns, and government institutions</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 