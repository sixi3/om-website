"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GlowingButton } from "@/components/ui/glowing-button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TalkToUsForm } from "@/components/forms/TalkToUsForm";

const navItems = [
  { name: "Solutions", href: "#", showChevron: true },
  { name: "Governance", href: "#", showChevron: true },
  { name: "About", href: "#", showChevron: true },
  { name: "Use Cases", href: "#" },
  { name: "Contact Us", href: "#" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuVariants = {
    initial: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-3 pointer-events-none">
      <header
        className={cn(
          "pointer-events-auto rounded-lg border transition-all duration-300 ease-in-out",
          isScrolled
            ? "border-white/20 bg-background/40 backdrop-blur-md shadow-md"
            : "border-transparent bg-transparent shadow-none"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/om-logo.svg"
              alt="OneMoney Logo"
              width={98}
              height={23}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-10 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center text-foreground/60 transition-colors"
              >
                <span className="group-hover:text-[#00b140] uppercase tracking-wide">{item.name}</span>
                {item.showChevron && (
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:text-[#00b140]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <GlowingButton size="sm" className="whitespace-nowrap">
                  Talk to Us
                </GlowingButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Get in touch with us today!</DialogTitle>
                  <DialogDescription>
                    Are you ready to boost your financial services with India's Biggest Account Aggregator?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-1">
                  <TalkToUsForm />
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="md:hidden absolute top-full left-0 right-0 bg-background/90 backdrop-blur-md border-t border-white/20 shadow-lg rounded-b-lg py-4 px-4"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center text-foreground/80 hover:text-[#00b140] py-2 text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="uppercase tracking-wide">{item.name}</span>
                    {item.showChevron && (
                      <ChevronDown className="ml-1 h-4 w-4 group-hover:text-[#00b140]" />
                    )}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
} 