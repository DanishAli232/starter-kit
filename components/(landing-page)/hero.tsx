// components/sections/Hero.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-24 md:py-32 flex flex-col items-center text-center gap-8">
      <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm">
        ✨ New 2.0 version is live
      </Badge>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
        Build your next idea even <span className="text-primary">faster</span>.
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl">
        Beautifully designed, expertly crafted components that follow best
        practices for accessibility and performance.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="gap-2">
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
        <Button size="lg" variant="outline">
          View Demo
        </Button>
      </div>

      {/* Optional: Dashboard Image */}
      <div className="mt-12 w-full max-w-5xl border rounded-xl shadow-2xl overflow-hidden">
        <img
          src="/dashboard-placeholder.png"
          alt="App Dashboard"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
