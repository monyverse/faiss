/** Experienced Coach role card — wording from Experienced_Coach_Role_Card.md. */

export const COACH_SUMMARY: { field: string; content: string }[] = [
  { field: "Role", content: "Experienced Coach" },
  {
    field: "Purpose",
    content:
      "Transfers practical mergers and acquisitions (M&A) experience from previous transactions into current delivery. Helps role-holders apply the operating model, anticipate common problems, strengthen judgement and build confidence without taking over their accountability.",
  },
  {
    field: "Position in the model",
    content:
      "An advisory capability outside the formal governance and delivery hierarchy. The Coach is not an additional approval layer and does not change any existing reporting line, decision right or accountability.",
  },
  {
    field: "Reports to",
    content:
      "No standing governance reporting line. Each assignment has a named Coaching Sponsor, normally the Transaction Director, Central Hub capability owner or relevant accountable leader, who agrees the purpose, access and escalation route. Coaching Sponsor means the owner of the coaching assignment and is not necessarily the transaction's Executive Sponsor.",
  },
  {
    field: "Direct reports",
    content: "None. A coaching relationship is not a line-management relationship.",
  },
  {
    field: "Primary relationships",
    content:
      "Named coachee or cohort; Coaching Sponsor; Central Hub or Inorganic Change capability team; relevant Programme Manager, Workstream Executive or country leader where agreed.",
  },
  {
    field: "Governance treatment",
    content:
      "Do not assign the Coach accountable or responsible status in the transaction responsibility matrix. Where useful, record the Coach as an advisory contact or as consulted for a specific capability need. Attendance at a forum does not confer decision or approval rights.",
  },
  {
    field: "Typical involvement",
    content:
      "Targeted and event-based. Low during open-ended detailed planning; higher once a plan gives the coachee specific responsibilities and around testing, readiness, dress-rehearsal and cutover planning; low and on-call during live execution; minimal during routine hypercare.",
  },
  {
    field: "Mandate",
    content:
      "May advise, challenge, share relevant experience, review draft thinking, observe agreed delivery activity and recommend actions. May not approve, direct, sign off, reprioritise or own delivery on behalf of the coachee.",
  },
  {
    field: "Core boundary",
    content:
      "The coachee remains accountable for their decisions, outputs, escalation and performance. The Coach's success is measured by growing independent capability, not by becoming indispensable.",
  },
];

export const COACH_PURPOSE = [
  "The Experienced Coach formalises how people with relevant deal experience support colleagues working on new transactions. The role makes previous lessons available at the point of need, rather than relying on informal networks or waiting for a retrospective after problems occur.",
  "The Coach helps the coachee understand what good looks like, recognise patterns, test assumptions and make better use of the M&A Capability Hub, operating model and programme resources. Advice must be adapted to the current transaction. A previous deal is evidence and experience, not a template that should be copied without challenge.",
];

export const COACH_LEVELS = [
  "in-country programme management office (PMO) teams",
  "Workstream Leads",
  "Workstream Executives",
  "Workstream Project Managers",
  "workstream team members",
];

export const COACH_RESPONSIBILITIES: { title: string; items: string[] }[] = [
  {
    title: "Transfer practical experience",
    items: [
      "Share relevant lessons, decision patterns and examples from previous transactions.",
      "Explain why an approach worked or failed, including the context and trade-offs.",
      "Translate operating-model expectations into practical actions for the coachee's role.",
      "Direct the coachee to current approved methods, resources and templates rather than creating personal alternatives.",
    ],
  },
  {
    title: "Improve judgement",
    items: [
      "Ask questions that test mandate, evidence, dependencies, timing, risk, value and decision authority.",
      "Help the coachee distinguish routine delivery problems from matters requiring escalation.",
      "Challenge optimism, unsupported status and assumptions that have not been tested.",
      "Help frame credible options, consequences, recommendations and decision deadlines.",
    ],
  },
  {
    title: "Anticipate recurring problems",
    items: [
      "Highlight known pressure points before they become delivery issues.",
      "Use the transaction archetype, lifecycle position and role context to focus attention.",
      "Help the coachee recognise weak mobilisation, unclear ownership, capacity gaps, late dependencies, incomplete evidence and poor handover early.",
      "Encourage proportionate controls rather than adding process by default.",
    ],
  },
  {
    title: "Build role capability",
    items: [
      "Agree a small number of practical development goals for the assignment.",
      "Observe selected meetings, decisions or artefacts where this will improve coaching quality.",
      "Give specific and timely feedback linked to live work.",
      "Reduce support as the coachee demonstrates sound independent judgement.",
    ],
  },
  {
    title: "Strengthen organisational learning",
    items: [
      "Identify lessons that would help future transactions.",
      "Separate reusable learning from transaction-confidential information.",
      "Share agreed, anonymised lessons with the Central Hub capability owner.",
      "Suggest improvements to learning pathways, role guidance or approved templates without changing controlled material directly.",
    ],
  },
];

export const COACH_MANDATE: { title: string; tone: "may" | "must" | "not"; items: string[] }[] = [
  {
    title: "The Coach may",
    tone: "may",
    items: [
      "ask coaching questions and offer practical advice;",
      "review draft plans, status reports, decision papers, readiness recommendations or meeting preparation with the accountable owner;",
      "observe agreed meetings or working sessions;",
      "rehearse a difficult conversation, governance presentation or escalation;",
      "share anonymised examples and patterns from previous deals;",
      "recommend people, resources or specialist input that may help;",
      "challenge whether an issue is being handled at the right level; and",
      "recommend escalation through the existing governance route.",
    ],
  },
  {
    title: "The Coach must",
    tone: "must",
    items: [
      "agree the purpose, scope, expected time commitment and boundaries of each assignment;",
      "understand the coachee's role and decision mandate before advising;",
      "protect confidentiality, information barriers and legal restrictions;",
      "distinguish personal experience from current policy, approved standards and specialist advice;",
      "disclose any conflict, outdated knowledge or limitation in their experience;",
      "keep the coachee accountable for actions and decisions;",
      "use the agreed route for any material concern that is not being surfaced; and",
      "conclude or reduce the assignment when the agreed capability need has been met.",
    ],
  },
  {
    title: "The Coach may not",
    tone: "not",
    items: [
      "make, approve or sign off programme, functional or specialist decisions;",
      "act as an unofficial line manager or performance assessor;",
      "take ownership of the coachee's plan, risks, reporting, evidence or deliverables;",
      "issue instructions to the delivery team unless separately appointed to a formal delivery role;",
      "represent the coachee in governance or speak on their behalf without explicit agreement;",
      "create a parallel action log, reporting route or shadow governance forum;",
      "override the Transaction Director, Programme Manager, Workstream Executive, Workstream Lead or another accountable authority;",
      "present a previous deal's approach as mandatory where the current context differs; or",
      "share confidential information, documents or identifiable lessons between transactions without approval.",
    ],
  },
];

export const COACH_INVOLVEMENT_INTRO = [
  "Coaching should be targeted rather than continuous. The Coach is most useful when the coachee has a defined responsibility, deliverable, decision or upcoming event and can ask for advice against something specific.",
  "The Coach should be less involved while workstreams are still creating the detailed plan. Planning content and ownership must sit with the workstream, and important deal facts may still be unclear. Bringing previous-deal perspectives into every planning discussion can introduce too many voices, anchor the team to a different transaction and weaken ownership of the plan.",
  "Once the plan is sufficiently developed, the coachee has a specific list of activities, decisions and outputs. Coaching can then focus on how to approach those items, what problems to anticipate and how to test whether the planned response is strong enough.",
  "Use the following as the default involvement pattern. Adapt it where a specific capability gap or transaction risk justifies a different level.",
];

export const COACH_INVOLVEMENT: { period: string; involvement: string; level: number; contribution: string; why: string }[] = [
  { period: "Role appointment and mobilisation", involvement: "Targeted, moderate", level: 2, contribution: "Clarify role expectations, share a small number of relevant start-up lessons, help the coachee prepare for mobilisation and agree how coaching will work.", why: "Early support can prevent role confusion, but the Coach should not design the programme or mobilisation approach." },
  { period: "Detailed planning", involvement: "Low", level: 1, contribution: "Remain available for specific questions. Review an individual planning challenge only when requested. Do not attend routine planning workshops or draft the plan.", why: "The workstream must own its plan. Deal-specific facts are still emerging, and too many experienced voices can create conflicting assumptions or premature solutions." },
  { period: "Plan agreed and early execution", involvement: "High", level: 3, contribution: "Work through the coachee's defined responsibilities, upcoming deliverables, decisions, stakeholder conversations and known pressure points. Test how the coachee plans to approach difficult items.", why: "The coaching conversation is now grounded in a real plan, named ownership and specific outputs rather than general advice." },
  { period: "Routine execution", involvement: "Moderate and pull-based", level: 2, contribution: "Provide short advice before or after material decisions, escalations, governance sessions or difficult delivery moments. Reduce involvement where work is proceeding normally.", why: "Coaching should sharpen judgement at points of need without becoming another layer of day-to-day delivery." },
  { period: "Testing and readiness", involvement: "High at key points", level: 3, contribution: "Challenge evidence, acceptance, defect treatment, dependencies, fallback thinking, readiness conditions and the quality of the recommendation.", why: "Prior deal experience is valuable when teams must distinguish completed activity from credible operational readiness." },
  { period: "Dress-rehearsal and cutover planning", involvement: "High", level: 3, contribution: "Help the coachee anticipate sequencing problems, unclear authority, weak checkpoints, communications gaps, untested fallbacks and likely points of execution pressure. Dress rehearsals are referred to as DRs where an abbreviation is needed.", why: "Cutover and DR planning benefit from pattern recognition and practical lessons from previous transactions. The accountable team still owns the runbook and decisions." },
  { period: "Live dress rehearsal or cutover", involvement: "Low and on-call", level: 1, contribution: "Remain available for a specific request, but do not join the command structure or offer unsolicited direction. Use the formal issue and decision routes.", why: "Live execution needs clear authority and controlled communication. An additional advisory voice can slow decisions or confuse ownership." },
  { period: "Hypercare", involvement: "Minimal", level: 0, contribution: "Step in only for a defined capability need, a recurring pattern the team is struggling to resolve or preparation for handover. Do not attend routine hypercare calls by default.", why: "Hypercare should be run by the accountable delivery and business teams. The priority is rapid operational ownership, not continued dependence on coaching." },
  { period: "Closure and lessons learned", involvement: "Short, targeted", level: 2, contribution: "Help the coachee reflect on decisions and capture approved, reusable lessons. Confirm whether any further development need remains.", why: "A focused close-out completes the knowledge-transfer cycle without extending the assignment unnecessarily." },
];

export const COACH_WHEN_TO_INVOLVE = [
  "an assigned deliverable or plan activity they have not performed before;",
  "an upcoming decision, escalation or governance discussion;",
  "a difficult stakeholder conversation;",
  "a dependency, resource or evidence problem requiring judgement;",
  "preparation for testing, readiness, a dress rehearsal or cutover;",
  "a material outcome that did not go as expected and warrants reflection; or",
  "a lesson that may be useful to future transactions.",
];

export const COACH_NOT_BY_DEFAULT =
  "Do not involve the Coach by default simply because a meeting is taking place. Routine planning, status, governance, cutover and hypercare meetings should remain owned by the formal team.";

export const COACH_SUCCESS: { title: string; text: string }[] = [
  { title: "Capability transfer", text: "The coachee applies the role more confidently and requires less Coach input over time." },
  { title: "Judgement quality", text: "Plans, status, decisions, escalations and readiness positions show clearer evidence, consequences and ownership." },
  { title: "Earlier action", text: "Material dependencies, capacity gaps, risks and decisions are identified and raised while useful options remain." },
  { title: "Governance integrity", text: "The coachee uses the correct decision and escalation routes. Coaching does not create shadow authority or dilute accountability." },
  { title: "Practical adoption", text: "Relevant lessons and approved resources are used in live delivery, not only discussed in coaching sessions." },
  { title: "Independence", text: "Support reduces as capability grows, and the assignment closes with the coachee able to perform the role independently." },
  { title: "Organisational learning", text: "Useful lessons are captured in an approved, anonymised form and improve future role guidance, learning or mobilisation." },
];

export const COACH_EXPERIENCE = [
  "substantial first-hand experience of M&A integration, separation or transition delivery;",
  "successful experience in, or closely alongside, the role being coached;",
  "experience relevant to the transaction's archetype, workstream, country context or current phase;",
  "sound understanding of the Absa M&A operating model, governance and role boundaries;",
  "strong judgement under uncertainty and compressed timelines;",
  "the ability to explain context and trade-offs rather than simply prescribe an answer;",
  "effective questioning, listening, feedback and adult-coaching skills;",
  "credibility with both senior leaders and delivery teams;",
  "respect for confidentiality, information barriers and specialist authority;",
  "humility about the limits of experience from previous deals; and",
  "sufficient capacity to provide timely support at important moments.",
];

export const COACH_EXPERIENCE_NOTE =
  "Prior deal experience alone is not sufficient. The person must be able to transfer that experience in a way that strengthens the coachee's judgement and independence.";

export const COACH_BOUNDARY =
  "The Experienced Coach helps people use prior deal experience to make better decisions on the current transaction. The Coach advises and challenges but does not enter the governance hierarchy, own delivery, approve outcomes or replace accountable leaders. The role is successful when knowledge is transferred, judgement improves and the Coach can step away.";
