"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-md bg-muted">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${name} - Image ${selectedImage + 1}`}
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative h-20 w-20 cursor-pointer overflow-hidden rounded-md bg-muted",
              selectedImage === index && "ring-2 ring-primary",
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

