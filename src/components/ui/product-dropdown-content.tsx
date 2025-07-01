'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ProductItem {
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

interface ProductSection {
  title: string
  items: ProductItem[]
}

const productSections: ProductSection[] = [
  {
    title: "EMPLOYMENT",
    items: [
      {
        id: "equal-identity-gateway",
        title: "Equal ID Gateway",
        description: "Advanced identity verification and KYC solutions",
        image: {
          src: "/HRMS Integration.png",
          alt: "Identity Gateway",
          width: 56,
          height: 56
        },
        href: "/equal/products/identity-gateway"
      },
      {
        id: "equal-console",
        title: "Equal Console",
        description: "Comprehensive dashboard for verification management",
        image: {
          src: "/Webhook Support.png",
          alt: "Equal Console",
          width: 56,
          height: 56
        },
        href: "/equal/products/console"
      }
    ]
  },
  {
    title: "BFSI",
    items: [
      {
        id: "onemoney-aa",
        title: "OneMoney AA",
        description: "India's largest Account Aggregator platform",
        image: {
          src: "/Candidate Consent Records.png",
          alt: "OneMoney AA",
          width: 56,
          height: 56
        },
        href: "/onemoney"
      },
      {
        id: "finpro-fiu-tsp",
        title: "FinPro FIU TSP",
        description: "Financial Information User Technology Service Provider",
        image: {
          src: "/HR OPS.png",
          alt: "FinPro FIU TSP",
          width: 56,
          height: 56
        },
        href: "/moneyone/products/finpro"
      },
      {
        id: "finshare-fip-tsp",
        title: "FinShare FIP TSP",
        description: "Financial Information Provider Technology Service Provider",
        image: {
          src: "/Exception Managment Engine.png",
          alt: "FinShare FIP TSP",
          width: 56,
          height: 56
        },
        href: "/finshare"
      },
      {
        id: "oneapp",
        title: "OneApp",
        description: "Unified financial application platform",
        image: {
          src: "/Mobile UX.png",
          alt: "OneApp",
          width: 56,
          height: 56
        },
        href: "/oneapp"
      }
    ]
  }
]

const ProductItem: React.FC<{ item: ProductItem; index: number }> = ({ item, index }) => {
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
        className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#00b140]/10 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2"
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

const ProductSection: React.FC<{ section: ProductSection; sectionIndex: number }> = ({ 
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
      <h2 className="text-sm font-semibold tracking-widest text-[#00b140] uppercase mb-4">
        {section.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item, index) => (
          <ProductItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

export const ProductDropdownContent: React.FC = () => {
  return (
    <div className="space-y-2 min-w-[300px] md:min-w-[600px]">
      {productSections.map((section, index) => (
        <ProductSection 
          key={section.title} 
          section={section} 
          sectionIndex={index} 
        />
      ))}
    </div>
  )
} 