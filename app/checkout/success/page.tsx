import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1280px]">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We've received your order and will process it shortly. You will receive an email
          confirmation with your order details.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/account/orders">View My Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

