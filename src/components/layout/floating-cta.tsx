import Link from "next/link";

export default function FloatingCta() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40">
      <div className="relative">
        <span className="ping-soft pointer-events-none" />
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground shadow-soft-lg transition hover:-translate-y-[1px]"
        >
          <span>Book a demo</span>
        </Link>
      </div>
    </div>
  );
}
