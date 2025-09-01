"use client"; // Mark Hero as a Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import the Image component
import dynamic from 'next/dynamic'; // Import dynamic
import { GlowingButton } from "../components/ui/glowing-button"; // Import GlowingButton
import Marquee from "react-fast-marquee"; // Import Marquee
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"; // Added Dialog imports
import { TalkToUsForm } from "../components/forms/TalkToUsForm"; // Added Form import
import { ShimmerButton } from "@/components/ui/shimmer-button";
// import { Button } from "@/components/ui/button"; // We'll add this later if needed

// OneMoney client logos from om-list folder
const clientLogos = [
  { src: "/om-list/AngelOne.png", alt: "AngelOne" },
  { src: "/om-list/Bajaj Finserv.png", alt: "Bajaj Finserv" },
  { src: "/om-list/Bank of Baroda.png", alt: "Bank of Baroda" },
  { src: "/om-list/Groww.png", alt: "Groww" },
  { src: "/om-list/HDFC Bank.png", alt: "HDFC Bank" },
  { src: "/om-list/Hero Fincorp.png", alt: "Hero Fincorp" },
  { src: "/om-list/ICICI Bank.png", alt: "ICICI Bank" },
  { src: "/om-list/IDBI Bank.png", alt: "IDBI Bank" },
  { src: "/om-list/Kotak Mahindra Bank.png", alt: "Kotak Mahindra Bank" },
  { src: "/om-list/L&T Finance.png", alt: "L&T Finance" },
  { src: "/om-list/Mahindra Finance.png", alt: "Mahindra Finance" },
  { src: "/om-list/Motilal Oswal.png", alt: "Motilal Oswal" },
  { src: "/om-list/Muthoot Fincorp.png", alt: "Muthoot Fincorp" },
  { src: "/om-list/Poonawalla Fincorp.png", alt: "Poonawalla Fincorp" },
  { src: "/om-list/RBL Bank.png", alt: "RBL Bank" },
  { src: "/om-list/SBI.png", alt: "SBI" },
  { src: "/om-list/Upstox.png", alt: "Upstox" },
  { src: "/om-list/Yes Bank.png", alt: "Yes Bank" },
  { src: "/om-list/Zerodha.png", alt: "Zerodha" },
];

// Define metallic black class here too - Updated neutral shades
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Dynamically import Lottie component
const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });

export function Hero() {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [showMarquee, setShowMarquee] = useState(false); // State for marquee visibility

  useEffect(() => {
    let timerId: NodeJS.Timeout; // For cleanup
    fetch('/OneMoney-Hero.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        timerId = setTimeout(() => {
          setShowMarquee(true); 
        }, 300); // 300ms delay, adjust as needed
      })
      .catch(error => {
        console.error("Error fetching Lottie animation:", error);
        // Fallback: still show marquee after a delay even if Lottie fails, to prevent content being permanently hidden
        timerId = setTimeout(() => {
          setShowMarquee(true); 
        }, 300); 
      });

    return () => {
      if (timerId) {
        clearTimeout(timerId); // Cleanup the timer if the component unmounts
      }
    };
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
              <span>India&apos;s First RBI-Licensed Account Aggregator</span>
            </span>
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className={metallicBlackTextClasses}>Powering India&apos;s</span>{" "}
              <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                Consent-Driven
              </span>{" "}
              <span className={metallicBlackTextClasses}>Financial Ecosystem</span>
            </h1>
            <p className="text-md text-foreground/80 max-w-2xl mb-2 ">
              Get secure, authentic, and user-consented financial data from your consumers
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <ShimmerButton className="text-sm md:text-base uppercase">
                Explore Our Services
              </ShimmerButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Get in touch with us today!</DialogTitle>
                <DialogDescription>
                Are you ready to boost your financial services with India's Biggest Account Aggregator?
                </DialogDescription>
              </DialogHeader>
              <div className="py-1">
                <TalkToUsForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="hidden lg:block relative w-full h-full lg:pr-12 xl:pr-20">
        {/* <Image 
          src="/header-graphic.png" 
          alt="Hero graphic illustrating financial connections"
          fill={true} 
          sizes="(min-width: 1024px) 50vw, 0vw" // Takes roughly half the viewport
          className="object-contain" // Use contain to show the whole image proportionally
          priority 
        /> */}
        {animationData && (
          <DynamicLottie 
            animationData={animationData} 
            loop={true} 
            className="w-full object-contain h-auto xl:h-[500px]" // Adjust styling as needed
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