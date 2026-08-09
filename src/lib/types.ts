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
  categorySlug: string;
  price: number;
  priceOnRequest?: boolean;
  colours?: string[];
  compareAtPrice?: number;

  shortDescription: string;
  description: string;
  images: string[];
  specs: ProductSpecs;
  included: string[];
  safety: string[];
  availability: Availability;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingMethod {
  id: string;
  label: string;
  detail: string;
  price: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  id: string;
  placedAt: string;
  items: CartItem[];
  customer: OrderCustomer;
  shippingMethodId: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
}

export interface Faq {
  question: string;
  answer: string;
}
