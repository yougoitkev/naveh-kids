/**
 * API layer.
 *
 * Every read/write the UI performs goes through this module. Today it resolves
 * against the local catalog fixtures; when the Django REST Framework backend is
 * ready, set VITE_API_BASE_URL and swap each function body for a `request()`
 * call — no component needs to change.
 */
import { categories, products, testimonials, shippingMethods, faqs } from "@/data/catalog";
import type {
  Category,
  ContactMessage,
  CustomOrderRequest,
  Order,
  OrderDraft,
  Product,
  ShippingMethod,
  Testimonial,
} from "@/lib/types";

export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "";

/** Endpoint map mirroring the planned DRF routes. */
export const endpoints = {
  products: "/api/products/",
  product: (slug: string) => `/api/products/${slug}/`,
  categories: "/api/categories/",
  orders: "/api/orders/",
  order: (id: string) => `/api/orders/${id}/`,
  customOrders: "/api/custom-orders/",
  contact: "/api/contact/",
  razorpayOrder: "/api/payments/razorpay/order/",
  razorpayVerify: "/api/payments/razorpay/verify/",
} as const;

/** Thin fetch wrapper, ready for the real backend. */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as T;
}

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listProducts(): Promise<Product[]> {
  await delay();
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await delay();
  return products.find((p) => p.slug === slug);
}

export async function listCategories(): Promise<Category[]> {
  await delay();
  return categories;
}

export async function listTestimonials(): Promise<Testimonial[]> {
  await delay();
  return testimonials;
}

export async function listShippingMethods(): Promise<ShippingMethod[]> {
  await delay();
  return shippingMethods;
}

export async function listFaqs() {
  await delay();
  return faqs;
}

export async function relatedProducts(slug: string): Promise<Product[]> {
  const product = products.find((p) => p.slug === slug);
  if (!product) return [];
  const sameCategory = products.filter(
    (p) => p.categorySlug === product.categorySlug && p.slug !== slug,
  );
  const fill = products.filter((p) => p.categorySlug !== product.categorySlug && p.featured);
  return [...sameCategory, ...fill].slice(0, 4);
}

export async function createOrder(draft: OrderDraft): Promise<Order> {
  await delay(400);
  const id = `KRU-${Math.floor(100000 + Math.random() * 899999)}`;
  const eta = new Date(Date.now() + 7 * 86400000);
  return {
    ...draft,
    id,
    placedAt: new Date().toISOString(),
    status: "confirmed",
    estimatedDelivery: eta.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export async function submitCustomOrder(payload: CustomOrderRequest): Promise<{ reference: string }> {
  await delay(500);
  return { reference: `CUS-${Math.floor(1000 + Math.random() * 8999)}` };
}

export async function submitContactMessage(payload: ContactMessage): Promise<{ ok: true }> {
  await delay(400);
  return { ok: true };
}

/**
 * Payment gateway seam. The real implementation will create a Razorpay order on
 * the Django backend and open the Razorpay checkout with the returned order id.
 * Intentionally not simulated here.
 */
export const payments = {
  provider: "razorpay" as const,
  isConfigured: false,
  async createPaymentIntent(_orderId: string): Promise<never> {
    throw new Error("Razorpay is not connected yet. Configure the backend payment endpoint.");
  },
};
