export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const availabilityLabel: Record<string, string> = {
  in_stock: "In stock",
  made_to_order: "Made to order",
  sold_out: "Sold out",
};
