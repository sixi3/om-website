import Link from "next/link";
import React from "react";
import Image from "next/image";

export function SimpleFooter() {
  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Simple centered layout */}
        <div className="flex flex-col items-center space-y-6">
          {/* OneMoney Logo */}
          <Link href="/onemoney" className="inline-block">
            <Image 
              src="/om-logo.svg" 
              alt="OneMoney Logo" 
              width={120} 
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <Link 
              href="/common/policies?company=onemoney" 
              className="text-sm text-foreground/80 hover:text-[#00b140] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/common/terms-conditions?company=onemoney" 
              className="text-sm text-foreground/80 hover:text-[#00b140] transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-foreground/60 text-center">
            © {new Date().getFullYear()} OneMoney. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 