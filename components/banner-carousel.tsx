"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SanityHeroSlide } from "@/types";
import { sanityFetch } from "@/sanity/lib/live";
import { heroSectionQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

async function getHeroSlides(): Promise<SanityHeroSlide[]> {
  try {
    const data = await sanityFetch<{ slides: SanityHeroSlide[] }>({
      query: heroSectionQuery,
      tags: ['heroSection'],
    });
    return data?.slides || [];
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return [];
  }
}

export async function BannerCarousel() {
  const slides = await getHeroSlides();
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <div className="w-full overflow-hidden bg-muted">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative pl-0">
              <div className="relative aspect-[2.5/1] w-full overflow-hidden">
                <Image
                  src={urlFor(slide.image).url() || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/20">
                  <div className="container h-full max-w-[1280px] mx-auto px-4 flex items-center">
                    <div className="max-w-lg space-y-4">
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{slide.title}</h1>
                      <p className="text-muted-foreground md:text-xl">{slide.subtitle}</p>
                      <Button asChild size="lg">
                        <Link href={slide.ctaLink || "/"}>{slide.ctaText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}