'use client';

import React, { useState, useRef, useEffect, Suspense } from "react";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MainHeader } from "@/components/global/MainHeader";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

interface TermsData {
  id: string;
  title: string;
  content: React.ReactNode;
}

const termsData: TermsData[] = [
  {
    id: "equal",
    title: "Equal",
    content: (
      <>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Equal Terms of Use
        </h3>
        
        <h4 className="text-lg font-semibold mt-6 mb-3">TERMS OF USE</h4>
        <p className="mb-4">
          This Terms of Use sets out how Equal Identity Private Limited (henceforth <strong>"Equal" "Company" "Our" "Us" "We"</strong>) provides its services through Equal's Products (<strong>"Products",</strong> <em>defined below</em>). By accessing or using any part of our Services on the Products, You agree to be bound by the Terms and Conditions and Privacy Policy (collectively, the <strong>"Policies"</strong>). The Policies are hereby incorporated into these Terms by reference as if set forth herein.
        </p>
        <p className="mb-4">
          These Terms of Use are subject to the Privacy Policy, which sets out the terms on which we process the data that we collect from you, or that you provide to us. By consenting to use our Products, you consent to such processing and you warrant that all the data as provided by You is true, accurate and up-to-date. These Terms set forth a legally binding contract between You and Us. By using our Products, you agree to be bound by these Terms together with the Privacy Policy. These Terms of Use stipulate on how you may use our Products. If you do not agree to these Terms, you must not use our Products.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">I. ABOUT US</h4>
        <p className="mb-4">
          "<strong>Equal Identity Private Limited,</strong>" a Company incorporated under Companies Act, 2013 provides Products namely "Equal ID Gateway", "Equal ID Wallet" and "Equal Connect" and services. Equal provides Products designed to deliver a seamless experience of managing and sharing IDs to its users. With "<strong>Equal ID Gateway,</strong>" users can securely share IDs with different businesses, enabling a hassle free verification process to the users and helps users at their option to store the same on <strong>"Equal Wallet",</strong> to avoid scattered storage of IDs enabling users to securely store and share the same with different businesses at their will and choice.
        </p>
        <p className="mb-4">
          With an aim to only make its users life easier, Equal provides to users "<strong>Equal Connect</strong>" that allows users to access multiple applications and services with a single set of login credentials by creating an "Equal Account". Instead of needing separate usernames and passwords for each application or service, users can sign-in once with their Equal Account and then seamlessly access a variety of integrated platforms without having to re-enter their credentials.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">II. DEFINITIONS</h4>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li><strong>"Company,"</strong> <strong>"Equal,"</strong> <strong>"Us,"</strong> <strong>"We,"</strong> and <strong>"Our,"</strong> means Equal Identity Private Limited and any other companies that are its subsidiaries and affiliates.</li>
          <li><strong>"Services,"</strong> means the services as detailed under "About us" and shall include any other service that the Company may provide in future.</li>
          <li><strong>"User,"</strong> <strong>"Customer"</strong>, <strong>"You,"</strong> and <strong>"Your/s,"</strong> means any natural person who has agreed to become a member/user of our Products by providing account information detailed under the Privacy Policy while registering on our Products.</li>
          <li><strong>"Products"</strong> means the Products as detailed under "About us" and shall include any other Products that the Company may provide in future.</li>
          <li><strong>"Businesses"</strong> means enterprise customers of Company, to whom Company provides verification services in the capacity of a Service Provider/Data Processor.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">III. TERMS OF USE</h4>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>
            <strong>Account Creation:</strong> You must be at least 18 years old to create an account and use our Products. By creating an account, you represent and warrant that you are of legal age to form a binding contract.
          </li>
          <li>
            <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </li>
          <li>
            <strong>Acceptable Use:</strong> You agree to use our Products only for lawful purposes and in accordance with these Terms. You shall not use our Products for any fraudulent, illegal, or unauthorized purpose.
          </li>
          <li>
            <strong>Data Accuracy:</strong> You warrant that all information provided to us is true, accurate, and up-to-date. You agree to promptly update any changes to your information.
          </li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">IV. INTELLECTUAL PROPERTY</h4>
        <p className="mb-4">
          All content, features, and functionality of our Products, including but not limited to text, graphics, logos, images, and software, are the exclusive property of Equal Identity Private Limited and are protected by copyright, trademark, and other intellectual property laws.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">V. LIMITATION OF LIABILITY</h4>
        <p className="mb-4">
          To the fullest extent permitted by law, Equal Identity Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">VI. TERMINATION</h4>
        <p className="mb-4">
          We may terminate or suspend your account and access to our Products at any time, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">VII. GOVERNING LAW</h4>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">VIII. CONTACT INFORMATION</h4>
        <p className="mb-4">
          For any questions about these Terms, please contact us at:
        </p>
        <p className="mb-2">
          <strong>Equal Identity Private Limited</strong><br />
          The Skyview, Sy. No. 83/1, 2nd Floor,<br />
          Skyview 10, Raidurg, Hyderabad<br />
          Email: support@equal.in
        </p>
      </>
    ),
  },
  {
    id: "onemoney",
    title: "OneMoney",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          OneMoney Terms of Use
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          This section will contain the terms of use for OneMoney services. Content to be added.
        </p>
      </div>
    ),
  },
  {
    id: "moneyone",
    title: "MoneyOne",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          MoneyOne Terms of Use
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          This section will contain the terms of use for MoneyOne services. Content to be added.
        </p>
      </div>
    ),
  },
];

// Move the useSearchParams logic into a child component
function TermsContent() {
  const searchParams = useSearchParams();
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  useEffect(() => {
    const company = searchParams.get('company');
    if (company && termsData.find(t => t.id === company)) {
      setSelectedCompany(company);
    } else {
      setSelectedCompany(termsData[0].id); // Default to first company
    }
  }, [searchParams]);

  const currentTerms = termsData.find(terms => terms.id === selectedCompany);

  if (!currentTerms) {
    return (
      <div className="text-center">
        <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className={metallicBlackTextClasses}>Terms Not Found</span>
        </h1>
        <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
          The requested terms could not be found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Breadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
      </div>
      {/* Page Title */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className={metallicBlackTextClasses}>{currentTerms.title} Terms & Conditions</span>
        </h1>
        <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
          Review our terms of service and user agreements.
        </p>
      </div>

      {/* Terms Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-background/20 dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-slate-200 dark:border-neutral-700 max-w-7xl mx-auto"
      >
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {currentTerms.content}
        </div>
      </motion.div>
    </>
  );
}

export default function TermsConditionsPage() {
  return (
    <>
      <MainHeader />
      <AuroraBackground className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <BackgroundGrid />
        <div className="container px-4 md:px-6 mx-auto z-10">
          <Suspense fallback={
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded mb-4 max-w-md mx-auto"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-8 max-w-lg mx-auto"></div>
                <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          }>
            <TermsContent />
          </Suspense>
        </div>
      </AuroraBackground>
    </>
  );
} 