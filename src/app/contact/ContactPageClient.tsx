// src/app/contact/ContactPageClient.tsx
"use client";

import { useState } from "react";
import Script from "next/script";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";


type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  interest: string;
  message: string;
};

export default function ContactPageClient() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    interest: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    key: keyof FormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!RECAPTCHA_SITE_KEY) {
      setErrorMsg("reCAPTCHA is not configured. Please try again later.");
      return;
    }

    setSubmitting(true);

    try {
      const grecaptcha = (window as any).grecaptcha;
      if (!grecaptcha) {
        setErrorMsg("reCAPTCHA is not ready. Please refresh and try again.");
        setSubmitting(false);
        return;
      }

      grecaptcha.ready(async () => {
        try {
          const token: string = await grecaptcha.execute(
            RECAPTCHA_SITE_KEY,
            { action: "contact" }
          );

          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, recaptchaToken: token }),
          });

          const data = (await res.json()) as {
            success: boolean;
            error?: string;
          };

          if (!data.success) {
            setErrorMsg(
              data.error || "Something went wrong. Please try again."
            );
            setSubmitting(false);
            return;
          }

          // SUCCESS
          setSubmitting(false);
          setSuccessOpen(true);

          // Confetti
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });

          // Optional WhatsApp forward
        //   if (WHATSAPP_NUMBER) {
        //     const text = encodeURIComponent(
        //       `Hi, this is ${form.name}. I have just submitted a contact request from your website regarding: ${form.interest || "your solutions"}.`
        //     );
        //     window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
        //   }

          // Reset form
          setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            country: "",
            interest: "",
            message: "",
          });
        } catch (err) {
          console.error(err);
          setErrorMsg("Unexpected error. Please try again.");
          setSubmitting(false);
        }
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("Unexpected error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* reCAPTCHA v3 script */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      {/* Hero */}
      <header className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient-emerald">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          Tell us a bit about your fleet, training needs or HR/payroll setup –
          we’ll follow up to schedule a focused conversation.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-[1.3fr,0.9fr]">
        {/* Contact form */}
        <Card>
          <CardHeader>
            <CardTitle>Start a conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Full name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Work email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="+91 98xxxxxx"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="India, Singapore, UAE..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    What are you interested in?
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => handleChange("interest", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <option value="">Choose one</option>
                    <option>Navigate (Assessments & Proctoring)</option>
                    <option>Learn LMS (Maritime Training)</option>
                    <option>iCheck (Ship Inspections)</option>
                    <option>Zenith HRMS (HR & Payroll)</option>
                    <option>Safety 3D Training Modules</option>
                    <option>Cyber Safety Awareness</option>
                    <option>Multiple products / Full suite</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  placeholder="Share a quick overview of your requirements, fleet size or team size."
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500">{errorMsg}</p>
              )}

              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit enquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right side info – NO direct email printed */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>How we respond</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="text-xs font-semibold text-foreground">
                Response time
              </p>
              <p>Typically within 1–2 business days.</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground">
                What to include
              </p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Size of fleet / organization</li>
                <li>• Products or solutions you’re considering</li>
                <li>• Any regulatory or customer requirements</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground">
                Office address
              </p>
              <p>D-601, Raikar Chambers,</p>
              <p>off K.D. Marg, opposite Neelkanth Gardens,</p>
              <p>Govandi (East), Mumbai - 400 088,</p>
              <p>Maharashtra, India</p>
            </div>

            <div className="text-xs text-muted-foreground/80">
              We keep your email and phone details private and use them only to
              follow up on your enquiry. Automated spam and repeated submissions
              are filtered.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Simple success overlay */}
      {successOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setSuccessOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2">
              Thank you for reaching out
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your enquiry has been received. We&apos;ll review it and get back
              to you shortly.
            </p>
            <Button
              size="sm"
              className="mt-1"
              onClick={() => setSuccessOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
