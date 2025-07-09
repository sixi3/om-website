import React from "react";
import { Settings2, SlidersHorizontal, MonitorSmartphone, Palette } from "lucide-react"; // Added icon imports
import { TiltCard } from "../components/ui/tilt-card"; // Import TiltCard
import { ClayPhoneMockup } from "../components/ui/ClayPhoneMockup"; // Import mockup
import { AnimatedScreenContent } from "../components/AnimatedScreenContent"; // Import new component

// Copied from Solutions.tsx for consistency
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Placeholder features data - Added icons
const features = [
  { title: "Customisable Journeys", description: "Co-create custom journeys or use our tried & tested UI/UX", icon: Settings2 },
  { title: "Brand Customization", description: "Customisable UI with brand logo, colours, and fonts", icon: Palette },
  { title: "Smart Configuration", description: "Custom configuration and smart routing", icon: SlidersHorizontal },
  { title: "Responsive Design", description: "Responsive Web/SDK journeys", icon: MonitorSmartphone },
];

export function UIFeatures() {
  return (
    <section className="relative w-full py-24 md:py-32">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"> {/* Changed md:grid-cols-2 to lg:grid-cols-2 */}
          {/* Left Column: Feature Points */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8" 
            style={{ perspective: '1000px' }} // Add perspective here
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <TiltCard 
                  key={index} 
                  className="rounded-lg border border-slate-200/70 dark:border-slate-800 bg-background/20 dark:bg-neutral-900/30 p-5 sm:p-6 backdrop-blur-lg shadow-lg flex flex-col h-full"
                >
                  <div className="flex items-center mb-3">
                    <Icon className="h-6 w-6 mr-3 text-green-500" /> 
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </TiltCard>
              );
            })}
          </div>

          {/* Right Column: Phone mockup, centered and facing forward */}
          <div className="hidden lg:flex justify-center items-center"> 
            {/* Container for scaling the phone mockup */}
            <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] transform scale-90 sm:scale-100 mx-auto">
              <ClayPhoneMockup>
                <AnimatedScreenContent />
              </ClayPhoneMockup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 