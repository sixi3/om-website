import React from "react";
import Image from "next/image"; // Import next/image
import { TiltCard } from "../components/ui/tilt-card";

// Define metallic black class (reuse from SecurityCompliance or move to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Placeholder Data for Leaders
const leadershipData = [
  {
    name: "A. Krishna Prasad",
    title: "CEO & Founder OneMoney & MoneyOne",
    // imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
    imageUrl: "/KP.png", // Use provided image
  },
  {
    name: "Jagdish Capoor",
    title: "Former Deputy Governor, RBI Board of Advisors",
    // imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
    imageUrl: "/JC.png", // Use provided image
  },
  {
    name: "P.H. Ravikumar",
    title: "Founder, CEO of NCDEX, Board of Advisors",
    // imageUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
    imageUrl: "/PH.png", // Use provided image
  },
];

export function Leadership() {
  return (
    <section className="relative w-full py-32">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Title */} 
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
            <span className={metallicBlackTextClasses}>Guided</span>{" "}
            <span className={metallicBlackTextClasses}>By</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">Leadership</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Driving innovation and trust at the forefront of financial technology.
          </p>
        </div>

        {/* Leadership Cards Grid - Similar to Security section */} 
        <div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-center max-w-5xl mx-auto" 
          style={{ perspective: '1000px' }} // Perspective for TiltCard
        >
          {leadershipData.map((leader, index) => (
            <TiltCard
              key={index}
              className="relative w-80 h-80 rounded-lg overflow-hidden group/card shadow-xl border border-slate-200 dark:border-neutral-700"
            >
              {/* Use next/image component for background */}
              <Image
                src={leader.imageUrl}
                alt={`Portrait of ${leader.name}`}
                fill={true}
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 320px, 320px"
                quality={80}
              />

              {/* Overlay - ensure it's above the image */}
              <div className="absolute inset-0 w-full h-full transition-opacity duration-300 bg-gradient-to-b from-transparent via-black/20 to-black/80 rounded-lg z-10"></div>
              
              {/* Content Area - Ensure it's above the overlay */}
              <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
                <h3 className="text-2xl font-bold">
                  {leader.name}
                </h3>
                <p className="text-md text-white/80">
                  {/* Split title and insert line break */}
                  {leader.title.split(' - ').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <><br />{' - '}</>}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
} 