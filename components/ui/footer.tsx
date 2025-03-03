import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SanitySiteSettings } from "@/types";
import { urlFor } from "@/sanity/lib/image";

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    const settings = await sanityFetch({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });

    return settings.data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function Footer() {
  const siteSettings = await getSiteSettings();

  return (
    <footer className="border-t">
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {siteSettings?.siteName || "Bouquet Bliss"}
            </h3>
            <p className="text-muted-foreground">
              Beautifully crafted bouquets made with fresh, hand-picked flowers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/rose-bouquets"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Rose Bouquets
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sunflower-bouquets"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sunflower Arrangements
                </Link>
              </li>
              <li>
                <Link
                  href="/category/add-ons"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Gift Add-Ons
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteSettings?.siteName || "Bouquet Bliss"}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}