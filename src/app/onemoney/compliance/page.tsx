import React from "react";
import { TiltCard } from "../components/ui/tilt-card";
import { GridBackground } from "../components/ui/grid-background";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const complianceContent = [
  {
    id: 1,
    title: "1. Compliance with AA Master Directions",
    body: (
      <p>
        At <strong>OneMoney</strong>, we strictly adhere to the{" "}
        <strong>RBI's Account Aggregator (AA) Master Directions</strong>,
        ensuring a fully compliant, secure, and consent-driven financial data-sharing ecosystem.{" "}
        As an <strong>RBI-licensed Account Aggregator,</strong> we do not store, process, or access user financial data{" "}
        but act as a <strong>data-blind consent custodian</strong>, facilitating encrypted data exchange between Financial{" "}
        Information Providers (FIPs) and Financial Information Users (FIUs) only with{" "}
        <strong>explicit user consent</strong>. Our platform is built on the principles of{" "}
        <strong>data privacy, security, and transparency,</strong> ensuring users maintain full control over their financial{" "}
        information at all times. By following the regulatory framework, OneMoney upholds the highest compliance standards,{" "}
        empowering businesses and individuals with a safe, seamless, and efficient data-sharing experience.
      </p>
    ),
  },
  {
    id: 2,
    title: "2. Governance & Regulatory Compliance",
    body: (
      <>
        <p className="mb-4">
          OneMoney maintains robust corporate governance through three key regulatory committees that oversee our operations and ensure adherence to compliance requirements:
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">Nomination Committee</h4>
            <p>Ensures transparency in leadership appointments and evaluates board effectiveness, maintaining high standards of corporate governance and organizational leadership.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Audit Committee</h4>
            <p>Oversees financial reporting, internal controls, and compliance processes. The committee conducts regular reviews to ensure adherence to regulatory requirements and maintains the integrity of our financial operations.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Risk Management Committee</h4>
            <p>Identifies, assesses, and monitors potential risks while implementing comprehensive risk mitigation strategies. This committee ensures the safety and stability of our Account Aggregator operations.</p>
          </div>
        </div>
        <p className="mt-4">
          These committees work in tandem to maintain OneMoney\'s commitment to regulatory compliance, operational excellence, and stakeholder trust. Each committee comprises experienced professionals who bring their expertise to ensure the highest standards of corporate governance.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "3. DPDP 2023",
    body: (
      <p>
        For every OneMoney data sharing transaction, consent of the user is sought as per the DPDP Act 2023.
      </p>
    ),
  },
];

export default function CompliancePage() {
  return (
    <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 pt-8">
          <nav
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm flex items-center space-x-2 text-sm text-slate-600"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-2">
              <li className="flex items-center">
                <Link
                  href="/onemoney"
                  className="hover:text-[#00b140] transition-colors duration-200 flex items-center"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2" aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </span>
                <span className="font-medium text-slate-900" aria-current="page">
                  Compliance
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Compliance</span>
          </h1>
        </div>

        {/* Content Cards */}
        <div
          className="flex flex-col items-center gap-8 md:gap-12 max-w-4xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {complianceContent.map((item) => (
            <TiltCard
              key={item.id}
              className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
            >
              <div className="relative z-20 text-foreground/90">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                  {item.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {item.body}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </main>
  );
} 