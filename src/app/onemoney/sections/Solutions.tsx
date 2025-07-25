import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { Landmark, ShieldCheck, TrendingUp, Plus, ChevronDown } from "lucide-react"; // Changed to ChevronDown
import Marquee from "react-fast-marquee"; // Added import
import Image from "next/image"; // Ensure Image is imported
// Image import from next/image is not strictly needed here anymore if not used directly in this file
// import Image from "next/image"; 

// Define metallic text classes (copied from Stats.tsx for consistency)
// Removed unused metallicTextClasses
// const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";


const solutions = [
  {
    id: 1,
    title: "Loan & Insurance Underwriting",
    description: "Streamline loan processing and customer onboarding with secure data access.",
    header: (
      <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
        <Image 
          src="/Bnl.png" 
          alt="Banking & Lending illustration"
          fill={true}
          className="object-cover"
          sizes="(max-width: 767px) 90vw, 33vw"
          quality={80}
        />
      </div>
    ),
    icon: <Landmark className="h-4 w-4 text-[#00b140]" />,
    className: "md:col-span-1",
  },
  {
    id: 2,
    title: "Personal Finance Management",
    description: "Manage your personal finances with ease and get personalised financial advice.",
    header: (
      <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
        <Image 
          src="/PFM.png" 
          alt="Personal Finance Management illustration"
          fill={true}
          className="object-cover"
          sizes="(max-width: 767px) 90vw, 33vw"
          quality={80}
        />
      </div>
    ),
    icon: <ShieldCheck className="h-4 w-4 text-[#00b140]" />,
    className: "md:col-span-1",
  },
  {
    id: 3,
    title: "Wealth Management",
    description: "Gain a holistic view of client assets for personalized financial planning and advice.",
    header: (
      <div className="relative w-full aspect-video min-h-[6rem] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
        <Image 
          src="/WM.png" 
          alt="Wealth Management illustration"
          fill={true}
          className="object-cover"
          sizes="(max-width: 767px) 90vw, 33vw"
          quality={80}
        />
      </div>
    ),
    icon: <TrendingUp className="h-4 w-4 text-[#00b140]" />,
    className: "md:col-span-1",
  },
];

const pillTexts = [
  "End-to-End Personal Loan Journey", "Credit Evaluation in Personal Loan Journeys", "Cashflow Lending for MSMEs",
  "Cashflow Lending for Businesses", "Credit Card Onboarding Journey", "Loan Monitoring for High-Risk Accounts", "Early Warning Signals for Mitigating High-Risk Accounts",
  "Predictive Analytics for Loan Monitoring", "Salary Verification", "F&O Onboarding", "Wealth Advisory",
  "Insurance Advisory", "Tax Advisory", "Term Insurance Onboarding", "Digital Term Insurance Onboarding",
  "Loan Against Mutual Funds"
]; // Added placeholder pill text data (17 items)

export function Solutions() {
  return (
    <section id="solutions" className="relative w-full py-24 overflow-hidden min-h-[80vh]">
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Tailored Solutions for</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              All Use Cases
            </span>
          </h2>
          <p className="w-full mx-auto text-lg text-slate-700 dark:text-slate-300">
            Discover how OneMoney empowers businesses of all sizes with secure and compliant data solutions.
          </p>
        </div>

        <BentoGrid className="mx-auto">
          {solutions.map((item) => (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>

        {/* Replaced Circle with Plus Icon with a text pill */}
        <div className="flex justify-center my-8"> {/* Adjusted margin for the new pill */}
          <div
            className="inline-flex items-center backdrop-blur-md rounded-full dark:border-neutral-700 px-6 py-3 text-sm font-medium text-slate-600 dark:bg-neutral-800 dark:text-neutral-300"
          >
            + AND MANY MORE
          </div>
        </div>

        {/* Optional: Add a Call to Action Button */}
        {/* <div className="flex justify-center mt-12 md:mt-16">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Explore All Solutions
          </button>
        </div> */}
      </div> {/* End of container div */}

      {/* Marquee Banners outside container */}
      <div className="mt-0 w-full"> {/* Reduced top margin */}
        <Marquee gradient={false} speed={40} pauseOnHover={true} direction="left"> {/* Explicitly set direction left */}
          {pillTexts.map((text, index) => (
            <div
              key={index}
              className="inline-block bg-background/10 backdrop-blur-md rounded-sm border border-slate-200 mr-3 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {text}
            </div>
          ))}
        </Marquee>
      </div>
      {/* Added Second Marquee Banner */}
      <div className="mt-4 w-full"> {/* Added top margin for spacing */}
        <Marquee gradient={false} speed={40} pauseOnHover={true} direction="right"> {/* Set direction right */}
          {pillTexts.slice().reverse().map((text, index) => (
            <div
              key={index}
              className="inline-block bg-background/10 backdrop-blur-md rounded-sm border border-slate-200 mr-3 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {text}
            </div>
          ))}
        </Marquee>
      </div>

    </section>
  );
} 