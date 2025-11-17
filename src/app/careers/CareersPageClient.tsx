"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DEPARTMENTS } from "./CareersWizard";

export default function CareersPageClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const canGoNext = stepIndex === 0 ? !!selectedDept : !!selectedRole;

  const goNext = () => {
    if (!canGoNext) return;
    setStepIndex(stepIndex + 1);
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setStepIndex(stepIndex - 1);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Join Element Tree</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Explore opportunities across different departments and help shape the
        future of maritime technology.
      </p>

      {/* ======================== STEP 1 – DEPARTMENT SELECTION ======================== */}
      {stepIndex === 0 && (
        <div className="space-y-6">
          <h2 className="text-sm font-semibold">Step 1 — Select department</h2>
          <p className="text-xs text-muted-foreground">
            Choose the team that fits your background. Roles preview is shown
            inside each card.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
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
                    "group text-left rounded-2xl border bg-background/80 px-6 py-6 shadow-sm transition-all",
                    "hover:border-emerald-400 hover:bg-emerald-50/60 hover:shadow-md",
                    selected &&
                      "border-emerald-500 bg-emerald-50 shadow-soft-lg"
                  )}
                >
                  {/* Title */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold">{dept.name}</h3>
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition",
                        selected ? "bg-emerald-500" : "bg-border"
                      )}
                    ></span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Role preview */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dept.roles.slice(0, 3).map((r) => (
                      <span
                        key={r.key}
                        className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-600"
                      >
                        {r.name}
                      </span>
                    ))}

                    {dept.roles.length > 3 && (
                      <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                        +{dept.roles.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 text-[11px] font-medium text-emerald-600 group-hover:underline">
                    View all {dept.roles.length} roles →
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================== STEP 2 – ROLE SELECTION ======================== */}
      {stepIndex === 1 && (
        <div className="space-y-6">
          <h2 className="text-sm font-semibold">Step 2 — Select role</h2>
          <p className="text-xs text-muted-foreground">
            Choose a role you want to apply for.
          </p>

          <div className="grid gap-4">
            {DEPARTMENTS.find((d) => d.key === selectedDept)?.roles.map(
              (role) => {
                const selected = role.key === selectedRole;

                return (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setSelectedRole(role.key)}
                    className={cn(
                      "w-full text-left rounded-xl border px-4 py-4 transition-all",
                      "hover:border-emerald-400 hover:bg-emerald-50/60",
                      selected && "border-emerald-500 bg-emerald-50"
                    )}
                  >
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {role.description}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* ======================== FOOTER BUTTONS ======================== */}
      <div className="flex items-center justify-between mt-10">
        {stepIndex > 0 ? (
          <button
            onClick={goBack}
            className="text-sm px-4 py-2 rounded-md border hover:bg-muted"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={cn(
            "text-sm px-5 py-2 rounded-md bg-emerald-600 text-white",
            "disabled:bg-muted disabled:text-muted-foreground"
          )}
        >
          {stepIndex === 1 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}
