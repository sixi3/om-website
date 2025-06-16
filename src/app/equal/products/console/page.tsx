'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, BarChart, Settings, Zap, Shield, CheckCircle, XCircle, AlertTriangle, Workflow, Users, LineChart, Building, UserCheck, FileSpreadsheet, Database } from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const problemSolutions = [
  {
    problem: "Scattered emails, PDFs, WhatsApp screenshots",
    solution: "Centralized dashboard with status tracking",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    problem: "Multiple vendors = multiple logins",
    solution: "Unified control over all vendors through Equal",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    problem: "Manual report compilation = delays",
    solution: "Auto-consolidated BGV reports, ready to download",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  }
];

const consoleModules = [
  {
    title: "Live Status Dashboard",
    description: "Track candidates by name, ID, location, batch, or job role. Filter by 'pending', 'in-progress', 'failed', 'completed'. See timestamps of every step in the verification lifecycle.",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },
  {
    title: "Consolidated Report Manager",
    description: "Download all reports (PDF, CSV) for an individual or in bulk. Supports interim and final reports. Filter by verification type or date range.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Exception Management Engine",
    description: "Get real-time alerts for insufficiencies, delays, or mismatches. Approve, reject, escalate from the dashboard. Auto-assign to internal teams or re-route to backup vendors.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    title: "Custom Workflow Builder",
    description: "Build different flows for full-time vs contract vs gig roles. Create client-specific workflows if you're a staffing aggregator. Set mandatory/optional checks per job category.",
    icon: <Workflow className="w-6 h-6" />,
  },
  {
    title: "Bulk Management Tools",
    description: "Upload spreadsheets of 1000+ candidates. Trigger batch BGV with one click. Download all verification results as one zip.",
    icon: <FileSpreadsheet className="w-6 h-6" />,
  },
  {
    title: "Admin, Permissions & Roles",
    description: "Add HR, recruiter, and compliance roles with scoped access. Define who sees what reports and who can approve/override. Audit trail for every action taken on the platform.",
    icon: <Shield className="w-6 h-6" />,
  }
];

const reportsAndAnalytics = [
  {
    title: "TAT Dashboards",
    description: "Average time per check, per role",
    icon: <LineChart className="w-6 h-6" />,
  },
  {
    title: "Drop-off Analysis",
    description: "Where candidates fail or stop",
    icon: <BarChart className="w-6 h-6" />,
  },
  {
    title: "Success Rate Heatmaps",
    description: "By location, partner, or channel",
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: "ROI Tracker",
    description: "Cost per verification vs cost per hire",
    icon: <LineChart className="w-6 h-6" />,
  }
];

const teamRoles = [
  {
    role: "HR Ops",
    description: "Track onboarding, upload docs, download reports",
    icon: <Users className="w-6 h-6" />,
  },
  {
    role: "Compliance",
    description: "Verify audit trails, approve exceptions",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    role: "Recruitment",
    description: "Monitor candidate stages, retry failed BGVs",
    icon: <UserCheck className="w-6 h-6" />,
  },
  {
    role: "IT/Admin",
    description: "Set up API/webhook configs, role permissions",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    role: "CXOs",
    description: "View analytics on verification health",
    icon: <Building className="w-6 h-6" />,
  }
];

const integrations = [
  "Export to Darwinbox, Workday, SAP",
  "Push reports into internal CRMs or DMS",
  "Connect BI dashboards (PowerBI, Tableau) via webhook/API"
];

export default function ConsolePage() {
  return (
    <div className="relative">
      <GridBackground />
      
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
              <span className={metallicBlackTextClasses}>Your Single Pane of Glass for</span>{" "}
              <span className={highlightBgClass}>All Background Verifications</span>
            </h1>
            <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
              The Equal Console is your real-time dashboard to monitor candidate progress, resolve issues, 
              generate reports, and manage bulk hiring — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowingButton>
                Book Console Demo
              </GlowingButton>
              <GlowingButton className="bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10">
                Explore Admin Controls
              </GlowingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Why the</span>{" "}
            <span className={highlightBgClass}>Console Matters</span>
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

      {/* Console Modules Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Console</span>{" "}
            <span className={highlightBgClass}>Modules Overview</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consoleModules.map((module, index) => (
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
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {module.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {module.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports & Analytics Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Reports &</span>{" "}
            <span className={highlightBgClass}>Analytics</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reportsAndAnalytics.map((report, index) => (
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
                    {report.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {report.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {report.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Roles Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Built for</span>{" "}
            <span className={highlightBgClass}>Teams</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamRoles.map((role, index) => (
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
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {role.role}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={metallicBlackTextClasses}>Console Add-On</span>{" "}
            <span className={highlightBgClass}>Integrations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md"
              >
                <p className="text-slate-600 dark:text-slate-300">
                  {integration}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">
            From chaos to control — with one unified console.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingButton>
              Book a Live Walkthrough
            </GlowingButton>
            <GlowingButton className="bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10">
              Access Admin Demo Panel
            </GlowingButton>
          </div>
        </div>
      </section>
    </div>
  );
} 