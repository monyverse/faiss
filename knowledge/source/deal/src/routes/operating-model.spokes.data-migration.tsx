import { createFileRoute } from "@tanstack/react-router";
import { SpokeWorkstreamPage } from "@/components/SpokeWorkstreamPage";
import { CONTENT } from "@/lib/data-migration-spoke";

const DESCRIPTION =
  "Data Migration SA Functional Spoke: necessity by deal archetype, key role, responsibilities, decision mandate, capabilities, milestones and activities, sizing factors and partner acceleration.";
const TITLE = "Data Migration | Absa M&A Capability Hub";

export const Route = createFileRoute("/operating-model/spokes/data-migration")({
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
