import type { SpokeContent } from "@/lib/spoke-content";
import { CONTENT as COMMS } from "@/lib/comms-spoke";
import { CONTENT as FINANCE_TAX } from "@/lib/finance-tax-spoke";
import { CONTENT as CHANGE_MANAGEMENT } from "@/lib/change-management-spoke";
import { CONTENT as COMPLIANCE } from "@/lib/compliance-spoke";
import { CONTENT as PROCUREMENT } from "@/lib/procurement-spoke";
import { CONTENT as OPS_SERVICING } from "@/lib/ops-servicing-spoke";
import { CONTENT as PRODUCT } from "@/lib/product-spoke";
import { CONTENT as RISK } from "@/lib/risk-spoke";
import { CONTENT as DATA_MIGRATION } from "@/lib/data-migration-spoke";
import { CONTENT as TECHNOLOGY } from "@/lib/technology-spoke";
import { CONTENT as INDEPENDENT_ASSURANCE } from "@/lib/independent-assurance-spoke";
import { CONTENT as KYC_AML } from "@/lib/kyc-aml-spoke";
import { CONTENT as HUMAN_CAPITAL } from "@/lib/human-capital-spoke";
import { CONTENT as E2E_TESTING } from "@/lib/e2e-testing-spoke";
import { CONTENT as CLIENT_READINESS } from "@/lib/ld1-readiness-spoke";
import { CONTENT as LEGAL } from "@/lib/legal-spoke";
import { CONTENT as CRES } from "@/lib/cres-spoke";
import { CONTENT as INTERNAL_AUDIT } from "@/lib/internal-audit-spoke";

/** Every SA Functional Spoke keyed by the id used in the operating model diagram. */
export const SPOKE_CONTENT: Record<string, SpokeContent> = {
  comms: COMMS,
  "finance-tax": FINANCE_TAX,
  "change-management": CHANGE_MANAGEMENT,
  compliance: COMPLIANCE,
  procurement: PROCUREMENT,
  "ops-servicing": OPS_SERVICING,
  product: PRODUCT,
  risk: RISK,
  "data-migration": DATA_MIGRATION,
  technology: TECHNOLOGY,
  "independent-assurance": INDEPENDENT_ASSURANCE,
  "migration-assurance": INDEPENDENT_ASSURANCE,
  "kyc-aml": KYC_AML,
  hr: HUMAN_CAPITAL,
  "e2e-testing": E2E_TESTING,
  "ld1-readiness": CLIENT_READINESS,
  legal: LEGAL,
  cres: CRES,
  "internal-audit": INTERNAL_AUDIT,
};

export function getSpokeContent(id: string): SpokeContent | undefined {
  return SPOKE_CONTENT[id];
}
