import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Stylised map of Ghana with green project markers.
 * The outline is an approximate silhouette (not survey-accurate); markers use
 * each project's map coordinates in percent of the viewport.
 */

// Rough Ghana outline in a 0–100 viewBox (y grows downward).
const OUTLINE: [number, number][] = [
  [30, 14],
  [50, 12],
  [67, 13],
  [70, 26],
  [64, 40],
  [73, 52],
  [70, 66],
  [71, 80],
  [58, 87],
  [44, 86],
  [30, 80],
  [27, 62],
  [33, 44],
  [27, 28],
];

function pointInPolygon(x: number, y: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]!;
    const [xj, yj] = poly[j]!;
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

const outlinePath = OUTLINE.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ") + " Z";

const dots: { x: number; y: number }[] = [];
for (let x = 24; x <= 76; x += 2.6) {
  for (let y = 10; y <= 90; y += 3.4) {
    if (pointInPolygon(x, y, OUTLINE)) dots.push({ x, y });
  }
}

export function GhanaMap({
  className,
  activeId,
  onSelect,
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className={cn("relative aspect-[4/3] w-full", className)}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        role="img"
        aria-label="Map of ImpactBridge clean-water projects across Ghana"
      >
        <path
          d={outlinePath}
          fill="var(--color-sage)"
          fillOpacity="0.5"
          stroke="var(--color-primary)"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r="0.5"
            fill="var(--color-primary)"
            fillOpacity="0.22"
          />
        ))}
      </svg>

      {projects.map((p) => {
        const active = activeId === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect?.(p.id)}
            aria-label={`${p.name} — ${p.region}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.map.x}%`, top: `${p.map.y}%` }}
          >
            <span
              className={cn(
                "block h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15 transition-all duration-300",
                active
                  ? "scale-125 ring-primary/30"
                  : "group-hover:scale-125 group-hover:ring-primary/30",
              )}
            />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-ink opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100">
              {p.region}
            </span>
          </button>
        );
      })}
    </div>
  );
}
