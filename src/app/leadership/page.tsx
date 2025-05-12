import React from "react";
import Image from "next/image";
import { TiltCard } from "@/components/ui/tilt-card";
import { GridBackground } from "@/components/ui/grid-background";
import { Briefcase, Landmark, Scale } from "lucide-react";

// Define metallic black class
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const leadershipPageContent = [
  {
    id: "kp",
    name: "A. Krishna Prasad",
    title: "CEO & Founder - OneMoney & MoneyOne",
    imageUrl: "/KP.png",
    details: (
      <>
        <div className="flex items-center mb-3">
          <Briefcase className="mr-2 h-5 w-5 text-[#00b140] flex-shrink-0" />
          <p className="text-lg font-semibold">Key Contributions & Expertise:</p>
        </div>
        <p>
          As the CEO & Founder of OneMoney & MoneyOne, A. Krishna Prasad drives the vision and strategy for India's leading financial data-sharing platform. His focus is on leveraging technology to enhance financial inclusion and transparency.
        </p>
        <p className="mt-2 italic">
          (Further details about A. Krishna Prasad's specific contributions and extensive expertise in the fintech domain will be updated here.)
        </p>
      </>
    ),
  },
  {
    id: "jc",
    name: "Jagdish Capoor",
    title: "Former Deputy Governor, RBI - Board of Advisors",
    imageUrl: "/JC.png",
    details: (
      <>
        <div className="flex items-center mb-3">
          <Landmark className="mr-2 h-5 w-5 text-[#00b140] flex-shrink-0" />
          <p className="text-lg font-semibold">Transformative Expertise & Achievements:</p>
        </div>
        <p className="mb-2">
          Jagdish Capoor (drawing on insights attributed to J. Satyanarayana in provided materials) brings transformative expertise from a distinguished career, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 prose prose-slate dark:prose-invert max-w-none">
          <li><strong>Chairman, UIDAI:</strong> Spearheaded the Aadhaar project, transforming identity verification in India.</li>
          <li><strong>e-Governance Architect:</strong> Designed and implemented over 20 major projects, including eSeva, Passport Seva, and MCA21, reshaping citizen service delivery.</li>
          <li><strong>Policy Leadership:</strong> Contributed to India's ICT, Cybersecurity, and Electronics Policies, fostering a robust digital economy.</li>
          <li><strong>Innovator at NISG:</strong> Founded the National Institute of Smart Governance, driving Public-Private Partnerships for governance reforms.</li>
          <li><strong>e-Pragati Creator:</strong> Designed India's first state-wide enterprise architecture for e-Governance in Andhra Pradesh.</li>
        </ul>
      </>
    ),
  },
  {
    id: "phr",
    name: "P.H. Ravikumar",
    title: "Founder, CEO of NCDEX - Board of Advisors",
    imageUrl: "/PH.png",
    details: (
      <>
        <div className="flex items-center mb-3">
          <Scale className="mr-2 h-5 w-5 text-[#00b140] flex-shrink-0" />
          <p className="text-lg font-semibold">Pivotal Contributions to Legal & Data Protection Frameworks:</p>
        </div>
        <p className="mb-2">
          P.H. Ravikumar (drawing on insights attributed to Justice Srikrishna in provided materials) brings exceptional legal and institutional expertise from a remarkable career, noted for:
        </p>
        <ul className="list-disc pl-5 space-y-2 prose prose-slate dark:prose-invert max-w-none">
          <li>Service as a Supreme Court Justice.</li>
          <li>Chairman, Financial Sector Legislative Reforms Commission (FSLRC).</li>
          <li>Head of the Srikrishna Commission investigating the Bombay riots of 1992-93.</li>
          <li>Chairman of the Srikrishna Committee on Telangana statehood.</li>
        </ul>
        <p className="mt-3">
          His visionary leadership, notably in shaping data protection principles similar to those in the Personal Data Protection Bill, will guide OneMoney as we redefine identity and security in a digital-first world.
        </p>
      </>
    ),
  },
];

export default function LeadershipPage() {
  return (
    <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Page Title & Subtitle */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>OneMoney's Illustrious Board</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            Our Board consists of a powerhouse of India's most respected leaders in finance. This extraordinary group represents decades of expertise across critical domains like technology, finance, governance, and policy, that will be instrumental in shaping our vision to build the most advanced data sharing platform in India.
          </p>
        </div>

        {/* Leadership Sections */}
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
          {leadershipPageContent.map((leader) => (
            <section key={leader.id} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: Details - Now with responsive order */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 order-last md:order-first">
                {leader.details}
              </div>

              {/* Right Column: Leader Card - Now with responsive order */}
              <div className="flex justify-center md:justify-end order-first md:order-last">
                <TiltCard
                  className="relative w-80 h-96 md:w-96 md:h-[480px] rounded-lg overflow-hidden group/card shadow-xl border border-slate-200 dark:border-neutral-700"
                >
                  <Image
                    src={leader.imageUrl}
                    alt={`Portrait of ${leader.name}`}
                    fill={true}
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 320px, 384px"
                  />
                  <div className="absolute inset-0 w-full h-full transition-opacity duration-300 bg-gradient-to-b from-transparent via-black/20 to-black/80 rounded-lg z-10"></div>
                  <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {leader.name}
                    </h3>
                    <p className="text-md md:text-lg text-white/80">
                      {leader.title.split(' - ').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <><br />{arr[0].includes("CEO") ? '' : ' - '}</>}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </TiltCard>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
} 