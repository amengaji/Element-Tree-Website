// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Enquiry = {
  _id: string;
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  message?: string;
  createdAt?: string;
};

type CareerOpening = {
  _id: string;
  title: string;
  departmentKey: string;
  departmentName?: string;
  location?: string;
  type?: string;
  summary?: string;
  isActive?: boolean;
  createdAt?: string;
};

type Application = {
  _id: string;
  departmentKey?: string;
  roleKey?: string;
  basicInfo?: any;
  createdAt?: string;
};

const DEPT_OPTIONS = [
  { key: "3d-animation", label: "3D & Animation" },
  { key: "software", label: "Software Engineering" },
  { key: "accounts", label: "Accounts & Finance" },
  { key: "hr", label: "Human Resources" },
  { key: "admin-ops", label: "Admin & Operations" },
  { key: "marketing", label: "Marketing & Branding" },
  { key: "maritime", label: "Maritime & Training" },
  { key: "instructional", label: "Instructional Design" },
  { key: "sales-bd", label: "Sales & Business Dev" },
  { key: "support", label: "Support & Admin" },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<"enquiries" | "careers" | "applications">(
    "enquiries",
  );

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [careers, setCareers] = useState<CareerOpening[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // New career form
  const [newCareer, setNewCareer] = useState({
    title: "",
    departmentKey: "",
    location: "",
    type: "",
    summary: "",
    isActive: true,
  });

  useEffect(() => {
    loadCurrentTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function loadCurrentTab() {
    setError("");
    setLoading(true);
    try {
      if (tab === "enquiries") {
        const res = await fetch("/api/admin/enquiries");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load enquiries");
        setEnquiries(data.enquiries || []);
      } else if (tab === "careers") {
        const res = await fetch("/api/admin/careers");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load careers");
        setCareers(data.careers || []);
      } else {
        const res = await fetch("/api/admin/applications");
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to load applications");
        setApplications(data.applications || []);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function handleCreateCareer(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        ...newCareer,
        departmentName:
          DEPT_OPTIONS.find((d) => d.key === newCareer.departmentKey)?.label ??
          "",
      };
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create opening");
      setNewCareer({
        title: "",
        departmentKey: "",
        location: "",
        type: "",
        summary: "",
        isActive: true,
      });
      await loadCurrentTab();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function toggleCareerActive(c: CareerOpening) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/careers/${c._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !c.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update opening");
      await loadCurrentTab();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCareer(id: string) {
    if (!window.confirm("Delete this opening? This cannot be undone.")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete opening");
      await loadCurrentTab();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-base md:text-lg font-semibold">
            Careers & enquiries admin
          </h1>
          <p className="text-xs text-muted-foreground">
            View contact enquiries, manage career openings and see applicants.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleLogout}
          className="rounded-full border-border/70 bg-background/80 text-xs"
        >
          Log out
        </Button>
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-full border border-border/70 bg-background/80 p-1 text-[11px]">
        {[
          { key: "enquiries", label: "Enquiries" },
          { key: "careers", label: "Career openings" },
          { key: "applications", label: "Applications" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() =>
              setTab(t.key as "enquiries" | "careers" | "applications")
            }
            className={`px-3 py-1.5 rounded-full transition ${
              tab === t.key
                ? "bg-emerald-500 text-emerald-950 font-semibold"
                : "text-muted-foreground hover:bg-muted/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-500/40 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {tab === "enquiries" && (
        <Card className="border border-border/70 bg-background/90">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Latest enquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {loading && <p>Loading enquiries…</p>}
            {!loading && enquiries.length === 0 && (
              <p className="text-muted-foreground text-xs">
                No enquiries yet.
              </p>
            )}
            {!loading && enquiries.length > 0 && (
              <div className="space-y-2">
                {enquiries.map((q) => (
                  <div
                    key={q._id}
                    className="rounded-lg border border-border/60 bg-background/80 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-medium">
                        {q.name || "No name"}{" "}
                        <span className="text-muted-foreground">
                          · {q.email}
                        </span>
                      </div>
                      {q.createdAt && (
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(q.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {q.company && <span>{q.company} · </span>}
                      {q.country}
                    </div>
                    {q.message && (
                      <p className="mt-2 text-xs whitespace-pre-line">
                        {q.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "careers" && (
        <div className="space-y-4">
          {/* Create opening */}
          <Card className="border border-border/70 bg-background/90">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Add new opening
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3">
              <form
                className="grid gap-3 md:grid-cols-2"
                onSubmit={handleCreateCareer}
              >
                <div className="space-y-1">
                  <label className="font-medium">Title *</label>
                  <input
                    value={newCareer.title}
                    onChange={(e) =>
                      setNewCareer((p) => ({ ...p, title: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                    placeholder="e.g. Senior Full Stack Engineer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium">Department *</label>
                  <select
                    value={newCareer.departmentKey}
                    onChange={(e) =>
                      setNewCareer((p) => ({
                        ...p,
                        departmentKey: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  >
                    <option value="">Select department</option>
                    {DEPT_OPTIONS.map((d) => (
                      <option key={d.key} value={d.key}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-medium">Location</label>
                  <input
                    value={newCareer.location}
                    onChange={(e) =>
                      setNewCareer((p) => ({ ...p, location: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                    placeholder="Remote / Mumbai"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium">Type</label>
                  <input
                    value={newCareer.type}
                    onChange={(e) =>
                      setNewCareer((p) => ({ ...p, type: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                    placeholder="Full-time / Contract"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-medium">Short summary</label>
                  <textarea
                    rows={3}
                    value={newCareer.summary}
                    onChange={(e) =>
                      setNewCareer((p) => ({ ...p, summary: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                    placeholder="One or two lines about this role."
                  />
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={newCareer.isActive}
                    onChange={(e) =>
                      setNewCareer((p) => ({ ...p, isActive: e.target.checked }))
                    }
                  />
                  <label htmlFor="isActive" className="text-xs">
                    Opening is active / visible
                  </label>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={
                      loading ||
                      !newCareer.title ||
                      !newCareer.departmentKey
                    }
                    className="rounded-full bg-emerald-500 text-emerald-950 text-xs font-semibold hover:bg-emerald-400"
                  >
                    Add opening
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* List openings */}
          <Card className="border border-border/70 bg-background/90">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Existing openings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {loading && <p>Loading openings…</p>}
              {!loading && careers.length === 0 && (
                <p className="text-muted-foreground text-xs">
                  No openings yet. Add one above.
                </p>
              )}
              {!loading && careers.length > 0 && (
                <div className="space-y-2">
                  {careers.map((c) => (
                    <div
                      key={c._id}
                      className="flex flex-col gap-2 rounded-lg border border-border/60 bg-background/80 p-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">
                            {c.title}
                          </span>
                          {c.isActive ? (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300 border border-emerald-500/40">
                              Active
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-700/40 px-2 py-0.5 text-[11px] text-slate-200 border border-slate-500/40">
                              Archived
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {c.departmentName || c.departmentKey} ·{" "}
                          {c.location || "Location N/A"} · {c.type || "Type N/A"}
                        </div>
                        {c.summary && (
                          <p className="text-[11px] text-slate-200">
                            {c.summary}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleCareerActive(c)}
                          className="rounded-full border-border/70 bg-background/80 text-xs"
                        >
                          {c.isActive ? "Archive" : "Activate"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteCareer(c._id)}
                          className="rounded-full border-rose-500/60 bg-rose-500/10 text-xs text-rose-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "applications" && (
        <Card className="border border-border/70 bg-background/90">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Recent applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {loading && <p>Loading applications…</p>}
            {!loading && applications.length === 0 && (
              <p className="text-muted-foreground text-xs">
                No applications yet. Once candidates apply via the Careers page,
                they’ll appear here.
              </p>
            )}
            {!loading && applications.length > 0 && (
              <div className="space-y-2">
                {applications.map((a) => (
                  <details
                    key={a._id}
                    className="rounded-lg border border-border/60 bg-background/80 p-3"
                  >
                    <summary className="flex items-center justify-between gap-2 cursor-pointer">
                      <span>
                        {a.basicInfo?.fullName || "Unknown candidate"} ·{" "}
                        {a.basicInfo?.email || "no email"}
                      </span>
                      {a.createdAt && (
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(a.createdAt).toLocaleString()}
                        </span>
                      )}
                    </summary>
                    <div className="mt-2 space-y-1 text-[11px]">
                      <p>
                        <span className="font-medium">Department:</span>{" "}
                        {a.departmentKey || "-"}
                      </p>
                      <p>
                        <span className="font-medium">Role key:</span>{" "}
                        {a.roleKey || "-"}
                      </p>
                      {a.basicInfo && (
                        <>
                          <p>
                            <span className="font-medium">City:</span>{" "}
                            {a.basicInfo.city || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Experience:</span>{" "}
                            {a.basicInfo.totalExp || "-"} years
                          </p>
                          {a.basicInfo.linkedin && (
                            <p>
                              <span className="font-medium">LinkedIn:</span>{" "}
                              {a.basicInfo.linkedin}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
