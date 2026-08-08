import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/data/catalog";
import { CategoryCard } from "@/components/CategoryCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Ride-Ons, Rockers, Scooters | Kaaru Woodcraft" },
      {
        name: "description",
        content:
          "Browse Kaaru by category: ride-on toys, rocking horses, wooden scooters, balance toys, educational toys, cars, furniture and custom commissions.",
      },
      { property: "og:title", content: "Browse Kaaru Woodcraft by Category" },
      {
        property: "og:description",
        content: "Eight collections of handcrafted wooden products for children.",
      },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow">Browse</p>
          <h1 className="display-lg mt-4">Find your way in.</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Eight collections, one workshop. Each begins with the same plank of hardwood and ends
            somewhere quite different.
          </p>
        </header>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} tall={index % 5 === 0} />
        ))}
      </div>
    </div>
  );
}