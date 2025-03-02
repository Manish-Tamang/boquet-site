import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="aspect-square overflow-hidden rounded-md bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <p className="mt-1 font-medium">₹{product.price.toLocaleString()}</p>
      </div>
    </Link>
  )
}

