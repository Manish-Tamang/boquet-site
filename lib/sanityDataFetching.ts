import { client } from "@/sanity/lib/client";
import { productBySlugQuery, productQuery } from "@/sanity/lib/queries";
import { SanityProduct } from "@/types";

export async function getProducts(): Promise<SanityProduct[]> {
  return client.fetch(productQuery);
}

export async function getProductBySlug(
  slug: string
): Promise<SanityProduct | undefined> {
  return client.fetch(productBySlugQuery, { slug });
}
