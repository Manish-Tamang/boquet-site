import { client } from "./client";
import { SanityProduct } from "@/types";
import { productBySlugQuery, productQuery } from "@/sanity/lib/queries";

export async function fetchProductBySlug(
  slug: string
): Promise<SanityProduct | undefined> {
  try {
    return await client.fetch(productBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return undefined;
  }
}
