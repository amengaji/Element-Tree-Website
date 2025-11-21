import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  WifiOff,
  Camera,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "iCheck | Element Tree",
  description:
    "iCheck – Digital ship inspections with SIRE 2.0 and RISQ templates, offline mode, evidence capture and automated reports.",
};

export default function ICheckPage() {
  return (
    <div className="section">
      <div className="container space-y-14">
        {/* HERO */}
        <header className="grid gap-10 md:grid-cols-[1.6fr,1.2fr] items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3194A0]/10 px-4 py-1.5 text-xs font-semibold text-[#3194A0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3194A0]" />
              Ship Inspections &amp; Audits
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              iCheck –{" "}
              <span className="text-gradient-emerald">
                digital inspections without losing nuance.
              </span>
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Use structured, template-driven inspections while still capturing
              the real story with photos, observations and rectification notes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                See a sample iCheck report
              </Link>
              <Link href="/solutions/inspections" className="btn-outline">
                Explore inspection solution
              </Link>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#3194A0]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-soft-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="product-logo bg-[#3194A0]/10 text-[#3194A0]">
                    IC
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Element Tree
                    </p>
                    <p className="text-sm font-semibold">iCheck</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#3194A0]/10 px-3 py-1 text-[11px] font-medium text-[#3194A0]">
                  Vessel inspection
                </span>
              </div>

              <div className="mt-5 space-y-3 text-[11px] text-muted-foreground">
                <div className="rounded-2xl bg-muted px-3 py-2">
                  <p className="font-medium text-slate-700">
                    SIRE 2.0 – Loaded passage
                  </p>
                  <p>Vessel: MT OCEAN VISTA · Port: Singapore</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-xl bg-background px-3 py-2 shadow-soft">
                    <p>Questions completed: 132 / 165</p>
                    <p>Findings: 3 observations · 1 NC</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-background px-3 py-2 shadow-soft">
                    <p>Offline sync: queued</p>
                    <p>Last sync: 18 mins ago</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-background px-3 py-2 shadow-soft">
                  <p className="font-medium text-slate-700">
                    Next action: Rectification review with superintendent
                  </p>
                  <p>Attachments, photos and notes already bundled in PDF.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* FEATURES */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            From template to finished report in one flow.
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <ClipboardList className="mb-4 h-6 w-6 text-[#3194A0]" />
              <h3 className="text-sm font-semibold">
                SIRE, RISQ &amp; internal templates
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use ready-made industry templates, then extend them with your
                own questions and scoring logic.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <WifiOff className="mb-4 h-6 w-6 text-[#3194A0]" />
              <h3 className="text-sm font-semibold">Offline-first mindset</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Run full inspections without signal. Sync back automatically
                when a connection is available.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <Camera className="mb-4 h-6 w-6 text-[#3194A0]" />
              <h3 className="text-sm font-semibold">Evidence, not just ticks</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Attach photos, videos, rectification notes and human
                observations at question level.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
              <FileText className="mb-4 h-6 w-6 text-[#3194A0]" />
              <h3 className="text-sm font-semibold">Instant, clean reporting</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate formatted PDFs with vessel details, sections, findings
                and rectification status in a click.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#3194A0]/40 bg-[#3194A0]/8 p-8 text-sm shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3194A0]">
                Bring your current forms
              </p>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Share a recent inspection form or report and we&apos;ll map it
                into iCheck to show you exactly how it would look and behave.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Start with a sample vessel
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
