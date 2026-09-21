import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductDetailView } from "@/components/carry-nest/Storefront";
import { getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/product/$slug")({
  beforeLoad: ({ params }) => {
    if (!getProduct(params.slug)) throw notFound();
  },
  component: ProductPage,
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [
        { title: product ? `${product.name} | Carry Nest` : "Product | Carry Nest" },
        { name: "description", content: product?.description ?? "Explore the Carry Nest sample collection." },
        { property: "og:title", content: product ? `${product.name} | Carry Nest` : "Product | Carry Nest" },
        { property: "og:description", content: product?.tagline ?? "Explore the Carry Nest sample collection." },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function ProductPage() {
  const product = getProduct(Route.useParams().slug);
  if (!product) return null;
  return <ProductDetailView product={product} />;
}