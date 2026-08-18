import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Stylised dotted world map with green project markers.
 * Purely decorative geometry — markers use each project's map coordinates.
 */
export function WorldMap({
  className,
  activeId,
  onSelect,
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  const dots: { x: number; y: number }[] = [];
  const landmasses: { x0: number; x1: number; y0: number; y1: number }[] = [
    { x0: 18, x1: 34, y0: 18, y1: 44 }, // North America
    { x0: 26, x1: 36, y0: 56, y1: 82 }, // South America
    { x0: 46, x1: 58, y0: 16, y1: 34 }, // Europe
    { x0: 48, x1: 62, y0: 38, y1: 78 }, // Africa
    { x0: 58, x1: 82, y0: 20, y1: 52 }, // Asia
    { x0: 78, x1: 88, y0: 62, y1: 76 }, // Oceania
  ];

  for (let x = 8; x <= 94; x += 2.2) {
    for (let y = 12; y <= 86; y += 3.2) {
      if (landmasses.some((l) => x >= l.x0 && x <= l.x1 && y >= l.y0 && y <= l.y1)) {
        dots.push({ x, y });
      }
    }
  }

  return (
    <div className={cn("relative aspect-[4/3] w-full", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="World map of ImpactBridge projects">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="0.55" fill="var(--color-primary)" fillOpacity="0.18" />
        ))}
      </svg>

      {projects.map((p) => {
        const active = activeId === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect?.(p.id)}
            aria-label={`${p.name} — ${p.country}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.map.x}%`, top: `${p.map.y}%` }}
          >
            <span
              className={cn(
                "block h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15 transition-all duration-300",
                active ? "scale-125 ring-primary/30" : "group-hover:scale-125 group-hover:ring-primary/30",
              )}
            />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-ink opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
              {p.country}
            </span>
          </button>
        );
      })}
    </div>
  );
}
