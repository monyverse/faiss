import { createFileRoute, notFound } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { getRole } from "@/lib/operating-model";
import { getRoleProfile } from "@/lib/role-profiles";
import { ROLE_ATTENTION } from "@/lib/role-attention";
import { AttentionTimeline } from "@/components/AttentionTimeline";

export const Route = createFileRoute("/operating-model/roles/$roleId")({
  loader: ({ params }) => {
    const role = getRole(params.roleId);
    if (!role) throw notFound();
    return { role };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Role unavailable | Absa M&A Operating Model" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.role.title} | Absa M&A Operating Model`;
    const description = loaderData.role.oneLiner;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: RolePage,
  notFoundComponent: RoleNotFound,
});

function RoleNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          { label: "Operating Model", to: "/operating-model" },
          { label: "Governance", to: "/operating-model/governance" },
          { label: "Role" },
        ]}
        back={{ label: "Back to governance", to: "/operating-model/governance" }}
      />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-maroon">Role not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          That role does not exist in the governance and accountability structure.
        </p>
      </main>
    </div>
  );
}

function RoleAttention({ roleId }: { roleId: string }) {
  const entry = ROLE_ATTENTION[roleId];
  if (!entry) return null;
  return (
    <section className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{entry.heading}</p>
      <div className="mt-3">
        <AttentionTimeline rows={entry.rows} />
      </div>
    </section>
  );
}

function Bullets({ items, tone = "muted" }: { items: string[]; tone?: "muted" | "strong" }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
          <span
            className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${
              tone === "strong" ? "bg-maroon" : "bg-maroon/60"
            }`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function RolePage() {
  const { role } = Route.useLoaderData();
  const profile = getRoleProfile(role.id);

  if (profile) {
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
            { label: "Governance", to: "/operating-model/governance" },
            { label: role.title },
          ]}
          back={{ label: "Back to governance", to: "/operating-model/governance" }}
        />
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="label-eyebrow mt-6">{role.tier}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
            {profile.heading}
          </h1>

          <div className="mt-8 rounded-xl border border-maroon/25 bg-blush p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">Purpose</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{profile.purpose}</p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Reports to
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{profile.reportsTo}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Direct reports
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{profile.directReports}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Core responsibilities
              </p>
              <Bullets items={profile.coreResponsibilities} tone="strong" />
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Success measures
              </p>
              <Bullets items={profile.successMeasures} />
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Experience profile
              </p>
              <Bullets items={profile.experienceProfile} />
            </div>
          </div>
          <RoleAttention roleId={role.id} />
        </main>
      </div>
    );
  }


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
          { label: "Governance", to: "/operating-model/governance" },
          { label: role.title },
        ]}
        back={{ label: "Back to governance", to: "/operating-model/governance" }}
      />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">{role.tier}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          {role.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {role.oneLiner}
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Responsibilities
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{role.responsibilities}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Mandate
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{role.mandate}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-panel lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Boundaries
            </p>
            {role.boundaries.length ? (
              <Bullets items={role.boundaries} />
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">None specified</p>
            )}
          </div>
        </div>
        <RoleAttention roleId={role.id} />
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
