import type { Category, Faq, Product, ShippingMethod, Testimonial } from "@/lib/types";

import heroScooter from "@/assets/hero-scooter.jpg";
import craftSanding from "@/assets/craft-sanding.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import assemblyKit from "@/assets/assembly-kit.jpg";
import productScooter from "@/assets/product-scooter.jpg";
import productRockingDinosaur from "@/assets/product-rocking-dinosaur.jpg";
import productClimbingArch from "@/assets/product-climbing-arch.jpg";
import productArchChair from "@/assets/product-arch-chair.jpg";
import productKitchenTower from "@/assets/product-kitchen-tower.jpg";
import productBalanceBike from "@/assets/product-balance-bike.jpg";
import productWoodenCar from "@/assets/product-wooden-car.jpg";
import productWalker from "@/assets/product-walker.jpg";
import catRideOn from "@/assets/cat-ride-on.jpg";
import catScooter from "@/assets/cat-scooter.jpg";
import catRockingHorse from "@/assets/cat-rocking-horse.jpg";
import catLearning from "@/assets/cat-learning.jpg";
import catFurniture from "@/assets/cat-furniture.jpg";
import catCustom from "@/assets/cat-custom.jpg";

export const images = {
  hero: heroScooter,
  craft: craftSanding,
  workshop: storyWorkshop,
  assembly: assemblyKit,
};

export const categories: Category[] = [
  {
    slug: "ride-ons",
    name: "Ride-Ons",
    tagline: "First journeys",
    description:
      "Balance bikes, scooters and push-alongs shaped from birch ply — steady enough for a first wobble, light enough for little legs.",
    image: catRideOn,
  },
  {
    slug: "rockers",
    name: "Rockers",
    tagline: "Gentle motion",
    description:
      "Rocking dinosaurs, horses and unicorns with wide, tip-resistant runners and hand-sanded curves.",
    image: catRockingHorse,
  },
  {
    slug: "montessori",
    name: "Montessori Play",
    tagline: "Climb, balance, imagine",
    description:
      "Climbing arches, pikler-inspired frames and balance boards that grow with your child's confidence.",
    image: catLearning,
  },
  {
    slug: "kitchen-towers",
    name: "Kitchen Towers",
    tagline: "A seat at the counter",
    description:
      "Learning towers that bring your child safely up to counter height — for stirring, kneading and helping.",
    image: catScooter,
  },
  {
    slug: "furniture",
    name: "Kids Furniture",
    tagline: "Child-scale living",
    description:
      "Arch chairs, play tables and storage designed at a child's proportions, finished for grown-up rooms.",
    image: catFurniture,
  },
  {
    slug: "custom",
    name: "Custom Pieces",
    tagline: "Made for one child",
    description:
      "Name-engraved, colour-matched and bespoke commissions built to your sketch in our workshop.",
    image: catCustom,
  },
];

export const products: Product[] = [
  {
    id: "nv-01",
    slug: "naveh-wooden-scooter",
    name: "NAVEH Wooden Scooter",
    categorySlug: "ride-ons",
    price: 8450,
    compareAtPrice: 9800,
    shortDescription:
      "A three-wheeled birch ply scooter with a low, stable deck and hand-turned handlebars.",
    description:
      "Our signature ride-on. The frame is cut from 18mm Baltic birch plywood, then shaped and sanded through four grits until the edges feel like river stone. The three-wheel geometry keeps a toddler upright while they learn to push, steer and stop — and the seat height suits children from the moment they can walk steadily. Wheels are silent EVA on steel bearings, so it will not mark your floors or wake a sleeping sibling.",
    images: [productScooter, heroScooter, craftSanding],
    specs: {
      dimensions: "58 × 30 × 42 cm",
      materials: "Baltic birch plywood, beech dowels, EVA wheels",
      woodType: "Baltic birch ply",
      finish: "Water-based non-toxic lacquer, dusty blue accents",
      recommendedAge: "18 months – 4 years",
      weight: "3.4 kg",
      assemblyTime: "10 minutes",
      assemblyDifficulty: "Easy — one allen key included",
    },
    included: ["Scooter body & deck", "Handlebar assembly", "3 EVA wheels, pre-fitted", "Allen key + spare fixings", "Illustrated assembly card"],
    safety: [
      "Rounded, splinter-free edges throughout",
      "Non-toxic, saliva-resistant water-based finish",
      "Tested to a 30 kg static load",
    ],
    availability: "in_stock",
    featured: true,
    rating: 4.9,
    reviewCount: 124,
    createdAt: "2026-02-10",
  },
  {
    id: "nv-02",
    slug: "rocking-dinosaur",
    name: "Rocking Dinosaur",
    categorySlug: "rockers",
    price: 9950,
    shortDescription: "A friendly plywood dino rocker with a supportive backrest and wide runners.",
    description:
      "Half rocking horse, half best friend. The dinosaur silhouette is cut on our CNC then finished entirely by hand — every tooth, spine plate and eye is sanded soft. Wide laminated runners give a long, slow rocking arc that is calming rather than jolting, and the backrest and grab dowel keep smaller riders secure.",
    images: [productRockingDinosaur, craftSanding, storyWorkshop],
    specs: {
      dimensions: "78 × 34 × 56 cm",
      materials: "Baltic birch plywood, beech grab dowel",
      woodType: "Baltic birch ply",
      finish: "Natural matte oil-wax",
      recommendedAge: "1 – 5 years",
      weight: "6.2 kg",
      assemblyTime: "15 minutes",
      assemblyDifficulty: "Easy — 8 fixings",
    },
    included: ["Dino body panels", "Seat & backrest", "Two laminated runners", "Fixings + allen key", "Illustrated assembly card"],
    safety: ["Tip-resistant runner geometry", "Non-toxic oil-wax finish", "Anti-slip runner pads"],
    availability: "in_stock",
    featured: true,
    rating: 5,
    reviewCount: 86,
    createdAt: "2026-01-22",
  },
  {
    id: "nv-03",
    slug: "montessori-climbing-arch",
    name: "Montessori Climbing Arch",
    categorySlug: "montessori",
    price: 12500,
    shortDescription: "A reversible arch and rocker in solid birch — climb one way, rock the other.",
    description:
      "The single most-used piece in a Montessori playroom. Turned one way it is a climbing arch; flipped over it becomes a deep rocker or, with a blanket thrown over, a cave. Rungs are solid beech, spaced to a toddler's grip, and the side panels are laminated from three plies for strength without weight.",
    images: [productClimbingArch, craftSanding, assemblyKit],
    specs: {
      dimensions: "88 × 56 × 48 cm",
      materials: "Baltic birch plywood, solid beech rungs",
      woodType: "Birch ply + beech",
      finish: "Clear natural water-based lacquer",
      recommendedAge: "10 months – 6 years",
      weight: "7.8 kg",
      assemblyTime: "20 minutes",
      assemblyDifficulty: "Easy — 12 fixings",
    },
    included: ["Two arch side panels", "11 beech rungs", "Fixings + allen key", "Illustrated assembly card"],
    safety: ["Load tested to 60 kg", "Rung spacing follows EN 71 guidance", "Non-toxic lacquer"],
    availability: "in_stock",
    featured: true,
    rating: 4.8,
    reviewCount: 61,
    createdAt: "2026-03-04",
  },
  {
    id: "nv-04",
    slug: "arch-chair",
    name: "Arch Chair",
    categorySlug: "furniture",
    price: 6800,
    shortDescription: "A child-scale chair with a bentwood arch back and soft sage seat.",
    description:
      "Designed to sit in a living room without looking like nursery furniture. The arch back is steam-formed, the seat is a single sculpted panel finished in soft sage, and the splayed legs keep it steady when a four-year-old climbs in sideways. Pairs with the NAVEH play table.",
    images: [productArchChair, catFurniture, storyWorkshop],
    specs: {
      dimensions: "34 × 32 × 54 cm (seat height 26 cm)",
      materials: "Solid beech frame, birch ply seat",
      woodType: "Beech + birch ply",
      finish: "Sage green non-toxic matte paint, clear-sealed frame",
      recommendedAge: "2 – 7 years",
      weight: "2.9 kg",
      assemblyTime: "10 minutes",
      assemblyDifficulty: "Easy — 4 legs to bolt on",
    },
    included: ["Seat & back assembly", "Four legs", "Fixings + allen key", "Felt floor pads"],
    safety: ["Rounded edges", "Toy-safe paint (EN 71-3)", "Stability tested"],
    availability: "in_stock",
    featured: true,
    rating: 4.9,
    reviewCount: 47,
    createdAt: "2026-02-28",
  },
  {
    id: "nv-05",
    slug: "kitchen-tower-birch",
    name: "Kitchen Tower — Birch",
    categorySlug: "kitchen-towers",
    price: 11900,
    shortDescription: "An adjustable learning tower in natural birch, with three platform heights.",
    description:
      "Brings your child up to counter height so they can wash, stir and watch. The platform drops into three positions as they grow, and the enclosed sides and rear rail keep them safe while their hands are busy. The footprint is deliberately narrow so it lives in a real Indian kitchen.",
    images: [productKitchenTower, craftSanding, assemblyKit],
    specs: {
      dimensions: "45 × 50 × 90 cm",
      materials: "Baltic birch plywood, beech safety rail",
      woodType: "Baltic birch ply",
      finish: "Clear natural water-based lacquer",
      recommendedAge: "18 months – 6 years",
      weight: "9.5 kg",
      assemblyTime: "25 minutes",
      assemblyDifficulty: "Moderate — 18 fixings",
    },
    included: ["Two side panels", "Adjustable platform + footstep", "Safety rail", "Fixings + allen key", "Illustrated assembly card"],
    safety: ["Load tested to 70 kg", "Anti-slip platform surface", "Enclosed sides + rear rail"],
    availability: "in_stock",
    featured: true,
    rating: 4.9,
    reviewCount: 103,
    createdAt: "2026-01-08",
  },
  {
    id: "nv-06",
    slug: "kitchen-tower-hdhmr",
    name: "Kitchen Tower — HDHMR",
    categorySlug: "kitchen-towers",
    price: 9400,
    shortDescription: "The same tower in moisture-resistant HDHMR, finished in warm cream.",
    description:
      "Built for kitchens that see steam, splashes and daily scrubbing. HDHMR board resists moisture far better than MDF, and the cream lacquer wipes clean. Identical geometry to the birch tower, including the three platform heights.",
    images: [productKitchenTower, catScooter, assemblyKit],
    specs: {
      dimensions: "45 × 50 × 90 cm",
      materials: "HDHMR board, beech safety rail",
      woodType: "HDHMR",
      finish: "Warm cream non-toxic lacquer",
      recommendedAge: "18 months – 6 years",
      weight: "11 kg",
      assemblyTime: "25 minutes",
      assemblyDifficulty: "Moderate — 18 fixings",
    },
    included: ["Two side panels", "Adjustable platform + footstep", "Safety rail", "Fixings + allen key"],
    safety: ["Moisture-resistant core", "Toy-safe lacquer", "Anti-slip platform surface"],
    availability: "in_stock",
    featured: false,
    rating: 4.7,
    reviewCount: 58,
    createdAt: "2026-01-09",
  },
  {
    id: "nv-07",
    slug: "balance-bike",
    name: "Heritage Balance Bike",
    categorySlug: "ride-ons",
    price: 10500,
    shortDescription: "A no-pedal balance bike with an adjustable seat and cushioned tyres.",
    description:
      "The gentlest possible route to riding a real bicycle. Children push, glide and learn balance first — pedals come later and easily. The seat rises through five positions, and the laminated frame absorbs the bumps of an uneven Indian pavement.",
    images: [productBalanceBike, catRideOn, craftSanding],
    specs: {
      dimensions: "84 × 38 × 56 cm",
      materials: "Laminated birch ply, EVA tyres, steel bearings",
      woodType: "Baltic birch ply",
      finish: "Clear lacquer with natural leather saddle wrap",
      recommendedAge: "2 – 5 years",
      weight: "3.8 kg",
      assemblyTime: "15 minutes",
      assemblyDifficulty: "Easy",
    },
    included: ["Frame", "Fork & handlebar", "Two wheels", "Adjustable saddle", "Fixings + allen key"],
    safety: ["Limited steering angle", "Puncture-proof tyres", "Rounded handlebar ends"],
    availability: "made_to_order",
    featured: true,
    rating: 4.8,
    reviewCount: 72,
    createdAt: "2025-12-14",
  },
  {
    id: "nv-08",
    slug: "push-walker",
    name: "First Steps Push Walker",
    categorySlug: "ride-ons",
    price: 7600,
    shortDescription: "A weighted walker wagon that steadies first steps and carries the toys home.",
    description:
      "Deliberately weighted at the base so it will not shoot away from an unsteady walker. The wagon holds blocks, books or a favourite bear, and the rubber-rimmed wheels have adjustable friction so you can slow it down for a beginner.",
    images: [productWalker, catLearning, storyWorkshop],
    specs: {
      dimensions: "48 × 40 × 52 cm",
      materials: "Birch ply, beech handle, rubber-rimmed wheels",
      woodType: "Birch ply + beech",
      finish: "Natural oil-wax with blush accents",
      recommendedAge: "9 months – 3 years",
      weight: "5.1 kg",
      assemblyTime: "15 minutes",
      assemblyDifficulty: "Easy",
    },
    included: ["Wagon body", "Handle assembly", "Four wheels", "Fixings + allen key"],
    safety: ["Weighted anti-tip base", "Adjustable wheel friction", "Non-toxic oil-wax"],
    availability: "in_stock",
    featured: false,
    rating: 4.7,
    reviewCount: 39,
    createdAt: "2025-11-30",
  },
  {
    id: "nv-09",
    slug: "little-wooden-car",
    name: "Little Wooden Car",
    categorySlug: "rockers",
    price: 2400,
    shortDescription: "A palm-sized push car turned and sanded from solid beech offcuts.",
    description:
      "Made entirely from offcuts left over by the larger pieces — nothing in the workshop is wasted. Each car has its own grain, so no two are the same. Small enough for a pocket, heavy enough to feel real.",
    images: [productWoodenCar, craftSanding, catCustom],
    specs: {
      dimensions: "12 × 6 × 6 cm",
      materials: "Solid beech, birch dowel axles",
      woodType: "Solid beech",
      finish: "Food-grade beeswax",
      recommendedAge: "3+ years",
      weight: "0.2 kg",
      assemblyTime: "None",
      assemblyDifficulty: "Ready to play",
    },
    included: ["One wooden car", "Cotton drawstring bag"],
    safety: ["Beeswax finish", "Solid one-piece body", "No small detachable parts"],
    availability: "in_stock",
    featured: false,
    rating: 4.9,
    reviewCount: 210,
    createdAt: "2025-10-05",
  },
  {
    id: "nv-10",
    slug: "rocking-horse-classic",
    name: "Classic Rocking Horse",
    categorySlug: "rockers",
    price: 14500,
    shortDescription: "The heirloom piece — a full-size rocking horse with a hand-finished mane.",
    description:
      "Twenty years of workshop experience distilled into one shape. Laminated body, hand-carved head, real horsehair mane and a saddle finished in vegetable-tanned leather. Built to be handed down.",
    images: [catRockingHorse, storyWorkshop, craftSanding],
    specs: {
      dimensions: "104 × 38 × 74 cm",
      materials: "Laminated birch, solid beech, leather saddle",
      woodType: "Birch + beech",
      finish: "Hand-rubbed oil, natural horsehair mane",
      recommendedAge: "2 – 8 years",
      weight: "12.4 kg",
      assemblyTime: "30 minutes",
      assemblyDifficulty: "Moderate",
    },
    included: ["Horse body", "Runner base", "Leather saddle & reins", "Fixings + allen key"],
    safety: ["Wide-stance runners", "Grab handles at the withers", "Load tested to 60 kg"],
    availability: "made_to_order",
    featured: true,
    rating: 5,
    reviewCount: 34,
    createdAt: "2025-09-18",
  },
  {
    id: "nv-11",
    slug: "play-table",
    name: "Round Play Table",
    categorySlug: "furniture",
    price: 13200,
    shortDescription: "A round birch play table sized for two arch chairs and one big project.",
    description:
      "A 70cm round top on three splayed beech legs — no corners to run into, and light enough for a parent to move with one hand. The surface is sealed against paint, glue and the occasional bowl of dal.",
    images: [catFurniture, productArchChair, storyWorkshop],
    specs: {
      dimensions: "70 cm diameter × 48 cm high",
      materials: "Birch ply top, solid beech legs",
      woodType: "Birch ply + beech",
      finish: "Clear wipeable water-based lacquer",
      recommendedAge: "2 – 8 years",
      weight: "8.2 kg",
      assemblyTime: "15 minutes",
      assemblyDifficulty: "Easy — 3 legs",
    },
    included: ["Round tabletop", "Three legs", "Fixings + allen key", "Felt floor pads"],
    safety: ["No sharp corners", "Wipeable toy-safe finish", "Stability tested"],
    availability: "in_stock",
    featured: false,
    rating: 4.8,
    reviewCount: 44,
    createdAt: "2026-02-02",
  },
  {
    id: "nv-12",
    slug: "name-puzzle",
    name: "Personalised Name Puzzle",
    categorySlug: "custom",
    price: 1950,
    shortDescription: "Your child's name, cut letter by letter and finished in your chosen palette.",
    description:
      "Cut from 12mm birch ply and painted in any three colours from the NAVEH palette. Each letter lifts out of its own recess — a first lesson in reading, spelling and patience. Made to order in five working days.",
    images: [catCustom, craftSanding, productWoodenCar],
    specs: {
      dimensions: "Depends on name length, 12 cm tall",
      materials: "Birch plywood",
      woodType: "Birch ply",
      finish: "Toy-safe water-based paint",
      recommendedAge: "2+ years",
      weight: "0.4 kg",
      assemblyTime: "None",
      assemblyDifficulty: "Ready to play",
    },
    included: ["Name puzzle board", "Loose letters", "Cotton storage bag"],
    safety: ["Toy-safe paint (EN 71-3)", "Rounded letter edges", "Not suitable under 24 months"],
    availability: "made_to_order",
    featured: false,
    rating: 4.9,
    reviewCount: 156,
    createdAt: "2026-03-12",
  },
];

export const shippingMethods: ShippingMethod[] = [
  { id: "standard", label: "Standard delivery", detail: "5–8 working days, all India", price: 0 },
  { id: "express", label: "Express delivery", detail: "2–3 working days, metro cities", price: 650 },
  { id: "white-glove", label: "White-glove setup", detail: "Delivered and assembled at home", price: 1500 },
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
      "We bought the kitchen tower to stop our toddler climbing the counter. Two years later it is still the most used object in the house.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Fathima Noor",
    city: "Kochi",
    quote:
      "Sara helped us design a name puzzle and a matching rocker for twins. The care in the finishing is obvious the moment you touch it.",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    question: "What wood do you use, and is it safe?",
    answer:
      "Most pieces are made from Baltic birch plywood with solid beech components. Finishes are water-based, non-toxic and compliant with EN 71-3 for toy safety, so they are safe if a child mouths the surface.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "In-stock pieces ship in 3–5 working days and reach most Indian addresses within a week. Made-to-order and custom pieces take 2–3 weeks in the workshop before dispatch.",
  },
  {
    question: "Is assembly difficult?",
    answer:
      "No. Every piece arrives with pre-drilled parts, sorted fixings, an allen key and an illustrated card. Most items take 10–25 minutes with no other tools.",
  },
  {
    question: "Can I order a custom size or colour?",
    answer:
      "Yes. Share your idea through the Custom Orders page — sketches and reference photos welcome. Sara will reply with a quote, timeline and colour samples within two working days.",
  },
  {
    question: "Do you ship outside India?",
    answer:
      "We ship internationally on request for larger orders. Write to hello@navehkids.com with your address and we will quote freight before you commit.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Unused in-stock items can be returned within 14 days of delivery in their original packaging. Custom and personalised pieces are non-returnable unless they arrive damaged.",
  },
];

export const craftSteps = [
  { step: "01", title: "Design", body: "Sara sketches each piece around how a child actually moves, plays and grows." },
  { step: "02", title: "Cut", body: "Panels are CNC-cut from certified birch ply so every joint lands to the millimetre." },
  { step: "03", title: "Sand", body: "Four grits by hand until every edge is soft enough for a bare knee." },
  { step: "04", title: "Finish", body: "Water-based, toy-safe colour in our seven-shade palette, cured and inspected." },
];
