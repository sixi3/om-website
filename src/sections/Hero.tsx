"use client"; // Mark Hero as a Client Component

import React from "react";
import Image from "next/image"; // Import the Image component
import { GlowingButton } from "@/components/ui/glowing-button"; // Import GlowingButton
import Marquee from "react-fast-marquee"; // Import Marquee
// import { Button } from "@/components/ui/button"; // We'll add this later if needed

// Placeholder logos for the marquee - Increased count to 16
const clientLogos = [
  { name: "Client 1" }, { name: "Client 2" }, { name: "Client 3" }, { name: "Client 4" },
  { name: "Client 5" }, { name: "Client 6" }, { name: "Client 7" }, { name: "Client 8" },
  { name: "Client 9" }, { name: "Client 10" }, { name: "Client 11" }, { name: "Client 12" },
  { name: "Client 13" }, { name: "Client 14" }, { name: "Client 15" }, { name: "Client 16" },
];

// Define metallic black class here too - Updated neutral shades
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export function Hero() {
  return (
    <section className="w-full pt-10 pb-5 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10 xl:pt-24 xl:pb-12 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start space-y-6 text-left mb-24 md:mb-32">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-[#FFFFF]/50 backdrop-blur-sm pl-1 pr-3 py-1 text-xs font-semibold text-black mb-4 space-x-2">
              <Image
                src="/icons8-medal-94.png" // Assuming image is in /public
                alt="Medal icon"
                width={24} // Adjusted size to fit better with text-xs
                height={24}
                className="rounded-full" // Optional: keep it round
              />
              <span>India's First RBI-Licensed Account Aggregator</span>
            </span>
            <h1 className="text-4xl tracking-tighter leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className={metallicBlackTextClasses}>Powering India's</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                Consent-Driven
              </span>{" "}
              <span className={metallicBlackTextClasses}>Financial Ecosystem</span>
            </h1>
            <p className="text-md text-foreground/80 max-w-2xl mb-2 ">
              Get secure, authentic, and user-consented financial data from your consumers
            </p>
          </div>
          {/* Replace <a> with GlowingButton */}
          <GlowingButton>Talk to us</GlowingButton>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full">
        {/* Updated Label structure with flanking lines */}
        <div className="flex items-center gap-4 md:gap-8 mb-8">
          <div className="flex-grow h-px bg-foreground/20"></div> {/* Left Line */}
          <h2 className="flex-shrink-0 text-lg font-regular text-foreground/80 tracking-wider uppercase">
            Trusted By Industry Leaders
          </h2>
          <div className="flex-grow h-px bg-foreground/20"></div> {/* Right Line */}
        </div>

        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 flex h-16 w-32 items-center justify-center text-muted-foreground text-sm"
              title={logo.name}
            >
              {/* Replace with actual Image component later */}
              {logo.name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
} 