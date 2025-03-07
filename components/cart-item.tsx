import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex py-4 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3>{item.name}</h3>
          <p className="ml-4">रु{item.price.toLocaleString()}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {item.variant} / {item.size}
        </p>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => removeFromCart(item)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

