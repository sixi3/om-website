"use client"

import React from "react";
import Image from "next/image";
import { GridBackground } from "../../onemoney/components/ui/grid-background";
import { motion } from "framer-motion";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MainHeader } from "@/components/global";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

// Board member data from BoardOfDirectors.tsx
const boardMembers = [
  {
    id: 1,
    name: "Justice BN Srikrishna",
    role: "Chairman",
    description: "Author, Digital Personal Data Protection Bill",
    imageUrl: "/board/BN Srikrishna.png"
  },
  {
    id: 2,
    name: "Jagdish Capoor", 
    role: "Independent Director",
    description: "Former Deputy Governor, RBI",
    imageUrl: "/board/Jagdish Capoor.png"
  },
  {
    id: 3,
    name: "Rakesh Mohan",
    role: "Independent Director", 
    description: "Former Deputy Governor, RBI",
    imageUrl: "/board/Rakesh Mohan.png"
  },
  {
    id: 4,
    name: "Anand Sinha",
    role: "Independent Director",
    description: "Former Deputy Governor, RBI",
    imageUrl: "/board/Anand Sinha.png"
  },
  {
    id: 5,
    name: "J Satyanarayana",
    role: "Independent Director",
    description: "Former Chairman,​ UIDAI",
    imageUrl: "/board/J Satyanarayana.png"
  },
  {
    id: 6,
    name: "Ajay Sawhney",
    role: "Independent Director",
    description: "Former Secretary MeitY, Government of India",
    imageUrl: "/board/Ajay Sawhney.png"
  },
  {
    id: 7,
    name: "Anita Ramachandran",
    role: "Independent Director",
    description: "Founder Cerebrus Consultants, Respected HR Leader",
    imageUrl: "/board/Anita Ramachandran.png"
  },
  {
    id: 8,
    name: "PH Ravikumar",
    role: "Independent Director",
    description: "Founder CEO of NCDEX",
    imageUrl: "/board/PH Ravikumar.png"
  },
  {
    id: 9,
    name: "Sunil Kulkarni",
    role: "Independent Director",
    description: "Chairman, BCFI",
    imageUrl: "/board/Sunil Kulkarni.png"
  }
];

export default function LeadershipPage() {
  return (
    <AuroraBackground>
      <MainHeader />
      <BackgroundGrid zIndex={-10} />
      <div className="w-full max-w-7xl px-4 md:px-6 relative z-10 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center my-12 md:my-16">
          <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className={metallicBlackTextClasses}>Meet Our</span>{" "}
            <span className={highlightBgClass}>Advisory Board</span>
          </h2>
          <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 w-full mb-6 max-w-5xl">
            Our board and advisors are a powerhouse of India's most respected leaders in finance, technology, governance, and policy, shaping our vision to build the most advanced data sharing platform in India.
          </p>
        </div>

        {/* Page Title & Subtitle - from BoardOfDirectors.tsx */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          className="text-center space-y-6 mb-16"
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
            Advisory Board and Board of Directors
          </span>
          <h1 className={`text-2xl md:text-5xl lg:text-5xl leading-tight ${metallicBlackTextClasses} max-w-6xl mt-8 mx-auto`}>
            Strategic{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              governance
            </span>{" "}
            from industry leaders
          </h1>
        </motion.div>

        {/* Mobile: Horizontal scroll layout */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="relative"
          >
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-8 w-max px-4">
                {boardMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1
                    }}
                    className="flex flex-col items-center text-center space-y-4 flex-shrink-0"
                  >
                    {/* Circular image container with gradient */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-slate-50 shadow-lg">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-contain mt-4"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Member details */}
                    <div className="space-y-2 max-w-[160px]">
                      <h3 className="text-lg font-bold text-slate-900">
                        {(() => {
                          const [first, ...rest] = member.name.split(' ');
                          return <>{first}<br />{rest.join(' ')}</>;
                        })()}
                      </h3>
                      <p className="text-sm font-medium text-[#00b140]">
                        {member.role}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop: Grid layout (5+4) */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          {/* First row - 5 items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="grid grid-cols-5 gap-12"
          >
            {boardMembers.slice(0, 5).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Circular image container with gradient */}
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full bg-background/20 backdrop-blur-md border border-slate-200">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain mt-4"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Member details */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {(() => {
                      const [first, ...rest] = member.name.split(' ');
                      return <>{first}<br />{rest.join(' ')}</>;
                    })()}
                  </h3>
                  <p className="text-base font-medium text-[#00b140]">
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-[200px]">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row - 4 items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
            className="grid grid-cols-4 gap-12 mt-16 max-w-5xl mx-auto"
          >
            {boardMembers.slice(5).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: (index + 5) * 0.1
                }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Circular image container with gradient */}
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full bg-background/20 backdrop-blur-md border border-slate-200">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain mt-4"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Member details */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {(() => {
                      const [first, ...rest] = member.name.split(' ');
                      return <>{first}<br />{rest.join(' ')}</>;
                    })()}
                  </h3>
                  <p className="text-base font-medium text-[#00b140]">
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-[200px]">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </AuroraBackground>
  );
} 