import type { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  Camera,
  Brain,
  Film,
  HardHat,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Safety 3D Training Modules | Element Tree",
  description:
    "High-quality 3D animated safety training modules for maritime, oil & gas, and industrial environments.",
};

export default function Safety3D() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-28 bg-gradient-to-b from-background to-muted/40 text-center">
        <h1 className="text-4xl font-bold mb-4">Safety 3D Training Modules</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Immersive 3D training animations designed to improve safety awareness,
          operational readiness, and emergency preparedness.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: Box,
            title: "High-Fidelity 3D Visuals",
            desc: "Realistic 3D models and environments based on actual ship systems and industrial equipment.",
          },
          {
            icon: Camera,
            title: "Cinematic Animations",
            desc: "Professionally directed shots that simplify complex procedures visually.",
          },
          {
            icon: Brain,
            title: "Behavior-Based Safety",
            desc: "Covers human factors, situational awareness, and risk comprehension.",
          },
          {
            icon: Film,
            title: "Complete Training Videos",
            desc: "From enclosed space entry to mooring, bunkering, navigation & more.",
          },
          {
            icon: HardHat,
            title: "Compliance-Ready",
            desc: "Aligned with IMO, ISGOTT, OCIMF, COLREGS, and industry best practices.",
          },
          {
            icon: ArrowRight,
            title: "Custom Animations",
            desc: "We develop tailor-made 3D modules for company-specific SOPs & training needs.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border bg-card hover:shadow-lg transition"
          >
            <item.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5 text-center">
        <h2 className="text-3xl font-bold mb-4">Bring Your Training to Life</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Modern, engaging, and visually rich 3D safety animations that improve
          learning outcomes.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          Contact Us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
