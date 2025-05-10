import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "OneMoney - Powering India's Financial Ecosystem",
  description: "OneMoney enables secure, transparent, and user-consented financial data sharing.",
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
          dmSans.variable
        )}
      >
        <AuroraBackground showRadialGradient={true}>
          <Header />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
        </AuroraBackground>
      </body>
    </html>
  );
}
