import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/data/catalog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Materials, Delivery & Assembly | NAVEH Kids" },
      {
        name: "description",
        content:
          "Answers on wood and finishes, pan-India Delhivery shipping, free delivery above ₹7,000, assembly and our returns policy.",
      },
      { property: "og:title", content: "Frequently asked questions | NAVEH Kids" },
      {
        property: "og:description",
        content: "Materials, delivery, assembly and returns — answered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Help</p>
      <h1 className="display-lg mt-4">Frequently asked questions</h1>
      <div className="mt-10 max-w-3xl">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </div>
  );
}
