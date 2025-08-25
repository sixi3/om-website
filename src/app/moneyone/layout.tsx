import React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { MainHeader } from "@/components/global/MainHeader";
import { AuroraBackground } from "@/app/onemoney/components/ui/aurora-background";
import { MoneyOneBreadcrumb } from "@/components/ui/breadcrumb";

// MainHeader handles navigation dynamically based on the current route

export const metadata: Metadata = {
  title: "MoneyOne - Financial Solutions",
  description: "Your all-in-one financial management solution",
  icons: {
    icon: "/mo-logo.png",
    shortcut: "/mo-logo.png",
  },
};

export default function MoneyOneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("min-h-screen font-sans antialiased flex flex-col")}>
      <head>
        {/* Explicit favicon declarations to prevent Vercel override */}
        <link rel="icon" type="image/png" sizes="32x32" href="/mo-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/mo-logo.png" />
        <link rel="shortcut icon" href="/mo-logo.png" />
        <link rel="apple-touch-icon" href="/mo-logo.png" />
      </head>
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