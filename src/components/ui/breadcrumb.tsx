"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  title: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  className?: string;
  separator?: React.ReactNode;
  homeIcon?: boolean;
  maxItems?: number;
}

// Route to title mapping
const routeTitleMap: Record<string, string> = {
  // Equal section
  equal: "Employment",
  solutions: "Solutions",
  products: "Products",
  industries: "Industries",
  "trust-security": "Trust & Security",
  "financial-services": "Financial Services",
  "enterprise-hiring": "Enterprise Hiring",
  "gig-hiring": "Gig Hiring",
  staffing: "Staffing",
  console: "Console",
  "identity-gateway": "Identity Gateway",
  
  // MoneyOne section
  moneyone: "MoneyOne",
  finpro: "FinPro",
  
  // OneMoney section
  onemoney: "OneMoney",
  compliance: "Compliance",
  leadership: "Leadership",
  timeline: "Timeline",
  "vision-mission": "Vision & Mission",
  
  // Common pages
  common: "Common",
  team: "Team",
  policies: "Policies",
  "terms-conditions": "Terms & Conditions",
  "about-us": "About Us",
  "contact-us": "Contact Us",
};

// Function to generate breadcrumb items from pathname
const generateBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];
  
  // Add home
  items.push({
    title: "Home",
    href: "/",
  });
  
  // Filter out "common" from segments to skip showing it in breadcrumbs
  const filteredSegments = segments.filter(segment => segment !== "common");
  
  // Check if we're on OneMoney terms or policies pages
  const isOneMoneyTermsOrPolicies = pathname.includes('/common/terms-conditions') || pathname.includes('/common/policies');
  const isOneMoneyPage = isOneMoneyTermsOrPolicies && pathname.includes('company=onemoney');
  
  // Add OneMoney breadcrumb if we're on OneMoney terms or policies pages
  if (isOneMoneyPage) {
    items.push({
      title: "OneMoney",
      href: "/onemoney",
    });
  }
  
  // Build breadcrumb items from filtered segments
  let currentPath = "";
  let originalIndex = 0;
  
  filteredSegments.forEach((segment, index) => {
    // Build the actual path including skipped segments
    while (originalIndex < segments.length && segments[originalIndex] !== segment) {
      currentPath += `/${segments[originalIndex]}`;
      originalIndex++;
    }
    currentPath += `/${segment}`;
    originalIndex++;
    
    const isCurrentPage = index === filteredSegments.length - 1;
    
    // Special handling for "products" breadcrumb - link to UseCaseGrid section
    let href = currentPath;
    if (segment === "products" && !isCurrentPage) {
      // Check if we're on any product detail page under /equal/products/
      // Use a more deterministic approach to avoid hydration mismatches
      const isEqualProductPage = pathname.startsWith('/equal/products/') && pathname !== '/equal/products';
      if (isEqualProductPage) {
        href = "/equal#use-cases"; // Link to UseCaseGrid section on main Equal page
      }
    }
    
    items.push({
      title: routeTitleMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: href,
      isCurrentPage,
    });
  });
  
  return items;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className = "",
  separator = <ChevronRight className="h-4 w-4 text-slate-400" />,
  homeIcon = true,
  maxItems = 4,
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }
  
  const items = generateBreadcrumbItems(pathname);
  
  // Limit items if maxItems is specified
  const displayItems = items.length > maxItems 
    ? [
        items[0], // Always show home
        { title: "...", href: "#", isCurrentPage: false },
        ...items.slice(-maxItems + 2)
      ]
    : items;
  
  return (
    <nav
      className={cn(
        "flex items-center space-x-2 text-sm text-slate-600",
        "mb-4", // Use consistent margin to avoid hydration mismatch
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide w-full pr-2" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
        {displayItems.map((item, index) => (
          <li key={`${item.href}-${index}`} className="flex items-center flex-shrink-0">
            {index > 0 && (
              <span className="mr-2" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.isCurrentPage ? (
              <span
                className={cn(
                  "font-medium",
                  "text-slate-900" // Use consistent color to avoid hydration mismatch
                )}
                aria-current="page"
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.title
                )}
              </span>
            ) : item.title === "..." ? (
              <span className="text-slate-400">...</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#00b140] transition-colors duration-200"
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.title
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

// Export a version with different styling for different sections
export const EqualBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    {...props}
    className={cn(
      "bg-white/50 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2",
      props.className
    )}
  />
);

export const MoneyOneBreadcrumb: React.FC<BreadcrumbProps> = ({
  className = "",
  separator = <ChevronRight className="h-4 w-4 text-slate-400" />,
  homeIcon = true,
  maxItems = 4,
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't show breadcrumbs on MoneyOne landing page
  if (pathname === "/moneyone") {
    return null;
  }
  
  // Generate breadcrumb items specifically for MoneyOne
  const generateMoneyOneBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [];
    
    // Add home pointing to MoneyOne
    items.push({
      title: "Home",
      href: "/moneyone",
    });
    
    // Filter out "moneyone" from segments to skip showing it in breadcrumbs
    const filteredSegments = segments.filter(segment => segment !== "moneyone");
    
    // Build breadcrumb items from filtered segments
    let currentPath = "/moneyone"; // Start from MoneyOne base path
    
    filteredSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isCurrentPage = index === filteredSegments.length - 1;
      
      // Special handling for "products" breadcrumb - link to Products section on MoneyOne page
      let href = currentPath;
      if (segment === "products" && !isCurrentPage) {
        href = "/moneyone#products"; // Link to Products section on MoneyOne page
      }
      
      items.push({
        title: routeTitleMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: href,
        isCurrentPage,
      });
    });
    
    return items;
  };
  
  const items = generateMoneyOneBreadcrumbItems(pathname);
  
  // Limit items if maxItems is specified
  const displayItems = items.length > maxItems 
    ? [
        items[0], // Always show home
        { title: "...", href: "#", isCurrentPage: false },
        ...items.slice(-maxItems + 2)
      ]
    : items;
  
  return (
    <nav
      className={cn(
        "flex items-center space-x-2 text-sm text-slate-600",
        "mb-4",
        "bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide w-full pr-2" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
        {displayItems.map((item, index) => (
          <li key={`${item.href}-${index}`} className="flex items-center flex-shrink-0">
            {index > 0 && (
              <span className="mr-2" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.isCurrentPage ? (
              <span
                className={cn(
                  "font-medium",
                  "text-slate-900"
                )}
                aria-current="page"
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.title
                )}
              </span>
            ) : item.title === "..." ? (
              <span className="text-slate-400">...</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#00b140] transition-colors duration-200"
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.title
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export const OneMoneyBreadcrumb: React.FC<BreadcrumbProps> = ({
  className = "",
  separator = <ChevronRight className="h-4 w-4 text-slate-400" />,
  homeIcon = true,
  maxItems = 4,
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't show breadcrumbs on OneMoney landing page
  if (pathname === "/onemoney") {
    return null;
  }
  
  // Generate breadcrumb items specifically for OneMoney
  const generateOneMoneyBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [];
    
    // Add home pointing to OneMoney
    items.push({
      title: "Home",
      href: "/onemoney",
    });
    
    // Filter out "onemoney" from segments to skip showing it in breadcrumbs
    const filteredSegments = segments.filter(segment => segment !== "onemoney");
    
    // Build breadcrumb items from filtered segments
    let currentPath = "/onemoney"; // Start from OneMoney base path
    
    filteredSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isCurrentPage = index === filteredSegments.length - 1;
      
      items.push({
        title: routeTitleMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: currentPath,
        isCurrentPage,
      });
    });
    
    return items;
  };
  
  const items = generateOneMoneyBreadcrumbItems(pathname);
  
  // Limit items if maxItems is specified
  const displayItems = items.length > maxItems 
    ? [
        items[0], // Always show home
        { title: "...", href: "#", isCurrentPage: false },
        ...items.slice(-maxItems + 2)
      ]
    : items;
  
  return (
    <nav
      className={cn(
        "flex items-center space-x-2 text-sm text-slate-600",
        "mb-4",
        "bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide w-full pr-2" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
        {displayItems.map((item, index) => (
          <li key={`${item.href}-${index}`} className="flex items-center flex-shrink-0">
            {index > 0 && (
              <span className="mr-2" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.isCurrentPage ? (
              <span
                className={cn(
                  "font-medium",
                  "text-slate-900"
                )}
                aria-current="page"
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.title
                )}
              </span>
            ) : item.title === "..." ? (
              <span className="text-slate-400">...</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#00b140] transition-colors duration-200"
              >
                {index === 0 && homeIcon ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.title
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}; 