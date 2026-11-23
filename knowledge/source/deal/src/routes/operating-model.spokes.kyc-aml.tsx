import { createFileRoute } from "@tanstack/react-router";
import { SpokeWorkstreamPage } from "@/components/SpokeWorkstreamPage";
import { CONTENT } from "@/lib/kyc-aml-spoke";

const DESCRIPTION =
  "KYC / AML SA Functional Spoke: necessity by deal archetype, key role, responsibilities, decision mandate, capabilities, milestones and activities, sizing factors and partner acceleration.";
const TITLE = "KYC / AML | Absa M&A Capability Hub";

export const Route = createFileRoute("/operating-model/spokes/kyc-aml")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SpokeWorkstreamPage content={CONTENT} />,
});
