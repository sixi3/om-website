'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SolutionItem {
  id: string
  title: string
  description: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  href: string
}

interface SolutionSection {
  title: string
  description: string
  items: SolutionItem[]
}

const solutionSections: SolutionSection[] = [
  {
    title: "OUR FULLY INTEGRATED SUITE",
    description: "Specialised solutions tailored for specific industry verticals and their unique requirements",
    items: [
      {
        id: "financial-services",
        title: "Financial Services",
        description: "Digital transformation for banks and NBFCs",
        image: {
          src: "/Hosted Page.png",
          alt: "Financial Services",
          width: 56,
          height: 56
        },
        href: "/moneyone/financial-services"
      },
      {
        id: "Employee Verification",
        title: "Employee Verification",
        description: "Verify candidates across multiple platforms",
        image: {
          src: "/HR OPS.png",
          alt: "Employement Verification",
          width: 56,
          height: 56
        },
        href: "/equal/solutions"
      },
      {
        id: "identity",
        title: "Indentity Verification",
        description: "Verify candidates across multiple platforms",
        image: {
          src: "/Candidate Communication.png",
          alt: "Identity Verification",
          width: 56,
          height: 56
        },
        href: "/equal"
      },
      {
        id: "financial-analytics",
        title: "Financial Analytics",
        description: "Create your own workflows for your business",
        image: {
          src: "/Financial Analytics.png",
          alt: "Financial Analytics",
          width: 56,
          height: 56
        },
        href: "/moneyone/financial-services#moneyone-section"
      },
    ]
  }
]

const SolutionItem: React.FC<{ item: SolutionItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <Link 
        href={item.href}
        role="menuitem"
        className="flex items-start gap-4 p-3 rounded-lg border-b-3 border-transparent hover:border-[#00b140] hover:bg-[#00b140]/10 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2"
      >
        <div className="flex-shrink-0 relative">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="eager"
            priority={index < 2}
            className="transition-all duration-300 filter grayscale group-hover:grayscale-0 rounded will-change-[filter] group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900 group-hover:text-[#00b140] transition-colors duration-200">
              {item.title}
            </h3>
            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out">
              <ArrowRight className="w-4 h-4 text-[#00b140]" />
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

const SolutionSection: React.FC<{ section: SolutionSection; sectionIndex: number }> = ({ 
  section, 
  sectionIndex 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: sectionIndex * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }}
      className="space-y-4 p-3 bg-white border border-slate-200/50 rounded-lg"
    >
      <div className="mb-4">
        <h2 className="text-md font-semibold tracking-widest text-slate-800 uppercase">
          {section.title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {section.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item, index) => (
          <SolutionItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

export const SolutionsDropdownContent: React.FC = () => {
  return (
    <div className="space-y-2 min-w-[300px] md:min-w-[600px]">
      {solutionSections.map((section, index) => (
        <SolutionSection 
          key={section.title} 
          section={section} 
          sectionIndex={index} 
        />
      ))}
    </div>
  )
} 