import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Advisory Solutions | MoneyOne",
  description: "Intelligent financial advisory solutions with AI-driven insights, consolidated data, and goal-based planning powered by India's largest AA TSP.",
  openGraph: {
    title: "Financial Advisory Solutions | MoneyOne",
    description: "Intelligent financial advisory solutions with AI-driven insights, consolidated data, and goal-based planning powered by India's largest AA TSP.",
    url: 'https://www.moneyone.in/solutions/advisory',
    images: [
      {
        url: 'https://www.moneyone.in/moneyone-og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoneyOne Financial Advisory Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Financial Advisory Solutions | MoneyOne",
    description: "Intelligent financial advisory solutions with AI-driven insights and consolidated data.",
    images: ['https://www.moneyone.in/moneyone-og-image.png'],
  },
};

export default function AdvisoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
