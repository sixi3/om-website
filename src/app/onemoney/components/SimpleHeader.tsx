"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Import dropdown components
import { DropdownMenu, TriggerWrapper, Trigger, TabsContainer, Tab } from "@/components/ui/dropdown-menu";
import { AboutUsDropdownContent } from "./AboutUsDropdownContent";
import { ResourcesDropdownContent } from "./ResourcesDropdownContent";
import { ProductsDropdownContent } from "./ProductsDropdownContent";

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

interface TabConfig {
  trigger: string;
  content: React.ComponentType;
  mobileLinks: Array<{
    title: string;
    href: string;
  }>;
}

interface MobileSection {
  id: string;
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

// Animated hamburger menu component
const AnimatedHamburger = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    className="relative w-6 h-6 flex flex-col justify-center items-center"
    onClick={onClick}
    aria-label="Toggle mobile menu"
  >
    <motion.span
      className="absolute w-5 h-0.5 bg-current transition-all duration-300"
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -6,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.span
      className="absolute w-5 h-0.5 bg-current transition-all duration-300"
      animate={{
        opacity: isOpen ? 0 : 1,
        x: isOpen ? -20 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.span
      className="absolute w-5 h-0.5 bg-current transition-all duration-300"
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 6,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </button>
));

AnimatedHamburger.displayName = 'AnimatedHamburger';

// Mobile collapsible section component
const MobileCollapsibleSection = memo(({ 
  section, 
  isOpen, 
  onToggle, 
  pathname,
  onLinkClick 
}: { 
  section: MobileSection; 
  isOpen: boolean; 
  onToggle: () => void;
  pathname: string;
  onLinkClick: () => void;
}) => {
  const sectionVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <div className="border-b border-slate-200/30 lg:border-white/20">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-4 text-left hover:bg-slate-50/50 transition-colors duration-200"
      >
        <span className="text-sm font-semibold text-[#00b140] uppercase tracking-widest">
          {section.title}
        </span>
        <motion.div
          variants={chevronVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </motion.div>
      </button>
      
      <motion.div
        variants={sectionVariants}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        className="overflow-hidden"
      >
        <div className="pb-2">
          {section.links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isOpen ? 1 : 0, 
                x: isOpen ? 0 : -20 
              }}
              transition={{ 
                duration: 0.3, 
                delay: isOpen ? index * 0.05 + 0.1 : 0,
                ease: "easeOut" 
              }}
            >
{link.href.startsWith('#') ? (
                <button
                  onClick={() => {
                    const element = document.getElementById(link.href.slice(1));
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                    onLinkClick();
                  }}
                  className={cn(
                    "flex items-center px-6 py-3 text-base font-medium transition-colors w-full text-left",
                    "text-foreground/80 hover:bg-slate-50 hover:text-foreground"
                  )}
                >
                  {link.title}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center px-6 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-[#00b140] text-white"
                      : "text-foreground/80 hover:bg-slate-50 hover:text-foreground"
                  )}
                  onClick={onLinkClick}
                >
                  {link.title}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

MobileCollapsibleSection.displayName = 'MobileCollapsibleSection';

export function SimpleHeader({ className }: SimpleHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Tab configurations
  const tabConfigs: TabConfig[] = [
    {
      trigger: "PRODUCTS",
      content: ProductsDropdownContent,
      mobileLinks: [
        { title: "How OneMoney Works", href: "#what-is-onemoney-section" },
        { title: "Use Cases", href: "#what-is-onemoney-section" }
      ]
    },
    {
      trigger: "ABOUT US",
      content: AboutUsDropdownContent,
      mobileLinks: [
        { title: "Team", href: "/onemoney/team" },
        { title: "Vision", href: "/onemoney/vision-mission" },
        { title: "Leadership", href: "/onemoney/leadership" },
        { title: "Values", href: "/onemoney/values" }
      ]
    },
    {
      trigger: "RESOURCES",
      content: ResourcesDropdownContent,
      mobileLinks: [
        { title: "Privacy Policy", href: "/onemoney/policies" },
        { title: "Terms & Conditions", href: "/onemoney/termsconditions" },
        { title: "Timeline", href: "/onemoney/timeline" },
        { title: "Compliance", href: "/onemoney/compliance" }
      ]
    }
  ];

  // Mobile sections
  const mobileSections: MobileSection[] = [
    {
      id: "products",
      title: "PRODUCTS",
      links: [
        { title: "How OneMoney Works", href: "#what-is-onemoney-section" },
        { title: "Use Cases", href: "#what-is-onemoney-section" }
      ]
    },
    {
      id: "about",
      title: "ABOUT US",
      links: [
        { title: "Team", href: "/onemoney/team" },
        { title: "Vision", href: "/onemoney/vision-mission" },
        { title: "Leadership", href: "/onemoney/leadership" },
        { title: "Values", href: "/onemoney/values" }
      ]
    },
    {
      id: "resources",
      title: "RESOURCES",
      links: [
        { title: "Privacy Policy", href: "/onemoney/policies" },
        { title: "Terms & Conditions", href: "/onemoney/termsconditions" },
        { title: "Timeline", href: "/onemoney/timeline" },
        { title: "Compliance", href: "/onemoney/compliance" }
      ]
    }
  ];

  // CSS variables for theming
  const cssVars = {
    "--accent-color": "#00b140",
    "--accent-hover": "#087C32",
    "--button-text": "#ffffff",
    "--glow-color": "#00b140",
    "--hover-glow-color": "#087C32",
  } as React.CSSProperties;

  // Scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial checks
    handleScroll();
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

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
    // Close any open mobile sections when closing the menu
    if (isMobileMenuOpen) {
      setOpenMobileSection(null);
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  }, []);

  const toggleMobileSection = useCallback((sectionId: string) => {
    setOpenMobileSection(prev => prev === sectionId ? null : sectionId);
  }, []);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // Scroll to WhatIsOneMoney section
  const scrollToWhatIsOneMoney = useCallback(() => {
    const element = document.getElementById('what-is-onemoney-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:p-3 pointer-events-none will-change-transform", className)}>
      {/* Mobile Header */}
      <header
        className={cn(
          "lg:hidden pointer-events-auto transition-all duration-300 ease-in-out",
          (isScrolled || isMobileMenuOpen)
            ? "border border-white/20 bg-background/40 backdrop-blur-md shadow-md rounded-2xl"
            : "border border-transparent bg-transparent shadow-none rounded-2xl"
        )}
        style={cssVars}
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
            <AnimatedHamburger isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
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
              <nav className="flex flex-col">
                {/* Collapsible Sections */}
                {mobileSections.map((section) => (
                  <MobileCollapsibleSection
                    key={section.id}
                    section={section}
                    isOpen={openMobileSection === section.id}
                    onToggle={() => toggleMobileSection(section.id)}
                    pathname={pathname}
                    onLinkClick={closeMobileMenu}
                  />
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
          "hidden lg:block pointer-events-auto transition-all duration-300 ease-in-out will-change-transform",
          "rounded-full border",
          isScrolled
            ? "border-white/20 bg-background/40 backdrop-blur-md shadow-md"
            : "border-transparent bg-transparent shadow-none",
          "overflow-visible"
        )}
        style={cssVars}
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
          
          {/* Center: Desktop Navigation with Dropdowns */}
          <nav className="flex items-center justify-center flex-1">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Dropdown Menu */}
              <DropdownMenu>
                <TriggerWrapper>
                  {tabConfigs.map((config, index) => (
                    <Trigger key={index}>{config.trigger}</Trigger>
                  ))}
                </TriggerWrapper>
                
                <TabsContainer>
                  {tabConfigs.map((config, index) => {
                    const ContentComponent = config.content;
                    return (
                      <Tab key={index}>
                        <ContentComponent />
                      </Tab>
                    );
                  })}
                </TabsContainer>
              </DropdownMenu>
            </div>
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