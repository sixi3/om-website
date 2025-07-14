'use client';

import React, { useState, useRef } from "react";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MainHeader } from "@/components/global/MainHeader";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

interface TermsTabData {
  id: string;
  title: string;
  content: React.ReactNode;
}

const termsTabsData: TermsTabData[] = [
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
          <li><strong>"Data Partners"</strong> means such entities from whom we receive data related to you based on the consent that you give us to fetch data from them.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">III. TERMS OF ACCEPTANCE</h4>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>To accept these Terms and Conditions, You must be at least 18 (eighteen) years of age. In the event that You are below 18 (eighteen) years of age or such other older legal age, Your guardian must read and understand and accept the provisions on Your behalf.</li>
          <li>To use Our Products You will have to register with us by creating an account. When you create your account you provide Us with current, complete and accurate information as prompted by Our account creation process.</li>
          <li>If You provide any information that is untrue, inaccurate or incomplete, We have reasonable grounds to suspect that such information is untrue, inaccurate or incomplete and We shall reserve the right to suspend or terminate Your account and refuse any and all current or future use of our Products at any time.</li>
          <li>To access Your account on the Products, You will be asked to log in with Your phone number, to establish a unique identity of You.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">IV. USE OF THE PLATFORM AND OUR SERVICES</h4>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Equal provides seamless Product for managing your IDs and eliminates the need for physical documents and streamlines identity verification processes, ensuring convenience to you by saving your time.</li>
          <li>Equal provides support to all types of IDs and enables you to have control over the same thereby providing you easy access to essential services and other services provided by Businesses spanning across diverse sectors.</li>
          <li>Equal also partners with approved data partners with respect to your identity such as Digilocker and other third party vendors and fetches your data from them with your consent to enable authentic and fraud-free verification of your identity.</li>
          <li>We do not guarantee that your use of the Product will always be available or uninterrupted. We may suspend, withdraw, discontinue or change all or any part of the Product by providing you notice of the same. We will not be liable to you including without limitation for any losses incurred if for any reason the Product is unavailable at any time or for any period.</li>
        </ol>
        <p className="mb-4">
          In order to access our services without interruption you agree that You are responsible for ensuring that You have access to internet connection that supports your usage of our Product.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">V. USAGE AND TERMINATION OF ACCOUNT</h4>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>These Terms and Conditions shall remain in full force and effect for so long as You use our Products. You may delete Your account at any time, for any reason, by clicking on "Manage IDs" on our Equal ID Wallet product.</li>
          <li>The Company reserves the right to terminate your use of our Products without prior notice, if the Company believes that You have breached any of these Terms, the Privacy Policy, or any false or misleading information, or interfered with use of the Product by others.</li>
          <li>The Company reserves the right to cancel, delete or deactivate Your Account, if it believes the same has been compromised, or is being used fraudulently.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">VI. SAFETY AND SECURITY</h4>
        <p className="mb-4">
          By accepting these terms you agree that our Products and the software embodied within our Products may include security components that permit digital materials to be protected, and that use of these materials is subject to usage rules set by the Company, the same shall at all times be subject to the Privacy Policy of Equal. You may not attempt to override, disable, circumvent or otherwise interfere with any such security components and usage rules embedded into our Products. Any attempt to override, disable, circumvent or otherwise interfere with any such security components will lead to termination or suspension of your account without any prior notice.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">VII. PROHIBITED CONDUCT ON EQUAL</h4>
        <p className="mb-4">
          By accepting the Terms of Use you agree and understand that You shall in all circumstances not use the Products in order to host, display, upload, modify, publish, transmit, update, distribute, share, store or destroy material:
        </p>
        <ol className="list-decimal pl-5 mb-4 space-y-1">
          <li>in violation of any applicable law or regulation;</li>
          <li>in a manner that will infringe the copyright, trademark, trade secret or other intellectual property or proprietary rights;</li>
          <li>that belongs to another person and to which you do not have any right to.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">VIII. WARRANTIES AND LIABILITIES</h4>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Equal at its true best is taking measurements to protect its systems from unwanted viruses, malware or other harmful content. However, the Company does not warrant that its Product, information, content or services are free of viruses, malware, or other harmful components.</li>
          <li>The Company shall not be liable for any unanticipated or unscheduled down time of all or a portion of the services provided to the Users.</li>
          <li>By accepting these terms, you agree and acknowledge that the Company is only an 'intermediary,' and is not liable and shall not be responsible for theft, security breach, or any other illegal activity that occurs while you share your information with Businesses, or for the information that is stored on the Products of the Businesses and shall not be held responsible for. The remedy for the user of any such activities lies with the law enforcement agencies or other appropriate forums as per the law.</li>
          <li>All warranties including without limitation, the implied warranties of merchantability, fitness for a particular purpose, for the title and non-infringement are disclaimed and excluded.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">IX. INDEMNITY</h4>
        <p className="mb-4">
          By accepting to the Terms of Use You agree to defend, indemnify and hold harmless the Company, and its subcontractors, officers, directors, employees, consultants, representatives and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or expenses (including but not limited to attorneys' fees and costs) arising directly from:
        </p>
        <ol className="list-decimal pl-5 mb-4 space-y-1">
          <li>Your use of and access of our Product;</li>
          <li>Your violation of any Terms of Use and the Privacy Policy contained herein;</li>
          <li>Your violation of any third party right, including without limitation any copyright, property, or privacy right. Provided however the same are not on account of fraud, misrepresentation or negligence of Equal or its employees.</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">X. CHANGES TO THE TERMS AND CONDITIONS</h4>
        <p className="mb-4">
          We enable you to avail our services based on the consent you expressly grant at the time of registration. In case we change our Terms of Use which further changes the way we process your information and the manner in which our services are provided or there is substantial revision of your rights and obligations arising under the Terms of Use, we will notify and give you an opportunity to review the revised Terms of Use before you choose to proceed with our services.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">XI. INTELLECTUAL PROPERTY, SOFTWARE AND CONTENT</h4>
        <p className="mb-4">
          All of the Intellectual Property, Software and content has been made available to you on or through this Product remains the property of Equal and are protected by copyright laws and treaties around the world. All such rights are reserved by Equal. You are not permitted to publish, manipulate, distribute or otherwise reproduce, in any format, any of the content or copies of the content supplied to you or which appears on our Products.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">XII. COMPLAINTS</h4>
        <p className="mb-4">
          We are confident that you will be satisfied with our Products. However, you can drop us an email at customersupport@equal.in for any queries related to our Products.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">XIII. GOVERNING LAW AND JURISDICTION</h4>
        <p className="mb-4">
          These terms and conditions are to be construed in accordance with the laws of India and in the event of any dispute or claim associated with these terms and conditions, that dispute or claim shall be subject to the exclusive jurisdiction of the Indian courts.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">XIV. GRIEVANCE REDRESSAL</h4>
        <p className="mb-4">
          We have a dedicated team at your service to redress any grievances that you may have in relation to the Data Policy or this Terms of Use. In order to reach out to us, please write to grievance@equal.in
        </p>
        <p className="mb-2">
          <strong>Krishna Pallavi</strong><br />
          <strong>Grievance Officer</strong><br />
          Equal Identity Private Limited<br />
          The Skyview, Sy. No. 83/1, 2nd Floor,<br />
          Skyview 10, Raidurg, Hyderabad,<br />
          Telangana - 500081
        </p>
        <p className="mb-4">
          Please note that Equal's Grievance redressal addresses only the issues related to the way we process and manage your data on our Product and the manner in which we provide our services to you and in no way, can address the issues that you may have with Businesses.
        </p>
      </>
    ),
  },
  {
    id: "onemoney",
    title: "OneMoney",
    content: (
      <>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          OneMoney Terms of Use
        </h3>
        <p className="mb-4">
          <strong>Effective Date: [To be updated]</strong>
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          This section will contain the terms of use for OneMoney services. Content to be added based on specific requirements and regulatory compliance for Account Aggregator services.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg mt-6">
          <h4 className="text-lg font-semibold mb-3">Key Areas to Cover:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Account Aggregator service terms</li>
            <li>Data consent and sharing mechanisms</li>
            <li>Financial data handling policies</li>
            <li>Regulatory compliance (RBI guidelines)</li>
            <li>User responsibilities and obligations</li>
            <li>Service availability and limitations</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "moneyone",
    title: "MoneyOne",
    content: (
      <>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          MoneyOne Terms of Use
        </h3>
        <p className="mb-4">
          <strong>Effective Date: [To be updated]</strong>
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          This section will contain the terms of use for MoneyOne services. Content to be added based on specific financial management and advisory service requirements.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg mt-6">
          <h4 className="text-lg font-semibold mb-3">Key Areas to Cover:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Financial management service terms</li>
            <li>Investment advice disclaimers</li>
            <li>Data usage and privacy</li>
            <li>Service fees and billing</li>
            <li>User account management</li>
            <li>Risk disclosures</li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function TermsConditionsPage() {
  const [activeTab, setActiveTab] = useState<string>(termsTabsData[0].id);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const currentTabContent = termsTabsData.find(tab => tab.id === activeTab);

  return (
    <>
      <MainHeader />
      <AuroraBackground className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <BackgroundGrid />
        <div className="container px-4 md:px-6 mx-auto z-10">
          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className={metallicBlackTextClasses}>Terms & Conditions</span>
            </h1>
            <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
              Review our terms of use, service agreements, and user responsibilities.
            </p>
          </div>

          {/* Tab Buttons Container */}
          <div className="flex items-center justify-center pt-2 px-4 mb-8">
            <div className="flex items-center gap-4 p-2 rounded-full border-b-4 border border-slate-200 bg-linear-to-br from-white to-slate-100 backdrop-blur-md shadow-sm">
              {termsTabsData.map((tab, index) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-8 py-4 text-md font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "text-white font-semibold"
                      : "bg-transparent text-slate-800 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-terms-tab"
                      className="absolute inset-0 bg-[#00b140] border-b-4 border-[#008000] rounded-full shadow-md z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content Area */}
          <AnimatePresence mode="wait">
            {currentTabContent && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-background/20 dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-slate-200 dark:border-neutral-700 max-w-7xl mx-auto"
              >
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {currentTabContent.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AuroraBackground>
    </>
  );
} 