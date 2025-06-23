"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/onemoney/components/ui/dialog";
import { GreenMetallicPhoneMockup } from "../components/ui/GreenMetallicPhoneMockup";
import { AnimatedVerificationFlow } from "../components/AnimatedVerificationFlow";
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";


const clientLogos = [
  { src: "/client-logos/Frame 5.png", alt: "Client Logo 5" },
  { src: "/client-logos/Frame 6.png", alt: "Client Logo 6" },
  { src: "/client-logos/Frame 7.png", alt: "Client Logo 7" },
  { src: "/client-logos/Frame 8.png", alt: "Client Logo 8" },
  { src: "/client-logos/Frame 9.png", alt: "Client Logo 9" },
  { src: "/client-logos/Frame 10.png", alt: "Client Logo 10" },
  { src: "/client-logos/Frame 11.png", alt: "Client Logo 11" },
  { src: "/client-logos/Frame 12.png", alt: "Client Logo 12" },
];

export function Hero() {
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMarquee(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-start pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center pl-1 pr-3 py-1 text-md font-semibold text-slate-800 mb-4 space-x-2 mx-auto lg:mx-0">
              <Image
                src="/icons8-medal-94.png" // Assuming image is in /public
                alt="Medal icon"
                width={24} // Adjusted size to fit better with text-xs
                height={24}
              />
              <span>India&apos;s Most Advanced Identity Verification Platform</span>
            </span>
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className={metallicBlackTextClasses}>Powering India&apos;s</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                Consent-Driven
              </span>{" "}
              <span className={metallicBlackTextClasses}>Financial Ecosystem</span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <GlowingButton>
                Book a Demo
              </GlowingButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Book a Demo</DialogTitle>
                <DialogDescription>
                  See how Equal can transform your verification process. Fill out the form below to schedule a demo with our team.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <TalkToUsForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="hidden lg:block relative w-full h-full">
        <div className="absolute -left-10 top-[50%] -translate-y-1/2 w-[800px] h-[600px] z-0">
            <Image
                src="/console-graphic.png"
                alt="Equal Console Graphic"
                fill
                className="object-contain"
            />
        </div>
        <div className="absolute top-[60%] -translate-y-1/2 right-[10%] z-10 scale-90">
            <GreenMetallicPhoneMockup>
              <AnimatedVerificationFlow />
            </GreenMetallicPhoneMockup>
        </div>
      </div>

      <div className="lg:col-span-2 w-full mt-40 min-h-[180px]">
        {showMarquee && (
          <>
            <div className="flex items-center gap-4 md:gap-8 mb-8">
              <div className="flex-grow h-px bg-foreground/20"></div>
              <h2 className="flex-shrink-0 text-lg font-regular text-foreground/80 tracking-wider uppercase">
                Trusted By India's Fastest-Growing Companies
              </h2>
              <div className="flex-grow h-px bg-foreground/20"></div>
            </div>
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
              {clientLogos.map((logo, index) => (
                <div key={index} className="mx-4 flex h-20 items-center justify-center">
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