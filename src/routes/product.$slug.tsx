import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { products } from "@/data/catalog";
import type { Product } from "@/lib/types";
import { availabilityLabel, formatINR, priceLabel } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: Product } => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found | NAVEH Kids" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | NAVEH Kids` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: `${product.name} — NAVEH Kids` },
        { property: "og:description", content: product.shortDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addItem } = useCart();

  const specs: Array<[string, string]> = [
    ["Dimensions", product.specs.dimensions],
    ["Materials", product.specs.materials],
    ["Finish", product.specs.finish],
    ["Recommended age", product.specs.recommendedAge],
    ["Weight", product.specs.weight],
    ["Assembly", `${product.specs.assemblyDifficulty} · ${product.specs.assemblyTime}`],
  ];

  return (
    <div className="container-page py-10 md:py-16">
      <nav className="text-xs text-muted-foreground">
        <Link to="/shop" className="link-underline">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="grid gap-4">
          {product.images.map((image: string) => (
            <img
              key={image}
              src={image}
              alt={product.name}
              loading="lazy"
              className="w-full rounded-3xl bg-secondary object-cover"
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="display-lg text-[2rem] leading-tight md:text-[2.6rem]">{product.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="font-display text-3xl">{priceLabel(product)}</span>
            {product.compareAtPrice ? (
              <span className="text-base text-muted-foreground line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-accent">{availabilityLabel[product.availability]}</p>

          {product.colours?.length ? (
            <div className="mt-6">
              <p className="eyebrow">Finishes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colours.map((colour: string) => (
                  <span
                    key={colour}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm"
                  >
                    {colour}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {product.priceOnRequest ? (
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">Enquire about this piece</Link>
            </Button>
          ) : (
            <Button
              size="lg"
              className="mt-8"
              disabled={product.availability === "sold_out"}
              onClick={() => addItem(product)}
            >
              Add to basket
            </Button>
          )}

          <p className="mt-10 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <h2 className="mt-10 text-lg">Product information</h2>
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-lg">What's included</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {product.included.map((item: string) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg">Safety</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {product.safety.map((item: string) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
