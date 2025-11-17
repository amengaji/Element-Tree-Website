// src/app/careers/page.tsx
import type { Metadata } from "next";
import CareersWizard from "./CareersWizard";

export const metadata: Metadata = {
  title: "Careers | Element Tree",
  description:
    "Join Element Tree across 3D & Animation, Software Engineering, Maritime training and operations, HR, marketing and more.",
};

export default function CareersPage() {
  return (
    <div className="section">
      <div className="container space-y-12">
        {/* HERO */}
        <header className="space-y-4">
          <p className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-400">
            We’re hiring across creative, engineering & maritime.
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Careers at{" "}
            <span className="text-gradient-emerald">Element Tree</span>
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Help build next-generation maritime training, HRMS and safety
            platforms — while working with a hybrid team of 3D artists, software
            engineers and marine specialists.
          </p>

          <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Offline only · Mumbai
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Teams: 3D & Animation · Software · Maritime · Ops
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Typical process: 15–30 days from application
            </div>
          </div>
        </header>

        {/* WIZARD */}
        <CareersWizard />

        {/* LIFE AT ELEMENT TREE */}
        <section className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 shadow-soft">
            <h2 className="text-sm font-semibold mb-2">
              Built around maritime & learning
            </h2>
            <p className="text-muted-foreground">
              You’ll work on real problems faced by seafarers, training centers
              and HR teams — not generic CRUD dashboards.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/80 p-5 shadow-soft">
            <h2 className="text-sm font-semibold mb-2">
              Hybrid, ownership-driven work
            </h2>
            <p className="text-muted-foreground">
              Small, senior-leaning team where designers, engineers and SMEs
              have direct product influence.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/80 p-5 shadow-soft">
            <h2 className="text-sm font-semibold mb-2">
              Craft, not just output
            </h2>
            <p className="text-muted-foreground">
              We care about quality — from 3D lighting and motion to API
              design, UX micro-interactions and documentation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
