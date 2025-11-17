import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  LayoutList,
  FileBadge2,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learn LMS | Element Tree",
  description:
    "Learn LMS – Maritime-focused learning management with courses, quizzes, certificates and structured crew progress tracking.",
};

export default function LearnPage() {
  return (
    <div className="section">
      <div className="container space-y-14">
        {/* HERO */}
        <header className="grid gap-10 md:grid-cols-[1.6fr,1.2fr] items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-500">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Courses & Maritime LMS
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Learn LMS –{" "}
              <span className="text-gradient-emerald">
                built around how seafarers actually train.
              </span>
            </h1>

            <p className="max-w-xl text-sm text-muted-foreground">
              Deliver structured learning tailored to rank, vessel type and
              trade – instead of forcing everyone through the same generic
              portal.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Schedule a Learn LMS demo
              </Link>
              <Link href="/products/navigate" className="btn-outline">
                See how it links with Navigate
              </Link>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-soft-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="product-logo bg-sky-500/10 text-sky-500">
                    LL
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Element Tree
                    </p>
                    <p className="text-sm font-semibold">Learn LMS</p>
                  </div>
                </div>

                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-500">
                  Course Library
                </span>
              </div>

              <div className="mt-5 space-y-3 text-[11px] text-muted-foreground">
                <div className="rounded-2xl bg-muted px-3 py-2">
                  <p className="font-medium text-slate-700">
                    Mooring Operations – Risk & Control
                  </p>
                  <p>Type: Video · 3 modules · 1 assessment</p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 rounded-xl bg-background px-3 py-2 shadow-soft">
                    <p>Audience: Deck Crew</p>
                    <p>Status: 78% completed</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-background px-3 py-2 shadow-soft">
                    <p>Certificates: Enabled</p>
                    <p>Validity: 24 months</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-background px-3 py-2 shadow-soft">
                  <p className="font-medium text-slate-700">
                    Next session: 14 crew due for refresher
                  </p>
                  <p>Triggers reminders automatically via Zenith HRMS.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* FEATURES */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            A learning system aligned with rank, vessel and risk.
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <Layers className="mb-4 h-6 w-6 text-sky-500" />
              <h3 className="text-sm font-semibold">Rich learning paths</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Combine video, SCORM, PDFs, quizzes and assignments into clear
                learning sequences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <LayoutList className="mb-4 h-6 w-6 text-sky-500" />
              <h3 className="text-sm font-semibold">Rank & vessel catalogs</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Maintain separate learning catalogs for officers, ratings,
                shore-based staff, and clients.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <FileBadge2 className="mb-4 h-6 w-6 text-sky-500" />
              <h3 className="text-sm font-semibold">Certificates & validity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Auto-generate certificates with expiry tracking, renewal alerts
                and audit-friendly logs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <Users className="mb-4 h-6 w-6 text-sky-500" />
              <h3 className="text-sm font-semibold">Cohorts & classes</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Run batches, assign instructors, track live progress and collect
                runtime feedback.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-sky-500/40 bg-sky-500/8 p-8 text-sm shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
                Pair Learn with Navigate
              </p>

              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Use Learn LMS for structured training and Navigate for
                competency verification – seamlessly linked.
              </p>
            </div>

            <Link href="/contact" className="btn-primary">
              Talk about your training setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
