"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  Menu, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/onemoney/components/ui/dialog";

import {
  GlobalHeaderProps,
  DEFAULT_THEMES,
  NavItem,
  SubMenuItem
} from "./GlobalHeader.types";

// Import GlowingButton from shared components
import { GlowingButton } from "@/app/onemoney/components/ui/glowing-button";

// Memoized dropdown submenu item
const DropdownItem = memo(({ subItem, onClick }: { 
  subItem: SubMenuItem; 
  onClick: () => void;
}) => {
  const Icon = subItem.icon;
  const isExternal = subItem.href.startsWith('http');
  return (
    <Link
      key={subItem.name}
      href={subItem.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {subItem.name}
    </Link>
  );
});
DropdownItem.displayName = 'DropdownItem';

// Memoized mobile submenu item
const MobileSubMenuItem = memo(({ subItem, onClick }: { 
  subItem: SubMenuItem; 
  onClick: () => void;
}) => {
  const Icon = subItem.icon;
  const isExternal = subItem.href.startsWith('http');
  return (
    <Link
      key={subItem.name}
      href={subItem.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flex items-center text-foreground/70 hover:bg-muted/80 hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {subItem.name}
    </Link>
  );
});
MobileSubMenuItem.displayName = 'MobileSubMenuItem';

export function GlobalHeader({
  productName,
  logoSrc,
  logoAlt = `${productName.charAt(0).toUpperCase() + productName.slice(1)} Logo`,
  logoWidth = 140,
  logoHeight = 40,
  navItems,
  theme: customTheme,
  talkToUsFormComponent,
  talkToUsButtonText = "Talk to Us"
}: GlobalHeaderProps) {
  // Merge the default theme with any custom theme properties
  const theme = { ...DEFAULT_THEMES[productName], ...customTheme };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(false);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-calculated styles for CSS variables
  const cssVars = {
    "--accent-color": theme.accentColor,
    "--accent-hover": theme.accentHoverColor,
    "--button-text": theme.buttonTextColor,
    "--glow-color": theme.accentColor,
    "--hover-glow-color": theme.accentHoverColor,
  } as React.CSSProperties;

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimerRef.current) {
      clearTimeout(resizeTimerRef.current);
    }
    
    resizeTimerRef.current = setTimeout(() => {
      const windowWidth = window.innerWidth;
      setIsSmallScreen(windowWidth < 768);
      setIsExtraSmallScreen(windowWidth < 350);
    }, 100); // 100ms debounce
  }, []);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
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
      
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, [handleScroll, handleResize]);

  // Set initial screen size values on component mount
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
    setIsExtraSmallScreen(window.innerWidth < 350);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const mobileMenuVariants = {
    initial: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.15, ease: "easeInOut" } // Slightly faster animation
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.1, ease: "easeInOut" } // Even faster exit animation
    },
  };

  const handleMobileItemClick = useCallback((item: NavItem) => {
    if (item.submenu) {
      setOpenMobileSubmenu(prev => prev === item.name ? null : item.name);
    } else {
      setIsMobileMenuOpen(false);
    }
  }, []);

  const handleMobileSubItemClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }, []);

  const submenuVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: "auto", 
      opacity: 1, 
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    exit: { 
      height: 0, 
      opacity: 0, 
      transition: { duration: 0.15, ease: "easeInOut" } 
    }
  };

  const DROPDOWN_DELAY = 200; // milliseconds

  const handleMouseEnterDropdown = useCallback((itemName: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setOpenDropdown(itemName);
  }, []);

  const handleMouseLeaveDropdownArea = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, DROPDOWN_DELAY);
  }, []);

  const handleDropdownItemClick = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:p-3 pointer-events-none will-change-transform">
      <header
        className={cn(
          "pointer-events-auto rounded-lg border transition-all duration-300 ease-in-out will-change-transform",
          isScrolled
            ? "border-white/20 bg-background/40 backdrop-blur-md shadow-md"
            : "border-transparent bg-transparent shadow-none",
          theme.headerBgClass
        )}
        style={cssVars}
      >
        <div className="flex h-16 items-center px-2 sm:px-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href={`/${productName}/`} className="flex items-center space-x-2">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={isExtraSmallScreen ? Math.max(logoWidth * 0.8, 100) : logoWidth}
                height={isExtraSmallScreen ? Math.max(logoHeight * 0.8, 30) : logoHeight}
                priority
                className="will-change-transform"
              />
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-x-6 lg:gap-x-10 text-sm font-medium">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnterDropdown(item.name)}
                onMouseLeave={() => item.submenu && handleMouseLeaveDropdownArea()}
              >
                <Link
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                  {item.showChevron && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {item.submenu && (
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {item.submenu.map((subItem) => (
                            <DropdownItem key={subItem.name} subItem={subItem} onClick={handleDropdownItemClick} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right: Button and Mobile Menu */}
          <div className="flex items-center flex-shrink-0 ml-auto">
            {/* "Talk to Us" button - always visible */}
            {talkToUsButtonText && (
              <div className="hidden lg:block">
                <Dialog>
                  <DialogTrigger asChild>
                    <GlowingButton
                      className="h-10 px-6 font-semibold"
                      style={cssVars}
                    >
                      {talkToUsButtonText}
                    </GlowingButton>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>Get in touch with us today!</DialogTitle>
                      <DialogDescription>
                        Are you ready to boost your financial services with India&apos;s Biggest Account Aggregator?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      {talkToUsFormComponent ? talkToUsFormComponent : <p className="text-center text-foreground/70">(Demo form will be here)</p>}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            <button
              className="lg:hidden text-foreground/80 hover:text-foreground transition-colors"
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
            className="lg:hidden bg-background/90 backdrop-blur-md shadow-lg rounded-b-lg overflow-hidden will-change-transform"
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
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={(e) => { if(item.submenu) e.preventDefault(); }}
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
                        className="pl-6 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <MobileSubMenuItem
                            key={subItem.name}
                            subItem={subItem}
                            onClick={handleMobileSubItemClick}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <div className="mt-6 flex flex-col space-y-2">
              {talkToUsButtonText && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="w-full h-12 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md font-semibold text-lg transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {talkToUsButtonText}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="p-0 max-w-sm">
                    <DialogHeader className="p-4 border-b">
                      <DialogTitle>{talkToUsButtonText}</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      {talkToUsFormComponent}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <button
                className="w-full h-12 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md font-semibold text-lg"
              >
                {/* Placeholder for the button */}
              </button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </header>
    </div>
  );
}

// Ensure the file is treated as a module
export {}; 