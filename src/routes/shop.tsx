import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { products } from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, type FilterState } from "@/components/ProductFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Wooden Toys & Ride-Ons | Kaaru Woodcraft" },
      {
        name: "description",
        content:
          "Browse every handcrafted piece: rocking horses, wooden scooters, balance bikes, ride-ons, cars and child-scale furniture.",
      },
      { property: "og:title", content: "Shop the Kaaru Collection" },
      {
        property: "og:description",
        content: "Handcrafted wooden toys, ride-ons and furniture, filterable by category and price.",
      },
    ],
  }),
  component: Shop,
});

const PRICE_CEILING = 25000;

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

function Shop() {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    categories: [],
    maxPrice: PRICE_CEILING,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (query && !`${product.name} ${product.shortDescription}`.toLowerCase().includes(query))
        return false;
      if (filters.categories.length && !filters.categories.includes(product.categorySlug))
        return false;
      if (product.price > filters.maxPrice) return false;
      if (filters.inStockOnly && product.availability !== "in_stock") return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
    return sorted;
  }, [filters, sort]);

  const filterPanel = (
    <ProductFilters value={filters} onChange={setFilters} priceCeiling={PRICE_CEILING} />
  );

  return (
    <div className="container-page py-14 md:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">The collection</p>
        <h1 className="display-lg mt-4">Everything we make.</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Twelve pieces, each shaped from solid hardwood in our Bengaluru workshop. Filter by what
          you need — or browse slowly, the way it was made.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
            <p className="text-sm text-muted-foreground">
              {visible.length} {visible.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] overflow-y-auto p-6">
                  <SheetTitle className="font-display text-lg">Filters</SheetTitle>
                  <div className="mt-6">{filterPanel}</div>
                </SheetContent>
              </Sheet>

              <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
                <SelectTrigger className="h-9 w-[180px] rounded-full bg-card text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-10">
            <ProductGrid products={visible} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
