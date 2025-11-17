import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MonitorCheck,
  ShieldCheck,
  BarChart3,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Navigate | Element Tree",
  description:
    "Navigate – Maritime competency assessments with secure exams, proctoring, scoring logic and deep analytics.",
};

export default function NavigatePage() {
  return (
    <div className="section">
      <div className="container space-y-14">
        {/* HERO */}
        <header className="grid gap-10 md:grid-cols-[1.6fr,1.2fr] items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Assessments &amp; Proctoring
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Navigate –{" "}
              <span className="text-gradient-emerald">
                competency exams built for seafarers.
              </span>
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Move from generic online quizzes to structured, defensible
              assessments aligned with your training standards, customer
              requirements and internal matrices.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Request a Navigate demo
              </Link>
              <Link href="/products/learn" className="btn-outline">
                See how it links with Learn LMS
              </Link>
            </div>
          </div>

          {/* VISUAL / "IMAGE" */}
          <div className="relative">
            <div className="absolute -top-10 -right-6 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-soft-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="product-logo bg-emerald-500/10 text-emerald-500">
                    NV
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Element Tree
                    </p>
                    <p className="text-sm font-semibold">Navigate</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-500">
                  Competency Assessments
                </span>
              </div>

              <div className="mt-5 space-y-3 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between rounded-2xl bg-muted px-3 py-2">
                  <span>Deck Officer Level 2 – Cargo Handling</span>
                  <span className="text-emerald-500">Live</span>
                </div>
                <div className="rounded-2xl bg-background px-3 py-2 shadow-soft">
                  <p>Candidate: AB PETER IVANOV</p>
                  <p>Mode: Proctored · 45 mins · 30 questions</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-xl bg-emerald-500/10 px-3 py-2">
                    <p className="text-[10px] uppercase text-emerald-500">
                      First attempt
                    </p>
                    <p className="text-xs font-semibold text-emerald-600">
                      82% score
                    </p>
                  </div>
                  <div className="flex-1 rounded-xl bg-sky-500/10 px-3 py-2">
                    <p className="text-[10px] uppercase text-sky-500">
                      Areas to revisit
                    </p>
                    <p className="text-xs text-sky-700">
                      Cargo plan validation, enclosed space checks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* FEATURES GRID */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            Built for real-world maritime assessments.
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <MonitorCheck className="mb-4 h-6 w-6 text-emerald-500" />
              <h3 className="text-sm font-semibold">Secure exam flows</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Time windows, attempt limits, section rules, safe navigation and
                controlled movement between questions.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <ShieldCheck className="mb-4 h-6 w-6 text-emerald-500" />
              <h3 className="text-sm font-semibold">Proctoring choices</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Face capture, environment checks and screen monitoring –
                enabled only where the sensitivity justifies it.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <BarChart3 className="mb-4 h-6 w-6 text-emerald-500" />
              <h3 className="text-sm font-semibold">Smart scoring models</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                First/second attempt scoring, question weights, topic-wise
                analytics and pass/fail bands.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <Video className="mb-4 h-6 w-6 text-emerald-500" />
              <h3 className="text-sm font-semibold">Linked to training</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Map questions to videos and modules in Learn LMS so you know
                whether training is working.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-emerald-500/40 bg-emerald-500/8 p-8 text-sm shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                See Navigate with your own content
              </p>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Share a sample of your question bank or competency matrix and
                we’ll show you how it looks inside Navigate – from login, to
                exam, to analytics.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Talk to us about Navigate
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
