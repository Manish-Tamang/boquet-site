"use client";

import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { BannerCarousel } from "@/components/banner-carousel";
import { SanityProduct } from "@/types";
import { bouquetQuery } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

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
        setSunflowerBouquets(data.filter(bouquet => bouquet.bouquetCategory?.name === "Sunflower Bouquets"));
      } catch (err: any) {
        setError(err.message || "Failed to fetch bouquets.");
      } finally {
        setLoading(false);
      }
    };
    fetchBouquets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <BannerCarousel />
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <section className="py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Featured Bouquets</h2>
            <Link href="/category/all" className="text-sm underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredBouquets.slice(0, 4).map(bouquet => <ProductCard key={bouquet._id} product={bouquet} />)}
          </div>
        </section>

        <section className="py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Rose Bouquets</h2>
            <Link href="/category/rose-bouquets?collection=spring" className="text-sm underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {roseBouquets.filter(p => p.seasonalCollection?.name === "Spring").slice(0, 4)
              .map(bouquet => <ProductCard key={bouquet._id} product={bouquet} />)}
          </div>
        </section>

        <section className="py-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Sunflower Arrangements</h2>
            <Link href="/category/sunflower-bouquets?collection=summer" className="text-sm underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sunflowerBouquets.filter(p => p.seasonalCollection?.name === "Summer").slice(0, 4)
              .map(bouquet => <ProductCard key={bouquet._id} product={bouquet} />)}
          </div>
        </section>
      </div>
    </div>
  );
}