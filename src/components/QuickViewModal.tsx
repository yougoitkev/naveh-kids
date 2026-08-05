import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Product } from "@/lib/types";
import { availabilityLabel, formatINR } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-[3px]"
          />
          <div className="pointer-events-none fixed inset-0 z-[71] grid place-items-center p-4">
            <motion.div
              role="dialog"
              aria-label={product.name}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-card shadow-lift md:grid-cols-2"
            >
              <div className="aspect-square bg-secondary">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative flex flex-col p-6 md:p-8">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close quick view"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="eyebrow">{availabilityLabel[product.availability]}</p>
                <h2 className="mt-3 font-display text-2xl leading-tight">{product.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.description.slice(0, 220)}…
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <Spec label="Wood" value={product.specs.woodType} />
                  <Spec label="Age" value={product.specs.recommendedAge} />
                  <Spec label="Assembly" value={product.specs.assemblyTime} />
                  <Spec label="Weight" value={product.specs.weight} />
                </dl>
                <p className="mt-6 font-display text-2xl">{formatINR(product.price)}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    size="lg"
                    className="rounded-full"
                    disabled={product.availability === "sold_out"}
                    onClick={() => {
                      addItem(product);
                      onClose();
                    }}
                  >
                    Add to cart
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link to="/product/$slug" params={{ slug: product.slug }} onClick={onClose}>
                      View full details
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/70 px-3 py-2">
      <dt className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-foreground">{value}</dd>
    </div>
  );
}
