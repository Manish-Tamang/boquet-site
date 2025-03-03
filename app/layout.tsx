import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { CartProvider } from "@/context/cart-context"
import { ProgressBar } from "@/components/ui/progress-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlossomCart - Elegant Bouquets for Every Occasion",
  description: "Discover the beauty of handpicked floral arrangements at BlossomCart. From romantic roses to vibrant mixed bouquets, we deliver fresh blooms for every celebration.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <ProgressBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'