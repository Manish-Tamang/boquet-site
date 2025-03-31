"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import { SanityHeroSlide } from "@/types";
import ClientBannerCarousel from "./ClientBannerCarousel";
import { client } from '@/sanity/lib/client';
import { bouquetHeroSectionQuery } from "@/sanity/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

export function BannerCarousel() {
  const [slides, setSlides] = useState<SanityHeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await client.fetch<{ slides: SanityHeroSlide[] }>(bouquetHeroSectionQuery);
        setSlides(data?.slides || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hero slides.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
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

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return <ClientBannerCarousel slides={slides} />;
}