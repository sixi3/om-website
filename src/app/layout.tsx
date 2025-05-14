import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { Header } from "@/components/Header"; // Will be moved to OneMoney layout
// import { Footer } from "@/components/Footer"; // Will be moved to OneMoney layout
// import { AuroraBackground } from "@/components/ui/aurora-background"; // Will be moved to OneMoney layout

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Our Platform - Welcome", // Generic Title
  description: "Discover our range of innovative solutions.", // Generic Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          // Consider if bg-background is too specific or if AuroraBackground should be here at a minimal level
          // For now, keeping it simple. `bg-background` likely comes from globals.css or tailwind theme.
          dmSans.variable
        )}
      >
        {/* Header, Footer, and AuroraBackground removed from here */}
        {/* They will be part of src/app/onemoney/layout.tsx for the OneMoney section */}
        <main className="flex-grow relative z-10">{children}</main> 
        {/* A very simple global footer could be added here if needed later */}
      </body>
    </html>
  );
}
