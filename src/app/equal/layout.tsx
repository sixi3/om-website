import React from "react";
import type { Metadata } from "next";
import { MainHeader } from "@/components/global/MainHeader";
import { cn } from "@/lib/utils";
import { AuroraBackground } from '@/app/onemoney/components/ui/aurora-background';
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";
import { EqualBreadcrumb } from "@/components/ui/breadcrumb";


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
      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <EqualBreadcrumb />
        </div>
        {children}
      </main>
    </AuroraBackground>
  );
} 