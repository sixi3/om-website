import React from 'react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

interface UseCaseLayoutProps {
  id: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctas: { text: string; href: string; }[];
  whySection: { title: string; points: string[]; };
  capabilities: { feature: string; description: string; }[];
  platforms?: string[];
  dev?: string[];
  bottomCta: { text: string; button: string; href: string; };
}

export function UseCaseLayout({
  id,
  heroHeadline,
  heroSubheadline,
  ctas,
  whySection,
  capabilities,
  platforms,
  dev,
  bottomCta,
}: UseCaseLayoutProps) {
  return (
    <section id={id} className="w-full py-12 border-b border-slate-200 dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-6">
            <span className={metallicBlackTextClasses}>{heroHeadline}</span>
          </h2>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
            {heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctas.map((cta, idx) => (
              <GlowingButton key={idx} className={idx > 0 ? "bg-transparent border border-[#d2ff61] text-[#d2ff61] hover:bg-[#d2ff61]/10" : ""}>
                {cta.text}
              </GlowingButton>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">{whySection.title}</h3>
              <ul className="space-y-3">
                {whySection.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-1">✅</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            {platforms && (
              <div className="mt-6 p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Compatible Platforms</h3>
                <ul className="space-y-2">
                  {platforms.map((platform, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                       <span className="text-green-500">✅</span>
                      <span>{platform}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {dev && (
               <div className="mt-6 p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">For Developers</h3>
                <ul className="space-y-2">
                  {dev.map((item, idx) => (
                    <li key={idx} className="text-slate-700 dark:text-slate-300">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/10 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Key Capabilities</h3>
              <div className="grid grid-cols-1 gap-4">
                {capabilities.map((cap, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-slate-100 dark:bg-slate-900">
                    <div className="font-semibold text-slate-800 dark:text-white">{cap.feature}</div>
                    <p className="text-slate-600 dark:text-slate-300">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 text-center p-6 rounded-lg bg-background/10 backdrop-blur-md border border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">{bottomCta.text}</h3>
          <GlowingButton>
            {bottomCta.button} &rarr;
          </GlowingButton>
        </div>
      </div>
    </section>
  );
} 