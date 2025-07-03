import React from 'react';
import { BarChart3, ShieldCheck, Zap, Users, Building, Puzzle, Briefcase, TrendingUp } from 'lucide-react';
import { BentoItem } from './types';

// Icon factory function to avoid recreating icons
const createIcon = (IconComponent: React.ComponentType<any>, size = 24) => (
  React.createElement('div', {
    className: "w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center mb-4 text-white"
  }, React.createElement(IconComponent, { size, strokeWidth: 2 }))
);

export const ONE_MONEY_BENTO_DATA: BentoItem[] = [
  { 
    title: "OneMoney Account Aggregator", 
    description: "Consent-driven data sharing platform for financial institutions", 
    colSpan: 1, 
    icon: createIcon(BarChart3),
    image: { src: "/Candidate Consent Records.png", alt: "OneMoney Account Aggregator" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-64 md:h-64 -top-12 -right-12"
  },
  { 
    title: "Lending & Insurance Underwriting", 
    description: "Streamline loan processing and customer onboarding with secure data access", 
    colSpan: 1, 
    icon: createIcon(ShieldCheck),
    image: { src: "/Real-Time Monitoring.png", alt: "Lending & Insurance Underwriting" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-16 -right-12"
  },
  { 
    title: "Wealth Management", 
    description: "Gain a holistic view of client assets for personalized financial planning and advice.", 
    colSpan: 1, 
    icon: createIcon(Zap),
    image: { src: "/Financial Analytics.png", alt: "Wealth Management" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-16 -right-12"
  },
  { 
    title: "Personal Finance Management", 
    description: "Manage your personal finances with ease", 
    colSpan: 1, 
    icon: createIcon(TrendingUp),
    image: { src: "/ADMIN.png", alt: "Personal Finance Management" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-16 -right-12"
  },
];

export const MONEY_ONE_BENTO_DATA: BentoItem[] = [
  { 
    title: "FinPro FIU TSP", 
    description: "Efficiently integrate and request financial data through the account aggregator ecosystem and other consent based sharing under DPDP Act 2023", 
    colSpan: 1, 
    icon: createIcon(Building),
    image: { src: "/HR OPS.png", alt: "FinPro FIU TSP" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "FinShare FIP TSP", 
    description: "A specialised solution for FIPs to manage, secure, and share consent-based financial data while tracking consent and ensuring highest levels of data governance", 
    colSpan: 1, 
    icon: createIcon(Briefcase),
    image: { src: "/Exception Managment Engine.png", alt: "FinShare FIP TSP" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "Lending", 
    description: "Streamline every step of the lending lifecycle, from application to collection, with data-driven insights and comprehensive loan management tools", 
    colSpan: 1, 
    icon: createIcon(BarChart3),
    image: { src: "/Live Status Dashboard.png", alt: "Lending" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Advisory", 
    description: "Empower advisors to provide holistic and proactive financial guidance with consolidated data and advanced analytics for better client outcome", 
    colSpan: 1, 
    icon: createIcon(Puzzle),
    image: { src: "/Bulk Onboarding.png", alt: "Advisory" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Brokerage", 
    description: "Equip brokers with tools for streamlined operations, better client service, and improved compliance with real-time data access and reporting", 
    colSpan: 1, 
    icon: createIcon(ShieldCheck),
    image: { src: "/Webhook Support.png", alt: "Brokerage" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
];

export const EQUAL_BENTO_DATA: BentoItem[] = [
  { 
    title: "Equal ID Gateway", 
    description: "Advanced identity verification and KYC solutions", 
    colSpan: 1, 
    icon: createIcon(Users),
    image: { src: "/HRMS Integration.png", alt: "Equal ID Gateway" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "Equal Console", 
    description: "Comprehensive dashboard for verification management", 
    colSpan: 1, 
    icon: createIcon(Building),
    image: { src: "/Webhook Support.png", alt: "Equal Console" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-48 md:h-48 -top-12 -right-12"
  },
  { 
    title: "HRMS Integration", 
    description: "Seamless background verification inside your HRMS", 
    colSpan: 1, 
    icon: createIcon(Zap),
    image: { src: "/Bulk Managment Tools.png", alt: "HRMS Integration" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Gig Economy Hiring", 
    description: "Verify and activate your gig workforce in real-time", 
    colSpan: 1, 
    icon: createIcon(Puzzle),
    image: { src: "/Gig Economy Hiring.png", alt: "Gig Economy Hiring" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
  { 
    title: "Financial Services (BFSI)", 
    description: "Compliance-first verification engine for banks & NBFCs", 
    colSpan: 1, 
    icon: createIcon(TrendingUp),
    image: { src: "/Smart routing.png", alt: "Financial Services BFSI" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-12 -right-12"
  },
  { 
    title: "Staffing & Contract Roles", 
    description: "High-volume contract staffing needs a modern verification engine", 
    colSpan: 1, 
    icon: createIcon(ShieldCheck),
    image: { src: "/Recruitment.png", alt: "Staffing & Contract Roles" },
    imagePosition: "top-right",
    imageSize: "w-16 h-16 md:w-40 md:h-40 -top-10 -right-12"
  },
]; 