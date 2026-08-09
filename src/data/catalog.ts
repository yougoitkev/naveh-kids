import type { Category, Faq, Product, ShippingMethod, Testimonial } from "@/lib/types";

import craftSanding from "@/assets/craft-sanding.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import assemblyKit from "@/assets/assembly-kit.jpg";
import productKitchenTower from "@/assets/product-kitchen-tower.jpg";

import logo from "@/assets/logo.jpg";
import scooterBlue from "@/assets/scooter-blue.jpg";
import scooterSide from "@/assets/scooter-side.jpg";
import scooterWheel from "@/assets/scooter-wheel.jpg";
import rockingDino from "@/assets/rocking-dino.jpg";
import climbingArch from "@/assets/climbing-arch.jpg";
import archChair from "@/assets/arch-chair.jpg";

export { logo };

export const images = {
  hero: scooterSide,
  heroAlt: scooterBlue,
  craft: craftSanding,
  workshop: storyWorkshop,
  assembly: assemblyKit,
};

export const brand = {
  name: "NAVEH Kids",
  tagline: "Crafted for every little blessing",
  owner: "Sara Christina",
  phone: "+91 84311 75529",
  whatsapp: "918431175529",
  address:
    "1, 2nd Cross, Hennur Main Rd, Kacharakanahalli, Bengaluru, Karnataka 560084",
  hours: "Monday – Saturday, 9:30 am – 7:30 pm",
  freeShippingThreshold: 7000,
};

export const categories: Category[] = [
  {
    slug: "ride-on-toys",
    name: "Ride-On Toys",
    tagline: "First journeys",
    description:
      "Sturdy wooden ride-ons built for toddlers finding their balance — low decks, silent wheels and soft, splinter-free edges.",
    image: scooterSide,
  },
  {
    slug: "rocking-toys",
    name: "Rocking Toys",
    tagline: "Gentle motion",
    description:
      "Rockers with wide, tip-resistant runners and a long, calming arc — made for safe indoor play and big imaginations.",
    image: rockingDino,
  },
  {
    slug: "montessori-play",
    name: "Montessori Play",
    tagline: "Climb, balance, imagine",
    description:
      "Climbing arches and open-ended play pieces that build motor skills and confidence, one rung at a time.",
    image: climbingArch,
  },
  {
    slug: "learning-towers",
    name: "Learning Towers",
    tagline: "A seat at the counter",
    description:
      "Convertible kitchen towers that bring your child safely to counter height — and fold down into a table and chair set.",
    image: productKitchenTower,
  },
  {
    slug: "kids-furniture",
    name: "Kids Furniture",
    tagline: "Child-scale living",
    description:
      "Seating and play furniture built at a child's proportions, finished well enough for a grown-up room.",
    image: archChair,
  },
];

export const products: Product[] = [
  {
    id: "nv-01",
    slug: "wooden-scooter",
    name: "Wooden Scooter",
    categorySlug: "ride-on-toys",
    price: 5250,
    shortDescription:
      "A sturdy wooden ride-on scooter designed for toddlers and young children.",
    description:
      "Our signature ride-on. Shaped from birch plywood with a broad, low deck and four smooth-rolling castors, the scooter keeps a toddler steady while they learn to push, steer and stop. Every edge is sanded soft, and the finish is toy-safe, so it is as happy in a living room as it is in a playroom.",
    images: [scooterBlue, scooterSide, scooterWheel],
    colours: ["Pink", "Blue", "Yellow"],
    specs: {
      dimensions: "Height 75 cm · Length 72 cm · Width 32 cm",
      materials: "Birch plywood, steel castors",
      woodType: "Birch plywood",
      finish: "Toy-safe paint in pink, blue or yellow with natural ply edges",
      recommendedAge: "18 months – 4 years",
      weight: "To be finalised",
      assemblyTime: "10 minutes",
      assemblyDifficulty: "Easy — one allen key included",
    },
    included: ["Scooter body & deck", "Handlebar assembly", "Castors, pre-fitted", "Allen key + fixings"],
    safety: [
      "Rounded, splinter-free edges throughout",
      "Non-toxic, saliva-resistant finish",
      "Low deck height for stability",
    ],
    availability: "in_stock",
    featured: true,
    rating: 4.9,
    reviewCount: 24,
    createdAt: "2026-02-10",
  },
  {
    id: "nv-02",
    slug: "rocking-dinosaur",
    name: "Rocking Dinosaur",
    categorySlug: "rocking-toys",
    price: 5430,
    shortDescription:
      "A dinosaur-shaped wooden rocker designed for safe indoor play and imaginative fun.",
    description:
      "Half rocker, half best friend. The dinosaur silhouette is cut from birch plywood and finished by hand, with a supportive seat, backrest and beech grab dowel. Wide laminated runners give a long, slow rocking arc that soothes rather than jolts.",
    images: [rockingDino, storyWorkshop],
    colours: ["Natural wood finish"],
    specs: {
      dimensions: "To be finalised",
      materials: "Birch plywood, beech grab dowel",
      woodType: "Birch plywood",
      finish: "Natural wood finish, toy-safe sealant",
      recommendedAge: "1 – 5 years",
      weight: "To be finalised",
      assemblyTime: "15 minutes",
      assemblyDifficulty: "Easy — 8 fixings",
    },
    included: ["Dino body panels", "Seat, backrest & grab dowel", "Two runners", "Fixings + allen key"],
    safety: ["Tip-resistant runner geometry", "Non-toxic finish", "Rounded edges throughout"],
    availability: "in_stock",
    featured: true,
    rating: 5,
    reviewCount: 18,
    createdAt: "2026-01-22",
  },
  {
    id: "nv-03",
    slug: "wooden-climbing-arch",
    name: "Wooden Climbing Arch",
    categorySlug: "montessori-play",
    price: 8366.25,
    shortDescription:
      "A wooden climbing arch that encourages active play and motor skill development.",
    description:
      "The most-used piece in a Montessori playroom. Climb it one way, flip it over to rock, or throw a blanket across for a cave. Rungs are spaced to a toddler's grip and the laminated side panels are strong without being heavy.",
    images: [climbingArch, craftSanding, assemblyKit],
    colours: ["Natural wood finish"],
    specs: {
      dimensions: "Height 53 cm · Length 100 cm · Width 50 cm",
      materials: "Birch plywood, solid wood rungs",
      woodType: "Birch plywood",
      finish: "Clear natural water-based lacquer",
      recommendedAge: "10 months – 6 years",
      weight: "To be finalised",
      assemblyTime: "20 minutes",
      assemblyDifficulty: "Easy — 12 fixings",
    },
    included: ["Two arch side panels", "Rung set", "Fixings + allen key"],
    safety: ["Toddler-safe rung spacing", "Non-toxic lacquer", "Stable, wide-footed stance"],
    availability: "in_stock",
    featured: true,
    rating: 4.8,
    reviewCount: 12,
    createdAt: "2026-03-04",
  },
  {
    id: "nv-04",
    slug: "arch-chair",
    name: "Arch Chair",
    categorySlug: "kids-furniture",
    price: 0,
    priceOnRequest: true,
    shortDescription: "A wooden arch chair designed for children's seating and play.",
    description:
      "A round, child-scale stool-chair in birch plywood with turned dowel legs. Light enough for a three-year-old to carry to the play table, sturdy enough to be climbed on sideways. Pairs with our arch play table.",
    images: [archChair, storyWorkshop],
    colours: ["Natural wood finish"],
    specs: {
      dimensions: "Height 26 cm · Diameter 26 cm",
      materials: "Birch plywood, solid wood dowels",
      woodType: "Birch plywood",
      finish: "Natural wood finish",
      recommendedAge: "2 – 7 years",
      weight: "To be finalised",
      assemblyTime: "10 minutes",
      assemblyDifficulty: "Easy",
    },
    included: ["Seat top", "Dowel legs & base ring", "Fixings + allen key"],
    safety: ["No sharp corners", "Toy-safe finish", "Stability tested"],
    availability: "made_to_order",
    featured: true,
    rating: 4.9,
    reviewCount: 7,
    createdAt: "2026-02-28",
  },
  {
    id: "nv-05",
    slug: "kitchen-tower-hdhmr",
    name: "Wooden Kitchen Tower — HDHMR",
    categorySlug: "learning-towers",
    price: 6431.25,
    shortDescription:
      "A convertible kitchen tower that transforms into a children's table and chair set.",
    description:
      "Brings your child up to counter height so they can wash, stir and watch — then folds flat into a table and chair set for drawing and snacks. The HDHMR core resists kitchen moisture and wipes clean, and the narrow footprint suits a real Indian kitchen.",
    images: [productKitchenTower, assemblyKit, craftSanding],
    colours: ["Pink", "Blue", "Sage Green"],
    specs: {
      dimensions: "Tower: 90 × 44 × 40 cm · Table: 46 × 78 × 40 cm",
      materials: "HDHMR board with birch plywood components",
      woodType: "HDHMR + birch plywood",
      finish: "Toy-safe lacquer in pink, blue or sage green",
      recommendedAge: "18 months – 6 years",
      weight: "To be finalised",
      assemblyTime: "25 minutes",
      assemblyDifficulty: "Moderate",
    },
    included: ["Two side panels", "Adjustable platform + footstep", "Safety rail", "Fixings + allen key"],
    safety: ["Moisture-resistant core", "Enclosed sides and rear rail", "Anti-slip platform"],
    availability: "in_stock",
    featured: true,
    rating: 4.8,
    reviewCount: 21,
    createdAt: "2026-01-09",
  },
  {
    id: "nv-06",
    slug: "kitchen-tower-birch",
    name: "Wooden Kitchen Tower — Birch Plywood",
    categorySlug: "learning-towers",
    price: 7337.5,
    shortDescription:
      "A premium convertible kitchen tower that transforms into a children's table and chair set.",
    description:
      "The same convertible design in full birch plywood — warmer grain, lighter weight and a natural finish that ages beautifully. Tower one minute, table and chair the next.",
    images: [productKitchenTower, craftSanding, assemblyKit],
    colours: ["Natural wood", "Pink", "Blue", "Sage Green"],
    specs: {
      dimensions: "Tower: 90 × 44 × 40 cm · Table: 46 × 78 × 40 cm",
      materials: "Birch plywood",
      woodType: "Birch plywood",
      finish: "Natural, or toy-safe pink, blue or sage green",
      recommendedAge: "18 months – 6 years",
      weight: "To be finalised",
      assemblyTime: "25 minutes",
      assemblyDifficulty: "Moderate",
    },
    included: ["Two side panels", "Adjustable platform + footstep", "Safety rail", "Fixings + allen key"],
    safety: ["Load tested for daily use", "Enclosed sides and rear rail", "Anti-slip platform"],
    availability: "in_stock",
    featured: true,
    rating: 4.9,
    reviewCount: 15,
    createdAt: "2026-01-08",
  },
];

export const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard delivery — Delhivery",
    detail: "Processed in 2–5 business days, delivered pan India",
    price: 450,
  },
  {
    id: "free",
    label: "Free delivery",
    detail: "Automatically applied on orders above ₹7,000",
    price: 0,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Meera Raghavan",
    city: "Chennai",
    quote:
      "The scooter arrived beautifully packed and my son has not stopped riding it since. It looks like furniture, not plastic clutter.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Anand & Divya",
    city: "Bengaluru",
    quote:
      "We bought the kitchen tower to stop our toddler climbing the counter. It is now the most used object in the house.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Fathima Noor",
    city: "Kochi",
    quote:
      "You can feel the twenty years of woodworking in the finish. The climbing arch is solid, smooth and genuinely beautiful.",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    question: "What wood do you use, and is it safe?",
    answer:
      "Our pieces are made from birch plywood, with HDHMR used where kitchen moisture is a factor. Finishes are non-toxic and toy-safe, so they are safe if a child mouths the surface.",
  },
  {
    question: "Where do you deliver, and how long does it take?",
    answer:
      "We deliver across India through Delhivery. Orders are processed within 2–5 business days, and delivery timelines vary by location. You will receive a tracking link once your order ships.",
  },
  {
    question: "How much is shipping?",
    answer:
      "Shipping is free on orders above ₹7,000. For orders below that, shipping is calculated at checkout based on your PIN code and the size and weight of the product.",
  },
  {
    question: "Is assembly difficult?",
    answer:
      "No. Every piece arrives pre-drilled with sorted fixings and an allen key. Most items take 10–25 minutes with no other tools.",
  },
  {
    question: "Can I return an order?",
    answer:
      "Returns are accepted only for damaged, defective or incorrect products. Report any issue within 48 hours of delivery with photos of the product and packaging; approved refunds are processed within 7–10 business days.",
  },
  {
    question: "Do you make custom pieces?",
    answer:
      "Not at this stage. We are focused on getting our core collection right — do write to us if you have something in mind for the future.",
  },
];

export const craftSteps = [
  { step: "01", title: "Design", body: "Sara sketches each piece around how a child actually moves, plays and grows." },
  { step: "02", title: "Cut", body: "Panels are CNC-cut from birch ply so every joint lands to the millimetre." },
  { step: "03", title: "Sand", body: "Four grits by hand until every edge is soft enough for a bare knee." },
  { step: "04", title: "Finish", body: "Toy-safe colour in our warm palette, cured and inspected before it ships." },
];

export const whyNaveh = [
  {
    title: "Twenty years of woodworking",
    body: "Built on Philip Wood Designers, our family workshop making wooden products since 2003.",
  },
  {
    title: "Toy-safe, child-first",
    body: "Non-toxic finishes, rounded edges and stability tested before anything leaves the bench.",
  },
  {
    title: "Made in India, delivered pan India",
    body: "Cut, sanded and finished in Bengaluru, shipped nationwide through Delhivery with tracking.",
  },
  {
    title: "Designed to be handed down",
    body: "Birch plywood, real joinery and finishes that age well — not something you replace next year.",
  },
];
