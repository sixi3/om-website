import React from "react";
import type { Metadata } from "next";
import { MainHeader } from "@/components/global/MainHeader";
import { Footer } from "./components/Footer";
import { AuroraBackground } from "./components/ui/aurora-background";
import { cn } from "@/lib/utils"; // Assuming this path is still valid or will be adjusted if needed.

// If DM_Sans is specific to OneMoney, it should be here.
// For now, assuming dmSans is still global from the root layout.

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
    // The classNames here are based on the original root layout.
    // We might need to adjust dmSans.variable if it's not globally applied anymore.
    <AuroraBackground>
      <div className={cn("min-h-screen bg-transparent font-sans antialiased flex flex-col")}>
        <MainHeader />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </div>
    </AuroraBackground>
  );
} 