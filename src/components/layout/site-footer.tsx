//src/components/layout/site-footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background py-14">
      <TooltipProvider delayDuration={150}>
        <div className="container grid gap-10 md:grid-cols-4">
          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Element Tree</h3>
            <p className="text-sm text-muted-foreground">
              Digital infrastructure for maritime operators, training centers
              and HR teams. Training, inspections, HR, payroll and safety –
              stitched together the right way.
            </p>

        {/* ADVANCED SOCIAL ICONS */}
        <div className="flex items-center gap-5 pt-3">

          {/* FACEBOOK */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.facebook.com/elementree.global"
                target="_blank"
                className="group transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="
                    text-muted-foreground fill-current transition-all
                    group-hover:text-[#1877F2]
                    group-hover:scale-110
                    dark:group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.5)]
                  "
                >
                  <path d="M22.675 0h-21.35C.593 0 0 .594 0 1.326v21.348C0 23.406.593 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Facebook</TooltipContent>
          </Tooltip>

          {/* INSTAGRAM */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.instagram.com/elementree.global/"
                target="_blank"
                className="group transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="
                    fill-current text-muted-foreground
                    group-hover:text-[#E1306C]
                    group-hover:scale-110
                    transition-all
                    dark:group-hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]
                  "
                >
                  <path d="M7.001 2C4.243 2 2 4.243 2 7.001v9.998C2 19.757 4.243 22 7.001 22h9.998C19.757 22 22 19.757 22 17 22 4.243 19.757 2 17 2H7.001zM12 7.3c2.59 0 4.7 2.11 4.7 4.7S14.59 16.7 12 16.7 7.3 14.59 7.3 12 9.41 7.3 12 7.3zm5.25-.95a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" />
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Instagram</TooltipContent>
          </Tooltip>

          {/* LINKEDIN */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.linkedin.com/company/element-tree/"
                target="_blank"
                className="group transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="
                    fill-current text-muted-foreground
                    group-hover:text-[#0A66C2]
                    group-hover:scale-110
                    transition-all
                    dark:group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)]
                  "
                >
                  <path d="M4.983 3.5C4.983 4.604 4.092 5.5 2.983 5.5 1.875 5.5.983 4.604.983 3.5.983 2.395 1.875 1.5 2.983 1.5c1.109 0 2 0.895 2 2zm.017 4H1v14h4V7.5zm5.982 0H7v14h4v-7c0-2.209 3-2.401 3 0v7h4v-8.5c0-5.059-5.134-4.872-6-2.382v-1.118z"/>
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>LinkedIn</TooltipContent>
          </Tooltip>

          {/* X (TWITTER) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://x.com/TreeElement"
                target="_blank"
                className="group transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="
                    fill-current text-muted-foreground
                    group-hover:text-white
                    group-hover:scale-110
                    transition-all
                    dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                  "
                >
                  <path d="M18.244 2H21l-6.52 7.455L22.744 22h-6.87l-4.82-6.413L5.32 22H2.564l6.98-8.001L1.256 2h6.87l4.36 5.824L18.244 2zM16.806 20.21h1.898L7.242 3.718H5.166l11.64 16.492z"/>
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>X (Twitter)</TooltipContent>
          </Tooltip>

          {/* YOUTUBE */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.youtube.com/@elementtree2287"
                target="_blank"
                className="group transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="
                    fill-current text-muted-foreground
                    group-hover:text-[#FF0000]
                    group-hover:scale-110
                    transition-all
                    dark:group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]
                  "
                >
                  <path d="M23.498 6.186a2.974 2.974 0 00-2.09-2.103C19.691 3.5 12 3.5 12 3.5s-7.69 0-9.408.583A2.974 2.974 0 00.502 6.186C0 7.915 0 12 0 12s0 4.085.502 5.814a2.974 2.974 0 002.09 2.103C4.31 20.5 12 20.5 12 20.5s7.69 0 9.408-.583a2.974 2.974 0 002.09-2.103C24 16.085 24 12 24 12s0-4.085-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>YouTube</TooltipContent>
          </Tooltip>

        </div>



          </div>

          {/* PRODUCTS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products/navigate">Navigate</Link></li>
              <li><Link href="/products/learn">Learn LMS</Link></li>
              <li><Link href="/products/icheck">iCheck</Link></li>
              <li><Link href="/products/zenith">Zenith HRMS</Link></li>
            </ul>
          </div>

          {/* SOLUTIONS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/solutions/maritime-training">Maritime Training</Link></li>
              <li><Link href="/solutions/hr-payroll">HR &amp; Payroll Automation</Link></li>
              <li><Link href="/solutions/inspections">Digital Ship Inspections</Link></li>
              <li><Link href="/solutions/exams-proctoring">Online Exams &amp; Proctoring</Link></li>
              <li><Link href="/solutions/safety-3d">Safety 3D Training</Link></li>
              <li><Link href="/solutions/cyber-awareness">Cyber Safety Awareness</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="container mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Element Tree. All rights reserved.
        </div>
      </TooltipProvider>
    </footer>
  );
}
