import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Banknote,
  MapPinned,
  Users,
  Layers,
  LineChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Zenith HRMS | Element Tree",
  description:
    "Modern cloud HRMS including Attendance, Leave, Payroll, Compliance, Employee Self-Service, Reports, and more.",
};

export default function ZenithPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Zenith HRMS
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A complete Human Resource Management System designed for modern
              companies. Automate attendance, leave, payroll, compliance, and
              employee workflows with powerful analytics.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold shadow hover:-translate-y-[1px] transition"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-semibold mb-10">Core Modules</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Employee Management */}
            <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition">
              <BadgeCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Employee Management
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Manage employee profiles, departments, KYC documents, roles, and
                access levels with ease.
              </p>
            </div>

            {/* Attendance */}
            <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition">
              <CalendarClock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Attendance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Multi-shift tracking, geo punch, face ID, overtime rules,
                real-time sync, and approval workflows.
              </p>
            </div>

            {/* Payroll */}
            <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition">
              <Banknote className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Payroll</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Complete payroll engine with earnings/deductions, pro-rata,
                arrears, and automated salary slip generation.
              </p>
            </div>

            {/* Leave */}
            <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition">
              <MapPinned className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Leave</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leave policies, accruals, carry-forward, encashment, calendars,
                and multi-level approvals.
              </p>
            </div>

            {/* People Analytics */}
            <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition">
              <LineChart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">People Analytics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Dashboard insights for attendance, payroll, departments, and
                employee performance.
              </p>
            </div>

            {/* ESS */}
            <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg transition">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Employee Self-Service
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Employees can request leave, view payslips, update profiles,
                submit claims, and track attendance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/40">
        <div className="container text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to modernize HR?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let our team walk you through Zenith HRMS.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow hover:-translate-y-[2px] transition"
          >
            Book a Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
