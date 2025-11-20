"use client";

import { useState } from "react";

export default function BackupCodesPage() {
  const [codes, setCodes] = useState<string[] | null>(null);
  const [error, setError] = useState("");

  async function generate() {
    setError("");
    const res = await fetch("/api/admin/mfa/backup/generate", {
      method: "POST",
    });
    const data = await res.json();

    if (!data.success) {
      setError("Failed to generate backup codes.");
      return;
    }
    setCodes(data.codes);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Backup Codes</h1>
      <p className="text-sm text-muted-foreground">
        Use backup codes if your authenticator app is unavailable.
        Each code can only be used once.
      </p>

      <button
        onClick={generate}
        className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Generate New Backup Codes
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {codes && (
        <div className="mt-4 p-4 border border-border rounded-xl bg-muted">
          <p className="text-sm font-semibold">Backup Codes:</p>
          <ul className="mt-2 space-y-1 text-sm">
            {codes.map((c) => (
              <li key={c} className="font-mono">{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
