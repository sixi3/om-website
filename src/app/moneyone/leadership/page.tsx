"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BackgroundGrid } from "@/components/ui/background-grid";

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold";

// Board member data from BoardOfDirectors.tsx
const boardMembers = [
  {
    id: 1,
    name: "Justice B.N. Srikrishna",
    role: "Chairman",
    description: "Former judge of the Supreme Court of India and distinguished legal expert. Chaired the committee that drafted India's Digital Personal Data Protection Bill, establishing frameworks for data rights and privacy. Brings deep legal and ethical oversight to the board.",
    imageUrl: "/board/BN Srikrishna.png"
  },
  {
    id: 2,
    name: "Jagdish Capoor", 
    role: "Independent Director",
    description: "Former Deputy Governor of the Reserve Bank of India with a career spanning key financial institutions. Held leadership roles at HDFC Bank and LIC, contributing significantly to India's banking evolution. His regulatory expertise strengthens governance and risk management.",
    imageUrl: "/board/Jagdish Capoor.png"
  },
  {
    id: 3,
    name: "Dr. Rakesh Mohan",
    role: "Independent Director", 
    description: "Eminent economist and former Deputy Governor of the RBI. Also served as Chief Economic Advisor and Executive Director at the IMF. Known for work on economic reforms and infrastructure policy, bringing strong macroeconomic perspective to the board.",
    imageUrl: "/board/Rakesh Mohan.png"
  },
  {
    id: 4,
    name: "Anand Sinha",
    role: "Independent Director",
    description: "Served as Deputy Governor of the RBI, overseeing banking operations, regulation, and financial supervision. Played pivotal role in implementing Basel norms in India and contributed to international regulatory forums. Reinforces board's commitment to sound financial oversight.",
    imageUrl: "/board/Anand Sinha.png"
  },
  {
    id: 5,
    name: "J. Satyanarayana",
    role: "Independent Director",
    description: "Former Chairman of the Unique Identification Authority of India (UIDAI). Retired IAS officer instrumental in shaping Aadhaar and India's digital governance ecosystem. His insights into public digital infrastructure are key to scaling secure technology platforms.",
    imageUrl: "/board/J Satyanarayana.png"
  },
  {
    id: 6,
    name: "Ajay Sawhney",
    role: "Independent Director",
    description: "Former Secretary at the Ministry of Electronics and Information Technology (MeitY), Government of India. Played central role in driving digital India initiatives, data governance frameworks, and emerging tech adoption. Expertise bridges policy and innovation.",
    imageUrl: "/board/Ajay Sawhney.png"
  },
  {
    id: 7,
    name: "Anita Ramachandran",
    role: "Independent Director",
    description: "Founder of Cerebrus Consultants and respected HR and organizational strategy expert. Over three decades advising top Indian and global firms on leadership, people management, and culture. Brings strong human capital and governance focus to the board.",
    imageUrl: "/board/Anita Ramachandran.png"
  },
  {
    id: 8,
    name: "P.H. Ravikumar",
    role: "Independent Director",
    description: "Founding CEO of NCDEX and veteran in banking and financial services. Held senior positions at ICICI Bank, SMERA, and Bharat Financial Inclusion. Deep expertise in financial infrastructure brings strategic view of market-building and risk.",
    imageUrl: "/board/PH Ravikumar.png"
  },
  {
    id: 9,
    name: "Sunil Kulkarni",
    role: "Independent Director",
    description: "Chairman of the BCFI (Business Correspondent Federation of India), advocating for last-mile banking and digital payments. Pioneer in financial inclusion, working extensively with fintechs and banks to expand rural access. Enhances board's focus on scale and inclusion.",
    imageUrl: "/board/Sunil Kulkarni.png"
  }
];

// ProfileCard Component
interface ProfileCardProps {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  className?: string;
}

const ProfileCard = React.memo<ProfileCardProps>(({ 
  id, 
  name, 
  role, 
  description, 
  imageUrl, 
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
        <div className="relative h-48 w-full bg-gradient-to-br from-white to-slate-100 overflow-hidden rounded-t-lg">
          <div className="w-full h-full scale-110">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain w-full h-full"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>

        {/* Content Section - Slides up on hover */}
        <motion.div
          variants={cardVariants}
          className="absolute bottom-0 left-0 right-0 bg-white p-4 h-48"
        >
          <div className="text-left space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {name}
            </h3>
            <p className="text-xs font-medium text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default function LeadershipPage() {
  return (
    <>
      <BackgroundGrid />
      
      <main className="relative w-full overflow-hidden">
        <div className="w-full max-w-7xl px-4 md:px-6 mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center my-12 md:my-16">
          <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className={metallicBlackTextClasses}>Meet Our</span>{" "}
            <span className={highlightBgClass}>Board</span>
          </h2>
          <p className="mx-auto text-xl text-slate-700 dark:text-slate-300 w-full mb-6 max-w-5xl">
            Our board and advisors are a powerhouse of India's most respected leaders in finance, technology, governance, and policy, shaping our vision to build the most advanced data sharing platform in India.
          </p>
        </div>

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
              <div className="flex space-x-6 w-max px-4">
                {boardMembers.map((member, index) => (
                  <ProfileCard
                    key={member.id}
                    {...member}
                    className="flex-shrink-0"
                  />
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
            className="flex justify-center items-center space-x-6"
          >
            {boardMembers.slice(0, 5).map((member, index) => (
              <ProfileCard
                key={member.id}
                {...member}
              />
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
            className="flex justify-center items-center space-x-6 mt-12"
          >
            {boardMembers.slice(5).map((member, index) => (
              <ProfileCard
                key={member.id}
                {...member}
              />
            ))}
          </motion.div>
        </div>
      </div>
      </main>
      
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
    </>
  );
} 