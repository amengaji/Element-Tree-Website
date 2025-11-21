// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, mfaCode, rememberDevice }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md border border-border/70 bg-background/95">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Admin sign in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-xs text-muted-foreground">
            Use the admin email, password and 6-digit MFA code you configured in
            <code className="mx-1 rounded bg-muted px-1 py-0.5 text-[10px]">
              .env.local
            </code>
            .
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus-visible:ring-1 focus-visible:ring-[#3194A0]"
                placeholder="admin@elementree.co.in"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus-visible:ring-1 focus-visible:ring-[#3194A0]"
                placeholder="Your admin password"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">MFA code</label>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                maxLength={6}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus-visible:ring-1 focus-visible:ring-[#3194A0]"
                placeholder="6-digit code"
              />
            </div>

            {error && (
              <p className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-500/40 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex items-center gap-2">
              <input
                id="rememberDevice"
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="h-3 w-3"
              />
              <label htmlFor="rememberDevice" className="text-[11px] text-muted-foreground">
                Trust this device for 24 hours
              </label>
            </div>
  
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="w-full rounded-full bg-[#3194A0] text-xs font-semibold hover:bg-[#3194A0]"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
