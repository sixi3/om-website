import React from "react";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background";
import Marquee from "react-fast-marquee";

// Updated data based on the image
const statsData = [
  { id: "uptime", value: 99, label: "Uptime", prefix: "", suffix: "%" },
  { id: "users", value: 10, label: "Verified using Equal", prefix: "", suffix: "L+" },
  { id: "companies", value: 50, label: "Top companies using Equal", prefix: "", suffix: "+" },
  { id: "IDs", value: 30, label: "Checks in Production", prefix: "", suffix: "+" },
];

// Define metallic text classes
const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";
// Updated neutral shades for darker metallic black effect
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const supportedChecks = [
  "Aadhaar", "PAN Basic", "PAN Advanced (Aadhaar <> PAN Linkage)", "Bank Account Validation",
  "Voter ID", "Driving License", "Vehicle RC", "ESIC", "Social Media", "Criminal Checks",
  "Criminal Court (CCRV)", "Police verification through Law firm", "Global database check",
  "Salary Validation", "Payslip (Tampering + POO + MCA)", "Bank Statement (Match against Payslip)",
  "Credit Checks", "Credit check (CIBIL / CRIF / Experian / Equifax)", "India Credit Default Database Check",
  "Permanent Address check (Physical - PAN India Coverage)", "Current Address check (Physical - PAN India Coverage)",
  "Digital Address check", "Highest Education", "10th Standard", "12th Standard", "Undergrad",
  "Postgrad", "Diploma", "Current Employment", "Previous Employments", 
  "Self-Employment Check (Via Business PAN)", "PF UAN Advanced", "CV Validation", 
  "Directorship Check", "Right to Work (Govt ID)", "Professional Reference Check"
];

export function Stats({ showVerifyBanner = true }: { showVerifyBanner?: boolean } = {}) {
  return (
    <section className="relative w-full py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
            <span className={metallicBlackTextClasses}>India&apos;s Most</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              Comprehensive
            </span>{" "}
            <span className={metallicBlackTextClasses}>BGV Suite</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 justify-items-center mx-auto">
          {statsData.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
              <div className="text-4xl md:text-5xl lg:text-[90px] mb-2">
                <span className={metallicTextClasses}>{stat.prefix}</span>
                <AnimatedCounter 
                  value={stat.value} 
                  className={metallicTextClasses}
                />
                <span className={metallicTextClasses}>{stat.suffix}</span>
              </div>
              <p className="text-md md:text-lg font-semibold text-slate-800 pt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div> {/* End of container div */}
      {showVerifyBanner && (
        <>
          {/* Container for the title and lines - remove horizontal padding to allow lines to span full width */} 
          <div className="w-full">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8">
              <div className="flex-grow h-px bg-foreground/20"></div>
              <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
                VERIFY EVERYTHING WITH EQUAL
              </h2>
              <div className="flex-grow h-px bg-foreground/20"></div>
            </div>
          </div>
          {/* Marquee Banners */}
          <div className="mt-8 space-y-4">
            <Marquee gradient={false} speed={40} pauseOnHover={true}>
              {supportedChecks.map((check, index) => (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap rounded-full bg-background/10 backdrop-blur-md border border-slate-200 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300 mx-2"
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {check}
                </div>
              ))}
            </Marquee>
            <Marquee gradient={false} speed={40} pauseOnHover={true} direction="right">
              {supportedChecks.slice().reverse().map((check, index) => (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap rounded-full bg-background/10 backdrop-blur-md border border-slate-200 px-4 py-2 text-base font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300 mx-2"
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {check}
                </div>
              ))}
            </Marquee>
          </div>
        </>
      )}
    </section>
  );
} 