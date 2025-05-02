import React from "react";
import { GridBackground } from "@/components/ui/grid-background"; // Optional background
import { Settings2, SlidersHorizontal, MonitorSmartphone, Palette } from "lucide-react"; // Added icon imports

// Copied from Solutions.tsx for consistency
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Placeholder features data - Added icons
const features = [
  { title: "Customisable Journeys", description: "Co-create custom journeys or use our tried & tested UI/UX", icon: Settings2 },
  { title: "Smart Configuration", description: "Custom configuration and smart routing", icon: SlidersHorizontal },
  { title: "Responsive Design", description: "Responsive Web/SDK journeys", icon: MonitorSmartphone },
  { title: "Brand Customization", description: "Customisable UI with brand logo, colours, and fonts", icon: Palette },
];

export function UIFeatures() {
  return (
    <section className="relative w-full py-24 md:py-32">
      {/* <GridBackground /> */}
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Title and Subtitle */} 
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>World Class</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              UI/UX
            </span>
            <span className={metallicBlackTextClasses}>, Customisable to your</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">Journeys</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-lg text-slate-700 dark:text-slate-300">
          Give your users the best UI/UX to connect their financial data
          </p>
        </div>

        {/* 2-Column Layout for Features and Video */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"> {/* Increased gap */}
          {/* Left Column: Feature Points */}
          <div className="space-y-8"> {/* Increased space between points */}
            {features.map((feature, index) => {
              const Icon = feature.icon; // Get icon component
              return (
                <div key={index}>
                  {/* Added flex container and icon */}
                  <h3 className="flex items-center text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    <Icon className="h-5 w-5 mr-2 text-green-600" /> 
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 pl-7"> {/* Added padding-left to align description */}
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Video Player */}
          <div className="rounded-lg overflow-hidden border border-border/40 shadow-lg aspect-video bg-neutral-200 dark:bg-neutral-800">
            <video
              src="/2025-05-01 22-21-31 (1).mp4" // Local video source
              width="100%"
              height="auto" // Height is handled by aspect ratio
              controls
              muted // Muted for potential autoplay, user can unmute
              playsInline
              preload="metadata"
              className="w-full h-full" // Ensure video fills container
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
} 