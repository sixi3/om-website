"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heart, Building, Shield, Users } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { METALLIC_BLACK_TEXT_CLASSES, ANIMATION_CONFIG } from "../constants";

// Industry section data (copied from ModularSolutions)
const industrySection = {
  id: "industry",
  title: "Custom Workflows for your Industry",
  subtitle: "ONE SOLUTION FOR ALL",
  description: "Specialised solutions tailored for specific industry verticals and their unique compliance requirements.",
  items: [
    {
      id: "healthcare",
      title: "Healthcare Management",
      description: "Secure verification with HIPAA compliance and advanced encryption.",
      image: {
        src: "/Healthcare.png",
        alt: "Healthcare",
        width: 80,
        height: 80
      },
      href: "/solutions/healthcare",
      icon: <Heart size={24} />
    },
    {
      id: "government",
      title: "Government Contracts",
      description: "Compliance-ready solutions for government projects.",
      image: {
        src: "/Government Contracts.png",
        alt: "Government Contracts",
        width: 80,
        height: 80
      },
      href: "/solutions/government",
      icon: <Building size={24} />
    },
    {
      id: "compliance",
      title: "Compliance & Risk Monitoring",
      description: "Automated compliance checks with real-time monitoring.",
      image: {
        src: "/Compliance.png",
        alt: "Compliance",
        width: 80,
        height: 80
      },
      href: "/solutions/compliance",
      icon: <Shield size={24} />
    },
    {
      id: "recruitment",
      title: "Recruitment Solutions",
      description: "End-to-end background verification with bulk processing.",
      image: {
        src: "/Recruitment.png",
        alt: "Recruitment",
        width: 80,
        height: 80
      },
      href: "/solutions/recruitment",
      icon: <Users size={24} />
    }
  ]
};

const IndustrySection = React.memo(() => {
  const section = industrySection;
  const cta = { text: "Explore Solutions", href: "/solutions" };

  return (
    <section className="relative w-full px-8 py-12">
      <div className="mx-auto max-w-6xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.1 }}
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase mb-8 block">
            {section.subtitle}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.2 }}
          className={`text-2xl md:text-4xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES} mb-4`}
        >
          <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
            Custom workflows
          </span>{" "}
          for your industry
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.3 }}
          className="text-sm text-slate-600 leading-relaxed mb-8"
        >
          {section.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.4 }}
          className="mb-8"
        >
          <Link href={cta.href}>
            <ShimmerButton className="w-full md:w-auto text-md md:text-lg">
              {cta.text}
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
      {/* Four responsive Bento cards in a row or 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto items-stretch">
        {section.items.map((item, index) => (
          <div
            key={item.id}
            className="group relative"
          >
            <Link
              href={item.href}
              className="block w-full h-full"
            >
              <BentoGridItem
                title={
                  <div className="flex flex-col items-start w-full mt-auto mb-4 md:mb-4 md:transition-transform md:duration-300 md:group-hover:-translate-y-8">
                    <div className="w-12 h-12 rounded-lg bg-[#00b140] flex items-center justify-center text-white mb-4 ml-0 md:transition-transform md:duration-300 md:group-hover:-translate-y-2">
                      {item.icon}
                    </div>
                    <span className="group-hover:text-[#00b140] transition-colors duration-300 text-md md:text-2xl">
                      {item.title}
                    </span>
                  </div>
                }
                description={
                  <div className="text-left w-full md:mb-4 md:transition-transform md:duration-300 md:group-hover:-translate-y-8">
                    {item.description}
                    <div className="block md:hidden mt-4">
                      <div className="inline-flex items-center justify-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[#00b140]/50 text-[#00b140] text-sm font-medium rounded-full transition-all duration-300 overflow-hidden">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 text-[#00b140] ml-2" />
                      </div>
                    </div>
                  </div>
                }
                image={{
                  src: item.image.src,
                  alt: item.image.alt
                }}
                imagePosition="top-right"
                imageSize="w-40 h-40 top-[-40px] right-[-35px] md:w-20 md:h-20 md:top-[-20px] md:right-[-15px] xl:w-60 xl:h-60 xl:top-[-50px] xl:right-[-65px] 2xl:w-60 2xl:h-60 2xl:top-[-65px] 2xl:right-[-65px]"
                className="h-full min-h-[260px] md:min-h-[340px] md:aspect-[3/4] bg-white/50 backdrop-blur-md border-slate-200 hover:border-[#00b140]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00b140]/10 flex flex-col justify-end items-start p-6"
              />
            </Link>
            <div className="absolute bottom-6 left-6 right-6 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <div className="w-full inline-flex items-center justify-center px-4 py-2 shadow-sm bg-linear-to-tr from-slate-100 to-white backdrop-blur-md border-b-3 border border-[#00b140]/50 text-[#00b140] text-sm font-medium rounded-full transition-all duration-300 overflow-hidden group-hover:bg-[#00b140]/5">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 text-[#00b140] transition-all duration-500 opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-2 group-hover:translate-x-0 delay-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

IndustrySection.displayName = 'IndustrySection';

export { IndustrySection }; 