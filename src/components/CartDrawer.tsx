import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, setQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-foreground/25 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-background shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-lg">Your cart</h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Your cart is empty. Every piece is made by hand — pick one to begin.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/shop" onClick={closeCart}>
                    Browse the collection
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="flex flex-col gap-5">
                    {lines.map((line) => (
                      <li key={line.productId} className="flex gap-4">
                        <Link
                          to="/product/$slug"
                          params={{ slug: line.slug }}
                          onClick={closeCart}
                          className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary"
                        >
                          <img
                            src={line.image}
                            alt={line.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="truncate text-sm font-medium">{line.name}</p>
                            <button
                              type="button"
                              onClick={() => removeItem(line.productId)}
                              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatINR(line.price)}
                          </p>
                          <div className="mt-3 inline-flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity(line.productId, line.quantity - 1)}
                              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-secondary"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm">{line.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(line.productId, line.quantity + 1)}
                              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-secondary"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border px-5 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatINR(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Shipping is calculated at checkout.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild size="lg" className="rounded-full">
                      <Link to="/checkout" onClick={closeCart}>
                        Proceed to checkout
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="rounded-full">
                      <Link to="/cart" onClick={closeCart}>
                        View full cart
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
