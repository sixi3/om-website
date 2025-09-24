import React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { MainHeader } from "@/components/global/MainHeader";
import { AuroraBackground } from "@/app/onemoney/components/ui/aurora-background";
import { MoneyOneBreadcrumb } from "@/components/ui/breadcrumb";

// MainHeader handles navigation dynamically based on the current route

export const metadata: Metadata = {
  title: "MoneyOne - India's Largest AA TSP",
  description: "India's Largest Account Aggregator Technology Service Provider. Aggregate, Assess, Act with comprehensive financial solutions.",
  icons: {
    icon: "/mo-logo.png",
    shortcut: "/mo-logo.png",
  },
  openGraph: {
    title: "MoneyOne - India's Largest AA TSP",
    description: "India's Largest Account Aggregator Technology Service Provider. Aggregate, Assess, Act with comprehensive financial solutions.",
    url: 'https://www.moneyone.in',
    siteName: 'MoneyOne',
    images: [
      {
        url: 'https://www.moneyone.in/moneyone-og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoneyOne - India\'s Largest AA TSP',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MoneyOne - India's Largest AA TSP",
    description: "India's Largest Account Aggregator Technology Service Provider. Aggregate, Assess, Act with comprehensive financial solutions.",
    images: ['https://www.moneyone.in/moneyone-og-image.png'],
  },
};

export default function MoneyOneLayout({
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
            <MoneyOneBreadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
          </div>
          {children}
        </main>
      </AuroraBackground>
    </div>
  );
} 