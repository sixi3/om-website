import React from "react";
import { TiltCard } from "../components/ui/tilt-card";
import { GridBackground } from "../components/ui/grid-background";


// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

export default function PoliciesPage() {
  return (
    <main className="relative w-full pb-12 md:pb-16 overflow-hidden">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">


        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Privacy Policy</span>
          </h1>
          <p className="mx-auto text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
            Review our privacy policy and data protection practices.
          </p>
        </div>

        {/* Policy Content */}
        <TiltCard className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50">
          <div className="relative z-20 text-foreground/90">
            <div className="prose prose-slate dark:prose-invert max-w-none">
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

              {/* POSH Policy Content Starts Here */}
              <hr className="my-8 border-slate-300 dark:border-neutral-600" />
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-6">
                Policy on Prevention of Sexual Harassment (POSH)
              </h3>
              <p className="mb-4">
                <strong>1.</strong> The Anti-Sexual Harassment Policy ("Policy") applies to all the employees in whichever role and capacity, contract workers, consultants engaged with Fintech Products and Solutions India Pvt Ltd ("Company").
              </p>
              <p className="mb-4">
                <strong>2.</strong> This Policy has been prepared in accordance with the requirements of 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013' as well as the Company's outlook, in order to prevent and prohibit incidences of Sexual Harassment at the Workplace. This Policy provides a fair and transparent redressal mechanism for instances of Sexual Harassment against individuals at the Workplace. We value every individual and are committed to protect the dignity and respect of every individual. Integrity, honesty, transparency and respect for people remain some of our core values. Therefore, we have zero-tolerance for sexual harassment and any other harassment, and reports of any act of sexual or other harassment will invite serious disciplinary action and breach of this Policy.
              </p>
              <p className="mb-4">
                <strong>3.</strong> For the purpose of this Policy:
              </p>
              <ul className="list-none pl-5 mb-4 space-y-2">
                <li className="mb-2">
                  (i) "Workplace" shall mean and include any and all offices, work areas, restaurant, kitchens, common areas of the buildings where the work spaces of the Company are located, as well as any place visited by any employee of the Company during the course of such employee's employment with the Company, including but not limited to, transportation provided by the Company.
                </li>
                <li>
                  (ii) "Employee" shall mean and include all employees in whichever role and capacity, including contract workers, full-time employees, part time employees, restaurant staff, kitchen staff and consultants.
                </li>
              </ul>
              <p className="mb-4">
                <strong>4.</strong> This Policy aims to ensure the safety of all the Employees to its best capacity. Behavior which involves physical verbal, written, graphic emotional or through gestures that offends intentionally or not, and offends the dignity and morality of a person to which the behavior is directed by fellow Employees, supervisors, customers and/or suppliers will be considered Sexual Harassment and shall invite serious disciplinary action or other action as necessary, as described in more detail below under this Policy. This Policy provides a fair and transparent redressal mechanism for instances of Sexual Harassment against individuals at the Workplace.
              </p>
              <p className="mb-4">
                <strong>5.</strong> This policy is applicable to all 'Members' of the Company, which for the purpose of this policy shall include all founders, board of directors, permanent and temporary employees, probationers, trainees, consultants, secondees, contract workers or interns working at the Company's offices.
              </p>
              <p className="mb-4">
                <strong>6.</strong> "Sexual Harassment" for the purposes of this Policy includes sexually determined behavior/conduct towards an employee whether implied or direct such as:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Physical contact and advances;</li>
                <li>Requests/demands for sexual favours;</li>
                <li>Sexually-colored remarks;</li>
                <li>Showing pornography; or</li>
                <li>any other unwelcome physical, verbal or non-verbal conduct of sexual nature.</li>
              </ul>
              <p className="mb-4">
                where submission to or rejection of such behaviour/conduct is made, explicitly or implicitly, an adverse consequence in relation to an individual's chances of being recruited, promoted, transferred, pay benefits, or a term or condition thereof; or such behaviour/conduct directed against an employee persists despite its rejection; or such conduct has the purpose or effect of unreasonably interfering with an employee's professional performance by, implicit or explicit, promise of preferential treatment, threat of detrimental treatment in an individual's employment; or such conduct has the purpose or effect of threatening an employee's present or future employment status; or such conduct has the purpose or effect of creating what a reasonable person would view as an intimidating or offensive or hostile environment; or such conduct has the purpose or effect of humiliating treatment likely to affect an employee's health or safety.
              </p>
              <p className="mb-4">
                <strong>7.</strong> Examples of actions which tantamount to Sexual Harassment:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Unwelcome sexual advances: These include patting, pinching, brushing up against, winking, hugging, kissing, fondling, or any other similar physical contact considered unwelcome by an individual.</li>
                <li>Requests/ demands for sexual favours: These include subtle or blatant pressures or requests for any type of sexual favours accompanied by an implied or stated promise of preferential treatment or negative consequence concerning an individual's employment status.</li>
                <li>Sexually-colored remarks: These include verbal abuses and/or jokes that are of a sexual nature and considered unwelcome by an individual. For example, comments about an individual's body or appearance where such comments are beyond mere courtesy, telling 'dirty jokes' that are clearly unwelcome and considered offensive by others or any other tasteless, sexually-oriented comments, innuendoes or actions that offend others.</li>
              </ul>
              <p className="mb-4">
                <strong>8.</strong> In addition to the above, determining what constitutes Sexual Harassment depends upon the facts and circumstances, and the context. Sexual Harassment may take many forms - subtle and indirect, or blatant and overt. For example:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>it may be conduct towards an individual of the opposite sex or the same sex;</li>
                <li>it may occur between peers or between individuals in a hierarchical relationship;</li>
                <li>it may be aimed at coercing an employee to participate in an unwanted sexual relationship or it may have the effect of causing an employee to change behaviour or work performance;</li>
                <li>it may consist of repeated action or may even arise from a single incident, if sufficiently flagrant.</li>
              </ul>
              <p className="mb-4">
                <strong>9.</strong> For the protection of all of the Company's employees, the Company seeks to prevent sexual harassment at the Workplace. All employees of the Company are responsible for helping ensure that our Workplace is kept free of sexual harassment.
              </p>
              <p className="mb-4">
                <strong>10. Internal Complaints Committee:</strong> The Company has constituted a Sexual Harassment Internal Complaints Committee ("Committee") in accordance with applicable law. The Committee shall deal with all complaints and allegations of Sexual Harassment in the Workplace. The Company shall regularly and promptly notify the employees of any changes in the constitution of the Committee.
              </p>
              <p className="mb-4">
                <strong>11.</strong> Any employee may act on concerns about Sexual Harassment at the Workplace by making a written complaint of the sexual harassment to the Presiding Officer listed above within 3 months of the incident or the last of the series of incidents, describing the unwelcome behaviour and its effect (or such extended time not exceeding further 3 months, if the Presiding Officer is satisfied of circumstances that prevented the complainant from filing the complaint within the initial 3 month period). The complaint, the identity of the complainant, and the proceedings of the Committee shall be kept confidential. In case the complainant is unable to file the complaint in writing for any reason, the complainant shall approach the Presiding Officer or any other member of the Committee who shall assist the complainant in filing the formal complaint. Further, in case the complainant is unable to make a complaint due to incapacity or death, the complainant's legal heir may make a complaint in accordance with this paragraph. The complaint, the identity of the complainant, and the proceedings of the Committee shall be kept confidential, and the Committee shall proceed in accordance with applicable law. Appropriate action shall be taken as per law if the allegations in the complaint are found to be true, including: (i) action for sexual harassment as misconduct under the rules of employment, (ii) impose permitted monetary penalties, and (iii) assistance to the complainant in taking up the matter with the law enforcement/police authorities. If the Committee finds after following its procedure that the complaint does not have any merit, the Committee shall recommend to the management not to take any action. On the other hand, if the Committee finds that the complainant has been made by the complainant maliciously knowing the allegation to be false, the Committee shall recommend to the management to take action against the complainant.
              </p>
              <p className="mb-4">
                <strong>12.</strong> If you have witnessed Sexual Harassment at the Workplace, you are urged to report the incident so that prompt action may be taken. All complaints will be treated seriously and investigated fully. The Company expressly forbids any retaliation against employees for reporting sexual harassment.
              </p>
              <p className="mb-4">
                <strong>13.</strong> During the pendency of the inquiry, the Internal Committee may, at its discretion, recommend any interim measures as it deems necessary (including a recommendation that the accused be placed on suspension).
              </p>
              <p className="mb-4">
                <strong>14. Disciplinary Action:</strong> In the event a Member is found to be guilty and outcome of sexual harassment, or of filing a false and malicious complaint, or giving false evidence during the inquiry, he/ she will be subject to disciplinary action as recommended by the Committee. Such disciplinary action may include, training/ counselling, written or verbal warning, withholding increment, bonus or promotion, suspension of employment without pay, termination of the employment with the Company or such other action as the Committee may deem appropriate.
              </p>
              <p className="mb-4">
                <strong>15. Third Party Harassment:</strong> If any Member has been subject to sexual harassment during the course of work for the Company by any third party, including visitors, clients, etc., the Company will take appropriate remedial measures, including, assisting the Member to raise a complaint with the accused's employer.
              </p>
              <p className="mb-4">
                <strong>16. Members' Responsibilities</strong>
              </p>
              <ul className="list-none pl-5 mb-4 space-y-2">
                <li className="mb-2">
                  (a) All Members must read and abide by the Policy, attend trainings and speak to the Human Members Department or the Committee, when they have questions.
                </li>
                <li className="mb-2">
                  (b) Everyone is responsible for reporting concerns about sexual harassment in a timely fashion. Any Member who becomes aware of possible sexual harassment of another person must encourage the harassed party to inform the Committee. You may also contact HR, your reporting supervisor, or the Board of Directors to raise concerns. They will forward this information to the HR. Please note that a formal complaint and the related process will commence only when the complaint is filed with the Committee by the aggrieved person or the aggrieved person has provided his/ her consent to initiate a formal investigation.
                </li>
                <li className="mb-2">
                  (c) The Company respects the privacy of all Members. Accordingly, complaints of sexual harassment and any resolution of the same will be kept confidential, to the extent possible. Violations of confidentiality can result in disciplinary action, up to and including termination.
                </li>
                <li>
                  (d) The Company also prohibits retaliation against anyone for making a good faith report regarding sexual harassment, assisting in making a sexual harassment complaint, or cooperating in a sexual harassment inquiry. Anyone found guilty of retaliatory behaviour will be subject to disciplinary action, up to and including termination.
                </li>
              </ul>
              <p className="mb-4">
                <strong>17. Other Discriminatory Harassment:</strong> The Company strongly supports the rights of all its Members to work in an environment free from all forms of harassment, including harassment on the basis of race, colour, religion, gender, sexual orientation, national origin, age or disability. Harassing conduct includes, but is not limited to:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Epithets;</li>
                <li>Negative stereotyping;</li>
                <li>Slurs;</li>
                <li>Threatening, intimidating or hostile acts that relate to the above characteristics;</li>
                <li>Written or graphic material that denigrates or shows hostility or aversion toward an individual or group because of the above characteristics, and that is placed on walls, bulletin boards, or elsewhere on the premises, or circulated in the workplace.</li>
              </ul>
              <p className="mb-4">
                <strong>18.</strong> In compliance with the Ministry of Women and Child Development's Notification dated 9th December, 2013 under S.O. 3606(E), the Company prohibits harassment of any kind. If the result of an investigation indicates that corrective action is called for, such action may include disciplinary measures up to and including immediate termination of the employment of the offender.
              </p>
              <p className="mb-4">
                <strong>19.</strong> The Head of the Human Resources Department may be contacted for any queries or clarifications about this Policy, its implementation and the general rights or remedies of an employee under this Policy.
              </p>
            </div>
          </div>
        </TiltCard>
      </div>
    </main>
  );
} 