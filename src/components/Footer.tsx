import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Twitter, Facebook, Instagram, Github, Copy } from "lucide-react";

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
      <div className="container mx-auto pt-8">
        {/* Top Section: Logo and Columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Column 1: Logo */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/om-logo.svg" alt="OneMoney Logo" width={150} height={40} />
            </Link>
          </div>

          {/* Column 2: Solutions Links */}
          <div className="md:col-span-1">
            <p className="font-semibold text-foreground uppercase tracking-wider">
              Solutions
            </p>
            <nav className="mt-6 space-y-4 text-sm">
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                FIUs
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                FIPs
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Consumers
              </Link>
            </nav>
          </div>

          {/* Column 3: Governance Links */}
          <div className="md:col-span-1">
            <p className="font-semibold text-foreground uppercase tracking-wider">
              Governance
            </p>
            <nav className="mt-6 space-y-4 text-sm">
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Compliance
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Policies
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Annual Growth
              </Link>
            </nav>
          </div>

          {/* Column 4: About Links */}
          <div className="md:col-span-1">
            <p className="font-semibold text-foreground uppercase tracking-wider">
              About
            </p>
            <nav className="mt-6 space-y-4 text-sm">
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Mission
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Board of Directors
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Achievements
              </Link>
              <Link href="#" className="block text-foreground/80 hover:text-foreground transition">
                Team
              </Link>
            </nav>
          </div>

          {/* Column 5 & 6: Newsletter & Contact */}
          <div className="md:col-span-2">
            <p className="font-semibold text-foreground uppercase tracking-wider">
              Reach Out to Us
            </p>
            <div className="mt-6 space-y-4">
              {/* Container for Input Group + Background Glow */}
              <div className="relative w-full max-w-sm">
                {/* Background Glow Element */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00b140] to-[#baff29] rounded-lg blur opacity-60 dark:opacity-75"></div>
                {/* Input + Button Group (on top) */}
                <div className="relative flex w-full items-center overflow-hidden rounded-lg">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    className="relative z-10 flex-grow rounded-l-lg rounded-r-none border-none focus:ring-2 focus:ring-ring focus:ring-offset-0 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 px-4 py-2.5 text-sm h-full"
                  />
                  <Button 
                    type="submit" 
                    className="relative z-10 rounded-l-none rounded-r-lg bg-[#00b140] text-white hover:bg-neutral-700 dark:bg-black dark:hover:bg-neutral-800 px-6 py-2.5 text-sm font-medium h-full border-l border-transparent dark:border-neutral-700"
                  >
                    Send
                  </Button>
                </div>
              </div>
              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Call Us
                  </p>
                  <div className="flex items-center">
                    <a href="tel:+91 9010098899" className="text-lg font-medium text-foreground/80 hover:text-foreground transition">
                      +91 90100 98899
                    </a>
                    <Copy className="ml-2 h-4 w-4 text-green-600 cursor-pointer hover:text-green-500" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Email Us
                  </p>
                  <div className="flex items-center">
                    <a href="mailto:info@onemoney.in" className="text-lg font-medium text-foreground/80 hover:text-foreground transition">
                      info@onemoney.in
                    </a>
                    <Copy className="ml-2 h-4 w-4 text-green-600 cursor-pointer hover:text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <hr className="my-10 border-border/40" />

        {/* Bottom Section: Copyright and Socials */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} OneMoney. All Rights Reserved.
          </p>

          <div className="flex space-x-4">
            {/* Social Icons will go here */}
          </div>
        </div>
      </div>
    </footer>
  );
} 