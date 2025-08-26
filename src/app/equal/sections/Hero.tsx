"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
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
import { ShimmerButton } from "@/components/ui/shimmer-button";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Testimonial Card Component
const TestimonialCard = () => (
  <div className="relative bg-background/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 max-w-xl mx-auto lg:mx-0">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Image
            src="/test-avatar.png"
            alt="Testimonial author avatar"
            width={48}
            height={48}
            className="rounded-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-700 text-xs leading-relaxed italic">
          "Equal has transformed our verification process. The accuracy and speed are unmatched, and our customers love the seamless experience."
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Rahul Sharma</p>
            <p className="text-xs text-slate-500">CTO, FinTech Solutions</p>
          </div>
          <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center">
            <span className="text-xs text-slate-400 font-medium">LOGO</span>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full opacity-20"></div>
    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-20"></div>
  </div>
);

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
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-start pt-12 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center pl-1 pr-3 py-1 text-xs lg:text-md font-semibold text-slate-800 mb-6 md:mb-4 space-x-2 mx-auto lg:mx-0">
              <Image
                src="/icons8-medal-94.png" // Assuming image is in /public
                alt="Medal icon"
                width={24} // Adjusted size to fit better with text-xs
                height={24}
              />
              <span>India&apos;s Most Advanced Employee Verification Platform</span>
            </span>
            <h1 className="text-4xl tracking-tight leading-tight sm:text-8xl md:text-3xl lg:text-2xl xl:text-8xl">
              <span className={metallicBlackTextClasses}>The</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                Future
              </span>{" "}
              <span className={metallicBlackTextClasses}>of</span> 
              <br />
              <span className={metallicBlackTextClasses}>Employee Verifications</span>
            </h1>
            <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-8">
            India's largest businesses use Equal to solve their employee verification needs enabling Trust, Convenience & Consent.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <ShimmerButton className="text-lg uppercase">
                EXPLORE OUR SERVICES
              </ShimmerButton>
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
        {/* Testimonial Card */}
        <div className="mb-8 mt-12">
          <TestimonialCard />
        </div>
      </div>

      <div className="hidden lg:block relative w-full h-full">
        <div className="absolute w-[700px] h-[600px] -left-[5%] 2xl:-left-60 2xl:top-[50%] 2xl:-translate-y-1/2 2xl:w-[1200px] 2xl:h-[700px] z-0">
            <Image
                src="/console-graphic.png"
                alt="Equal Console Graphic"
                fill
                className="object-contain"
            />
        </div>
        <div className="absolute xl:scale-80 rounded-full xl:top-[50%] xl:-translate-y-1/2 xl:right-[2%] 2xl:top-[60%] 2xl:-translate-y-1/2 2xl:right-[10%] z-10 scale-110 2xl:scale-110">
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