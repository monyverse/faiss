import { Link } from "@tanstack/react-router";
import { SPOKES } from "@/lib/operating-model";
import { getSpokeContent } from "@/lib/spoke-registry";

const DEDICATED: Record<string, string> = {
  procurement: "/operating-model/spokes/procurement",
  compliance: "/operating-model/spokes/compliance",
  "change-management": "/operating-model/spokes/change-management",
  "finance-tax": "/operating-model/spokes/finance-tax",
  risk: "/operating-model/spokes/risk",
  "data-migration": "/operating-model/spokes/data-migration",
  technology: "/operating-model/spokes/technology",
  "migration-assurance": "/operating-model/spokes/independent-assurance",
  "independent-assurance": "/operating-model/spokes/independent-assurance",
  "kyc-aml": "/operating-model/spokes/kyc-aml",
  "ld1-readiness": "/operating-model/spokes/ld1-readiness",
};

export function FunctionQuickNav() {
  const items = SPOKES.filter((s) => DEDICATED[s.id] || getSpokeContent(s.id)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return (
    <section className="mx-auto max-w-6xl px-6 pt-10" aria-labelledby="function-quick-nav">
      <p id="function-quick-nav" className="label-eyebrow">Jump to a function</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        <li>
          <Link
            to="/operating-model/central-hub"
            className="inline-flex rounded-full border border-maroon/40 bg-blush/50 px-3 py-1.5 text-sm font-medium text-maroon transition-colors hover:border-maroon"
          >
            Central Hub
          </Link>
        </li>
        {items.map((s) => {
          const dedicated = DEDICATED[s.id];
          return (
            <li key={s.id}>
              <Link
                to={(dedicated ?? "/operating-model/spokes/$spokeId") as never}
                params={(dedicated ? undefined : { spokeId: s.id }) as never}
                className="inline-flex rounded-full border border-input bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
              >
                {s.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
