"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card">("qr")
  const [promoCode, setPromoCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    orderNote: "",
    city: "",
    address: "",
    landmark: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryCharge = 100
  const finalTotal = totalPrice + deliveryCharge - discount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const applyPromoCode = () => {
    if (!promoCode) return

    setIsApplying(true)

    // Simulate promo code validation
    setTimeout(() => {
      if (promoCode.toUpperCase() === "FREE30") {
        const discountAmount = Math.min(totalPrice * 0.3, 500) // 30% off, max 500
        setDiscount(discountAmount)
      }
      setIsApplying(false)
    }, 1000)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City/District is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-[1280px]">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1280px]">
      <div className="mb-8">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mt-4">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-[1fr_400px] gap-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. General Information</h2>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex">
                Full Name <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="eg: Ram Bahadur"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="eg: john@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex">
                Phone Number <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="eg: 9862200000"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNote">Order Note (any message for us)</Label>
              <Textarea
                id="orderNote"
                name="orderNote"
                placeholder="eg: I was searching for this product from so long."
                value={formData.orderNote}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2. Delivery Address</h2>

            <div className="space-y-2">
              <Label htmlFor="city" className="flex">
                City / District <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="Kathmandu Inside Ring Road"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="flex">
                  Address <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="eg: kathmandu, tinkune"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  name="landmark"
                  placeholder="eg: madan bhandari park"
                  value={formData.landmark}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3. Payment Methods</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === "qr" ? "border-primary ring-1 ring-primary" : ""
                }`}
                onClick={() => setPaymentMethod("qr")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="6" height="6" x="3" y="3" rx="1" />
                        <path d="M21 8v1a1 1 0 0 1-1 1h-1" />
                        <path d="M8 6h1" />
                        <path d="M15 3h1a3 3 0 0 1 3 3v1" />
                        <path d="M3 15v1a3 3 0 0 0 3 3h1" />
                        <rect width="6" height="6" x="15" y="15" rx="1" />
                        <path d="M21 11v4" />
                        <path d="M8 18h4" />
                        <path d="M6 11h4" />
                        <path d="M11 11h1" />
                        <path d="M15 11h1" />
                        <path d="M11 15v1" />
                      </svg>
                    </div>
                    <span className="font-medium">QR Payment</span>
                  </div>
                  {paymentMethod === "qr" && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === "card" ? "border-primary ring-1 ring-primary" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-md">
                      <div className="flex flex-col items-center">
                        <div className="flex">
                          <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
                          <div className="w-6 h-4 bg-red-500 rounded-sm -ml-3"></div>
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">Visa/Mastercard</span>
                  </div>
                  {paymentMethod === "card" && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-muted/30 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.variant}-${item.size}`} className="flex gap-4">
                <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 left-0 w-6 h-6 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-br-md">
                    {index + 1}
                  </div>
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Variant: {item.variant}/{item.size}
                  </p>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm">
                      रु{item.price.toLocaleString()} × {item.quantity}
                    </p>
                    <p className="font-medium">रु{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>Sub-total</span>
              <span>रु{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>रु{deliveryCharge}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-रु{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>रु{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex gap-2">
              <Input placeholder="eg: FREE30" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <Button
                variant="secondary"
                onClick={applyPromoCode}
                disabled={isApplying || !promoCode}
                className="whitespace-nowrap"
              >
                {isApplying ? "Applying..." : "Apply"}
              </Button>
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

