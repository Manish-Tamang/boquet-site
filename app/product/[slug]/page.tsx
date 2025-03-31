"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { SanityProduct, SanitySize, SanityVariant } from "@/types";
import { bouquetBySlugQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ProductPageSkeleton } from "@/components/ProductPageSkeleton";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<SanityProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<SanityVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<SanitySize | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const getBouquet = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await client.fetch<SanityProduct>(bouquetBySlugQuery, { slug });
        if (productData) {
          setProduct(productData);
          setSelectedVariant(productData.variants?.[0] ?? null);
          setSelectedSize(productData.sizes?.[0] ?? "");
        } else {
          notFound();
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch bouquet");
        console.error("Error fetching bouquet:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) getBouquet();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      images: product.images ?? [], 
      quantity,
      variant: typeof selectedVariant === "string" ? selectedVariant : selectedVariant?.name ?? "",
      size: typeof selectedSize === "string" ? selectedSize : selectedSize?.name ?? "",
      image: ""
    });
  };

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-[1024px] mx-auto px-2 py-4">
      <div className="grid md:grid-cols-2 gap-4">
        <ProductGallery images={product.images ?? []} name={product.name} />

        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl font-bold">रु{product.price.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>

          <div className="space-y-2">
            <div>
              <h3 className="font-medium mb-1 text-sm">Variant</h3>
              <div className="flex flex-wrap gap-1">
                {product.variants?.map((variant) => (
                  <Button
                    key={variant.toString()}
                    type="button"
                    variant={selectedVariant === variant ? "default" : "outline"}
                    className="rounded-md text-xs px-2 py-1"
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.toString()}
                  </Button>
                )) ?? <p className="text-xs">No variants</p>}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-1 text-sm">Size</h3>
              <div className="flex flex-wrap gap-1">
                {product.sizes?.map((size) => (
                  <Button
                    key={size.toString()}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className="rounded-md w-8 text-xs px-1 py-0.5"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.toString()}
                  </Button>
                )) ?? <p className="text-xs">No sizes</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none p-1"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none p-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button className="flex-1 text-sm" size="sm" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t">
            <h3 className="font-medium mb-1 text-sm">Description</h3>
            <p className="text-xs text-muted-foreground">{product.description ?? "No description"}</p>
          </div>

          <div className="pt-3 border-t">
            <h3 className="font-medium mb-1 text-sm">Details</h3>
            <p className="text-xs text-muted-foreground">{product.arrangementDetails ?? "No details"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}