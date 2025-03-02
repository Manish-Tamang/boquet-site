// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { CartProvider } from "@/context/cart-context";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SanityLive } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

const inter = Inter({ subsets: ["latin"] });

async function getSiteSettings() {
  try {
    const settings = await sanityFetch({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    });

    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export const metadata: Metadata = {
  title: "BlossomCart - Elegant Bouquets for Every Occasion",
  description:
    "Discover the beauty of handpicked floral arrangements at BlossomCart. From romantic roses to vibrant mixed bouquets, we deliver fresh blooms for every celebration.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SanityLive>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <ProgressBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </SanityLive>
      </body>
    </html>
  );
}

import "./globals.css";