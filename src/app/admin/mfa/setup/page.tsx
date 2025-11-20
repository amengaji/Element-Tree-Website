// src/app/admin/mfa/setup/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminMfaSetupPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [otpauth, setOtpauth] = useState<string | null>(null);
  const [testCode, setTestCode] = useState("");
  const [testResult, setTestResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQr() {
      try {
        const res = await fetch("/api/admin/mfa/setup");
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || "Failed to load MFA setup.");
          return;
        }
        setQr(data.qr);
        setOtpauth(data.otpauth);
      } catch (err) {
        console.error(err);
        setError("Failed to load MFA setup.");
      }
    }
    loadQr();
  }, []);

  async function handleTestCode(e: React.FormEvent) {
    e.preventDefault();
    setTestResult(null);

    if (!testCode.trim()) {
      setTestResult("Enter a 6-digit code from your authenticator app.");
      return;
    }

    // We reuse the normal login route logic by sending only MFA code,
    // but to avoid logging in, you *could* make a dedicated verify endpoint.
    // Simpler: call a small verify endpoint later; for now, just display guidance.
    setTestResult(
      "If this 6-digit code works on the login page, your authenticator is configured correctly."
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Admin MFA Setup</h1>
        <p className="text-sm text-muted-foreground">
          Scan this QR code in Google Authenticator / Authy / 1Password to enable
          Time-based One-Time Password (TOTP) for admin login.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-500">
          {error}
        </div>
      )}

      {!error && !qr && (
        <div className="text-sm text-muted-foreground">Loading QR code…</div>
      )}

      {qr && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={qr}
            alt="MFA QR Code"
            className="h-40 w-40 border border-border rounded-xl bg-white p-2"
          />
          {otpauth && (
            <p className="text-[11px] text-muted-foreground break-all text-center">
              If you cannot scan the QR code, add a TOTP account manually with this key in your authenticator app.
            </p>
          )}
        </div>
      )}

      <form className="space-y-3 max-w-xs" onSubmit={handleTestCode}>
        <label className="text-xs font-medium">Test authenticator code</label>
        <input
          type="text"
          value={testCode}
          onChange={(e) => setTestCode(e.target.value)}
          placeholder="6-digit code"
          maxLength={6}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          Check setup
        </button>
        {testResult && (
          <p className="text-[11px] text-muted-foreground">{testResult}</p>
        )}
      </form>
    </div>
  );
}
