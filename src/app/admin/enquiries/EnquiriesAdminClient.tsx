// src/app/admin/enquiries/EnquiriesAdminClient.tsx
"use client";

import { useEffect, useState } from "react";
import { Mail, Search, Filter, AlertTriangle, CheckCircle2 } from "lucide-react";

type Enquiry = {
  id: string;
  fullName: string;
  email: string;
  company: string;
  country: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function EnquiriesAdminClient() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filtered, setFiltered] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "read" | "archived">("all");

  async function fetchEnquiries() {
    try {
      setLoading(true);
      setLoadError("");

      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();

      if (!res.ok || !data.success) {
        setLoadError(data.error || "Failed to load enquiries.");
        setLoading(false);
        return;
      }

      setEnquiries(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadError("Failed to load enquiries.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    let items = [...enquiries];

    if (statusFilter !== "all") {
      items = items.filter((e) => (e.status || "new") === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (e) =>
          e.fullName.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          (e.company || "").toLowerCase().includes(q) ||
          (e.interest || "").toLowerCase().includes(q) ||
          (e.message || "").toLowerCase().includes(q)
      );
    }

    setFiltered(items);
  }, [enquiries, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Website Enquiries
          </h1>
          <p className="text-sm text-muted-foreground">
            All messages submitted via the public contact form.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchEnquiries}
          className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted/60 transition"
        >
          Refresh
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by name, email, company, interest or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-border bg-background pl-9 pr-3 py-2 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-full border border-border bg-background px-3 py-2 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <option value="all">All statuses</option>
            <option value="new">New only</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          Loading enquiries…
        </div>
      ) : loadError ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/5 px-4 py-3 text-xs text-red-600">
          <AlertTriangle className="h-4 w-4" />
          {loadError}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <p>No enquiries found yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-soft">
          <table className="min-w-full text-xs">
            <thead className="bg-muted/60">
              <tr className="text-left">
                <th className="px-4 py-2 font-medium">When</th>
                <th className="px-4 py-2 font-medium">Person</th>
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">Interest</th>
                <th className="px-4 py-2 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  className="border-t border-border/60 hover:bg-muted/40 transition"
                >
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-0.5">
                      <span>
                        {new Date(e.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(e.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{e.fullName}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {e.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-[11px]">
                    <div className="flex flex-col gap-0.5">
                      <span>{e.company || "—"}</span>
                      <span className="text-muted-foreground">
                        {e.country || ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-[11px]">
                    {e.interest || "—"}
                  </td>
                  <td className="px-4 py-3 align-top text-[11px] max-w-xs">
                    <p className="line-clamp-4 whitespace-pre-line">
                      {e.message}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
