import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="container-page py-24 md:py-32">
      <Reveal>
        <p className="eyebrow">Owners</p>
        <h2 className="display-lg mt-4 max-w-2xl">Kept, used, and handed down.</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.07}>
            <figure className="surface-card flex h-full flex-col p-6">
              <div className="flex gap-0.5" aria-label={`${item.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < item.rating
                        ? "h-3.5 w-3.5 fill-accent text-accent"
                        : "h-3.5 w-3.5 text-border"
                    }
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.city}</p>
                <p className="mt-1 text-xs text-accent">{item.product}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
