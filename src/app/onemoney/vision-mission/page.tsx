import React from "react";
import { TiltCard } from "../../onemoney/components/ui/tilt-card";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const visionContent = {
  title: "Our Vision",
  body: (
    <div className="space-y-6">
      <p>
        At OneMoney, we envision a financially inclusive India where every citizen — from metro cities to remote villages — has equal access to their financial data and the opportunities it unlocks.
      </p>
      <p>
        We believe financial data should be democratized, not gatekept. As India's premier Account Aggregator, we're breaking down the walls that have traditionally kept the underserved away from formal financial services. Every farmer, small business owner, gig worker, and first-time banking customer deserves the same data rights as corporations and the wealthy.
      </p>
      <p>
        Our mission extends far beyond technology — it's about financial justice. We're building bridges where banks built barriers, creating pathways where institutions created restrictions. Through secure, consent-driven data sharing, we're enabling millions of underserved Indians to access credit, insurance, investments, and financial planning tools that were previously out of reach.
      </p>
      <p>
        We stand for data sovereignty — your financial information belongs to you, works for you, and empowers you. Whether it's helping a street vendor access micro-credit, enabling a domestic worker to build a credit history, or allowing a rural entrepreneur to secure business loans, we're here to make financial inclusion a reality, not just a promise.
      </p>
      <p className="font-semibold text-[#00b140]">
        OneMoney — Democratizing Financial Data for a More Inclusive India.
      </p>
    </div>
  ),
};

const missionContent = {
  title: "Our Mission",
  body: (
    <div className="space-y-6">
      <p>
        <strong>Serve the Underserved:</strong> We prioritize reaching India's 190 million unbanked and underbanked citizens, providing them with tools to participate in the formal financial ecosystem.
      </p>
      <p>
        <strong>Democratic Data Access:</strong> We ensure that financial data flows benefit everyone — not just institutions. Every Indian should have control over their financial information and the ability to use it for economic advancement.
      </p>
      <p>
        <strong>Financial Inclusion Through Innovation:</strong> By leveraging the Account Aggregator framework, we're creating new pathways for credit assessment, risk evaluation, and financial product delivery that include rather than exclude.
      </p>
      <p>
        <strong>Trust-First Approach:</strong> We build with consent, transparency, and security at the core — ensuring that data empowerment never comes at the cost of privacy or safety.
      </p>
      <p>
        <strong>Bridging the Gap:</strong> We connect traditional financial institutions with alternative data sources and innovative fintech solutions to create products that truly serve India's diverse economic landscape.
      </p>
    </div>
  ),
};

// Gallery Component with Team Photo
const TeamGallery = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 md:my-12 p-4">
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${metallicBlackTextClasses}`}>
        Our Team
      </h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/team-pictures/onemoney-team.jpg" 
            alt="OneMoney team" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for better visual effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};


export default function VisionMissionPage() {
  return (
    <main className="relative w-full pb-12 md:pb-16 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>OneMoney's</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              Vision
            </span>{" "}
            <span className={metallicBlackTextClasses}>& Mission</span>
          </h1>
          <p className="text-center mt-4 text-md text-neutral-500 dark:text-neutral-400">
            Democratizing financial data access for every Indian through India's most inclusive Account Aggregator platform
          </p>
        </div>

        {/* Content Sections */}
        <div
          className="flex flex-col items-center gap-8 md:gap-12 max-w-7xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {/* Vision Section */}
          <TiltCard
            className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
          >
            <div className="relative z-20 text-foreground/90">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                {visionContent.title}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-md md:text-lg">
                {visionContent.body}
              </div>
            </div>
          </TiltCard>

          {/* Mission Section */}
          <TiltCard
            className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
          >
            <div className="relative z-20 text-foreground/90">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                {missionContent.title}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-md md:text-lg">
                {missionContent.body}
              </div>
            </div>
          </TiltCard>

          {/* Impact Section */}
          <TiltCard
            className="relative w-full rounded-lg border border-slate-200 bg-gradient-to-br from-[#00b140]/10 to-[#baff29]/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
          >
            <div className="relative z-20 text-foreground/90">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                Our Impact
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#00b140] mb-3">Financial Inclusion</h3>
                  <p className="text-md">
                    Enabling millions of underserved Indians to access formal financial services for the first time through secure data sharing and innovative credit assessment models.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#00b140] mb-3">Data Democracy</h3>
                  <p className="text-md">
                    Putting financial data control back in the hands of citizens, breaking institutional monopolies on financial information access.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#00b140] mb-3">Economic Empowerment</h3>
                  <p className="text-md">
                    Creating new economic opportunities for MSMEs, gig workers, and entrepreneurs through better access to credit and financial products.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#00b140] mb-3">Digital Trust</h3>
                  <p className="text-md">
                    Building India's most trusted Account Aggregator infrastructure with consent-first, privacy-preserving financial data sharing.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Team Gallery Section */}
          <TeamGallery />
        </div>
      </div>
    </main>
  );
} 