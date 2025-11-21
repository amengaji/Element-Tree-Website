// src/components/layout/site-navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const productLinks = [
  { label: "Navigate", href: "/products/navigate" },
  { label: "Learn LMS", href: "/products/learn" },
  { label: "iCheck", href: "/products/icheck" },
  { label: "Zenith HRMS", href: "/products/zenith" },
];

const solutionLinks = [
  { label: "Maritime Training", href: "/solutions/maritime-training" },
  { label: "HR & Payroll Automation", href: "/solutions/hr-payroll" },
  { label: "Digital Ship Inspections", href: "/solutions/inspections" },
  { label: "Online Exams & Proctoring", href: "/solutions/exams-proctoring" },
  { label: "Safety 3D Training Modules", href: "/solutions/safety-3d" },
  { label: "Cyber Safety Awareness", href: "/solutions/cyber-awareness" },
];

const topLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Element Tree Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-10 text-[16px] font-medium">
            <Link
              href="/"
              className={cn(
                "hover:text-[#3194A0] transition-colors",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>

            {/* PRODUCTS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("products")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                className={cn(
                  "hover:text-[#3194A0] transition-colors",
                  openMenu === "products"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Products
              </button>

              {/* Hover bridge */}
              <div className="absolute left-0 top-full h-4 w-full" />

              {openMenu === "products" && (
                <div className="absolute left-0 top-full mt-2 animate-fade-up">
                  <div className="rounded-lg border border-border/70 bg-background/95 shadow-xl backdrop-blur-sm w-72 p-2">
                    {productLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-[#3194A0] transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SOLUTIONS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("solutions")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                className={cn(
                  "hover:text-[#3194A0] transition-colors",
                  openMenu === "solutions"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Solutions
              </button>

              {/* Hover bridge */}
              <div className="absolute left-0 top-full h-4 w-full" />

              {openMenu === "solutions" && (
                <div className="absolute left-0 top-full mt-2 animate-fade-up">
                  <div className="rounded-lg border border-border/70 bg-background/95 shadow-xl backdrop-blur-sm w-80 p-2">
                    {solutionLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-[#3194A0] transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* OTHER LINKS */}
            {topLinks
              .filter((l) => l.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "hover:text-[#3194A0] transition-colors",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden lg:flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-soft-lg hover:-translate-y-[1px]"
          >
            Book a demo
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <button className="h-10 w-10 flex items-center justify-center rounded-full border border-border/60">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-10 space-y-6 text-base font-medium">
                <Link href="/" className="block">
                  Home
                </Link>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Products
                  </p>
                  <div className="mt-3 space-y-2">
                    {productLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Solutions
                  </p>
                  <div className="mt-3 space-y-2">
                    {solutionLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {topLinks
                  .filter((l) => l.href !== "/")
                  .map((item) => (
                    <Link key={item.href} href={item.href} className="block">
                      {item.label}
                    </Link>
                  ))}

                <Link
                  href="/contact"
                  className="mt-5 block rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-soft"
                >
                  Book a demo
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
