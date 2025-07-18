import React from "react";
import type { Metadata } from "next";
import { SimpleHeader } from "./components/SimpleHeader";
import { SimpleFooter } from "./components/SimpleFooter";
import { AuroraBackground } from "./components/ui/aurora-background";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "OneMoney - Account Aggregator",
  description: "A secure financial data-sharing ecosystem",
  icons: {
    icon: "/onemoney-icon.png",
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
        <main className="flex-grow relative z-10 pt-20">
          {children}
        </main>
        <SimpleFooter />
      </div>
    </AuroraBackground>
  );
} 