"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface AboutUsItem {
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

const AboutUsDropdownContent: React.FC = () => {
  const aboutUsItems: AboutUsItem[] = [
    {
      id: "team",
      title: "Team",
      description: "Meet the passionate team behind OneMoney's success",
      image: {
        src: "/team.png",
        alt: "Team",
        width: 40,
        height: 40
      },
      href: "/onemoney/team"
    },
    {
      id: "vision-mission",
      title: "Vision & Mission",
      description: "Our vision for transforming financial data sharing in India",
      image: {
        src: "/vision.png",
        alt: "Vision & Mission",
        width: 40,
        height: 40
      },
      href: "/onemoney/vision-mission"
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "The experienced leaders guiding OneMoney's journey",
      image: {
        src: "/Leadership.png",
        alt: "Leadership",
        width: 40,
        height: 40
      },
      href: "/onemoney/leadership"
    },
    {
      id: "values",
      title: "Values",
      description: "The core values that drive everything we do at OneMoney",
      image: {
        src: "/Bulk Onboarding.png",
        alt: "Values",
        width: 40,
        height: 40
      },
      href: "/onemoney/values"
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
            ABOUT US
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Learn about the team, vision, and values that drive OneMoney
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutUsItems.map((item, index) => (
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

export { AboutUsDropdownContent } 