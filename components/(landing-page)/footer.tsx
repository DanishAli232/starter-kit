import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Mountain,
} from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Integrations", href: "#" },
        { name: "Updates", href: "#" },
        { name: "Documentation", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Status", href: "#" },
        { name: "Community", href: "#" },
        { name: "Webinars", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Disclaimer", href: "#" },
        { name: "Security", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@yourbrand.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "San Francisco, CA" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t flex justify-center">
      {/* Main Footer Content */}
      <div className="container pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand & Newsletter Section */}
          <div className="space-y-4 sm:space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg sm:text-xl"
            >
              <Mountain className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Acme Inc</span>
            </Link>

            <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
              We create beautiful, modern solutions that help teams work better
              and faster. Join thousands of satisfied customers worldwide.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3 sm:space-y-4">
              <Label
                htmlFor="newsletter"
                className="text-xs sm:text-sm font-medium"
              >
                Stay updated with our newsletter
              </Label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md">
                <Input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-background text-sm sm:text-base h-10 sm:h-11"
                />
                <Button className="whitespace-nowrap h-10 sm:h-11 text-sm sm:text-base">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe at any time
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-3 sm:space-y-4">
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-foreground/80">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Social Links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
                asChild
              >
                <Link href={social.href} aria-label={social.label}>
                  <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} YourBrand. All rights reserved.
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Made with ❤️ for the community</span>
          </div>

          {/* Additional Links */}
          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
