/**
 * Partner Acceleration content model.
 *
 * Functional nodes mirror the operating model workstreams (SPOKES). Likely
 * partner-support areas are derived from the approved externalSupport wording
 * held in src/lib/operating-model.ts. Where no source content exists the node
 * falls back to an explicit "to be confirmed" state — partner names, markets
 * and relationship statuses are never invented here.
 */

import { SPOKES } from "@/lib/operating-model";
import { getSpokeContent } from "@/lib/spoke-registry";

export const TBC_AREA = "To be confirmed with functional owner";
export const TBC = "To be confirmed";

export interface PartnerNode {
  id: string;
  name: string;
  /** The workstream's Catalogue of Services from the operating model */
  supportAreas: string[];
  /** Strategic partner, where known */
  strategicPartner: string;
}

const PLACEHOLDER_SOURCE = /content placeholder/i;

function toSupportAreas(externalSupport: string): string[] {
  if (!externalSupport || PLACEHOLDER_SOURCE.test(externalSupport)) {
    return [TBC_AREA, TBC_AREA];
  }
  const areas = externalSupport
    .replace(/\.$/, "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  while (areas.length < 2) areas.push(TBC_AREA);
  return areas.slice(0, 3);
}

export const PARTNER_NODES: PartnerNode[] = SPOKES.map((spoke) => ({
  id: spoke.id,
  name: spoke.name,
  supportAreas: getSpokeContent(spoke.id)?.serviceCatalogue?.length
    ? [...getSpokeContent(spoke.id)!.serviceCatalogue!]
    : toSupportAreas(spoke.externalSupport),
  strategicPartner: TBC,
}));

/** Standard activation actions offered to functional owners. */
export const ACTIVATION_ACTIONS = [
  "Confirm availability",
  "Agree scope",
  "Confirm commercials",
  "Complete sourcing",
  "Complete onboarding",
  "Execute NDA",
  "Confirm country coverage",
  "Confirm resource availability",
];

export const RELATIONSHIP_STATUSES = [
  "Strategic partner",
  "Existing relationship",
  "Approved supplier",
  "Relationship exists but not deal-ready",
  "New partner required",
  TBC,
];

/** Partner services catalogue — capability categories, not named suppliers. */
export const SERVICE_CATALOGUE = [
  {
    category: "Advisory and specialist expertise",
    detail: "Technical or regulatory expertise not held internally, engaged for defined questions.",
  },
  {
    category: "Delivery capacity",
    detail: "Additional hands to deliver a defined scope alongside business-as-usual demand.",
  },
  {
    category: "Local market and jurisdictional expertise",
    detail: "In-country legal, regulatory, tax and operational knowledge for in-scope markets.",
  },
  {
    category: "Independent assurance",
    detail: "Independent review of readiness, migration and control effectiveness.",
  },
  {
    category: "Technology and data engineering",
    detail: "Build, integration, migration engineering and testing capacity.",
  },
  {
    category: "Programme and PMO support",
    detail: "Programme management, reporting and mobilisation support at peak load.",
  },
];
