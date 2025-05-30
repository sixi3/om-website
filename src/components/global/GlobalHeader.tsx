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
  return (
    <Link
      key={subItem.name}
      href={subItem.href}
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
  return (
    <Link
      key={subItem.name}
      href={subItem.href}
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
    <div className="fixed top-0 left-0 right-0 z-50 p-3 pointer-events-none will-change-transform">
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
        <div className="flex h-16 items-center justify-between px-4">
          <Link href={`/${productName}/`} className="mr-6 flex items-center space-x-2 flex-shrink-0">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
              priority
              className="will-change-transform"
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
                  <span className="group-hover:text-[var(--accent-color)] uppercase tracking-wide">{item.name}</span>
                  {item.showChevron && (
                    <ChevronDown 
                      className={cn(
                        "ml-1 h-4 w-4 group-hover:text-[var(--accent-color)] transition-transform duration-200",
                        openDropdown === item.name ? "rotate-180" : "rotate-0"
                      )} 
                    />
                  )}
                </Link>
                
                {item.submenu && (
                  <div 
                    className={cn(
                      "absolute top-full left-0 mt-1 w-60 rounded-md shadow-lg bg-background border border-border/40 py-1 z-50",
                      "transition-[opacity,transform] duration-200 ease-out will-change-transform",
                      openDropdown === item.name 
                        ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    )}
                    onMouseEnter={() => handleMouseEnterDropdown(item.name)}
                    onMouseLeave={handleMouseLeaveDropdownArea}
                  >
                    {item.submenu?.map((subItem) => (
                      <DropdownItem 
                        key={subItem.name}
                        subItem={subItem} 
                        onClick={handleDropdownItemClick} 
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {talkToUsFormComponent && (
              <Dialog>
                <DialogTrigger asChild>
                  <GlowingButton 
                    size="sm" 
                    className={cn(
                      "whitespace-nowrap", 
                      isSmallScreen ? "hidden" : "flex"
                    )}
                    style={cssVars}
                    disabled={isExtraSmallScreen}
                  >
                    {talkToUsButtonText}
                  </GlowingButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>Get in touch with us today!</DialogTitle>
                    <DialogDescription>
                      Are you ready to boost your financial services with India's Biggest Account Aggregator?
                    </DialogDescription>
                  </DialogHeader>
                  {talkToUsFormComponent}
                </DialogContent>
              </Dialog>
            )}

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
            {talkToUsFormComponent && (
              <div className="border-t border-border/40 p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <GlowingButton 
                      size="sm" 
                      className="w-full"
                      style={cssVars}
                    >
                      {talkToUsButtonText}
                    </GlowingButton>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>Get in touch with us today!</DialogTitle>
                      <DialogDescription>
                        Are you ready to boost your financial services with India's Biggest Account Aggregator?
                      </DialogDescription>
                    </DialogHeader>
                    {talkToUsFormComponent}
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </header>
    </div>
  );
} 