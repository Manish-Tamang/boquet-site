"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { CartItem } from "@/components/cart-item"

export function Navbar() {
  const { cart, totalItems, totalPrice } = useCart()
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-[1280px] mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">WASTRA</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>T-Shirts</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/category/t-shirts" title="All T-Shirts">
                    Browse our complete collection of t-shirts
                  </ListItem>
                  <ListItem href="/category/t-shirts?collection=2025" title="2025 Collection">
                    Our latest designs for the upcoming season
                  </ListItem>
                  <ListItem href="/category/t-shirts?style=oversized" title="Oversized">
                    Comfortable oversized fits for everyday wear
                  </ListItem>
                  <ListItem href="/category/t-shirts?style=graphic" title="Graphic Tees">
                    Bold designs and eye-catching graphics
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Hoodies</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/category/hoodies" title="All Hoodies">
                    Stay warm with our premium hoodie collection
                  </ListItem>
                  <ListItem href="/category/hoodies?collection=winter" title="Winter Collection">
                    Designed for the coldest months
                  </ListItem>
                  <ListItem href="/category/hoodies?style=oversized" title="Oversized">
                    Roomy and comfortable oversized hoodies
                  </ListItem>
                  <ListItem href="/category/hoodies?style=basic" title="Basic">
                    Simple, clean designs for everyday wear
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/category/accessories" title="All Accessories">
                    Complete your look with our accessories
                  </ListItem>
                  <ListItem href="/category/accessories?type=caps" title="Caps">
                    Stylish headwear for any occasion
                  </ListItem>
                  <ListItem href="/category/accessories?type=bags" title="Bags">
                    Functional and fashionable bags
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/ask-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ask Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          {searchOpen ? (
            <div className="relative">
              <Input
                className="w-[200px] md:w-[300px]"
                placeholder="Search products..."
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setSearchOpen(false)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <div className="flex flex-col h-full">
                <h2 className="font-semibold text-lg">Shopping Cart</h2>
                {cart.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2">Your cart is empty</p>
                      <Link href="/">
                        <Button className="mt-4">Continue Shopping</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto py-4">
                      {cart.map((item) => (
                        <CartItem key={`${item.id}-${item.variant}-${item.size}`} item={item} />
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button asChild variant="outline">
                          <Link href="/cart">View Cart</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/checkout">Checkout</Link>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

