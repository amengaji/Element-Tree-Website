import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background py-14">
      <div className="container grid gap-10 md:grid-cols-4">
        {/* BRAND */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Element Tree</h3>
          <p className="text-sm text-muted-foreground">
            Digital infrastructure for maritime operators, training centers and
            HR teams. Training, inspections, HR, payroll and safety – stitched
            together the right way.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Products</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/products/navigate">Navigate</Link>
            </li>
            <li>
              <Link href="/products/learn">Learn LMS</Link>
            </li>
            <li>
              <Link href="/products/icheck">iCheck</Link>
            </li>
            <li>
              <Link href="/products/zenith">Zenith HRMS</Link>
            </li>
          </ul>
        </div>

        {/* SOLUTIONS */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Solutions</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/solutions/maritime-training">Maritime Training</Link>
            </li>
            <li>
              <Link href="/solutions/hr-payroll">
                HR &amp; Payroll Automation
              </Link>
            </li>
            <li>
              <Link href="/solutions/inspections">
                Digital Ship Inspections
              </Link>
            </li>
            <li>
              <Link href="/solutions/exams-proctoring">
                Online Exams &amp; Proctoring
              </Link>
            </li>
            <li>
              <Link href="/solutions/safety-3d">Safety 3D Training</Link>
            </li>
            <li>
              <Link href="/solutions/cyber-awareness">
                Cyber Safety Awareness
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Element Tree. All rights reserved.
      </div>
    </footer>
  );
}
