import { createFileRoute } from "@tanstack/react-router";
import { Storefront } from "@/components/carry-nest/Storefront";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Carry Nest | Carry what you love" },
      { name: "description", content: "Carry Nest is a considered handbag concept collection for the things you love to carry." },
      { property: "og:title", content: "Carry Nest | Carry what you love" },
      { property: "og:description", content: "Discover a considered edit of handbag concepts in burgundy, espresso, rose, and ivory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
function Index() {
  return <Storefront />;
}
