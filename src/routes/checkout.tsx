import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { brand, shippingMethods } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | NAVEH Kids" },
      {
        name: "description",
        content:
          "Complete your NAVEH Kids order — delivered pan India via Delhivery, free above ₹7,000.",
      },
      { property: "og:title", content: "Checkout | NAVEH Kids" },
      { property: "og:description", content: "Complete your NAVEH Kids order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const FIELDS = [
  { id: "fullName", label: "Full name", type: "text", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "address", label: "Address", type: "text", autoComplete: "street-address" },
  { id: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { id: "state", label: "State", type: "text", autoComplete: "address-level1" },
  { id: "pincode", label: "PIN code", type: "text", autoComplete: "postal-code" },
] as const;

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clear, recordOrder } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const freeShipping = subtotal >= brand.freeShippingThreshold;
  const shipping = freeShipping ? 0 : (shippingMethods[0]?.price ?? 0);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="display-lg">Nothing to check out yet.</h1>
        <Button asChild size="lg" className="mt-8">
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);

    const order = {
      id: `NVH-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      items,
      customer: {
        fullName: String(form.get("fullName") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        address: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""),
        state: String(form.get("state") ?? ""),
        pincode: String(form.get("pincode") ?? ""),
        notes: String(form.get("notes") ?? ""),
      },
      shippingMethodId: freeShipping ? "free" : "standard",
      subtotal,
      shipping,
      total,
      paymentMethod: "Pay on confirmation",
    };

    recordOrder(order);
    clear();
    toast.success(`Order ${order.id} placed — we'll be in touch shortly.`);
    setSubmitting(false);
    void navigate({ to: "/" });
  }

  return (
    <div className="container-page py-14 md:py-20">
      <h1 className="display-lg">Checkout</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <div key={field.id} className={field.id === "address" ? "sm:col-span-2" : undefined}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                className="mt-2"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Label htmlFor="notes">Delivery notes (optional)</Label>
            <Textarea id="notes" name="notes" rows={4} className="mt-2" />
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-secondary/60 p-7">
          <h2 className="text-lg">Your order</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatINR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery (Delhivery)</dt>
              <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between text-base">
              <dt>Total</dt>
              <dd>{formatINR(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            Place order
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            We confirm every order by phone or WhatsApp before dispatch.
          </p>
        </aside>
      </form>
    </div>
  );
}
