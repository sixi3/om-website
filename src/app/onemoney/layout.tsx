import React from "react";
import type { Metadata } from "next";
import { SimpleHeader } from "./components/SimpleHeader";
import { SimpleFooter } from "./components/SimpleFooter";
import { AuroraBackground } from "./components/ui/aurora-background";
import { OneMoneyBreadcrumb } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "OneMoney - Account Aggregator",
  description: "A secure financial data-sharing ecosystem",
  icons: {
    icon: "/onemoney-icon.png",
    shortcut: "/onemoney-icon.png",
  },
};

export default function OneMoneyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuroraBackground>
      <div className={cn("min-h-screen bg-transparent font-sans antialiased flex flex-col")}>
        <SimpleHeader />
        <main className="flex-grow relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <OneMoneyBreadcrumb />
          </div>
          {children}
        </main>
        <SimpleFooter />
      </div>
    </AuroraBackground>
  );
} 