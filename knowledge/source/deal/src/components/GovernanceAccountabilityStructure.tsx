import { Link } from "@tanstack/react-router";
import { GOVERNANCE_ROLES } from "@/lib/operating-model";

const TIERS = [
  "Sponsorship",
  "Transaction leadership",
  "Delivery leadership",
  "Delivery",
] as const;

export function GovernanceAccountabilityStructure() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-panel lg:p-6">
      <p className="label-eyebrow">Governance and accountability structure</p>
      <div className="mt-5 space-y-0">
        {TIERS.map((tier, tierIndex) => {
          const roles = GOVERNANCE_ROLES.filter((r) => r.tier === tier);
          const emphasised = tier === "Sponsorship" || tier === "Transaction leadership";
          return (
            <div key={tier}>
              {tierIndex > 0 && <div className="mx-auto h-5 w-px bg-maroon/40" />}
              <div className="rounded-lg border border-maroon/15 bg-surface p-3">
                <p className="text-center text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {tier}
                </p>
                <div className={`mt-3 grid gap-2 ${roles.length > 1 ? "sm:grid-cols-3" : ""}`}>
                  {roles.map((role) => (
                    <Link
                      key={role.id}
                      to="/operating-model/roles/$roleId"
                      params={{ roleId: role.id }}
                      className={`block rounded-md border px-4 py-3 text-center transition-colors ${
                        emphasised
                          ? "border-maroon bg-maroon text-maroon-foreground hover:bg-maroon/90"
                          : "border-maroon/25 bg-blush text-maroon hover:border-maroon/50"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{role.title}</span>
                      <span
                        className={`mt-0.5 block text-[0.6875rem] leading-snug ${
                          emphasised ? "text-maroon-foreground/75" : "text-muted-foreground"
                        }`}
                      >
                        {role.oneLiner}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 border-t border-dashed border-maroon/30 pt-5">
        <p className="text-center text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Outside the governance structure · advises across levels
        </p>
        <Link
          to="/operating-model/roles/experienced-coach"
          className="mx-auto mt-3 block max-w-md rounded-md border border-dashed border-maroon/50 bg-surface px-4 py-3 text-center text-maroon transition-colors hover:border-maroon hover:bg-blush"
        >
          <span className="block text-sm font-semibold">Experienced Coach</span>
          <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted-foreground">
            Transfers practical M&A experience into current delivery without taking over accountability
          </span>
        </Link>
      </div>
    </div>
  );
}
