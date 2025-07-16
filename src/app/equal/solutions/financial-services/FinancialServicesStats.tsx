import React from "react";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import { 
  FileText, BanknoteArrowUp, CandlestickChart, ShieldCheck, 
  LineChart, ReceiptIndianRupee, Briefcase 
} from 'lucide-react';

// Updated data based on the image
const statsData = [
  { id: "fip", value: 1, label: "FIP Coverage in India", prefix: "#", suffix: "" },
  { id: "fiu", value: 49, label: "FIUs use OneMoney", prefix: "", suffix: "%+" },
  { id: "data", value: 79.9, label: "Data Packets Delivered", prefix: "", suffix: "M", fixedDecimals: 1 },
  { id: "consents", value: 28, label: "Consents Fulfilled Monthly", prefix: "", suffix: "M" }, // Pass 30, suffix M
];

// Define metallic text classes
const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";
// Updated neutral shades for darker metallic black effect
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const featuresPills = [
  { text: "Bank Statements", icon: FileText },
  { text: "Term & Recurring Deposits", icon: BanknoteArrowUp },
  { text: "Mutual Fund", icon: CandlestickChart },
  { text: "Insurance", icon: ShieldCheck },
  { text: "Equities", icon: LineChart },
  { text: "GSTN Data", icon: ReceiptIndianRupee },
  { text: "National Pension Scheme", icon: Briefcase },
];

export function FinancialServicesStats() {
  return (
    <section className="relative w-full py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
            <span className={metallicBlackTextClasses}>India&apos;s</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              Most Advanced
            </span>{" "}
            <span className={metallicBlackTextClasses}>Financial Data Platform</span>
          </h2>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl mt-4">
            Powering the future of financial services with secure, consent-driven data access and analytics
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center mx-auto">
          {statsData.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
              <div className="text-4xl md:text-5xl lg:text-8xl mb-2">
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
              <p className="text-lg font-semibold text-slate-600 pt-2">
                {stat.label}
              </p>
            </div>
            
          ))}
        </div>
      </div> {/* End of container div */}
            
      {/* Container for the title and lines - remove horizontal padding to allow lines to span full width */} 
      <div className="w-full">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8">
          <div className="flex-grow h-px bg-foreground/20"></div>
          <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
            Unlock access to diverse data sets
          </h2>
          <div className="flex-grow h-px bg-foreground/20"></div>
        </div>
      </div>
      {/* Pills Section */}
      <div className="mt-8 flex flex-col items-center space-y-4 ">
          {/* Row 1 (4 pills) */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-medium">
            {featuresPills.slice(0, 4).map((pill, index) => {
              const Icon = pill.icon;
              return (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap rounded-full bg-linear-to-br from-white to to-[#baff29]/20 backdrop-blur-md border border-[#00b140]/30 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <Icon className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                  {pill.text}
                </div>
              );
            })}
          </div>
          {/* Row 2 (3 pills) */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {featuresPills.slice(4, 7).map((pill, index) => {
              const Icon = pill.icon;
              return (
                <div
                  key={index + 4}
                  className="flex items-center whitespace-nowrap rounded-full bg-linear-to-br from-white to to-[#baff29]/20 backdrop-blur-md border border-[#00b140]/30 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <Icon className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                  {pill.text}
                </div>
              );
            })}
          </div>
        </div>

    </section>
  );
} 