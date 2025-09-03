import React from "react";
import { TiltCard } from "../../onemoney/components/ui/tilt-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { MainHeader } from "@/components/global/MainHeader";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { METALLIC_GREEN_TEXT_CLASSES } from "@/components/aurora-background-demo/constants";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const visionContent = {
  title: "Our Vision",
  body: (
    <div>
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 ${METALLIC_GREEN_TEXT_CLASSES}`}>
        Building a{' '}
        <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Better</span>
        {' '}India, One Connection at a Time
      </h2>
      <p>
        At Equal, we're building a better future for all Indians.
We see a future where every Indian — whether in a metro city or a remote village — has the same access to opportunities, services, and tools to improve their lives.

India is moving faster than ever in the digital era, powered by innovations like Aadhaar, UPI, and the Account Aggregator framework. Equal is here to be the trusted backbone of this transformation — connecting people, businesses, and institutions through secure, consent-driven platforms for identity, data, and access.

Our mission is bigger than technology. It's about breaking down barriers — of distance, language, and legacy systems — so that access and fairness are built into the system from day one. Whether it's helping a young entrepreneur start a business, enabling farmers to get better credit, or making public services easier to reach, we're here to make it possible.

We stand for trust, transparency, and interoperability. Your data should work for you, opening doors and unlocking opportunities, not creating roadblocks. By building trust-first infrastructure for India, we're creating a level playing field where everyone can participate and thrive.

We are Equal — building a better India, one connection at a time.
      </p>
    </div>
  ),
};

// Gallery Component with Team Photos
const TeamGallery = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 md:my-12 p-4">
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${metallicBlackTextClasses}`}>
        Our Team
      </h2>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px]">
        {/* Large featured image - spans 2x2 */}
        <div className="col-span-2 row-span-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg overflow-hidden">
          <img 
            src="/team-pictures/WhatsApp Image 2025-08-25 at 5.05.08 PM (1).jpeg" 
            alt="Equal team group photo" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Top right small image */}
        <div className="col-span-1 row-span-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg overflow-hidden">
          <img 
            src="/team-pictures/WhatsApp Image 2025-08-25 at 5.05.08 PM 1.png" 
            alt="Equal team members" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Bottom right small image */}
        <div className="col-span-1 row-span-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg overflow-hidden">
          <img 
            src="/team-pictures/WhatsApp Image 2025-08-25 at 5.05.13 PM.jpeg" 
            alt="Equal team members" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};


export default function VisionMissionPage() {
  return (
    <AuroraBackground>
      <BackgroundGrid />
      <MainHeader />
      
      <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
        </div>
        <div className="container px-4 md:px-6 mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className={metallicBlackTextClasses}>The Equal Vision</span>
            </h1>
            <p className="text-center mt-4 text-md text-neutral-500 dark:text-neutral-400">
              Equal is a platform that empowers you to share your data with the world, safely and securely with your consent
            </p>
          </div>

          {/* Content Sections */}
          <div
            className="flex flex-col items-center gap-8 md:gap-12 max-w-7xl mx-auto"
            style={{ perspective: '1000px' }}
          >
            {/* Mission Section */}
            <TiltCard
              className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
            >
              <div className="relative z-20 text-foreground/90">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                  {visionContent.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-md md:text-lg">
                  {visionContent.body}
                </div>
              </div>
            </TiltCard>

            {/* Team Gallery Section */}
            <TeamGallery />
          </div>
        </div>
      </main>
    </AuroraBackground>
  );
} 