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
      <div className="grid md:grid-cols-[5fr_7fr] gap-8 items-start">
        <div className="max-w-[350px] mx-auto w-full">
          <ProductGallery images={product.images ?? []} name={product.name} />
        </div>
        <div className="bg-white/80 rounded-xl shadow p-8 space-y-6">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-primary mb-1">रु{product.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mb-4">Shipping calculated at checkout</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-base">Variant</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants?.map((variant) => (
                  <Button
                    key={variant.toString()}
                    type="button"
                    variant={selectedVariant === variant ? "default" : "outline"}
                    className="rounded-md text-sm px-3 py-1"
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.toString()}
                  </Button>
                )) ?? <p className="text-sm">No variants</p>}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-base">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <Button
                    key={size.toString()}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className="rounded-md w-10 text-sm px-2 py-1"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.toString()}
                  </Button>
                )) ?? <p className="text-sm">No sizes</p>}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none p-1"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-base">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none p-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button size="lg" className="flex-1 text-base" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </div>

          <div className="pt-5 border-t">
            <h3 className="font-semibold mb-2 text-base">Description</h3>
            <p className="text-sm text-muted-foreground">{product.description ?? "No description"}</p>
          </div>

          <div className="pt-5 border-t">
            <h3 className="font-semibold mb-2 text-base">Details</h3>
            <p className="text-sm text-muted-foreground">{product.arrangementDetails ?? "No details"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}