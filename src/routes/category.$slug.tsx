import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { categories, products } from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found | Kaaru Woodcraft" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} | Kaaru Woodcraft` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} — Kaaru Woodcraft` },
        { property: "og:description", content: category.description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = products.filter((p) => p.categorySlug === category.slug);

  return (
    <div>
      <section className="relative">
        <div className="h-[46vh] min-h-[300px] w-full overflow-hidden bg-secondary">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
            width={1024}
            height={1024}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/75">
            <Link to="/categories" className="link-underline">
              Categories
            </Link>
          </p>
          <h1 className="display-lg mt-3 text-primary-foreground">{category.name}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/85">
            {category.description}
          </p>
        </div>
      </section>

      <div className="container-page py-16 md:py-20">
        <Reveal>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border px-6 py-20 text-center">
              <p className="font-display text-xl">This collection is being carved.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ask us about a commission on the{" "}
                <Link to="/custom-orders" className="link-underline text-foreground">
                  custom orders
                </Link>{" "}
                page.
              </p>
            </div>
          ) : (
            <ProductGrid products={items} columns={3} />
          )}
        </Reveal>
      </div>
    </div>
  );
}
