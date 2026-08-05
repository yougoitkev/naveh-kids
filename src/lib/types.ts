export type Availability = "in_stock" | "made_to_order" | "sold_out";

export interface ProductSpecs {
  dimensions: string;
  materials: string;
  woodType: string;
  finish: string;
  recommendedAge: string;
  weight: string;
  assemblyTime: string;
  assemblyDifficulty: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "INR";
  categorySlug: string;
  images: string[];
  availability: Availability;
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: string;
  specs: ProductSpecs;
  included: string[];
  safety: string[];
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  quote: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
}

export interface DeliveryAddress {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ShippingMethod {
  id: string;
  label: string;
  description: string;
  price: number;
  eta: string;
}

export interface OrderDraft {
  customer: CustomerDetails;
  address: DeliveryAddress;
  shippingMethodId: string;
  items: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface Order extends OrderDraft {
  id: string;
  placedAt: string;
  status: "confirmed" | "in_workshop" | "shipped" | "delivered";
  estimatedDelivery: string;
}

export interface CustomOrderRequest {
  name: string;
  phone: string;
  email: string;
  productType: string;
  dimensions: string;
  woodType: string;
  finish: string;
  quantity: number;
  description: string;
  referenceImageName?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
