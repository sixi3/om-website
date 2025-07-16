"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { CheckCircle, Shield, Globe, Link, Database, Monitor, FileText, Users, UserCheck, ShieldCheck, Download, Building2, Heart, Car, Landmark } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import Image from 'next/image';
import Marquee from "react-fast-marquee";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const highlights = [
  { area: "SOC 2 Type II", description: "Independent audit of security, availability & confidentiality", status: "Certified", icon: ShieldCheck, image: "/Compliance.png" },
  { area: "ISO 27001 & ISO 27701", description: "Global standard for information security & privacy", status: "Compliant", icon: Globe, image: "/Quarterly VAPT Tests.png" },
  { area: "GDPR & PMLA", description: "Meets EU privacy law and India's financial compliance norms", status: "Adherent", icon: FileText, image: "/Role-based Access Control.png" },
  { area: "PCI-DSS", description: "Secure handling of financial and personal data", status: "Certified", icon: Shield, image: "/END-END.png" },
  { area: "FIPS 140-2 Encryption", description: "AWS KMS-based 256-bit AES-GCM data encryption", status: "Active", icon: Database, image: "/Webhook Support.png" },
  { area: "Zero Trust Architecture", description: "Access control, role-based policies & real-time alerting", status: "Enabled", icon: Monitor, image: "/Bulk Onboarding.png" },
];

const architectureFeatures = [
  { feature: "End-to-End Encryption", description: "Data encrypted at rest and in transit with AES-256", icon: Shield, image: "/END-END.png" },
  { feature: "HTTPS-Only Communication", description: "Signed request verification for all API calls", icon: Globe, image: "/HTTPS-Only Communication.png" },
  { feature: "Candidate Communication", description: "Secure, multi-channel communication with candidates", icon: Link, image: "/Candidate Communication.png" },
  { feature: "Multi-Zone Storage", description: "Disaster recovery with geographically distributed data", icon: Database, image: "/Multi-Zone Storage.png" },
];

const auditTools = [
  { feature: "Real-time Monitoring", description: "View all verification events with timestamps", icon: Monitor, image: "/Real-Time Monitoring.png" },
  { feature: "Access Logs", description: "Know who accessed what and when", icon: FileText, image: "/Access Logs.png" },
  { feature: "Role-based Access Control", description: "Only authorized personnel can view sensitive info", icon: Users, image: "/Role-based Access Control.png" },
  { feature: "Candidate Consent Records", description: "Capture both general and check-level consent", icon: UserCheck, image: "/Candidate Consent Records.png" },
  { feature: "Quarterly VAPT Tests", description: "External penetration testing to ensure defenses hold", icon: ShieldCheck, image: "/Quarterly VAPT Tests.png" },
  { feature: "Exportable Audit Trails", description: "Easily shareable reports for auditors or regulators", icon: Download, image: "/Exportable Audit Trails.png" },
];

const industryCompliance = [
  {
    feature: "Financial Services",
    description: "RBI KYC Norms, PMLA, SEBI rules, digital audit trails, and check-level consent",
    icon: Building2,
    image: "/Financial Services.png",
  },
  {
    feature: "Healthcare",
    description: "HIPAA-aligned identity management with role-based access for medical recruiters",
    icon: Heart,
    image: "/Healthcare.png",
  },
  {
    feature: "Gig & Platform Economy",
    description: "Real-time background checks and identity validation for public-facing workers",
    icon: Car,
    image: "/Gig & Platform Economy.png",
  },
  {
    feature: "Government Contracts",
    description: "SCOSTA UID compliance with offline Aadhaar XML or eKYC flows supported",
    icon: Landmark,
    image: "/Government Contracts.png",
  },
];

const tabs = [
  { id: "compliance", title: "Compliance" },
  { id: "architecture", title: "Architecture" },
  { id: "audit", title: "Audit" },
  { id: "industries", title: "Industries" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TrustSecurityPage() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Compliance
        return (
          <div className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                  <span className={metallicBlackTextClasses}>Security & Compliance Highlights</span>
                </h3>
                <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 w-full mb-8">
                  Enterprise-grade certifications and compliance standards that ensure your data is protected at the highest level.
                </p>
              </div>
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-6 w-full max-w-none">
                {highlights.map((item, idx) => {
                  let className = "md:col-span-2 shadow-sm";
                  const IconComponent = item.icon;
                  return (
                    <BentoGridItem
                      key={idx}
                      className={className}
                      icon={
                        <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      }
                      title={
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{item.area}</span>
                          <span className="inline-block px-3 py-1 rounded-full bg-[#00b140] text-white text-xs font-semibold dark:bg-green-900 dark:text-green-300 dark:border-green-700">{item.status}</span>
                        </div>
                      }
                      description={
                        <div className="text-[16px] text-slate-600 dark:text-slate-300">{item.description}</div>
                      }
                      image={{
                        src: item.image,
                        alt: item.area
                      }}
                      imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                    />
                  );
                })}
              </BentoGrid>
            </div>
          </div>
        );

      case 1: // Architecture
        return (
          <div className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                  <span className={metallicBlackTextClasses}>Enterprise-Ready by Design</span>
                </h3>
                <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                  Built on robust architecture with multiple layers of security and data protection.
                </p>
              </div>
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-full max-w-none">
                {architectureFeatures.map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <BentoGridItem
                      key={idx}
                      className="shadow-sm"
                      icon={
                        <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      }
                      title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{feature.feature}</span>}
                      description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                      image={{
                        src: feature.image,
                        alt: feature.feature
                      }}
                      imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                    />
                  );
                })}
              </BentoGrid>
            </div>
          </div>
        );

      case 2: // Audit
        return (
          <div className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                  <span className={metallicBlackTextClasses}>Transparent, Traceable, Tamper-proof</span>
                </h3>
                <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                  Comprehensive audit and monitoring tools that provide complete visibility and control.
                </p>
              </div>
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-6 w-full max-w-none">
                {auditTools.map((tool, idx) => {
                  let className = "md:col-span-2 shadow-sm";
                  const IconComponent = tool.icon;
                  return (
                    <BentoGridItem
                      key={idx}
                      className={className}
                      icon={
                        <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      }
                      title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{tool.feature}</span>}
                      description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{tool.description}</span>}
                      image={{
                        src: tool.image,
                        alt: tool.feature
                      }}
                      imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                    />
                  );
                })}
              </BentoGrid>
            </div>
          </div>
        );

      case 3: // Industries
        return (
          <div className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                  <span className={metallicBlackTextClasses}>Industry-Specific Compliance</span>
                </h3>
                <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                  Tailored compliance solutions for different industries with trust-centered design philosophy.
                </p>
              </div>
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-full max-w-none">
                {industryCompliance.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <BentoGridItem
                      key={idx}
                      className="shadow-sm"
                      icon={
                        <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      }
                      title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{item.feature}</span>}
                      description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{item.description}</span>}
                      image={{
                        src: item.image,
                        alt: item.feature
                      }}
                      imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-15 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                    />
                  );
                })}
              </BentoGrid>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <GridBackground />
      {/* Hero Section */}
      <section className="relative w-full py-8">
        <div className="container px-4 md:px-6 mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className={metallicBlackTextClasses}>Security, Compliance & Trust — Baked Into</span><br />
            <span className={highlightBgClass}>Every Layer</span>
          </h2>
          <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 w-full mb-6">
            From encryption to certifications, Equal is designed for the highest levels of enterprise-grade compliance — across industries and geographies.
          </p>
          

        </div>

        <div className="container px-4 md:px-6 mx-auto">
          
        </div>

        <div className="w-full px-4">
          {/* Tab Navigation */}
          <div className="flex items-center justify-center pt-2 px-4 mb-8">
            <div className="flex items-center gap-2 sm:gap-4 p-2 rounded-full border-b-4 border border-slate-200 bg-linear-to-br from-white to-slate-100 backdrop-blur-md shadow-sm overflow-x-auto scrollbar-hide min-w-0 max-w-full">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-4 sm:px-8 py-4 text-sm md:text-md font-medium rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0 ${
                    activeTab === index
                      ? "text-white font-semibold"
                      : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {activeTab === index && (
                    <motion.div
                      layoutId="active-moneyone-tab"
                      className="absolute inset-0 bg-[#00b140] border-b-4 border-[#008000] rounded-full shadow-md z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      <section className="relative w-screen -mx-[50vw] left-1/2 mb-8">
          <div className="relative overflow-hidden bg-linear-to-l from-[#40916c] to-[#2d6a4f] dark:bg-green-500/10 py-4 text-center">
            <h3 className="text-lg font-medium tracking-wider text-[#baff29] font-semibold uppercase italic mb-2">"Trust is not a feature — it's the foundation."</h3>
            <div className="w-full overflow-hidden">
                              <Marquee gradient={false} speed={30} pauseOnHover={true}>
                  <div className="flex items-center gap-x-6 text-lg font-medium text-white mr-8">
                    <span className="whitespace-nowrap">Built on the principle of privacy by design</span>
                    <span className="text-[#baff29] mx-2">&bull;</span>
                    <span className="whitespace-nowrap">Aligned with global zero-trust frameworks</span>
                    <span className="text-[#baff29] mx-2">&bull;</span>
                    <span className="whitespace-nowrap">Trusted by Fortune 500 enterprises, banks, gig unicorns, and government institutions</span>
                    <span className="text-[#baff29] mx-2">&bull;</span>
                    <span className="whitespace-nowrap">Continuous security monitoring and real-time threat detection</span>
                    <span className="text-[#baff29] mx-2">&bull;</span>
                  </div>
                </Marquee>
            </div>
            
          </div>
        </section>
    </div>
  );
} 