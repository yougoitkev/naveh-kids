import type { Availability } from "./types";

/**
 * Hydration-safe INR formatting: Intl adds a non-breaking space after ₹ on
 * some runtimes, so we build the string ourselves from grouped digits.
 */
export function formatINR(value: number): string {
  const hasPaise = Math.round(value * 100) % 100 !== 0;
  const digits = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: hasPaise ? 2 : 0,
  }).format(value);
  return `₹${digits}`;
}

export function priceLabel(product: { price: number; priceOnRequest?: boolean }): string {
  return product.priceOnRequest ? "Price on request" : formatINR(product.price);
}

export const availabilityLabel: Record<Availability, string> = {
  in_stock: "In stock — dispatched in 2–5 business days",
  made_to_order: "Made to order — dispatched in 2–3 weeks",
  sold_out: "Currently unavailable",
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
