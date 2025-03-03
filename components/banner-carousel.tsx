"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import { SanityHeroSlide } from "@/types";
import ClientBannerCarousel from "./ClientBannerCarousel";
import { client } from '@/sanity/lib/client';
import { bouquetHeroSectionQuery } from "@/sanity/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

interface BannerCarouselProps {
    //slides: SanityHeroSlide[];  No longer passing server-side slides
}

export function BannerCarousel() {
    const [slides, setSlides] = useState<SanityHeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [skeletonCount, setSkeletonCount] = useState(1);

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
          <div className="w-full overflow-hidden bg-muted">
            <div className="relative aspect-[2.5/1] w-full overflow-hidden">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/20">
                <div className="container h-full max-w-[1280px] mx-auto px-4 flex items-center">
                  <div className="max-w-lg space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-10 w-1/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return <ClientBannerCarousel slides={slides} />;
}