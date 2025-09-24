"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getDomainSpecificHref } from '@/lib/utils'

interface ResourceItem {
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

const ResourcesDropdownContent: React.FC = () => {
  const resourceItems: ResourceItem[] = [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      description: "Understand how we protect your data and privacy",
      image: {
        src: "/team.png",
        alt: "Privacy Policy",
        width: 40,
        height: 40
      },
      href: getDomainSpecificHref("/onemoney/policies")
    },
    {
      id: "terms-conditions",
      title: "Terms & Conditions",
      description: "Review our terms of service and user agreements",
      image: {
        src: "/Webhook Support.png",
        alt: "Terms and Conditions",
        width: 40,
        height: 40
      },
      href: getDomainSpecificHref("/onemoney/termsconditions")
    },
    {
      id: "timeline",
      title: "Timeline",
      description: "Explore OneMoney's journey and key milestones",
      image: {
        src: "/Blockchain Audit Trails.png",
        alt: "Timeline",
        width: 40,
        height: 40
      },
      href: getDomainSpecificHref("/onemoney/timeline")
    },
    {
      id: "compliance",
      title: "Compliance",
      description: "Learn about our regulatory compliance and certifications",
      image: {
        src: "/Compliance.png",
        alt: "Compliance",
        width: 40,
        height: 40
      },
      href: getDomainSpecificHref("/onemoney/compliance")
    }
  ]

  return (
    <div className="space-y-2 min-w-[300px] md:min-w-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-4 p-3 bg-white border border-slate-200/50 rounded-lg"
      >
        <div className="mb-4">
          <h2 className="text-md font-semibold tracking-widest text-slate-800 uppercase">
            RESOURCES
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Access important documents, policies, and compliance information
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourceItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                role="menuitem"
                className="flex items-start gap-4 p-3 rounded-lg border-b-3 border-transparent hover:border-[#00b140] hover:bg-[#00b140]/10 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2"
              >
                <div className="flex-shrink-0 relative w-10 h-10">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    loading="eager"
                    priority={index < 2}
                    className="w-full h-full object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0 rounded will-change-[filter] group-hover:scale-110"
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
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export { ResourcesDropdownContent } 