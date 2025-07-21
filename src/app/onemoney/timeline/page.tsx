import React from "react";
import { Timeline } from "../components/ui/timeline";


const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const timelineData = [
  {
    title: "2016",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">Foundation & Regulatory Beginnings</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">OneMoney is founded by Mr. Krishna Prasad Atluri.</li>
            <li className="text-sm text-slate-700 dark:text-slate-300">RBI announces the world's pioneering Open Banking system, via the Account Aggregator (AA) framework Master Directions in India</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2017",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">Building Open Banking Services</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">Began putting together the building blocks for open banking services for the Citizens of India, while keeping the draft NBFC AA Regulations in perspective.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2018",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">RBI In-Principle Approval</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">Obtained In-Principle Approval from RBI to begin building the infrastructure and platform necessary to begin operations as an AA.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2019",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">First AA License & Major Partnerships</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">OneMoney became India's First Account Aggregator when RBI granted it the first AA license. </li>
            <li className="text-sm text-slate-700 dark:text-slate-300">SBI, India's Largest Bank chooses OneMoney as their preferred AA, and MoneyOne as their only TSP for working with the AA Ecosystem.</li>
            <li className="text-sm text-slate-700 dark:text-slate-300">The first ever Account Aggregator operating license is issued to OneMoney AA by RBI marking the operational launch of world's first Open Banking system.</li>
            <li className="text-sm text-slate-700 dark:text-slate-300">A formal launch of AA Ecosystem and OneMoney in Mumbai in the Presence of Mr Nandan Nilekani, architect of India's AADHAAR System, Mr Rajnish Kumar, Chairman SBI and others.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">AA Ecosystem Expansion</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">OneMoney continues evangelizing the AA Ecosystem by spreading the concept and persuading FIs to onboard.</li>
            <li className="text-sm text-slate-700 dark:text-slate-300">Bajaj FinServ, India's Largest NBFC, chooses OneMoney as their preferred AA, and MoneyOne as their only TSP for working with the AA Ecosystem.</li>
            </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">Operational Launch & Key Customers</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">Launched AA Operations, and began serving the Citizens and MSMEs. </li>
            <li className="text-sm text-slate-700 dark:text-slate-300">Lending Kart became one of most valuable and early customers, serving micro businesses. </li>
            </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">SaaS Revenue Growth</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">Growth continues and SaaS Revenues begin rolling in from BFSI customers.</li>
            </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">Market Leadership</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">Data sources expand, FIPs base increases and FIUs become actively interested. </li>
            <li className="text-sm text-slate-700 dark:text-slate-300">OneMoney establishes its position as the Industry Leader. </li>
            </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">Record Growth & Strategic Partnership</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">OneMoney Growth rate sets new standards at 300% and solidifies its position as Industry Leader with a 53% share. </li>
            <li className="text-sm text-slate-700 dark:text-slate-300">A Strategic partnership with Equal, a young company in the business of Identity-as-a-Service and Data Sharing, is structured to create a new group committed to building data democracy in India, focused on Financial Inclusion.</li>
            </ul>
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-2">Formation of OneEqual Group</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li className="text-sm text-slate-700 dark:text-slate-300">Together OneMoney and Equal become One Equal Group, India's largest Data Sharing Group with 130 million transactions done in March 2025</li>
            </ul>
        </div>
      </div>
    ),
  }
];

export default function TimelinePage() {
  return (
    <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">


        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Our Journey</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4">
            Explore the milestones and achievements that have shaped OneMoney's story so far.
          </p>
        </div>
        <Timeline data={timelineData} />
      </div>
    </main>
  );
} 