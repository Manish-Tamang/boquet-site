"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@/components/cart-item";

export function Navbar() {
  const { cart, totalItems, totalPrice } = useCart();
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <div className="border-b sticky top-0 z-50 bg-white">
      <div className="flex h-16 items-center px-4 max-w-4xl mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-sm">Bouquet Bliss</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Rose</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/category/rose-bouquets" title="All Rose Bouquets">
                    Browse our complete collection of rose bouquets
                  </ListItem>
                  <ListItem
                    href="/category/rose-bouquets?collection=spring"
                    title="Spring Collection"
                  >
                    Fresh and vibrant rose arrangements for spring
                  </ListItem>
                  <ListItem
                    href="/category/rose-bouquets?style=classic"
                    title="Classic"
                  >
                    Timeless rose bouquet designs
                  </ListItem>
                  <ListItem
                    href="/category/rose-bouquets?style=luxury"
                    title="Luxury"
                  >
                    Premium rose bouquets for special occasions
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Sunflower Arrangements</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/category/sunflower-bouquets" title="All Sunflower Arrangements">
                    Explore our sunny sunflower bouquet collection
                  </ListItem>
                  <ListItem
                    href="/category/sunflower-bouquets?collection=summer"
                    title="Summer Collection"
                  >
                    Bright and cheerful arrangements for summer
                  </ListItem>
                  <ListItem
                    href="/category/sunflower-bouquets?style=rustic"
                    title="Rustic"
                  >
                    Natural, countryside-inspired designs
                  </ListItem>
                  <ListItem
                    href="/category/sunflower-bouquets?style=modern"
                    title="Modern"
                  >
                    Sleek and contemporary sunflower bouquets
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Gift Add-Ons</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/category/add-ons" title="All Gift Add-Ons">
                    Enhance your bouquet with our add-ons
                  </ListItem>
                  <ListItem href="/category/add-ons?type=chocolates" title="Chocolates">
                    Sweet treats to pair with your flowers
                  </ListItem>
                  <ListItem href="/category/add-ons?type=cards" title="Greeting Cards">
                    Personalize your gift with a card
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          {searchOpen ? (
            <div className="relative">
              <Input
                className="w-[200px] md:w-[300px]"
                placeholder="Search bouquets..."
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
                <h2 className="font-semibold text-lg">Bouquet Cart</h2>
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
                        <CartItem
                          key={`${item.id}-${item.variant}-${item.size}`}
                          item={item}
                        />
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span>Subtotal</span>
                        <span>रु{totalPrice.toLocaleString()}</span>
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
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";