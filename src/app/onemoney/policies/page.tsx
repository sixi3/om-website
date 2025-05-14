import React from "react";
import { TiltCard } from "../components/ui/tilt-card";
import { GridBackground } from "../components/ui/grid-background";

// Define metallic black class (consider moving to shared lib later)
const metallicBlackTextClasses = "font-bold bg-gradient-to-b from-neutral-600 to-neutral-950 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

const policiesContent = [
  {
    id: 1,
    title: "1. Customer Grievance Policy / Customer Redressal",
    body: (
      <p>
        {/* TODO: Add content for Customer Grievance Policy */}
        Detailed content for the Customer Grievance Policy / Customer Redressal to be added here.
      </p>
    ),
  },
  {
    id: 2,
    title: "2. Terms & Conditions for End Users",
    body: (
      <p>
        {/* TODO: Add content for Terms & Conditions for End Users */}
        Detailed content for the Terms & Conditions for End Users to be added here.
      </p>
    ),
  },
  {
    id: 3,
    title: "3. POSH Policy (The Anti-Sexual Harassment Policy)",
    body: (
      <>
        <p className="mb-2">
          <strong>1. Applicability:</strong> The Anti-Sexual Harassment Policy (“Policy”) applies to all employees in whichever role and capacity, contract workers, consultants engaged with <strong>Fintech Products and Solutions India Pvt Ltd (“Company”).</strong>
        </p>
        <p className="mb-2">
          <strong>2. Purpose:</strong> This Policy has been prepared in accordance with the requirements of ‘The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013’ as well as the Company’s outlook, in order to prevent and prohibit incidences of Sexual Harassment at the Workplace. This Policy provides a fair and transparent redressal mechanism for instances of Sexual Harassment against individuals at the Workplace. We value every individual and are committed to protect the dignity and respect of every individual. Integrity, honesty, transparency and respect for people remain some of our core values. Therefore, we have zero-tolerance for sexual harassment and any other harassment, and reports of any act of sexual or other harassment will invite serious disciplinary action and breach of this Policy.
        </p>
        <p className="mb-2">
          <strong>3. Definitions:</strong>
          <br />
          i) <strong>“Workplace”</strong> shall mean and include any and all offices, work areas, restaurant, kitchens, common areas of the buildings where the work spaces of the Company are located, as well as any place visited by any employee of the Company during the course of such employee’s employment with the Company, including but not limited to, transportation provided by the Company.
          <br />
          ii) <strong>“Employee”</strong> shall mean and include all employees in whichever role and capacity, including contract workers, full-time employees, part time employees, restaurant staff, kitchen staff and consultants.
        </p>
        <p className="mb-2">
          <strong>4. Aim:</strong> This Policy aims to ensure the safety of all the Employees to its best capacity. Behavior which involves physical verbal, written, graphic emotional or through gestures that offends intentionally or not, and offends the dignity and morality of a person to which the behavior is directed by fellow Employees, supervisors, customers and/or suppliers will be considered Sexual Harassment and shall invite serious disciplinary action or other action as necessary, as described in more detail below under this Policy. This Policy provides a fair and transparent redressal mechanism for instances of Sexual Harassment against individuals at the Workplace.
        </p>
        <p className="mb-2">
          <strong>5. Scope:</strong> This policy is applicable to all ‘Members’ of the Company, which for the purpose of this policy shall include all founders, board of directors, permanent and temporary employees, probationers, trainees, consultants, secondees, contract workers or interns working at the Company’s offices.
        </p>
        <p className="mb-2">
          <strong>6. Definition of Sexual Harassment:</strong> “Sexual Harassment” for the purposes of this Policy includes sexually determined behavior/conduct towards an employee whether implied or direct such as:
          <br />
          · Physical contact and advances;
          <br />
          · Requests/demands for sexual favours;
          <br />
          · Sexually-coloured remarks;
          <br />
          · Showing pornography; or
          <br />
          · any other unwelcome physical, verbal or non-verbal conduct of sexual nature.
          <br />
          where submission to or rejection of such behaviour/conduct is made, explicitly or implicitly, an adverse consequence in relation to an individual’s chances of being recruited, promoted, transferred, pay benefits, or a term or condition thereof; or such behaviour/conduct directed against an employee persists despite its rejection; or such conduct has the purpose or effect of unreasonably interfering with an employee\'s professional performance by, implicit or explicit, promise of preferential treatment, threat of detrimental treatment in an individual’s employment; or such conduct has the purpose or effect of threatening an employee’s present or future employment status; or such conduct has the purpose or effect of creating what a reasonable person would view as an intimidating or offensive or hostile environment; or such conduct has the purpose or effect of humiliating treatment likely to affect an employee’s health or safety.
        </p>
        <p className="mb-2">
          <strong>7. Examples of Actions which Tantamount to Sexual Harassment:</strong>
          <br />
          · <strong>Unwelcome sexual advances:</strong> These include patting, pinching, brushing up against, winking, hugging, kissing, fondling, or any other similar physical contact considered unwelcome by an individual.
          <br />
          · <strong>Requests/ demands for sexual favours:</strong> These include subtle or blatant pressures or requests for any type of sexual favours accompanied by an implied or stated promise of preferential treatment or negative consequence concerning an individual’s employment status.
          <br />
          · <strong>Sexually-colored remarks:</strong> These include verbal abuses and/or jokes that are of a sexual nature and considered unwelcome by an individual. For example, comments about an individual’s body or appearance where such comments are beyond mere courtesy, telling ‘dirty jokes’ that are clearly unwelcome and considered offensive by others or any other tasteless, sexually-oriented comments, innuendoes or actions that offend others.
        </p>
        <p className="mb-2">
          <strong>8. Context Matters:</strong> In addition to the above, determining what constitutes Sexual Harassment depends upon the facts and circumstances, and the context. Sexual Harassment may take many forms - subtle and indirect, or blatant and overt. For example:
          <br />
          · it may be conduct towards an individual of the opposite sex or the same sex;
          <br />
          · it may occur between peers or between individuals in a hierarchical relationship;
          <br />
          · it may be aimed at coercing an employee to participate in an unwanted sexual relationship or it may have the effect of causing an employee to change behaviour or work performance;
          <br />
          · it may consist of repeated action or may even arise from a single incident, if sufficiently flagrant.
        </p>
        <p className="mb-2">
          <strong>9. Prevention:</strong> For the protection of all of the Company’s employees, the Company seeks to prevent sexual harassment at the Workplace. All employees of the Company are responsible for helping ensure that our Workplace is kept free of sexual harassment.
        </p>
        <p className="mb-2">
          <strong>10. Internal Complaints Committee:</strong> The Company has constituted a Sexual Harassment Internal Complaints Committee (the "Committee") in accordance with applicable law. The Committee shall deal with all complaints and allegations of Sexual Harassment in the Workplace. The Company shall regularly and promptly notify the employees of any changes in the constitution of the Committee.
        </p>
        <p className="mb-2">
          <strong>11. Complaint Procedure:</strong> Any employee may act on concerns about Sexual Harassment at the Workplace by making a written complaint of the sexual harassment to the Presiding Officer listed above within 3 months of the incident or the last of the series of incidents, describing the unwelcome behaviour and its effect (or such extended time not exceeding further 3 months, if the Presiding Officer is satisfied of circumstances that prevented the complainant from filing the complaint within the initial 3 month period). The complaint, the identity of the complainant, and the proceedings of the Committee shall be kept confidential. In case the complainant is unable to file the complaint in writing for any reason, the complainant shall approach the Presiding Officer or any other member of the Committee who shall assist the complainant in filing the formal complaint. Further, in case the complainant is unable to make a complaint due to incapacity or death, the complainant\'s legal heir may make a complaint in accordance with this paragraph. <strong>The complaint, the identity of the complainant, and the proceedings of the Committee shall be kept confidential, and the Committee shall proceed in accordance with applicable law.</strong> Appropriate action shall be taken as per law if the allegations in the complaint are found to be true, including: (i) action for sexual harassment as misconduct under the rules of employment, (ii) impose permitted monetary penalties, and (iii) assistance to the complainant in taking up the matter with the law enforcement/police authorities. If the Committee finds after following its procedure that the complaint does not have any merit, the Committee shall recommend to the management not to take any action. On the other hand, if the Committee finds that the complaint has been made by the complainant maliciously knowing the allegation to be false, the Committee shall recommend to the management to take action against the complainant.
        </p>
        <p className="mb-2">
          <strong>12. Reporting by Witnesses:</strong> If you have witnessed Sexual Harassment at the Workplace, you are urged to report the incident so that prompt action may be taken. All complaints will be treated seriously and investigated fully. The Company expressly forbids any retaliation against employees for reporting sexual harassment.
        </p>
        <p className="mb-2">
          <strong>13. Interim Measures:</strong> During the pendency of the inquiry, the Internal Committee may, at its discretion, recommend any interim measures as it deems necessary (including a recommendation that the accused be placed on suspension).
        </p>
        <p className="mb-2">
          <strong>14. Disciplinary Action:</strong> In the event a Member is found to be guilty and outcome of sexual harassment, or of filing a false and malicious complaint, or giving false evidence during the inquiry, he/ she will be subject to disciplinary action as recommended by the Committee. Such disciplinary action may include, training/ counselling, written or verbal warning, withholding increment, bonus or promotion, suspension of employment without pay, termination of the employment with the Company or such other action as the Committee may deem appropriate.
        </p>
        <p className="mb-2">
          <strong>15. Third Party Harassment:</strong> If any Member has been subject to sexual harassment during the course of work for the Company by any third party, including visitors, clients, etc., the Company will take appropriate remedial measures, including, assisting the Member to raise a complaint with the accused\'s employer.
        </p>
        <p className="mb-2">
          <strong>16. Members\' Responsibilities:</strong>
          <br />
          (a) All Members must read and abide by the Policy, attend trainings and speak to the Human Members Department or the Committee, when they have questions.
          <br />
          (b) Everyone is responsible for reporting concerns about sexual harassment in a timely fashion. Any Member who becomes aware of possible sexual harassment of another person must encourage the harassed party to inform the Committee. You may also contact HR, your reporting supervisor, or the Board of Directors to raise concerns. They will forward this information to the HR. Please note that a formal complaint and the related process will commence only when the complaint is filed with the Committee by the aggrieved person or the aggrieved person has provided his/ her consent to initiate a formal investigation.
          <br />
          (c) The Company respects the privacy of all Members. Accordingly, complaints of sexual harassment and any resolution of the same will be kept confidential, to the extent possible. Violations of confidentiality can result in disciplinary action, up to and including termination.
          <br />
          (d) The Company also prohibits retaliation against anyone for making a good faith report regarding sexual harassment, assisting in making a sexual harassment complaint, or cooperating in a sexual harassment inquiry. Anyone found guilty of retaliatory behaviour will be subject to disciplinary action, up to and including termination.
        </p>
        <p className="mb-2">
          <strong>17. Other Discriminatory Harassment:</strong> The Company strongly supports the rights of all its Members to work in an environment free from all forms of harassment, including harassment on the basis of race, colour, religion, gender, sexual orientation, national origin, age or disability. Harassing conduct includes, but is not limited to:
          <br />
          · Epithets;
          <br />
          · Negative stereotyping;
          <br />
          · Slurs;
          <br />
          · Threatening, intimidating or hostile acts that relate to the above characteristics;
          <br />
          · Written or graphic material that denigrates or shows hostility or aversion toward an individual or group because of the above characteristics, and that is placed on walls, bulletin boards, or elsewhere on the premises, or circulated in the workplace.
        </p>
        <p className="mb-2">
          <strong>18. Compliance with Ministry Notification:</strong> In compliance with the Ministry of Women and Child Development’s Notification dated 9th December, 2013 under S.O. 3606(E), the Company prohibits harassment of any kind. If the result of an investigation indicates that corrective action is called for, such action may include disciplinary measures up to and including immediate termination of the employment of the offender.
        </p>
        <p className="mb-2">
          <strong>19. Queries:</strong> The Head of the Human Resources Department may be contacted for any queries or clarifications about this Policy, its implementation and the general rights or remedies of an employee under this Policy.
        </p>
      </>
    ),
  },
];

export default function PoliciesPage() {
  return (
    <main className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <GridBackground />
      <div className="container px-4 md:px-6 mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={metallicBlackTextClasses}>Policies</span>
          </h1>
        </div>

        {/* Content Cards */}
        <div
          className="flex flex-col items-center gap-8 md:gap-12 max-w-4xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {policiesContent.map((item) => (
            <TiltCard
              key={item.id}
              className="relative w-full rounded-lg border border-slate-200 bg-background/10 p-6 md:p-8 backdrop-blur-md shadow-xl dark:bg-black/50"
            >
              <div className="relative z-20 text-foreground/90">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4 mb-4 border-b border-border/40">
                  {item.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {item.body}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </main>
  );
} 