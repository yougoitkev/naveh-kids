import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { categories, products } from "@/data/catalog";
import type { Category, Product } from "@/lib/types";
import { priceLabel } from "@/lib/format";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }): { category: Category; items: Product[] } => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category, items: products.filter((p) => p.categorySlug === category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Category not found | NAVEH Kids" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} — Wooden Kids Pieces | NAVEH Kids` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} | NAVEH Kids` },
        { property: "og:description", content: category.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData() as {
    category: Category;
    items: Product[];
  };

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">{category.tagline}</p>
      <h1 className="display-lg mt-4">{category.name}</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        {category.description}
      </p>
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
            <p className="mt-2 text-sm text-muted-foreground">{priceLabel(product)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
