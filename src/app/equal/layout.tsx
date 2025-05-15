import React from "react";
import type { Metadata } from "next";
import { GlobalHeader } from "@/components/global/GlobalHeader";
import { cn } from "@/lib/utils";

// Placeholder for Equal nav items
const navItems = [
  { name: "Invest", href: "/equal/invest" },
  { name: "Learn", href: "/equal/learn" },
  { name: "Community", href: "/equal/community" },
  { name: "Support", href: "/equal/support" },
];

export const metadata: Metadata = {
  title: "Equal - Financial Equality Platform",
  description: "Democratizing finance for everyone",
  icons: {
    icon: "/equal-icon.png",
  },
};

export default function EqualLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-orange-900/20 to-amber-700/10 font-sans antialiased flex flex-col")}>
      <GlobalHeader
        productName="equal"
        logoSrc="/equal-logo.svg" // Need to create this asset
        logoAlt="Equal Logo"
        navItems={navItems}
      />
      <main className="flex-grow relative z-10 pt-20">{children}</main>
      <footer className="py-6 border-t border-orange-800/10 bg-background/30 backdrop-blur-sm mt-auto">
        <div className="container">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} Equal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 