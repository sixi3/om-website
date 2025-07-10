"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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

const resourceItems: ResourceItem[] = [
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Stay updated with our latest announcements and company news.",
    image: {
      src: "/Access Logs.png",
      alt: "Press Releases",
      width: 40,
      height: 40
    },
    href: "/news/latest-press-releases"
  },
  {
    id: "media-coverage",
    title: "Media Coverage",
    description: "See how the media covers our innovations and achievements.",
    image: {
      src: "/analytics.png",
      alt: "Media Coverage",
      width: 40,
      height: 40
    },
    href: "/news/media-coverage"
  },
  {
    id: "industry-insights",
    title: "Industry Insights",
    description: "Expert analysis and thought leadership from our team.",
    image: {
      src: "/AI Intelligence.png",
      alt: "Industry Insights",
      width: 40,
      height: 40
    },
    href: "/blog/industry-insights"
  },
  {
    id: "product-updates",
    title: "Product Updates",
    description: "Latest features and improvements to our platform.",
    image: {
      src: "/API Integration.png",
      alt: "Product Updates",
      width: 40,
      height: 40
    },
    href: "/blog/product-updates"
  },
  {
    id: "newsletter-subscribe",
    title: "Subscribe to Newsletter",
    description: "Get updates delivered directly to your inbox.",
    image: {
      src: "/Auto-Consolidated Reports.png",
      alt: "Newsletter",
      width: 40,
      height: 40
    },
    href: "/newsletter/subscribe"
  },
  {
    id: "newsletter-archive",
    title: "Newsletter Archive",
    description: "Browse past newsletters and stay informed.",
    image: {
      src: "/Bulk Managment Tools.png",
      alt: "Newsletter Archive",
      width: 40,
      height: 40
    },
    href: "/newsletter/archive"
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Complete API documentation for developers.",
    image: {
      src: "/JavaScript SDK.png",
      alt: "API Reference",
      width: 40,
      height: 40
    },
    href: "/docs/api-reference"
  },
  {
    id: "integration-guides",
    title: "Integration Guides",
    description: "Step-by-step integration tutorials and examples.",
    image: {
      src: "/Integration-First.png",
      alt: "Integration Guides",
      width: 40,
      height: 40
    },
    href: "/docs/integration-guides"
  }
]

const ResourcesDropdownContent: React.FC = () => {
  return (
    <div className="space-y-2 min-w-[300px] md:min-w-[600px]">
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
            Stay informed with news, insights, and developer resources.
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
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export { ResourcesDropdownContent } 