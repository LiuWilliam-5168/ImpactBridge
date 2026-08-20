import { cn } from "@/lib/utils";

/** Minimal abstract bridge arc combined with a water drop. Works at favicon size. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7 text-primary", className)}
    >
      <path
        d="M3 22c5.5 0 8.5-4 13-4s8.5 4 13 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M9 22v5M23 22v5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M16 3.5c0 0-5 5.8-5 9.2a5 5 0 0 0 10 0c0-3.4-5-9.2-5-9.2Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M13.6 12.8a2.6 2.6 0 0 0 1.9 2.4"
        stroke="var(--color-card)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.08rem] font-semibold tracking-tight text-ink">
        ImpactBridge
      </span>
    </span>
  );
}
