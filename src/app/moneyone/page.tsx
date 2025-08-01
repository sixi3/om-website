import React, { useMemo } from "react";
import { Hero } from "./sections/Hero";
import { WhatIsMoneyOne } from "./sections/WhatIsMoneyOne";
import { Solutions } from "./sections/Solutions";
import { Products } from "./sections/Products";
import { Services } from "./sections/Services";
import { ContactUs } from "./sections/ContactUs";
import { BackgroundGrid } from '@/components/ui/background-grid';
import { GlowingDivider } from "@/components/ui/glowing-divider";

export default function MoneyOnePage() {
  // Memoize static props for performance
  const glowingDividerProps = useMemo(() => ({
    width: "3/4" as const,
    intensity: "high" as const,
    className: "my-8 md:my-16"
  }), []);

  return (
    <div className="w-full overflow-x-hidden">
      <BackgroundGrid zIndex={-1} />
      <Hero />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.2}
      />
      
      <WhatIsMoneyOne />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.3}
      />
      
      <Solutions />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.6}
      />
      
      <Services />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.4}
      />
      
      <Products />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.5}
      />
      
      <ContactUs />
    </div>
  );
} 