import { ProjectCard } from "@/components/ProjectCard";
import type { MatchState } from "@/lib/assistant";

export function MatchResults({ state, emptyHint }: { state: MatchState; emptyHint: string }) {
  if (state.matches.length === 0) {
    return (
      <div className="flex h-full min-h-56 items-center justify-center text-center">
        <p className="max-w-xs text-sm text-muted-foreground">{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {state.matches.map((m, i) => (
        <div key={m.project.id}>
          <p className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage text-[11px] text-sage-foreground">
              {i + 1}
            </span>
            Best match · {m.reason}
          </p>
          <ProjectCard project={m.project} />
        </div>
      ))}
    </div>
  );
}
