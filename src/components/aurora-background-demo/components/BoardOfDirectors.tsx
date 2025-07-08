"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";

// Temporary board member data
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

const CARD_WIDTH = 200; // Approximate width of each board member card
const CARD_GAP = 32; // gap-8 in px

const BoardOfDirectors = React.memo(() => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -(CARD_WIDTH + CARD_GAP) : (CARD_WIDTH + CARD_GAP);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            ease: "easeOut"
          }}
          className="text-center space-y-6 mb-16"
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
            HIGHEST LEVELS OF GOVERNANCE
          </span>
          <h2 className={`text-2xl md:text-5xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES} max-w-6xl mt-8 mx-auto`}>
            Strategic{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              governance
            </span>{" "}
            from industry leaders
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-6xl mx-auto">
            Our board comprises seasoned executives and thought leaders who provide strategic guidance and oversight to drive sustainable growth and innovation.
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll layout - full width, not inside max-w-7xl */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
              delay: 0.2
            }}
            className="relative"
          >
            <div ref={scrollRef} className="overflow-x-auto pb-4 scrollbar-hide w-screen -mx-4 px-4">
              <div className="flex space-x-8 w-max">
                {boardMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: ANIMATION_CONFIG.duration,
                      delay: index * 0.1
                    }}
                    className="flex flex-col items-center text-center space-y-4 flex-shrink-0"
                  >
                    {/* Circular image container with gradient */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00b140] to-[#baff29] shadow-lg">
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
            
            {/* Chevron controls for mobile */}
            <div className="w-full flex justify-center items-center space-x-3 mt-4">
              <button
                type="button"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#00b140]/10 hover:bg-[#00b140] transition-colors"
                aria-label="Scroll left"
                onClick={() => scrollByCard("left")}
              >
                <ChevronLeft className="w-6 h-6 text-[#00b140] group-hover:text-white transition-colors" />
              </button>
              <button
                type="button"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#00b140]/10 hover:bg-[#00b140] transition-colors"
                aria-label="Scroll right"
                onClick={() => scrollByCard("right")}
              >
                <ChevronRight className="w-6 h-6 text-[#00b140] group-hover:text-white transition-colors" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Desktop: Grid layout (5+4) - keep inside max-w-7xl */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          {/* First row - 5 items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: ANIMATION_CONFIG.duration,
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
                  duration: ANIMATION_CONFIG.duration,
                  delay: index * 0.1
                }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Circular image container with gradient */}
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00b140] to-[#baff29] shadow-lg">
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
              duration: ANIMATION_CONFIG.duration,
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
                  duration: ANIMATION_CONFIG.duration,
                  delay: (index + 5) * 0.1
                }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Circular image container with gradient */}
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00b140] to-[#baff29] shadow-lg">
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
    </section>
  );
});

BoardOfDirectors.displayName = 'BoardOfDirectors';

export { BoardOfDirectors }; 