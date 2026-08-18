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
  const landmasses = [
    { x: [18, 34], y: [18, 44] }, // North America
    { x: [26, 36], y: [56, 82] }, // South America
    { x: [46, 58], y: [16, 34] }, // Europe
    { x: [48, 62], y: [38, 78] }, // Africa
    { x: [58, 82], y: [20, 52] }, // Asia
    { x: [78, 88], y: [62, 76] }, // Oceania
  ];

  for (let x = 8; x <= 94; x += 2.2) {
    for (let y = 12; y <= 86; y += 3.2) {
      if (landmasses.some((l) => x >= l.x[0] && x <= l.x[1] && y >= l.y[0] && y <= l.y[1])) {
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
