import React from "react";
import type { Metadata } from "next";
import { MainHeader } from "@/components/global/MainHeader";
import { cn } from "@/lib/utils";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";

// MainHeader doesn't need nav items or theme configuration
// It handles navigation dynamically based on the current route

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
      <MainHeader />
      <main className="flex-grow relative z-10 pt-20">{children}</main>
      <EqualFooter />
    </AuroraBackground>
  );
} 