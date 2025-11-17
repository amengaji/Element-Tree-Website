// src/app/admin/layout.tsx
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-foreground">
      <header className="border-b border-border/60 bg-[#020617]/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-emerald-950">
              ET
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Element Tree Admin</span>
              <span className="text-[11px] text-muted-foreground">
                Careers & enquiries
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="container py-8 space-y-6">{children}</main>
    </div>
  );
}
