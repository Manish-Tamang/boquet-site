import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About BlossomCart</h1>

        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            src="/images/banner.jpeg"
            alt="BlossomCart Floral Shop"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            BlossomCart was founded with a passion for bringing joy through flowers. We specialize in crafting
            stunning bouquets for every occasion, using only the freshest and most vibrant blooms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p>
            What started as a small online floral shop has grown into a trusted destination for elegant and
            personalized bouquets. Whether it's a romantic gesture, a celebration, or just a way to brighten
            someone's day, BlossomCart ensures every arrangement is made with care.
          </p>
          <p>
            We source our flowers from the finest local and international growers, ensuring long-lasting
            freshness and quality. Our team of skilled florists handcrafts each bouquet with attention to detail,
            making every purchase a truly special experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Fresh & High-Quality Blooms:</strong> We handpick every flower to ensure freshness and beauty.
            </li>
            <li>
              <strong>Personalized Arrangements:</strong> From classic roses to exotic orchids, we create floral
              designs tailored to your needs.
            </li>
            <li>
              <strong>Fast & Reliable Delivery:</strong> Our flowers arrive fresh and on time, making gifting easy
              and hassle-free.
            </li>
            <li>
              <strong>Eco-Friendly Commitment:</strong> We strive to use sustainable packaging and support ethical
              sourcing practices.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Looking Forward</h2>
          <p>
            As we continue to grow, our goal remains the same—to spread happiness, one bouquet at a time. We are
            constantly innovating, bringing new designs and collections to match the beauty of every moment.
          </p>
          <p>
            Thank you for choosing BlossomCart. Explore our collections and let flowers express what words cannot.
          </p>

          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/shop">Shop Bouquets</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
