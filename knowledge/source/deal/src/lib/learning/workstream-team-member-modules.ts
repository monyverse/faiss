/**
 * Bite-sized Workstream Team Member pathway: module list, diagnostic,
 * teaching interactions and capstone. Adapted from the baseline content in
 * ./workstream-team-member.ts following the supplied restructuring brief.
 */

export type CapabilityId = "result" | "information" | "evidence" | "raise";
export type Confidence = "Low" | "Medium" | "High";

export const MODULES = [
  { id: "starting-point", no: 1, title: "Your starting point", minutes: 4, purpose: "Diagnose judgement before teaching" },
  { id: "task", no: 2, title: "Know your task and boundaries", minutes: 3, purpose: "Clarify the result, authority and support route" },
  { id: "start", no: 3, title: "Start safely", minutes: 4, purpose: "Confirm inputs, access, confidentiality, capacity and dependencies" },
  { id: "deliver", no: 4, title: "Deliver work others can use", minutes: 4, purpose: "Produce accepted outputs and usable evidence" },
  { id: "raise", no: 5, title: "Raise problems early", minutes: 4, purpose: "Spot risks, issues and dependencies and raise them well" },
  { id: "key-moments", no: 6, title: "Work safely at key moments", minutes: 4, purpose: "Contribute to testing, rehearsals, cutover and hypercare" },
  { id: "capstone", no: 7, title: "Put it into practice", minutes: 5, purpose: "Complete a capstone and compare it with the diagnostic" },
] as const;
export type ModuleId = (typeof MODULES)[number]["id"];
export const TEACHING_IDS: ModuleId[] = ["task", "start", "deliver", "raise", "key-moments"];

export const CAPABILITIES: { id: CapabilityId; label: string; module: ModuleId }[] = [
  { id: "result", label: "Required result and boundary", module: "task" },
  { id: "information", label: "Confidentiality and access", module: "start" },
  { id: "evidence", label: "Completion and evidence", module: "deliver" },
  { id: "raise", label: "Raising problems early", module: "raise" },
];

export interface Opt { id: string; text: string; feedback?: string }
export interface Decision {
  capability: CapabilityId;
  question: string;
  options: Opt[];
  answer: string;
  reasoning?: string;
}

/* ---------------- Module 1: diagnostic ---------------- */

export const DIAGNOSTIC = {
  title: "A task that looks complete",
  intro: "You have been asked to update a customer process before testing starts. Then:",
  facts: [
    "two versions of the requirement are circulating, and a colleague says to use the newer one, although its approval is unclear;",
    "your change works in one test but fails in another;",
    "the deadline is tomorrow; and",
    "someone outside the approved team asks for the test extract to help investigate.",
  ],
  close: "You need to decide what to do next.",
  message:
    "Several choices can look reasonable under deadline pressure. The modules show how the required result, approved access, evidence and early escalation decide the best response.",
};

export const DIAGNOSTIC_DECISIONS: Decision[] = [
  {
    capability: "result",
    question: "How should you confirm which requirement to build to?",
    options: [
      { id: "a", text: "Use the newer version, as it is more likely to reflect the latest position, and note that choice in your update." },
      { id: "b", text: "Ask the task owner which version is approved and confirm the acceptance conditions before you continue." },
      { id: "c", text: "Build to the older version, because it is the last one you know was formally shared with the team." },
      { id: "d", text: "Build to both versions so the output can be switched quickly once someone confirms the approved one." },
    ],
    answer: "b",
  },
  {
    capability: "information",
    question: "How should you handle the request for the test extract?",
    options: [
      { id: "a", text: "Share a masked version of the extract, since removing names lowers the risk while still helping the investigation." },
      { id: "b", text: "Share the extract through the approved system, because they are trying to help fix a real problem." },
      { id: "c", text: "Decline for now and ask your Workstream Lead or Project Manager whether the person can be authorised." },
      { id: "d", text: "Send it once your manager confirms by email that the request is reasonable and time-critical." },
    ],
    answer: "c",
  },
  {
    capability: "evidence",
    question: "When could you report the change as complete?",
    options: [
      { id: "a", text: "When the change passes at least one test and the remaining test is logged as a follow-up action." },
      { id: "b", text: "When you are satisfied the change is built and the Project Manager has marked it done in the plan." },
      { id: "c", text: "When it meets the approved requirement, the agreed checks pass, and the evidence is stored and accepted." },
      { id: "d", text: "When the change is deployed to the test environment and the deadline has been met." },
    ],
    answer: "c",
  },
  {
    capability: "raise",
    question: "When and how should you raise the failing test?",
    options: [
      { id: "a", text: "Now, stating what failed, the likely effect, what you have tried and the help needed before the deadline." },
      { id: "b", text: "After another day of investigation, so you can report the cause as well as the symptom." },
      { id: "c", text: "At the next status meeting, where the owner can weigh it against other delivery priorities." },
      { id: "d", text: "Only if it fails again, since one failure may be caused by the test environment rather than your change." },
    ],
    answer: "a",
  },
];

/* ---------------- Module 2: task and boundaries ---------------- */

export const TASK_PARTS = [
  { title: "Required result", text: "What the output must achieve, not just what you will do." },
  { title: "Owner", text: "The person who assigned the work and will accept it." },
  { title: "Acceptance conditions", text: "The conditions that must be met before the work counts as complete." },
  { title: "Due date", text: "When the output is needed, and what depends on it." },
  { title: "Your decisions", text: "Choices you may make yourself because they leave the result, cost, timing and controls unchanged." },
  { title: "Route for questions", text: "Who answers questions and who makes decisions outside your task." },
];

export type SortKey = "do" | "check" | "raise";
export const SORT_ITEMS: { text: string; answer: SortKey; why: string }[] = [
  { text: "Use a faster sequence that leaves the result, cost, controls and deadline unchanged", answer: "do", why: "A normal working decision within your task. Record any material change to how it was done." },
  { text: "Fix a clear mistake in your own output using the agreed method", answer: "do", why: "Correcting your own work is yours when the solution is clear and authorised." },
  { text: "Tell another team they can have your output two days later", answer: "check", why: "Committing a date that others rely on needs the Workstream Lead or Project Manager." },
  { text: "Skip a review step because the change is small", answer: "check", why: "Agreed tests, reviews and approvals are not yours to remove." },
  { text: "An input you need has not arrived and the deadline is now at risk", answer: "raise", why: "Raise a missing dependency while there is still time to recover." },
  { text: "You spot a possible customer impact outside your task", answer: "raise", why: "You do not need to own it to make it visible." },
];

/* ---------------- Module 3: start safely ---------------- */

export const START_BRIEF =
  "Prepare the reconciliation of migrated account balances by Friday. Use the account extract from Data Migration. Send your results to the Finance workstream.";
export const START_GAPS = [
  { id: "a", text: "You do not yet have approved access to the account extract, and a colleague offers to forward it from their inbox", correct: true, feedback: "Access must be approved before work starts. Forwarding creates an unapproved copy of confidential data." },
  { id: "b", text: "The brief does not say what a reconciled result must show or who accepts it", correct: true, feedback: "Without acceptance conditions you cannot tell when the work is complete." },
  { id: "c", text: "You are not sure which spreadsheet layout the Finance team prefers", correct: false, feedback: "Worth asking, but it can be settled once the result and access are clear." },
  { id: "d", text: "You would like a second person to check your formulas", correct: false, feedback: "Good practice, and easy to arrange during the work rather than before it." },
];

/* ---------------- Module 4: deliver ---------------- */

export const COMPLETION_COMPARE = {
  weak: "I finished the reconciliation.",
  strong:
    "Reconciliation v1.3 is complete. It matches the approved account mapping, the Finance Control Owner checked it on 12 August, and the signed check and results are stored in the controlled workspace, folder 04.",
};

export const EVIDENCE_OPTIONS = [
  { id: "a", text: "The test record showing the actual result against the expected result, with a screenshot", correct: true, feedback: "Shows what happened, not what was expected." },
  { id: "b", text: "The reviewer's acceptance, linked to the version they checked", correct: true, feedback: "Ties acceptance to the right version." },
  { id: "c", text: "The output stored in the approved location with its version number", correct: true, feedback: "Others can find and rely on the exact output." },
  { id: "d", text: "A message from you saying the output is ready for use", correct: false, feedback: "Your statement is useful, but it is not proof." },
  { id: "e", text: "The plan showing the task at 100% complete", correct: false, feedback: "A plan update shows progress, not that the result was accepted." },
  { id: "f", text: "A working copy saved on your laptop in case it is needed", correct: false, feedback: "Uncontrolled copies cannot be relied on and may breach storage rules." },
];

/* ---------------- Module 5: raise ---------------- */

export const RAISE_TYPES = [
  { title: "Risk", text: "Something that may happen and would affect your task or its outcome." },
  { title: "Issue", text: "Something that has happened and is affecting your task now." },
  { title: "Dependency", text: "An input, decision or activity that your task relies on." },
];

export const RAISE_PARTS = [
  "The fact",
  "Its effect",
  "When it matters",
  "What you have already tried",
  "The help or decision needed",
  "The last date a response is still useful",
];

export const RAISE_SITUATION = [
  "Your task needs a supplier file by Tuesday. The supplier now says Thursday.",
  "Testing starts on Wednesday, so a Thursday file means rework and a likely extra supplier charge.",
];
export const RAISE_OPTIONS: Opt[] = [
  { id: "a", text: "The supplier file may be late, which could affect testing. I am chasing and will update at Friday's meeting.", feedback: "Visible, but it has no date, effect or request, and Friday is after the problem lands." },
  { id: "b", text: "Supplier file now due Thursday, not Tuesday. Testing starts Wednesday, so rework and extra cost are likely. I have asked for a partial file. I need a decision on test order by Monday.", feedback: "Recommended. It states the fact, effect, action taken, help needed and deadline." },
  { id: "c", text: "Supplier file delayed by two days. I have asked the supplier to confirm a firm date and will raise it if Thursday also slips.", feedback: "Reasonable follow-up, but it waits for a second slip before anyone can act." },
  { id: "d", text: "Supplier is two days late. Please ask Procurement to escalate to the supplier's account manager to recover the date.", feedback: "Proposes one fix but not the effect on testing, cost or the decision date." },
];

/* ---------------- Module 6: key moments ---------------- */

export const MOMENTS = [
  { title: "Testing", text: "Follow the approved steps. Record the actual result and evidence. Log a defect when the result does not match." },
  { title: "Rehearsals", text: "Run the task as it will be run for real. Record timings and anything that did not work." },
  { title: "Cutover", text: "Use the current approved runbook. Start only when the checkpoint allows. Stop and raise any condition that is not met." },
  { title: "Hypercare", text: "Resolve early issues through the hypercare log. Hand over accurate records to the normal team." },
];

export const CUTOVER_SITUATION =
  "The approved runbook says your task starts at 01:00 after a checkpoint. At 00:25, a technical lead messages that the previous activity finished early and asks you to start at 00:30. The command centre has not issued a revised instruction.";
export const CUTOVER_OPTIONS: Opt[] = [
  { id: "a", text: "Start at 00:30, because the previous owner has confirmed completion and the change adds contingency.", feedback: "Relies on one person's message. The checkpoint has not released your task." },
  { id: "b", text: "Prepare to start, but confirm the change through the authorised checkpoint before you execute the task.", feedback: "Recommended. It keeps control while letting the command centre use the time gained." },
  { id: "c", text: "Wait until 01:00, because an approved runbook should never change during live execution.", feedback: "Protects the plan but may ignore a valid, controlled change." },
  { id: "d", text: "Ask the technical lead to record the change in the team chat, then start once that record exists.", feedback: "Creates a record but not the authority to change the runbook." },
];

export const PLAYBOOK_PROMPTS = [
  "Required result: what must my output achieve, and who accepts it?",
  "Approved version: am I using the current approved requirement, runbook or test steps?",
  "Evidence: what proof shows the result was met, and where is it stored?",
  "Current problem: what could stop me, what is its effect, and when does it matter?",
  "Person to contact: who answers questions, and who makes decisions outside my task?",
];

/* ---------------- Module 7: capstone ---------------- */

export const CAPSTONE = {
  title: "The evening before cutover rehearsal",
  intro: "Rehearsal starts tomorrow morning. You notice that:",
  facts: [
    "your task is marked complete, but its evidence link points to an older version of the output;",
    "a dependent team has moved its delivery time by 30 minutes and says the runbook need not be updated;",
    "a defect appeared once in your last test and cannot be reproduced; and",
    "a senior colleague asks for a customer-data extract through an unapproved channel so they can investigate quickly.",
  ],
  close: "You have a couple of hours before the rehearsal briefing.",
  improved: "You are now applying the Team Member role through clear results, controlled information, usable evidence and early escalation.",
  review: "You have completed the pathway. Review the highlighted module before your next live task.",
};

export const CAPSTONE_DECISIONS: Decision[] = [
  {
    capability: "evidence",
    question: "What must be confirmed before your task's completion stands?",
    options: [
      { id: "a", text: "Nothing further. The task was accepted, and the older link can be fixed after the rehearsal.", feedback: "Acceptance of the wrong version does not prove the current output is ready." },
      { id: "b", text: "That the current version was checked and accepted, and the evidence link points to it. If not, tell the owner it is not yet complete.", feedback: "Recommended. Completion depends on accepted proof of the right version." },
      { id: "c", text: "Replace the link with the current version yourself so the record is correct before the rehearsal.", feedback: "Fixes the link but claims acceptance of a version nobody has checked." },
      { id: "d", text: "Mark the task incomplete in the plan and redo the work so the output and evidence match.", feedback: "Too much. The output may be fine; what is missing is confirmed acceptance of it." },
    ],
    answer: "b",
    reasoning: "Work is complete when the agreed result is accepted and the proof can be found for the version in use.",
  },
  {
    capability: "result",
    question: "How should you handle the 30-minute timing change?",
    options: [
      { id: "a", text: "Adjust your own start time by 30 minutes so your task still lines up with their delivery.", feedback: "Changes the runbook informally. Other tasks and checkpoints may depend on the original timing." },
      { id: "b", text: "Accept their view, because 30 minutes is within normal tolerance for a rehearsal.", feedback: "Deciding the runbook does not need updating is not your call, or theirs alone." },
      { id: "c", text: "Raise the change with the runbook owner so it can be assessed and approved, and follow the current runbook until then.", feedback: "Recommended. It keeps the change controlled and visible to everyone it affects." },
      { id: "d", text: "Ask the dependent team to deliver at the original time to protect the approved runbook.", feedback: "Protects your task, but the timing may have changed for a good reason that others need to know." },
    ],
    answer: "c",
    reasoning: "Timing and sequence change only through the approved runbook and its owner, not through an informal message.",
  },
  {
    capability: "raise",
    question: "How should the one-off defect be recorded and raised?",
    options: [
      { id: "a", text: "Log it with the evidence you have, the conditions when it appeared and the likely effect, and flag it before the briefing.", feedback: "Recommended. An unreproduced defect is still a fact others need to weigh." },
      { id: "b", text: "Keep testing tonight and log it only if it happens again, to avoid a false alarm before the rehearsal.", feedback: "May waste the time others need to respond, and hides a real result." },
      { id: "c", text: "Mention it verbally at the briefing so the team is aware, without adding it to the defect log.", feedback: "Visible, but not recorded, owned or traceable." },
      { id: "d", text: "Record it as closed, because it could not be reproduced and the test later passed.", feedback: "Closing it without a cause or fix removes the evidence of a real failure." },
    ],
    answer: "a",
    reasoning: "Record the actual result, not the expected one. Raise the fact and its effect while there is still time to respond.",
  },
  {
    capability: "information",
    question: "How should you respond to the senior colleague's data request?",
    options: [
      { id: "a", text: "Send it, since they are senior and the investigation is urgent, and note the request in your records.", feedback: "Seniority does not make an unapproved channel acceptable." },
      { id: "b", text: "Send a smaller extract with only the fields they need, to lower the risk.", feedback: "Still moves customer data through an unapproved route." },
      { id: "c", text: "Offer to share it through the approved system if they are authorised, and raise the access need with your Lead.", feedback: "Recommended. It helps the investigation without creating a data risk." },
      { id: "d", text: "Refuse and wait until after the rehearsal to discuss the investigation.", feedback: "Protects the data, but leaves a real investigation without a route forward." },
    ],
    answer: "c",
    reasoning: "Use only approved channels and authorised people. Raise access problems instead of creating a workaround.",
  },
];
