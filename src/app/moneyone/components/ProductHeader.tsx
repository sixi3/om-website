"use client";

import React from "react";
import { GlobalHeader } from "@/components/global/GlobalHeader";
import { NavItem } from "@/components/global/GlobalHeader.types";
import { Building, LineChart, UsersRound, FileBox } from "lucide-react";
import { TalkToUsForm } from "./forms/TalkToUsForm";

// Define MoneyOne-specific navigation items based on the image
const navItems: NavItem[] = [
  { 
    name: "Product", 
    href: "/moneyone/product"
  },
  { 
    name: "Features", 
    href: "/moneyone/features"
  },
  { 
    name: "Use Cases", 
    href: "/moneyone/use-cases"
  },
  { 
    name: "Corporate Governance", 
    href: "/moneyone/governance"
  },
];

export function MoneyOneHeader() {
  return (
    <GlobalHeader
      productName="moneyone"
      logoSrc="/moneyone-logo.svg"
      logoAlt="MoneyOne Logo"
      logoWidth={140}
      logoHeight={40}
      navItems={navItems}
      talkToUsFormComponent={<TalkToUsForm />}
      talkToUsButtonText="TALK TO US"
    />
  );
} 