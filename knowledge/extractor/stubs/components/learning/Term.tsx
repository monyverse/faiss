import type { ReactNode } from "react";

/**
 * Extraction stub for the hub's <Term> popover. The real component pulls in Radix UI;
 * for extraction we only need the visible wording. Definitions are ingested separately
 * from the DEFS export, so the stub renders the term text alone.
 */
export function Term({ children }: { children: ReactNode; def: string }) {
  return <>{children}</>;
}
