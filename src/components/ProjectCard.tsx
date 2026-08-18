import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fundingPercent, formatEuro, type Project } from "@/lib/projects";

export function FundingBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-700"
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const percent = fundingPercent(project);

  return (
    <article className="card-soft card-hover flex flex-col overflow-hidden">
      <img
        src={project.image}
        alt={`${project.name} in ${project.country}`}
        loading="lazy"
        width={1400}
        height={900}
        className="h-44 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.country}
          <span className="mx-1 text-border">·</span>
          {project.type}
        </div>

        <h3 className="mt-2 text-lg font-semibold">
          {project.name} — {project.country}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.challenge}</p>

        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Solution</dt>
            <dd className="text-right font-medium text-ink">{project.solutionShort}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Households</dt>
            <dd className="font-medium text-ink">{project.households}</dd>
          </div>
        </dl>

        <div className="mt-4">
          <FundingBar percent={percent} />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span className="font-medium text-primary">{percent}% funded</span>
            <span>{formatEuro(project.fundingGoal)} needed</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-sage px-2.5 py-1 text-[11px] font-medium text-sage-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {project.volunteersNeeded} volunteers needed
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {project.duration}
          </span>
        </div>

        <Button asChild variant="outline" className="mt-6 w-full rounded-full">
          <Link to="/projects/$projectId" params={{ projectId: project.id }}>
            View project
          </Link>
        </Button>
      </div>
    </article>
  );
}
