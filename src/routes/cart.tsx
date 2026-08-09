import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { brand } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Basket | NAVEH Kids" },
      {
        name: "description",
        content: "Review the handcrafted wooden pieces in your NAVEH Kids basket before checkout.",
      },
      { property: "og:title", content: "Your basket | NAVEH Kids" },
      { property: "og:description", content: "Review your NAVEH Kids basket." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const freeShipping = subtotal >= brand.freeShippingThreshold;

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="display-lg">Your basket is empty.</h1>
        <p className="mt-4 text-muted-foreground">
          Have a look through the collection — everything is made in our own workshop.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-14 md:py-20">
      <h1 className="display-lg">Your basket</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-5 py-6">
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-28 rounded-2xl bg-secondary object-cover"
              />
              <div className="flex-1">
                <Link
                  to="/product/$slug"
                  params={{ slug: item.slug }}
                  className="text-base link-underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{formatINR(item.price)}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="px-3 py-1"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      className="px-3 py-1"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground link-underline"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-sm">{formatINR(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl bg-secondary/60 p-7">
          <h2 className="text-lg">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{freeShipping ? "Free" : "Calculated at checkout"}</dd>
            </div>
          </dl>
          {!freeShipping ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Add {formatINR(brand.freeShippingThreshold - subtotal)} more for free delivery.
            </p>
          ) : null}
          <Button asChild size="lg" className="mt-6 w-full">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
