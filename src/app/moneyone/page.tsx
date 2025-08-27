"use client"
import React, { useMemo, useEffect } from "react";
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

  // Handle hash-based navigation for smooth scrolling
  useEffect(() => {
    // Check if there's a hash in the URL
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      
      const element = document.getElementById(hash);
      
      if (element) {
        // Add a small delay to ensure the page is fully rendered
        setTimeout(() => {
          // Calculate offset for fixed header (assuming header height is around 96px)
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

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

      
      <Products />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.5}
      />
      
      <Services />
      
      <GlowingDivider 
        {...glowingDividerProps}
        delay={0.4}
      />
      
      <ContactUs />
      
      {/* Add CSS for smooth scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </div>
  );
} 