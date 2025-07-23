"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Import dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/onemoney/components/ui/dialog";
import { TalkToUsForm } from "@/app/onemoney/components/forms/TalkToUsForm";

interface SimpleHeaderProps {
  className?: string;
}

export function SimpleHeader({ className }: SimpleHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();

  // Scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const navLinks = [
    {
      title: "Privacy Policy",
      href: "/onemoney/policies"
    },
    {
      title: "Terms & Conditions", 
      href: "/onemoney/termsconditions"
    },
    {
        title: "Timeline",
        href:"/onemoney/timeline"
    },
    {
        title: "Compliance",
        href:"/onemoney/compliance"
    }
  ];

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:p-3 pointer-events-none", className)}>
      {/* Mobile Header */}
      <header
        className={cn(
          "lg:hidden pointer-events-auto transition-all duration-300 ease-in-out",
          (isScrolled || isMobileMenuOpen)
            ? "border border-white/20 bg-background/40 backdrop-blur-md shadow-md rounded-2xl"
            : "border border-transparent bg-transparent shadow-none rounded-2xl"
        )}
      >
        <div className="flex h-16 items-center px-2 sm:px-4">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/onemoney" className="flex items-center">
              <Image
                src="/om-logo.svg"
                alt="OneMoney Logo"
                width={71}
                height={21}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right: Mobile Menu Toggle */}
          <div className="flex items-center flex-shrink-0 ml-auto px-4">
            <button
              className="relative w-6 h-6 flex flex-col justify-center items-center"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <motion.span
                className="absolute w-5 h-0.5 bg-current transition-all duration-300"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -6,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute w-5 h-0.5 bg-current transition-all duration-300"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  x: isMobileMenuOpen ? -20 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute w-5 h-0.5 bg-current transition-all duration-300"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 6,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="border-t border-white/20 max-h-[80vh] overflow-y-auto"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-base font-medium transition-colors rounded-lg",
                      pathname === link.href
                        ? "bg-[#00b140] text-white"
                        : "text-foreground/80 hover:bg-slate-50 hover:text-foreground"
                    )}
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </Link>
                ))}

                {/* GET IN TOUCH Button for Mobile */}
                <div className="p-4 border-t border-slate-200/30 lg:border-white/20">
                  <ShimmerButton 
                    className="w-full justify-center"
                    onClick={() => {
                      closeMobileMenu();
                      openDialog();
                    }}
                  >
                    GET IN TOUCH
                  </ShimmerButton>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Desktop Header */}
      <motion.header
        className={cn(
          "hidden lg:block pointer-events-auto transition-all duration-300 ease-in-out",
          "rounded-full border",
          isScrolled
            ? "border-white/20 bg-background/40 backdrop-blur-md shadow-md"
            : "border-transparent bg-transparent shadow-none"
        )}
        animate={{
          borderRadius: isScrolled ? "9999px" : "0px"
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeInOut"
        }}
      >
        <div className="flex h-16 items-center px-2 sm:px-4">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/onemoney" className="flex items-center">
              <Image
                src="/onemoney.svg"
                alt="OneMoney Logo"
                width={71}
                height={21}
                objectFit="contain"
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Center: Navigation Links */}
          <nav className="flex items-center justify-center flex-1 gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-md font-semibold px-2 py-3 rounded-md transition-colors duration-200 hover:text-[#00b140] hover:bg-background/70 hover:backdrop-blur-xl hover:shadow-lg hover:border hover:border-slate-200 uppercase",
                  pathname === link.href
                    ? "text-[#00b140]"
                    : "text-foreground/80"
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Right: GET IN TOUCH Button (Desktop only) */}
          <div className="flex items-center flex-shrink-0 ml-auto pl-4">
            <ShimmerButton onClick={openDialog}>
              GET IN TOUCH
            </ShimmerButton>
          </div>
        </div>
      </motion.header>

      {/* Custom Get In Touch Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Get in touch with us today!</DialogTitle>
            <DialogDescription>
              Ready to boost your business with India's largest data sharing network?
            </DialogDescription>
          </DialogHeader>
          <div className="py-1">
            <TalkToUsForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 