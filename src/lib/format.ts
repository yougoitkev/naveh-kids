import type { Availability } from "./types";

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const availabilityLabel: Record<Availability, string> = {
  in_stock: "In stock — ships in 3–5 days",
  made_to_order: "Made to order — ships in 2–3 weeks",
  sold_out: "Sold out — join the waitlist",
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
