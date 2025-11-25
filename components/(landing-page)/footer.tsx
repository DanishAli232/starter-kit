// components/sections/Footer.tsx
import Link from "next/link";
import { Mountain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Mountain className="h-6 w-6" />
            <span>Acme Inc</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Building the future, one component at a time.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
