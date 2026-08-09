import { createFileRoute, Link } from "@tanstack/react-router";
import { brand, categories, craftSteps, images, products, testimonials, whyNaveh } from "@/data/catalog";
import { priceLabel } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NAVEH Kids — Handcrafted Wooden Toys & Kids Furniture" },
      {
        name: "description",
        content:
          "Crafted for every little blessing. Wooden scooters, rocking dinosaurs, Montessori climbing arches and convertible kitchen towers, handmade in Bengaluru and delivered across India.",
      },
      { property: "og:title", content: "NAVEH Kids — Crafted for every little blessing" },
      {
        property: "og:description",
        content: "Heirloom-quality wooden toys and furniture for children, handmade in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <div>
      <section className="bg-secondary/60">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">{brand.name}</p>
            <h1 className="display-xl mt-5">Crafted for every little blessing.</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Wooden scooters, rockers and Montessori pieces shaped by hand in our family workshop —
              soft edges, toy-safe finishes and the kind of quality that gets handed down.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop the collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Our story</Link>
              </Button>
            </div>
          </div>
          <img
            src={images.hero}
            alt="Handcrafted NAVEH Kids wooden scooter in a sunlit playroom"
            width={1600}
            height={1200}
            className="w-full rounded-[2rem] object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow">Browse</p>
        <h2 className="display-lg mt-3">Shop by category</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to="/category/$slug"
              params={{ slug: category.slug }}
              className="group overflow-hidden rounded-3xl bg-card shadow-soft"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-6">
                <p className="eyebrow">{category.tagline}</p>
                <h3 className="mt-2 text-xl">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow">Favourites</p>
        <h2 className="display-lg mt-3">Loved in homes across India</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
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
              <h3 className="mt-4 text-base">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{priceLabel(product)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-[2rem] bg-blush/40 p-8 md:p-14">
          <p className="eyebrow">Why NAVEH?</p>
          <h2 className="display-lg mt-3">Four reasons families choose us.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyNaveh.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 rounded-[2rem] bg-secondary/60 p-8 md:p-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The workshop</p>
            <h2 className="display-lg mt-3">Four steps, entirely by hand.</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {craftSteps.map((item) => (
                <div key={item.step}>
                  <span className="font-display text-sm text-accent">{item.step}</span>
                  <h3 className="mt-2 text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={images.craft}
            alt="Craftsman hand-sanding a wooden toy in the NAVEH workshop"
            loading="lazy"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow">Kind words</p>
        <h2 className="display-lg mt-3">From our families</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.id} className="rounded-3xl bg-card p-7 shadow-soft">
              <blockquote className="text-sm leading-relaxed text-muted-foreground">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                {item.name}
                <span className="text-muted-foreground"> · {item.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
