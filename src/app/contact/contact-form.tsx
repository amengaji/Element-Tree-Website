"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    product: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // INPUT HANDLER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ reCAPTCHA v3 token
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );

      // 2️⃣ Submit to API route
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...form, token }),
      });

      if (!res.ok) throw new Error("Failed");

      // 3️⃣ Show success
      setSuccess(true);
      confetti({ particleCount: 120, spread: 80 });
      
      // 4️⃣ WhatsApp auto-forward
      setTimeout(() => {
        window.open(
          `https://wa.me/919920603686?text=Hello%20Element%20Tree!%20I%20submitted%20an%20enquiry.`,
          "_blank"
        );
      }, 800);

      // Reset form
      setForm({
        name: "",
        email: "",
        company: "",
        country: "",
        product: "",
        message: "",
      });

    } catch (err) {
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <section className="grid gap-10 md:grid-cols-[1.3fr,0.9fr]">
      
      {/* FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Start a conversation</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">

            {/* Inputs */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Work email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Company" name="company" value={form.company} onChange={handleChange} />
              <Input label="Country" name="country" value={form.country} onChange={handleChange} />
            </div>

            <Select
              label="Interested in?"
              name="product"
              value={form.product}
              onChange={handleChange}
            >
              <option>Navigate (Assessments & Proctoring)</option>
              <option>Learn LMS</option>
              <option>iCheck (Inspections)</option>
              <option>Zenith HRMS</option>
              <option>Safety 3D Modules</option>
              <option>Cyber Safety Awareness</option>
              <option>Full Suite</option>
            </Select>

            <Textarea
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
            />

            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Submitting..." : "Submit enquiry"}
            </Button>
          </form>

          {success && (
            <div className="mt-4 rounded-lg bg-green-100 p-3 text-green-700 text-center text-sm font-medium animate-in fade-in">
              Thank you! We’ll get back to you shortly.
            </div>
          )}
        </CardContent>
      </Card>

      {/* DETAILS */}
      <Card>
        <CardHeader><CardTitle>Direct contact</CardTitle></CardHeader>

        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="text-xs font-semibold text-foreground">Email</p>
            <p>queries@elementree.co.in</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground">Office</p>
            <p>D-601, Raikar Chambers</p>
            <p>Govandi (East), Mumbai – 400 088</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground">Typical response</p>
            <p>Within 1–2 business days</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* REUSABLE INPUT COMPONENTS */
function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
      />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
      />
    </div>
  );
}

function Select({ label, children, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium">{label}</label>
      <select
        {...props}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
      >
        <option value="" disabled>Select one</option>
        {children}
      </select>
    </div>
  );
}
