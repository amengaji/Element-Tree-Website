// src/app/careers/CareersWizard.tsx
"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- CONFIG: Departments & Roles ---------------- */

type DepartmentKey =
  | "3d-animation"
  | "software"
  | "accounts"
  | "hr"
  | "admin-ops"
  | "marketing"
  | "maritime"
  | "instructional"
  | "sales-bd"
  | "support";

interface RoleConfig {
  key: string;
  title: string;
  location?: string;
  type?: string; // Full-time, Contract, etc.
  summary?: string;
}

interface DepartmentConfig {
  key: DepartmentKey;
  name: string;
  description: string;
  roles: RoleConfig[];
}

const DEPARTMENTS: DepartmentConfig[] = [
  {
    key: "3d-animation",
    name: "3D & Animation",
    description:
      "Generalists, animators, lighting, FX, motion graphics, compositing.",
    roles: [
      {
        key: "3d-generalist",
        title: "3D Generalist",
        location: "Remote / Mumbai",
        type: "Full-time",
      },
      {
        key: "3d-animator",
        title: "3D Animator",
        location: "Remote / Hybrid",
        type: "Full-time / Contract",
      },
      {
        key: "lighting-lookdev",
        title: "Lighting & LookDev Artist",
      },
      {
        key: "unreal-artist",
        title: "Unreal Engine Artist (UE5)",
      },
      {
        key: "motion-graphics",
        title: "Motion Graphics Designer",
      },
      {
        key: "video-editor",
        title: "Video Editor",
      },
    ],
  },
  {
    key: "software",
    name: "Software Engineering",
    description:
      "Frontend, backend, full-stack, mobile, desktop and platform engineering.",
    roles: [
      {
        key: "fullstack-dev",
        title: "Senior Full Stack Engineer",
        location: "Remote / Hybrid",
        type: "Full-time",
      },
      {
        key: "frontend-dev",
        title: "Frontend Engineer (React / Next.js)",
      },
      {
        key: "backend-dev",
        title: "Backend Engineer (Node / Python)",
      },
      {
        key: "mobile-dev",
        title: "Mobile Engineer (React Native / Expo)",
      },
      {
        key: "qa-engineer",
        title: "QA Engineer / Test Engineer",
      },
      {
        key: "devops-engineer",
        title: "DevOps / Cloud Engineer",
      },
    ],
  },
  {
    key: "accounts",
    name: "Accounts & Finance",
    description: "Accounting, payroll, GST/TDS, financial operations.",
    roles: [
      { key: "accounts-exec", title: "Accounts Executive / Finance" },
      { key: "finance-manager", title: "Finance Manager" },
      { key: "payroll-specialist", title: "Payroll & Compliance Specialist" },
    ],
  },
  {
    key: "hr",
    name: "Human Resources",
    description: "HR operations, people management and recruitment.",
    roles: [
      { key: "hr-exec", title: "HR Executive / HR Manager" },
      { key: "recruiter", title: "Recruiter / Talent Acquisition" },
      { key: "people-ops", title: "People Operations Specialist" },
    ],
  },
  {
    key: "admin-ops",
    name: "Admin & Operations",
    description: "Office admin, operations, logistics, coordination.",
    roles: [
      { key: "admin-ops", title: "Admin / Office Operations" },
      { key: "project-coordinator", title: "Project Coordinator" },
      { key: "ops-manager", title: "Operations Manager" },
    ],
  },
  {
    key: "marketing",
    name: "Marketing & Branding",
    description: "Digital campaigns, social media, content & brand.",
    roles: [
      { key: "marketing-exec", title: "Marketing Executive" },
      { key: "digital-marketing", title: "Digital Marketing Specialist" },
      { key: "content-writer", title: "Content / Script Writer" },
      { key: "brand-designer", title: "Brand / Visual Designer" },
    ],
  },
  {
    key: "maritime",
    name: "Maritime & Training",
    description:
      "Marine SMEs and specialists for high-accuracy training modules.",
    roles: [
      { key: "marine-content", title: "Marine Content Specialist" },
      { key: "maritime-id", title: "Maritime Instructional Designer" },
      { key: "sme-marine", title: "SME – Marine / Offshore" },
      {
        key: "training-reviewer",
        title: "Training Content Reviewer (Maritime)",
      },
    ],
  },
  {
    key: "instructional",
    name: "Instructional Design",
    description: "Storyboarding, curriculum, assessment & learning design.",
    roles: [
      { key: "id-writer", title: "Instructional Designer / Writer" },
      { key: "storyboard-artist", title: "Storyboard Artist" },
      { key: "assessment-designer", title: "Assessment Designer" },
    ],
  },
  {
    key: "sales-bd",
    name: "Sales & Business Dev",
    description: "B2B sales, presales, partnerships and growth.",
    roles: [
      { key: "bd-exec", title: "Business Development Executive" },
      { key: "account-manager", title: "Customer Account Manager" },
      { key: "presales", title: "Presales / Solutions Consultant" },
    ],
  },
  {
    key: "support",
    name: "Support & Admin",
    description: "Customer success, support and coordination.",
    roles: [
      { key: "client-support", title: "Client Support / Customer Success" },
      { key: "implementation", title: "Onboarding / Implementation Specialist" },
    ],
  },
];

/* --------------- Role Question Config (simplified) --------------- */

type QuestionType = "text" | "number" | "yesno";

interface RoleQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
}

const QUESTION_SETS: Record<string, RoleQuestion[]> = {
  creative: [
    {
      id: "years_experience",
      label: "Total years of experience in this creative role",
      type: "number",
      required: true,
    },
    {
      id: "primary_tools",
      label: "Primary tools you use (Blender, Unreal, Adobe, etc.)",
      type: "text",
      required: true,
    },
    {
      id: "portfolio_link",
      label: "Portfolio / showreel link",
      type: "text",
      required: true,
    },
    {
      id: "team_experience",
      label: "Have you worked in a production team before?",
      type: "yesno",
      required: true,
    },
  ],
  software: [
    {
      id: "years_experience",
      label: "Total years of experience in software development",
      type: "number",
      required: true,
    },
    {
      id: "primary_stack",
      label: "Primary stack / technologies (React, Node, Python, etc.)",
      type: "text",
      required: true,
    },
    {
      id: "largest_project",
      label:
        "Briefly describe the most complex product or project you've worked on.",
      type: "text",
      required: true,
    },
  ],
  operations: [
    {
      id: "years_experience",
      label: "Total years of experience in this function",
      type: "number",
      required: true,
    },
    {
      id: "industry_experience",
      label: "Relevant industry / segment experience",
      type: "text",
      required: true,
    },
    {
      id: "kpi_example",
      label:
        "Share one measurable outcome or KPI you achieved in your previous role.",
      type: "text",
      required: true,
    },
  ],
  maritime: [
    {
      id: "years_experience",
      label: "Total years of sea service / maritime experience",
      type: "number",
      required: true,
    },
    {
      id: "certifications",
      label: "Key maritime certifications held (CoC, DP, STCW, etc.)",
      type: "text",
      required: true,
    },
    {
      id: "specialisation",
      label: "What areas do you specialise in? (Tankers, DP, COLREGS, etc.)",
      type: "text",
      required: true,
    },
  ],
};

const ROLE_TYPE_MAP: Record<string, keyof typeof QUESTION_SETS> = {
  // creative
  "3d-generalist": "creative",
  "3d-animator": "creative",
  "lighting-lookdev": "creative",
  "unreal-artist": "creative",
  "motion-graphics": "creative",
  "video-editor": "creative",

  // software
  "fullstack-dev": "software",
  "frontend-dev": "software",
  "backend-dev": "software",
  "mobile-dev": "software",
  "qa-engineer": "software",
  "devops-engineer": "software",

  // ops / business
  "accounts-exec": "operations",
  "finance-manager": "operations",
  "payroll-specialist": "operations",
  "hr-exec": "operations",
  "recruiter": "operations",
  "admin-ops": "operations",
  "project-coordinator": "operations",
  "ops-manager": "operations",
  "marketing-exec": "operations",
  "digital-marketing": "operations",
  "content-writer": "operations",
  "brand-designer": "operations",
  "bd-exec": "operations",
  "account-manager": "operations",
  presales: "operations",
  "client-support": "operations",
  implementation: "operations",

  // maritime
  "marine-content": "maritime",
  "maritime-id": "maritime",
  "sme-marine": "maritime",
  "training-reviewer": "maritime",
};

function getQuestionsForRole(roleKey: string): RoleQuestion[] {
  const type = ROLE_TYPE_MAP[roleKey];
  if (!type) return [];
  return QUESTION_SETS[type] ?? [];
}

/* -------------------------- Wizard Component -------------------------- */

const STEPS = [
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
  { key: "basic", label: "Basic info" },
  { key: "questions", label: "Role questions" },
  { key: "review", label: "Review & submit" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

interface BasicInfoState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  totalExp: string;
  currentRole: string;
  linkedin: string;
}

const emptyBasic: BasicInfoState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  totalExp: "",
  currentRole: "",
  linkedin: "",
};

export default function CareersWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDeptKey, setSelectedDeptKey] = useState<DepartmentKey | null>(
    null,
  );
  const [selectedRoleKey, setSelectedRoleKey] = useState<string | null>(null);
  const [basicInfo, setBasicInfo] = useState<BasicInfoState>(emptyBasic);
  const [roleAnswers, setRoleAnswers] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const currentStep: StepKey = STEPS[stepIndex].key;

  const selectedDept = useMemo(
    () => DEPARTMENTS.find((d) => d.key === selectedDeptKey) ?? null,
    [selectedDeptKey],
  );
  const selectedRole: RoleConfig | null = useMemo(() => {
    if (!selectedRoleKey) return null;
    for (const d of DEPARTMENTS) {
      const role = d.roles.find((r) => r.key === selectedRoleKey);
      if (role) return role;
    }
    return null;
  }, [selectedRoleKey]);

  const questions = useMemo(
    () => (selectedRoleKey ? getQuestionsForRole(selectedRoleKey) : []),
    [selectedRoleKey],
  );

  /* ---------------------- Navigation & Validation ---------------------- */

  function canGoNext() {
    if (currentStep === "department") return !!selectedDeptKey;
    if (currentStep === "role") return !!selectedRoleKey;
    if (currentStep === "basic") {
      return (
        !!basicInfo.fullName.trim() &&
        !!basicInfo.email.trim() &&
        !!basicInfo.phone.trim() &&
        !!basicInfo.city.trim()
      );
    }
    if (currentStep === "questions") {
      for (const q of questions) {
        if (q.required && !roleAnswers[q.id]?.trim()) return false;
      }
      return true;
    }
    return true;
  }

  function goNext() {
    if (stepIndex < STEPS.length - 1 && canGoNext()) {
      setStepIndex(stepIndex + 1);
    }
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  async function handleSubmit() {
    if (!canGoNext()) return;
    setSubmitState("submitting");

    const payload = {
      stepVersion: "v2-react-wizard",
      departmentKey: selectedDeptKey,
      roleKey: selectedRoleKey,
      basicInfo,
      roleAnswers,
    };

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        console.error("Error when submitting application:", data);
        setSubmitState("idle");
        alert("There was a problem submitting your application. Please try again.");
        return;
      }

      setSubmitState("success");
    } catch (err) {
      console.error("Network error when submitting application:", err);
      setSubmitState("idle");
      alert("Network error. Please try again.");
    }
  }



  /* ---------------------------- Render Helpers ---------------------------- */

  function renderStepper() {
    return (
      <div className="flex items-center justify-between gap-2 text-[11px]">
        {STEPS.map((step, idx) => {
          const isActive = idx === stepIndex;
          const isCompleted = idx < stepIndex;
          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div
                className={cn(
                  "flex h-9 items-center justify-center rounded-full border px-3 transition whitespace-nowrap",
                  isActive &&
                    "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold",
                  !isActive &&
                    !isCompleted &&
                    "border-border/70 text-muted-foreground",
                  isCompleted &&
                    "border-emerald-400 bg-emerald-500/10 text-emerald-300",
                )}
              >
                <span className="mr-1">{idx + 1}.</span>
                <span>{step.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="mx-1 h-px flex-1 bg-border/60" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function renderDepartmentStep() {
    return (
      <div className="space-y-4">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
            Step 1 — Select department
          </p>
          <h2 className="text-sm md:text-base font-semibold">
            Choose the team that best fits your background.
          </h2>
          <p className="text-xs text-muted-foreground">
            You’ll choose a specific role in the next step. If you’re flexible,
            pick the closest match.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDeptKey === dept.key;
            return (
              <button
                key={dept.key}
                type="button"
                onClick={() => {
                  setSelectedDeptKey(dept.key);
                  setSelectedRoleKey(null);
                }}
                className={cn(
                  "text-left rounded-xl border px-4 py-3 text-xs transition hover:border-emerald-400/70 hover:bg-emerald-500/5",
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-border/70 bg-background/80",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{dept.name}</p>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {dept.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderRoleStep() {
    return (
      <div className="space-y-4">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
            Step 2 — Select role
          </p>
          <h2 className="text-sm md:text-base font-semibold">
            Choose the specific role you’d like to apply for.
          </h2>
          <p className="text-xs text-muted-foreground">
            If you’re open to multiple roles, pick the closest match and explain
            in your answers later.
          </p>
        </header>

        {!selectedDept && (
          <p className="rounded-md border border-amber-500/50 bg-amber-500/5 px-3 py-2 text-xs text-amber-500">
            No department selected yet. Go back to Step 1 and choose a
            department.
          </p>
        )}

        {selectedDept && (
          <div className="grid gap-3 md:grid-cols-2">
            {selectedDept.roles.map((role) => {
              const isSelected = selectedRoleKey === role.key;
              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => {
                    setSelectedRoleKey(role.key);
                    setRoleAnswers({});
                  }}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left text-xs transition hover:border-emerald-400/70 hover:bg-emerald-500/5",
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-border/70 bg-background/80",
                  )}
                >
                  <p className="text-sm font-semibold">{role.title}</p>
                  {(role.location || role.type) && (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {[role.location, role.type].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function renderBasicStep() {
    const setField = (field: keyof BasicInfoState, value: string) =>
      setBasicInfo((prev) => ({ ...prev, [field]: value }));

    return (
      <div className="space-y-4">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
            Step 3 — Basic information
          </p>
          <h2 className="text-sm md:text-base font-semibold">
            Tell us a bit about yourself.
          </h2>
          <p className="text-xs text-muted-foreground">
            We only use this for the hiring process. No data is shared with
            external parties.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 text-xs">
          <div className="space-y-1">
            <label className="font-medium">Full name *</label>
            <input
              value={basicInfo.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Email *</label>
            <input
              type="email"
              value={basicInfo.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Phone *</label>
            <input
              value={basicInfo.phone}
              onChange={(e) => setField("phone", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="+91 ..."
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Current city *</label>
            <input
              value={basicInfo.city}
              onChange={(e) => setField("city", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="Mumbai, Kochi, ..."
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">
              Total experience (years, approx)
            </label>
            <input
              value={basicInfo.totalExp}
              onChange={(e) => setField("totalExp", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="e.g. 3.5"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Current role / designation</label>
            <input
              value={basicInfo.currentRole}
              onChange={(e) => setField("currentRole", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="e.g. Senior 3D Generalist"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="font-medium">LinkedIn (optional)</label>
            <input
              value={basicInfo.linkedin}
              onChange={(e) => setField("linkedin", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>
      </div>
    );
  }

  function renderQuestionsStep() {
    return (
      <div className="space-y-4">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
            Step 4 — Role questions
          </p>
          <h2 className="text-sm md:text-base font-semibold">
            A few focused questions for this role.
          </h2>
          <p className="text-xs text-muted-foreground">
            Short, clear answers are perfectly fine. Bullet points are ok too.
          </p>
        </header>

        {!selectedRole && (
          <p className="rounded-md border border-amber-500/50 bg-amber-500/5 px-3 py-2 text-xs text-amber-500">
            No role selected yet. Go back to Step 2 and choose a role.
          </p>
        )}

        {selectedRole && questions.length === 0 && (
          <p className="text-xs text-muted-foreground">
            There are no additional questions configured for this role. You can
            continue to review & submit.
          </p>
        )}

        {selectedRole && questions.length > 0 && (
          <div className="space-y-4 text-xs">
            {questions.map((q) => (
              <div key={q.id} className="space-y-1">
                <label className="block font-medium">
                  {q.label}
                  {q.required && (
                    <span className="ml-1 text-rose-500">*</span>
                  )}
                </label>
                {q.type === "yesno" ? (
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <label
                        key={val}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] cursor-pointer transition",
                          roleAnswers[q.id] === val
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                            : "border-border/70 bg-background/80 hover:border-emerald-400/70 hover:bg-emerald-500/5",
                        )}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          name={q.id}
                          value={val}
                          checked={roleAnswers[q.id] === val}
                          onChange={(e) =>
                            setRoleAnswers((prev) => ({
                              ...prev,
                              [q.id]: e.target.value,
                            }))
                          }
                        />
                        <span className="capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                ) : q.type === "number" ? (
                  <input
                    type="number"
                    value={roleAnswers[q.id] ?? ""}
                    onChange={(e) =>
                      setRoleAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                    placeholder="Enter a number"
                  />
                ) : (
                  <textarea
                    rows={3}
                    value={roleAnswers[q.id] ?? ""}
                    onChange={(e) =>
                      setRoleAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                    placeholder="Write a short answer…"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderReviewStep() {
    return (
      <div className="space-y-4">
        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
            Step 5 — Review & submit
          </p>
          <h2 className="text-sm md:text-base font-semibold">
            Quickly confirm everything looks correct.
          </h2>
          <p className="text-xs text-muted-foreground">
            After submitting, you’ll receive an acknowledgement on screen.
          </p>
        </header>

        <div className="grid gap-4 text-xs md:grid-cols-2">
          <div className="space-y-2 rounded-xl border border-border/70 bg-background/80 p-3">
            <h3 className="text-[11px] font-semibold text-muted-foreground">
              Department & role
            </h3>
            <p>
              <span className="font-medium">Department:</span>{" "}
              {selectedDept ? selectedDept.name : "-"}
            </p>
            <p>
              <span className="font-medium">Role:</span>{" "}
              {selectedRole ? selectedRole.title : "-"}
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-border/70 bg-background/80 p-3">
            <h3 className="text-[11px] font-semibold text-muted-foreground">
              Basic info
            </h3>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {basicInfo.fullName || "-"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {basicInfo.email || "-"}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {basicInfo.phone || "-"}
            </p>
            <p>
              <span className="font-medium">City:</span>{" "}
              {basicInfo.city || "-"}
            </p>
            <p>
              <span className="font-medium">Experience:</span>{" "}
              {basicInfo.totalExp || "-"} years
            </p>
          </div>

          <div className="md:col-span-2 rounded-xl border border-border/70 bg-background/80 p-3">
            <h3 className="text-[11px] font-semibold text-muted-foreground mb-2">
              Role-specific answers
            </h3>
            {questions.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No additional questions for this role.
              </p>
            )}
            {questions.length > 0 && (
              <div className="space-y-2">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-col gap-1 border-b border-border/50 pb-2 last:border-none"
                  >
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {q.label}
                    </span>
                    <span className="text-xs">
                      {roleAnswers[q.id]?.trim() || "-"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {submitState === "success" && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <p>
              Thank you! Your application has been recorded. If your profile
              matches what we’re looking for, we’ll reach out over email.
            </p>
          </div>
        )}
      </div>
    );
  }

  /* -------------------------------- Render -------------------------------- */

  return (
    <Card className="border border-border/60 bg-background/90 shadow-soft-lg">
      <CardHeader className="flex flex-col gap-3 border-b border-border/60 pb-5">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-sm md:text-base font-semibold">
            Application wizard
          </CardTitle>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Takes ~5–7 minutes</span>
          </div>
        </div>
        {renderStepper()}
      </CardHeader>

      <CardContent className="space-y-6 pt-6 text-sm">
        {currentStep === "department" && renderDepartmentStep()}
        {currentStep === "role" && renderRoleStep()}
        {currentStep === "basic" && renderBasicStep()}
        {currentStep === "questions" && renderQuestionsStep()}
        {currentStep === "review" && renderReviewStep()}

        {/* NAVIGATION */}
        <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-1 rounded-full border-border/70 bg-background/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Button>

          {currentStep !== "review" && (
            <Button
              type="button"
              size="sm"
              onClick={goNext}
              disabled={!canGoNext()}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-xs font-semibold text-emerald-950 shadow-soft transition hover:bg-emerald-400 disabled:opacity-60"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}

          {currentStep === "review" && (
            <Button
              type="button"
              size="sm"
              disabled={submitState === "submitting" || submitState === "success"}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-xs font-semibold text-emerald-950 shadow-soft transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {submitState === "submitting" ? "Submitting…" : "Submit application"}
              {submitState !== "success" && (
                <ArrowRight className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
