import type { Metadata } from "next";
import Link from "next/link";
import {
  Webcam,
  Eye,
  Timer,
  BookOpen,
  UserCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online Exams & Proctoring | Element Tree",
  description:
    "Secure online exam platform with live proctoring, AI monitoring, and automated test workflows.",
};

export default function ExamsProctoring() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-28 bg-gradient-to-b from-background to-muted/40 text-center">
        <h1 className="text-4xl font-bold mb-4">Online Exams & Proctoring</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conduct secure, scalable exams with camera proctoring, activity
          tracking, and automated grading.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: Webcam,
            title: "Live Proctoring",
            desc: "Monitor candidates through webcam streams with event logging.",
          },
          {
            icon: Eye,
            title: "AI Monitoring",
            desc: "Detect suspicious movements, multiple faces, device changes and anomalies.",
          },
          {
            icon: Timer,
            title: "Timed Assessments",
            desc: "Auto-submit, warnings, resuming rules and attempt restrictions.",
          },
          {
            icon: BookOpen,
            title: "Question Banks",
            desc: "MCQ, MCA, True/False, video assessments, difficulty levels and randomization.",
          },
          {
            icon: UserCheck,
            title: "User Validation",
            desc: "Face verification, ID matching and secure login restrictions.",
          },
          {
            icon: ArrowRight,
            title: "Instant Results",
            desc: "Auto-scoring, analytics, performance summary and certification.",
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
        <h2 className="text-3xl font-bold mb-4">Secure and Scalable Testing</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Reliable digital assessments for maritime and corporate training.
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
