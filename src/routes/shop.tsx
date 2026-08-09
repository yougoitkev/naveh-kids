import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/catalog";
import { priceLabel } from "@/lib/format";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Wooden Toys & Kids Furniture | NAVEH Kids" },
      {
        name: "description",
        content:
          "Browse every NAVEH Kids piece — the wooden scooter, rocking dinosaur, climbing arch, arch chair and convertible kitchen towers. Delivered across India.",
      },
      { property: "og:title", content: "Shop the NAVEH Kids collection" },
      {
        property: "og:description",
        content: "Handcrafted wooden ride-ons, rockers, Montessori play and learning towers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (active === "all" || p.categorySlug === active) &&
        (term === "" ||
          p.name.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term)),
    );
  }, [active, query]);

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">The collection</p>
      <h1 className="display-lg mt-4">Everything we make.</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        Six pieces, each one designed, cut, sanded and finished in our Bengaluru workshop.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            active === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card hover:bg-secondary"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActive(category.slug)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === category.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            {category.name}
          </button>
        ))}
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the collection"
          aria-label="Search the collection"
          className="ml-auto w-full rounded-full border border-border bg-card px-5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-64"
        />
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <Link
            key={product.id}
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="group"
          >
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
            <p className="mt-2 text-sm">{priceLabel(product)}</p>
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">
          Nothing matches that search yet — try another word.
        </p>
      ) : null}
    </div>
  );
}
