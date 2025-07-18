import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConditionalFooter } from "@/components/global/ConditionalFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "OneEqual - India's Most Advanced Data Sharing Platform", // Generic Title
  description: "OneEqual is India's Most Advanced Data Sharing Platform. It is a platform that allows you to share your data with others in a secure and private way.", // Generic Description
  icons: {
    icon: "/equal-icon.png",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oneequal.com',
    title: "OneEqual - India's Most Advanced Data Sharing Platform",
    description: "OneEqual is India's Most Advanced Data Sharing Platform. It is a platform that allows you to share your data with others in a secure and private way.",
    siteName: 'OneEqual',
    images: [
      {
        url: '/equal-icon.png',
        width: 1200,
        height: 630,
        alt: 'OneEqual Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "OneEqual - India's Most Advanced Data Sharing Platform",
    description: "OneEqual is India's Most Advanced Data Sharing Platform. It is a platform that allows you to share your data with others in a secure and private way.",
    images: ['/equal-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defensive handling for scripts that access meta tags
              if (typeof window !== 'undefined') {
                const originalQuerySelector = document.querySelector;
                document.querySelector = function(selector) {
                  const element = originalQuerySelector.call(this, selector);
                  if (selector.includes("meta[property='og:") && !element) {
                    // Return a mock element to prevent null reference errors
                    return { content: '' };
                  }
                  return element;
                };
              }
            `,
          }}
        />
      </head>
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
        <main className="flex-grow relative z-100 w-full">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
