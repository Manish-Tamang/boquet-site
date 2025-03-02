import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">WASTRA</h3>
            <p className="text-muted-foreground">Premium quality clothing made in Nepal with 100% Terry Cotton.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/t-shirts" className="text-muted-foreground hover:text-foreground">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/category/hoodies" className="text-muted-foreground hover:text-foreground">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-muted-foreground hover:text-foreground">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ask-us" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} WASTRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

