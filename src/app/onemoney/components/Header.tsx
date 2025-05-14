"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GlowingButton } from "./ui/glowing-button";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck,
  FileText,
  Target,
  Users,
  Milestone
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TalkToUsForm } from "./forms/TalkToUsForm";

// Define types for navigation items and submenus
interface SubMenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  name: string;
  href: string;
  showChevron?: boolean;
  submenu?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { 
    name: "Governance", 
    href: "#", // Main link might not navigate directly if it has a submenu
    showChevron: true,
    submenu: [
      { name: "Compliance", href: "/onemoney/compliance", icon: ShieldCheck },
      { name: "Policies", href: "/onemoney/policies", icon: FileText },
    ]
  },
  { 
    name: "About", 
    href: "#", 
    showChevron: true,
    submenu: [
      { name: "Vision and Mission", href: "/onemoney/vision-mission", icon: Target },
      { name: "Leadership", href: "/onemoney/leadership", icon: Users },
      { name: "Timeline and Achievements", href: "/onemoney/timeline", icon: Milestone },
    ] 
  },
  { name: "Use Cases", href: "/onemoney/#solutions" }, 
  { name: "Contact Us", href: "/onemoney/#contact-us" }, 
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // State for open dropdown
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null); // Ref for dropdown close timer
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null); // State for open mobile submenu
  const [isSmallScreen, setIsSmallScreen] = useState(true); // Default to true
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(true); // Default to true

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsExtraSmallScreen(window.innerWidth < 350);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScreenSize);

    // Initial checks
    handleScroll();
    checkScreenSize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreenSize);
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

  const dropdownVariants = {
     initial: { opacity: 0, y: -5 },
     animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
     exit: { opacity: 0, y: -5, transition: { duration: 0.15, ease: "easeIn" } }
  };

  const handleMobileItemClick = (item: NavItem) => {
    if (item.submenu) {
      setOpenMobileSubmenu(openMobileSubmenu === item.name ? null : item.name);
    } else {
      setIsMobileMenuOpen(false);
      // Optional: Handle navigation manually if needed, but Link should work
    }
  };

  const handleMobileSubItemClick = () => {
     setIsMobileMenuOpen(false); // Close main menu when subitem clicked
     setOpenMobileSubmenu(null); // Close submenu too
  }

  const submenuVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }
  };

  const DROPDOWN_DELAY = 200; // milliseconds

  const handleMouseEnterDropdown = (itemName: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setOpenDropdown(itemName);
  };

  const handleMouseLeaveDropdownArea = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, DROPDOWN_DELAY);
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
          <Link href="/onemoney/" className="mr-6 flex items-center space-x-2 flex-shrink-0">
            <Image
              src="/om-logo.svg"
              alt="OneMoney Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-x-6 lg:gap-x-10 text-sm font-medium">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnterDropdown(item.name)}
                onMouseLeave={() => item.submenu && handleMouseLeaveDropdownArea()}
              >
                <Link
                  href={item.href}
                  className="group flex items-center text-foreground/60 transition-colors py-2"
                >
                  <span className="group-hover:text-[#00b140] uppercase tracking-wide">{item.name}</span>
                  {item.showChevron && (
                    <ChevronDown 
                      className={cn(
                        "ml-1 h-4 w-4 group-hover:text-[#00b140] transition-transform duration-200",
                        openDropdown === item.name ? "rotate-180" : "rotate-0"
                      )} 
                    />
                  )}
                </Link>
                
                {/* Dropdown Menu - Using CSS Transitions */}
                {/* <AnimatePresence> */}
                   {item.submenu && (
                     <div 
                       className={cn(
                         "absolute top-full left-0 mt-1 w-60 rounded-md shadow-lg bg-background border border-border/40 py-1 z-50",
                         "transition-[opacity,transform] duration-200 ease-out",
                         openDropdown === item.name 
                           ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                           : "opacity-0 invisible -translate-y-1 pointer-events-none"
                       )}
                       onMouseEnter={() => handleMouseEnterDropdown(item.name)} // Keep open if mouse enters dropdown
                       onMouseLeave={handleMouseLeaveDropdownArea} // Start timer if mouse leaves dropdown
                     >
                       {item.submenu?.map((subItem) => {
                         const Icon = subItem.icon;
                         return (
                           <Link
                             key={subItem.name}
                             href={subItem.href}
                             className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                             onClick={() => setOpenDropdown(null)}
                           >
                             {Icon && <Icon className="mr-2 h-4 w-4" />}
                             {subItem.name}
                           </Link>
                         );
                       })}
                     </div>
                   )}
                {/* </AnimatePresence> */}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <GlowingButton 
                  size="sm" 
                  className={cn(
                    "whitespace-nowrap", 
                    isSmallScreen ? "hidden" : "flex" // Hide button on small screens, show on md and up
                  )}
                  disabled={isExtraSmallScreen} // Optional: disable if too small for even the icon
                >
                  Talk to Us
                </GlowingButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Talk to Us</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </DialogDescription>
                </DialogHeader>
                <TalkToUsForm />
              </DialogContent>
            </Dialog>

            <button
              className="lg:hidden p-2 text-foreground/60 hover:text-foreground focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden bg-background/90 backdrop-blur-md shadow-lg rounded-b-lg overflow-hidden"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <nav className="flex flex-col space-y-1 px-2 py-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div 
                    className="flex items-center justify-between text-foreground/80 hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-base font-medium transition-colors cursor-pointer"
                    onClick={() => handleMobileItemClick(item)}
                  >
                    <Link 
                      href={item.href} 
                      onClick={(e) => { if(item.submenu) e.preventDefault(); }} // Prevent Link nav if it has submenu, let onClick handle it
                      className="flex-grow"
                    >
                        {item.name}
                    </Link>
                    {item.showChevron && (
                      <ChevronDown 
                        className={cn(
                          "ml-2 h-5 w-5 transition-transform duration-200",
                          openMobileSubmenu === item.name ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {item.submenu && openMobileSubmenu === item.name && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={submenuVariants}
                        className="pl-6 overflow-hidden" // Ensures content within is clipped during animation
                      >
                        {item.submenu.map((subItem) => {
                          const Icon = subItem.icon; 
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center text-foreground/70 hover:bg-muted/80 hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                              onClick={handleMobileSubItemClick} // Close menu on sub-item click
                            >
                              {Icon && <Icon className="mr-2 h-4 w-4" />}
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <div className="border-t border-border/40 p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <GlowingButton 
                    size="sm" 
                    className="w-full"
                  >
                    Talk to Us (Mobile)
                  </GlowingButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>Talk to Us</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <TalkToUsForm />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </header>
    </div>
  );
} 