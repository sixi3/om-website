import Link from "next/link";
import React from "react";

// Simplified footer links based on the reference site
const footerLinks = {
  Solutions: [
    { name: "FIUs", href: "#" },
    { name: "FIPs", href: "#" },
    { name: "Consumers", href: "#" },
  ],
  Company: [
    { name: "Use Cases", href: "#" },
    { name: "Governance", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo/Brand Info */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                OneMoney
              </span>
            </Link>
            <p className="mt-4 text-sm text-foreground/60">
              Empowering Indians with Control Over Their Financial Data.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-3 md:grid-cols-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h2 className="mb-4 text-sm font-semibold text-foreground uppercase">
                  {title}
                </h2>
                <ul className="text-foreground/60 font-medium space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-6 border-border/40 sm:mx-auto lg:my-8" />
        <div className="text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} OneMoney. All Rights Reserved.
          {/* Maybe add social links or other info here later */}
        </div>
      </div>
    </footer>
  );
} 