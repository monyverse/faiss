import { ARCHETYPES } from "@/lib/archetypes";
import { LIFECYCLES, type LifecycleItem } from "@/lib/lifecycles";
import { GOVERNANCE_ROLES, SPOKES } from "@/lib/operating-model";
import { DAY_DETAILS } from "@/lib/mobilisation";
import { SERVICE_CATALOGUE } from "@/lib/partner-acceleration";
import { WORKSTREAM_MINIMUMS } from "@/lib/regional-spoke";

export type SearchKind =
  | "Page"
  | "Archetype"
  | "Lifecycle stage"
  | "Activity"
  | "Artefact"
  | "Template reference"
  | "Role"
  | "Functional spoke"
  | "Regional spoke"
  | "Mobilisation day"
  | "Partner support";

export type SearchEntry = {
  kind: SearchKind;
  title: string;
  crumb: string;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  hash?: string;
  text: string;
};

const PAGES: Array<[string, string, string?]> = [
  ["Capability Hub homepage", "/"],
  ["Vision", "/vision"],
  ["Deal Lifecycle", "/deal-lifecycle"],
  ["Operating Model", "/operating-model"],
  ["Central Hub", "/operating-model/central-hub"],
  ["Functional Spokes", "/operating-model/spokes"],
  ["Assurance (Risk, Internal Audit, Independent Assurance)", "/operating-model/assurance"],
  ["Governance, roles and resourcing", "/operating-model/governance"],
  ["Transaction RACI", "/operating-model/raci"],
  ["Key Success Factors", "/operating-model/success-factors"],
  ["Deal journey", "/operating-model/journey"],
  ["What typically changes as part of Deal Governance?", "/deal-governance"],
  ["Mobilisation Roadmap", "/mobilisation"],
  ["Partner Accelerator", "/partner-acceleration"],
  ["Training & learning pathways", "/learning"],
  ["M&A Foundations pathway (Intro to M&A)", "/learning/foundations"],
  ["Accountable Executive (Executive Sponsor) pathway", "/learning/executive-sponsor"],
  ["Workstream Lead pathway", "/learning/workstream-lead"],
  ["Central Hub Programme Management pathway", "/learning/central-hub"],
  ["In-country PMO pathway", "/learning/in-country-pmo"],
  ["Workstream Project Manager pathway", "/learning/workstream-project-manager"],
  ["Workstream Team Member pathway", "/learning/workstream-team-member"],
];

const t = (items: LifecycleItem[]) => items.map((i) => [i.text, ...(i.subs ?? [])].join(" "));

let cache: SearchEntry[] | null = null;

export function getSearchIndex(): SearchEntry[] {
  if (cache) return cache;
  const out: SearchEntry[] = [];

  for (const [title, to] of PAGES) out.push({ kind: "Page", title, crumb: "Page", to, text: title });

  for (const a of ARCHETYPES) {
    out.push({
      kind: "Archetype",
      title: a.name,
      crumb: `Archetype · ${a.side === "acquisition" ? "Acquisition" : "Divestment"}`,
      to: "/deal-lifecycle",
      search: { archetype: a.id },
      hash: "archetypes",
      text: `${a.name} ${a.description} ${a.perimeter}`,
    });
  }

  for (const v of LIFECYCLES) {
    const name = v.variantLabel ? `${v.archetypeName} (${v.variantLabel})` : v.archetypeName;
    for (const s of v.stages) {
      const base = {
        to: "/deal-lifecycle",
        search: { archetype: v.archetypeId, stage: s.id },
        hash: "apply",
      };
      out.push({
        ...base,
        kind: "Lifecycle stage",
        title: s.title,
        crumb: `Lifecycle · ${name}`,
        text: `${s.title} ${s.purpose}`,
      });
      for (const [label, items] of [
        ["Necessary", s.necessary],
        ["Conditional", s.conditional],
        ["Optional", s.optional],
      ] as const) {
        t(items).forEach((text) =>
          out.push({ ...base, kind: "Activity", title: text, crumb: `Lifecycle · ${name} · ${s.title} · ${label}`, text }),
        );
      }
      t(s.artefacts).forEach((text) =>
        out.push({ ...base, kind: "Artefact", title: text, crumb: `Lifecycle · ${name} · ${s.title}`, text }),
      );
      t(s.templates).forEach((text) =>
        out.push({ ...base, kind: "Template reference", title: text, crumb: `Lifecycle · ${name} · ${s.title}`, text }),
      );
    }
  }

  for (const r of GOVERNANCE_ROLES) {
    out.push({
      kind: "Role",
      title: r.title,
      crumb: `Operating model · ${r.tier}`,
      to: "/operating-model/roles/$roleId",
      params: { roleId: r.id },
      text: `${r.title} ${r.oneLiner}`,
    });
  }

  for (const s of SPOKES) {
    out.push({
      kind: "Functional spoke",
      title: s.name,
      crumb: "Operating model · Functional spoke",
      to: "/operating-model/spokes/$spokeId",
      params: { spokeId: s.id },
      text: `${s.name} ${s.purpose}`,
    });
  }

  for (const [id, m] of Object.entries(WORKSTREAM_MINIMUMS)) {
    out.push({
      kind: "Regional spoke",
      title: `${m.name} (Regional Spoke)`,
      crumb: "Operating model · Regional spoke · Minimum capabilities",
      to: "/operating-model/regional/$spokeId",
      params: { spokeId: id },
      text: `${m.name} regional in-country ${m.items.join(" ")}`,
    });
  }

  for (const d of DAY_DETAILS) {
    out.push({
      kind: "Mobilisation day",
      title: `Day ${d.day}: ${d.title}`,
      crumb: "Mobilisation · First 10 Days",
      to: "/mobilisation",
      hash: `day-${d.day}`,
      text: `Day ${d.day} ${d.title} ${d.activities.join(" ")} ${d.outcomes.join(" ")}`,
    });
  }

  for (const c of SERVICE_CATALOGUE) {
    out.push({
      kind: "Partner support",
      title: c.category,
      crumb: "Support · Partner Accelerator",
      to: "/partner-acceleration",
      text: `${c.category} ${c.detail}`,
    });
  }

  cache = out;
  return out;
}

export function searchHub(query: string, limitPerKind = 6) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [] as Array<{ kind: SearchKind; items: SearchEntry[] }>;
  const groups = new Map<SearchKind, SearchEntry[]>();
  for (const e of getSearchIndex()) {
    const hay = `${e.title} ${e.text}`.toLowerCase();
    if (!terms.every((term) => hay.includes(term))) continue;
    const list = groups.get(e.kind) ?? [];
    if (list.length < limitPerKind) list.push(e);
    groups.set(e.kind, list);
  }
  return [...groups.entries()].map(([kind, items]) => ({ kind, items }));
}

export const OPEN_SEARCH_EVENT = "absa-hub-open-search";
export const openHubSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
