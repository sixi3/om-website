import React from "react";
import type { Metadata } from "next";
import { GlobalHeader } from "@/components/global/GlobalHeader";
import { GlobalHeaderProps } from "@/components/global/GlobalHeader.types";
import { cn } from "@/lib/utils";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';

// Placeholder for Equal nav items
const equalNavItems = [
  { name: 'Use Cases', href: '/equal/solutions' },
  { name: 'Products', href: '/equal/products', showChevron: true, submenu: [
    { name: 'Identity Verification Gateway', href: '/equal/products/identity-gateway' },
    { name: 'Equal Console', href: '/equal/products/console' },
  ]},
  { name: 'Trust & Security', href: '/equal/trust-security' },
];

const equalTheme: GlobalHeaderProps['theme'] = {
  accentColor: '#00b140', // A placeholder green
  accentHoverColor: '#baff29',
  buttonTextColor: '#000000',
};

const EqualFooter = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} Equal. All rights reserved.</p>
    </div>
  </footer>
);

export const metadata: Metadata = {
  title: "Equal - Financial Equality Platform",
  description: "Democratizing finance for everyone",
  icons: {
    icon: "/equal-icon.png",
  },
};

export default function EqualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground>
      <GlobalHeader
        productName="equal"
        logoSrc="/equal-logo.svg" // Placeholder logo path
        logoAlt="Equal Logo"
        navItems={equalNavItems}
        theme={equalTheme}
        talkToUsButtonText="Book a Demo"
      />
      <main className="flex-grow relative z-10 pt-20">{children}</main>
      <EqualFooter />
    </AuroraBackground>
  );
} 