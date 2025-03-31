import type React from "react"
import type { Metadata } from "next"
import { Karla } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { CartProvider } from "@/context/cart-context"

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "BlossomCart - Elegant Bouquets for Every Occasion",
  description: "Discover the beauty of handpicked floral arrangements at BlossomCart. From romantic roses to vibrant mixed bouquets, we deliver fresh blooms for every celebration."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="max-w-4xl mx-auto">
              <main className="flex-1">{children}</main>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}