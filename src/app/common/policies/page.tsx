'use client';

import React, { Suspense } from "react";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MainHeader } from "@/components/global/MainHeader";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export default function PoliciesPage() {
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
            <div className="mb-8">
              <Breadcrumb className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-sm" />
            </div>
            
            {/* Page Title */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className={metallicBlackTextClasses}>Equal Privacy Policy</span>
              </h1>
              <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
                Review our privacy policy and data protection practices.
              </p>
            </div>

            {/* Policy Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-background/20 dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-slate-200 dark:border-neutral-700 max-w-7xl mx-auto"
            >
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
                  Equal Privacy Policy
                </h3>
                <p className="mb-4">
                  <strong>March, 2024</strong>
                </p>
                <p className="mb-4">
                  At <strong>Equal Identity Private Limited</strong> (henceforth <strong>"our," "us", "Equal", "Company"</strong> and <strong>"we"</strong>), we believe that you (or <strong>"user"</strong>) are the master of your data and captain of your privacy.
                </p>
                <p className="mb-4">
                  This privacy policy (<strong>"Privacy Policy"</strong>) describes the information that we process to provide you with our products, namely "Equal ID Gateway", "Equal ID Wallet" and "Equal Connect" (collectively <strong>"Products"</strong>) and services. We encourage you to read this Privacy Policy carefully as it contains important information about who we are, what Personal Data of yours we collect, why we collect such Personal Data, how we use, store, and share the Personal Data, and the rights you have over such Personal Data. This Privacy Policy further details Equal's scope in processing your Personal Data in the capacity of a Data Fiduciary and/or as a Data Processor/Service Provider for each of Equal's Products. As a Data Processor/Service Provider, Equal processes your personal data on behalf of and based on the instructions of the Businesses. For the Purpose of this Privacy Policy, "Business" means enterprise customers of Equal, to whom Equal provides verification services in the capacity of a Service Provider/Data Processor.
                </p>
                <p className="mb-4">
                  We process your data based on your consent and for the specified purposes described in this Privacy Policy. We adhere to the provisions of the Information Technology Act, 2000 and Information Technology (Reasonable security practices and sensitive personal data and information) Rules, 2011 and the Digital Personal Data Protection Act, 2023, and ensure that you lead the way you want us to process your data. We are also committed to complying with applicable regulations under the Aadhaar Act, 2016 and its regulations and other mandates issued by the Reserve Bank of India (RBI) under the RBI Master Direction - Know Your Customer (KYC) Direction, 2016 while processing your Aadhaar data and financial data respectively.
                </p>
                <p className="mb-4">
                  This Privacy Policy should be read alongside, and in addition to the Equal Terms of Use (<strong>"Terms"</strong>) and any separate product or service agreement entered between us from time to time. This Privacy Policy is only applicable to our Products and not to other Business applications and websites that you may access through our Products, each of which may have data collection, storage, and use policies that are different from our Privacy Policy.
                </p>
                <p className="mb-4">
                  Where we have used a term but have not explained the meaning of a capitalised term in this Privacy Policy, that capitalised term has the same meaning as mentioned under the Terms. Whenever we refer to 'information' or 'data' under this Privacy Policy, we refer to your personal data that identifies you (described in Clause 2 of this Privacy Policy). Whenever we refer to the 'law' under this Privacy Policy, we are referring to those laws as amended from time to time.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">ABOUT US</h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">Our Products</h4>
                <p className="mb-4">
                  Equal provides Products designed to deliver a seamless experience of managing and sharing IDs to its users. With <strong>"Equal ID Gateway,"</strong> users can securely share IDs with different businesses, enabling a hassle free verification process to the users and helps users at their option to store the same on <strong>"Equal Wallet",</strong> to avoid scattered storage of IDs enabling users to securely store and share the same with different businesses at their will and choice.
                </p>
                <p className="mb-4">
                  With an aim to only make its users life easier, Equal provides to users <strong>"Equal Connect"</strong> that allows users to access multiple applications and services with a single set of login credentials by creating an "Equal Account". Instead of needing separate usernames and passwords for each application or service, users can sign-in once with their Equal Account and then seamlessly access a variety of integrated platforms without having to re-enter their credentials.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">HOW DOES EQUAL PROCESS YOUR DATA</h3>
                <ol className="list-decimal pl-5 mb-4 space-y-2">
                  <li>
                    <strong>Equal as a Data Processor/Service Provider:</strong><br />
                    We provide verification services to Businesses through Equal ID Gateway. In doing so, we process users' personal data on behalf of the Business based on the consent and authorisation of the end user. Businesses are data fiduciaries who determine the purpose and means of processing users' personal data, and we are data processors authorised to process the data with respect to those Services. For any queries related to the processing of your data by Businesses or to exercise your rights in respect of those Services, please reach out to the concerned Business.
                  </li>
                  <li>
                    <strong>Equal as a Data Fiduciary:</strong><br />
                    We help you store your personal data in a secure place by way of Equal Wallet. This helps you to share and verify your identity at different junctures of your life be it at a hospital for availing benefits and insurance, at a bank for availing loans or your place of employment for background verification or creating your profile or signing-up with any business and many such places seamlessly. If you have an Equal Account, Equal also helps you to seamlessly pre-fill your information when you intend to sign-up/register with any Business. For such Services, we are the data fiduciary and collect and process your personal data with your consent in accordance with this Privacy Policy.
                  </li>
                  <li>
                    <strong>Types of data we collect and why</strong>
                  </li>
                </ol>

                <h4 className="text-lg font-semibold mt-4 mb-2">Data you provide us:</h4>
                <p className="mb-4">
                  You provide and we collect the following data from you, in order to provide you our Product and Services:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>
                    <strong>Account Data:</strong> In order to use our Products, you need to provide Account Data such as phone number, name, age, gender and address to create your Equal Account (<strong>"Account Data"</strong>). It is important that you provide us Account Data, without which we will not be able to provide our Products to you.
                  </li>
                  <li>
                    <strong>Data related to your Identity:</strong> To undertake the verification process on Equal ID Gateway, you provide us data related to your Government IDs and other data including your name, address, PAN, drivers' licence number, employment details, payslips, bank account details, income tax return details, education information, and credit scores with us. We may also use this data to undertake two-factor authentication to verify your Equal Account whenever deemed required for confirming ownership of Equal Account. We collect this data in accordance with applicable laws, on the authorisation received from Business and the consent provided by you.
                  </li>
                  <li>
                    <strong>Facial images or stored media:</strong> We may ask you to upload your image or a file on Equal ID Gateway to verify your identity.
                  </li>
                </ul>

                <h4 className="text-lg font-semibold mt-4 mb-2">Data we automatically collect from your usage of our Products:</h4>
                <p className="mb-4">
                  We automatically collect the following data from you, in order to provide you our Products:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>
                    <strong>Device Data:</strong> We collect data related to your device such as device type, operating system, device setting and geo-location data to provide you an improved experience while using our Products.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We collect data about how you use the Products and interact with our Products including using cookies or other tracking software. This includes data such as access dates and times, Product features or pages viewed, Product crashes and other system activity, type of browser, and third-party sites or services used before or in the course of interacting with our Products.
                  </li>
                  <li>
                    <strong>Derived Data:</strong> Based on the data we receive from you we derive additional data points to provide seamless experience on our Products.
                  </li>
                </ul>

                <h4 className="text-lg font-semibold mt-4 mb-2">Data we receive about you from our Data Partners and other sources:</h4>
                <p className="mb-4">
                  <strong>Data we fetch & receive from Data Partners:</strong> In order to verify your identity based on the information you provide us on the Equal ID Gateway or while creating your Equal Account, we fetch & receive data regarding you from approved and authorised Data Partners such as Government entities and third-party vendors based on your consent, and in accordance with applicable laws. This may include name, address, PAN, drivers' license, employment details, payslips, bank account details, income tax return details, education information, and credit scores.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">How we use your personal information</h4>
                <p className="mb-4">We use your personal information for:</p>
                <ol className="list-decimal pl-5 mb-4 space-y-2">
                  <li>For providing our Products, we process personal data to organise and aggregate the user's government verified identity information in one place and help the user to pre-fill such information seamlessly for sign-up/log-in with different Businesses that are customers of Equal;</li>
                  <li>for fetching and storing your credit information report including but not limited to credit assessment, availing loan and curated offers</li>
                  <li>Improving our Products and Services, including troubleshooting, analytics and research;</li>
                  <li>With your consent, for promotional/ marketing activities, and communicating with you through calls, SMS messages, emails, or other means;</li>
                  <li>Fraud prevention and managing risks, protecting our Products and Services;</li>
                  <li>Complying with our legal obligations;</li>
                  <li>Investigating and responding to complaints and feedback.</li>
                </ol>

                <h4 className="text-lg font-semibold mt-4 mb-2">How do we store and retain your Data:</h4>
                <p className="mb-4">
                  As a Data Fiduciary, when you choose to use "Equal Wallet", we store your personal data as long as you choose to use the Wallet in a secure data vault with high-end security systems. However, we will retain and use the information collected as necessary to comply with our obligations under applicable laws or contracts, resolve disputes, or for other business purposes. Post deletion, we may continue to use your anonymised data, which is aggregated or combined with anonymised data of other users. We use this for analytics, research, and other business purposes.In the event you change your mind and do not wish for us to process your data in the Equal ID Wallet, you can delete your data in the "Manage your IDs" section available on your Equal Account.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">Your rights:</h4>
                <p className="mb-4">
                  We want you to understand that you have complete control over your data. You have the following rights with regard to your data, and you can exercise these rights by using tools and mechanisms we provide you to manage your data on Equal ID Wallet.
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>
                    <strong>Review your Data:</strong> You can review the data provided by you at any time by visiting the Equal ID Wallet. This includes data provided by you and collected from our Data Partners, which will be displayed transparently within the platform.
                  </li>
                  <li>
                    <strong>Rectification of Data:</strong> If you notice inaccuracies in your personal data, you can request a correction by contacting us at support@equal.in. We encourage you to notify us without undue delay regarding any changes to the personal data you have provided to us.
                  </li>
                  <li>
                    <strong>Delete your data:</strong> If you no longer wish to use our Products, you can delete your data using the Manage IDs tool in the Equal ID Wallet. However, data shared with any Business for verification or profile creation is governed by the Business's Data Policy and Terms of Use. Equal shall not be responsible for deleting data stored or processed by such Businesses.
                  </li>
                </ul>

                <h4 className="text-lg font-semibold mt-4 mb-2">How do we operate or transfer your data</h4>
                <p className="mb-4">
                  We do not share your data with third party partners/vendors outside India. Any change in our data transfer practices in the future will be intimated to you and you may review our revised policy and consent to our revised data transfer practices.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">How do we protect and safeguard your Data:</h4>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>That data collected from you is saved and stored on servers which are password protected to ensure there is no unauthorised access to it. We strictly adhere to security guidelines to ensure to protect your data that is in our possession.</li>
                  <li>We store your data over secure cloud service providers who offer security standards competitive with the industry norms. We also protect our servers by using SSL, and data access authorization controls. We take all the reasonable measures to preserve the integrity and security of your data that is in our possession.</li>
                  <li>We have adopted all reasonable safeguards as mandated by the applicable law in order to protect your data. The data provided by you is stored only in the servers of India.</li>
                  <li>Despite our best practices of safeguarding your data, You understand and accept that there is no guarantee that data transmission over the Internet will be completely secure and that any data that You transmit to Us is at Your own risk. We assume no liability for any disclosure of data due to errors in transmission issues, unauthorised third-party access to our Platform and databases or other acts of third parties or acts or omissions beyond our reasonable control and you shall not be entitled to hold Equal responsible for any breach of security except in case of wilful negligence on the part of Equal.</li>
                </ul>

                <h4 className="text-lg font-semibold mt-4 mb-2">Changes to Privacy Policy</h4>
                <p className="mb-4">
                  We process your data based on the consent you expressly grant to us at the time we collect such data for a specified purpose. In case we change our Privacy Policy which further changes the way we process and manage your data, we will notify and give you an opportunity to review the revised Policy before you choose to proceed with our Services.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">Grievances:</h4>
                <p className="mb-4">
                  We have a dedicated team at your service to redress any grievances that you may have in relation to your data as processed by us. In order to reach out to us, please write to grievance@equal.in
                </p>
                <p className="mb-2">
                  <strong>Krishna Pallavi,</strong><br />
                  <strong>Grievance Officer</strong><br />
                  Equal Identity Private Limited<br />
                  The Skyview, Sy. No. 83/1, 2nd Floor,<br />
                  Skyview 10, Raidurg, Hyderabad,
                </p>
                <p className="mb-4">
                  Please note that Equal's Grievance redressal mechanism addresses only the issues related to the way we process and manage your data on our Platform and in no way, can address the issues that you may have with Businesses.
                </p>
                <p className="mb-4">
                  We would also like to inform you that as per the Digital Personal Data Protection Act, 2023, if you have any concerns with respect to the manner in which we process your data, you may also make a complaint to the Data Protection Board as and when established through a notification by the Central Government and in a manner as prescribed.
                </p>
              </div>
            </motion.div>
          </Suspense>
        </div>
      </AuroraBackground>
    </>
  );
} 