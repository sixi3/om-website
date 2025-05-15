"use client"; // Mark Hero as a Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/onemoney/components/ui/dialog"; 
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";
import Marquee from "react-fast-marquee";

// Define metallic black class
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Placeholder client logos - can be updated with MoneyOne specific logos later
const clientLogos = [
  { src: "/client-logos/Frame 5.png", alt: "Client Logo 5" },
  { src: "/client-logos/Frame 6.png", alt: "Client Logo 6" },
  { src: "/client-logos/Frame 7.png", alt: "Client Logo 7" },
  { src: "/client-logos/Frame 8.png", alt: "Client Logo 8" },
  { src: "/client-logos/Frame 9.png", alt: "Client Logo 9" },
];

// Dynamically import Lottie component
const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });

export function Hero() {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // Using the same animation for now, can be replaced with MoneyOne specific animation
    fetch('/header-animation.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        timerId = setTimeout(() => {
          setShowMarquee(true);
        }, 300);
      })
      .catch(error => {
        console.error("Error fetching Lottie animation:", error);
        timerId = setTimeout(() => {
          setShowMarquee(true);
        }, 300);
      });

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-start pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-[#FFFFF]/50 backdrop-blur-sm pl-1 pr-3 py-1 text-xs font-semibold text-black mb-4 space-x-2 mx-auto lg:mx-0">
              <Image
                src="/icons8-medal-94.png" 
                alt="MoneyOne icon"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>India&apos;s Largest Account Aggregator TSP</span>
            </span>
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-8xl">
              <span className={metallicBlackTextClasses}>India&apos;s</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                Largest
              </span>{" "}
              <span className={metallicBlackTextClasses}>AA TSP</span>
            </h1>
            <p className="text-md text-foreground/80 max-w-2xl mb-2">
              Empowering financial institutions with secure, consent-driven data access
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <GlowingButton>
                Talk to Us
              </GlowingButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Get in touch with us today!</DialogTitle>
                <DialogDescription>
                  Ready to leverage India's Largest AA TSP for your financial services?
                </DialogDescription>
              </DialogHeader>
              <div className="py-1">
                <TalkToUsForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Updated right column for the single offset image */}
      <div className="hidden lg:flex lg:items-center lg:justify-center relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-full lg:pl-8 xl:pl-0">
        {/* Container for positioning and perspective - updated aspect ratio */}
        <div className="relative w-[clamp(400px,80%,700px)] xl:w-[clamp(500px,80%,800px)] aspect-[20/13] group perspective-[1500px]">
          {/* Back Image */}
          <Image
            src="/moneyone-screenshot-large.png" // <-- REMEMBER TO REPLACE THIS WITH YOUR IMAGE PATH
            alt="MoneyOne Product Screenshot - Background Layer 2"
            fill
            className="object-contain rounded-lg shadow-xl transition-transform duration-500 ease-out group-hover:rotate-y-1 group-hover:scale-100 transform scale-90 rotate-y-2 rotate-z-2 translate-x-0 translate-y-0 md:translate-x-2 md:translate-y-2 lg:translate-x-4 lg:translate-y-4 z-10"
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 630px, 70vw"
            priority
          />
          {/* Middle Image */}
          <Image
            src="/moneyone-screenshot-large.png" // <-- REMEMBER TO REPLACE THIS WITH YOUR IMAGE PATH
            alt="MoneyOne Product Screenshot - Background Layer 1"
            fill
            className="object-contain rounded-lg shadow-xl transition-transform duration-500 ease-out group-hover:rotate-y-1 group-hover:scale-103 transform scale-95 rotate-y-3 -rotate-z-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-3 lg:translate-x-8 lg:translate-y-6 z-20"
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 665px, 75vw"
            priority
          />
          {/* Front Image */}
          <Image
            src="/moneyone-screenshot-large.png" // <-- REMEMBER TO REPLACE THIS WITH YOUR IMAGE PATH
            alt="MoneyOne Product Screenshot"
            fill
            className="object-contain rounded-lg shadow-2xl transition-transform duration-500 ease-out group-hover:rotate-y-2 group-hover:scale-105 transform rotate-y-4 -rotate-z-1 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-6 lg:translate-x-12 lg:translate-y-8 z-30"
            sizes="(min-width: 1280px) 800px, (min-width: 1024px) 700px, 80vw"
            priority
          />
        </div>
      </div>
    </section>
  );
} 