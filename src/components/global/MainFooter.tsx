"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterSection {
  title: string;
  links: Array<{
    title: string;
    href: string;
    isSubheading?: boolean;
  }>;
}

// Footer data mirroring the header dropdown structure - updated to match desktop dropdown content
const footerSections: FooterSection[] = [
  {
    title: "ABOUT US",
    links: [
      { title: "Team", href: "/common/team" },
      { title: "Vision & Mission", href: "/common/vision-mission" },
      { title: "Leadership", href: "/common/leadership" },
      { title: "Values", href: "/equal/values" }
    ]
  },
  {
    title: "PRODUCTS",
    links: [
      // BFSI Section
      { title: "BFSI", href: "#", isSubheading: true },
      { title: "OneMoney AA", href: "/onemoney" },
      { title: "FinPro FIU TSP", href: "/moneyone/products/finpro" },
      { title: "FinShare FIP TSP", href: "/moneyone/products/finshare" },
      { title: "Financial Services", href: "/moneyone/financial-services" },
      // Employment Section
      { title: "Employment", href: "#", isSubheading: true },
      { title: "Enterprise Hiring", href: "/equal/products/enterprise-hiring" },
      { title: "Gig Hiring", href: "/equal/products/gig-hiring" },
      { title: "Financial Analytics", href: "/equal/products/financial-services" },
      { title: "Staffing & Contract", href: "/equal/products/staffing" },
      // Consumer Section
      { title: "Consumer", href: "#", isSubheading: true },
      { title: "Equal AI", href: "/equal" }
    ]
  },
  {
    title: "SOLUTIONS",
    links: [
      { title: "Financial Services", href: "/moneyone/financial-services" },
      { title: "Employee Verification", href: "/equal/solutions" },
      { title: "Identity Verification", href: "/equal" },
      { title: "Financial Analytics", href: "/moneyone/financial-services#moneyone-section" }
    ]
  },
  {
    title: "RESOURCES",
    links: [
      { title: "Our Newsletter", href: "https://equalidentity.substack.com/" },
      { title: "Trust & Security", href: "/equal/trust-security" },
      /* { title: "Blog", href: "/blog" },
      { title: "In The News", href: "/blog/in-the-news" }, */
      { title: "Terms and Conditions", href: "/common/terms-conditions" },
      { title: "Privacy Policy", href: "/common/policies" }
    ]
  }
];

export function MainFooter() {
  const pathname = usePathname();

  return (
    <footer className="bg-linear-b from-white to-[#00b140]/10 border-t-2 border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
            <div className="mb-4 flexjustify-start">
            <Link href="/" className="flex items-center">
                <Image
                src="/equal-logo.svg"
                alt="Equal Logo"
                width={71}
                height={21}
                className="h-8 md:h-12 w-auto hover:scale-105 transition-all duration-300"
                priority
                />
            </Link>
            </div>
            <h1 className="text-sm ml-1 font-light text-left mb-8 text-slate-500">Made with 💚 in India</h1>

        {/* Links Grid - Desktop: horizontal, Mobile: 2 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${link.title}-${index}`}>
                    {link.isSubheading ? (
                      <div className="text-xs font-semibold text-[#00b140] tracking-widest uppercase mt-4 mb-2">
                        {link.title}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-sm transition-colors duration-200 ${
                          pathname === link.href
                            ? "text-[#00b140] font-medium"
                            : "text-gray-600 hover:text-[#00b140]"
                        }`}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Equal Identity Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 