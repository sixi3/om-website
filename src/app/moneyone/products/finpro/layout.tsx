import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinPro - FIU TSP Solution | MoneyOne",
  description: "India's leading FIU TSP solution for seamless Account Aggregator integration. Multi-AA interoperability, smart consent flows, and real-time data access.",
  openGraph: {
    title: "FinPro - FIU TSP Solution | MoneyOne",
    description: "India's leading FIU TSP solution for seamless Account Aggregator integration. Multi-AA interoperability, smart consent flows, and real-time data access.",
    url: 'https://www.moneyone.in/products/finpro',
    images: [
      {
        url: 'https://www.moneyone.in/moneyone-og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoneyOne FinPro - FIU TSP Solution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FinPro - FIU TSP Solution | MoneyOne",
    description: "India's leading FIU TSP solution for seamless Account Aggregator integration.",
    images: ['https://www.moneyone.in/moneyone-og-image.png'],
  },
};

export default function FinProLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
