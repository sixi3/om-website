"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MainFooter } from "./MainFooter";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show MainFooter on OneMoney pages (they have their own SimpleFooter in layout)
  // Check both pathname and domain for onemoney pages
  const isOneMoneyPage = pathname.startsWith('/onemoney') || 
    (typeof window !== 'undefined' && window.location.host.includes('onemoney.in'));
  
  if (isOneMoneyPage) {
    return null;
  }
  
  return <MainFooter />;
} 