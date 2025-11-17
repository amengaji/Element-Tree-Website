// src/app/careers/CareersPageClient.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ArrowLeft, FileText, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = {
  key: string;
  name: string;
};

type Department = {
  key: string;
  name: string;
  description: string;
  roles: Role[];
};

type OpenRole = {
  key: string;
  title: string;
  departmentKey: string;
  location: string;
  type: string;
  blurb: string;
};

type BasicInfo = {
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  totalExperienceYears: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  willingToRelocate: string;
  preferredLocations: string;
  linkedin: string;
};

type Question = {
  id: string;
  label: string;
  type: "number" | "text" | "yesno";
  required?: boolean;
};

/* ---------------- CONFIG: Departments & Roles --------------- */

const DEPARTMENTS: Department[] = [
  {
    key: "3d-animation",
    name: "3D & Animation",
    description: "Generalists, animators, lighting, FX, motion graphics, editing.",
    roles: [
      { key: "3d-generalist", name: "3D Generalist" },
      { key: "3d-animator", name: "3D Animator" },
      { key: "lighting-artist", name: "Lighting & LookDev Artist" },
      { key: "unreal-artist", name: "Unreal Engine Artist (UE5)" },
      { key: "motion-graphics", name: "Motion Graphics Designer" },
      { key: "video-editor", name: "Video Editor" },
    ],
  },
  {
    key: "software-engineering",
    name: "Software Engineering",
    description: "Frontend, backend, full-stack, mobile, DevOps, QA.",
    roles: [
      { key: "frontend-dev", name: "Frontend Developer (React / Next.js)" },
      { key: "backend-dev", name: "Backend Developer (Node / Python)" },
      { key: "fullstack-dev", name: "Full Stack Engineer" },
      { key: "mobile-dev", name: "Mobile App Developer (React Native / Expo)" },
      { key: "devops-engineer", name: "DevOps / Cloud Engineer (AWS)" },
      { key: "qa-engineer", name: "QA Engineer / Test Engineer" },
    ],
  },
  {
    key: "accounts-finance",
    name: "Accounts & Finance",
    description: "Accounting, payroll, GST/TDS, finance.",
    roles: [
      { key: "accounts-exec", name: "Accounts Executive / Finance" },
      { key: "payroll-exec", name: "Payroll & Compliance Executive" },
      { key: "finance-analyst", name: "Finance Analyst" },
    ],
  },
  {
    key: "human-resources",
    name: "Human Resources",
    description: "HR operations, people management, recruitment.",
    roles: [
      { key: "hr-exec", name: "HR Executive / HR Manager" },
      { key: "recruiter", name: "Recruiter / Talent Acquisition" },
      { key: "people-ops", name: "People Operations Specialist" },
    ],
  },
  {
    key: "admin-ops",
    name: "Admin & Operations",
    description: "Office admin, operations, logistics, coordination.",
    roles: [
      { key: "admin-ops", name: "Admin / Office Operations" },
      { key: "project-coordinator", name: "Project Coordinator" },
      { key: "ops-manager", name: "Operations Manager" },
    ],
  },
  {
    key: "marketing-branding",
    name: "Marketing & Branding",
    description: "Digital campaigns, social media, content & brand.",
    roles: [
      { key: "marketing-exec", name: "Marketing Executive" },
      { key: "brand-designer", name: "Brand / Visual Designer" },
      { key: "content-writer", name: "Content / Script Writer" },
      { key: "social-media", name: "Social Media Manager" },
    ],
  },
  {
    key: "maritime-training",
    name: "Maritime & Training",
    description: "Marine SMEs, instructors, navigational specialists.",
    roles: [
      { key: "marine-sme", name: "Marine SME / Consultant" },
      { key: "training-reviewer", name: "Training Content Reviewer (Maritime)" },
      { key: "nav-specialist", name: "Navigational Specialist" },
    ],
  },
  {
    key: "instructional-design",
    name: "Instructional Design",
    description: "Storyboard writing, curriculum & learning design.",
    roles: [
      { key: "id-writer", name: "Instructional Designer / Script Writer" },
      { key: "storyboard-artist", name: "Storyboard Artist" },
    ],
  },
  {
    key: "sales-bizdev",
    name: "Sales & Business Dev",
    description: "B2B sales, presales, partnerships, customer growth.",
    roles: [
      { key: "b2b-sales", name: "B2B Sales Executive" },
      { key: "presales", name: "Presales / Solutions Consultant" },
      { key: "customer-success", name: "Customer Success Manager" },
    ],
  },
  {
    key: "support-admin",
    name: "Support & Admin",
    description: "Customer success, support, coordination roles.",
    roles: [
      { key: "support-analyst", name: "Support Analyst" },
      { key: "client-coordinator", name: "Client Coordinator" },
    ],
  },
];

/* --------------- CONFIG: Open roles (easy to edit) --------------- */

const OPEN_ROLES: OpenRole[] = [
  {
    key: "fullstack-dev",
    title: "Senior Full Stack Engineer",
    departmentKey: "software-engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    blurb:
      "Help shape our LMS, HRMS and maritime inspection platforms end-to-end with a focus on performance and DX.",
  },
  {
    key: "unreal-artist",
    title: "3D Artist / Technical Director (Maritime)",
    departmentKey: "3d-animation",
    location: "Remote / Hybrid",
    type: "Full-time / Contract",
    blurb:
      "Lead high-fidelity 3D safety training content for enclosed space entry, mooring and shipboard operations.",
  },
  {
    key: "product-designer",
    title: "Product Designer (SaaS)",
    departmentKey: "software-engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    blurb:
      "Design workflows that feel natural for maritime and HR teams across web, tablet and mobile.",
  },
];

/* --------------- CONFIG: Role question sets (light version) --------------- */

const ROLE_QUESTION_SETS: Record<string, Question[]> = {
  generic_creative: [
    {
      id: "tools",
      label: "Primary tools you work with (Blender, Unreal, Adobe, etc.)",
      type: "text",
      required: true,
    },
    {
      id: "portfolio",
      label: "Portfolio / showreel link",
      type: "text",
      required: true,
    },
    {
      id: "team-experience",
      label: "Have you worked in a production team before?",
      type: "yesno",
      required: true,
    },
  ],
  generic_software: [
    {
      id: "stack",
      label: "Primary stack / technologies (React, Node, Python, etc.)",
      type: "text",
      required: true,
    },
    {
      id: "complex-project",
      label: "Describe the most complex product or system you’ve worked on.",
      type: "text",
      required: true,
    },
    {
      id: "saas-experience",
      label: "Have you worked on SaaS / multi-tenant platforms?",
      type: "yesno",
    },
  ],
  generic_maritime: [
    {
      id: "sea-service",
      label: "Total years of sea service / maritime industry experience",
      type: "number",
      required: true,
    },
    {
      id: "certs",
      label: "Key maritime certifications held (CoC, DP, STCW, etc.)",
      type: "text",
      required: true,
    },
    {
      id: "training-experience",
      label: "Have you been involved in training, auditing or vetting previously?",
      type: "yesno",
      required: true,
    },
  ],
  generic_business: [
    {
      id: "years",
      label: "Total years of experience in this role",
      type: "number",
      required: true,
    },
    {
      id: "kpi",
      label: "Share one measurable outcome or KPI you improved in your last role.",
      type: "text",
      required: true,
    },
  ],
};

const ROLE_TYPE_MAP: Record<string, keyof typeof ROLE_QUESTION_SETS> = {
  // creative
  "3d-generalist": "generic_creative",
  "3d-animator": "generic_creative",
  "lighting-artist": "generic_creative",
  "unreal-artist": "generic_creative",
  "motion-graphics": "generic_creative",
  "video-editor": "generic_creative",

  // software
  "frontend-dev": "generic_software",
  "backend-dev": "generic_software",
  "fullstack-dev": "generic_software",
  "mobile-dev": "generic_software",
  "devops-engineer": "generic_software",
  "qa-engineer": "generic_software",
  "product-designer": "generic_software",

  // maritime
  "marine-sme": "generic_maritime",
  "training-reviewer": "generic_maritime",
  "nav-specialist": "generic_maritime",

  // business / others
  "accounts-exec": "generic_business",
  "payroll-exec": "generic_business",
  "finance-analyst": "generic_business",
  "hr-exec": "generic_business",
  recruiter: "generic_business",
  "people-ops": "generic_business",
  "admin-ops": "generic_business",
  "project-coordinator": "generic_business",
  "ops-manager": "generic_business",
  "marketing-exec": "generic_business",
  "b2b-sales": "generic_business",
  presales: "generic_business",
  "customer-success": "generic_business",
  "support-analyst": "generic_business",
  "client-coordinator": "generic_business",
};

/* ---------------------- Helper lookups ---------------------- */

function getDepartment(key: string | null): Department | undefined {
  if (!key) return undefined;
  return DEPARTMENTS.find((d) => d.key === key);
}

function getRole(departmentKey: string | null, roleKey: string | null): Role | undefined {
  if (!departmentKey || !roleKey) return undefined;
  const dept = getDepartment(departmentKey);
  return dept?.roles.find((r) => r.key === roleKey);
}

function getQuestionsForRole(roleKey: string | null): Question[] {
  if (!roleKey) return [];
  const type = ROLE_TYPE_MAP[roleKey];
  if (!type) return [];
  return ROLE_QUESTION_SETS[type] ?? [];
}

/* --------------------------- Component --------------------------- */

const steps = [
  "Department",
  "Role",
  "Basic info",
  "Role questions",
  "Review & submit",
];

export default function CareersPageClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    fullName: "",
    email: "",
    phone: "",
    currentCity: "",
    totalExperienceYears: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    willingToRelocate: "",
    preferredLocations: "",
    linkedin: "",
  });
  const [roleAnswers, setRoleAnswers] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const wizardRef = useRef<HTMLDivElement | null>(null);

  const activeDept = useMemo(
    () => getDepartment(selectedDept),
    [selectedDept]
  );
  const activeRole = useMemo(
    () => getRole(selectedDept, selectedRole),
    [selectedDept, selectedRole]
  );
  const questions = useMemo(
    () => getQuestionsForRole(selectedRole),
    [selectedRole]
  );

  const handleOpenRoleClick = (openRole: OpenRole) => {
    setSelectedDept(openRole.departmentKey);
    setSelectedRole(openRole.key);
    setStepIndex(2); // jump to Basic Info
    setError(null);
    setSubmitMessage(null);
    if (wizardRef.current) {
      wizardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBasicChange = (field: keyof BasicInfo, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setError(null);
    setSubmitMessage(null);

    // validation per step
    if (stepIndex === 0 && !selectedDept) {
      setError("Please select a department to continue.");
      return;
    }
    if (stepIndex === 1 && !selectedRole) {
      setError("Please select a role to continue.");
      return;
    }
    if (stepIndex === 2) {
      const required: (keyof BasicInfo)[] = [
        "fullName",
        "email",
        "phone",
        "currentCity",
        "totalExperienceYears",
        "expectedCTC",
        "willingToRelocate",
      ];
      for (const key of required) {
        if (!basicInfo[key]?.trim()) {
          setError("Please fill all required basic fields marked with *.");
          return;
        }
      }
      if (!resumeFile) {
        setError("Please upload your resume (PDF/DOC).");
        return;
      }
    }
    if (stepIndex === 3) {
      for (const q of questions) {
        if (!q.required) continue;
        const val = roleAnswers[q.id];
        if (!val || val.trim() === "") {
          setError("Please answer all required role questions.");
          return;
        }
      }
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setSubmitMessage(null);
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitMessage(null);
    setSubmitting(true);

    const payload = {
      departmentKey: selectedDept,
      roleKey: selectedRole,
      basicInfo,
      roleAnswers,
      meta: {
        source: "element-tree-careers-wizard-v1",
        submittedAt: new Date().toISOString(),
      },
    };

    // For now we just log to console; you can wire this to /api/careers/apply later.
    // await fetch("/api/careers/apply", { method: "POST", body: FormData(...) });
    // eslint-disable-next-line no-console
    console.log("CAREERS APPLICATION PAYLOAD", payload, resumeFile);

    setSubmitting(false);
    setSubmitMessage(
      "Thank you! Your application has been captured. We’ll get in touch if there’s a fit."
    );
  };

  return (
    <div className="section">
      <div className="container space-y-12">
        {/* HERO */}
        <header className="space-y-4 text-center">
          <p className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-500">
            We’re hiring across 3D, software, maritime & operations
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Careers at{" "}
            <span className="text-gradient-emerald">Element Tree</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Join a product-focused team working at the intersection of maritime
            operations, HR, training and safety. If you care about detail and
            long-term impact, we’d love to hear from you.
          </p>
        </header>

        {/* OPEN ROLES OVERVIEW */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg md:text-xl font-semibold">Open roles</h2>
            <p className="text-xs text-muted-foreground">
              Don’t see a perfect match? You can still apply through the wizard
              below and share what you’d like to work on.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {OPEN_ROLES.map((role) => (
              <Card
                key={role.key}
                className="border border-emerald-500/20 bg-card/95 shadow-soft hover:shadow-soft-lg transition hover:-translate-y-[2px]"
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-sm font-semibold">
                    {role.title}
                  </CardTitle>
                  <p className="text-[11px] text-muted-foreground">
                    {getDepartment(role.departmentKey)?.name}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-500">
                      <MapPin className="h-3 w-3" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border/80 px-3 py-1 text-[11px]">
                      {role.type}
                    </span>
                  </div>
                  <p>{role.blurb}</p>
                  <Button
                    size="sm"
                    className="mt-1 h-8 rounded-full px-3 text-[11px] font-semibold"
                    onClick={() => handleOpenRoleClick(role)}
                  >
                    Apply for this role
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* WIZARD */}
        <section ref={wizardRef}>
          <Card className="border border-border/70 bg-card/95 shadow-soft-lg">
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-base md:text-lg">
                  Application wizard
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-600">
                  <FileText className="h-3 w-3" />
                  Takes ~5–7 minutes
                </span>
              </CardTitle>

              {/* STEPPER */}
              <div className="flex items-center gap-3 text-[11px]">
                {steps.map((label, idx) => {
                  const active = idx === stepIndex;
                  const completed = idx < stepIndex;
                  return (
                    <div key={label} className="flex flex-1 items-center">
                      <div
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3 py-1",
                          completed &&
                            "border-emerald-400 bg-emerald-50 text-emerald-700",
                          active &&
                            !completed &&
                            "border-emerald-500 text-emerald-600 font-semibold",
                          !active &&
                            !completed &&
                            "border-border text-muted-foreground"
                        )}
                      >
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px]">
                          {completed ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            idx + 1
                          )}
                        </span>
                        <span>{label}</span>
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="mx-2 h-px flex-1 bg-border/70" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error / success messages */}
              {error && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {error}
                </div>
              )}
              {submitMessage && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  {submitMessage}
                </div>
              )}

              {/* STEP CONTENT */}
              {stepIndex === 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold">
                    Step 1 — Select department
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Choose the team that best fits your background. You can see
                    role options in the next step.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {DEPARTMENTS.map((dept) => {
                      const selected = dept.key === selectedDept;
                      return (
                        <button
                          key={dept.key}
                          type="button"
                          onClick={() => {
                            setSelectedDept(dept.key);
                            setSelectedRole(null);
                          }}
                          className={cn(
                            "text-left rounded-2xl border px-4 py-3 text-xs transition shadow-sm hover:border-emerald-300 hover:bg-emerald-50/60",
                            selected &&
                              "border-emerald-500 bg-emerald-50 shadow-soft"
                          )}
                        >
                          <div className="text-[13px] font-semibold">
                            {dept.name}
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            {dept.description}
                          </div>
                          <div className="mt-2 text-[11px] text-emerald-600">
                            {dept.roles.length} role options
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {stepIndex === 1 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold">
                    Step 2 — Select role
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Choose the specific role you’d like to apply for. If you’re
                    flexible, pick the closest match and mention details in the
                    role questions later.
                  </p>
                  {!activeDept ? (
                    <p className="text-xs text-rose-600">
                      Please go back and select a department first.
                    </p>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                      {activeDept.roles.map((role) => {
                        const selected = role.key === selectedRole;
                        return (
                          <button
                            key={role.key}
                            type="button"
                            onClick={() => setSelectedRole(role.key)}
                            className={cn(
                              "text-left rounded-2xl border px-4 py-3 text-xs transition shadow-sm hover:border-emerald-300 hover:bg-emerald-50/60",
                              selected &&
                                "border-emerald-500 bg-emerald-50 shadow-soft"
                            )}
                          >
                            <div className="text-[13px] font-semibold">
                              {role.name}
                            </div>
                            <div className="mt-1 text-[11px] text-muted-foreground">
                              {activeDept.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {stepIndex === 2 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold">
                    Step 3 — Basic information
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Tell us a bit about yourself and your current professional
                    details.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2 text-xs">
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Full name *"
                      value={basicInfo.fullName}
                      onChange={(e) =>
                        handleBasicChange("fullName", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Work email *"
                      type="email"
                      value={basicInfo.email}
                      onChange={(e) =>
                        handleBasicChange("email", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Phone *"
                      value={basicInfo.phone}
                      onChange={(e) =>
                        handleBasicChange("phone", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Current city *"
                      value={basicInfo.currentCity}
                      onChange={(e) =>
                        handleBasicChange("currentCity", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Total experience (years) *"
                      value={basicInfo.totalExperienceYears}
                      onChange={(e) =>
                        handleBasicChange(
                          "totalExperienceYears",
                          e.target.value
                        )
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Current CTC (optional)"
                      value={basicInfo.currentCTC}
                      onChange={(e) =>
                        handleBasicChange("currentCTC", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Expected CTC *"
                      value={basicInfo.expectedCTC}
                      onChange={(e) =>
                        handleBasicChange("expectedCTC", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Notice period (e.g., 30 days)"
                      value={basicInfo.noticePeriod}
                      onChange={(e) =>
                        handleBasicChange("noticePeriod", e.target.value)
                      }
                    />
                    <select
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      value={basicInfo.willingToRelocate}
                      onChange={(e) =>
                        handleBasicChange("willingToRelocate", e.target.value)
                      }
                    >
                      <option value="">Willing to relocate? *</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="maybe">Maybe</option>
                    </select>
                    <input
                      className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="Preferred locations (if any)"
                      value={basicInfo.preferredLocations}
                      onChange={(e) =>
                        handleBasicChange(
                          "preferredLocations",
                          e.target.value
                        )
                      }
                    />
                    <input
                      className="md:col-span-2 rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      placeholder="LinkedIn profile (optional)"
                      value={basicInfo.linkedin}
                      onChange={(e) =>
                        handleBasicChange("linkedin", e.target.value)
                      }
                    />
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">
                        Resume (PDF / DOC) *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="text-[11px]"
                        onChange={(e) =>
                          setResumeFile(e.target.files?.[0] ?? null)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {stepIndex === 3 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold">
                    Step 4 — Role questions
                  </h2>
                  {!activeRole ? (
                    <p className="text-xs text-rose-600">
                      Please go back and select a role in Step 2.
                    </p>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground">
                        {activeRole.name} ·{" "}
                        {activeDept ? activeDept.name : "Department"}
                      </p>
                      <div className="mt-2 space-y-3 text-xs">
                        {questions.length === 0 && (
                          <p className="text-muted-foreground">
                            There are no additional questions for this role. You
                            can still share any details in the message box
                            below.
                          </p>
                        )}
                        {questions.map((q) => (
                          <div key={q.id} className="space-y-1">
                            <label className="block text-[11px] font-medium text-foreground">
                              {q.label}
                              {q.required && (
                                <span className="ml-0.5 text-rose-500">*</span>
                              )}
                            </label>
                            {q.type === "yesno" ? (
                              <div className="flex gap-4 text-[11px]">
                                {["yes", "no"].map((val) => (
                                  <label
                                    key={val}
                                    className="inline-flex items-center gap-1"
                                  >
                                    <input
                                      type="radio"
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
                            ) : (
                              <textarea
                                rows={q.type === "number" ? 1 : 3}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                                value={roleAnswers[q.id] ?? ""}
                                onChange={(e) =>
                                  setRoleAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: e.target.value,
                                  }))
                                }
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {stepIndex === 4 && (
                <div className="space-y-4 text-xs">
                  <h2 className="text-sm font-semibold">
                    Step 5 — Review & submit
                  </h2>
                  <p className="text-muted-foreground">
                    Quickly review all details before submitting your
                    application.
                  </p>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                      <div className="text-[11px] font-semibold text-muted-foreground">
                        Department & role
                      </div>
                      <div className="mt-1 space-y-1">
                        <p>
                          <span className="font-medium">Department: </span>
                          {activeDept?.name ?? "-"}
                        </p>
                        <p>
                          <span className="font-medium">Role: </span>
                          {activeRole?.name ?? "-"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/40 p-3 md:col-span-2">
                      <div className="text-[11px] font-semibold text-muted-foreground">
                        Basic info
                      </div>
                      <div className="mt-1 grid gap-y-1 gap-x-4 md:grid-cols-2">
                        <p>
                          <span className="font-medium">Name: </span>
                          {basicInfo.fullName || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Email: </span>
                          {basicInfo.email || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Phone: </span>
                          {basicInfo.phone || "-"}
                        </p>
                        <p>
                          <span className="font-medium">City: </span>
                          {basicInfo.currentCity || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Experience: </span>
                          {basicInfo.totalExperienceYears
                            ? `${basicInfo.totalExperienceYears} years`
                            : "-"}
                        </p>
                        <p>
                          <span className="font-medium">Expected CTC: </span>
                          {basicInfo.expectedCTC || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Relocation: </span>
                          {basicInfo.willingToRelocate || "-"}
                        </p>
                        <p>
                          <span className="font-medium">LinkedIn: </span>
                          {basicInfo.linkedin || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/40 p-3">
                    <div className="text-[11px] font-semibold text-muted-foreground">
                      Role-specific answers
                    </div>
                    <div className="mt-1 space-y-1">
                      {questions.length === 0 && (
                        <p className="text-muted-foreground">
                          No role questions answered.
                        </p>
                      )}
                      {questions.map((q) => (
                        <div
                          key={q.id}
                          className="flex flex-col gap-1 md:flex-row md:items-baseline"
                        >
                          <span className="md:w-1/2 text-muted-foreground">
                            {q.label}
                          </span>
                          <span className="md:w-1/2 md:pl-2">
                            {roleAnswers[q.id]?.trim() || "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* NAV BUTTONS */}
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="rounded-full px-4 text-xs"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back
                </Button>

                {stepIndex < steps.length - 1 ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleNext}
                    className="rounded-full px-6 text-xs"
                  >
                    Next
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-full px-6 text-xs"
                  >
                    {submitting ? "Submitting..." : "Submit application"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
