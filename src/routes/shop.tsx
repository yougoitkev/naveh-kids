import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/catalog";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Wooden Toys & Kids Furniture | NAVEH Kids" },
      {
        name: "description",
        content:
          "Browse every NAVEH Kids piece — wooden scooters, rockers, Montessori arches, kitchen towers and child-scale furniture.",
      },
      { property: "og:title", content: "Shop the NAVEH Kids collection" },
      {
        property: "og:description",
        content: "Handcrafted wooden toys, ride-ons and furniture for children.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">The collection</p>
      <h1 className="display-lg mt-4">Everything we make.</h1>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} to="/product/$slug" params={{ slug: product.slug }} className="group">
            <div className="overflow-hidden rounded-3xl bg-secondary">
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h2 className="mt-4 text-base">{product.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>
            <p className="mt-2 text-sm">{formatINR(product.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
