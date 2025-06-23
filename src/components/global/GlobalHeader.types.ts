import { ReactNode } from "react";

// Define types for navigation items and submenus
export interface SubMenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavItem {
  name: string;
  href: string;
  showChevron?: boolean;
  submenu?: SubMenuItem[];
}

// Theme configuration for the header
export interface HeaderTheme {
  accentColor: string;       // Primary brand color (e.g., "#00b140" for OneMoney)
  accentHoverColor: string;  // Hover state for accent elements
  buttonTextColor: string;   // Text color for primary buttons
  headerBgClass?: string;    // Optional custom background class
}

// Props for the GlobalHeader component
export interface GlobalHeaderProps {
  productName: "onemoney" | "moneyone" | "equal"; // Which product this header is for
  logoSrc: string;           // Path to the product logo
  logoAlt?: string;          // Alt text for the logo
  logoWidth?: number;        // Width of the logo in px
  logoHeight?: number;       // Height of the logo in px
  navItems: NavItem[];       // Navigation items specific to the product
  theme?: HeaderTheme;       // Theme configuration (will use defaults if not provided)
  talkToUsFormComponent?: React.ReactNode; // Custom form component for the "Talk to Us" dialog
  talkToUsButtonText?: string; // Text to display on the "Talk to Us" button
}

// Default theme configurations for each product
export const DEFAULT_THEMES: Record<
  "onemoney" | "moneyone" | "equal", 
  HeaderTheme
> = {
  onemoney: {
    accentColor: "#00b140",
    accentHoverColor: "#baff29",
    buttonTextColor: "#ffffff",
  },
  moneyone: {
    accentColor: "#4f46e5", // Indigo color as a placeholder
    accentHoverColor: "#6366f1",
    buttonTextColor: "#ffffff",
  },
  equal: {
    accentColor: "#f97316", // Orange color as a placeholder
    accentHoverColor: "#fb923c",
    buttonTextColor: "#ffffff",
  }
}; 