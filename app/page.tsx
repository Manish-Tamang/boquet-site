"use client";

import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { BannerCarousel } from "@/components/banner-carousel";
import { SanityProduct } from "@/types";
import { bouquetQuery } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [featuredBouquets, setFeaturedBouquets] = useState<SanityProduct[]>([]);
  const [roseBouquets, setRoseBouquets] = useState<SanityProduct[]>([]);
  const [sunflowerBouquets, setSunflowerBouquets] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBouquets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await client.fetch<SanityProduct[]>(bouquetQuery);
        setFeaturedBouquets(data.filter(bouquet => bouquet.featured));
        setRoseBouquets(data.filter(bouquet => bouquet.bouquetCategory?.name === "Rose Bouquets"));
        setSunflowerBouquets(data.filter(bouquet => bouquet.bouquetCategory?.name === "Blue Cherry Buquets"));
      } catch (err: any) {
        setError(err.message || "Failed to fetch bouquets.");
      } finally {
        setLoading(false);
      }
    };
    fetchBouquets();
  }, []);

  if (loading) return <HomeSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <BannerCarousel />
      <div>
        <section className="py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Featured Bouquets</h2>
            <Link href="/category/all" className="text-sm underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredBouquets.slice(0, 4).map(bouquet => (
              <ProductCard key={bouquet._id} product={bouquet} />
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Rose Bouquets</h2>
            <Link href="/category/rose-bouquets?collection=spring" className="text-sm underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {roseBouquets
              .filter(p => p.seasonalCollection?.name === "Spring")
              .slice(0, 4)
              .map(bouquet => (
                <ProductCard key={bouquet._id} product={bouquet} />
              ))}
          </div>
        </section>
        <section className="py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Sunflower Arrangements</h2>
            <Link href="/category/sunflower-bouquets?collection=winter" className="text-sm underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sunflowerBouquets
              .filter(p => p.seasonalCollection?.name === "Winter")
              .slice(0, 4)
              .map(bouquet => (
                <ProductCard key={bouquet._id} product={bouquet} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="w-full flex justify-center overflow-hidden bg-muted">
      <div className="relative aspect-[2.5/1] w-[1280px] overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-200 opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-64 mx-auto bg-gray-300" />
            <Skeleton className="h-4 w-16 mx-auto bg-gray-300" />
            <Skeleton className="h-8 w-32 mx-auto bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-md shadow-sm p-4 animate-pulse">
      <div className="aspect-w-3 aspect-h-4 mb-4">
        <Skeleton className="h-[180px] w-full rounded-md bg-gray-200" />
      </div>
      <div>
        <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 bg-gray-200" />
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div>
      <CarouselSkeleton />
      <section className="py-8">
        <div className="flex justify-between mb-6">
          <Skeleton className="h-6 w-48 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4).fill(null).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="flex justify-between mb-6">
          <Skeleton className="h-6 w-48 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4).fill(null).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="flex justify-between mb-6">
          <Skeleton className="h-6 w-48 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4).fill(null).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}