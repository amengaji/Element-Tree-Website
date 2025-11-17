"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ContactForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify you're not a robot.");
      return;
    }

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    setLoading(true);

    const res = await fetch("/api/contact-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, captcha: captchaToken }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);

      confetti({
        angle: 90,
        spread: 70,
        particleCount: 120,
        origin: { y: 0.6 },
      });

      // Optional WhatsApp auto-forward
      setTimeout(() => {
        window.open(
          `https://wa.me/919619432478?text=Hello, I just submitted an enquiry on your website.`,
          "_blank"
        );
      }, 800);
    } else {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <div className="space-y-12">
      {/* HERO */}
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-gradient-emerald">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          Tell us about your fleet, training goals, HR or inspection needs —
          we’ll get back within 1–2 business days.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-[1.3fr,0.9fr]">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Start a conversation</CardTitle>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold mb-3">Thank you!</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Your enquiry has been submitted. Our team will reach out soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Full name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Work email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">
                      Company / Organization
                    </label>
                    <input
                      required
                      name="company"
                      type="text"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                      placeholder="Company name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Country</label>
                    <input
                      required
                      name="country"
                      type="text"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                      placeholder="India, Singapore, UAE..."
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    What are you interested in?
                  </label>
                  <select
                    name="interest"
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose one or more areas
                    </option>
                    <option>Navigate (Assessments)</option>
                    <option>Learn LMS</option>
                    <option>iCheck (Inspections)</option>
                    <option>Zenith HRMS</option>
                    <option>Safety 3D Modules</option>
                    <option>Cyber Safety Awareness</option>
                    <option>Multiple Products</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Message</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    placeholder="Share basic requirements or questions..."
                  />
                </div>

                {/* reCAPTCHA */}
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={(token) => setCaptchaToken(token)}
                  className="mt-3"
                />

                <Button type="submit" size="sm" disabled={loading}>
                  {loading ? "Submitting..." : "Submit enquiry"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <Card>
          <CardHeader>
            <CardTitle>Direct contact</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              We do not expose our email publicly — all messages are processed
              securely via our backend.
            </p>

            <div>
              <p className="text-xs font-semibold text-foreground">Address</p>
              <p>D-601, Raikar Chambers</p>
              <p>Govandi (East), Mumbai - 400 088</p>
              <p>Maharashtra, India</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground">
                Typical response time
              </p>
              <p>Within 1–2 business days.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
