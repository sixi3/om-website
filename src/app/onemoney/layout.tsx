import React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { MainHeader } from "@/components/global/MainHeader";
import { AuroraBackground } from "./components/ui/aurora-background";
import { OneMoneyBreadcrumb } from "@/components/ui/breadcrumb";

// MainHeader handles navigation dynamically based on the current route

export const metadata: Metadata = {
  title: "OneMoney - India's First RBI-Licensed Account Aggregator",
  description: "Powering India's consent-driven financial ecosystem. Get secure, authentic, and user-consented financial data from consumers. Trusted by leading banks and financial institutions.",
  keywords: ["Account Aggregator", "Financial Data", "RBI Licensed", "Consent Driven", "Financial Ecosystem", "Banking", "Fintech", "Data Sharing"],
  authors: [{ name: "OneMoney" }],
  creator: "OneMoney",
  publisher: "OneMoney",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.onemoney.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "OneMoney - India's First RBI-Licensed Account Aggregator",
    description: "Powering India's consent-driven financial ecosystem. Get secure, authentic, and user-consented financial data from consumers. Trusted by leading banks and financial institutions.",
    url: 'https://www.onemoney.in',
    siteName: 'OneMoney',
    images: [
      {
        url: 'https://www.onemoney.in/onemoney-og-image.png',
        width: 1200,
        height: 630,
        alt: 'OneMoney - India\'s First RBI-Licensed Account Aggregator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "OneMoney - India's First RBI-Licensed Account Aggregator",
    description: "Powering India's consent-driven financial ecosystem. Get secure, authentic, and user-consented financial data from consumers.",
    images: ['https://www.onemoney.in/onemoney-og-image.png'],
    creator: '@onemoney',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/onemoney-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/onemoney-icon.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/onemoney-icon.png",
    apple: "/onemoney-icon.png",
  },
};

export default function OneMoneyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("min-h-screen font-sans antialiased flex flex-col")}>
      <AuroraBackground className="flex-grow flex flex-col pt-24 pb-12 md:pt-32 md:pb-16">
        <MainHeader />
        <main className="flex-grow relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <OneMoneyBreadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
          </div>
          {children}
        </main>
      </AuroraBackground>
    </div>
  );
} 