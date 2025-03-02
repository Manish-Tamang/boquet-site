"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const slides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qTMfyARNlILvEtqXRexfNcqYVZsorF.png",
    title: "WASTRA 2025 Collection",
    subtitle: "Premium quality clothing made in Nepal",
    cta: {
      text: "Shop Now",
      link: "/category/t-shirts",
    },
  },
  {
    image: "/placeholder.svg?height=600&width=1920",
    title: "The Lovers Club",
    subtitle: "New designs, same comfort",
    cta: {
      text: "Explore Collection",
      link: "/category/t-shirts?collection=2025",
    },
  },
  {
    image: "/placeholder.svg?height=600&width=1920",
    title: "Winter Collection",
    subtitle: "Stay warm in style",
    cta: {
      text: "Shop Hoodies",
      link: "/category/hoodies",
    },
  },
]

export function BannerCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

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
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/20">
                  <div className="container h-full max-w-[1280px] mx-auto px-4 flex items-center">
                    <div className="max-w-lg space-y-4">
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{slide.title}</h1>
                      <p className="text-muted-foreground md:text-xl">{slide.subtitle}</p>
                      <Button asChild size="lg">
                        <Link href={slide.cta.link}>{slide.cta.text}</Link>
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
  )
}

