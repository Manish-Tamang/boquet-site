"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItemType } from "@/types"

interface CartContextType {
  cart: CartItemType[]
  addToCart: (item: CartItemType) => void
  removeFromCart: (item: CartItemType) => void
  updateQuantity: (item: CartItemType, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    // Calculate totals
    const items = cart.reduce((sum, item) => sum + item.quantity, 0)
    const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    setTotalItems(items)
    setTotalPrice(price)
  }, [cart])

  const addToCart = (newItem: CartItemType) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === newItem.id && item.variant === newItem.variant && item.size === newItem.size,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += newItem.quantity
        return updatedCart
      } else {
        // Add new item to cart
        return [...prevCart, newItem]
      }
    })
  }

  const removeFromCart = (itemToRemove: CartItemType) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === itemToRemove.id && item.variant === itemToRemove.variant && item.size === itemToRemove.size),
      ),
    )
  }

  const updateQuantity = (itemToUpdate: CartItemType, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemToUpdate.id && item.variant === itemToUpdate.variant && item.size === itemToUpdate.size) {
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

