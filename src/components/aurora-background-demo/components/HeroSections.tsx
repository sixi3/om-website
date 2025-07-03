"use client";

import { HeroSection } from '../types';
import { OneMoneyBentoGrid, MoneyOneBentoGrid, EqualBentoGrid } from './BentoGrids';

export const HERO_SECTIONS: HeroSection[] = [
  {
    id: 'onemoney',
    company: 'onemoney',
    badgeText: "India's First & Largest Account Aggregator",
    badgeIcon: "/icons8-medal-94.png",
    title: "The Future of Financial Data",
    highlightWord: "Future",
    subtitle: "India's largest businesses trust OneMoney for secure, consent-driven financial data sharing that enables innovation, compliance & growth.",
    ctaText: "Explore Now",
    ctaLink: "/onemoney",
    gradient: "from-[#00b140] to-[#087C32]",
    bentoComponent: OneMoneyBentoGrid
  },
  {
    id: 'moneyone',
    company: 'moneyone',
    badgeText: "India's Largest Account Aggregator TSP",
    badgeIcon: "/icons8-medal-94.png",
    title: "Empower Your Financial Journey",
    highlightWord: "Empower",
    subtitle: "MoneyOne puts you in control of your financial data with advanced tools for budgeting, analytics, and personalized insights.",
    ctaText: "Explore Now",
    ctaLink: "/moneyone",
    gradient: "from-[#087C32] to-[#00b140]",
    bentoComponent: MoneyOneBentoGrid
  },
  {
    id: 'equal',
    company: 'equal',
    badgeText: "India's Most Advanced Identity Verification Platform",
    badgeIcon: "/icons8-medal-94.png",
    title: "The Future of Identity",
    highlightWord: "Future",
    subtitle: "India's largest businesses use Equal to solve their identity needs enabling Trust, Convenience & Consent.",
    ctaText: "Explore Now",
    ctaLink: "/equal",
    gradient: "from-[#00b140] to-[#087C32]",
    bentoComponent: EqualBentoGrid
  }
]; 