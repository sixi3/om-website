"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Team } from "@/components/aurora-background-demo/components/Team";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { MainHeader } from "@/components/global/MainHeader";
import { GlowingDivider } from "@/components/ui/glowing-divider";
import { EqualBreadcrumb } from "@/components/ui/breadcrumb";
import { LinkedinIcon, Instagram } from "lucide-react";

// Define metallic black class
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// ProfileCard Component (copied from Team.tsx)
interface ProfileCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  socialLinks?: Array<{
    id: string;
    platform: string;
    url: string;
    icon: React.ReactNode;
  }>;
  className?: string;
}

const ProfileCard = React.memo<ProfileCardProps>(({ 
  id, 
  name, 
  title, 
  description, 
  imageUrl, 
  socialLinks = [],
  className = "" 
}) => {
  const cardVariants = {
    default: {
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    hover: {
      y: -40,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

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
            
            {/* Social Links Section - Part of content, revealed on card hover */}
            {/* Always show social links on mobile, hover on desktop */}
            {socialLinks.length > 0 && (
              <>
                {/* Mobile: always visible, smaller, with bottom gap */}
                <div className="flex w-full justify-center items-center gap-x-4 pb-2 block md:hidden">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 opacity-80 hover:opacity-100 transition-all duration-200 text-[#00b140] hover:text-[#baff29]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                {/* Desktop: hover to reveal */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 pt-4 transform translate-y-2 group-hover:translate-y-0 w-full hidden md:flex justify-center items-center gap-x-8 pb-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 opacity-70 hover:opacity-100 transition-all duration-200 text-slate-600 hover:text-[#00b140]"
                      style={{
                        transitionDelay: `${(index * 0.1) + 0.3}s`
                      }}
                    >
                      {social.icon}
                    </a>
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

// Custom Team component that only shows the first 3 founders (excluding Super Achievers)
const FoundersTeam = () => {
  // Filter out the "Super Achievers" card - only show first 3 founders
  const foundersOnly = [
    {
      id: "keshav-reddy",
      name: "Keshav Reddy",
      title: "FOUNDER",
      description: "Keshav Reddy is a seasoned entrepreneur having built, operated, and invested in over 30+ companies.",
      imageUrl: "/team-pictures/keshav-reddy.png",
      socialLinks: [
        { 
          id: "linkedin", 
          platform: "LinkedIn", 
          url: "https://www.linkedin.com/in/keshavreddy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", 
          icon: <LinkedinIcon className="w-full h-full" />
        },
        { 
          id: "instagram", 
          platform: "Instagram", 
          url: "https://www.instagram.com/gvkjr?igsh=MTlraHNzYm1ubjNh", 
          icon: <Instagram className="w-full h-full" />
        }
      ]
    },
    {
      id: "co-founder",
      name: "Rajeev Ranjan",
      title: "CO-FOUNDER",
      description: "A technology pioneer with 10+ years of experience in building some of India's largest platforms",
      imageUrl: "/team-pictures/rajeev-ranjan.png",
      socialLinks: [
        { 
          id: "linkedin", 
          platform: "LinkedIn", 
          url: "https://www.linkedin.com/in/rajeevjranjan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", 
          icon: <LinkedinIcon className="w-full h-full" />
        }
      ]
    },
    {
      id: "co-founder-2",
      name: "KP Atluri",
      title: "CO-FOUNDER",
      description: "A well-respected and innovative leader who has built one of India's largest financial service platforms.",
      imageUrl: "/team-pictures/KP.png",
      socialLinks: [
        { 
          id: "linkedin", 
          platform: "LinkedIn", 
          url: "https://www.linkedin.com/in/kpatluri?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", 
          icon: <LinkedinIcon className="w-full h-full" />
        }
      ]
    }
  ];

  return (
    <section className="relative w-full py-16 px-4">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="text-center space-y-6 mb-8"
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
            BUILT BY STELLAR FOUNDERS
          </span>
          <h2 className="text-2xl md:text-5xl lg:text-5xl leading-tight font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent max-w-6xl mt-8 mx-auto">
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
          duration: 0.5,
          delay: 0.2
        }}
        className="relative"
      >
        {/* Mobile and Tablet: Full-bleed horizontal scroll container */}
        <div className="lg:hidden overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide w-screen -mx-4 min-h-[384px]">
          <div className="flex space-x-6 w-max h-96" style={{ paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2))', paddingRight: '1rem' }}>
            {/* Only show first 3 team members (excluding Super Achievers) */}
            {foundersOnly.map((member, index) => (
              <ProfileCard
                key={member.id}
                {...member}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Desktop: Centered cards container */}
        <div className="hidden lg:flex justify-center items-center space-x-6 min-h-[384px]">
          {/* Only show first 3 team members (excluding Super Achievers) */}
          {foundersOnly.map((member, index) => (
            <ProfileCard
              key={member.id}
              {...member}
            />
          ))}
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
};


export default function TeamPage() {
  return (
    <AuroraBackground>
      <BackgroundGrid />
      <MainHeader />
      
      <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <EqualBreadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
        </div>
        {/* Hero Section */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 justify-center items-center">
          <div className="text-center mb-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className={metallicBlackTextClasses}>Meet Our</span>{" "}
                <span className="inline-block bg-[#baff29] px-2 text-black font-bold">Expert</span>{" "}
                <span className={metallicBlackTextClasses}>Team</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                We are a passionate team of innovators, engineers, and visionaries dedicated to transforming the future of digital identity and financial services.
              </p>
            </motion.div>
            

            {/* Team Image Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-12 md:mt-16"
            >
              <div className="flex items-center justify-center">
                <h2 className="text-center font-semibold text-sm md:text-base tracking-widest mb-6 mx-auto text-[#00b140]">
                  OUR AMAZING TEAM
                </h2>
              </div>
              <div className="relative max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4, 
                    ease: "easeOut" 
                  }}
                  className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/team-pictures/WhatsApp Image 2025-08-25 at 5.05.13 PM.jpeg"
                    alt="Our amazing team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <GlowingDivider 
            width="1/3" 
            intensity="high" 
            delay={0.2}
            className="my-8 md:my-16 mx-auto"
          />

        {/* Team Showcase Section */}
        <div className="mt-4">
          
          <FoundersTeam />
        </div>
      </main>
    </AuroraBackground>
  );
} 