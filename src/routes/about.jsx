import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — A Workshop in Bengaluru | Kaaru Woodcraft" },
      {
        name: "description",
        content:
          "Three generations of woodworking, one small workshop, and a belief that children deserve real materials. The story behind Kaaru Woodcraft.",
      },
      { property: "og:title", content: "Our Story — Kaaru Woodcraft" },
      {
        property: "og:description",
        content: "Three generations of woodworking and a belief that children deserve real materials.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    title: "One maker, one piece",
    body: "No assembly lines. A single craftsperson takes a product from rough plank to final wax, and signs the underside when it's done.",
  },
  {
    title: "Wood we can trace",
    body: "Oak, beech, birch and walnut from managed plantations in Karnataka and the Nilgiris, kiln-dried in-house to 8% moisture.",
  },
  {
    title: "Finishes you could eat",
    body: "Food-grade oils, beeswax and water-based lacquers. Nothing that would worry a parent watching a toddler chew a handlebar.",
  },
  {
    title: "Built for the second child",
    body: "We over-engineer joints deliberately. A Kaaru piece should be worth keeping, repairing, and passing on.",
  },
];

function About() {
  return (
    <div>
      <section className="container-page py-16 md:py-24">
        <Reveal>
          <p className="eyebrow">Since 1978</p>
          <h1 className="display-xl mt-5 max-w-4xl">
            A small workshop with an unreasonable standard.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Kaaru began as a furniture shop on Mill Road, making dining tables for families who
            expected them to outlive the marriage that bought them. The toys came later — and by
            accident.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <div className="container-page">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={images.storyWorkshop}
              alt="The Kaaru workshop"
              loading="lazy"
              width={1400}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      <section className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="display-lg">How the toys happened.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
            <p>
              In 1994, our founder's granddaughter was born. He made her a rocking horse from the
              offcuts of a teak dining set, steam-bending the runners over a kettle because the
              workshop had no steam box yet. Customers saw it in the corner of the shop and started
              asking.
            </p>
            <p>
              Thirty years later we still make furniture, but most of what leaves the workshop is
              small: horses, scooters, balance bikes, cars, stacking sets. The standards never
              changed — the same joinery, the same kiln, the same refusal to use a composite panel
              anywhere a child might touch it.
            </p>
            <p>
              What did change is the box. We spent two years redesigning how our pieces flat-pack so
              a parent could assemble a rocking horse in fifteen minutes on a Sunday morning without
              a single frustrated word. That, quietly, is the part we're proudest of.
            </p>
            <p>
              Everything is made in Bengaluru by eleven people, most of whom have been here more
              than a decade. We produce a few hundred pieces a month. We have no plans to produce
              more.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-secondary/40 py-24 md:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="display-lg max-w-lg">What we hold to.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <div className="border-t border-border pt-6">
                  <h3 className="text-xl">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={images.catCustom}
              alt="Hands shaping a wooden toy car"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg">Sustainability, honestly stated.</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We buy from plantation growers, not forests. Offcuts become smaller toys, then
            stacking pieces, then sawdust for the local nursery. Our packaging is recycled board
            and cotton — no foam, no plastic tape. We are not carbon neutral and we won't claim to
            be; we simply waste as little as a workshop reasonably can.
          </p>
          <Button asChild className="mt-8 h-11 rounded-full px-6">
            <Link to="/shop">See what we're making now</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}