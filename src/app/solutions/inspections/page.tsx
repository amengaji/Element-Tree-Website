import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  Camera,
  FileText,
  Shield,
  Workflow,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Ship Inspections | Element Tree",
  description:
    "Modern digital inspection tools for SIRE, RISQ, marine audits and vessel safety checks.",
};

export default function Inspections() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-28 bg-gradient-to-b from-background to-muted/40 text-center">
        <h1 className="text-4xl font-bold mb-4">Digital Ship Inspections</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conduct inspections digitally with real-time syncing, evidence
          capture, and automated reporting for SIRE, RISQ and onboard audits.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: ClipboardCheck,
            title: "Digital Checklist Engine",
            desc: "Pre-designed templates for SIRE, RISQ, safety rounds and maintenance audits.",
          },
          {
            icon: Camera,
            title: "Evidence Capture",
            desc: "Real-time photos, attachments, remarks, human factors and location tagging.",
          },
          {
            icon: FileText,
            title: "Auto-Generated Reports",
            desc: "PDF and digital reports generated instantly with observations and NCRs.",
          },
          {
            icon: Shield,
            title: "Security & Traceability",
            desc: "Tracking, timestamps, reviewer signatures and secure record storage.",
          },
          {
            icon: Workflow,
            title: "Review Workflow",
            desc: "Multi-level review, approving authorities and corrective action plans.",
          },
          {
            icon: ArrowRight,
            title: "Offline Sync",
            desc: "Works offshore without internet — syncs automatically when reconnected.",
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
        <h2 className="text-3xl font-bold mb-4">
          Transform Your Vessel Inspections
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Move from paper-based to digital audits with unmatched efficiency.
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
