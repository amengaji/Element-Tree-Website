import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Users,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* HERO */}
      <section className="section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-400/80 via-emerald-400/0 to-transparent animate-pulse-soft" />

        <div className="container animate-fade-up">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-[#3194A0]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Digital infrastructure for maritime & workforce operations
            </span>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Training, inspections, HR & safety — <br />
              <span className="text-gradient-emerald">
                connected under Element Tree.
              </span>
            </h1>

            <p className="text-sm text-muted-foreground md:text-base">
              Navigate, Learn LMS, iCheck and Zenith HRMS work together to
              digitize crew competency, ship inspections, workforce management
              and compliance — with immersive 3D safety and cyber awareness.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link href="/products/navigate" className="btn-primary">
                Explore products
              </Link>
              <Link href="/solutions/maritime-training" className="btn-outline">
                View solutions
              </Link>
            </div>

            <p className="pt-1 text-[11px] text-muted-foreground/80">
              Built for maritime operators, training centers and HR teams.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SUITE */}
      <section className="section">
        <div className="container space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3194A0]">
                The Element Tree suite
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Four products, one connected workflow.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Train crew, assess competency, inspect vessels and run payroll
                in one ecosystem – instead of stitching together separate tools.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Navigate */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">Navigate</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Competency assessments with secure exams, proctoring &
                    analytics.
                  </p>
                </div>
                <Compass className="h-6 w-6 text-[#3194A0]" />
              </div>
              <Link
                href="/products/navigate"
                className="mt-4 inline-flex items-center text-[11px] font-medium text-[#3194A0]"
              >
                View product
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Learn LMS */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">Learn LMS</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Maritime-focused LMS with courses, quizzes, certificates &
                    tracking.
                  </p>
                </div>
                <BookOpen className="h-6 w-6 text-sky-400" />
              </div>
              <Link
                href="/products/learn"
                className="mt-4 inline-flex items-center text-[11px] font-medium text-sky-400"
              >
                View product
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* iCheck */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">iCheck</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Digital ship inspections for SIRE 2.0, RISQ & internal
                    audits.
                  </p>
                </div>
                <ClipboardCheck className="h-6 w-6 text-indigo-400" />
              </div>
              <Link
                href="/products/icheck"
                className="mt-4 inline-flex items-center text-[11px] font-medium text-indigo-400"
              >
                View product
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Zenith HRMS */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">Zenith HRMS</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    HR, attendance, payroll and Indian statutory compliance
                    automation.
                  </p>
                </div>
                <Users className="h-6 w-6 text-rose-400" />
              </div>
              <Link
                href="/products/zenith"
                className="mt-4 inline-flex items-center text-[11px] font-medium text-rose-400"
              >
                View product
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="section">
        <div className="container space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold">A live workflow, end to end.</h2>
            <p className="text-sm text-muted-foreground">
              Instead of juggling spreadsheets and disconnected systems, Element
              Tree gives you one continuous trail – from training, to
              assessment, to inspection, to HR & payroll.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.4fr,1fr]">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-6 shadow-soft-lg">
              <ol className="space-y-4 text-sm">
                <li>
                  <span className="font-semibold text-[#3194A0]">1.</span>{" "}
                  Create or import training in{" "}
                  <span className="font-medium">Learn LMS</span>.
                </li>
                <li>
                  <span className="font-semibold text-[#3194A0]">2.</span>{" "}
                  Run secure assessments in{" "}
                  <span className="font-medium">Navigate</span> with
                  proctoring.
                </li>
                <li>
                  <span className="font-semibold text-[#3194A0]">3.</span>{" "}
                  Conduct digital ship inspections in{" "}
                  <span className="font-medium">iCheck</span> with offline
                  mode.
                </li>
                <li>
                  <span className="font-semibold text-[#3194A0]">4.</span>{" "}
                  Sync crew records, attendance & payroll via{" "}
                  <span className="font-medium">Zenith HRMS</span>.
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-border/60 bg-secondary/60 p-6 text-sm shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3194A0]">
                Why this matters
              </p>
              <p className="mt-3 text-muted-foreground">
                You reduce double entry, keep records audit-ready and give each
                department exactly what they need – without forcing them into a
                generic ERP.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                And because the stack is built specifically around maritime and
                Indian HR/payroll, you get domain detail baked into every
                screen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
