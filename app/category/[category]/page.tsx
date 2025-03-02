"use client"

import { useParams, useSearchParams } from "next/navigation"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const category = params.category as string
  const collectionParam = searchParams.get("collection")
  const styleParam = searchParams.get("style")

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [collections, setCollections] = useState<string[]>(collectionParam ? [collectionParam] : [])
  const [styles, setStyles] = useState<string[]>(styleParam ? [styleParam] : [])

  // Filter products based on category, collection, and style
  useEffect(() => {
    let result = products

    // Filter by category
    if (category !== "all") {
      result = result.filter((product) => product.category === category)
    }

    // Filter by collection
    if (collections.length > 0) {
      result = result.filter((product) => collections.includes(product.collection))
    }

    // Filter by style (this would need to be added to the product data model)
    // For now, we'll just use it as a placeholder

    setFilteredProducts(result)
  }, [category, collections])

  // Get unique collections for the current category
  const availableCollections = [
    ...new Set(products.filter((p) => category === "all" || p.category === category).map((p) => p.collection)),
  ]

  const handleCollectionChange = (collection: string) => {
    setCollections((prev) => (prev.includes(collection) ? prev.filter((c) => c !== collection) : [...prev, collection]))
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category === "all" ? "All Products" : category}</h1>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Filters */}
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Collections</h3>
            <div className="space-y-2">
              {availableCollections.map((collection) => (
                <div key={collection} className="flex items-center space-x-2">
                  <Checkbox
                    id={`collection-${collection}`}
                    checked={collections.includes(collection)}
                    onCheckedChange={() => handleCollectionChange(collection)}
                  />
                  <Label htmlFor={`collection-${collection}`} className="capitalize">
                    {collection}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="sm">
                Under ₹2000
              </Button>
              <Button variant="outline" size="sm">
                ₹2000-₹3000
              </Button>
              <Button variant="outline" size="sm">
                ₹3000-₹4000
              </Button>
              <Button variant="outline" size="sm">
                Over ₹4000
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try changing your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

