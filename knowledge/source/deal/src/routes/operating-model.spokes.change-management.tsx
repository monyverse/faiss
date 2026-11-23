import { createFileRoute } from "@tanstack/react-router";
import { SpokeWorkstreamPage } from "@/components/SpokeWorkstreamPage";
import { CONTENT } from "@/lib/change-management-spoke";

const DESCRIPTION =
  "Change Management SA Functional Spoke: necessity by deal archetype, key role, responsibilities, decision mandate, capabilities, milestones and activities, sizing factors and partner acceleration.";
const TITLE = "Change Management | Absa M&A Capability Hub";

export const Route = createFileRoute("/operating-model/spokes/change-management")({
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
