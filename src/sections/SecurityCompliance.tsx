import React from "react";
// import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TiltCard } from "@/components/ui/tilt-card";
import Image from "next/image";
import { GridBackground } from "@/components/ui/grid-background";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const securityData = [
  {
    title: "Data Privacy",
    icon: "/icons8-privacy.svg",
    points: [
      "We _never_ store your banking credentials",
      "We _never_ access your financial information",
      "We _never_ analyze your personal financial data",
    ],
  },
  {
    title: "Data Security",
    icon: "/icons8-cloud-firewall.svg",
    points: [
      "End-to-end encryption",
      "Protected against unauthorized access",
      "Advanced security protocols",
    ],
  },
  {
    title: "Regulatory Compliance",
    icon: "/icons8-favorites-shield.svg",
    points: [
      "100% aligned with RBI's AA Master Directions",
      "Fully compliant with DPDP Act",
      "Exceeding India's strictest security standards",
    ],
  },
];

export function SecurityCompliance() {
  return (
    <section className="relative w-full py-24">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">End-to-End</span>{" "} 
            <span className={metallicBlackTextClasses}>Security</span>{" "}
            <span className={metallicBlackTextClasses}>and</span>{" "}
            <span className={metallicBlackTextClasses}>Compliance</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/80 mx-auto">
            Your data security is our top priority. We maintain the highest
            standards of privacy and compliance.
          </p>
        </div>

        {/* Cards Grid - Limited max-width and centered */}
        <div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-center max-w-5xl mx-auto" 
          style={{ perspective: '1000px' }} 
        >
          {securityData.map((item, index) => (
            <TiltCard
              key={index}
              className="relative w-full h-full rounded-lg border border-slate-200 bg-background/10 p-6 backdrop-blur-md shadow-xl dark:bg-black/50"
            >
              <div className="relative z-20">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="text-2xl font-bold text-foreground pb-4 mt-4 whitespace-nowrap">
                  {item.title}
                </h3>
                <ul className="space-y-2 text-foreground/90 mt-2">
                  {item.points.map((point, pIndex) => (
                    <React.Fragment key={pIndex}>
                      <li>{point.replace(/_([^_]+)_/g, '$1')}</li>
                      {pIndex < item.points.length - 1 && (
                        <div className="w-4 h-px bg-border border-slate-800 my-2"></div>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
} 