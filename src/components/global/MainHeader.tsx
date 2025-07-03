"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


// Import the existing dropdown components
import { DropdownMenu, TriggerWrapper, Trigger, TabsContainer, Tab } from "@/components/ui/dropdown-menu";
import { ProductDropdownContent } from "@/components/ui/product-dropdown-content";
import { SolutionsDropdownContent } from "@/components/ui/solutions-dropdown-content";

interface MainHeaderProps {
  className?: string;
}

// Memoized mobile navigation items
const MobileNavItem = memo(({ 
  title, 
  href, 
  isActive, 
  onClick 
}: { 
  title: string; 
  href: string; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <Link
    href={href}
    className={cn(
      "flex items-center rounded-md px-3 py-2 text-base font-medium transition-colors uppercase tracking-wide",
      isActive 
        ? "bg-[#00b140] text-white" 
        : "text-foreground/80 hover:bg-muted hover:text-foreground"
    )}
    onClick={onClick}
  >
    {title}
  </Link>
));

MobileNavItem.displayName = 'MobileNavItem';

// Main navigation items
const NAV_ITEMS = [
  { name: "PRODUCTS", href: "#", hasDropdown: true },
  { name: "SOLUTIONS", href: "#", hasDropdown: true },
  { name: "WHY ONE EQUAL", href: "/why-oneequal", hasDropdown: false },
];

export function MainHeader({ className }: MainHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();

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

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Mobile menu animation variants
  const mobileMenuVariants = {
    initial: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.15, ease: "easeInOut" }
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.1, ease: "easeInOut" }
    },
  };

  // Check if nav item is active
  const isNavItemActive = useCallback((item: typeof NAV_ITEMS[0]) => {
    if (item.href === "#") return false;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  }, [pathname]);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:p-3 pointer-events-none will-change-transform", className)}>
      <header
        className={cn(
          "pointer-events-auto rounded-lg border transition-all duration-300 ease-in-out will-change-transform",
          isScrolled
            ? "border-white/20 bg-background/40 backdrop-blur-md shadow-md"
            : "border-transparent bg-transparent shadow-none"
        )}
        style={cssVars}
      >
        <div className="flex h-16 items-center px-2 sm:px-4">
          {/* Center: Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-2 md:gap-4">
              <DropdownMenu>
                <TriggerWrapper>
                  <Trigger>PRODUCTS</Trigger>
                  <Trigger>SOLUTIONS</Trigger>
                </TriggerWrapper>
                
                <TabsContainer>
                  <Tab>
                    <ProductDropdownContent />
                  </Tab>
                  <Tab>
                    <SolutionsDropdownContent />
                  </Tab>
                </TabsContainer>
              </DropdownMenu>

              {/* WHY OneEqual tab styled like dropdown triggers but without chevron */}
              {NAV_ITEMS.slice(2).map((item) => {
                const isActive = isNavItemActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex h-10 md:h-12 items-center gap-1 rounded-lg px-3 md:px-4 py-1 text-base font-bold tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2 min-h-[44px] min-w-[44px]",
                      isActive 
                        ? "bg-background/50 backdrop-blur-md text-[#00b140] border border-slate-200 hover:shadow-lg" 
                        : "text-slate-800 hover:bg-background/30"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Right: Mobile Menu Toggle */}
          <div className="flex items-center flex-shrink-0 ml-auto lg:hidden">
            <button
              className="text-foreground/80 hover:text-foreground transition-colors"
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
                {/* Mobile Navigation Items */}
                <div className="space-y-2 mb-4">
                  <div className="px-3 py-2">
                    <h3 className="text-sm font-semibold text-[#00b140] uppercase tracking-widest">Products</h3>
                  </div>
                  <div className="pl-3 space-y-1">
                    <MobileNavItem
                      title="Equal ID Gateway"
                      href="/equal/products/identity-gateway"
                      isActive={pathname === "/equal/products/identity-gateway"}
                      onClick={closeMobileMenu}
                    />
                    <MobileNavItem
                      title="Equal Console"
                      href="/equal/products/console"
                      isActive={pathname === "/equal/products/console"}
                      onClick={closeMobileMenu}
                    />
                    <MobileNavItem
                      title="OneMoney AA"
                      href="/onemoney"
                      isActive={pathname === "/onemoney"}
                      onClick={closeMobileMenu}
                    />
                    <MobileNavItem
                      title="FinPro FIU TSP"
                      href="/moneyone/products/finpro"
                      isActive={pathname === "/moneyone/products/finpro"}
                      onClick={closeMobileMenu}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="px-3 py-2">
                    <h3 className="text-sm font-semibold text-[#00b140] uppercase tracking-widest">Solutions</h3>
                  </div>
                  <div className="pl-3 space-y-1">
                    <MobileNavItem
                      title="Financial Services"
                      href="/solutions/financial-services"
                      isActive={pathname === "/solutions/financial-services"}
                      onClick={closeMobileMenu}
                    />
                    <MobileNavItem
                      title="Healthcare"
                      href="/solutions/healthcare"
                      isActive={pathname === "/solutions/healthcare"}
                      onClick={closeMobileMenu}
                    />
                    <MobileNavItem
                      title="Gig Economy"
                      href="/solutions/gig-economy"
                      isActive={pathname === "/solutions/gig-economy"}
                      onClick={closeMobileMenu}
                    />
                    <MobileNavItem
                      title="Recruitment"
                      href="/solutions/recruitment"
                      isActive={pathname === "/solutions/recruitment"}
                      onClick={closeMobileMenu}
                    />
                  </div>
                </div>

                {/* WHY OneEqual Navigation Item */}
                <div className="space-y-2 mb-4">
                  {NAV_ITEMS.slice(2).map((item) => (
                    <MobileNavItem
                      key={item.name}
                      title={item.name}
                      href={item.href}
                      isActive={isNavItemActive(item)}
                      onClick={closeMobileMenu}
                    />
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
} 