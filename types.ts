import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface CartItemType {
  [x: string]: any;
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant: string;
  size: string;
}

export interface SanityProduct {
  bouquetCategory: any;
  seasonalCollection: any;
  _id: string;
  name: string;
  slug: { current: string };
  images: SanityImageSource[];
  price: number;
  description: string;
  details: string[];
  category: SanityCategory;
  collection?: SanityCollection;
  variants: SanityVariant[];
  sizes: SanitySize[];
  featured: boolean;
  arrangementDetails?: string;
}

export interface SanityCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface SanityCollection {
  _id: string;
  name: string;
  description?: string;
}

export interface SanityVariant {
  name: string;
  inStock: boolean;
}

export interface SanitySize {
  name: string;
  inStock: boolean;
}

export interface SanityHeroSlide {
  image: SanityImageSource;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface SanitySiteSettings {
  siteName: string;
  logo: SanityImageSource;
  footerText: string;
}

export type PaymentMethod = "esewa" | "khalti";

export interface PaymentRequestData {
  amount: string;
  productName: string;
  transactionId: string;
  method: PaymentMethod;
}
