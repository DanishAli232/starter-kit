"use client";

// components/sections/Hero.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  const router = useRouter();
  const { userProfile } = useAuth();
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 flex flex-col items-center text-center gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
      <Badge
        variant="secondary"
        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        ✨ New 2.0 version is live
      </Badge>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight sm:leading-tight">
        Build your next idea even <span className="text-primary">faster</span>.
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-4 sm:px-0 leading-relaxed">
        Beautifully designed, expertly crafted components that follow best
        practices for accessibility and performance.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
        <Button
          onClick={() =>
            userProfile
              ? router.push("/dashboard")
              : router.push("/auth/signup")
          }
          size="lg"
          className="gap-2 w-full sm:w-auto text-sm sm:text-base"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          View Demo
        </Button>
      </div>
    </section>
  );
}
