import React from "react";
import { Timeline } from "../components/ui/timeline";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const timelineData = [
  {
    title: "2025",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Conception of OneEqual Group</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">Together OneMoney and Equal become One Equal Group, India's largest Data Sharing Group with 130 million transactions done in March 2025.</p>
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Crossed 1 million users</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">OneMoney Growth rate sets new standards at 300% and solidifies its position as Industry Leader with a 53% share. </p>
        </div>
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Crossed 1 million users</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">A Strategic partnership with Equal, a young company in the business of Identity-as-a-Service and Data Sharing, is structured to create a new group committed to building data democracy in India, focused on Financial Inclusion. </p>
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Crossed 1 million users</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">Data sources expand, FIPs base increases and FIUs become actively interested.</p>
        </div>
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Crossed 1 million users</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">OneMoney establishes its position as the Industry Leader</p>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div className="space-y-4">
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Crossed 1 million users</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">Data sources expand, FIPs base increases and FIUs become actively interested.</p>
        </div>
        <div className="bg-background/20 border border-slate-200 backdrop-blur-md dark:border-neutral-700 rounded-lg p-4 shadow">
          <h4 className="font-semibold text-lg mb-1">Crossed 1 million users</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">OneMoney establishes its position as the Industry Leader</p>
        </div>
      </div>
    ),
  },
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