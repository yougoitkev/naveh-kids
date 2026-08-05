import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { availabilityLabel, formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const soldOut = product.availability === "sold_out";
  const cover = product.images[0] ?? "";
  const hover = product.images[1] ?? cover;



  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden rounded-3xl bg-secondary">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={product.name}
          className="block aspect-square"
        >
          <img
            src={cover}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <img
            src={hover}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-2 rounded-full bg-card/90 px-3.5 py-2 text-xs font-medium text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="h-3.5 w-3.5" /> Quick view
          </button>
        )}

        {product.compareAtPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[0.68rem] font-medium tracking-wide text-accent-foreground">
            Save {formatINR(product.compareAtPrice - product.price)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium leading-snug">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-base font-medium">{formatINR(product.price)}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <p
          className={cn(
            "mt-2.5 text-xs tracking-wide",
            soldOut ? "text-muted-foreground" : "text-accent",
          )}
        >
          {availabilityLabel[product.availability]}
        </p>

        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={soldOut}
            onClick={() => addItem(product)}
            className="w-full rounded-full border-border bg-transparent transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            {soldOut ? "Sold out" : "Add to cart"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
