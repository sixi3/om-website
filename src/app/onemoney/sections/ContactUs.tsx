import React from "react";
import Image from "next/image";
import { TalkToUsForm } from "../components/forms/TalkToUsForm";
// Copied from Solutions.tsx for consistency
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export function ContactUs() {
  return (
    <section id="contact-us" className="relative w-full py-24 md:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Title and Subtitle */} 
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Ready to</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              Boost
            </span>
            <span className={metallicBlackTextClasses}>
              Your Financial Services?
            </span>
          </h2>
          <p className="max-w-[700px] mx-auto text-lg text-slate-700 dark:text-slate-300">
            Have questions or ready to get started? Reach out and let us know how we can help.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column: Text + Image */}
          <div className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400">
              Whether you're interested in learning more about our Account Aggregator 
              services, exploring partnership opportunities, or have specific questions, 
              our team is ready to assist you. Fill out the form or use the contact 
              details provided in our footer.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              We aim to respond to all inquiries within one business day.
            </p>
            {/* Replaced placeholder with Next Image */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <Image 
                src="/contact-us graphic.png"
                alt="Illustration of financial services connected across India"
                fill={true}
                sizes="(max-width: 768px) 90vw, 40vw" // Example sizes, adjust as needed
                className="object-contain" // Show whole image without distortion
                priority={false} // Not likely above the fold
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-background/10 b dark:bg-neutral-900 p-6 md:p-8 rounded-lg shadow-xl border border-slate-200 backdrop-blur-md">
            <TalkToUsForm /> 
          </div>
        </div>
      </div>
    </section>
  );
} 