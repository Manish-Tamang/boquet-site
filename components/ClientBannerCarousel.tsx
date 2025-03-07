"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SanityHeroSlide } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface BannerCarouselProps {
    slides: SanityHeroSlide[];
}

const ClientBannerCarousel: React.FC<BannerCarouselProps> = ({ slides }) => {
    const [plugin] = React.useState(() => Autoplay({ delay: 5000, stopOnInteraction: false }));

    return (
        <div className="w-full flex justify-center overflow-hidden bg-muted">
            <div className="w-[1280px]">
                <Carousel
                    plugins={[plugin]}
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
                                    { }
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        { }
                                        <div className="container mx-auto px-4 text-center">
                                            { }
                                            <div className="max-w-md mx-auto space-y-2">
                                                { }
                                                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-white">
                                                    { }
                                                    {slide.title}
                                                </h1>
                                                <p className="text-white/80 text-sm">
                                                    { }
                                                    {slide.subtitle}
                                                </p>
                                                <Button asChild size="sm" variant="secondary">
                                                    { }
                                                    <div>
                                                        <Link href={slide.ctaLink || "/"}>{slide.ctaText}</Link>
                                                    </div>
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
        </div>
    );
};

export default ClientBannerCarousel;