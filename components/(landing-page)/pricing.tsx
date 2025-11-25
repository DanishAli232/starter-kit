// components/sections/Pricing.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      desc: "For hobbyists and side projects.",
      price: billing === "monthly" ? "$0" : "$0",
      features: ["Up to 3 projects", "Community Support", "1GB Storage"],
      btnText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      desc: "For growing teams and startups.",
      price: billing === "monthly" ? "$29" : "$290",
      features: [
        "Unlimited projects",
        "Priority Support",
        "50GB Storage",
        "Analytics",
      ],
      btnText: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "For large scale organizations.",
      price: "Custom",
      features: [
        "Unlimited Everything",
        "24/7 Support",
        "SSO & Security",
        "Custom Contract",
      ],
      btnText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container flex flex-col items-center gap-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground">
            Choose the plan that's right for you.
          </p>
        </div>

        {/* Billing Toggle */}
        <Tabs
          defaultValue="monthly"
          className="w-full max-w-[400px]"
          onValueChange={setBilling}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.popular ? "border-primary shadow-lg relative" : ""
              }
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg font-normal text-muted-foreground">
                      /mo
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.btnText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
