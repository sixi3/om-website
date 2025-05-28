'use client';

import React, { useState, useRef } from "react";
import { GridBackground } from "../components/ui/grid-background";
import { motion } from "framer-motion";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

interface PolicyTabData {
  id: string;
  title: string;
  // Placeholder for content, can be expanded later
  content: React.ReactNode;
}

const policyTabsData: PolicyTabData[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: (
      <>
        <p className="mb-4">
          At Finsec AA Solutions Private Limited (henceforth "OneMoney", "our,"
          "us" "Company" and "we") we want to ensure that you have complete
          control over the means and manner in which you wish us to process
          your data. When you choose to use "OneMoney" website ("Website"),
          you provide us certain data, the processing of which will be
          governed under this Privacy Policy. Reference to the term "Website"
          in this Privacy Policy shall include the mobile application
          "OneMoney", as the case may be, and / or any other software /
          application through which you (a) access the Website, or (b) avails
          online services from Company. Reference to the terms "User", "you"
          "your" and "yours" shall mean any individual who accesses, uses, or
          registers on our Website including but not limited to individuals
          whose data is collected, received, stored, processed, or otherwise
          handled by us as per the Applicable Law.
        </p>
        <p className="mb-4">
          We are committed to complying with all Applicable Law(s) while
          collecting, processing, storing, and transferring your personal
          data. This includes adherence to the Master Direction – Non-Banking
          Financial Company – Account Aggregator (Reserve Bank) Directions,
          2016 ("Master Directions") as issued and updated by the Reserve Bank
          of India, and all other relevant laws, regulations, and guidelines
          in force from time to time, the Information Technology Act, 2000,
          the Information Technology (Reasonable security practices and
          procedures and sensitive personal data or information) Rules, 2011,
          the Digital Personal Data and Protection Act, 2023 and rules as
          amended from time to time.
        </p>
        <p className="mb-4">
          This Privacy policy, along with the "Terms of Use" constitutes an
          "electronic record" in the form of an "electronic contract" as
          defined under the Information Technology Act, 2000 between "Company"
          and the User of this Website. This Privacy Policy does not require
          any physical, electronic or digital signature.
        </p>
        <p className="mb-4">
          This Privacy Policy forms an integral part of the "Terms of Use" of
          the Website. If you do not agree with the terms of this Privacy
          Policy please do not use this Website. By visiting this Website you
          (a) unconditionally accept, and agree to be bound by the "Terms of
          Use" of the Website, read with this Privacy Policy; (b) expressly
          consent to the collection, receipt, possession, storage, usage,
          dealing, handling or transfer of your personal information by
          Company in accordance with the terms of this Privacy Policy.
        </p>
        <p className="mb-4">
          This Privacy Policy is only applicable to our Website and not to any
          other Products as owned by or other Business applications and
          websites that you may access through our Website, each of which may
          have data collection, storage, and use policies that are different
          from our Privacy Policy.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          ABOUT US
        </h3>
        <p className="mb-4">
          OneMoney is licensed by the Reserve Bank of India ("RBI") to provide
          Account Aggregator ("AA") services, whereby OneMoney facilitates
          passage of financial information such as details of bank deposits,
          SIPs, Commercial Papers, equity shares, securities etc. of the User,
          in an encrypted manner as per the Master Directions from entities
          known as Financial Information Providers ("FIPs"), which are
          institutions that hold or manage the User's financial information.
          OneMoney then consolidates, organizes, and presents such information
          to the User or a Financial Information User ("FIU"), in a manner as
          may be specified under the Master Direction ("Services").
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          NATURE, CATEGORIES OF COLLECTED DATA AND ITS PURPOSE
        </h3>
        <p className="mb-4">
          You provide and we collect the following data from you, in order to
          provide you our Services. The data referred to below may be
          collected or received by Company (a) directly from the User, when
          the user either provides any specific information on the Website; or
          (b) from use of the Website by the User; or (c) from FIP who have
          collected any Information relating to the User, and who have shared
          it with Company based on the consent of the User.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            <strong>Account Information:</strong> When you log in to the
            OneMoney Website, we collect your mobile number to facilitate
            secure sign-up and authentication and to maintain the account of
            the User. Further, any additional user information that may be
            required by ReBIT (Reserve Bank Information Technology Private
            Limited) or any other regulatory authority shall also be collected
            to ensure compliance with Applicable laws.
          </li>
          <li>
            <strong>Analytics Information:</strong> We may collect additional
            information such as your name, address, telephone number, email
            address, postal and delivery addresses (if different), gender, and
            other relevant details may be collected to conduct analytics and
            enhance your user experience.
          </li>
          <li>
            <strong>Browsing Information:</strong> We may collect information
            such as the internet protocol ("IP") address of your computer, the
            type of browser, operating system of the user&apos;s device and details
            of usage of the Website. This information is collected through
            various ways including by placing "cookies", i.e. text files
            placed on your computer, to help the Website analyze how users use
            the site.
          </li>
          <li>
            <strong>Device Information:</strong> We collect certain
            device-related information, including Device ID, SIM serial
            number, IMEI number (where permitted), and device model, to
            enhance the security of our services and protect your data. This
            information is used to implement SIM and device binding
            mechanisms, which help ensure that your account or session is
            accessed only from a trusted device and SIM combination. By using
            our Services, you consent to this security feature. If you change
            your device or SIM card, additional verification may be required
            to continue accessing your account.
          </li>
        </ul>
        <p className="mb-4">
          We do not use any technologies for tracking or advertising purposes.
          All data is processed in accordance with applicable data protection
          laws, and we take appropriate technical and organizational measures
          to protect it from unauthorized access or misuse.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>
            <strong>Geographical Information:</strong> We may collect the
            geographical location of the User to help detect and prevent
            security-related issues, unauthorized access, or potential fraud.
            This information is used solely to enhance the security and
            integrity of our services. By using our services, you consent to
            the collection and use of location data for these security
            purposes.
          </li>
          <li>
            <strong>Aggregated Information:</strong> Anonymized and Aggregated
            information of Users is collected solely for the purpose of
            conducting service delivery related analytics and statistics,
            within the framework of Master Directions and the Digital Data
            Protection Act, 2023 and any other applicable laws, to enhance
            the quality and relevance of services provided. Such information
            is not used to identify or track information about individuals,
            but is used on anulfiltee level to enhance our services, improve
            the on-line experience, enhance your use of the Website, compile
            efficiency reports on online activity, provide other services
            relating to Website activity etc., within the framework of Master
            Directions, Digital Data Protection Act, 2023 and any other
            applicable laws. Company may collect such non-personal Information
            directly or use the services of a third party service provider
            such as Google Analytics, Adobe SiteCatalyst etc.
          </li>
        </ul>
        <p className="mb-4">
          In addition to the purposes as aforementioned, the above mentioned
          data is collected for the following purposes:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            To ulfil/complete your requests for the services offered,
            subscribed or availed by you on the Website.
          </li>
          <li>Respond to any inquiries posed by the User;</li>
          <li>
            To deliver to you any administrative notices, money alerts,
            advice, notifications and communications relevant to your use of
            services on the Website;
          </li>
          <li>To analyse Website usage and improve the services offered;</li>
          <li>
            Customization, administration etc. of the Website, location of
            errors, Website testing, data analysis for the Website etc;
          </li>
          <li>
            Provision of various services on the Website through Company and
            its partners;
          </li>
          <li>
            To protect integrity of the Website, improve our platform, prevent
            or detect fraud or abuse of our Website;
          </li>
          <li>
            To conduct analytical studies on various aspects including user
            behavior, user preferences etc.
          </li>
          <li>
            To trace computer resources of any person for the purposes of
            determining compliance with the provisions of the Information
            Technology Act, 2000 and / or any other law for the time being in
            force.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">DATA SHARING</h3>
        <p className="mb-4">
          Your encrypted data is securely processed through us strictly in
          accordance with the purpose for which you have provided consent. As
          an Account Aggregator, we operate on a consent-centric model and
          facilitate the sharing of your financial information solely between
          the FIP and the FIU, based on your explicit consent. Other than
          enabling this regulated and consent-driven data flow between FIPs
          and FIUs, we do not share your data with any third party. We do not
          sell, rent, or trade your data. Any other sharing occurs only with
          your explicit consent in certain limited circumstances as described
          below:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, restructuring, sale of assets or business, or
            insolvency, or partnerships to promote Account Aggregator services
            within the framework of applicable regulations and laws, your
            information may be transferred as part of the transaction. We will
            take reasonable steps to enjoin that the recipient of such
            information uses and protects your data in a manner consistent
            with this Privacy Policy. Any such third party will have the right
            to continue using your information as per the terms in place at
            the time of transfer.
          </li>
          <li>
            <strong>Government and Legal Obligations:</strong> We may disclose
            your information to government authorities or other third parties
            if required by applicable law, legal process, or pursuant to valid
            requests such as court orders, or government demands. This
            includes disclosures necessary to comply with legal obligations or
            protect our rights, interests, or safety, or those of our users or
            others.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">DATA RETENTION</h3>
        <p className="mb-4">
          We process your data in accordance with Applicable Regulations and
          Laws. The data is processed in infrastructure that meets
          industry-standard security practices and is located within India, as
          mandated by applicable regulations. All data is processed or
          temporarily stored within India, as required under the AA regulatory
          framework. Your data is retained only for the duration necessary to
          fulfil the purposes for which you have given consent and as long as
          you continue to avail our Services. If you choose to withdraw
          consent or stop using our Services, you may revoke your consents and
          delete your data, related to what is shared when you downloaded our
          application, through the "Delete Your Data" section of this Privacy
          Policy.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">PRIVACY CONTROLS</h3>
        <p className="mb-4">
          We believe in empowering you with full control over your data. To
          ensure transparency and control, we provide the following tools and
          mechanisms on our Website
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            <strong>Review Your Data:</strong> You can view the data you have
            shared with us, as well as financial data retrieved from the FIPs
            based on your consent. This information is accessible via your
            user dashboard on our Website.
          </li>
          <li>
            <strong>Delete Your Data:</strong> If you no longer wish to use our
            Services, you may choose to delete your data by sending a mail to
            helpdesk@onemoney.in. In furtherance to such action, any data
            retained will no longer be further processed in any manner and
            such data shall only be retained if the same is necessary for
            compliance with any Applicable Law, regulatory requirements and RBI
            Master Directions. Please note, however, that any data you have
            explicitly consented to share with FIUs or other regulated
            entities for a specific purpose is governed by their own Data
            Policies and Terms of Use. The Company is not responsible for
            deletion of data stored or processed by such FIUs or third
            parties.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          OPERATION AND TRANSFER OF DATA
        </h3>
        <p className="mb-4">
          The Company does not engage in cross-border transfer of personal
          data, nor does it share your data with internal departments or
          external third-party vendors outside of India. The only data sharing
          that occurs is the regulated and consent-based transfer between FIPs
          and FIUs, as per your explicit consent. Any future changes in our
          data transfer practices will be notified to you, and such changes
          will take effect only upon your review and consent.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">DATA SECURITY</h3>
        <p className="mb-4">
          In order to make every effort to ensure that your experience on the
          Website is secure, we use encryption technology to protect you
          against the loss, misuse or alteration of your personal information.
          When you fill out any contact forms or access your account, a secure
          server encrypts all of your information through the use of Secure
          Socket Layers (SSLs).
        </p>
        <p className="mb-4">
          Company follows the International Standard IS/ISO/IEC 27001 on
          &quot;Information Technology - Security Techniques - Information Security
          Management System – Requirements&quot; for ensuring protection of user
          Information in its possession.
        </p>
        <p className="mb-4">
          To be sure you&apos;re browsing secure pages for availing services
          rendered on the Website, check your Web browser&apos;s status bar
          (located at the bottom of the window) for the closed padlock icon.
          This icon appears in your web browser to tell you that you are
          viewing a secure web page. Also, all browsers display an "s" after
          the "http" (https://) in the Web site address to indicate that you
          are in a secure environment.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          CHANGES TO PRIVACY POLICY
        </h3>
        <p className="mb-4">
          We process your data based on the consent you expressly grant to us
          at the time we collect such data for a specified purpose. In case we
          change our Privacy Policy which further changes the way we process
          and manage your data, we will notify and give you an opportunity to
          review the revised Policy before you choose to proceed with our
          Services.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          GRIEVANCE REDRESSAL
        </h3>
        <p className="mb-4">
          In order to ensure compliance with these policies, Company has
          appointed a Grievance Redressal Officer to oversee all aspects of
          its privacy policies and practices. If you are dissatisfied with
          Company&apos;s privacy policies or practices, you should send a written
          request or complaint to the Grievance Redressal Officer at the
          address below.
        </p>
        <p className="mb-2">
          <strong>Grievance Redressal Officer</strong>
        </p>
        <p className="mb-0">
          Address: 3rd Floor Tower 40 The Loft, Nexity Hyderabad, Knowledge
          city Layout Raidurgam Village Serilingampally, Mandal, Hyderabad,
          Telangana, India, 500081.
        </p>
        <p className="mb-0">Phone: +91-40-6663-5679 or +91-90100-98899</p>
        <p className="mb-0">Email: helpdesk@onemoney.in</p>
        <p className="mb-4">Time: 10:30 am to 5:30 pm</p>

        <p className="mb-4">
          The Grievance Redressal Officer will investigate the matter and
          respond to your request within 30 (Thirty) days. In the event that
          you become aware that the information we have about you is incorrect,
          you should notify the Grievance Redressal Officer, who will ensure
          the information is updated. In case of a complaint, the Grievance
          Redressal Officer will take corrective action (if necessary) and
          will advise you of the steps taken to correct the problem. If you
          are still unsatisfied with the actions taken, you may be entitled to
          make a written complaint to the Data Protection Board under the
          Digital Personal Data Protection Act, 2023 and rules framed
          thereunder.
        </p>
      </>
    ),
  },
  {
    id: "terms-of-use",
    title: "Terms of Use",
    content: (
      <>
        <p className="mb-4 font-semibold dark:text-red-400">
          ACCESSING, BROWSING OR OTHERWISE USING THIS WEBSITE INDICATES YOUR
          AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE
          INCLUDING THE ELIGIBILITY, REGISTRATION, PAYMENT TERM; PRINCIPLES
          RELATED TO RIGHTS, OBLIGATIONS AND LAIBILITY OF COMPANY AND USER; THE
          GRIEVANCE REDRESSAL MECHANISM AS WELL AS THE TERMS OF PRIVACY SO
          PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
        </p>
        <p className="mb-4 font-semibold dark:text-red-400">
          IF YOU DO NOT AGREE WITH THESE "TERMS OF USE" PLEASE DO NOT USE THE
          WEBSITE. BY VISITING OR ACCESSING THE WEBSITE, YOU UNCONDITIONALLY
          ACCEPT, AND AGREE TO BE LEGALLY BOUND BY THE "TERMS OF USE", READ
          WITH THE PRIVACY POLICY AND / OR ANY OTHER APPLICABLE POLICY
          GOVERNING THE USE OF THE WEBSITE OR CONDUCT OF TRANSACTIONS ON THE
          WEBSITE.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">GENERAL</h3>
        <p className="mb-4">
          This Website (www.onemoney.in) is owned, operated and maintained by
          FinSec AA Solutions Private Limited (referred to as "FinSec",
          "Onemoney"), is registered as NBFC Account Aggregator by RBI,
          provides all AA services permitted under the applicable regulation
          and laws, and is a 100% subsidiary of the FinTech Products and
          Solutions Private Limited ("FinTech").
        </p>
        <p className="mb-4">
          Both provide independent solutions and FinTech has an arm's length
          relationship with its subsidiary Onemoney as permitted by laws and
          regulations. Reference to &quot;Company" in this document includes its
          subsidiary, Onemoney.
        </p>
        <p className="mb-4">
          Reference to the term "Website" in these Terms of Use shall include
          the mobile application "OneMoney", as the case may be, and / or any
          other software / application through which the User (a) accesses the
          Website, or (b) avails online services from Company.
        </p>
        <p className="mb-4">
          The terms "We" / "Us" / "Our" used in these "Terms of Use" refer to
          Company and the terms "You"/"Your"/"Yourself" document in these
          "Terms of Use" refer to the users of the Website ("Users"). The term
          "Users" in these Terms of Use shall include persons(s) who visit or
          access the Website, or avail any of its functionalities or use any
          data or information available on the Website in any manner.
        </p>
        <p className="mb-4">
          We are committed to complying with all Applicable Law(s) while
          collecting, processing, storing, and transferring your personal
          data. This includes adherence to the Master Direction – Non-Banking
          Financial Company – Account Aggregator (Reserve Bank) Directions,
          2016 ("Master Directions") as issued and updated by the Reserve Bank
          of India, and all other relevant laws, regulations, and guidelines
          in force from time to time, the Information Technology Act, 2000,
          the Information Technology (Reasonable security practices and
          procedures and sensitive personal data or information) Rules, 2011,
          the Digital Personal Data and Protection Act, 2023 and rules as
          amended from time to time.
        </p>
        <p className="mb-4">
          These "Terms of Use" have been published by the Company in
          accordance with Rule 3(1) of the Information Technology
          (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
          the Digital Personal Data Protection Act, 2023 and Master
          Directions for NBFC AA 2016 published by RBI.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">IMPORTANT TERMS</h3>
        <p className="mb-4">
          This "Terms of Use" document constitutes an "electronic contract"
          between Company and the User of the Website under the laws
          applicable to the User. This electronic record is generated by a
          computer system and does not require any physical or digital
          signatures.
        </p>
        <p className="mb-4">
          This "Terms of Use" document includes and shall always be deemed to
          include (a) the Privacy Policy; and (b) any other policy governing
          the use of the Website or conduct of transactions on the Website.
          Further, when You use any specific service provided by Us through
          the Website, You will be subject to the terms and conditions
          applicable to such service, and they shall be deemed to have been
          incorporated into these Terms of Use by reference, and shall be
          considered to be part and parcel of these Terms of Use.
        </p>
        <p className="mb-4">
          We reserve the right, at Our sole discretion, to change, modify,
          add or remove portions of these Terms of Use and we shall notify
          you of the same. It is Your responsibility to review these Terms of
          Use periodically for updates / changes. For certain changes, We may
          be required under Applicable Law to give You advance notice of any
          change(s) to the Terms of Use. Your continued use of the Website
          following the posting of changes will mean that You accept and agree
          to the revisions. As long as You comply with these Terms of Use, We
          grant You a personal, non-exclusive, non-transferable, limited
          privilege to enter and use the Website.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ABOUT THE WEBSITE</h3>
        <p className="mb-4">
          The Company Services allow you to retrieve your information which
          is available with different "Financial Information Providers"
          ("FIP") (i.e. Banks, Mutual Funds, NBFCs etc.) as per the Master
          Directions at one place on this Website.
        </p>
        <p className="mb-4">
          The provision of any or all the Services is subject to Applicable
          Laws of India. Outside of India, one or more of our services may
          not be available in any territory, if the provision of such service
          is barred by Applicable Law in the territory. Further, the
          provision of any or all of the Services is subject to the sole
          discretion of the Company and its availability on the Website.
          Please check our Website to confirm if any particular Services is
          available on our Website.
        </p>
        <p className="mb-4">
          You hereby authorize the Company to access your information from
          FIPs to provide Services to you in accordance with Applicable Laws.
          The said authorization also enables the Company to support products
          and/or services being offered to you through Company. Further,
          OneMoney may engage with other entities, including FinTech, to
          spread the concept of account aggregation, for consideration to be
          paid either in cash or in kind to FinTech or other entities,
          including but not limited to the latter providing their services to
          the customers of OneMoney using mobile number or email address or
          any other means permitted Applicable Laws.
        </p>
        <p className="mb-4">
          All data and other information retrieved by the Company from
          third-party sites is for informational purpose only and not for any
          trading or transactional purposes. In case you wish to carry out
          any transaction, you will be directed to the website of the
          respective Information Provider or other third-party website for
          carrying out such transaction.
        </p>
        <p className="mb-4">
          All data and other information provided by Company as part of the
          Services is on an "as is" and "as available" basis, as obtained
          from the FIPs, and Company does not assume any responsibility or
          provide any warranty with respect to such information. Further, all
          data or other information obtained from FIPs may be based on
          delayed feeds and may not reflect the real time / rates. Company
          shall not be responsible for any errors or delays in the data or
          information provided to Users as part of its Services or for any
          actions taken by Users in reliance thereon.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">CONSENT ARCHITECTURE</h3>
        <p className="mb-4">
          For providing information of a User, Company shall obtain consent
          of the User through a standardised consent artefact which may
          contain some or all of the following details:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Identity of the User and optional contact information;</li>
          <li>
            The nature of the financial information or other information
            requested;
          </li>
          <li>Purpose of collecting such information;</li>
          <li>the identity of the recipients of the information, if any;</li>
          <li>
            URL or other address to which notification needs to be sent every
            time the consent artefact is used to access information;
          </li>
          <li>
            Consent creation date, expiry date, identity and signature/
            digital signature;
          </li>
          <li>
            any other attribute as may be required by the Company or under
            Applicable Law.
          </li>
        </ul>
        <p className="mb-4">
          The Company shall share information collected from any User with
          the information user (IU) as expressly authorized by the User or
          with any credit or lending agency as may be permitted or required
          under Applicable Law. The information may be retrieved and
          downloaded on the User&apos;s own device or as directed by the User
          taken by the Company for aforesaid Services.
        </p>
        <p className="mb-4">
          The Users can at any point of time revoke all or any of their
          consent(s) given to the Company to obtain any information relating
          to the Users.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ELIGIBILITY</h3>
        <p className="mb-2">
          <strong>Competence to contract:</strong> Use of the Website is
          available only to those individuals and organizations who can form
          legally binding contracts under Applicable Law in their respective
          jurisdictions. Persons who are "incompetent to contract" as per
          Applicable Law in their jurisdictions are not eligible to use the
          Website. If you are a minor i.e. under the age of 18 years, you
          shall not register as a User of the Website and shall not use the
          Website. As a minor if you wish to use the Website, such use may
          be made by your legal guardian or parents on the Website. Company
          reserves the right to terminate your membership and / or refuse to
          provide you with access to the Website if it is brought to
          Company&apos;s notice or if it is discovered that you are under the age
          of 18 years.
        </p>
        <p className="mb-4">
          <strong>Authorization:</strong> In case You are registering as a
          business or a corporate entity, you represent that You are duly
          authorized by the business / corporate entity as applicable to
          accept this Agreement and You have the authority to bind that
          business / corporate entity to this Agreement.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">USER REGISTRATION</h3>
        <p className="mb-4">
          Company may require Users to fill an online form and register
          themselves on the Website to avail all or any of the services
          rendered on the Website. Company may require Users to provide all
          information, and submit all documents as may be required for
          registration of the User on Website or for availing any Service on
          the Website ("Registration Information").
        </p>
        <p className="mb-4">You agree to:</p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            provide true, accurate, correct and complete Registration
            Information; and
          </li>
          <li>
            maintain and promptly update the Registration Information to keep
            it true, accurate, current and complete. If you provide any
            information that is untrue, inaccurate, not current or
            incomplete, or if Company has reasonable grounds to suspect that
            such information is untrue, inaccurate, not current or
            incomplete, Company has the right to suspend or terminate any and
            all of your current or future use of the Services.
          </li>
        </ul>
        <p className="mb-4">
          Upon successful registration to use the Services and payment of
          Service Fee (if required) for Company or other services, your
          Account would be activated. For all services being availed You
          agree and understand that you will be solely responsible for
          maintaining the confidentiality of your credentials including
          password which, together with your login ID, allows you to access
          the Services.
        </p>
        <p className="mb-4">
          By providing us with your email address and mobile number, and any
          other personal information authorized or permitted by Applicable
          Laws and consented by you, you agree to receive all required
          notices and information electronically, on that email address or
          mobile number. It is your responsibility to update any changes to
          your email address and mobile number. If you become aware of any
          unauthorized use of your Registration Information, you agree to
          notify Company immediately at the customer service helpdesk, the
          details of which are available on the Website. Company shall not
          be liable for any unauthorized use or access, unless it is proved
          that the unauthorized use or access occurred solely due to reasons
          directly attributable to Company.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          DEVICE AND SIM DATA COLLECTION FOR SECURITY AND BINDING
        </h3>
        <p className="mb-4">
          To ensure secure access and protect your financial information,
          this platform collects specific device-level and SIM-related data
          as part of its SIM and device binding process. This is a mandatory
          security measure in alignment with regulatory and compliance
          standards under the Account Aggregator Framework. Please refer to
          our Privacy Policy on how we collect, use and process your data
          with respect to sim binding.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          CHARGES AND PAYMENT RELATED INFORMATION
        </h3>
        <p className="mb-2">
          <strong>Payment of Fees:</strong> The Company does not currently
          charge any fees for browsing or using the Website and Services.
          However, the Company reserves the right to introduce fees in the
          future for access to the Website, the Services as a whole, or
          specific features therein. If such fees are introduced, You agree
          to pay any applicable charges for the Services that You choose to
          use. The Company will make reasonable efforts to inform You in
          advance about the applicability and amount of any such fees. You
          further agree that the Company may, at its sole discretion,
          introduce, modify, or waive fees at any time. Your continued use
          of the Website and/or Services after the introduction or
          modification of any fees will constitute your acceptance of such
          changes and continued agreement to these Terms of Use.
        </p>
        <p className="mb-4">
          <strong>Provision of payment information:</strong> If and when the
          Company introduces paid Services on the Website, You agree to
          provide accurate and valid financial information—such as
          credit/debit card details or pre-paid payment instrument account
          details—exclusively through the Company's approved payment gateway.
          You shall not use any payment instrument that is not lawfully
          owned by You; all transactions must be conducted using payment
          methods registered in Your name. The financial information
          provided will be used solely for processing payments and will not
          be shared with third parties, except as required for fraud
          verification, by law, regulation, court order, or in accordance
          with the Company's Privacy Policy. You are solely responsible for
          maintaining the confidentiality and security of Your payment
          details. The Company expressly disclaims all liability for any
          unauthorized use of Your credit/debit card or pre-paid instrument
          account.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">USE OF WEBSITE</h3>
        <p className="mb-4">
          You agree, undertake and confirm that Your use of the Website
          shall be strictly governed by the following binding principles:
        </p>
        <p className="mb-4">
          You shall not host, display, upload, modify, publish, transmit,
          update or share any information which:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>belongs to another person and to which You do not have any right;</li>
          <li>
            is grossly harmful, harassing, blasphemous, defamatory, obscene,
            pornographic, paedophilic, libellous, invasive of another's
            privacy, hateful, or racially, ethnically objectionable,
            disparaging, relating or encouraging money laundering or
            gambling, or otherwise unlawful in any manner whatever; or
            unlawfully threatening or unlawfully harassing including but not
            limited to "indecent representation of women" within the meaning
            of the Indecent Representation of Women (Prohibition) Act, 1986;
          </li>
          <li>is misleading in any way;</li>
          <li>
            is patently offensive to the online community, such as sexually
            explicit content, or content that promotes obscenity,
            paedophilia, racism, bigotry, hatred or physical harm of any kind
            against any group or individual;
          </li>
          <li>harasses or advocates harassment of another person;</li>
          <li>
            involves the transmission of "junk mail", "chain letters", or
            unsolicited mass mailing or "spamming";
          </li>
          <li>
            promotes illegal activities or conduct that is abusive,
            threatening, obscene, defamatory or libelous;
          </li>
          <li>
            infringes upon or violates any third-party's rights [including,
            but not limited to, intellectual property rights, rights of
            privacy (including without limitation unauthorized disclosure of
            a person's name, email address, physical address or phone
            number) or rights of publicity];
          </li>
          <li>
            promotes an illegal or unauthorized copy of another person's
            copyrighted work (see "Copyright complaint" below for
            instructions on how to lodge a complaint about uploaded
            copyrighted material), such as providing pirated computer
            programs or links to them, providing information to circumvent
            manufacture-installed copy-protect devices, or providing pirated
            music or links to pirated music files;
          </li>
          <li>
            contains restricted or password-only access pages, or hidden
            pages or images (those not linked to or from another accessible
            page);
          </li>
          <li>
            provides material that exploits people in a sexual, violent or
            otherwise inappropriate manner or solicits personal information
            from anyone;
          </li>
          <li>
            provides instructional information about illegal activities such
            as making or buying illegal weapons, violating someone's privacy,
            or providing or creating computer viruses;
          </li>
          <li>
            contains video, photographs, or images of another person (with a
            minor or an adult);
          </li>
          <li>
            tries to gain unauthorized access or exceeds the scope of
            authorized access to the Website or to profiles, blogs,
            communities, account information, bulletins, friend request, or
            other areas of the Website or solicits passwords or personal
            identifying information for commercial or unlawful purposes from
            other users;
          </li>
          <li>
            engages in commercial activities and/or sales without Our prior
            written consent such as contests, sweepstakes, barter,
            advertising and pyramid schemes, or the buying or selling of
            "virtual" products related to the Website;
          </li>
          <li>
            solicits gambling or engages in any gambling activity which We,
            in Our sole discretion, believes is or could be construed as
            being illegal;
          </li>
          <li>
            interferes with another User's use and enjoyment of the Website
            or any other individual's User and enjoyment of similar
            services;
          </li>
          <li>
            refers to any website or URL that, in Our sole discretion,
            contains material that is inappropriate for the Website or any
            other website, contains content that would be prohibited or
            violates the letter or spirit of these Terms of Use;
          </li>
          <li>harms minors in any way;</li>
          <li>
            infringes any patent, trademark, copyright or other proprietary
            rights or third-party's trade secrets or rights of publicity or
            privacy or shall not be fraudulent or involve the sale of
            counterfeit or stolen products;
          </li>
          <li>violates any law for the time being in force;</li>
          <li>
            deceives or misleads the addressee/ Users about the origin of
            such messages or communicates any information which is grossly
            offensive or menacing in nature;
          </li>
          <li>impersonate another person;</li>
          <li>
            contains software viruses or any other computer code, files or
            programs designed to interrupt, destroy or limit the
            functionality of any computer resource; or contains any trojan
            horses, worms, time bombs, cancelbots, easter eggs or other
            computer programming routines that may damage, detrimentally
            interfere with, diminish value of, surreptitiously intercept or
            expropriate any system, data or personal information;
          </li>
          <li>
            threatens the unity, integrity, defence, security or sovereignty
            of any nation, friendly relations between nation states, or
            public order or causes incitement to the commission of any
            cognizable offence or prevents investigation of any offence or is
            insulting any other nation;
          </li>
          <li>is false, inaccurate or misleading;</li>
          <li>
            creates liability for Us or cause Us to lose (in whole or in
            part) the services of Our internet service provider ("ISPs") or
            other suppliers.
          </li>
        </ul>
        <p className="mb-4">
          You shall not use any "deep-link", "page-scrape", "robot",
          "spider" or other automatic device, program, algorithm or
          methodology, or any similar or equivalent manual process, to
          access, acquire, copy or monitor any portion of the Website or any
          content, or in any way reproduce or circumvent the navigational
          structure or presentation of the Website or any Content, to obtain
          or attempt to obtain any materials, documents or information
          through any means not purposely made available through the Website.
          We reserve Our right to bar any such activity.
        </p>
        <p className="mb-4">
          You shall not attempt to gain unauthorized access to any portion
          or feature of the Website, or any other systems or networks
          connected to the Website or to any server, computer, network, or
          to any of the services offered on or through the Website, by
          hacking, password "mining" or any other illegitimate means.
        </p>
        <p className="mb-4">
          You shall not probe, scan or test the vulnerability of the Website
          or any network connected to the Website nor breach the security or
          authentication measures on the Website or any network connected to
          the Website. You may not reverse look-up, trace or seek to trace
          any information on any other User of or visitor to Website, or any
          other customer, including any account on the Website not owned by
          You, to its source, or exploit the Website or any service or
          information made available or offered by or through the Website,
          in any way where the purpose is to reveal any information,
          including but not limited to personal identification or
          information, other than Your own information, as provided for by
          the Website.
        </p>
        <p className="mb-4">
          You shall not make any negative, denigrating or defamatory
          statement(s) or comment(s) about Us or the brand name or domain
          name used by Us including the terms Company, or otherwise engage
          in any conduct or action that might tarnish the image or
          reputation, of Company or sellers on platform or otherwise tarnish
          or dilute any Company's trade or service marks, trade name and/or
          goodwill associated with such trade or service marks, trade name
          as may be owned or used by us. You agree that You will not take
          any action that imposes an unreasonable or disproportionately
          large load on the infrastructure of the Website or Company's
          systems or networks, or any systems or networks connected to
          Company.
        </p>
        <p className="mb-4">
          You agree not to use any device, software or routine to interfere
          or attempt to interfere with the proper working of the Website or
          any transaction being conducted on the Website, or with any other
          person's use of the Website.
        </p>
        <p className="mb-4">
          You shall not forge headers or otherwise manipulate identifiers in
          order to disguise the origin of any message or transmittal You
          send to Us on or through the Website or any service offered on or
          through the Website. You may not pretend that You are, or that You
          represent, someone else, or impersonate any other individual or
          entity.
        </p>
        <p className="mb-4">
          You shall not use the Website or any content for any purpose that
          is unlawful or prohibited by these Terms of Use, or to solicit the
          performance of any illegal activity or other activity which
          infringes the rights of Company and / or others.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          OBLIGATIONS OF THE COMPANY
        </h3>
        <p className="mb-4">
          In accordance with the laws applicable to Services being provided,
          the Company agrees that:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            Company shall provide Services to You based on Your explicit
            consent;
          </li>
          <li>
            Company shall ensure that the provisions of Services to You is
            backed by appropriate agreements/ authorizations between Company,
            You and the information providers;
          </li>
          <li>
            Company shall share your information only with third parties as
            explicitly specified and consented by You;
          </li>
          <li>
            For offering Account Aggregator Services the Company shall
            strictly adhere to the NBFC AA Master Directions 2016
            specifically the Company shall not transfer your financial
            information except as per your explicit consent and no financial
            information relating to You which is accessed by Company shall
            reside with the Company . The services of a third-party service
            provider shall not be used for undertaking the business of
            Account Aggregation;
          </li>
          <li>
            Company shall not access Your user authentication credentials
            relating to accounts with various information providers;
          </li>
          <li>
            Company shall not part with any information that it may come to
            acquire from/on Your behalf except as per your explicit consent
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          INTELLECTUAL PROPERTY RIGHTS
        </h3>
        <p className="mb-4">
          The contents of the Website, including its "look and feel" (e.g.
          text, graphics, images, logos and button icons), photographs,
          editorial content, notices, software (including html-based
          computer programmes) and other material are the owned/licensed
          by/to Company and/or its Third-Party Service Providers/their
          licensors and are duly protected by them under applicable
          copyright, trademark and other laws. You acknowledge and agree
          that Company and/or its licensors or suppliers own all rights to
          this Website, the content displayed on the Website and any
          intellectual or proprietary property and/or technology (in any
          form) made available to you as a part of or in conjunction with
          the Services.
        </p>
        <p className="mb-4">
          You are only permitted to use any of the foregoing as expressly
          authorized by these Terms of Use, and otherwise, by the Services.
          You may download or print a copy of the information provided on
          this Website for your personal, internal and non-commercial use
          only. You shall not copy, re-print, reproduce (electronically or
          otherwise), distribute, or create derivative works from any
          content on the Website, in whole or in part, for any other
          purpose without our prior written consent. Further, you agree not
          to reverse engineer or reverse compile any technology associated
          with the Services, including but not limited to any software
          applications or Java applets associated with the Services Content,
          from the Website, in whole or in part.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ACCOUNTS WITH FIPs</h3>
        <p className="mb-4">
          By using the Services, you authorize Company to access FIP account
          websites designated by you, on your behalf, to retrieve account
          information requested by you and you hereby appoint Company as
          your agent for this limited purpose. You hereby represent to us
          and that you are a legal owner of the account(s) and have the
          authority to designate Company as your agent, use the Services and
          to give Company your passwords, user names and all other
          information you provide. The Services do not have the capability
          to initiate transactions affecting your financial accounts or
          provide notices or instructions affecting such financial accounts.
          Transactional and informational activities initiated by you at
          such sites are not made through the Services and we assume no
          responsibility for such activities.
        </p>
        <p className="mb-4">
          You are responsible for all charges associated with third-party
          accounts and agree to comply with the terms of those Services. For
          all purposes hereof, you hereby grant Company a limited power of
          attorney, and you hereby appoint Company as your true and lawful
          attorneys-in-fact and agents, with full power of substitution and
          re-substitution, for you and in your name, place and stead, in
          any and all capacities, to access third-party sites, retrieve
          information, and use your information, all as described above,
          with the full power and authority to do and perform each and every
          act and thing requisite and necessary to be done in connection
          with such activities, as fully to all intents and purposes as you
          might or could do in person. YOU ACKNOWLEDGE AND AGREE THAT WHEN
          THE COMPANY OR WEBSITE IS ACCESSING AND RETRIEVING INFORMATION
          FROM THIRD-PARTY FIP SITES, THE COMPANY OR WEBSITE IS ACTING AS
          YOUR AGENT, AND NOT THE AGENT ON BEHALF OF THE BANK/THIRD-PARTY.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          DISCLAIMER OF WARRANTIES
        </h3>
        <p className="mb-4">
          You expressly understand and agree that your use of the Services
          is at your sole risk. The Services are provided on an "as is" and
          "as available" basis. We expressly disclaim all warranties of any
          kind, whether express or implied, including, but not limited to
          the implied warranties of merchantability, fitness for a
          particular purpose and non-infringement.
        </p>
        <p className="mb-4">We make no warranty that:</p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>The Services will meet your requirements;</li>
          <li>
            The Services will be uninterrupted, timely, secure, or error-
            free;
          </li>
          <li>
            The results or information that may be obtained from the use of
            the Services will be accurate or reliable
          </li>
          <li>
            That your personal data used by you to access your third-party
            accounts through the Services will be protected in any manner
            whatsoever;
          </li>
          <li>Any errors in the technology will be corrected</li>
        </ul>
        <p className="mb-4">
          ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF
          THE SERVICES IS DONE AT YOUR OWN DISCRETION AND RISK AND WE ARE NOT
          RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA
          THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL. NO ADVICE OR
          INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR
          THROUGH OR FROM THE SERVICES WILL CREATE ANY WARRANTY NOT EXPRESSLY
          STATED IN THESE TERMS. TO THE EXTENT THAT ANY PART OF THIS SECTION
          IS NOT CONSISTENT WITH ANY OTHER PART OF THESE TERMS, THEN THIS
          SECTION WILL PREVAIL.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          LIMITATION OF LIABILITY
        </h3>
        <p className="mb-4">
          You agree that we will not be liable for any damage or loss
          either direct, indirect, incidental, special, consequential or
          exemplary, including, but not limited to, damages for loss of
          profits, goodwill, use, data or other intangible losses, even if
          we have been advised of the possibility of such damages, resulting
          from:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>The use or the inability to use the Services;</li>
          <li>
            Any products, data, information or service purchased or obtained
            or messages received through or from the Services;
          </li>
          <li>
            Unauthorized access use of your personal data used by you to
            access your third-party accounts;
          </li>
          <li>
            Alteration of your transmissions or data obtained from/stored in
            your third-party accounts;
          </li>
          <li>Statements or conduct of anyone on the Services; or</li>
          <li>Any other matter relating to the Services.</li>
        </ul>
        <p className="mb-4">
          Without prejudice to the generality of the foregoing, in case
          Company is held to be liable to for any damages under Applicable
          Law, then the liability of Company will be limited to fees or
          other consideration paid by the User for availing the Services
          from Company.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">INDEMNITY</h3>
        <p className="mb-4">
          You agree to indemnify and hold harmless the Company, its owners,
          licensees, affiliates, subsidiaries, group companies (as
          applicable) and their respective officers, directors, agents, and
          employees, from and against, any and all suits, actions and
          proceedings, claims, liabilities, losses, damages, costs and
          expenses, including reasonable outside attorneys' fees, arising
          directly or indirectly in connection with:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            Your violation of any law, regulation or order of any government
            or judicial authority; or
          </li>
          <li>
            any act, omission, fraud, negligence or default or the breach
            of any of Your obligations or representations under these Terms
            of Use or any other agreement / policy between You and the
            Company;
          </li>
          <li>
            any infringement of any intellectual property rights of the
            Company or any third-party.
          </li>
          <li>
            any infringement of any intellectual property right of the Other
            Party or any third-party.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          TERMINATION FOR VIOLATIONS
        </h3>
        <p className="mb-4">
          In case of any non-compliance or violation of these Terms of Use,
          Company has the right to immediately terminate the access or usage
          rights of the Users of the Website and remove any and all
          non-compliant information from the Website.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">GRIEVANCE OFFICER</h3>
        <p className="mb-4">
          Any complaint / grievance with respect to the Services or the
          Website may be submitted to the Principal Nodal Officer of the
          Company as per details provided below:
        </p>
        <p className="mb-2">
          <strong>Principal Nodal Officer</strong>
        </p>
        <p className="mb-0">Phone: +91-40-6663-5679 or +91-90100-98899</p>
        <p className="mb-0">Email: helpdesk@onemoney.in</p>
        <p className="mb-4">Time: 10:30 am to 5:30 pm</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">NOTICE</h3>
        <p className="mb-4">
          Company may provide You with notices and communications by e-mail,
          SMS, push notifications, regular mail or postings on the Website
          or by any other reasonable means. Except as otherwise set forth
          herein, any notice to Company must be sent by courier or
          registered mail and addressed to the Principal Nodal Officer as
          per details specified above.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">SEVERABILITY</h3>
        <p className="mb-4">
          If any provision of these Terms of Use is invalid, unenforceable
          or prohibited by law, then, these Terms of Use shall be considered
          divisible as to such provision and such provision shall be
          inoperative, and the remainder of these Terms of Use shall be
          valid, binding and of like effect as though such provision was not
          included herein. Company will substitute for the invalid or
          unenforceable provision a valid and legally enforceable
          provision, which achieves to the greatest extent possible the
          economic, legal and commercial objectives of the provision, which
          is invalid or unenforceable.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">WAIVER</h3>
        <p className="mb-4">
          No failure or delay by a party in exercising any right, power or
          remedy shall operate as a waiver thereof, nor shall any single or
          partial exercise of the same preclude any further exercise thereof
          or the exercise of any other right, power or remedy.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">DISCLAIMER</h3>
        <p className="mb-4">
          Data and information retrieved through the Services is for
          informational purposes only and is not intended for trading or
          transactional purposes. Company shall not be liable for any errors
          or delays in the content or information obtained through the
          Services, or for any actions taken in reliance thereon.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          GOVERNING LAW AND JURISDICTION
        </h3>
        <p className="mb-4">
          These Terms of Use, the Services and the relationship between You
          and Company shall be governed in accordance with the laws of
          India. You agree that all claims, differences and disputes
          arising under or in connection with or in relation hereto the
          Website, these Terms of Use, the Agreement(s) entered into on or
          through the Website or the relationship between You and Company
          shall be subject to the exclusive jurisdiction of the courts at
          Hyderabad.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">MISCELLANEOUS</h3>
        <p className="mb-4">
          "In case your query is not responded even after 30 days or
          resolved to your satisfaction then as per the RBI Regulation you
          can escalate the issue to RBI directly. Complaint may be lodged
          online with the RBI Ombudsman through the portal designed for the
          purpose (https://cms.rbi.org.in) by RBI in terms of the RBIOS
          Scheme 2021.
        </p>
      </>
    ),
  },
  {
    id: "customer-grievance",
    title: "Customer Grievance Redressal",
    content: (
      <>
        {/* Part 1: Summary of Policy and Review History Table */}
        <h3 className="text-xl font-semibold mt-6 mb-3">SUMMARY OF POLICY</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-slate-400 dark:border-slate-500">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200" colSpan={2}>Policy Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Policy Name</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Customer Grievance Redressal Policy Version 9.0</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Issue and Effective date</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">November 8th, 2024</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Periodicity of Review</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Annual</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Owner / Contact</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Compliance Department</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Approver</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Board of Directors</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-slate-400 dark:border-slate-500">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Date of Review</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Date of Next Review</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Comments/Remarks/Changes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">November 8th, 2024</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">November, 2025</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Annual Review</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">February 14<sup>th</sup> 2025</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">February 2025</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Revised the Policy on 14<sup>th</sup> February 2025 to incorporate a Standard Operating Procedure (SOP) for managing customer grievances.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Part 2: Preamble, Purpose, Definitions, Policy, Fair Practices, Grievance and Nodal Officer */}
        <h3 className="text-xl font-semibold mt-6 mb-3">PREAMBLE:</h3>
        <p className="mb-4">
          The Reserve Bank of India (“RBI”) vide Master Direction - Non-Banking Financial Company –
          Account Aggregator (Reserve Bank) Directions, 2016 (as amended from time to time) (“RBI
          Master Directions”), provide that every non-banking financial company undertaking the business
          of Account Aggregator shall put in place policy, duly approved by the Board of Directors of the
          Company, for handling/disposal of customer grievances/complaints (hereinafter referred to as the
          “Customer Grievance Policy” / “Policy”)<sup>1</sup>.
        </p>
        <p className="mb-4">
          The Board of Directors (the “Board”) of Finsec AA Solutions Private Limited (the “Company”
          or “OneMoney”), being a NBFC-AA has adopted the Customer Grievance Policy to ensure
          adherence to the terms of the NBFC-AA and ensure that Customers receive exemplary service
          across different touch points.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. PURPOSE:</h3>
        <p className="mb-4">
          This Policy intends to establish the importance of redressing Customer grievances and details
          complaint handling through structured grievance redressal framework. The Compliant
          mechanism adopted by the Company is supported by a review mechanism in order to minimize
          recurrence of complaints from the Customers.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. DEFINITIONS:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>“Board”</strong> means Board of Directors of the Company.</li>
          <li><strong>“Company”</strong> means Finsec AA Solutions Private Limited.</li>
          <li><strong>“Directors”</strong> means a Director appointed on the Board of the Company.</li>
          <li><strong>“FIU”</strong> means any entity registered with and regulated by any financial sector regulation.</li>
          <li><strong>“Policy”</strong> means Customer Grievance Redressal Policy.</li>
          <li><strong>“RBI”</strong> means Reserve Bank of India.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. POLICY:</h3>
        <h4 className="text-lg font-semibold mt-4 mb-2">4.1 The Company shall ensure to follow the following principles:</h4>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>The Customers are treated fairly;</li>
          <li>Complaints raised by the Customers are dealt in a timely manner as detailed in this Policy;</li>
          <li>
            Customers are informed of the avenues to escalate their complaints within the
            organization, and their rights if they are not satisfied with the resolution of their
            complaints;
          </li>
          <li>
            The Employees of the Company work in good faith and without prejudice, towards the
            interests of the Customers.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">5. FAIR PRACTICES</h3>
        <h4 className="text-lg font-semibold mt-4 mb-2">5.1. The Company shall abide by the principles and guidelines in “Guidelines on Fair Practices Code
        for NBFCs” as issued by the RBI and shall ensure to provide efficient service to the Customers
        with fairness and justice and shall be based on the following principles:</h4>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Efficiency in operations;</li>
          <li>Fairness and transparency in pricing;</li>
          <li>Responsiveness to feedback and grievances.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">6. GRIEVANCE AND NODAL OFFICER</h3>
        <p className="mb-4">
          Any complaint/grievance concerning the Services or the Website may be submitted to the
          Grievance/Nodal Officer of the Company as per details provided below:
        </p>
        <p className="mb-1"><strong>Name:</strong> Ms Usha Kiran</p>
        <p className="mb-1">
          <strong>Address:</strong> 3rd Floor, Tower 40, The Loft, Nexity Hyderabad, Knowledge City Layout, Raidurgam
          Village, Serilingampally Mandal, Hyderabad, Telangana, India, 500081
        </p>
        <p className="mb-1"><strong>Phone:</strong> +91-40-6663-5679 or +91-90100-98899</p>
        <p className="mb-1"><strong>Email:</strong> helpdesk@onemoney.in</p>
        <p className="mb-4"><strong>Time:</strong> 10:30 am to 5:30 pm</p>

        {/* Part 3: Escalation Matrix */}
        <h3 className="text-xl font-semibold mt-6 mb-3">7. ESCALATION MATRIX</h3>
        <p className="mb-4">
          The Complaint as submitted by the Customer to the Grievance/Nodal Officer shall be resolved by
          the Company in a timely manner. The Company has a stringent escalation matrix for the benefit
          of Customers and the FIUs Please find the escalation matrix along with the response timelines as
          below:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-slate-400 dark:border-slate-500">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Escalation Level</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Concerned Person</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Turn Around Time</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-slate-200">Contact Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Escalation Level 1</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Customer Support Team</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">1-5 days</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
                  <a href="mailto:helpdesk@onemoney.in" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500">
                    helpdesk@onemoney.in
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Escalation Level 2</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Engineering Head - G Bhoopal Reddy</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">6-15 days</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
                  <a href="mailto:bhoopal@onemoney.in" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500">
                    bhoopal@onemoney.in
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Escalation Level 3</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">CEO and Founder - Mr. Krishna Prasad Atluri</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">16-29 days</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
                  <a href="mailto:kp@onemoney.in" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500">
                    kp@onemoney.in
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Part 4: Grievance Resolution Process, Review of Policy */}
        {/* Section 8 is missing from the provided text, assuming it's a typo and jumping to 9 */}
        <h3 className="text-xl font-semibold mt-6 mb-3">9. GRIEVANCE RESOLUTION PROCESS</h3>
        <p className="mb-4">
          <strong>9.1.</strong> Grievance received from customers that require technical assistance is managed and responded by
          creating a ticket in JIRA portal. The Tech support team of the Company as mentioned in the
          Escalation Matrix will add the comments on the ticket. Further, the Customer support team will
          respond to the Customers based on the inputs received from the Tech Support team. Incase further
          assistance is requested from the customer then the same is again reverted internally, otherwise the
          said grievance will be treated as closed.<sup>2</sup>
        </p>

        <h4 className="text-lg font-semibold mt-4 mb-2">9.2. Status of Grievances:</h4>
        <p className="mb-2">
          <strong>9.2.1. Awaiting Customer Response:</strong> The details provided by the Customer are insufficient to address
          the query or compliant as raised by them. In such cases, the Company requests the customer to
          share additional information for further investigation. For instance, the customer mentioned they
          are unable to discover their bank account, but no details such as the bank name, Onemoney
          registered mobile number, etc., have been provided.
        </p>
        <p className="mb-2">
          <strong>9.2.2. Internal Response:</strong> As per the query, the Customer support team reviews the logs and provide
          feedback. For example, if the customer is unable to discover their bank account on Onemoney,
          checks the response received from the bank.
        </p>
        <p className="mb-2">
          <strong>9.2.3. External Response:</strong> Onemoney has raised a grievance with the FIP and is awaiting a reply. For
          example, if the customer confirms having an active account but the FIP returns a &quot;no accounts
          found&quot; response, we have sent the grievance details to the FIPs SPOC for further investigation.
        </p>
        <p className="mb-4">
          <strong>9.2.4. Closed Response:</strong> Upon confirmation received from Customer the grievance raised is closed or if
          the Customer Support Team does not receive a response after follow-ups from the Customer then
          the said Grievance is closed.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">10. REVIEW OF THE POLICY</h3>
        <p className="mb-2">
          <strong>10.1.</strong> The Policy shall be amended or modified with approval of the Board. The Policy shall be reviewed
          by the Board on an annual basis. Consequent upon any amendments in RBI Master Directions or
          any change in the position of the Company, necessary changes in this Policy shall be incorporated
          and approved by the Board.
        </p>
        <p className="mb-4">
          <strong>10.2.</strong> Notwithstanding anything contained in this Policy, in case of any contradiction of the provision of
          this Policy with any existing legislations, rules, regulations, laws or modification thereof or
          enactment of a new applicable law, the provisions under such law, legislation, rules, regulation or
          enactment shall prevail over this Policy.
        </p>

        {/* Footnotes and Company details - combining them at the end */}
        <hr className="my-6" />
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <p>
            <sup>1</sup> An account aggregator shall have in place a Board approved policy for handling/ disposal of customer grievances/ complaints.
            It shall have a dedicated set-up to address customer grievances/ complaints (Regulation 11 of Master Direction - Non-Banking
            Financial Company - Account Aggregator (Reserve Bank) Directions, 2016).
          </p>
          <p>
            <sup>2</sup> NBFCs covered under the Reserve Bank – Integrated Ombudsman Scheme, 2021 (RBIOS, 2021) shall comply with the
            directions provided under the said Scheme (Regulation 12, of Master Direction - Non-Banking Financial Company - Account
            Aggregator (Reserve Bank) Directions, 2016).
          </p>
        </div>
        <div className="mt-4 text-xs text-slate-600 dark:text-slate-400">
          <p className="mb-0 font-semibold">Finsec AA Solutions Private Limited</p>
          <p className="mb-0">CIN: U74999TG2016PTC113115</p>
          <p className="mb-0">
            3rd Floor, Tower 40, The Loft, Nexity Hyderabad, Knowledge City Layout, Raidurgam Village,
            Serilingampally Mandal, Hyderabad, Telangana, India, 500081
          </p>
        </div>
      </>
    ),
  },
];

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<string>(policyTabsData[0].id);
  const tabsContainerRef = useRef<HTMLDivElement>(null); // For potential future use like auto-scroll

  const currentTabContent = policyTabsData.find(tab => tab.id === activeTab);

  return (
    <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Our Policies</span>
          </h1>
          <p className=" mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
            Review our policies regarding privacy, terms of use, and customer grievances.
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex justify-center mb-8">
          <div 
            ref={tabsContainerRef}
            className="flex overflow-x-auto py-2 space-x-2 sm:space-x-2 sm:dark:bg-slate-700/80 sm:p-1.5 sm:rounded-lg sm:bg-slate-100/80 sm:backdrop-blur-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {policyTabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm sm:text-base font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none whitespace-nowrap 
                  ${activeTab === tab.id 
                    ? "bg-white border border-slate-200 dark:border-neutral-700 dark:bg-slate-800 text-slate-700 dark:text-sky-400 shadow-md" 
                    : "text-slate-600 dark:text-slate-300 border border-transparent hover:bg-slate-200/70 dark:hover:bg-slate-700/70 sm:hover:bg-slate-200 sm:dark:hover:bg-slate-600"
                  }
                  sm:px-5 
                `}
              >
                {tab.title}
              </button>
            ))}
              </div>
        </div>

        {/* Tab Content Area */}
        {currentTabContent && (
          <motion.div
            key={activeTab} // Ensures animation runs on tab change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-background/20 dark:bg-slate-800/50 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-slate-200 dark:border-neutral-700 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 pb-4 mb-6 border-b border-slate-300 dark:border-neutral-600">
              {currentTabContent.title}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {/* Placeholder for actual policy content for the active tab */}
              {/* You will replace this with the actual detailed content for each policy later */}
              {currentTabContent.content} 
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 