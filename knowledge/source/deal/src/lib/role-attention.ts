import { INTENSITY as SPONSOR } from "@/lib/learning/executive-sponsor";
import { INTENSITY as HUB } from "@/lib/learning/central-hub";
import { INTENSITY as WL } from "@/lib/learning/workstream-lead";
import { INTENSITY as WPM } from "@/lib/learning/workstream-project-manager";
import { INTENSITY as WTM } from "@/lib/learning/workstream-team-member";

export interface AttentionRow {
  period: string;
  intensity: string;
  level: number;
  text: string;
}

const HUB_ENTRY = { heading: "Where the Central Hub is needed most", rows: HUB };

/** Governance role id → "needed most" timeline, sourced from the training pathways. */
export const ROLE_ATTENTION: Record<string, { heading: string; rows: readonly AttentionRow[] }> = {
  "executive-sponsor": { heading: "Where Sponsor attention matters most", rows: SPONSOR },
  "transaction-director": HUB_ENTRY,
  "programme-manager": HUB_ENTRY,
  "pmo-support": HUB_ENTRY,
  "workstream-lead": { heading: "Where the Workstream Lead is needed most", rows: WL },
  "workstream-project-manager": { heading: "Where the Project Manager is needed most", rows: WPM },
  "workstream-team-member": { heading: "Where Team Members are needed most", rows: WTM },
};
