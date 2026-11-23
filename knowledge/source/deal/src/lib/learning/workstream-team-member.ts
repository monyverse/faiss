/** Content for the Workstream Team Member role pathway. Copy is the supplied baseline. */

export const SECTIONS = [
  { id: "role", label: "Your role" },
  { id: "mandate", label: "Mandate" },
  { id: "start", label: "Start well" },
  { id: "operate", label: "Operate" },
  { id: "apply", label: "Apply" },
  { id: "resources", label: "Resources" },
  { id: "check", label: "Check" },
  { id: "playbook", label: "Playbook" },
] as const;
export type SectionId = (typeof SECTIONS)[number]["id"];

export type Contribution = "specialist" | "delivery" | "testing" | "cutover";

export const CONTRIBUTIONS: { id: Contribution; name: string; text: string }[] = [
  {
    id: "specialist",
    name: "Specialist input",
    text: "You provide requirements, process knowledge, data, analysis or advice from your function.",
  },
  {
    id: "delivery",
    name: "Delivery task",
    text: "You create, change, review or complete a defined output in the workstream plan.",
  },
  {
    id: "testing",
    name: "Testing and readiness",
    text: "You run tests, record results, resolve defects or provide proof that the workstream is ready.",
  },
  {
    id: "cutover",
    name: "Cutover and hypercare",
    text: "You complete timed tasks during the move to the new operating state and support early issue resolution afterwards.",
  },
];

export const LEARNING_OUTCOMES = [
  "confirm what you are being asked to deliver;",
  "understand which decisions you can make yourself;",
  "produce work that can be checked and accepted;",
  "recognise a risk, issue or dependency and raise it early;",
  "protect confidential transaction information;",
  "contribute safely to testing, rehearsals, cutover and hypercare; and",
  "identify delivery facts that may affect cost, value, customers or timing.",
];

export const ROLES = [
  {
    id: "member",
    name: "Workstream Team Member",
    text: "Completes assigned work, provides specialist input and raises risks, issues and dependencies.",
  },
  {
    id: "lead",
    name: "Workstream Lead",
    text: "Owns the workstream outcome, priorities and functional decisions within their authority.",
  },
  {
    id: "pm",
    name: "Workstream Project Manager",
    text: "Maintains the detailed plan, actions, reporting and delivery controls. The Project Manager helps coordinate the work but does not replace specialist decisions.",
  },
  {
    id: "exec",
    name: "Workstream Executive",
    text: "Makes major workstream choices, removes senior blockers and approves matters that need executive authority.",
  },
];

export type MandateKey = "do" | "check" | "raise";

export const MANDATE: Record<MandateKey, { label: string; lead: string; items: string[] }> = {
  do: {
    label: "Do",
    lead: "You are expected to:",
    items: [
      "understand the task, deadline and required result;",
      "use your specialist knowledge to complete the assigned work;",
      "follow the agreed process, standard and security rules;",
      "provide accurate data, requirements or analysis;",
      "record what you did and the evidence that supports it;",
      "update the relevant owner on progress;",
      "complete agreed test, rehearsal or cutover tasks; and",
      "correct mistakes within your task when the solution is clear and authorised.",
    ],
  },
  check: {
    label: "Check",
    lead: "Check with the Workstream Lead or Project Manager before you:",
    items: [
      "change the agreed scope or required result;",
      "change the conditions used to decide whether work is complete;",
      "commit another team or the buyer or seller on the other side of the deal, known as the counterparty, to a date;",
      "use confidential information in a new way or location;",
      "change a control, policy, customer process or approved design;",
      "accept extra cost or a supplier commitment;",
      "skip an agreed test, review or approval; or",
      "follow conflicting instructions from different stakeholders.",
    ],
  },
  raise: {
    label: "Raise",
    lead: "Raise the matter early when:",
    items: [
      "an input, decision or activity that your task relies on is missing;",
      "the deadline is at risk, even if it has not yet been missed;",
      "the agreed result cannot be produced with the available people or information;",
      "you find an error, defect or control concern;",
      "evidence is incomplete or does not support completion;",
      "you see a possible customer, employee, regulatory or operational impact;",
      "confidential information may have been shared incorrectly;",
      "a decision is outside your authority; or",
      "the same problem keeps returning after it was reported as fixed.",
    ],
  },
};

export const BOUNDARY =
  "change programme scope, approve budget, accept material risk, interpret legal or regulatory requirements, change policy, provide formal readiness approval or make the final go or no-go decision. A go or no-go decision is the formal decision on whether the transaction is ready and safe to proceed.";

export const DECISION_TEST = [
  "Is this within my assigned task?",
  "Does it follow the agreed process and standard?",
  "Does it leave the agreed outcome, cost, timing and controls unchanged?",
  "Am I authorised to use the information and make this choice?",
];

export const START_STEPS = [
  {
    title: "Understand the deal context",
    confirm: "Understand what is and is not included in the deal, why your work matters and which transaction outcome it supports.",
    good: "You can explain the purpose of your task in plain language and know who to ask about missing context.",
  },
  {
    title: "Confirm confidentiality and access",
    confirm: "Know which information you may access, where it must be stored, who may receive it and which communication channels are approved.",
    good: "Your access works and you do not need to move information into an unapproved location to complete the task.",
  },
  {
    title: "Agree the required result",
    confirm: "Agree the output, owner, deadline and acceptance criteria. Acceptance criteria are the conditions that must be met before work is accepted as complete.",
    good: "You and the person accepting the work share the same understanding of \u2018done\u2019.",
  },
  {
    title: "Confirm inputs and dependencies",
    confirm: "Identify every input, decision or activity that your task relies on. These are your dependencies.",
    good: "Each important dependency has an owner, due date and route for raising a delay.",
  },
  {
    title: "Check time and capability",
    confirm: "Check whether you have the time, knowledge, support and tools needed alongside your normal business-as-usual work.",
    good: "Any capacity or skill gap is visible before it affects the deadline.",
  },
  {
    title: "Know how to report and raise problems",
    confirm: "Know how progress is reported, where evidence is stored and who receives risks, issues or decision requests.",
    good: "You can raise a problem quickly without waiting for the next meeting.",
  },
];

/** level: 1 targeted … 4 highest */
export const INTENSITY = [
  { period: "Early planning", intensity: "Targeted", level: 1, text: "Provide facts, requirements, estimates and specialist advice." },
  { period: "Programme execution", intensity: "Highest", level: 4, text: "Complete assigned outputs and raise delivery problems." },
  { period: "Testing and dress rehearsals", intensity: "High", level: 3, text: "Run tests, record evidence and help resolve defects." },
  { period: "Readiness and cutover", intensity: "High", level: 3, text: "Confirm readiness evidence and complete timed runbook tasks." },
  { period: "Hypercare and handover", intensity: "As needed", level: 2, text: "Resolve early issues and support transfer to normal teams." },
];

export const TASK_CYCLE = [
  { title: "Confirm", text: "Restate the required result, deadline and acceptance criteria before starting." },
  { title: "Prepare", text: "Gather the required information, tools, approvals and inputs. Check that your dependencies are still on track." },
  { title: "Complete", text: "Perform the work using the agreed method. Record important assumptions and choices." },
  { title: "Check", text: "Review accuracy, completeness, control requirements and customer or operational effects." },
  { title: "Evidence", text: "Store proof of the result in the approved location. Readiness evidence is proof that the required people, processes, technology, data and controls are ready." },
  { title: "Hand over", text: "Give the output to the named receiver. Confirm that it has been accepted or record what remains open." },
];

export const EVIDENCE_CHECKS: [string, string][] = [
  ["Complete", "it covers the full agreed task."],
  ["Accurate", "the data and statements have been checked."],
  ["Current", "it reflects the latest approved position."],
  ["Traceable", "another person can see the source and what changed."],
  ["Approved", "the right person has reviewed or accepted it."],
  ["Controlled", "it is stored in the correct location and version."],
];

export const RAID_ITEMS = [
  "what has happened or may happen;",
  "which task or outcome is affected;",
  "the current evidence;",
  "the likely effect on customers, controls, cost or timing;",
  "what you have already tried;",
  "the help or decision needed; and",
  "the date by which action is required.",
];

export const TESTING_ITEMS = [
  "follow the approved test steps;",
  "record the actual result, not the expected result;",
  "attach the required evidence;",
  "record a defect when the result does not match the expected outcome;",
  "explain the customer, control or operational effect;",
  "retest after the fix; and",
  "confirm that the fix has not caused another problem.",
];

export const CUTOVER_ITEMS = [
  "use the current approved runbook;",
  "complete the task only when the authorised checkpoint allows it;",
  "record the actual start, finish and result;",
  "do not change task timing or order through an informal message alone;",
  "stop and raise any control, safety or customer concern; and",
  "confirm hand-off to the next task owner.",
];

export const CONFIDENTIAL_ITEMS = [
  "Use only approved systems and communication channels.",
  "Share information only with authorised people.",
  "Do not send transaction information to personal email or storage.",
  "Do not contact a counterparty unless the communication route is approved.",
  "Raise access problems instead of creating an informal workaround.",
];

export const ECONOMICS = [
  "customer loss or failed onboarding;",
  "product, pricing or service problems;",
  "supplier cost increases;",
  "extra people, travel or specialist support;",
  "repeated rework or testing;",
  "delays that extend programme activity; and",
  "workarounds that create ongoing cost or risk.",
];

export interface Choice { key: string; text: string }
export interface Scenario { title: string; situation: string; options: Choice[]; answer: string; feedback: string }

export const SCENARIOS: Scenario[] = [
  {
    title: "Two versions of the task",
    situation:
      "The Project Manager asks you to update a customer data map by Friday. The process owner asks you to add a new field that is not in the agreed requirements. The acceptance criteria do not mention the field. Adding it would take half a day and would not move Friday's date.",
    options: [
      { key: "A", text: "Add the field because the process owner understands the business need and the deadline is unaffected." },
      { key: "B", text: "Follow the agreed requirements and record the extra field as a possible improvement after Friday." },
      { key: "C", text: "Clarify the required result with the Workstream Lead while completing the parts that are not affected by the question." },
      { key: "D", text: "Include both versions in the Friday hand-off and ask the receiver to choose which one to accept." },
    ],
    answer: "C",
    feedback:
      "Option C keeps progress moving and sends the scope decision to the person who owns it. Option A may introduce an unapproved requirement. Option B protects the agreed requirements but could ignore a valid need. Option D passes an unresolved decision to the receiver and weakens the hand-off.",
  },
  {
    title: "An intermittent test result",
    situation:
      "A process fails twice during 20 test runs. The deadline remains achievable, and the technical team expects a one-day fix. The failure affects a small number of customer records.",
    options: [
      { key: "A", text: "Complete more test runs to determine whether the failure rate is high enough to record as a defect." },
      { key: "B", text: "Record the defect and evidence, explain the customer effect and tell the test owner before the completion decision." },
      { key: "C", text: "Allow the technical team to apply the fix first, then record only the final passing result if the retest succeeds." },
      { key: "D", text: "Mark the test as conditionally passed because the deadline and wider test result are still within plan." },
    ],
    answer: "B",
    feedback:
      "Option B preserves the real result and allows the right owner to assess its importance. Option A may provide useful analysis but delays defect control. Option C removes the audit trail. Option D makes an acceptance decision that sits outside the Team Member's role.",
  },
  {
    title: "An urgent information request",
    situation:
      "An authorised counterparty contact needs a client file today. Their controlled workspace access has failed. They ask you to send the file to their personal email and promise to upload it once access is restored.",
    options: [
      { key: "A", text: "Send an encrypted copy because the person is authorised and the programme deadline is at risk." },
      { key: "B", text: "Ask the contact to confirm the request in writing, then send the file using password protection." },
      { key: "C", text: "Do not send the file through an unapproved channel. Raise the access failure through the agreed route and confirm the deadline impact." },
      { key: "D", text: "Send only the minimum fields needed today and provide the full controlled file after access is restored." },
    ],
    answer: "C",
    feedback:
      "Option C protects the information and makes the delivery risk visible. The recipient's authority does not make a personal email an approved channel. Options A, B and D reduce the amount or exposure but still use an unapproved route.",
  },
  {
    title: "The output works, but evidence is missing",
    situation:
      "You complete a system change and confirm that it works. The test log was not saved because the session closed unexpectedly. Repeating the test will take two hours. The hand-off is due at the end of the day.",
    options: [
      { key: "A", text: "Mark the task complete because you observed the successful result and repeat the test only if the reviewer requests evidence." },
      { key: "B", text: "Hand over the change with a note that evidence is pending, then complete the test log the next morning." },
      { key: "C", text: "Tell the owner that evidence is missing, repeat the test and submit the output when the result can be checked and accepted." },
      { key: "D", text: "Ask another attendee to confirm the result by email and use that message as the completion evidence." },
    ],
    answer: "C",
    feedback:
      "Option C protects the acceptance standard and makes the timing effect visible. Option A relies on memory. Option B separates completion from required evidence. Option D may support what happened, but it does not replace the agreed test record.",
  },
  {
    title: "An informal cutover change",
    situation:
      "The approved runbook says your task starts at 01:00 after a checkpoint. At 00:25, a technical lead messages that the previous activity finished early and asks you to start at 00:30. The command centre has not issued a revised instruction.",
    options: [
      { key: "A", text: "Start at 00:30 because the previous owner has confirmed completion and the change creates extra contingency." },
      { key: "B", text: "Prepare to start, but confirm the change through the authorised checkpoint before executing the task." },
      { key: "C", text: "Wait until 01:00 because an approved runbook should not change during live execution." },
      { key: "D", text: "Ask the technical lead to record the change in the team chat, then start once that record exists." },
    ],
    answer: "B",
    feedback:
      "Option B preserves control while allowing the command centre to use the time gained. Option A relies on one person's message. Option C protects the plan but may ignore a valid controlled change. Option D creates a record but not the required authority.",
  },
];

export const RESOURCE_NOTICE =
  "The templates named in this module are not stored in the Capability Hub. Get the current approved versions from your Workstream Lead, Project Manager or controlled programme workspace.";

export const CORE_RESOURCES = [
  { name: "Role brief and onboarding material", purpose: "Explains the deal, confidentiality rules, your task, authority and reporting route.", when: "When joining the workstream or when your role changes." },
  { name: "Relevant workstream charter, brick or blueprint", purpose: "Explains the workstream outcome, scope and main activities. A brick shows processes that start, stop or continue. A blueprint shows the main delivery activities and milestones.", when: "Before beginning work or when the wider purpose is unclear." },
  { name: "Assigned plan or task tracker", purpose: "Records your activity, owner, deadline, dependencies and completion conditions.", when: "Throughout delivery." },
  { name: "Process maps, inventories and data requests", purpose: "Provide the detailed facts and structures needed for specialist work.", when: "When defining requirements, assessing impact or producing data." },
  { name: "Action and RAID route", purpose: "Shows where to record actions, risks, assumptions, issues and dependencies.", when: "Whenever a task needs follow-up, support or escalation." },
  { name: "Meeting pack and decision record", purpose: "Provides current direction, agreed decisions and actions that affect your task.", when: "Before acting on a programme or workstream decision." },
];

export const RELEVANT_RESOURCES = [
  { name: "Test script and evidence template", text: "Records test steps, expected results, actual results and proof." },
  { name: "Defect log", text: "Records a failed result, its impact, owner, action, retest and closure evidence." },
  { name: "Readiness checklist or evidence index", text: "Shows what proof is needed before the workstream can confirm readiness." },
  { name: "Cutover runbook or task checklist", text: "Provides the approved timing, order, ownership, checkpoints and fallback actions for cutover." },
  { name: "Hypercare action or issue log", text: "Tracks early operational issues, owners, decisions and closure after cutover." },
];

export const MATCHING = [
  { need: "Confirm why your task matters", resource: "Workstream charter, brick or blueprint" },
  { need: "Record a failed test and its effect", resource: "Defect log" },
  { need: "Check the approved time for a live task", resource: "Cutover runbook" },
  { need: "Raise a missing input your task relies on", resource: "RAID or dependency route" },
  { need: "Prove that an output met its agreed result", resource: "Evidence template or evidence index" },
];

export interface Question { q: string; options: Choice[]; answer: string; feedback: string }

export const QUESTIONS: Question[] = [
  {
    q: "You can complete a task faster by changing its sequence. The result, cost, control and deadline stay the same. What should you do?",
    options: [
      { key: "A", text: "Use the better sequence and record any material change to how the task was completed." },
      { key: "B", text: "Ask the Workstream Executive because all changes to planned activity need senior approval." },
      { key: "C", text: "Ask the Project Manager to make the decision because the sequence appears in the plan." },
      { key: "D", text: "Follow the original sequence because Team Members should not change an assigned task." },
    ],
    answer: "A",
    feedback: "You can make normal working decisions within your task when the agreed outcome and controls remain unchanged.",
  },
  {
    q: "When should a Team Member first raise a missing dependency?",
    options: [
      { key: "A", text: "When the due date has passed and the delay can be measured accurately." },
      { key: "B", text: "When there is enough evidence that the missing input may affect the task or reduce recovery time." },
      { key: "C", text: "At the next scheduled status meeting, so the issue follows the agreed reporting route." },
      { key: "D", text: "After trying every available workaround within the team." },
    ],
    answer: "B",
    feedback: "Early escalation preserves recovery choices. State what is known, what is uncertain and when a decision is needed.",
  },
  {
    q: "An activity has been performed successfully. When should it normally be reported as complete?",
    options: [
      { key: "A", text: "When the person doing the work is satisfied with the result." },
      { key: "B", text: "When the activity is finished and any remaining evidence is listed as a follow-up action." },
      { key: "C", text: "When the agreed result and acceptance criteria are met and the required evidence is stored." },
      { key: "D", text: "When the Project Manager updates the activity to complete in the plan." },
    ],
    answer: "C",
    feedback: "Completion is based on the agreed result, evidence and acceptance, not the activity or plan update alone.",
  },
  {
    q: "You find that a supplier delay may add cost, but the amount is not yet confirmed. What should you do?",
    options: [
      { key: "A", text: "Wait for a confirmed amount so the programme receives accurate financial information." },
      { key: "B", text: "Raise the likely cost and delay, explain the source and state what remains uncertain." },
      { key: "C", text: "Record only the delivery delay because Finance owns cost reporting." },
      { key: "D", text: "Ask the supplier to absorb the cost before reporting a possible business-case effect." },
    ],
    answer: "B",
    feedback: "Your role is to make the delivery fact visible. The right owners can then assess and manage the financial effect.",
  },
  {
    q: "An authorised person asks you to use an unapproved channel because the normal system is unavailable. What matters most?",
    options: [
      { key: "A", text: "Whether the file is encrypted before it is sent." },
      { key: "B", text: "Whether the delivery deadline is more important than the temporary access issue." },
      { key: "C", text: "Whether the sender and receiver both agree to the temporary method." },
      { key: "D", text: "Whether the method itself is approved for the information being shared." },
    ],
    answer: "D",
    feedback: "A person's authority does not make an unapproved channel acceptable. Raise the access problem through the agreed route.",
  },
];

export const PLAYBOOK = [
  {
    title: "Before starting a task",
    items: [
      "Can I explain the required result?",
      "Do I know the deadline and acceptance criteria?",
      "Do I have the right information, access and tools?",
      "Are my dependencies named and dated?",
      "Do I have enough time and the right skills?",
      "Do I know who can answer questions and make decisions?",
    ],
  },
  {
    title: "Before reporting completion",
    items: [
      "Does the output meet the agreed result?",
      "Have I checked accuracy and completeness?",
      "Is the evidence stored in the approved location?",
      "Has the right person accepted the output?",
      "Are open points and assumptions recorded?",
      "Is the next task owner ready to receive it?",
    ],
  },
  {
    title: "Before raising a problem",
    items: [
      "What happened or may happen?",
      "Which task or outcome is affected?",
      "What evidence do I have?",
      "What is the likely customer, control, cost or timing effect?",
      "What have I already tried?",
      "What help or decision is needed, and by when?",
    ],
  },
  {
    title: "Before testing or rehearsal work",
    items: [
      "Am I using the current approved steps?",
      "Do I understand the expected result?",
      "Am I recording the actual result and evidence?",
      "Have I logged every failed or unexpected result?",
      "Has the fix been retested?",
      "Could the fix have affected another process?",
    ],
  },
  {
    title: "Before a cutover task",
    items: [
      "Am I using the current approved runbook?",
      "Has the authorised checkpoint released my task?",
      "Are the required inputs complete?",
      "Do I know the fallback and escalation route?",
      "Am I recording the actual timing and result?",
      "Have I confirmed hand-off to the next owner?",
    ],
  },
];

export const PRINCIPLES = [
  "Understand the outcome before starting the activity.",
  "Work within the agreed method and your authority.",
  "Record evidence as the work is completed.",
  "Raise missing inputs and risks early.",
  "Protect confidential information.",
  "Do not change acceptance criteria to fit the result.",
  "Follow controlled instructions during live execution.",
  "Make customer, cost and timing effects visible.",
];

export const GLOSSARY = [
  { term: "Acceptance criteria", def: "The conditions that must be met before work is accepted as complete." },
  { term: "Scope", def: "The work and outcomes included in an agreed task or workstream." },
  { term: "Dependency", def: "An input, decision or activity that another task relies on." },
  { term: "RAID", def: "Risks, assumptions, issues and dependencies." },
  { term: "Readiness evidence", def: "Proof that people, processes, technology, data and controls are ready." },
  { term: "Dress rehearsal", def: "A practice run before live execution." },
  { term: "Cutover", def: "The controlled move from the current state to the new operating state." },
  { term: "Runbook", def: "The timed plan of cutover tasks, owners, dependencies and fallback actions." },
  { term: "Hypercare", def: "The period of extra monitoring and support immediately after cutover." },
  { term: "Escalation", def: "Raising a matter to someone with the authority or support needed to resolve it." },
  { term: "Business as usual", def: "The normal work performed outside the transaction programme." },
  { term: "Counterparty", def: "The buyer or seller organisation on the other side of the transaction." },
  { term: "Checkpoint", def: "A planned point when progress is checked and permission is given to continue." },
  { term: "Business case", def: "The expected costs, benefits and value of the deal." },
  { term: "Go or no-go", def: "The formal decision on whether the transaction is ready and safe to proceed." },
];
