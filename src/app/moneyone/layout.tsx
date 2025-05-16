import React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { MoneyOneHeader } from "./components/ProductHeader";
import { AuroraBackground } from "@/app/onemoney/components/ui/aurora-background";

// Placeholder for MoneyOne nav items
const navItems = [
  { name: "Features", href: "/moneyone/features" },
  { name: "Pricing", href: "/moneyone/pricing" },
  { name: "About", href: "/moneyone/about" },
  { name: "Contact", href: "/moneyone/contact" },
];

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
        <MoneyOneHeader />
        <main className="flex-grow relative z-10">{children}</main>
        <footer className="py-6 border-t border-indigo-800/10 bg-transparent backdrop-blur-sm mt-auto">
          <div className="container">
            <p className="text-center text-sm text-foreground/60">
              © {new Date().getFullYear()} MoneyOne. All rights reserved.
            </p>
          </div>
        </footer>
      </AuroraBackground>
    </div>
  );
} 