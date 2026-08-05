import { useState } from "react";
import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Star, PackageOpen, ShieldCheck, Truck } from "lucide-react";
import { products } from "@/data/catalog";
import { availabilityLabel, formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    const related = [
      ...products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id),
      ...products.filter((p) => p.categorySlug !== product.categorySlug && p.featured),
    ].slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found | Kaaru Woodcraft" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | Kaaru Woodcraft` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: `${product.name} — Kaaru Woodcraft` },
        { property: "og:description", content: product.shortDescription },
      ],
    };
  },
  component: ProductDetail,
});

const assemblySteps = [
  { step: "01", title: "Unbox", body: "Lay the labelled parts out on the floor; every fixing is pre-sorted." },
  { step: "02", title: "Assemble", body: "Follow the illustrated card — six steps or fewer, one allen key." },
  { step: "03", title: "Play", body: "Tighten once more after a week of use, then forget about it." },
];

function ProductDetail() {
  const { product, related } = Route.useLoaderData();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const soldOut = product.availability === "sold_out";

  const specs: Array<[string, string]> = [
    ["Dimensions", product.specs.dimensions],
    ["Materials", product.specs.materials],
    ["Wood type", product.specs.woodType],
    ["Finish", product.specs.finish],
    ["Recommended age", product.specs.recommendedAge],
    ["Weight", product.specs.weight],
    ["Assembly time", product.specs.assemblyTime],
    ["Assembly difficulty", product.specs.assemblyDifficulty],
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
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="display-lg text-[2rem] leading-tight md:text-[2.6rem]">{product.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="font-display text-3xl">{formatINR(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <p className="mt-3 text-sm text-accent">{availabilityLabel[product.availability]}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="h-11 flex-1 rounded-full sm:flex-none sm:px-8"
              disabled={soldOut}
              onClick={() => addItem(product, quantity)}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              className="h-11 flex-1 rounded-full sm:flex-none sm:px-8"
              disabled={soldOut}
              onClick={() => {
                addItem(product, quantity);
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Assurance icon={PackageOpen} label={product.specs.assemblyTime} sub="Easy assembly" />
            <Assurance icon={Truck} label="Free standard shipping" sub="Across India" />
            <Assurance icon={ShieldCheck} label="Toy-safe finish" sub="EN 71-3 compliant" />
          </div>

          <Separator className="my-8" />

          <h2 className="text-lg">Product information</h2>
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="display-lg text-[1.8rem] md:text-[2.2rem]">The story of this piece</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-lg">What's included</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {product.included.map((item: string) => (
              <li key={item} className="flex gap-3 border-b border-border pb-3 text-sm">
                <span className="text-accent">—</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mt-24 rounded-[2rem] bg-secondary/60 p-8 md:p-14">
        <Reveal>
          <p className="eyebrow">Assembly</p>
          <h2 className="display-lg mt-3 text-[1.8rem] md:text-[2.2rem]">Easy Assembly</h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            {product.specs.assemblyDifficulty} · {product.specs.assemblyTime}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {assemblySteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.1}>
              <span className="font-display text-sm text-accent">{item.step}</span>
              <h3 className="mt-3 text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 max-w-3xl">
        <Reveal>
          <p className="eyebrow">Safety</p>
          <h2 className="display-lg mt-3 text-[1.8rem] md:text-[2.2rem]">Safe by construction.</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {product.safety.map((item: string) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mt-24">
        <Reveal>
          <h2 className="display-lg text-[1.8rem] md:text-[2.2rem]">You may also like</h2>
        </Reveal>
        <div className="mt-10">
          <ProductGrid products={related} />
        </div>
      </section>
    </div>
  );
}

function Assurance({
  icon: Icon,
  label,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary/70 px-4 py-3">
      <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
      <p className="mt-2 text-xs font-medium">{label}</p>
      <p className="text-[0.7rem] text-muted-foreground">{sub}</p>
    </div>
  );
}
