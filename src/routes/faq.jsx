import { createFileRoute, Link } from "@tanstack/react-router";
import { faqs } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Assembly, Materials, Shipping | Kaaru Woodcraft" },
      {
        name: "description",
        content:
          "Answers on assembly time, wood types, toy-safe finishes, custom commissions, returns and international shipping.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Kaaru Woodcraft" },
      {
        property: "og:description",
        content: "Assembly, materials, safety, commissions, returns and shipping, answered.",
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow">Help</p>
          <h1 className="display-lg mt-4">Questions, answered plainly.</h1>
        </header>
      </Reveal>

      <div className="mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-display text-lg">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-12 text-sm text-muted-foreground">
          Still unsure?{" "}
          <Link to="/contact" className="link-underline text-foreground">
            Write to the workshop
          </Link>{" "}
          — we answer within a working day.
        </p>
      </div>
    </div>
  );
}