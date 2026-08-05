import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  quickView?: boolean;
}

export function ProductGrid({ products, columns = 4, quickView = true }: ProductGridProps) {
  const [active, setActive] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border px-6 py-20 text-center">
        <p className="font-display text-xl">Nothing matches those filters yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try widening the price range or clearing a category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          columns === 3
            ? "grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            {...(quickView ? { onQuickView: setActive } : {})}
          />
        ))}
      </div>
      <QuickViewModal product={active} onClose={() => setActive(null)} />
    </>
  );
}
