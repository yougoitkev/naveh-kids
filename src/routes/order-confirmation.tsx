import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { shippingMethods } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed | Kaaru Woodcraft" },
      { name: "description", content: "Your handcrafted order is confirmed and heading to the workshop." },
      { property: "og:title", content: "Order Confirmed — Kaaru Woodcraft" },
      { property: "og:description", content: "Your handcrafted order is confirmed." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmation,
});

const statusSteps = ["confirmed", "in_workshop", "shipped", "delivered"] as const;
const statusLabels: Record<string, string> = {
  confirmed: "Confirmed",
  in_workshop: "In the workshop",
  shipped: "Shipped",
  delivered: "Delivered",
};

function OrderConfirmation() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="display-lg">No recent order</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Once you place an order, its confirmation will appear here.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const method = shippingMethods.find((m) => m.id === lastOrder.shippingMethodId);
  const activeIndex = statusSteps.indexOf(lastOrder.status);

  return (
    <div className="container-page py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-5 w-5" />
        </span>
        <h1 className="display-lg mt-6">
          Your Order Is On Its Way
          <br />
          To Becoming A Memory.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Thank you, {lastOrder.customer.fullName.split(" ")[0]}. We've sent a confirmation to{" "}
          {lastOrder.customer.email}. Your piece now joins the queue in our Bengaluru workshop.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Order number</p>
                <p className="mt-1 font-display text-xl">{lastOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="eyebrow">Estimated delivery</p>
                <p className="mt-1 text-sm">{lastOrder.estimatedDelivery}</p>
              </div>
            </div>

            <ol className="mt-8 grid grid-cols-4 gap-2">
              {statusSteps.map((step, index) => (
                <li key={step}>
                  <div
                    className={
                      index <= activeIndex ? "h-1 rounded-full bg-accent" : "h-1 rounded-full bg-border"
                    }
                  />
                  <p
                    className={
                      index <= activeIndex
                        ? "mt-2 text-[0.7rem] text-foreground"
                        : "mt-2 text-[0.7rem] text-muted-foreground"
                    }
                  >
                    {statusLabels[step]}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <ul className="mt-8 flex flex-col">
            {lastOrder.items.map((line) => (
              <li key={line.productId} className="flex gap-4 border-b border-border py-5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img src={line.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{line.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {line.quantity}</p>
                </div>
                <span className="text-sm">{formatINR(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="surface-card p-6">
            <h2 className="font-display text-lg">Delivery address</h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
              {lastOrder.customer.fullName}
              <br />
              {lastOrder.address.address}
              <br />
              {lastOrder.address.city}, {lastOrder.address.state} {lastOrder.address.pincode}
              <br />
              {lastOrder.customer.phone}
            </address>
            {method && (
              <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                {method.label} · {method.eta}
              </p>
            )}
          </div>

          <div className="surface-card p-6">
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatINR(lastOrder.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{lastOrder.shipping === 0 ? "Free" : formatINR(lastOrder.shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-display text-xl">{formatINR(lastOrder.total)}</dd>
              </div>
            </dl>
            <Button asChild size="lg" className="mt-6 w-full rounded-full">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
