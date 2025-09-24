import React from "react";
import { IndustryHero } from "./components/IndustryHero";
import { IndustriesShowcase } from "./components/IndustriesShowcase";
import { BackgroundGrid } from "@/components/ui/background-grid";

export default function IndustriesPage() {
  return (
    <>
      <BackgroundGrid zIndex={-1} />
      <IndustryHero />
      <IndustriesShowcase />
    </>
  );
} 