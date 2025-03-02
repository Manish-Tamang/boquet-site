import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { BannerCarousel } from "@/components/banner-carousel";
import { getProducts } from "@/lib/sanityDataFetching"; 
import { SanityProduct } from "@/types";

async function getStaticProducts() {
  const products = await getProducts();
  return products;
}

export default async function Home() {
  const products = await getStaticProducts();

  const featuredProducts = products.filter((product: SanityProduct) => product.featured);
  const tShirts = products.filter((product: SanityProduct) => product.category?.name === "t-shirts");
  const hoodies = products.filter((product: SanityProduct) => product.category?.name === "hoodies");

  return (
    <div>
      <BannerCarousel />
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/category/all" className="text-sm font-medium underline underline-offset-4">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product: SanityProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">2025 Collection</h2>
            <Link
              href="/category/t-shirts?collection=2025"
              className="text-sm font-medium underline underline-offset-4"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tShirts
              .filter((p: SanityProduct) => p.collection?.name === "2025")
              .slice(0, 4)
              .map((product: SanityProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </section>
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Winter Collection</h2>
            <Link
              href="/category/hoodies?collection=winter"
              className="text-sm font-medium underline underline-offset-4"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hoodies
              .filter((p: SanityProduct) => p.collection?.name === "winter")
              .slice(0, 4)
              .map((product: SanityProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}