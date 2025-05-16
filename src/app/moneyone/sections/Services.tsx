'use client';
import React from "react";
import { BentoGrid } from "@/app/onemoney/components/ui/bento-grid"; 
import { ServiceBentoCard } from "../components/ui/ServiceBentoCard";
import { Eye, Lightbulb, ShieldCheck, Zap } from "lucide-react"; 
import { motion } from "framer-motion";

// Consistent styling for highlighted text in titles
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold rounded-md";

const servicesData = [
  {
    id: "Advanced Analytics",
    title: "Advanced Analytics",
    description: "Access detailed analytics and insights on Mutual Funds, Stocks, FDs, GST, Bank Statements, and more",
    icon: <Eye size={36} strokeWidth={2} />,
    className: "md:col-span-2",
    imageSrc: "/analytics.png",
    imageAlt: "Financial analytics dashboard visualization"
  },
  {
    id: "Routing",
    title: "Smart AA Routing",
    description: "Our Smart AA Router dynamically switches between AAs to optimise traffic distribution and maximise success rates",
    icon: <Lightbulb size={32} strokeWidth={2} />,
    className: "md:col-span-1",
    imageSrc: "/routing.png",
    imageAlt: "Smart routing visualization"
  },
  {
    id: "UI",
    title: "Customisable UI",
    description: "Create your perfect user experience using our Plug-n-Play UI or use our UI flows built by our design experts",
    icon: <ShieldCheck size={32} strokeWidth={2} />,
    className: "md:col-span-1",
    imageSrc: "/UI.png",
    imageAlt: "UI customization illustration"
  },
  {
    id: "insights",
    title: "Nudges and Insights",
    description: "MoneyOne's TSP Analytics helps FIUs send personalised push notifications based on customer income and expense patterns",
    icon: <Zap size={32} strokeWidth={2} />,
    className: "md:col-span-2",
    imageSrc: "/Nudges.png",
    imageAlt: "AI-driven insights and notifications visualization"
  },
];

export function Services() {
  return (
    <motion.section
      className="relative w-full py-12 dark:bg-slate-900/60"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Our Core</span>{" "}
            <span className={highlightBgClass}>
              Services
            </span>
          </h2>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300">
            Discover how MoneyOne empowers financial institutions and fintechs with cutting-edge data solutions.
          </p>
        </div>

        <BentoGrid className="gap-4"> 
          {servicesData.map((item) => (
            <ServiceBentoCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={item.className}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </BentoGrid>
      </div>
    </motion.section>
  );
} 