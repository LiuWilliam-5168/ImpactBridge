import { Building2, HeartHandshake, Sun, Users } from "lucide-react";

const stats = [
  { icon: Building2, value: "12", label: "Communities", sub: "supported" },
  { icon: Users, value: "1,850", label: "People", sub: "with improved energy access" },
  { icon: Sun, value: "8", label: "Projects", sub: "in development" },
  { icon: HeartHandshake, value: "42", label: "Volunteers", sub: "connected" },
];

export function Impact() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <p className="eyebrow">Impact so far</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">
          Measured in communities, not clicks
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
              <p className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{s.value}</p>
              <p className="mt-1 text-base font-medium text-ink">{s.label}</p>
              <p className="text-sm text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
