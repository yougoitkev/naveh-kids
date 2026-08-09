import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/data/catalog";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Shipping, Returns & Privacy | NAVEH Kids" },
      {
        name: "description",
        content:
          "NAVEH Kids shipping timelines with Delhivery, free delivery above ₹7,000, our damaged-goods returns policy and how we handle your data.",
      },
      { property: "og:title", content: "Shipping, returns & privacy | NAVEH Kids" },
      {
        property: "og:description",
        content: "How we ship, how returns work and how your data is handled.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Policies,
});

const SECTIONS = [
  {
    title: "Shipping",
    body: [
      "We deliver across India through Delhivery. Orders are processed within 2–5 business days of confirmation, and delivery timelines vary by destination.",
      "Shipping is free on all orders above ₹7,000. Below that, charges are calculated at checkout based on your PIN code and the size and weight of the piece.",
      "A tracking link is shared by email and WhatsApp as soon as your order leaves the workshop.",
    ],
  },
  {
    title: "Returns & refunds",
    body: [
      "Returns are accepted only for damaged, defective or incorrect products.",
      "Report any issue within 48 hours of delivery with clear photographs of the product and its packaging.",
      "Once approved, refunds are processed to the original payment method within 7–10 business days.",
    ],
  },
  {
    title: "Care & safety",
    body: [
      "Wipe with a soft, slightly damp cloth. Avoid soaking, harsh cleaners and prolonged direct sunlight.",
      "All finishes are non-toxic and toy-safe. Adult supervision is recommended for climbing and kitchen-tower use.",
    ],
  },
  {
    title: "Privacy",
    body: [
      "We collect only the details needed to fulfil your order — name, contact details and delivery address — and share them solely with our delivery partner.",
      "We never sell your data. Write to us any time to update or delete your details.",
    ],
  },
];

function Policies() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">The small print</p>
      <h1 className="display-lg mt-4">Shipping, returns & privacy</h1>
      <div className="mt-12 grid max-w-3xl gap-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          Questions? Call {brand.phone} or write from the contact page.
        </p>
      </div>
    </div>
  );
}
