import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Services | MoneyOne - India's Largest AA TSP",
  description: "Comprehensive financial services solutions powered by India's largest Account Aggregator Technology Service Provider. KYC, data aggregation, and analytics.",
  openGraph: {
    title: "Financial Services | MoneyOne - India's Largest AA TSP",
    description: "Comprehensive financial services solutions powered by India's largest Account Aggregator Technology Service Provider. KYC, data aggregation, and analytics.",
    url: 'https://www.moneyone.in/financial-services',
    images: [
      {
        url: 'https://www.moneyone.in/moneyone-og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoneyOne Financial Services - India\'s Largest AA TSP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Financial Services | MoneyOne - India's Largest AA TSP",
    description: "Comprehensive financial services solutions powered by India's largest Account Aggregator Technology Service Provider.",
    images: ['https://www.moneyone.in/moneyone-og-image.png'],
  },
};

export default function FinancialServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
