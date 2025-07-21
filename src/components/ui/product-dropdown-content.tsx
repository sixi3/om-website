'use client'

import React, { memo, useMemo } from 'react'
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
  description: string
  items: ProductItem[]
}

const productSections: ProductSection[] = [
  {
    title: "BFSI",
    description: "Banking, Financial Services & Insurance technology solutions",
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
        href: "/moneyone/products/finshare"
      },
      {
        id: "financial-analytics",
        title: "Financial Analytics",
        description: "Gain in-depth insights into financial history",
        image: {
          src: "/Mobile UX.png",
          alt: "OneApp",
          width: 56,
          height: 56
        },
        href: "/equal/solutions/financial-services#moneyone-section"
      }
    ]
  },
  {
    title: "EMPLOYMENT",
    description: "Identity verification and background check solutions for workforce management",
    items: [
      {
        id: "Enterprise Hiring",
        title: "Enterprise Hiring",
        description: "Advanced identity and KYC solutions for enterprise hiring",
        image: {
          src: "/Recruitment.png",
          alt: "Enterprise Hiring",
          width: 56,
          height: 56
        },
        href: "/equal/solutions/enterprise-hiring"
      },
      {
        id: "Gig Hiring",
        title: "Gig Hiring",
        description: "Onboard gig workers at scale with ease",
        image: {
          src: "/Gig Economy Hiring.png",
          alt: "Gig Hiring",
          width: 56,
          height: 56
        },
        href: "/equal/solutions/gig-hiring"
      },
      {
        id: "Financial Services",
        title: "Financial Services",
        description: "Get powerful insights from financial data, powered by AI",
        image: {
          src: "/Financial Analytics.png",
          alt: "Financial Services",
          width: 56,
          height: 56
        },
        href: "/equal/solutions/financial-services"
      },
      {
        id: "Staffing & Contract Roles",
        title: "Staffing & Contract",
        description: "Hire and manage contract workers with ease",
        image: {
          src: "/Staffing & Contract Roles.png",
          alt: "Staffing & Contract Roles",
          width: 56,
          height: 56
        },
        href: "/equal/solutions/staffing"
      }
    ]
  }
]

// Memoized ProductItem to prevent unnecessary re-renders
const ProductItem = memo<{ item: ProductItem; index: number }>(({ item, index }) => {
  // Simplified animation with GPU acceleration
  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        delay: index * 0.03 // Reduced delay for faster feel
      }
    }
  }), [index])

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      style={{ transform: 'translate3d(0,0,0)' }} // Force GPU acceleration
    >
      <Link 
        href={item.href}
        role="menuitem"
        target={item.id === "onemoney-aa" || item.id === "finpro-fiu-tsp" || item.id === "finshare-fip-tsp" ? "_blank" : undefined}
        rel={item.id === "onemoney-aa" || item.id === "finpro-fiu-tsp" || item.id === "finshare-fip-tsp" ? "noopener noreferrer" : undefined}
        className="flex items-start gap-4 p-3 rounded-lg border-b-3 border-transparent hover:border-[#00b140] hover:bg-[#00b140]/10 transition-all duration-150 group focus:border-b-1"
      >
        <div className="flex-shrink-0 relative">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy" // Changed from eager to lazy for better initial performance
            priority={false} // Remove priority to reduce initial load
            className="transition-all duration-200 filter grayscale group-hover:grayscale-0 rounded will-change-transform group-hover:scale-105" // Reduced scale and duration
            sizes="56px" // Explicit size for better optimization
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900 group-hover:text-[#00b140] transition-colors duration-150">
              {item.title}
            </h3>
            <div className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out">
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
})

ProductItem.displayName = 'ProductItem'

// Memoized ProductSection to prevent unnecessary re-renders
const ProductSection = memo<{ section: ProductSection; sectionIndex: number }>(({ 
  section, 
  sectionIndex 
}) => {
  // Simplified section animation
  const sectionVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.25,
        delay: sectionIndex * 0.05,
        staggerChildren: 0.03,
        when: "beforeChildren"
      }
    }
  }), [sectionIndex])

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 p-3 bg-white border border-slate-200/50 rounded-lg"
      style={{ transform: 'translate3d(0,0,0)' }} // Force GPU acceleration
    >
      <div className="mb-4">
        <h2 className="text-md font-semibold tracking-widest text-slate-800 uppercase">
          {section.title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {section.description}
        </p>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.03
            }
          }
        }}
      >
        {section.items.map((item, index) => (
          <ProductItem key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </motion.div>
  )
})

ProductSection.displayName = 'ProductSection'

// Memoized main component
export const ProductDropdownContent = memo(() => {
  // Container animation with stagger
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.15,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  }), [])

  return (
    <motion.div 
      className="space-y-2 min-w-[300px] md:min-w-[600px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ transform: 'translate3d(0,0,0)' }} // Force GPU acceleration
    >
      {productSections.map((section, index) => (
        <ProductSection 
          key={section.title} 
          section={section} 
          sectionIndex={index} 
        />
      ))}
    </motion.div>
  )
})

ProductDropdownContent.displayName = 'ProductDropdownContent' 