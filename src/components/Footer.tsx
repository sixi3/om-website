import Link from "next/link";
import React from "react";
import Image from "next/image";
// Input and Button from Shadcn/ui might become unused, remove if so.
// import { Input } from "./ui/input"; 
// import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-6 pt-8">
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
              {/* Remove existing input group with glow */}
              {/* Replace with new simplified input group */}
              <form className="flex w-full max-w-sm rounded-md overflow-hidden border border-slate-200 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all duration-150">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-grow appearance-none bg-transparent px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border-none focus:outline-none focus:ring-0"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00b140] text-white text-sm font-semibold hover:bg-green-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0"
                >
                  Send
                </button>
              </form>
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