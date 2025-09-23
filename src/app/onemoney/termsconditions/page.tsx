import React from "react";
import { BackgroundGrid } from "@/components/ui/background-grid";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export default function TermsConditionsPage() {
  return (
    <main className="relative w-full pb-12 md:pb-16 overflow-hidden">
      <BackgroundGrid />
      <div className="container px-4 md:px-6 mx-auto">


        {/* Page Title */}
        <div className="text-center my-12 md:my-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Terms & Conditions</span>
          </h1>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
            Review our terms and conditions of service.
          </p>
        </div>

        {/* Terms Content */}
        <div className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50">
          <div className="relative z-20 text-foreground/90">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  <strong>IMPORTANT NOTICE</strong>
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  ACCESSING, BROWSING OR OTHERWISE USING THIS WEBSITE INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE INCLUDING THE ELIGIBILITY, REGISTRATION, PAYMENT TERM; PRINCIPLES RELATED TO RIGHTS, OBLIGATIONS AND LIABILITY OF COMPANY AND USER; THE GRIEVANCE REDRESSAL MECHANISM AS WELL AS THE TERMS OF PRIVACY SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                  IF YOU DO NOT AGREE WITH THESE "TERMS OF USE" PLEASE DO NOT USE THE WEBSITE. BY VISITING OR ACCESSING THE WEBSITE, YOU UNCONDITIONALLY ACCEPT, AND AGREE TO BE LEGALLY BOUND BY THE "TERMS OF USE", READ WITH THE PRIVACY POLICY AND / OR ANY OTHER APPLICABLE POLICY GOVERNING THE USE OF THE WEBSITE OR CONDUCT OF TRANSACTIONS ON THE WEBSITE.
                </p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">1. GENERAL</h3>
              <p className="mb-4">
                <strong>1.1</strong> This Website (www.onemoney.in) is owned, operated and maintained by FinSec AA Solutions Private Limited (referred to as "FinSec", "Onemoney"), is registered as NBFC Account Aggregator by RBI, provides all AA services permitted under the applicable regulation and laws, and is a 100% subsidiary of the FinTech Products and Solutions Private Limited ("FinTech").
              </p>
              <p className="mb-4">
                Both provide independent solutions and FinTech has an arm's length relationship with its subsidiary Onemoney as permitted by laws and regulations. Reference to "Company" in this document includes its subsidiary, Onemoney.
              </p>
              <p className="mb-4">
                Reference to the term "Website" in these Terms of Use shall include the mobile application "OneMoney", as the case may be, and / or any other software / application through which the User (a) accesses the Website, or (b) avails online services from Company.
              </p>
              <p className="mb-4">
                <strong>1.2</strong> The terms "We" / "Us" / "Our" used in these "Terms of Use" refer to Company and the terms "You"/ "Your"/ "Yourself" document in these "Terms of Use" refer to the users of the Website ("Users"). The term "Users" in these Terms of Use shall include persons(s) who visit or access the Website, or avail any of its functionalities or use any data or information available on the Website in any manner.
              </p>
              <p className="mb-4">
                <strong>1.3</strong> We are committed to complying with all Applicable Law(s) while collecting, processing, storing, and transferring your personal data. This includes adherence to the Master Direction – Non-Banking Financial Company – Account Aggregator (Reserve Bank) Directions, 2016 ("Master Directions") as issued and updated by the Reserve Bank of India, and all other relevant laws, regulations, and guidelines in force from time to time, the Information Technology Act, 2000, the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011, the Digital Personal Data and Protection Act, 2023 and rules as amended from time to time.
              </p>
              <p className="mb-4">
                <strong>1.4</strong> These "Terms of Use" have been published by the Company in accordance with Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Digital Personal Data Protection Act, 2023 and Master Directions for NBFC AA 2016 published by RBI.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">2. IMPORTANT TERMS</h3>
              <p className="mb-4">
                <strong>2.1</strong> This "Terms of Use" document constitutes an "electronic contract" between Company and the User of the Website under the laws applicable to the User. This electronic record is generated by a computer system and does not require any physical or digital signatures.
              </p>
              <p className="mb-4">
                <strong>2.2</strong> This "Terms of Use" document includes and shall always be deemed to include (a) the Privacy Policy; and (b) any other policy governing the use of the Website or conduct of transactions on the Website. Further, when You use any specific service provided by Us through the Website, You will be subject to the terms and conditions applicable to such service, and they shall be deemed to have been incorporated into these Terms of Use by reference, and shall be considered to be part and parcel of these Terms of Use.
              </p>
              <p className="mb-4">
                <strong>2.3</strong> We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use and we shall notify you of the same. It is Your responsibility to review these Terms of Use periodically for updates / changes. For certain changes, We may be required under Applicable Law to give You advance notice of any change(s) to the Terms of Use. Your continued use of the Website following the posting of changes will mean that You accept and agree to the revisions. As long as You comply with these Terms of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use the Website.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">3. ABOUT THE WEBSITE</h3>
              <p className="mb-4">
                <strong>3.1</strong> The Company Services allow you to retrieve your information which is available with different "Financial Information Providers" ("FIP") (i.e. Banks, Mutual Funds, NBFCs etc.) as per the Master Directions at one place on this Website.
              </p>
              <p className="mb-4">
                The provision of any or all the Services is subject to Applicable Laws of India. Outside of India, one or more of our services may not be available in any territory, if the provision of such service is barred by Applicable Law in the territory. Further, the provision of any or all of the Services is subject to the sole discretion of the Company and its availability on the Website. Please check our Website to confirm if any particular Services is available on our Website.
              </p>
              <p className="mb-4">
                <strong>3.2</strong> You hereby authorize the Company to access your information from FIPs to provide Services to you in accordance with Applicable Laws. The said authorization also enables the Company to support products and/or services being offered to you through Company. Further, OneMoney may engage with other entities, including FinTech, to spread the concept of account aggregation, for consideration to be paid either in cash or in kind to FinTech or other entities, including but not limited to the latter providing their services to the customers of OneMoney using mobile number or email address or any other means permitted Applicable Laws.
              </p>
              <p className="mb-4">
                <strong>3.3</strong> All data and other information retrieved by the Company from third-party sites is for informational purpose only and not for any trading or transactional purposes. In case you wish to carry out any transaction, you will be directed to the website of the respective Information Provider or other third-party website for carrying out such transaction.
              </p>
              <p className="mb-4">
                <strong>3.4</strong> All data and other information provided by Company as part of the Services is on an "as is" and "as available" basis, as obtained from the FIPs, and Company does not assume any responsibility or provide any warranty with respect to such information. Further, all data or other information obtained from FIPs may be based on delayed feeds and may not reflect the real time / rates. Company shall not be responsible for any errors or delays in the data or information provided to Users as part of its Services or for any actions taken by Users in reliance thereon.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4. CONSENT ARCHITECTURE</h3>
              <p className="mb-4">
                <strong>4.1</strong> For providing information of a User, Company shall obtain consent of the User through a standardised consent artefact which may contain some or all of the following details:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(a) Identity of the User and optional contact information;</li>
                <li>(b) The nature of the financial information or other information requested;</li>
                <li>(c) Purpose of collecting such information;</li>
                <li>(d) the identity of the recipients of the information, if any;</li>
                <li>(e) URL or other address to which notification needs to be sent every time the consent artefact is used to access information;</li>
                <li>(f) Consent creation date, expiry date, identity and signature/ digital signature;</li>
                <li>(g) any other attribute as may be required by the Company or under Applicable Law.</li>
              </ul>
              <p className="mb-4">
                <strong>4.2</strong> The Company shall share information collected from any User with the information user (IU) as expressly authorized by the User or with any credit or lending agency as may be permitted or required under Applicable Law. The information may be retrieved and downloaded on the User's own device or as directed by the User taken by the Company for aforesaid Services.
              </p>
              <p className="mb-4">
                <strong>4.3</strong> The Users can at any point of time revoke all or any of their consent(s) given to the Company to obtain any information relating to the Users.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5. ELIGIBILITY</h3>
              <p className="mb-4">
                <strong>5.1 Competence to contract:</strong> Use of the Website is available only to those individuals and organizations who can form legally binding contracts under Applicable Law in their respective jurisdictions. Persons who are "incompetent to contract" as per Applicable Law in their jurisdictions are not eligible to use the Website. If you are a minor i.e. under the age of 18 years, you shall not register as a User of the Website and shall not use the Website. As a minor if you wish to use the Website, such use may be made by your legal guardian or parents on the Website. Company reserves the right to terminate your membership and / or refuse to provide you with access to the Website if it is brought to Company's notice or if it is discovered that you are under the age of 18 years.
              </p>
              <p className="mb-4">
                <strong>5.2 Authorization:</strong> In case You are registering as a business or a corporate entity, you represent that You are duly authorized by the business / corporate entity as applicable to accept this Agreement and You have the authority to bind that business / corporate entity to this Agreement.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">6. USER REGISTRATION</h3>
              <p className="mb-4">
                <strong>6.1</strong> Company may require Users to fill an online form and register themselves on the Website to avail all or any of the services rendered on the Website. Company may require Users to provide all information, and submit all documents as may be required for registration of the User on Website or for availing any Service on the Website ("Registration Information").
              </p>
              <p className="mb-4">
                <strong>6.2</strong> You agree to:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(a) provide true, accurate, correct and complete Registration Information; and</li>
                <li>(b) maintain and promptly update the Registration Information to keep it true, accurate, current and complete. If you provide any information that is untrue, inaccurate, not current or incomplete, or if Company has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, Company has the right to suspend or terminate any and all of your current or future use of the Services.</li>
              </ul>
              <p className="mb-4">
                <strong>6.3</strong> Upon successful registration to use the Services and payment of Service Fee (if required) for Company or other services, your Account would be activated. For all services being availed You agree and understand that you will be solely responsible for maintaining the confidentiality of your credentials including password which, together with your login ID, allows you to access the Services.
              </p>
              <p className="mb-4">
                <strong>6.4</strong> By providing us with your email address and mobile number, and any other personal information authorized or permitted by Applicable Laws and consented by you, you agree to receive all required notices and information electronically, on that email address or mobile number. It is your responsibility to update any changes to your email address and mobile number. If you become aware of any unauthorized use of your Registration Information, you agree to notify Company immediately at the customer service helpdesk, the details of which are available on the Website. Company shall not be liable for any unauthorized use or access, unless it is proved that the unauthorized use or access occurred solely due to reasons directly attributable to Company.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">7. DEVICE AND SIM DATA COLLECTION FOR SECURITY AND BINDING</h3>
              <p className="mb-4">
                To ensure secure access and protect your financial information, this platform collects specific device-level and SIM-related data as part of its SIM and device binding process. This is a mandatory security measure in alignment with regulatory and compliance standards under the Account Aggregator Framework. Please refer to our Privacy Policy on how we collect, use and process your data with respect to sim binding.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">8. CHARGES AND PAYMENT RELATED INFORMATION</h3>
              <p className="mb-4">
                <strong>8.1. Payment of Fees:</strong> The Company does not currently charge any fees for browsing or using the Website and Services. However, the Company reserves the right to introduce fees in the future for access to the Website, the Services as a whole, or specific features therein. If such fees are introduced, You agree to pay any applicable charges for the Services that You choose to use. The Company will make reasonable efforts to inform You in advance about the applicability and amount of any such fees. You further agree that the Company may, at its sole discretion, introduce, modify, or waive fees at any time. Your continued use of the Website and/or Services after the introduction or modification of any fees will constitute your acceptance of such changes and continued agreement to these Terms of Use.
              </p>
              <p className="mb-4">
                <strong>8.2. Provision of payment information:</strong> If and when the Company introduces paid Services on the Website, You agree to provide accurate and valid financial information—such as credit/debit card details or pre-paid payment instrument account details—exclusively through the Company's approved payment gateway. You shall not use any payment instrument that is not lawfully owned by You; all transactions must be conducted using payment methods registered in Your name. The financial information provided will be used solely for processing payments and will not be shared with third parties, except as required for fraud verification, by law, regulation, court order, or in accordance with the Company's Privacy Policy. You are solely responsible for maintaining the confidentiality and security of Your payment details. The Company expressly disclaims all liability for any unauthorized use of Your credit/debit card or pre-paid instrument account.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">9. USE OF WEBSITE</h3>
              <p className="mb-4">
                You agree, undertake and confirm that Your use of the Website shall be strictly governed by the following binding principles:
              </p>
              <p className="mb-4">
                <strong>(i)</strong> You shall not host, display, upload, modify, publish, transmit, update or share any information which:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(a) belongs to another person and to which You do not have any right;</li>
                <li>(b) is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever; or unlawfully threatening or unlawfully harassing including but not limited to "indecent representation of women" within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986;</li>
                <li>(c) is misleading in any way;</li>
                <li>(d) is patently offensive to the online community, such as sexually explicit content, or content that promotes obscenity, paedophilia, racism, bigotry, hatred or physical harm of any kind against any group or individual;</li>
                <li>(e) harasses or advocates harassment of another person;</li>
                <li>(f) involves the transmission of "junk mail", "chain letters", or unsolicited mass mailing or "spamming";</li>
                <li>(g) promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or libelous;</li>
                <li>(h) infringes upon or violates any third-party's rights [including, but not limited to, intellectual property rights, rights of privacy (including without limitation unauthorized disclosure of a person's name, email address, physical address or phone number) or rights of publicity];</li>
                <li>(i) promotes an illegal or unauthorized copy of another person's copyrighted work (see "Copyright complaint" below for instructions on how to lodge a complaint about uploaded copyrighted material), such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated music or links to pirated music files;</li>
                <li>(j) contains restricted or password-only access pages, or hidden pages or images (those not linked to or from another accessible page);</li>
                <li>(k) provides material that exploits people in a sexual, violent or otherwise inappropriate manner or solicits personal information from anyone;</li>
                <li>(l) provides instructional information about illegal activities such as making or buying illegal weapons, violating someone's privacy, or providing or creating computer viruses;</li>
                <li>(m) contains video, photographs, or images of another person (with a minor or an adult);</li>
                <li>(n) tries to gain unauthorized access or exceeds the scope of authorized access to the Website or to profiles, blogs, communities, account information, bulletins, friend request, or other areas of the Website or solicits passwords or personal identifying information for commercial or unlawful purposes from other users;</li>
                <li>(o) engages in commercial activities and/or sales without Our prior written consent such as contests, sweepstakes, barter, advertising and pyramid schemes, or the buying or selling of "virtual" products related to the Website;</li>
                <li>(p) solicits gambling or engages in any gambling activity which We, in Our sole discretion, believes is or could be construed as being illegal;</li>
                <li>(q) interferes with another User's use and enjoyment of the Website or any other individual's User and enjoyment of similar services;</li>
                <li>(r) refers to any website or URL that, in Our sole discretion, contains material that is inappropriate for the Website or any other website, contains content that would be prohibited or violates the letter or spirit of these Terms of Use;</li>
                <li>(s) harms minors in any way;</li>
                <li>(t) infringes any patent, trademark, copyright or other proprietary rights or third-party's trade secrets or rights of publicity or privacy or shall not be fraudulent or involve the sale of counterfeit or stolen products;</li>
                <li>(u) violates any law for the time being in force;</li>
                <li>(v) deceives or misleads the addressee/ Users about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</li>
                <li>(w) impersonate another person;</li>
                <li>(x) contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; or contains any trojan horses, worms, time bombs, cancelbots, easter eggs or other computer programming routines that may damage, detrimentally interfere with, diminish value of, surreptitiously intercept or expropriate any system, data or personal information;</li>
                <li>(y) threatens the unity, integrity, defence, security or sovereignty of any nation, friendly relations between nation states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation;</li>
                <li>(z) is false, inaccurate or misleading;</li>
                <li>(aa) creates liability for Us or cause Us to lose (in whole or in part) the services of Our internet service provider ("ISPs") or other suppliers.</li>
              </ul>
              <p className="mb-4">
                <strong>(ii)</strong> You shall not use any "deep-link", "page-scrape", "robot", "spider" or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Website or any content, or in any way reproduce or circumvent the navigational structure or presentation of the Website or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Website. We reserve Our right to bar any such activity.
              </p>
              <p className="mb-4">
                <strong>(iii)</strong> You shall not attempt to gain unauthorized access to any portion or feature of the Website, or any other systems or networks connected to the Website or to any server, computer, network, or to any of the services offered on or through the Website, by hacking, password "mining" or any other illegitimate means.
              </p>
              <p className="mb-4">
                <strong>(iv)</strong> You shall not probe, scan or test the vulnerability of the Website or any network connected to the Website nor breach the security or authentication measures on the Website or any network connected to the Website. You may not reverse look-up, trace or seek to trace any information on any other User of or visitor to Website, or any other customer, including any account on the Website not owned by You, to its source, or exploit the Website or any service or information made available or offered by or through the Website, in any way where the purpose is to reveal any information, including but not limited to personal identification or information, other than Your own information, as provided for by the Website.
              </p>
              <p className="mb-4">
                <strong>(v)</strong> You shall not make any negative, denigrating or defamatory statement(s) or comment(s) about Us or the brand name or domain name used by Us including the terms Company, or otherwise engage in any conduct or action that might tarnish the image or reputation, of Company or sellers on platform or otherwise tarnish or dilute any Company's trade or service marks, trade name and/or goodwill associated with such trade or service marks, trade name as may be owned or used by us. You agree that You will not take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Website or Company's systems or networks, or any systems or networks connected to Company.
              </p>
              <p className="mb-4">
                <strong>(vi)</strong> You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Website or any transaction being conducted on the Website, or with any other person's use of the Website.
              </p>
              <p className="mb-4">
                <strong>(vii)</strong> You shall not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal You send to Us on or through the Website or any service offered on or through the Website. You may not pretend that You are, or that You represent, someone else, or impersonate any other individual or entity.
              </p>
              <p className="mb-4">
                <strong>(viii)</strong> You shall not use the Website or any content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity which infringes the rights of Company and / or others.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">10. OBLIGATIONS OF THE COMPANY</h3>
              <p className="mb-4">
                In accordance with the laws applicable to Services being provided, the Company agrees that:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(i) Company shall provide Services to You based on Your explicit consent;</li>
                <li>(ii) Company shall ensure that the provisions of Services to You is backed by appropriate agreements/ authorizations between Company, You and the information providers;</li>
                <li>(iii) Company shall share your information only with third parties as explicitly specified and consented by You;</li>
                <li>(iv) For offering Account Aggregator Services the Company shall strictly adhere to the NBFC AA Master Directions 2016 specifically the Company shall not transfer your financial information except as per your explicit consent and no financial information relating to You which is accessed by Company shall reside with the Company. The services of a third-party service provider shall not be used for undertaking the business of Account Aggregation;</li>
                <li>(v) Company shall not access Your user authentication credentials relating to accounts with various information providers;</li>
                <li>(vi) Company shall not part with any information that it may come to acquire from/on Your behalf except as per your explicit consent</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">11. INTELLECTUAL PROPERTY RIGHTS</h3>
              <p className="mb-4">
                <strong>11.1.</strong> The contents of the Website, including its "look and feel" (e.g. text, graphics, images, logos and button icons), photographs, editorial content, notices, software (including html-based computer programmes) and other material are the owned/licensed by/to Company and/or its Third-Party Service Providers/their licensors and are duly protected by them under applicable copyright, trademark and other laws. You acknowledge and agree that Company and/or its licensors or suppliers own all rights to this Website, the content displayed on the Website and any intellectual or proprietary property and/or technology (in any form) made available to you as a part of or in conjunction with the Services.
              </p>
              <p className="mb-4">
                <strong>11.2.</strong> You are only permitted to use any of the foregoing as expressly authorized by these Terms of Use, and otherwise, by the Services. You may download or print a copy of the information provided on this Website for your personal, internal and non-commercial use only. You shall not copy, re-print, reproduce (electronically or otherwise), distribute, or create derivative works from any content on the Website, in whole or in part, for any other purpose without our prior written consent. Further, you agree not to reverse engineer or reverse compile any technology associated with the Services, including but not limited to any software applications or Java applets associated with the Services Content, from the Website, in whole or in part.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">12. ACCOUNTS WITH FIPs</h3>
              <p className="mb-4">
                By using the Services, you authorize Company to access FIP account websites designated by you, on your behalf, to retrieve account information requested by you and you hereby appoint Company as your agent for this limited purpose. You hereby represent to us and that you are a legal owner of the account(s) and have the authority to designate Company as your agent, use the Services and to give Company your passwords, user names and all other information you provide. The Services do not have the capability to initiate transactions affecting your financial accounts or provide notices or instructions affecting such financial accounts. Transactional and informational activities initiated by you at such sites are not made through the Services and we assume no responsibility for such activities.
              </p>
              <p className="mb-4">
                You are responsible for all charges associated with third-party accounts and agree to comply with the terms of those Services. For all purposes hereof, you hereby grant Company a limited power of attorney, and you hereby appoint Company as your true and lawful attorneys-in-fact and agents, with full power of substitution and re-substitution, for you and in your name, place and stead, in any and all capacities, to access third-party sites, retrieve information, and use your information, all as described above, with the full power and authority to do and perform each and every act and thing requisite and necessary to be done in connection with such activities, as fully to all intents and purposes as you might or could do in person. YOU ACKNOWLEDGE AND AGREE THAT WHEN THE COMPANY OR WEBSITE IS ACCESSING AND RETRIEVING INFORMATION FROM THIRD-PARTY FIP SITES, THE COMPANY OR WEBSITE IS ACTING AS YOUR AGENT, AND NOT THE AGENT ON BEHALF OF THE BANK/THIRD-PARTY.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">13. DISCLAIMER OF WARRANTIES</h3>
              <p className="mb-4">
                <strong>13.1.</strong> You expressly understand and agree that your use of the Services is at your sole risk. The Services are provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement.
              </p>
              <p className="mb-4">
                <strong>13.2.</strong> We make no warranty that:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(a) The Services will meet your requirements;</li>
                <li>(b) The Services will be uninterrupted, timely, secure, or error-free;</li>
                <li>(c) The results or information that may be obtained from the use of the Services will be accurate or reliable</li>
                <li>(d) That your personal data used by you to access your third-party accounts through the Services will be protected in any manner whatsoever;</li>
                <li>(e) Any errors in the technology will be corrected</li>
              </ul>
              <p className="mb-4">
                ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS DONE AT YOUR OWN DISCRETION AND RISK AND WE ARE NOT RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR THROUGH OR FROM THE SERVICES WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS. TO THE EXTENT THAT ANY PART OF THIS SECTION IS NOT CONSISTENT WITH ANY OTHER PART OF THESE TERMS, THEN THIS SECTION WILL PREVAIL.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">14. LIMITATION OF LIABILITY</h3>
              <p className="mb-4">
                <strong>14.1.</strong> You agree that we will not be liable for any damage or loss either direct, indirect, incidental, special, consequential or exemplary, including, but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses, even if we have been advised of the possibility of such damages, resulting from:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(a) The use or the inability to use the Services;</li>
                <li>(b) Any products, data, information or service purchased or obtained or messages received through or from the Services;</li>
                <li>(c) Unauthorized access use of your personal data used by you to access your third-party accounts;</li>
                <li>(d) Alteration of your transmissions or data obtained from/stored in your third-party accounts;</li>
                <li>(e) Statements or conduct of anyone on the Services; or</li>
                <li>(f) Any other matter relating to the Services.</li>
              </ul>
              <p className="mb-4">
                <strong>14.2.</strong> Without prejudice to the generality of the foregoing, in case Company is held to be liable to for any damages under Applicable Law, then the liability of Company will be limited to fees or other consideration paid by the User for availing the Services from Company.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">15. INDEMNITY</h3>
              <p className="mb-4">
                You agree to indemnify and hold harmless the Company, its owners, licensees, affiliates, subsidiaries, group companies (as applicable) and their respective officers, directors, agents, and employees, from and against, any and all suits, actions and proceedings, claims, liabilities, losses, damages, costs and expenses, including reasonable outside attorneys' fees, arising directly or indirectly in connection with:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>(a) Your violation of any law, regulation or order of any government or judicial authority; or</li>
                <li>(b) any act, omission, fraud, negligence or default or the breach of any of Your obligations or representations under these Terms of Use or any other agreement / policy between You and the Company;</li>
                <li>(c) any infringement of any intellectual property rights of the Company or any third-party.</li>
                <li>(d) any infringement of any intellectual property right of the Other Party or any third-party.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">16. TERMINATION FOR VIOLATIONS</h3>
              <p className="mb-4">
                In case of any non-compliance or violation of these Terms of Use, Company has the right to immediately terminate the access or usage rights of the Users of the Website and remove any and all non-compliant information from the Website.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">17. GRIEVANCE OFFICER</h3>
              <p className="mb-4">
                Any complaint / grievance with respect to the Services or the Website may be submitted to the Principal Nodal Officer of the Company as per details provided below:
              </p>
              <p className="mb-2">
                <strong>Principal Nodal Officer</strong>
              </p>
              <p className="mb-0">
                Address: 3rd Floor Tower 40 The Loft, Nexity Hyderabad, Knowledge city Layout Raidurgam Village Serilingampally, Mandal, Hyderabad, Telangana, India, 500081
              </p>
              <p className="mb-0">Phone: +91-40-6663-5679 or +91-90100-98899</p>
              <p className="mb-0">Email: helpdesk@onemoney.in</p>
              <p className="mb-4">Time: 10:30 am to 5:30 pm</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">18. NOTICE</h3>
              <p className="mb-4">
                Company may provide You with notices and communications by e-mail, SMS, push notifications, regular mail or postings on the Website or by any other reasonable means. Except as otherwise set forth herein, any notice to Company must be sent by courier or registered mail and addressed to the Principal Nodal Officer as per details specified above.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">19. SEVERABILITY</h3>
              <p className="mb-4">
                If any provision of these Terms of Use is invalid, unenforceable or prohibited by law, then, these Terms of Use shall be considered divisible as to such provision and such provision shall be inoperative, and the remainder of these Terms of Use shall be valid, binding and of like effect as though such provision was not included herein. Company will substitute for the invalid or unenforceable provision a valid and legally enforceable provision, which achieves to the greatest extent possible the economic, legal and commercial objectives of the provision, which is invalid or unenforceable.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">20. WAIVER</h3>
              <p className="mb-4">
                No failure or delay by a party in exercising any right, power or remedy shall operate as a waiver thereof, nor shall any single or partial exercise of the same preclude any further exercise thereof or the exercise of any other right, power or remedy.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">21. DISCLAIMER</h3>
              <p className="mb-4">
                Data and information retrieved through the Services is for informational purposes only and is not intended for trading or transactional purposes. Company shall not be liable for any errors or delays in the content or information obtained through the Services, or for any actions taken in reliance thereon.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">22. GOVERNING LAW AND JURISDICTION</h3>
              <p className="mb-4">
                These Terms of Use, the Services and the relationship between You and Company shall be governed in accordance with the laws of India. You agree that all claims, differences and disputes arising under or in connection with or in relation hereto the Website, these Terms of Use, the Agreement(s) entered into on or through the Website or the relationship between You and Company shall be subject to the exclusive jurisdiction of the courts at Hyderabad.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">23. MISCELLANEOUS</h3>
              <p className="mb-4">
                "In case your query is not responded even after 30 days or resolved to your satisfaction then as per the RBI Regulation you can escalate the issue to RBI directly. Complaint may be lodged online with the RBI Ombudsman through the portal designed for the purpose (https://cms.rbi.org.in) by RBI in terms of the RBIOS Scheme 2021.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
