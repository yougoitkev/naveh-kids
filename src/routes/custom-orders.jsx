import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { z } from "zod";
import { Check, Upload } from "lucide-react";
import { submitCustomOrder } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/custom-orders")({
  head: () => ({
    meta: [
      { title: "Custom Wooden Products Made to Order | Kaaru Woodcraft" },
      {
        name: "description",
        content:
          "Commission a one-off wooden piece: your dimensions, your wood, your finish. Send a request and we'll reply with a drawing in two working days.",
      },
      { property: "og:title", content: "Have Something Special In Mind?" },
      {
        property: "og:description",
        content: "Commission a custom handcrafted wooden product from the Kaaru workshop.",
      },
    ],
  }),
  component: CustomOrders,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  productType: z.string().trim().min(2, "Tell us what to make").max(100),
  dimensions: z.string().trim().max(120).optional(),
  woodType: z.string().trim().max(60).optional(),
  finish: z.string().trim().max(60).optional(),
  quantity: z.coerce.number().int().min(1).max(500),
  description: z.string().trim().min(10, "A little more detail, please").max(1000),
});

function CustomOrders() {
  const [errors, setErrors] = useState({});
  const [reference, setReference] = useState(null);
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const result = await submitCustomOrder({
        ...parsed.data,
        dimensions: parsed.data.dimensions ?? "",
        woodType: parsed.data.woodType ?? "",
        finish: parsed.data.finish ?? "",
        ...(fileName ? { referenceImageName: fileName } : {}),
      });
      setReference(result.reference);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow">Commissions</p>
          <h1 className="display-lg mt-4">Have Something Special In Mind?</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A rocking horse in your grandmother's teak. A table sized to an awkward alcove. A name
            burned into a runner. Tell us what you're picturing and we'll reply within two working
            days with a drawing, a price and a timeline before anything is cut.
          </p>
        </header>
      </Reveal>

      <div className="mt-14 max-w-3xl">
        {reference ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card p-8 text-center md:p-14"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
              <Check className="h-5 w-5" />
            </span>
            <h2 className="display-lg mt-6 text-[1.8rem]">Request received.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Your reference is <span className="text-foreground">{reference}</span>. One of our
              makers will read it personally and come back to you within two working days.
            </p>
            <Button
              variant="outline"
              className="mt-8 rounded-full"
              onClick={() => setReference(null)}
            >
              Send another request
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <Field name="name" label="Name" error={errors["name"]} />
            <Field name="phone" label="Phone" type="tel" error={errors["phone"]} />
            <Field name="email" label="Email" type="email" error={errors["email"]} className="sm:col-span-2" />
            <Field name="productType" label="Product type" error={errors["productType"]} />
            <Field name="dimensions" label="Preferred dimensions" error={errors["dimensions"]} />
            <Field name="woodType" label="Wood type" error={errors["woodType"]} />
            <Field name="finish" label="Finish" error={errors["finish"]} />
            <Field
              name="quantity"
              label="Quantity"
              type="number"
              defaultValue="1"
              error={errors["quantity"]}
            />

            <div className="sm:col-span-2">
              <Label htmlFor="description" className="text-xs text-muted-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Tell us about the piece, who it's for, and anything it needs to fit around."
                className="mt-2 rounded-xl bg-card"
              />
              {errors["description"] && (
                <p className="mt-1.5 text-xs text-destructive">{errors["description"]}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="reference-image" className="text-xs text-muted-foreground">
                Reference image (optional)
              </Label>
              <label
                htmlFor="reference-image"
                className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-card px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-accent"
              >
                <Upload className="h-4 w-4" />
                {fileName || "Upload a sketch or photo"}
              </label>
              <input
                id="reference-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={submitting} className="h-12 rounded-full px-8">
                {submitting ? "Sending…" : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ name, label, type = "text", error, className, defaultValue }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        className="mt-2 h-11 rounded-xl bg-card"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}