import { createFileRoute, notFound } from "@tanstack/react-router";
import { SpokePlaceholderPage } from "@/components/SpokePlaceholderPage";
import { SpokeWorkstreamPage } from "@/components/SpokeWorkstreamPage";
import { getSpoke } from "@/lib/operating-model";
import { getSpokeContent } from "@/lib/spoke-registry";

export const Route = createFileRoute("/operating-model/spokes/$spokeId")({
  loader: ({ params }) => {
    const spoke = getSpoke(params.spokeId);
    if (!spoke) throw notFound();
    return {
      spokeId: params.spokeId,
      name: spoke.name,
      conditional: Boolean(spoke.conditional),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Absa M&A Capability Hub`;
    const description = `${loaderData.name} SA Functional Spoke: necessity by deal archetype, key role, responsibilities, decision mandate, capabilities, catalogue of services, milestones and activities, sizing factors and partner acceleration.`;
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
  component: SpokeDetailPage,
});

function SpokeDetailPage() {
  const { spokeId, name, conditional } = Route.useLoaderData();
  const content = getSpokeContent(spokeId);
  if (content) return <SpokeWorkstreamPage content={content} />;
  return <SpokePlaceholderPage name={name} conditional={conditional} />;
}
