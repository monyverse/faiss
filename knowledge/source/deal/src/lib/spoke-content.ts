/**
 * Shared shape for SA Functional Spoke workstream content.
 *
 * All strings in the per-workstream content files are approved source content
 * reproduced verbatim from the Absa M&A Transaction Operating Model document.
 * Do not summarise, paraphrase or correct the wording.
 */

export interface NecessityRow {
  archetype: string;
  classification: string;
  rationale: string;
}

export interface MandateRow {
  id: string;
  area: string;
  spokeAuthority: string[];
  hubRole: string;
  regionalRole: string;
  governance: string;
  escalation: string;
}

export interface CapabilityRow {
  category: string;
  content: string;
}

export interface Milestone {
  name: string;
  activities: string[];
}

export interface ActivitySet {
  id: string;
  heading: string;
  tab: string;
  lead?: string;
  milestones: Milestone[];
}

export interface PartnerServiceRow {
  keyService: string;
  absaOwned: string;
  preferredVendor: string;
}

export interface SpokeContent {
  /** Route id, e.g. "risk" */
  id: string;
  /** Display name used in the diagram and breadcrumbs */
  name: string;
  /** Optional document reference; left blank because section numbers are not shown */
  reference: string;
  necessityRows: NecessityRow[];
  keyRole: string;
  responsibilities: string[];
  boundaryItems: string[];
  centralHubRelationship: string;
  regionalRelationship: string[];
  externalDependencies: string;
  mandateRows: MandateRow[];
  capabilityRows: CapabilityRow[];
  milestoneIntro: string[];
  /** Catalogue of Services, shown at the top of Key Milestones and Activities */
  serviceCatalogue?: string[];
  activitySets: ActivitySet[];
  sizingFactors: string;
  /** Sizing drivers from the Deal Archetypes and Workstream Considerations document */
  sizingDrivers?: string[];
  /** Partner Acceleration table rows */
  partnerServices?: PartnerServiceRow[];
}

export const PENDING = "Awaiting source content.";
