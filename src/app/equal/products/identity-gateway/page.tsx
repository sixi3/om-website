'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UploadCloud, FileCheck, ShieldCheck, Link, Settings, CheckCircle, XCircle, FileText, GraduationCap, CreditCard, MapPin, UserCheck, Code, Webhook, Terminal, Car, Share2, Scale, Globe, AlertTriangle, Map, Briefcase, Building, Users, Vote } from 'lucide-react';
import { GlowingButton } from '@/app/onemoney/components/ui/glowing-button';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { GreenMetallicPhoneMockup } from '../../components/ui/GreenMetallicPhoneMockup';
import { AnimatedVerificationFlow } from '../../components/AnimatedVerificationFlow';
import { BentoGrid, BentoGridItem } from '@/app/onemoney/components/ui/bento-grid';
import Marquee from "react-fast-marquee";
import { UseCaseGrid } from '../../sections/UseCaseGrid';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import radarAnimation from '../../../../../public/radar.json';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="w-[800px] h-[800px] opacity-80" /> // Placeholder during loading
});

const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
const highlightBgClass = "inline-block bg-[#baff29] px-2 py-1 text-black font-bold ";

const problemSolutions = [
  {
    problem: "Collecting IDs via email, WhatsApp, Excel is error-prone and untrackable",
    solution: "Unified digital gateway with pre-built flows",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    problem: "Manual back-and-forth with candidates delays onboarding",
    solution: "Real-time document capture and status tracking",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    problem: "Inconsistent documents = low verification success rate",
    solution: "Built-in validations and auto-format checks",
    problemIcon: <XCircle className="w-5 h-5 text-red-500" />,
    solutionIcon: <CheckCircle className="w-5 h-5 text-green-500" />,
  }
];

const keyFeatures = [
  {
    title: "Multi-Channel Candidate Access",
    description: "Send links via WhatsApp, SMS, Email. Mobile-first UI for gig and field workers. No logins, no app installs.",
    icon: <Send className="w-6 h-6" />,
    image: "/Multi-channel candidate.png",
  },
  {
    title: "Real-Time Document Upload & Validation",
    description: "Accepts photos, scans, PDFs — intelligently validated. Front/back checks, selfie uploads, live video (optional). Smart reminders for incomplete uploads.",
    icon: <UploadCloud className="w-6 h-6" />,
    image: "/Real-Time Document Upload.png",
  },
  {
    title: "Smart Document Parsing",
    description: "OCR and AI parsing of Aadhaar, PAN, DL, Passport, Mark Sheets. Auto-verification where government APIs are available. Flagging of low-confidence entries for manual QA.",
    icon: <FileCheck className="w-6 h-6" />,
    image: "/Smart Document parsing.png",
  },
  {
    title: "Collect Now, Verify Later Mode",
    description: "Great for pre-offer hiring: gather data now, run checks only for final candidates. Saves verification cost until decision point.",
    icon: <FileText className="w-6 h-6" />,
    image: "/Collect Now, Verify Later.png",
  },
  {
    title: "Secure Consent Capture",
    description: "Digital signature with time-stamped logs. Optional check-level consent for regulated industries. Hosted on secure HTTPS with audit trails.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "/Secure Consent Capture.png",
  }
];

// First row of verification types
const verificationTypesRow1 = [
  { name: "Aadhaar", icon: <FileText className="w-6 h-6" /> },
  { name: "PAN Basic", icon: <FileText className="w-6 h-6" /> },
  { name: "PAN Advanced", icon: <Link className="w-6 h-6" /> },
  { name: "Bank Account Validation", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Voter ID", icon: <Vote className="w-6 h-6" /> },
  { name: "Driving License", icon: <Car className="w-6 h-6" /> },
  { name: "Vehicle RC", icon: <Car className="w-6 h-6" /> },
  { name: "ESIC", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Social Media", icon: <Share2 className="w-6 h-6" /> },
  { name: "Criminal Court", icon: <Scale className="w-6 h-6" /> },
  { name: "Police Verification", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Global Database", icon: <Globe className="w-6 h-6" /> },
  { name: "Payslip", icon: <FileText className="w-6 h-6" /> },
  { name: "Bank Statement", icon: <CreditCard className="w-6 h-6" /> },
];

// Second row of verification types
const verificationTypesRow2 = [
  { name: "Credit Check", icon: <CreditCard className="w-6 h-6" /> },
  { name: "Credit Default Database", icon: <AlertTriangle className="w-6 h-6" /> },
  { name: "Permanent Address", icon: <MapPin className="w-6 h-6" /> },
  { name: "Current Address", icon: <MapPin className="w-6 h-6" /> },
  { name: "Digital Address", icon: <Map className="w-6 h-6" /> },
  { name: "Education", icon: <GraduationCap className="w-6 h-6" /> },
  { name: "Employment & Conduct", icon: <Briefcase className="w-6 h-6" /> },
  { name: "Self-Employment", icon: <Building className="w-6 h-6" /> },
  { name: "PF UAN Advanced", icon: <FileText className="w-6 h-6" /> },
  { name: "CV Validation", icon: <FileCheck className="w-6 h-6" /> },
  { name: "Directorship Check", icon: <Users className="w-6 h-6" /> },
  { name: "Right to Work", icon: <UserCheck className="w-6 h-6" /> },
  { name: "Professional Reference", icon: <Users className="w-6 h-6" /> },
];

const verificationOptions = [
  {
    category: "ID Proof",
    checks: ["Aadhaar", "PAN", "Passport", "DL"],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    category: "Employment",
    checks: ["Payslips", "UAN", "Offer Letter", "Relieving Letter"],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    category: "Education",
    checks: ["Provisional", "Degree Certificate", "Consolidated Marksheet"],
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    category: "Financial",
    checks: ["Bank Statement", "ITR", "CIBIL Report"],
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    category: "Address",
    checks: ["Utility Bill", "Rent Agreement", "GPS check"],
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    category: "Face Match",
    checks: ["Photo ID vs selfie live capture"],
    icon: <UserCheck className="w-6 h-6" />,
  }
];

const integrationOptions = [
  {
    title: "Hosted Page",
    description: "Zero code, white-labeled solution ready to use",
    icon: <Link className="w-6 h-6" />,
    image: "/Hosted Page.png",
  },
  {
    title: "HR Portal Embed",
    description: "Seamlessly embed in your existing HR portal",
    icon: <Settings className="w-6 h-6" />,
    image: "/HRMS Integration.png",
  },
  {
    title: "API Integration",
    description: "REST API to trigger gateway & receive updates",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Webhook Support",
    description: "Real-time status updates via webhooks",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Support.png",
  }
];

const useCases = [
  "Gig onboarding: Send WhatsApp-based identity gateway to drivers/riders",
  "Enterprise hiring: Collect pre-offer documents before confirmation",
  "Staffing agencies: Create client-specific data flows",
  "BFSI roles: Capture multi-point ID + regulatory proof in one shot"
];

const developerFeatures = [
  {
    title: "REST API Integration",
    description: "Trigger gateway & receive real-time updates via comprehensive REST API endpoints",
    icon: <Code className="w-6 h-6" />,
    image: "/API Integration.png",
  },
  {
    title: "Webhook Notifications", 
    description: "Push notifications on document upload or verification status changes",
    icon: <Webhook className="w-6 h-6" />,
    image: "/Webhook Notification.png",
  },
  {
    title: "Field-Level Configuration",
    description: "Granular control and customization for each verification check",
    icon: <Settings className="w-6 h-6" />,
    image: "/Field-level Config.png",
  },
  {
    title: "JavaScript SDK",
    description: "Ready-to-use SDK and hosted environments for rapid development",
    icon: <Terminal className="w-6 h-6" />,
    image: "/JavaScript SDK.png",
  }
];

// Verification Card Component
const   VerificationCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="relative w-48 h-48 bg-background/10 backdrop-blur-md border border-[#00b140]/20 rounded-2xl p-4 mx-4 flex-shrink-0 shadow-md">
    <div className="absolute top-4 left-4">
      <div className="p-3 rounded-full bg-[#00b140] text-white">
        {icon}
      </div>
    </div>
    <div className="absolute bottom-4 right-4 px-2 text-right">
      <span className="text-md font-medium text-slate-800 leading-tight">{name}</span>
    </div>
  </div>
);

// Animated Verification Circle Component
const AnimatedVerificationCircle = ({ 
  icon, 
  name, 
  position, 
  delay, 
  isVisible 
}: { 
  icon: React.ReactNode; 
  name: string; 
  position: { x: number; y: number }; 
  delay: number;
  isVisible: boolean;
}) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ 
          scale: 0.3, 
          opacity: 0, 
          y: -30,
          transition: { 
            duration: 1.2,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.1
          }
        }}
        transition={{ 
          delay,
          duration: 0.6,
          type: "spring",
          stiffness: 180,
          damping: 18
        }}
        className="absolute z-40"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Polaroid Container */}
        <div className="relative bg-background/10 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 p-1 w-20 h-24">
          {/* Pastel Green Rectangle for Icon */}
          <div className="w-full h-12 bg-green-200 rounded-md flex items-center justify-center mb-2">
            <div className="text-green-700 text-lg">
              {icon}
            </div>
          </div>
          
          {/* Name Below Icon */}
          <div className="text-center">
            <span className="text-[10px] font-medium text-slate-700 leading-tight block">
              {name}
            </span>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Radar Verification Display Component
const RadarVerificationDisplay = () => {
  const [currentWave, setCurrentWave] = useState(0);
  const [usedPositions, setUsedPositions] = useState<Set<string>>(new Set());
  const [currentPositions, setCurrentPositions] = useState<Array<{x: number, y: number}>>([]);
  
  // Combine all verification types
  const allVerifications = [...verificationTypesRow1, ...verificationTypesRow2];

  // Define sectors around the phone mockup for even distribution
  const generateSectorPositions = (currentUsed: Set<string>, existingPositions: Array<{x: number, y: number}> = []) => {
    // Define sectors well clear of the phone mockup center (avoiding 30-70% center area)
    // Constrained to stay within hero container bounds with very safe margins
    const leftSectors = [
      { name: 'top-left', xRange: [15, 28], yRange: [12, 28] },
      { name: 'left', xRange: [8, 25], yRange: [40, 60] },
      { name: 'bottom-left', xRange: [15, 28], yRange: [72, 88] }
    ];

    const rightSectors = [
      { name: 'top-right', xRange: [72, 85], yRange: [12, 28] },
      { name: 'right', xRange: [75, 92], yRange: [40, 60] },
      { name: 'bottom-right', xRange: [72, 85], yRange: [72, 88] }
    ];

    // Ensure balanced distribution: 3 from left, 3 from right (6 total)
    const shuffledLeft = [...leftSectors].sort(() => Math.random() - 0.5);
    const shuffledRight = [...rightSectors].sort(() => Math.random() - 0.5);
    const shuffledSectors = [...shuffledLeft, ...shuffledRight].sort(() => Math.random() - 0.5);
    
    const generatePositionInSector = (sector: typeof leftSectors[0], attempts: number = 0): {position: {x: number, y: number}, positionKey: string} => {
      if (attempts > 30) {
        // Fallback to any position in sector
        const x = sector.xRange[0] + Math.random() * (sector.xRange[1] - sector.xRange[0]);
        const y = sector.yRange[0] + Math.random() * (sector.yRange[1] - sector.yRange[0]);
        return {
          position: { x: Math.round(x), y: Math.round(y) },
          positionKey: `fallback-${sector.name}-${Math.random()}`
        };
      }

      const x = sector.xRange[0] + Math.random() * (sector.xRange[1] - sector.xRange[0]);
      const y = sector.yRange[0] + Math.random() * (sector.yRange[1] - sector.yRange[0]);
      const position = { x: Math.round(x), y: Math.round(y) };
      
      // Check minimum distance from existing positions in current wave
      const minDistance = 45; // Further increased minimum distance between circles
      const tooClose = existingPositions.some(existing => {
        const distance = Math.sqrt(Math.pow(position.x - existing.x, 2) + Math.pow(position.y - existing.y, 2));
        return distance < minDistance;
      });

      // Additional check: ensure no overlap with phone mockup area (much larger buffer)
      const phoneX = 50, phoneY = 50;
      const phoneDistance = Math.sqrt(Math.pow(position.x - phoneX, 2) + Math.pow(position.y - phoneY, 2));
      const phoneTooClose = phoneDistance < 40; // Much larger phone buffer

      // Extra safety: ensure circles stay within their designated sectors and don't cross into center
      const centerTooClose = (position.x > 30 && position.x < 70) && (position.y > 30 && position.y < 70);

      if (tooClose || phoneTooClose || centerTooClose) {
        return generatePositionInSector(sector, attempts + 1);
      }

      // Check if this position has been used recently
      const positionKey = `${Math.floor(position.x / 8) * 8}-${Math.floor(position.y / 8) * 8}`;
      if (currentUsed.has(positionKey)) {
        return generatePositionInSector(sector, attempts + 1);
      }

      return { position, positionKey };
    };

    return shuffledSectors.map(sector => generatePositionInSector(sector));
  };

  // Generate positions when wave changes
  useEffect(() => {
    const itemsPerWave = 6;
    let updatedUsedPositions = new Set(usedPositions);

    // Clear used positions if we've used too many
    if (updatedUsedPositions.size > 24) {
      updatedUsedPositions = new Set();
    }

    // Generate evenly distributed positions
    const sectorResults = generateSectorPositions(updatedUsedPositions);
    const newPositions = sectorResults.map(result => result.position);
    
    // Update used positions
    sectorResults.forEach(result => {
      updatedUsedPositions.add(result.positionKey);
    });

    setCurrentPositions(newPositions);
    setUsedPositions(updatedUsedPositions);
  }, [currentWave]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWave(prev => (prev + 1) % 8); // 8 waves to cycle through more positions
    }, 4000); // Increased interval to 4 seconds for smoother transitions
    
    return () => clearInterval(interval);
  }, []);

  const getVisibleVerifications = () => {
    const itemsPerWave = 6; // Show 6 circles at a time
    const startIndex = (currentWave * itemsPerWave) % allVerifications.length;
    
    return Array.from({ length: itemsPerWave }, (_, index) => {
      const verificationIndex = (startIndex + index) % allVerifications.length;
      return {
        ...allVerifications[verificationIndex],
        position: currentPositions[index] || { x: 20, y: 20 },
        delay: index * 0.3, // Slightly longer delay between appearances
        isVisible: true
      };
    });
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {getVisibleVerifications().map((verification, index) => (
        <AnimatedVerificationCircle
          key={`${currentWave}-${index}`}
          icon={verification.icon}
          name={verification.name}
          position={verification.position}
          delay={verification.delay}
          isVisible={verification.isVisible}
        />
      ))}
    </div>
  );
};

// Horizontal Point List Component
const HorizontalPointList = ({ items, textColor, enableMarquee = false }: { items: (string | undefined)[], textColor: string, enableMarquee?: boolean }) => {
    const validItems = items.filter(Boolean);
    if (validItems.length === 0) return null;

    const content = validItems.map((point, idx) => (
        <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{point}</span>
            {idx < validItems.length - 1 && <span className="text-white mx-2">&bull;</span>}
        </React.Fragment>
    ));

    if (enableMarquee) {
        return (
            <div className="w-full overflow-hidden">
                <Marquee gradient={false} speed={30} pauseOnHover={true}>
                    <div className={`flex items-center gap-x-4 text-sm font-medium text-[16px] ${textColor} mr-8`}>
                        {content}
                        <span className="text-white mx-2">&bull;</span>
                    </div>
                </Marquee>
            </div>
        );
    }

    return (
        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-[16px] ${textColor}`}>
            {content}
        </div>
    );
};

// Developer features data structure updated above

export default function IdentityGatewayPage() {
  const [activeTab, setActiveTab] = useState<string>("integration");

  // Tab data
  const tabsData = [
    { id: "integration", title: "Integration Modes" },
    { id: "developer", title: "Developer Features" }
  ];

  // With/Without Equal data
  const withoutEqual = [
    "Collecting IDs via email, WhatsApp, Excel is error-prone and untrackable",
    "Manual back-and-forth with candidates delays onboarding", 
    "Inconsistent documents = low verification success rate",
    "No audit trail or compliance documentation for regulatory requirements",
    "High operational costs due to manual verification processes",
    "Candidate dropoff due to complex multi-step document submission"
  ];

  const withEqual = [
    "Unified digital gateway with pre-built flows",
    "Real-time document capture and status tracking",
    "Built-in validations and auto-format checks",
    "Complete audit trails and compliance-ready documentation",
    "Automated verification reduces operational costs by 70%",
    "Seamless mobile-first experience increases completion rates"
  ];

  return (
    <div className="relative">
      <GridBackground />
      
      {/* Hero Section */}
      <section className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-12 pb-12 lg:min-h-[700px] overflow-hidden">
        <div className="container mx-auto px-6 md:px-6 lg:px-8">
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center pl-1 pr-3 py-1 text-md font-semibold text-slate-800 mb-4 space-x-2 mx-auto lg:mx-0">
                <Image
                  src="/icons8-medal-94.png"
                  alt="Medal icon"
                  width={24}
                  height={24}
                />
                <span>India&apos;s Only Smart Identity Gateway</span>
              </span>
              <h1 className="text-3xl tracking-tight leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-6xl">
                <span className={metallicBlackTextClasses}>One Gateway to</span>
                <span className="inline-block bg-[#baff29] px-2 text-primary font-bold">
                  Verify Identities
                </span>
                <br />
                <span className={metallicBlackTextClasses}>— Instantly</span>
              </h1>
              <p className="font-medium text-lg sm:text-md text-slate-600 dark:text-slate-300 mb-4">
                 Equal's Identity Verification Gateway (IDG) is your digital front door for onboarding. 
                 Collect, verify, and confirm identity documents from any user in real-time — no coding, no chasing.
               </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <GlowingButton>
                Try Gateway Demo
              </GlowingButton>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex relative w-full h-full items-center justify-center -ml-16">
          {/* Radar Animation Background */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <Lottie
              animationData={radarAnimation}
              loop={true}
              autoplay={true}
              style={{
                width: '800px',
                height: '800px',
                opacity: 0.8
              }}
            />
          </div>
          
          {/* Animated Verification Circles */}
          <div className="absolute inset-0 z-5">
            <RadarVerificationDisplay />
          </div>
          
          {/* Phone Mockup */}
          <div className="relative z-30">
            <GreenMetallicPhoneMockup>
              <AnimatedVerificationFlow />
            </GreenMetallicPhoneMockup>
          </div>
        </div>
      </section>

        <section className="relative w-full py-12 md:py-20">
         <div className="container px-4 md:px-6 mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
               <span className={metallicBlackTextClasses}>Transform Your</span>{" "}
               <span className={highlightBgClass}>HR Onboarding</span>{" "}
               <span className={metallicBlackTextClasses}>Process</span>
             </h2>
             <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
               Equal's Identity Gateway automates document collection and verification, reducing onboarding time from weeks to hours while ensuring compliance.
             </p>
           </div>
                     <div className="space-y-6">
             {/* First Row - 2 Cards */}
             <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
               {keyFeatures.slice(0, 2).map((feature, index) => (
                 <BentoGridItem
                   key={index}
                   className="shadow-sm"
                   icon={
                     <div className="p-3 rounded-lg bg-[#00b140] text-white  inline-block mb-2">
                       {feature.icon}
                     </div>
                   }
                   title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{feature.title}</span>}
                   description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                   image={{
                     src: feature.image,
                     alt: feature.title
                   }}
                   imagePosition="top-right"
                   imageSize="w-40 h-40 -top-10 -right-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-40 xl:h-40 xl:-top-10 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                   
                 />
               ))}
             </BentoGrid>
             
             {/* Second Row - 3 Cards */}
             <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
               {keyFeatures.slice(2, 5).map((feature, index) => (
                 <BentoGridItem
                   key={index + 2}
                   className="shadow-sm"
                   icon={
                     <div className="p-3 rounded-xl bg-[#00b140] text-white inline-block mb-2">
                       {feature.icon}
                     </div>
                   }
                   title={<span className="text-xl font-bold text-slate-900 dark:text-slate-100">{feature.title}</span>}
                   description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                   image={{
                     src: feature.image,
                     alt: feature.title
                   }}
                   imagePosition="top-right"
                   imageSize="w-40 h-40 -top-10 -right-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-40 xl:h-40 xl:-top-10 xl:-right-10 2xl:w-48 2xl:h-48 2xl:-top-15 2xl:-right-10"
                 />
               ))}
             </BentoGrid>
           </div>
           
        </div>
      </section>

      {/* Before and After Banners - Edge to Edge */}
      <section className="relative w-full">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden bg-linear-to-r from-[#ce4257] to-[#720026] dark:bg-red-500/10 pt-2 pb-4 text-center">
            <h3 className="text-lg font-medium tracking-widest text-white uppercase mb-4 mt-2">WITHOUT EQUAL</h3>
            <HorizontalPointList items={withoutEqual} textColor="text-white" enableMarquee={true} />
            <Image 
              src="/thumbs-up.png"
              alt="Thumbs Down"
              width={100}
              height={100}
              className="absolute -top-2 -right-4 rotate-180 opacity-70"
            />
          </div>
                     <div className="relative overflow-hidden bg-linear-to-l from-[#40916c] to-[#2d6a4f] dark:bg-green-500/10 pt-2 pb-4 text-center">
             <h3 className="text-lg font-medium tracking-wider text-white uppercase mb-4 mt-2">WITH EQUAL</h3>
             <HorizontalPointList items={withEqual} textColor="text-white" enableMarquee={true} />
            <Image 
              src="/thumbs-up.png"
              alt="Thumbs Up"
              width={100}
              height={100}
              className="absolute -bottom-2 -left-4 opacity-70"
            />
          </div>
        </div>
      </section>

      {/* World of IDs Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Equal's</span>{" "}
              <span className={highlightBgClass}>World</span>{" "}
              <span className={metallicBlackTextClasses}>of IDs</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-6xl md:text-lg">
              Equal's Identity Gateway automates document collection and verification, reducing onboarding time from weeks to hours while ensuring compliance.
            </p>
          </div>
        </div>

        {/* First Marquee - Full Width */}
        <div className="mb-0 md:mb-2 -mx-16 md:mx-0">
          <Marquee gradient={false} speed={80} pauseOnHover={true} className="py-2 scale-75 md:scale-100">
            {[...verificationTypesRow1, ...verificationTypesRow1].map((type, index) => (
              <VerificationCard key={`row1-${index}`} name={type.name} icon={type.icon} />
            ))}
          </Marquee>
        </div>

        {/* Second Marquee - Full Width - Reverse Direction */}
        <div className="md:py-4 -mx-16 md:mx-0">
          <Marquee gradient={false} speed={80} pauseOnHover={true} direction="right" className="py-2 scale-75 md:scale-100">
            {[...verificationTypesRow2, ...verificationTypesRow2].map((type, index) => (
              <VerificationCard key={`row2-${index}`} name={type.name} icon={type.icon} />
            ))}
          </Marquee>
        </div>
      </section>

      {/* Use Cases Section */}
      <UseCaseGrid />

      {/* Integration & Developer Features Tabbed Section */}
      <section className="relative w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-5xl mb-4">
              <span className={metallicBlackTextClasses}>Build & Deploy with</span>{" "}
              <span className={highlightBgClass}>Equal</span>
            </h2>
            <p className="mx-auto text-md text-slate-700 dark:text-slate-300 max-w-4xl md:text-lg">
              Choose from multiple integration modes and leverage powerful developer tools to implement Equal's Identity Gateway in your workflow.
            </p>
          </div>

          {/* Tab Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 p-2 rounded-full border border-[#00b140]/30 bg-linear-to-br from-background/50 to-[#baff29]/20 backdrop-blur-md shadow-sm">
              {tabsData.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 text-sm sm:text-base font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-integration-tab"
                      className="absolute inset-0 bg-[#00b140] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="w-full mx-auto border border-[#00b140]/30 bg-linear-to-br from-background/90 to-[#baff29]/20 backdrop-blur-lg rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
            {activeTab === "integration" ? (
              <>
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                      <span className={metallicBlackTextClasses}>Multiple Ways to Integrate</span>
                    </h3>
                    <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-7xl">
                      From zero-code solutions to full API integration, choose the method that best fits your technical requirements.
                    </p>
                  </div>
                  
                  <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4 shadow-none">
                    {integrationOptions.map((option, index) => (
                      <BentoGridItem
                        key={index}
                        className="shadow-sm"
                        icon={
                          <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                            {option.icon}
                          </div>
                        }
                        title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{option.title}</span>}
                        description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{option.description}</span>}
                        image={{
                          src: option.image,
                          alt: option.title
                        }}
                        imagePosition="top-right"
                        imageSize="w-40 h-40 -top-10 -right-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-40 xl:h-40 xl:-top-10 xl:-right-10 2xl:w-64 2xl:h-64 2xl:-top-5 2xl:-right-10"
                      />
                    ))}
                  </BentoGrid>
                </div>
                
                {/* Integration Architecture Visual */}
                <div className="hidden md:block overflow-hidden h-100 relative mt-8">
                <div className="mt-8 text-center">
                  <Image
                    src="/Aggregator of Aggregators.png"
                    alt="Integration Architecture Diagram"
                    width={600}
                    height={600}
                    className="mx-auto"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none"></div>
                </div>
              </>
            ) : (
              <>
                <div className="px-8 pt-8 pb-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl tracking-tight leading-tight sm:text-3xl md:text-4xl mb-4">
                      <span className={metallicBlackTextClasses}>Developer-First Platform</span>
                    </h3>
                    <p className="mx-auto text-base text-slate-700 dark:text-slate-300 max-w-5xl mb-8">
                      Built with developers in mind, Equal provides comprehensive APIs, SDKs, and tools for seamless integration.
                    </p>
                  </div>
                  
                  {/* Developer Features Grid */}
                  <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
                    {developerFeatures.map((feature, index) => (
                      <BentoGridItem
                        key={index}
                        className="shadow-sm"
                        icon={
                          <div className="p-3 rounded-lg bg-[#00b140] text-white inline-block mb-2">
                            {feature.icon}
                          </div>
                        }
                        title={<span className="text-xl font-bold text-slate-800 dark:text-slate-100">{feature.title}</span>}
                        description={<span className="text-[16px] text-slate-600 dark:text-slate-100">{feature.description}</span>}
                        image={{
                          src: feature.image,
                          alt: feature.title
                        }}
                        imagePosition="top-right"
                        imageSize="w-40 h-40 -top-10 -right-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-40 xl:h-40 xl:-top-10 xl:-right-10 2xl:w-64 2xl:h-64 2xl:-top-20 2xl:-right-15"
                      />
                    ))}
                  </BentoGrid>
                </div>
                
                {/* Developer Code Example - Edge to Edge */}
                <div className="hidden md:block overflow-hidden h-100 relative mt-8">
                <div className="mt-8 text-center">
                  <Image
                    src="/dev-image.png"
                    alt="Developer API Code Example"
                    width={1200}
                    height={1200}
                    className="mx-auto"
                  />
                </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none"></div>
                </div>
              </>
            )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
} 