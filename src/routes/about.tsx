import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Sara Christina's Workshop | NAVEH Kids" },
      {
        name: "description",
        content:
          "NAVEH Kids is founded by Sara Christina and built on twenty years of wood design experience. Learn how each piece is made.",
      },
      { property: "og:title", content: "The NAVEH Kids story" },
      {
        property: "og:description",
        content: "Twenty years of woodcraft, turned into toys and furniture for children.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow">Our story</p>
      <h1 className="display-lg mt-4 max-w-2xl">
        A workshop built around how children actually play.
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            NAVEH Kids was founded by Sara Christina, who grew up around sawdust and drawings. The
            family workshop has spent two decades shaping wood for homes across India; NAVEH is the
            part of it made entirely for children.
          </p>
          <p>
            Every piece begins as a sketch of a movement — a first push, a climb, a slow rock. It is
            cut from certified birch plywood, sanded through four grits by hand, and finished only
            in water-based, toy-safe colour.
          </p>
          <p>
            Nothing is mass-produced and nothing is wasted: the offcuts from a rocking horse become
            the little wooden cars. Crafted for every little blessing.
          </p>
        </div>
        <img
          src={images.workshop}
          alt="Inside the NAVEH Kids workshop"
          loading="lazy"
          className="w-full rounded-[2rem] object-cover shadow-soft"
        />
      </div>
    </div>
  );
}
