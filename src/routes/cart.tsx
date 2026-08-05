import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { shippingMethods } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Kaaru Woodcraft" },
      {
        name: "description",
        content: "Review the handcrafted wooden pieces in your cart before checkout.",
      },
      { property: "og:title", content: "Your Cart — Kaaru Woodcraft" },
      { property: "og:description", content: "Review your handcrafted wooden pieces." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQuantity, removeItem } = useCart();
  const shipping = subtotal > 0 ? (shippingMethods[0]?.price ?? 0) : 0;
  const total = subtotal + shipping;

  return (
    <div className="container-page py-14 md:py-20">
      <h1 className="display-lg">Your cart</h1>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border px-6 py-24 text-center">
          <p className="font-display text-xl">Nothing here yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Every piece is made by hand. Take your time choosing one.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/shop">Browse the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <ul className="flex flex-col">
            {lines.map((line) => (
              <li
                key={line.productId}
                className="grid grid-cols-[6rem_minmax(0,1fr)] gap-5 border-b border-border py-6 first:pt-0 sm:grid-cols-[8rem_minmax(0,1fr)_auto]"
              >
                <Link
                  to="/product/$slug"
                  params={{ slug: line.slug }}
                  className="aspect-square overflow-hidden rounded-2xl bg-secondary"
                >
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <Link
                    to="/product/$slug"
                    params={{ slug: line.slug }}
                    className="link-underline font-display text-lg"
                  >
                    {line.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{formatINR(line.price)}</p>
                  <div className="mt-4 inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(line.productId, line.quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(line.productId, line.quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="col-start-2 flex items-start justify-between gap-4 sm:col-start-3 sm:flex-col sm:items-end">
                  <span className="font-medium">{formatINR(line.price * line.quantity)}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId)}
                    aria-label={`Remove ${line.name}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card p-6">
              <h2 className="font-display text-lg">Order summary</h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                <Row
                  label="Estimated shipping"
                  value={shipping === 0 ? "Free" : formatINR(shipping)}
                />
                <div className="mt-2 flex items-center justify-between border-t border-border pt-4 text-base">
                  <dt className="font-medium">Total</dt>
                  <dd className="font-display text-xl">{formatINR(total)}</dd>
                </div>
              </dl>
              <Button asChild size="lg" className="mt-6 w-full rounded-full">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Taxes included. Shipping options are chosen at checkout.
              </p>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
