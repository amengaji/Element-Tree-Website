import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  FileSpreadsheet,
  Clock,
  CreditCard,
  CalendarDays,
  ArrowRight,
  BarChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "HR & Payroll Automation | Element Tree",
  description:
    "Complete HR automation with attendance, payroll, compliance, and workforce management.",
};

export default function HRPayroll() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">
            HR & Payroll Automation Solutions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Streamline attendance, payroll, compliance, and employee lifecycle
            management with enterprise-grade digital workflows.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: Users,
            title: "Workforce Management",
            desc: "Centralized employee records, roles, documents and approvals.",
          },
          {
            icon: Clock,
            title: "Attendance Automation",
            desc: "Face recognition, geofenced punch-in, biometric sync, multi-shift & overtime rules.",
          },
          {
            icon: CalendarDays,
            title: "Leave Management",
            desc: "Custom leave types, accruals, carry forward, encashment and multi-level approvals.",
          },
          {
            icon: CreditCard,
            title: "Payroll Engine",
            desc: "Fully automated payroll with earnings, deductions, pro-rata, arrears, and revisions.",
          },
          {
            icon: FileSpreadsheet,
            title: "Compliance Built-In",
            desc: "PF, ESI, PT, LWF, TDS, bonus act, ECR, ESIC files and Form-16 automation.",
          },
          {
            icon: BarChart,
            title: "Analytics & Reports",
            desc: "Real-time dashboards, HR insights, attendance trends and compliance summaries.",
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
        <h2 className="text-3xl font-bold mb-4">Automate Your HR Processes</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Reduce workload, eliminate errors, and empower your HR teams.
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
