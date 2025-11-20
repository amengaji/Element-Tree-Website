"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Mail, LayoutDashboard, Briefcase, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Enquiries",
      href: "/admin/enquiries",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      label: "Careers",
      href: "/admin/careers",
      icon: <Briefcase className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* SIDEBAR */}
      <aside className="w-60 bg-background/95 border-r border-border/60 backdrop-blur">
        <div className="p-5 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              ET
            </span>
            <div>
              <p className="text-sm font-semibold">Element Tree</p>
              <p className="text-[11px] text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted/40"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}

          {/* LOGOUT */}
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 mt-4"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
