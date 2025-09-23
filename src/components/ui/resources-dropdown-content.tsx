"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
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
  href?: string
  external?: boolean
}

// Company section detection function (same as in MainHeader)
const getCompanySection = (pathname: string): 'equal' | 'moneyone' | 'onemoney' | 'default' => {
  const host = typeof window !== 'undefined' ? window.location.host : '';
  if (pathname.startsWith('/equal') || pathname.startsWith('/solutions')) {
    return 'equal';
  }
  if (pathname.startsWith('/moneyone') || host.includes("moneyone.in")) {
    return 'moneyone';
  }
  if (pathname.startsWith('/onemoney') || host.includes("onemoney.in")) {
    return 'onemoney';
  }
  return 'default';
};

const ResourcesDropdownContent: React.FC = () => {
  const pathname = usePathname();
  const currentCompany = getCompanySection(pathname);

  // Determine default company for terms and policies based on current section
  const getDefaultCompany = () => {
    if (currentCompany === 'onemoney') {
      return 'onemoney';
    }
    return 'equal'; // Default to equal for all other sections
  };

  const defaultCompany = getDefaultCompany();

  const allResourceItems: ResourceItem[] = [
    {
      id: "newsletter",
      title: "Our Newsletter",
      description: "Stay informed about our newsletter and security features",
      image: {
        src: "/Access Logs.png",
        alt: "Press Releases",
        width: 40,
        height: 40
      },
      href: "https://equalidentity.substack.com/",
      external: true
    },
    {
      id: "trust-security",
      title: "Trust & Security",
      description: currentCompany === 'moneyone' 
        ? "Learn how MoneyOne delivers enterprise-grade security and compliance"
        : "Learn how Equal bakes trust and security into every layer",
      image: {
        src: "/Quarterly VAPT Tests.png",
        alt: "Trust and Security",
        width: 40,
        height: 40
      },
      href: currentCompany === 'moneyone' ? "/moneyone/trust-security" : "/equal/trust-security"
    },
    /* {
      id: "blog",
      title: "Blog",
      description: "Insights, updates, and thought leadership from our team",
      image: {
        src: "/Bulk Managment Tools.png",
        alt: "Blog",
        width: 40,
        height: 40
      },
      href: "/blog"
    }, */
    /* {
      id: "in-the-news",
      title: "In The News",
      description: "See our latest news mentions and press highlights",
      image: {
        src: "/Webhook Notification.png",
        alt: "In The News",
        width: 40,
        height: 40
      },
      href: "/blog/in-the-news"
    }, */
    {
      id: "terms-and-conditions",
      title: "Terms and Conditions",
      description: "Review our terms of service and user agreements",
      image: {
        src: "/Webhook Support.png",
        alt: "Terms and Conditions",
        width: 40,
        height: 40
      },
      href: `/common/terms-conditions?company=${defaultCompany}`
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      description: "Understand how we protect your data and privacy.",
      image: {
        src: "/team.png",
        alt: "Privacy Policy",
        width: 40,
        height: 40
      },
      href: `/common/policies?company=${defaultCompany}`
    }
  ]

  // Filter out privacy policy and terms & conditions for MoneyOne pages
  const resourceItems = currentCompany === 'moneyone' 
    ? allResourceItems.filter(item => !['terms-and-conditions', 'privacy-policy'].includes(item.id))
    : allResourceItems

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
            Stay informed with news, insights, and developer resources
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
                href={getDomainSpecificHref(item.href!)}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
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