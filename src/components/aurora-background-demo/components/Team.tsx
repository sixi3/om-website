"use client";

import React, { useRef } from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ProfileCard Component
interface ProfileCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  logos?: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  className?: string;
}

const ProfileCard = React.memo<ProfileCardProps>(({ 
  id, 
  name, 
  title, 
  description, 
  imageUrl, 
  logos = [],
  className = "" 
}) => {
  const cardVariants = {
    default: {
      y: 0,
      transition: { duration: 0.3, ease: easeOut }
    },
    hover: {
      y: -40,
      transition: { duration: 0.3, ease: easeOut }
    }
  };

  // Special case for "more achievers" card
  if (id === "more-achievers") {
    return (
      <motion.div
        className={`relative ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-lg">
          {/* Full card with gradient background */}
          <div className="relative w-full h-full bg-gradient-to-b from-[#00b140] to-[#baff29] flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-4">
              <span className="text-sm font-semibold text-white tracking-widest uppercase">
                {title}
              </span>
              <h3 className="text-3xl font-bold text-white">
                {name}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover="hover"
    >
      <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Profile Image Section with Gradient Background */}
        <div className="relative h-48 w-full bg-gradient-to-b from-[#00b140] to-[#baff29] overflow-hidden rounded-t-lg">
          <div className="w-full h-full scale-110">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain mt-4 w-full h-full"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>

        {/* Content Section - Slides up on hover */}
        <motion.div
          variants={cardVariants}
          className="absolute bottom-0 left-0 right-0 bg-white p-4 h-52"
        >
          <div className="text-left space-y-4">
            <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase mb-4">
              {title}
            </span>
            <h3 className="text-2xl font-bold text-gray-900">
              {name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {description}
            </p>
            
            {/* Logos Section - Part of content, revealed on card hover */}
            {/* Always show logos on mobile, hover on desktop */}
            {logos.length > 0 && (
              <>
                {/* Mobile: always visible, smaller, with bottom gap */}
                <div className="flex w-full justify-center items-center gap-x-4 pb-2 block md:hidden">
                  {logos.map((logo) => (
                    <div
                      key={logo.id}
                      className="relative w-6 h-6 opacity-80"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                  ))}
                </div>
                {/* Desktop: hover to reveal */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 pt-4 transform translate-y-2 group-hover:translate-y-0 w-full hidden md:flex justify-center items-center gap-x-8 pb-2">
                  {logos.map((logo, index) => (
                    <div
                      key={logo.id}
                      className="relative w-8 h-8 opacity-70 hover:opacity-100 transition-all duration-200"
                      style={{
                        transitionDelay: `${(index * 0.1) + 0.3}s`
                      }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="object-contain"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ProfileCard.displayName = 'ProfileCard';

// Team data
const teamMembers = [
  {
    id: "keshav-reddy",
    name: "Keshav Reddy",
    title: "FOUNDER",
    description: "Keshav Reddy is a seasoned founder with over 15 years of experience in building scalable fintech.",
    imageUrl: "/team-pictures/keshav-reddy.png",
    logos: [
      { id: "1", src: "/equal-icon.png", alt: "Equal" },
      { id: "2", src: "/onemoney-icon.png", alt: "OneMoney" },
      { id: "3", src: "/verified.svg", alt: "Verified" }
    ]
  },
  {
    id: "co-founder",
    name: "Rajeev Ranjan",
    title: "CO-FOUNDER",
    description: "A technology veteran with over 15 years of experience in building scalable fintech solutions and driving digital transformation across industries.",
    imageUrl: "/team-pictures/rajeev-ranjan.png",
    logos: [
      { id: "1", src: "/equal-icon.png", alt: "Equal" },
      { id: "2", src: "/onemoney-icon.png", alt: "OneMoney" }
    ]
  },
  {
    id: "co-founder-2",
    name: "KP Atluri",
    title: "CO-FOUNDER",
    description: "Leading our technical vision with expertise in AI, blockchain, and distributed systems. Previously led engineering teams at top-tier technology companies.",
    imageUrl: "/team-pictures/KP.png",
    logos: [
      { id: "1", src: "/equal-icon.png", alt: "Equal" },
      { id: "2", src: "/verified.svg", alt: "Verified" }
    ]
  },
  {
    id: "more-achievers",
    name: "+100 more",
    title: "SUPER ACHIEVERS",
    description: "",
    imageUrl: "",
    logos: []
  }
];

const CARD_WIDTH = 320; // w-80 in px
const CARD_GAP = 24; // space-x-6 in px

const Team = React.memo(() => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -(CARD_WIDTH + CARD_GAP) : (CARD_WIDTH + CARD_GAP);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-16 px-4">
      {/* Section header remains centered and constrained */}
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            ease: "easeOut"
          }}
          className="text-center space-y-6 mb-8"
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
            Built by a stellar team
          </span>
          <h2 className={`text-2xl md:text-5xl lg:text-5xl leading-tight  ${METALLIC_BLACK_TEXT_CLASSES} max-w-6xl mt-8 mx-auto`}>
            Meet the{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              visionaries
            </span>{" "}
            behind our success
          </h2>
        </motion.div>
      </div>

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
        {/* Mobile: Full-bleed horizontal scroll container */}
        <div ref={scrollRef} className="md:hidden overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide w-screen -mx-4 min-h-[384px]">
          <div className="flex space-x-6 w-max h-96" style={{ paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2))', paddingRight: '1rem' }}>
            {teamMembers.map((member, index) => (
              <ProfileCard
                key={member.id}
                {...member}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Desktop: Centered cards container */}
        <div className="hidden md:flex justify-center items-center space-x-6 min-h-[384px]">
          {teamMembers.map((member, index) => (
            <ProfileCard
              key={member.id}
              {...member}
            />
          ))}
        </div>

        {/* Chevron controls - only show on mobile */}
        <div className="w-full flex justify-center items-center space-x-3 z-10 md:hidden mt-4 mb-2">
          <button
            type="button"
            className=" group w-10 h-10 flex items-center justify-center rounded-full bg-[#00b140]/10 hover:bg-[#00b140] transition-colors"
            aria-label="Scroll left"
            onClick={() => scrollByCard("left")}
          >
            <ChevronLeft className="w-6 h-6 text-[#00b140] group-hover:text-white transition-colors" />
          </button>
          <button
            type="button"
            className=" group w-10 h-10 flex items-center justify-center rounded-full bg-[#00b140]/10 hover:bg-[#00b140] transition-colors"
            aria-label="Scroll right"
            onClick={() => scrollByCard("right")}
          >
            <ChevronRight className="w-6 h-6 text-[#00b140] group-hover:text-white transition-colors" />
          </button>
        </div>
      </motion.div>
      
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

Team.displayName = 'Team';

export { Team }; 