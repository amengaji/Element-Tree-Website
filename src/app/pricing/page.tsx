 // src/app/pricing/page.tsx
import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing | Element Tree",
  description:
    "Simple, scalable pricing for Navigate, Learn LMS, iCheck and Zenith HRMS. Start small and scale with your fleet or organization.",
};

const plans = [
  {
    name: "Starter",
    headline: "For small teams & centers",
    price: "Contact",
    unit: "per month",
    highlight: false,
    features: [
      "Access to any 1 core product",
      "Up to 100 active users",
      "Email support",
      "Basic reports",
    ],
  },
  {
    name: "Growth Suite",
    headline: "For growing organizations",
    price: "Contact",
    unit: "per month",
    highlight: true,
    features: [
      "Any 2 core products",
      "Up to 500 active users",
      "Priority support",
      "Custom onboarding",
      "API access (where available)",
    ],
  },
  {
    name: "Enterprise",
    headline: "For fleets & large enterprises",
    price: "Custom",
    unit: "per month",
    highlight: false,
    features: [
      "Full Element Tree suite",
      "Unlimited or high-volume users",
      "Dedicated success manager",
      "Custom SLAs",
      "Security & compliance reviews",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="section">
      <div className="container space-y-12">
        {/* Hero */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gradient-emerald">Pricing</h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            We structure pricing around active users, fleet size and products required –
            keeping it transparent and scalable as you grow.
          </p>
        </header>

        {/* Main pricing tiers */}
        <section className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlight ? "border-primary/70 bg-secondary/80" : ""}
            >
              <CardHeader>
                <CardTitle className="text-base">{plan.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{plan.headline}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <span className="text-2xl font-semibold">{plan.price}</span>
                  <span className="ml-1 text-xs text-muted-foreground">{plan.unit}</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild size="sm" className="w-full">
                  <a href="/contact">Talk to sales</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        {/* Zenith HRMS plans hint */}
        <section className="rounded-2xl border border-border bg-secondary/60 p-6 text-sm">
          <h2 className="text-lg font-semibold">Zenith HRMS plans</h2>
          <p className="mt-2 text-muted-foreground">
            Zenith HRMS supports feature-based plans – Free, Starter, Pro and Enterprise – with
            differences across attendance, leave, payroll and compliance capabilities.
          </p>
          <p className="mt-2 text-muted-foreground">
            If you&apos;re evaluating Zenith specifically, we&apos;ll walk you through a detailed
            feature-by-feature comparison and recommend a plan based on your company size,
            number of locations and compliance scope.
          </p>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="mt-4"
          >
            <a href="/products/zenith">View Zenith HRMS</a>
          </Button>
        </section>
      </div>
    </div>
  );
}

