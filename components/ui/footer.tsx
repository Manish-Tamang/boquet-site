import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SanitySiteSettings } from "@/types";

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
    <footer className="border-t bg-white">
      <div className="max-w-[860px] mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-base mb-2">
              {siteSettings?.siteName || "Bouquet Bliss"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Fresh, hand-picked bouquets.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Shop</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/category/rose-bouquets"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Rose Bouquets
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sunflower-bouquets"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sunflower
                </Link>
              </li>
              <li>
                <Link
                  href="/category/add-ons"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Add-Ons
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Connect</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteSettings?.siteName || "Bouquet Bliss"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}