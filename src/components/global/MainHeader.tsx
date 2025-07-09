"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import Image from "next/image";


// Import the existing dropdown components
import { DropdownMenu, TriggerWrapper, Trigger, TabsContainer, Tab } from "@/components/ui/dropdown-menu";
import { ProductDropdownContent } from "@/components/ui/product-dropdown-content";
import { SolutionsDropdownContent } from "@/components/ui/solutions-dropdown-content";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { WhyEqualDropdownContent } from "@/components/ui/why-equal-dropdown-content";
import { PrivacyDropdownContent } from "@/components/ui/privacy-dropdown-content";
import { ResourcesDropdownContent } from "@/components/ui/resources-dropdown-content";

interface MainHeaderProps {
  className?: string;
}

// Company section detection and tab configurations
type CompanySection = 'equal' | 'moneyone' | 'onemoney' | 'default';

interface TabConfig {
  trigger: string;
  content: React.ComponentType;
  mobileLinks: Array<{
    title: string;
    href: string;
  }>;
}

const getCompanySection = (pathname: string): CompanySection => {
  if (pathname.startsWith('/equal') || pathname.startsWith('/solutions')) {
    return 'equal';
  }
  if (pathname.startsWith('/moneyone')) {
    return 'moneyone'; 
  }
  if (pathname.startsWith('/onemoney')) {
    return 'onemoney';
  }
  return 'default';
};

const getTabConfigurations = (section: CompanySection): TabConfig[] => {
  const baseConfig: TabConfig[] = [
    {
      trigger: "WHY ONE EQUAL",
      content: WhyEqualDropdownContent,
      mobileLinks: []
    },
    {
      trigger: "PRODUCTS", 
      content: ProductDropdownContent,
      mobileLinks: [
        { title: "Equal ID Gateway", href: "/equal/products/identity-gateway" },
        { title: "Equal Console", href: "/equal/products/console" },
        { title: "OneMoney AA", href: "/onemoney" },
        { title: "FinPro FIU TSP", href: "/moneyone/products/finpro" }
      ]
    },
    {
      trigger: "SOLUTIONS",
      content: SolutionsDropdownContent,
      mobileLinks: [
        { title: "Financial Services", href: "/equal/solutions/financial-services" },
        { title: "Healthcare", href: "/solutions/healthcare" },
        { title: "Gig Economy", href: "/equal/solutions/gig-hiring" },
        { title: "Enterprise Hiring", href: "/equal/solutions/enterprise-hiring" },
        { title: "Staffing", href: "/equal/solutions/staffing" }
      ]
    },
    {
      trigger: "RESOURCES",
      content: ResourcesDropdownContent,
      mobileLinks: [
        { title: "In The News", href: "/news/latest-press-releases" },
        { title: "Equal Blog", href: "/blog/industry-insights" },
        { title: "Newsletter", href: "/newsletter/subscribe" },
        { title: "Developer Docs", href: "/docs/api-reference" }
      ]
    }
  ];

  // Add privacy policy tab for onemoney
  if (section === 'onemoney') {
    baseConfig.push({
      trigger: "PRIVACY & LEGAL",
      content: PrivacyDropdownContent,
      mobileLinks: [
        { title: "Privacy Policy", href: "/onemoney/policies" },
        { title: "Terms of Use", href: "/onemoney/policies" },
        { title: "Compliance", href: "/onemoney/compliance" }
      ]
    });
  }

  return baseConfig;
};

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

// Main navigation items - now handled dynamically through tab configurations

export function MainHeader({ className }: MainHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();
  
  // Get dynamic tab configuration based on current section
  const currentSection = getCompanySection(pathname);
  const tabConfigs = getTabConfigurations(currentSection);

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
      transition: { duration: 0.15, ease: easeInOut }
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: easeInOut }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.1, ease: easeInOut }
    },
  };

  // Navigation item active state is now handled in the mobile navigation mapping

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:p-3 pointer-events-none will-change-transform", className)}>
      <header
        className={cn(
          "pointer-events-auto rounded-full border transition-all duration-300 ease-in-out will-change-transform",
          isScrolled
            ? "border-white/20 bg-background/40 backdrop-blur-md shadow-md"
            : "border-transparent bg-transparent shadow-none"
        )}
        style={cssVars}
      >
        <div className="flex h-16 items-center px-2 sm:px-4">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/equal-logo.svg"
                alt="Equal Logo"
                width={71}
                height={21}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>
          

          {/* Center: Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-2 md:gap-4">
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
          
          
          {/* Right: GET IN TOUCH Button (Desktop) + Mobile Menu Toggle */}
          <div className="flex items-center flex-shrink-0 ml-auto px-4 gap-4">
            {/* GET IN TOUCH Button - Hidden on mobile */}
            <div className="hidden lg:block">
              <ShimmerButton>
                GET IN TOUCH
              </ShimmerButton>
            </div>
            
            {/* Mobile Menu Toggle - Only visible on mobile */}
            <div className="lg:hidden">
              <button
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
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
                {/* Dynamic Mobile Navigation Items */}
                {tabConfigs.map((config, index) => {
                  if (config.mobileLinks.length === 0) {
                    // Single item like "WHY ONE EQUAL"
                    return (
                      <div key={index} className="space-y-2 mb-4">
                        <MobileNavItem
                          title={config.trigger}
                          href="/why-oneequal" // Default href for WHY ONE EQUAL
                          isActive={pathname === "/why-oneequal"}
                          onClick={closeMobileMenu}
                        />
                      </div>
                    );
                  } else {
                    // Section with multiple links
                    return (
                      <div key={index} className="space-y-2 mb-4">
                        <div className="px-3 py-2">
                          <h3 className="text-sm font-semibold text-[#00b140] uppercase tracking-widest">
                            {config.trigger}
                          </h3>
                        </div>
                        <div className="pl-3 space-y-1">
                          {config.mobileLinks.map((link, linkIndex) => (
                            <MobileNavItem
                              key={linkIndex}
                              title={link.title}
                              href={link.href}
                              isActive={pathname === link.href}
                              onClick={closeMobileMenu}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  }
                })}

                {/* GET IN TOUCH Button for Mobile */}
                <div className="px-3 py-2">
                  <ShimmerButton 
                    className="w-full"
                    onClick={closeMobileMenu}
                  >
                    GET IN TOUCH
                  </ShimmerButton>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
} 