import React from "react";
import { Building, Factory, HeartHandshake, Users, Globe, FlaskConical } from "lucide-react"; 

export interface UseCase {
  id: string;
  title: string;
  icon: React.ReactNode;
  heroHeadline: string;
  heroSubheadline: string;
  bestFor: string[];
  ctas: { text: string; href: string }[];
  problems?: string[];
  approach?: string[];
  features?: { feature: string; description: string; }[] | string[];
  integrations?: string;
  results?: string;
  metrics?: string;
  before?: string[];
  after?: string[];
  bonus?: string;
  challenges?: string[];
  delivers?: string[];
  examples?: string;
  needs?: string[];
  solution?: string[];
  whyLove?: string[];
  whyMatters?: string[];
  builtFor?: string[] | { feature: string; description: string; }[];
  whyUse?: string[];
  capabilities?: { feature: string; description: string }[];
  designedForScale?: { feature: string; description: string }[];
  coreBenefits?: { feature: string; description: string }[];
  platforms?: string[];
  dev?: string[];
  useCases?: string[];
  advancedCoverage?: string[];
  clients?: string[];
  integratesWith?: string[];
  perks?: string[];
  bottomCta: { text: string; button: string; href: string };
}

export const useCasesData: UseCase[] = [
  {
    id: "hrms",
    title: "HRMS Integration",
    icon: <Building size={24} strokeWidth={2} className="text-green-600" />,
    heroHeadline: "Seamless Background Verification Inside Your HRMS",
    heroSubheadline: "Enable real-time background checks directly within platforms like Darwinbox, Workday, and SAP — no switching, no delays.",
    bestFor: ["Large enterprises", "Existing HR tech stacks", "MSME's"],
    ctas: [
      { text: "See HRMS Flow Demo", href: "#" }
    ],
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
    capabilities: [
      { feature: "Pre-Offer BGV", description: "Collect candidate documents early, verify post-offer to reduce delays." },
      { feature: "Auto-Consolidated Reports", description: "All results auto-organized in one dashboard within your HRMS." },
      { feature: "Candidate Communication", description: "Send links via WhatsApp, SMS, and Email for higher engagement." },
      { feature: "Real-Time Verification", description: "Most identity checks completed in seconds." },
      { feature: "One Billing Layer", description: "Replace multiple BGV vendors with a single contract and invoice." },
    ],
    platforms: ["Darwinbox", "SAP SuccessFactors", "Oracle PeopleSoft", "Zoho People", "Workday"],
    dev: [
      "REST APIs with Postman collections",
      "SDKs for Node.js, Python, Java",
      "Sandbox environment for testing"
    ],
    bottomCta: { text: "Experience zero-friction HR verification.", button: "Try HRMS-Native Demo", href: "#" },
  },
  {
    id: "gig-economy",
    title: "Gig Economy Hiring",
    icon: <Factory size={24} strokeWidth={2} className="text-green-600" />,
    heroHeadline: "Verify and Activate Your Gig Workforce in Real-Time",
    heroSubheadline: "Purpose-built for delivery, ride-share, logistics, and marketplace onboarding.",
    bestFor: ["Delivery platforms", "Marketplaces", "Ride-share apps"],
    ctas: [
       { text: "Try Gig Worker Demo", href: "#" }
    ],
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
    results: "Reduce onboarding TAT from 5 days to under 24 hours",
    designedForScale: [
      { feature: "Bulk Onboarding", description: "Handle 10,000+ verifications/day with unlimited scale." },
      { feature: "Mobile UX", description: "Fully responsive on smartphones with WhatsApp integration." },
      { feature: "Vehicle + Legal Verification", description: "Check RC, driving license, police records in one go." },
      { feature: "Safety-first Design", description: "AI-driven fraud detection and face-match tools." },
      { feature: "Smart Routing", description: "Auto-picks best vendor by geography and success rate." },
    ],
    useCases: [
      "Rider/Driver onboarding (e.g., Uber, Rapido)",
      "Delivery partner checks (e.g., Zomato, Swiggy)",
      "Freelancer verifications for marketplaces",
      "Real estate agents, micro-contractors, etc."
    ],
    advancedCoverage: [
      "ID: Aadhaar, PAN, DL, Passport",
      "Employment/Income: Payslips, PF UAN, ITR",
      "Vehicle: RC check, Insurance",
      "Legal: Criminal checks, Sanctions lists"
    ],
    bottomCta: { text: "Verify 1000+ gig workers in under an hour.", button: "Launch Demo Flow", href: "#" },
  },
  {
    id: "bfsi",
    title: "Financial Services (BFSI)",
    icon: <HeartHandshake size={24} strokeWidth={2} className="text-green-600" />,
    heroHeadline: "Compliance-First Verification Engine for Banks & NBFCs",
    heroSubheadline: "Audit-ready. RBI-compliant. Fast. A single-layer solution for onboarding regulated workforce.",
    bestFor: ["Banks & NBFCs", "Insurance firms", "Fintech lenders"],
    ctas: [
      { text: "Download BFSI Compliance Sheet", href: "#" }
    ],
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
    clients: [
      "Banks (private/public)",
      "Insurance companies",
      "NBFCs and microfinance lenders",
      "Wealth/Investment advisory firms"
    ],
    integratesWith: ["Darwinbox", "Local CRMs", "Custom HR tools"],
    capabilities: [
      { feature: "RBI & SEBI-Grade Compliance", description: "Built-in workflows that adhere to the latest RBI, SEBI, and PMLA guidelines for employee and agent verification." },
      { feature: "Continuous AML/Sanctions Monitoring", description: "Automated, ongoing checks against global and domestic sanctions, PEP, and adverse media lists to ensure continuous compliance." },
      { feature: "Secure Data Vault", description: "ISO 27001 and SOC 2 certified data handling with encryption at rest and in transit, ensuring audit-readiness and data privacy." },
      { feature: "Comprehensive Financial Health Checks", description: "Integrate CIBIL, ITR, and other financial history checks to assess the financial integrity of high-risk roles." },
      { feature: "Immutable Audit Logs", description: "Generate tamper-proof logs for every verification action, providing a clear and defensible audit trail for regulators." }
    ],
    bottomCta: { text: "Don't just meet compliance. Lead with it.", button: "Explore Financial Verification Suite", href: "#" },
  },
  {
    id: "staffing",
    title: "Staffing & Contract Roles",
    icon: <Users size={24} strokeWidth={2} className="text-green-600" />,
    heroHeadline: "High-Volume Contract Staffing Needs a Modern Verification Engine",
    heroSubheadline: "From logistics to retail, reduce BGV time from 7–10 days to <24 hours.",
    bestFor: ["Logistics firms", "Temp staffing agencies", "High-churn businesses"],
    ctas: [
      { text: "Watch Staffing Workflow Video", href: "#" }
    ],
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
    coreBenefits: [
      { feature: "Single Upload Flow", description: "One console to upload, verify, and manage checks." },
      { feature: "Document Auto-routing", description: "Platform auto-assigns checks to most efficient partner." },
      { feature: "Custom Workflows", description: "Tailor flows for clients in retail, logistics, or healthcare." },
      { feature: "Printable Reports", description: "Get branded PDFs + consolidated dashboards." },
      { feature: "Batch Download Support", description: "Export thousands of reports for internal use." },
    ],
    builtFor: [
      "Blue collar staffing agencies",
      "Logistics providers",
      "Security staffing",
      "Contract-based IT outsourcing"
    ],
    perks: [
      "Candidate self-service upload via Equal Gateway",
      "WhatsApp/SMS/email based communication",
      "Custom branding for staffing clients",
      "Unified billing for large clients with multiple flows"
    ],
    bottomCta: { text: "Your verification. Simplified at scale.", button: "Book a Staffing Demo", href: "#" },
  },
]; 