import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { FundingBar } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { formatEuro, fundingPercent, getProject } from "@/lib/projects";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable | ImpactBridge" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — ${project.country} | ImpactBridge`;
    const description = `${project.solutionShort} for ${project.community}, ${project.country}. ${fundingPercent(project)}% funded, ${project.volunteersNeeded} volunteers needed.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const percent = fundingPercent(project);

  return (
    <>
      <section className="pt-8">
        <div className="container-page">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <img
            src={project.image}
            alt={`${project.community} in ${project.country}`}
            width={1400}
            height={900}
            className="mt-6 h-[22rem] w-full rounded-3xl border border-border object-cover shadow-card sm:h-[26rem]"
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {project.country}
              </span>
              <span className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-sage-foreground">
                {project.status}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {project.duration}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              {project.name} for {project.community}
            </h1>

            <div className="mt-10 space-y-10">
              <div>
                <h2 className="text-xl font-semibold">The challenge</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{project.challenge}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">The proposed solution</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{project.solution}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">What is needed</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="card-soft p-5">
                    <p className="eyebrow">Funding</p>
                    <p className="mt-2 text-2xl font-semibold">{formatEuro(project.fundingGoal)}</p>
                  </div>
                  <div className="card-soft p-5">
                    <p className="eyebrow">Volunteers</p>
                    <p className="mt-2 text-2xl font-semibold">{project.volunteersNeeded}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {project.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold">Volunteer opportunities</h2>
                <div className="mt-4 space-y-3">
                  {project.roles.map((role) => (
                    <div
                      key={role.title}
                      className="card-soft card-hover flex flex-wrap items-center justify-between gap-4 p-5"
                    >
                      <div>
                        <p className="font-semibold">{role.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <span className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" /> {role.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-soft p-6">
              <h2 className="text-lg font-semibold">Funding progress</h2>
              <p className="mt-4 font-display text-3xl font-semibold text-primary">{percent}%</p>
              <div className="mt-3">
                <FundingBar percent={percent} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {formatEuro(project.fundingRaised)} raised of {formatEuro(project.fundingGoal)}
              </p>

              <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Households</dt>
                  <dd className="font-medium">{project.households}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">People reached</dt>
                  <dd className="font-medium">{project.people}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Solution</dt>
                  <dd className="text-right font-medium">{project.solutionShort}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Volunteers on site</dt>
                  <dd className="flex items-center gap-1.5 font-medium">
                    <Users className="h-4 w-4 text-primary" /> {project.experience.volunteers}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-2">
                <Button
                  className="w-full rounded-full"
                  size="lg"
                  onClick={() => toast.success("Thank you — a funding partner form would open here")}
                >
                  Support this project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full"
                  onClick={() =>
                    toast.success(`Application started for ${project.name} — ${project.country}`)
                  }
                >
                  Apply as volunteer
                </Button>
              </div>
            </div>

            <div className="card-soft mt-6 p-6">
              <p className="eyebrow">The experience</p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-ink">Accommodation. </span>
                {project.experience.accommodation}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-ink">Cultural exchange. </span>
                {project.experience.culture}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.experience.activities.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
