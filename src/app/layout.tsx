import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SiteNavbar from "@/components/layout/site-navbar";
import SiteFooter from "@/components/layout/site-footer";
import FloatingCta from "@/components/layout/floating-cta";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Element Tree | Digital Infrastructure for Maritime & Workforce",
  description:
    "Navigate, Learn LMS, iCheck and Zenith HRMS – a connected suite for maritime training, inspections, HR, payroll, safety and cyber awareness.",
  keywords: [
    "Element Tree",
    "maritime training",
    "ship inspections",
    "SIRE 2.0",
    "RISQ",
    "HRMS India",
    "payroll software India",
    "LMS maritime",
    "crew training",
    "3D safety training",
    "cyber safety awareness",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteNavbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingCta />
        </div>
      </body>
    </html>
  );
}
