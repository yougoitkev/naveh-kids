import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CreditCard, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { shippingMethods } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { createOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Kaaru Woodcraft" },
      { name: "description", content: "Complete your Kaaru Woodcraft order securely." },
      { property: "og:title", content: "Checkout — Kaaru Woodcraft" },
      { property: "og:description", content: "Complete your handcrafted wooden order." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  address: z.string().trim().min(6, "Enter your street address").max(200),
  city: z.string().trim().min(2, "Enter your city").max(60),
  state: z.string().trim().min(2, "Enter your state").max(60),
  pincode: z.string().trim().regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Checkout() {
  const { lines, subtotal, clear, saveOrder } = useCart();
  const navigate = useNavigate();
  const [shippingId, setShippingId] = useState(shippingMethods[0]?.id ?? "standard");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const method = shippingMethods.find((m) => m.id === shippingId) ?? shippingMethods[0]!;
  const shipping = method.price;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="display-lg">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add a piece before heading to checkout.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/shop">Browse the collection</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const order = await createOrder({
        customer: {
          fullName: parsed.data.fullName,
          phone: parsed.data.phone,
          email: parsed.data.email,
        },
        address: {
          address: parsed.data.address,
          city: parsed.data.city,
          state: parsed.data.state,
          pincode: parsed.data.pincode,
        },
        shippingMethodId: method.id,
        items: lines,
        subtotal,
        shipping,
        total,
      });
      saveOrder(order);
      clear();
      navigate({ to: "/order-confirmation" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-14 md:py-20">
      <h1 className="display-lg">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
      >
        <div className="flex flex-col gap-12">
          <Section title="Customer details" step="01">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="fullName" label="Full name" error={errors.fullName} className="sm:col-span-2" />
              <Field name="phone" label="Phone" type="tel" error={errors.phone} />
              <Field name="email" label="Email" type="email" error={errors.email} />
            </div>
          </Section>

          <Section title="Delivery address" step="02">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="address" label="Address" error={errors.address} className="sm:col-span-2" />
              <Field name="city" label="City" error={errors.city} />
              <Field name="state" label="State" error={errors.state} />
              <Field name="pincode" label="PIN code" error={errors.pincode} />
            </div>
          </Section>

          <Section title="Shipping method" step="03">
            <RadioGroup value={shippingId} onValueChange={setShippingId} className="gap-3">
              {shippingMethods.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors has-[button[data-state=checked]]:border-accent"
                >
                  <RadioGroupItem value={option.id} className="mt-1" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-sm">{option.price === 0 ? "Free" : formatINR(option.price)}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
                    <p className="mt-1 text-xs text-accent">{option.eta}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </Section>

          <Section title="Payment" step="04">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium">Razorpay — cards, UPI, netbanking, wallets</p>
                  <p className="text-xs text-muted-foreground">
                    Payment is not yet connected. Placing an order reserves it with our workshop and
                    we'll send a secure payment link.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/70 px-3 py-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                The Razorpay checkout will open here once the payment gateway is enabled.
              </div>
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="surface-card p-6">
            <h2 className="font-display text-lg">Order summary</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <img src={line.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{line.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {line.quantity}</p>
                  </div>
                  <span className="text-sm">{formatINR(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-6 flex flex-col gap-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-display text-xl">{formatINR(total)}</dd>
              </div>
            </dl>

            <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full rounded-full">
              {submitting ? "Placing order…" : "Place Order"}
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xs text-accent">{step}</span>
        <h2 className="font-display text-xl">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input id={name} name={name} type={type} className="mt-2 h-11 rounded-xl bg-card" />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
