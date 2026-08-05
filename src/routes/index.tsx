import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Hammer, Leaf, PackageOpen, ShieldCheck, ArrowRight } from "lucide-react";
import { categories, products, testimonials, images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaaru Woodcraft — Handcrafted Wooden Toys & Ride-Ons" },
      {
        name: "description",
        content:
          "Made from wood, made for wonder. Handcrafted wooden rocking horses, scooters, ride-ons and furniture built to last for generations.",
      },
      { property: "og:title", content: "Kaaru Woodcraft — Made From Wood. Made For Wonder." },
      {
        property: "og:description",
        content:
          "Handcrafted wooden toys and ride-on products designed for little adventures, built to last for generations.",
      },
    ],
  }),
  component: Home,
});

const featured = products.filter((p) => p.featured);
const homeCategories = categories.filter((c) =>
  ["ride-on-toys", "wooden-scooters", "rocking-horses", "educational-toys", "furniture", "custom-products"].includes(
    c.slug,
  ),
);

const whyChooseUs = [
  {
    icon: Hammer,
    title: "Handcrafted",
    body: "Every piece is cut, shaped and sanded by a named maker in our Bengaluru workshop.",
  },
  {
    icon: Leaf,
    title: "Natural Materials",
    body: "Kiln-dried Indian hardwood and food-grade oils. No MDF, no plastics, no shortcuts.",
  },
  {
    icon: PackageOpen,
    title: "Easy Assembly",
    body: "Pre-sorted fixings, one allen key and never more than six illustrated steps.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    body: "Doweled joinery and steam-bent curves that survive a childhood — and the next one.",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandStory />
      <WhyChooseUs />
      <AssemblySection />
      <Testimonials items={testimonials} />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-gradient">
      <div className="container-page grid items-center gap-12 py-16 md:min-h-[86vh] md:grid-cols-2 md:py-24">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Handcrafted in India
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl mt-5"
          >
            Made From Wood.
            <br />
            Made For Wonder.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Handcrafted wooden toys and ride-on products designed for little adventures, built to
            last for generations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="h-12 rounded-full px-7">
              <Link to="/shop">Explore Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7">
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-lift">
            <img
              src={images.heroRockingHorse}
              alt="Handcrafted oak rocking horse"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-5 left-5 rounded-2xl bg-card px-5 py-3 shadow-lift sm:left-8"
          >
            <p className="text-xs text-muted-foreground">Signature piece</p>
            <p className="font-display text-base">Classic Rocking Horse · Oak</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  return (
    <section className="container-page py-24 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Collections</p>
            <h2 className="display-lg mt-4 max-w-xl">Six ways to begin.</h2>
          </div>
          <Link to="/categories" className="link-underline text-sm text-muted-foreground">
            View all categories
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {homeCategories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="display-lg mt-4 max-w-xl">The pieces we're known for.</h2>
            </div>
            <Link to="/shop" className="link-underline text-sm text-muted-foreground">
              Shop everything
            </Link>
          </div>
        </Reveal>
        <div className="mt-14">
          <ProductGrid products={featured.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={images.storyWorkshop}
              alt="A maker assembling a wooden horse in the workshop"
              loading="lazy"
              width={1400}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Our craft</p>
          <h2 className="display-lg mt-4">
            Built by Hand.
            <br />
            Designed for Childhood.
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Every Kaaru piece starts as a rough plank of kiln-dried Indian hardwood and passes
              through the hands of a single maker. Nothing is stamped out. Nothing is finished by
              machine alone.
            </p>
            <p>
              Curves are steam-bent rather than cut, so the grain runs unbroken through the
              strongest part of the piece. Joints are doweled where a screw would eventually work
              loose. Surfaces are sanded through four grits and then oiled by hand.
            </p>
            <p>
              What arrives at your door is flat-packed, honestly labelled, and assembles in minutes
              — because a beautiful object should not begin with a frustrating afternoon.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-8 h-11 rounded-full px-6">
            <Link to="/about">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="border-y border-border bg-secondary/40 py-24 md:py-28">
      <div className="container-page">
        <Reveal>
          <h2 className="display-lg max-w-lg">Why families choose Kaaru.</h2>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <feature.icon className="h-6 w-6 text-accent" strokeWidth={1.4} />
              <h3 className="mt-5 text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const assemblySteps = [
  {
    step: "01",
    title: "Unbox",
    body: "Flat-packed in recycled board with every part labelled and protected in cotton sleeves.",
  },
  {
    step: "02",
    title: "Assemble",
    body: "One allen key, pre-sorted fixings and an illustrated card of six steps or fewer.",
  },
  {
    step: "03",
    title: "Play",
    body: "Fifteen minutes later it's solid, silent and ready for its first rider.",
  },
];

function AssemblySection() {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Assembly</p>
          <h2 className="display-lg mt-4">From Box to Adventure.</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            We design the assembly the same way we design the product. Fewer fixings, clearer
            steps, and tolerances tight enough that parts only fit the right way round.
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl">
            <img
              src={images.assemblyKit}
              alt="Flat-packed wooden parts with an allen key"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          {assemblySteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.12}>
              <div className="flex gap-6 border-t border-border py-8">
                <span className="font-display text-sm text-accent">{item.step}</span>
                <div className="min-w-0">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-border bg-warm-gradient">
      <div className="container-page py-28 text-center md:py-36">
        <Reveal>
          <h2 className="display-xl mx-auto max-w-3xl">Give Them Something Real.</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Beautiful toys made from natural materials, designed for play today and memories
            tomorrow.
          </p>
          <Button asChild size="lg" className="mt-9 h-12 rounded-full px-8">
            <Link to="/shop">Shop the Collection</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
