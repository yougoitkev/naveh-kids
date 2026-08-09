import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { brand } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the NAVEH Kids Workshop | Bengaluru" },
      {
        name: "description",
        content:
          "Talk to Sara and the NAVEH Kids team in Bengaluru about a piece, an order or delivery to your city.",
      },
      { property: "og:title", content: "Contact NAVEH Kids" },
      {
        property: "og:description",
        content: "Reach our Bengaluru workshop by phone, WhatsApp or the enquiry form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Say hello</p>
      <h1 className="display-lg mt-4">Talk to the workshop.</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            toast.success("Thank you — we'll reply within two working days.");
            event.currentTarget.reset();
          }}
        >
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" required autoComplete="name" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={6} required className="mt-2" />
          </div>
          <Button type="submit" size="lg" className="justify-self-start">
            Send message
          </Button>
          {sent ? (
            <p className="text-sm text-accent">Message received — Sara will be in touch.</p>
          ) : null}
        </form>

        <div className="rounded-3xl bg-secondary/60 p-8 text-sm">
          <h2 className="text-lg">{brand.name}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{brand.address}</p>
          <p className="mt-4 text-muted-foreground">{brand.hours}</p>
          <p className="mt-6">
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="link-underline">
              {brand.phone}
            </a>
          </p>
          <p className="mt-2">
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              Message us on WhatsApp
            </a>
          </p>
          <p className="mt-6 text-muted-foreground">
            Owner: {brand.owner} · Free delivery on orders above ₹
            {brand.freeShippingThreshold.toLocaleString("en-IN")}.
          </p>
        </div>
      </div>
    </div>
  );
}
