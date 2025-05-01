import React from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";
import { GridBackground } from "@/components/ui/grid-background";

// Updated data based on the image
const statsData = [
  { id: "fip", value: 1, label: "FIP Coverage in India", prefix: "#", suffix: "" },
  { id: "fiu", value: 50, label: "FIUs use OneMoney", prefix: "", suffix: "%+" },
  { id: "data", value: 43.8, label: "Data Packets Delivered", prefix: "", suffix: "M", fixedDecimals: 1 },
  { id: "consents", value: 30, label: "Consents Fulfilled Monthly", prefix: "", suffix: "M" }, // Pass 30, suffix M
];

// Define metallic text classes
const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";
// Updated neutral shades for darker metallic black effect
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export function Stats() {
  return (
    <section className="relative w-full py-32">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
            <span className={metallicBlackTextClasses}>India's</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              Largest
            </span>{" "}
            <span className={metallicBlackTextClasses}>Account Aggregator</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center mx-auto">
          {statsData.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-2">
                <span className={metallicTextClasses}>{stat.prefix}</span>
                {stat.id === 'fip' ? (
                  <span className={metallicTextClasses}>1</span>
                ) : (
                  <AnimatedCounter 
                    value={stat.value} 
                    fixedDecimals={stat.fixedDecimals}
                    className={metallicTextClasses}
                  />
                )}
                <span className={metallicTextClasses}>{stat.suffix}</span>
              </div>
              <p className="text-lg font-semibold text-slate-800 pt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}