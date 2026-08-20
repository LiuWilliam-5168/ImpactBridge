import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { NicaraguaMap } from "@/components/NicaraguaMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterOptions, fundingPercent, projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Clean water projects across Nicaragua | ImpactBridge" },
      {
        name: "description",
        content:
          "Browse community clean-water projects in Nicaragua seeking funding, partners and skilled volunteers — filter by region, project type, skills and duration.",
      },
      { property: "og:title", content: "Projects — ImpactBridge" },
      {
        property: "og:description",
        content:
          "Find Nicaragua clean-water projects that match your funding, skills or interests.",
      },
    ],
  }),
  component: ProjectsPage,
});

function monthsOf(duration: string) {
  const n = Number.parseInt(duration, 10);
  return Number.isNaN(n) ? 1 : duration.includes("week") ? 1 : n;
}

function ProjectsPage() {
  const [location, setLocation] = useState("All locations");
  const [type, setType] = useState("All types");
  const [skill, setSkill] = useState("All skills");
  const [funding, setFunding] = useState("Any status");
  const [duration, setDuration] = useState("Any duration");
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const months = monthsOf(p.duration);
        return (
          (location === "All locations" || p.region === location) &&
          (type === "All types" || p.type === type) &&
          (skill === "All skills" || p.skills.includes(skill)) &&
          (funding === "Any status" || p.status === funding) &&
          (duration === "Any duration" ||
            (duration === "Under 6 months" && months < 6) ||
            (duration === "6–12 months" && months >= 6 && months <= 12) ||
            (duration === "Over 12 months" && months > 12))
        );
      }),
    [location, type, skill, funding, duration],
  );

  const active = projects.find((p) => p.id === activeId);

  const filters = [
    { label: "Location", value: location, set: setLocation, options: filterOptions.location },
    { label: "Project type", value: type, set: setType, options: filterOptions.type },
    { label: "Skills", value: skill, set: setSkill, options: filterOptions.skills },
    { label: "Funding status", value: funding, set: setFunding, options: filterOptions.funding },
    { label: "Duration", value: duration, set: setDuration, options: filterOptions.duration },
  ];

  return (
    <>
      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <div className="container-page">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
            Clean-water projects, shaped with the communities that run them
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every project across Nicaragua was designed with its community. Filter for what you can
            fund or contribute.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {filters.map((f) => (
              <div key={f.label}>
                <label className="eyebrow mb-2 block">{f.label}</label>
                <Select value={f.value} onValueChange={f.set}>
                  <SelectTrigger className="w-full rounded-full bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                No projects match these filters yet — try widening your search.
              </p>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-soft p-6">
              <h2 className="text-lg font-semibold">Map view</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Select a marker to preview a project location.
              </p>
              <NicaraguaMap className="mt-4" activeId={activeId} onSelect={setActiveId} />
              {active ? (
                <div className="mt-2 rounded-2xl bg-secondary p-4">
                  <p className="text-sm font-semibold">
                    {active.name} — {active.region}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {active.people.toLocaleString()} people · {fundingPercent(active)}% funded
                  </p>
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: active.id }}
                    className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    View project →
                  </Link>
                </div>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  {projects.length} active projects across{" "}
                  {new Set(projects.map((p) => p.region)).size} regions of Nicaragua.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
