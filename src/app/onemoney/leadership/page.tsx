import React from "react";
import Image from "next/image";
import { TiltCard } from "../components/ui/tilt-card";
import { GridBackground } from "../components/ui/grid-background";
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
        A Krishna Prasad (alias “KP”), is an entrepreneur, founder of two ventures, active mentor for two
others. An engineer-MBA, Gold Medals in Economics and Finance, deep experience in the
domains of Finance, Operations and Technology, an abiding commitment to corporate governance.
Extensive experience in international business, negotiating and finalizing partnerships, JVs and
corporate development. The career summary and present activities are summarized below.
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
        Jagdish Capoor is a distinguished Indian banker with over four decades of experience, best known for serving as the Former Deputy Governor of the Reserve Bank of India (RBI) and holding leadership roles in several major financial institutions. His biggest accomplishments include serving as the Deputy Governor of the Reserve Bank of India for nearly four decades, where he played a pivotal role in shaping India’s banking sector during the country’s economic liberalization. After retiring from the RBI, he became Chairman of HDFC Bank and led its transformation into one of India’s largest private banks, strengthening its position in the financial industry. He also chaired the Bombay Stock Exchange and Deposit Insurance and Credit Guarantee Corporation of India, and held board positions at leading banks and financial institutions such as SBI, Bank of Baroda, NABARD, EXIM Bank, and LIC Housing Finance, demonstrating his wide-ranging influence and expertise in the financial sector.
        </p>
        <ul className="list-disc pl-5 space-y-2 prose prose-slate dark:prose-invert max-w-none">
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
        P.H. Ravikumar is renowned for being the founding CEO of NCDEX, India’s first national-level commodity exchange, where he played a pivotal role in conceptualizing and establishing a robust platform for agricultural commodities trading that transformed market practices in the sector. With over four decades of leadership in banking and finance, including senior roles at Bank of India and ICICI Bank, Ravikumar's vision and stewardship at NCDEX laid the foundation for transparent price discovery and risk management in commodity markets across India. He continues to shape the financial landscape as an advisor, board member, and chairperson in top institutions and has been recognized internationally for his expertise, including being the first Indian honorary fellow of the Chartered Institute for Securities & Investment, UK.
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
                    quality={80}
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