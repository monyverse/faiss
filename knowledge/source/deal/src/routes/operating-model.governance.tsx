import { createFileRoute, Link } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { ChevronRight } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { GovernanceStructure } from "@/components/GovernanceStructure";
import { GovernanceAccountabilityStructure } from "@/components/GovernanceAccountabilityStructure";
import { HubRolesAccountability } from "@/components/HubRolesAccountability";

import { ACCOUNTABILITY_MATRIX } from "@/lib/operating-model";

export const Route = createFileRoute("/operating-model/governance")({
  head: () => ({
    meta: [
      { title: "Governance, Accountability and Resourcing | Absa M&A Operating Model" },
      {
        name: "description",
        content:
          "Who owns the business case, the transaction budget, strategic and execution decisions, delivery, escalation and functional approvals, plus the minimum and triggered resourcing model.",
      },
      {
        property: "og:title",
        content: "Governance, Accountability and Resourcing | Absa M&A Operating Model",
      },
      {
        property: "og:description",
        content:
          "Executive sponsor, transaction director, programme director, PMO, functional leads and country representatives with mandates and enabling conditions.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GovernancePage,
});


function GovernancePage() {
  const navigate = Route.useNavigate();

  const selectForum = (id: string) => {
    void navigate({ to: "/operating-model/forums/$forumId", params: { forumId: id } });
  };


  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          {
            label: "Operating Model",
            to: "/operating-model",
            search: { archetype: "balance-sheet-acquisition" },
          },
          { label: "Governance" },
        ]}
        back={{
          label: "Back to operating model",
          to: "/operating-model",
          search: { archetype: "balance-sheet-acquisition" },
        }}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Governance</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Governance, accountability and resourcing
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Four tiers, from sponsorship to delivery. The distinction that matters most is between the
          executive sponsor who owns the business case, the transaction director who owns execution
          and the budget, and the programme director who manages detailed delivery.
        </p>

        {/* Governance structure */}
        <section className="mt-10">
          <p className="label-eyebrow">Governance structure</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            How transaction progress, risks, dependencies and decisions move from workstream
            delivery through to executive oversight.
          </p>
          <div className="mt-5">
            <GovernanceStructure onSelectForum={selectForum} />
          </div>
          <Link
            to="/operating-model/remedial-actions"
            className="group mt-5 flex items-center justify-between gap-4 rounded-xl border border-maroon/30 bg-blush px-5 py-4 transition-colors hover:border-maroon/60"
          >
            <span>
              <span className="block font-display text-base font-semibold text-maroon">
                Click here to see remedial actions for each forum
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                What to do where a forum is not delivering its signs of success.
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-maroon transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>


        {/* Accountability matrix */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-maroon">Who owns what</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Accountability</th>
                  <th className="px-4 py-3 font-semibold">Owner</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Contributors</th>
                </tr>
              </thead>
              <tbody>
                {ACCOUNTABILITY_MATRIX.map((row) => (
                  <tr key={row.accountability} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground">{row.accountability}</td>
                    <td className="px-4 py-3 font-medium text-maroon">{row.owner}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {row.contributors}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Governance and accountability structure */}
        <section id="governance" className="mt-12 scroll-mt-4">
          <h2 className="font-display text-xl font-semibold text-maroon">
            Governance and accountability structure
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The four tiers, from sponsorship through to delivery. Select a role to see its mandate
            and enabling conditions.
          </p>
          <div className="mt-5">
            <GovernanceAccountabilityStructure />
          </div>
        </section>

        {/* Roles and accountability */}
        <section id="roles" className="mt-12 scroll-mt-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-semibold text-maroon">
              Roles and accountability
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Each transaction role with its role, responsibilities, mandate, pre-requisites and
              boundaries, plus activity-level accountability across the transaction.
            </p>
          </div>
          <div className="mt-5">
            <HubRolesAccountability />
          </div>
        </section>

        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
