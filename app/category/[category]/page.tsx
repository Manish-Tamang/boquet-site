"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { SanityProduct } from "@/types";
import { bouquetQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton"; 
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = params.category as string;
  const collectionParam = searchParams.get("collection");

  const [filteredBouquets, setFilteredBouquets] = useState<SanityProduct[]>([]);
  const [allBouquets, setAllBouquets] = useState<SanityProduct[]>([]);
  const [collections, setCollections] = useState<string[]>(collectionParam ? [collectionParam] : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchBouquets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await client.fetch<SanityProduct[]>(bouquetQuery);
        setAllBouquets(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch bouquets");
      } finally {
        setLoading(false);
      }
    };

    fetchBouquets();
  }, []);

  
  useEffect(() => {
    let result = allBouquets;

    
    if (category !== "all") {
      result = result.filter((bouquet) => bouquet.bouquetCategory?.name.toLowerCase().replace(" ", "-") === category);
    }

    
    if (collections.length > 0) {
      result = result.filter((bouquet) => collections.includes(bouquet.seasonalCollection?.name || ""));
    }

    setFilteredBouquets(result);
  }, [category, collections, allBouquets]);

  
  const availableCollections = [
    ...new Set(
      allBouquets
        .filter((b) => category === "all" || b.bouquetCategory?.name.toLowerCase().replace(" ", "-") === category)
        .map((b) => b.seasonalCollection?.name)
        .filter(Boolean) 
    ),
  ] as string[];

  const handleCollectionChange = (collection: string) => {
    setCollections((prev) =>
      prev.includes(collection) ? prev.filter((c) => c !== collection) : [...prev, collection]
    );
  };

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4"><Skeleton className="h-6 w-32 bg-gray-200"/></h3>
              <div className="space-y-2">
                {}
                {Array(3).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4"><Skeleton className="h-6 w-32 bg-gray-200"/></h3>
              <div className="grid grid-cols-2 gap-4">
                {}
                {Array(4).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-32 bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
          <div>
            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(null).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="max-w-[1280px] mx-auto px-4 py-8">Error: {error}</div>;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {category === "all" ? "All Bouquets" : category.replace("-", " ")}
      </h1>
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Collections</h3>
            <div className="space-y-2">
              {availableCollections.map((collection) => (
                <div key={collection} className="flex items-center space-x-2">
                  <Checkbox
                    id={`collection-${collection}`}
                    checked={collections.includes(collection)}
                    onCheckedChange={() => handleCollectionChange(collection)}
                  />
                  <Label htmlFor={`collection-${collection}`} className="capitalize">
                    {collection}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilteredBouquets(allBouquets.filter((b) => b.price < 2000))
                }
              >
                Under रु2000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilteredBouquets(
                    allBouquets.filter((b) => b.price >= 2000 && b.price <= 3000)
                  )
                }
              >
                रु2000-रु3000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilteredBouquets(
                    allBouquets.filter((b) => b.price >= 3000 && b.price <= 4000)
                  )
                }
              >
                रु3000-रु4000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilteredBouquets(allBouquets.filter((b) => b.price > 4000))
                }
              >
                Over रु4000
              </Button>
            </div>
          </div>
        </div>
        <div>
          {filteredBouquets.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No bouquets found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBouquets.map((bouquet) => (
                <ProductCard key={bouquet._id} product={bouquet} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}