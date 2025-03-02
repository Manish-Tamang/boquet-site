"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { ProductGallery } from "@/components/product-gallery"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { notFound } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].name)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      variant: selectedVariant,
      size: selectedSize,
    })
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Shipping is calculated at checkout</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Choose Variant</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.name}
                    type="button"
                    variant={selectedVariant === variant.name ? "default" : "outline"}
                    className="rounded-md"
                    disabled={!variant.inStock}
                    onClick={() => setSelectedVariant(variant.name)}
                  >
                    {variant.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Choose Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size.name}
                    type="button"
                    variant={selectedSize === size.name ? "default" : "outline"}
                    className="rounded-md w-12"
                    disabled={!size.inStock}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-medium mb-2">DISCLAIMER: GARMENT SIZE REDUCE AFTER FIRST WASH</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Size Chart */}
          <div className="pt-6 border-t">
            <h3 className="font-medium mb-4">Oversized T-Shirt</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">WASTRA.</th>
                    <th className="py-2 px-4 text-center">
                      Small
                      <br />
                      (Inches)
                    </th>
                    <th className="py-2 px-4 text-center">
                      Medium
                      <br />
                      (Inches)
                    </th>
                    <th className="py-2 px-4 text-center">
                      Large
                      <br />
                      (Inches)
                    </th>
                    <th className="py-2 px-4 text-center">
                      XL
                      <br />
                      (Inches)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium">Length</td>
                    <td className="py-2 px-4 text-center">25</td>
                    <td className="py-2 px-4 text-center">26</td>
                    <td className="py-2 px-4 text-center">27</td>
                    <td className="py-2 px-4 text-center">28</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium">Chest</td>
                    <td className="py-2 px-4 text-center">39</td>
                    <td className="py-2 px-4 text-center">41</td>
                    <td className="py-2 px-4 text-center">43</td>
                    <td className="py-2 px-4 text-center">45</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium">Sleeve</td>
                    <td className="py-2 px-4 text-center">7</td>
                    <td className="py-2 px-4 text-center">7.5</td>
                    <td className="py-2 px-4 text-center">8</td>
                    <td className="py-2 px-4 text-center">8.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-center mt-2">*Size are valued after first wash*</p>
          </div>
        </div>
      </div>
    </div>
  )
}

