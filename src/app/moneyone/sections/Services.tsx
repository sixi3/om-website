'use client';
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid"; 
import { Network, Lightbulb, Shield, Webhook } from "lucide-react"; 
import { motion } from "framer-motion";

// Consistent styling for highlighted text in titles
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

const servicesData = [
  {
    id: "Smart-Routing",
    title: "Smart AA Routing",
    description: "Our Smart AA Router dynamically switches between AAs to optimise traffic distribution and maximise success rates across multiple aggregators",
    icon: (
      <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
        <Network className="w-6 h-6" />
      </div>
    ),
    colSpan: 2,
    image: {
      src: "/AI Intelligence.png",
      alt: "Smart routing network visualization"
    }
  },
  {
    id: "Integration",
    title: "API Integration",
    description: "Seamless integration with 120+ FIPs through standardized APIs, enabling quick deployment and scalable data access",
    icon: (
      <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
        <Lightbulb className="w-6 h-6" />
      </div>
    ),
    colSpan: 1,
    image: {
      src: "/API Integration.png",
      alt: "API integration illustration"
    }
  },
  {
    id: "Security",
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, compliance monitoring, and audit trails for complete data protection",
    icon: (
      <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
        <Shield className="w-6 h-6" />
      </div>
    ),
    colSpan: 1,
    image: {
      src: "/END-END.png",
      alt: "Security and compliance visualization"
    }
  },
  {
    id: "Webhooks",
    title: "Real-time Webhooks",
    description: "Instant notifications and data updates through reliable webhook infrastructure, ensuring your systems stay synchronized",
    icon: (
      <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
        <Webhook className="w-6 h-6" />
      </div>
    ),
    colSpan: 2,
    image: {
      src: "/Webhook Support.png",
      alt: "Webhook and real-time data flow visualization"
    }
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
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase mb-8 block">
            Core Services
          </span>
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
            <span className={metallicBlackTextClasses}>Experience</span>{" "}
            <span className={highlightBgClass}>
              Enterprise-Grade
            </span>
            <span className={metallicBlackTextClasses}> Infrastructure</span>
          </h2>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300">
            Built for scale with enterprise-grade infrastructure that ensures reliability, security, and seamless integration across your Account Aggregator ecosystem.
          </p>
        </div>

        <BentoGrid className="gap-4"> 
          {servicesData.map((item) => (
            <BentoGridItem
              key={item.id}
              className="shadow-sm"
              title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{item.title}</span>}
              description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{item.description}</span>}
              icon={item.icon}
              colSpan={item.colSpan as 1 | 2 | 3}
              image={item.image}
              imageSize="w-40 h-40 -top-10 -right-10 md:w-40 md:h-40 md:-top-10 md:-right-10 lg:w-48 lg:h-48 lg:-top-15 lg:-right-10 xl:w-48 xl:h-48 xl:-top-17 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
            />
          ))}
        </BentoGrid>
      </div>
    </motion.section>
  );
} 