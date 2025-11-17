import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  Ship,
  GraduationCap,
  Video,
  Users,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Maritime Training | Element Tree",
  description:
    "Modern maritime training solutions including 3D safety modules, navigational training, and compliance education.",
};

export default function MaritimeTraining() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/40">
        <div className="absolute inset-0 bg-[url('/images/solutions/maritime-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="container relative py-28 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Maritime Training Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower seafarers with world-class training built using 3D
            animation, industry-approved standards, and realistic simulations.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: Ship,
            title: "Navigational Training",
            desc: "COLREGs, Bridge Resource Management, chartwork and advanced vessel handling modules.",
          },
          {
            icon: GraduationCap,
            title: "Skill Development",
            desc: "Onboard safety, emergency response, firefighting, enclosed space entry and more.",
          },
          {
            icon: Video,
            title: "3D Training Videos",
            desc: "High-fidelity 3D animation modules designed for better retention and clarity.",
          },
          {
            icon: Users,
            title: "Crew Competency",
            desc: "Structured upskilling programs for deck, engine, and ETO departments.",
          },
          {
            icon: BadgeCheck,
            title: "Compliance Ready",
            desc: "Training aligned with IMO, STCW, OCIMF, and ISGOTT standards.",
          },
          {
            icon: Anchor,
            title: "Industry Trusted",
            desc: "Built with real maritime experience by senior captains and marine specialists.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
          >
            <item.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Build a Competent & Safe Maritime Workforce
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform the way your crew learns with immersive and accurate
            maritime training experiences.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
