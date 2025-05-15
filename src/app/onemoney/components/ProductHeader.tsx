"use client";

import React from "react";
import { GlobalHeader } from "@/components/global/GlobalHeader";
import { NavItem } from "@/components/global/GlobalHeader.types";
import { TalkToUsForm } from "./forms/TalkToUsForm";
import { 
  ShieldCheck,
  FileText,
  Target,
  Users,
  Milestone
} from "lucide-react";

// Define OneMoney-specific navigation items
const navItems: NavItem[] = [
  { 
    name: "Governance", 
    href: "#", // Main link might not navigate directly if it has a submenu
    showChevron: true,
    submenu: [
      { name: "Compliance", href: "/onemoney/compliance", icon: ShieldCheck },
      { name: "Policies", href: "/onemoney/policies", icon: FileText },
    ]
  },
  { 
    name: "About", 
    href: "#", 
    showChevron: true,
    submenu: [
      { name: "Vision and Mission", href: "/onemoney/vision-mission", icon: Target },
      { name: "Leadership", href: "/onemoney/leadership", icon: Users },
      { name: "Timeline and Achievements", href: "/onemoney/timeline", icon: Milestone },
    ] 
  },
  { name: "Use Cases", href: "/onemoney/#solutions" }, 
  { name: "Contact Us", href: "/onemoney/#contact-us" }, 
];

export function OneMoneyHeader() {
  return (
    <GlobalHeader
      productName="onemoney"
      logoSrc="/om-logo.svg"
      logoAlt="OneMoney Logo"
      logoWidth={140}
      logoHeight={40}
      navItems={navItems}
      talkToUsFormComponent={<TalkToUsForm />}
      talkToUsButtonText="Talk to Us"
    />
  );
} 