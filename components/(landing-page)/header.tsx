"use client";

// components/sections/Header.tsx
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  HelpCircle,
  MessageCircle,
  Menu,
  Mountain,
  Sparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userProfile } = useAuth();

  const navLinks = [
    {
      name: "Features",
      href: "#features",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      name: "Pricing",
      href: "#pricing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Testimonials",
      href: "#testimonials",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    { name: "FAQ", href: "#faq", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full container mx-auto">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl"
          >
            <Mountain className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="whitespace-nowrap">Acme Inc</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:underline underline-offset-4 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          {userProfile ? (
            <div className="hidden md:flex gap-2">
              <Button
                size="sm"
                className="text-sm"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </Button>
              <Button
                size="sm"
                className="text-sm"
                onClick={() => router.push("/auth/signup")}
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 border-t bg-background">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className=" flex items-center gap-2 py-2 text-base font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.icon} {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            {userProfile ? (
              <div className="flex flex-col gap-3 pt-2 border-t">
                <Button
                  className="w-full"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2 border-t">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/auth/login")}
                >
                  Log in
                </Button>
                <Button
                  className="w-full"
                  onClick={() => router.push("/auth/signup")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
