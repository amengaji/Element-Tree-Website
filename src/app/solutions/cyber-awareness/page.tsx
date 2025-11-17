import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  KeyRound,
  WifiOff,
  FileWarning,
  Lock,
  Video,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cyber Safety Awareness | Element Tree",
  description:
    "Cyber safety awareness training for maritime and corporate environments.",
};

export default function CyberAwareness() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background text-center">
        {/* BACKGROUND ORBS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 h-72 w-72 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-20 -right-10 h-72 w-72 bg-blue-500/20 blur-[120px] rounded-full animate-[pulse_6s_ease_infinite]" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Cyber Safety Awareness
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empower your workforce to recognize cyber threats, adopt secure
          digital habits, and maintain safety across maritime and corporate
          operations.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container py-24 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: ShieldCheck,
            title: "Cyber Risk Awareness",
            desc: "Training on common vulnerabilities, malware, and real-world threat patterns seen in modern cyber attacks.",
          },
          {
            icon: KeyRound,
            title: "Password & Identity Security",
            desc: "Strong authentication practices, MFA, identity protection, and credential hygiene.",
          },
          {
            icon: FileWarning,
            title: "Phishing & Social Engineering",
            desc: "Detect fake websites, malicious attachments, spoofed emails, and social manipulation tactics.",
          },
          {
            icon: WifiOff,
            title: "Network & Device Safety",
            desc: "Safe Wi-Fi practices, device protection, secure browsing, public hotspot dangers and more.",
          },
          {
            icon: Lock,
            title: "Data Privacy & Protection",
            desc: "Safe handling of sensitive information with GDPR-aligned best practices.",
          },
          {
            icon: Video,
            title: "Awareness Training Videos",
            desc: "Short, engaging modules designed for seafarers and office teams to learn quickly and effectively.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group p-8 rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <item.icon className="h-10 w-10 text-primary mb-4 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-28 bg-gradient-to-r from-primary/10 to-blue-500/10 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Strengthen Your Cyber Readiness
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Protect your teams from phishing, malware, and cyber intrusions with
          our comprehensive cyber safety awareness programs.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          Contact Us
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
