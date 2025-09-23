import React from "react";
import { AnimatedCounter } from "@/app/onemoney/components/ui/animated-counter";
import { GridBackground } from "@/app/onemoney/components/ui/grid-background";
import Marquee from "react-fast-marquee";

// Updated data based on the image
const statsData = [
  { id: "uptime", value: 99, label: "Uptime", prefix: "", suffix: "%" },
  { id: "users", value: 10, label: "Verified using Equal BGV", prefix: "", suffix: "L+" },
  { id: "companies", value: 50, label: "Top companies using Equal", prefix: "", suffix: "+" },
  { id: "IDs", value: 30, label: "Checks in Production", prefix: "", suffix: "+" },
];

// Define metallic text classes
const metallicTextClasses = "font-bold bg-gradient-to-b from-[#3cd070] to-[#00b140] bg-clip-text text-transparent";
// Updated neutral shades for darker metallic black effect
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

import { FileText, Link, CreditCard, Vote, Car, ShieldCheck, Share2, Scale, Globe, AlertTriangle, MapPin, Map, GraduationCap, Briefcase, Users, UserCheck, FileCheck, Fingerprint, Receipt, Building2, Heart, Database, User, CheckCircle, Home, Navigation, Stethoscope, IndianRupee } from "lucide-react";

const verificationTypesRow1 = [
  { name: "Aadhaar", icon: <Fingerprint className="w-6 h-6" /> },
  { name: "PAN Basic", icon: <FileText className="w-6 h-6" /> },
  { name: "PAN Advanced", icon: <CheckCircle className="w-6 h-6" /> },
  { name: "Bank Account Validation", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Voter ID", icon: <Vote className="w-6 h-6" /> },
  { name: "Driving License", icon: <Car className="w-6 h-6" /> },
  { name: "Vehicle RC", icon: <Receipt className="w-6 h-6" /> },
  { name: "ESIC", icon: <Heart className="w-6 h-6" /> },
  { name: "Social Media", icon: <Share2 className="w-6 h-6" /> },
  { name: "Criminal Court", icon: <Scale className="w-6 h-6" /> },
  { name: "Police Verification", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Global Database", icon: <Database className="w-6 h-6" /> },
  { name: "Payslip", icon: <IndianRupee className="w-6 h-6" /> },
  { name: "Bank Statement", icon: <CreditCard className="w-6 h-6" /> },
];

const verificationTypesRow2 = [
  { name: "Credit Check", icon: <CheckCircle className="w-6 h-6" /> },
  { name: "Credit Default Database", icon: <AlertTriangle className="w-6 h-6" /> },
  { name: "Permanent Address", icon: <Home className="w-6 h-6" /> },
  { name: "Current Address", icon: <MapPin className="w-6 h-6" /> },
  { name: "Digital Address", icon: <Navigation className="w-6 h-6" /> },
  { name: "Education", icon: <GraduationCap className="w-6 h-6" /> },
  { name: "Employment & Conduct", icon: <Briefcase className="w-6 h-6" /> },
  { name: "Self-Employment", icon: <Building2 className="w-6 h-6" /> },
  { name: "PF UAN Advanced", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "CV Validation", icon: <FileCheck className="w-6 h-6" /> },
  { name: "Directorship Check", icon: <Building2 className="w-6 h-6" /> },
  { name: "Right to Work", icon: <UserCheck className="w-6 h-6" /> },
  { name: "Professional Reference", icon: <User className="w-6 h-6" /> },
];

const VerificationCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="relative w-48 h-48 bg-background/10 backdrop-blur-md border border-[#00b140]/20 rounded-2xl p-4 mx-2 flex-shrink-0 shadow-md">
    <div className="absolute top-4 left-4">
      <div className="p-3 rounded-full bg-[#00b140] text-white">
        {icon}
      </div>
    </div>
    <div className="absolute bottom-4 left-2 px-2 text-left">
      <span className="text-md font-medium text-slate-800 leading-tight">{name}</span>
    </div>
  </div>
);

export function Stats({ showVerifyBanner = true }: { showVerifyBanner?: boolean } = {}) {
  return (
    <section className="relative w-full py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl">
            <span className={metallicBlackTextClasses}>India&apos;s Most</span>{" "}
            <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
              Comprehensive
            </span>{" "}
            <span className={metallicBlackTextClasses}>BGV Suite</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 justify-items-center mx-auto">
          {statsData.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-4 mx-auto">
              <div className="text-4xl md:text-5xl lg:text-[90px] mb-2">
                <span className={metallicTextClasses}>{stat.prefix}</span>
                <AnimatedCounter 
                  value={stat.value} 
                  className={metallicTextClasses}
                />
                <span className={metallicTextClasses}>{stat.suffix}</span>
              </div>
              <p className="text-md md:text-lg font-semibold text-slate-800 pt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div> {/* End of container div */}
      {showVerifyBanner && (
        <>
          {/* Container for the title and lines - remove horizontal padding to allow lines to span full width */} 
          <div className="w-full">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 mt-12 mb-8">
              <div className="flex-grow h-px bg-foreground/20"></div>
              <h2 className="text-sm md:text-base font-regular text-foreground/80 tracking-wider uppercase text-center flex-shrink">
                VERIFY EVERYTHING WITH EQUAL
              </h2>
              <div className="flex-grow h-px bg-foreground/20"></div>
            </div>
          </div>
          {/* Marquee Banners */}
          <div className="mt-8 space-y-4 w-full overflow-hidden">
            <Marquee gradient={false} speed={150} pauseOnHover={true} className="py-2">
              {[...verificationTypesRow1, ...verificationTypesRow1].map((type, index) => (
                <VerificationCard key={`row1-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
            <Marquee gradient={false} speed={150} pauseOnHover={true} direction="right" className="py-2">
              {[...verificationTypesRow2, ...verificationTypesRow2].map((type, index) => (
                <VerificationCard key={`row2-${index}`} name={type.name} icon={type.icon} />
              ))}
            </Marquee>
          </div>
        </>
      )}
    </section>
  );
} 