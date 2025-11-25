// components/sections/Features.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-10 h-10 text-primary mb-4" />,
    title: "Lightning Fast",
    description:
      "Built on Next.js 14 for optimal performance and SEO out of the box.",
  },
  {
    icon: <Shield className="w-10 h-10 text-primary mb-4" />,
    title: "Secure by Default",
    description:
      "Enterprise-grade security features included to keep your data safe.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary mb-4" />,
    title: "Mobile First",
    description:
      "Responsive design that looks great on any device, from phone to desktop.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground">
            All the essential tools to help you grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardHeader>
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
