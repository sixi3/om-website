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
    icon: "/moneyone-icon.png",
  },
};

export default function MoneyOneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("min-h-screen font-sans antialiased flex flex-col")}>
      <AuroraBackground className="flex-grow flex flex-col">
        <MainHeader />
        <main className="flex-grow relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <MoneyOneBreadcrumb />
          </div>
          {children}
        </main>
      </AuroraBackground>
    </div>
  );
} 