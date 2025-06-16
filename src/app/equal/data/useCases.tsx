import React from "react";
import { Building, Factory, HeartHandshake, Users } from "lucide-react"; 

export interface UseCase {
  id: string;
  title: string;
  icon: React.ReactNode;
  heroHeadline: string;
  heroSubheadline: string;
  ctas: { text: string; href: string }[];
  whyLove?: string[];
  whyMatters?: string[];
  builtFor?: string[] | { feature: string; description: string; }[];
  whyUse?: string[];
  capabilities?: { feature: string; description: string }[];
  designedForScale?: { feature: string; description: string }[];
  features?: { feature: string; description: string }[];
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
    icon: <Building size={32} strokeWidth={2} />,
    heroHeadline: "Seamless Background Verification Inside Your HRMS",
    heroSubheadline: "Enable real-time background checks directly within platforms like Darwinbox, Workday, and SAP — no switching, no delays.",
    ctas: [
      { text: "See Integration Demo", href: "#" },
      { text: "Download HRMS Implementation Guide", href: "#" },
    ],
    whyLove: [
      "Native HRMS embedding: Not just an API, it lives inside your HRMS interface.",
      "Pre-Offer & Post-Offer Support: Initiate verification at any hiring stage.",
      "Zero Workflow Disruption: Keep your team in the tools they already use."
    ],
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
    icon: <Factory size={32} strokeWidth={2} />,
    heroHeadline: "Verify and Activate Your Gig Workforce in Real-Time",
    heroSubheadline: "Purpose-built for delivery, ride-share, logistics, and marketplace onboarding.",
    ctas: [
      { text: "Try Bulk Verification Demo", href: "#" },
      { text: "View API Docs", href: "#" },
    ],
    whyMatters: [
      "< 2-second ID verifications",
      "Mobile-optimized for gig workers",
      "Continuous monitoring for platform trust"
    ],
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
    icon: <HeartHandshake size={32} strokeWidth={2} />,
    heroHeadline: "Compliance-First Verification Engine for Banks & NBFCs",
    heroSubheadline: "Audit-ready. RBI-compliant. Fast. A single-layer solution for onboarding regulated workforce.",
    ctas: [
      { text: "Explore Compliance Features", href: "#" },
      { text: "Download BFSI Playbook", href: "#" },
    ],
    builtFor: [
      "RBI + PMLA-ready documentation",
      "Risk scoring for financial roles",
      "Fully encrypted, zero-trust security model"
    ],
    features: [
      { feature: "CIBIL & Financial Checks", description: "Deep credit history, income, and account validation." },
      { feature: "Sanctions & Watchlists", description: "Global AML screening built-in." },
      { feature: "Dual-stage Verification", description: "Pre-offer and post-offer check workflows." },
      { feature: "Exception Handling Console", description: "Auto-resolution and escalation via Equal dashboard." },
      { feature: "Audit Trails", description: "Every check logged for traceability." },
    ],
    clients: [
      "Banks (private/public)",
      "Insurance companies",
      "NBFCs and microfinance lenders",
      "Wealth/Investment advisory firms"
    ],
    integratesWith: ["Darwinbox", "Local CRMs", "Custom HR tools"],
    bottomCta: { text: "Don't just meet compliance. Lead with it.", button: "Explore Financial Verification Suite", href: "#" },
  },
  {
    id: "staffing",
    title: "Staffing & Contract Roles",
    icon: <Users size={32} strokeWidth={2} />,
    heroHeadline: "High-Volume Contract Staffing Needs a Modern Verification Engine",
    heroSubheadline: "From logistics to retail, reduce BGV time from 7–10 days to <24 hours.",
    ctas: [
      { text: "Watch Staffing Workflow Demo", href: "#" },
      { text: "Schedule Bulk Integration Call", href: "#" },
    ],
    whyUse: [
      "All-in-one document collection and verification",
      "Bulk upload via dashboard or API",
      "Intelligent vendor routing and fallback logic"
    ],
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