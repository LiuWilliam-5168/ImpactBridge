import { cn } from "@/lib/utils";

/**
 * ImpactBridge lockup (bridge + leaf mark with the wordmark).
 * The artwork lives in `public/logo.png` and is served from the site root.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo_landscape.png"
      alt="ImpactBridge"
      width={685}
      height={114}
      className={cn("h-8 w-auto", className)}
    />
  );
}
