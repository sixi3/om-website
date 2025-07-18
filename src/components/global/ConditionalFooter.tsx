"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MainFooter } from "./MainFooter";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show MainFooter on OneMoney pages (they have their own SimpleFooter in layout)
  if (pathname.startsWith('/onemoney')) {
    return null;
  }
  
  return <MainFooter />;
} 