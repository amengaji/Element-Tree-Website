// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Mail, Inbox, Eye, Archive, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    archived: 0,
  });

  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        return;
      }

      const rows = data.data;

      setStats({
        total: rows.length,
        new: rows.filter((e: any) => (e.status || "new") === "new").length,
        read: rows.filter((e: any) => e.status === "read").length,
        archived: rows.filter((e: any) => e.status === "archived").length,
      });

      setRecent(rows.slice(0, 4)); // Show latest 4 enquiries
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen py-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of website enquiries & admin actions.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-6 md:grid-cols-4">
        <DashboardCard
          label="Total Enquiries"
          icon={<Inbox className="h-5 w-5 text-primary" />}
          value={stats.total}
        />
        <DashboardCard
          label="New"
          icon={<Mail className="h-5 w-5 text-primary" />}
          value={stats.new}
        />
        <DashboardCard
          label="Read"
          icon={<Eye className="h-5 w-5 text-primary" />}
          value={stats.read}
        />
        <DashboardCard
          label="Archived"
          icon={<Archive className="h-5 w-5 text-primary" />}
          value={stats.archived}
        />
      </div>

      {/* RECENT ENQUIRIES */}
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <h2 className="text-sm font-semibold">Recent Enquiries</h2>
          <button
            onClick={loadDashboard}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No enquiries yet.
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {recent.map((e) => (
              <li key={e.id} className="p-5 hover:bg-muted/40 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{e.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.email}
                    </p>
                  </div>
                  <span
                    className="text-[10px] px-2 py-1 rounded-full"
                    style={{
                      background:
                        e.status === "archived"
                          ? "rgba(148,163,184,0.15)"
                          : e.status === "read"
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(251,191,36,0.2)",
                    }}
                  >
                    {e.status || "new"}
                  </span>
                </div>

                <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">
                  {e.message}
                </p>

                <div className="mt-3 flex justify-end">
                  <a
                    href="/admin/enquiries"
                    className="text-xs text-primary hover:underline"
                  >
                    View all →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function DashboardCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: any;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-soft hover:shadow-soft-lg transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
