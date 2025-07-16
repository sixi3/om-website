"use client"; // Mark Hero as a Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/onemoney/components/ui/dialog"; 
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";
import Marquee from "react-fast-marquee";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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
    fetch('/MoneyOne-Hero.json')
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
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-start pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-[#FFFFF]/50 backdrop-blur-sm pl-1 pr-3 py-1 text-md font-semibold text-black mb-4 space-x-2 mx-auto lg:mx-0">
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
              <ShimmerButton >
                EXPLORE TSP SERVICES
              </ShimmerButton>
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

      {/* Right column with Lottie Animation */}
      <div className="hidden lg:block relative w-full h-full lg:pr-12 xl:pr-20">
        {animationData && (
          <DynamicLottie 
            animationData={animationData} 
            loop={false} 
            className="w-full object-contain h-auto xl:h-[500px]" // Style similar to onemoney/Hero.tsx
          />
        )}
      </div>

      {/* Marquee section container: Always rendered to reserve space */}
      <div className="lg:col-span-2 w-full mt-16 md:mt-24 min-h-[180px]"> {/* Added min-h-[180px] */}
        {/* Conditionally render the content INSIDE the container */}
        {showMarquee && (
          <>
            <div className="flex items-center gap-4 md:gap-8 mb-8">
              <div className="flex-grow h-px bg-foreground/20"></div>
              <h2 className="flex-shrink-0 text-lg font-regular text-foreground/80 tracking-wider uppercase">
                Trusted By Industry Leaders
              </h2>
              <div className="flex-grow h-px bg-foreground/20"></div>
            </div>

            <Marquee gradient={false} speed={50} pauseOnHover={true}>
              {clientLogos.map((logo, index) => (
                <div
                  key={index}
                  className="mx-4 flex h-20 items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={45}
                    className="object-contain"
                    sizes="160px"
                    quality={80}
                  />
                </div>
              ))}
            </Marquee>
          </>
        )}
      </div>
    </section>
  );
} 