import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, FileCheck2, HandCoins, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { AssistantWorkspace } from "@/components/assistant/AssistantWorkspace";
import { MatchResults } from "@/components/assistant/MatchResults";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ngosEngine } from "@/lib/assistant";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/ngos")({
  head: () => ({
    meta: [
      { title: "For NGOs & funders — fund clean water in Ghana | ImpactBridge" },
      {
        name: "description",
        content:
          "Fund vetted, community-led clean-water projects in Ghana with transparent fund tracking and field-level reporting on every dollar.",
      },
      { property: "og:title", content: "For NGOs & funders — ImpactBridge" },
      {
        property: "og:description",
        content: "Vetted, community-led clean-water projects in Ghana with transparent reporting.",
      },
    ],
  }),
  component: NgosPage,
});

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Vetted & community-led",
    body: "Every project is scoped with the community that will own and run it, and screened for technical and financial viability before it is listed.",
  },
  {
    icon: HandCoins,
    title: "Transparent fund tracking",
    body: "See exactly what your contribution funds — from drilling to commissioning — with milestones tied to disbursement.",
  },
  {
    icon: BarChart3,
    title: "Field-level reporting",
    body: "Regular updates from the ground: people reached, water points working, and photos direct from the community.",
  },
  {
    icon: FileCheck2,
    title: "Low overhead",
    body: "Funds are concentrated on delivery and local capacity, not layers of administration. Reporting is built in, not bolted on.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose where to give",
    body: "Fund a specific project, a region, or a portfolio of clean-water work matched to your mission.",
  },
  {
    number: "02",
    title: "We deliver with the community",
    body: "Local teams and skilled volunteers implement the project, with milestones you can follow the whole way.",
  },
  {
    number: "03",
    title: "You see the impact",
    body: "Receive field updates and a close-out report with the numbers that matter for your own reporting.",
  },
];

function NgosPage() {
  const fundable = projects.filter((p) => p.status === "Seeking funding").slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">For NGOs &amp; funders</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Fund clean water that communities <span className="text-primary">actually run.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            ImpactBridge gives grant-makers and foundations a pipeline of vetted, community-led
            clean-water projects across Ghana — with the transparency and reporting your board and
            donors expect.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/projects">Browse projects to fund</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() =>
                toast.success("Thanks — a partnerships lead would be in touch to set up a call.")
              }
            >
              Talk to our team
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <AssistantWorkspace
            eyebrow="Funding assistant"
            title="Find the projects that fit your mission"
            lead="Describe your funding focus — regions, causes and typical grant size — and the assistant shortlists the projects that best match, then refines as you tell it more."
            engine={ngosEngine}
            outputTitle="Your shortlist"
            renderOutput={(output) => (
              <MatchResults
                state={output}
                emptyHint="Describe your funding focus above and your best-fit projects will appear here."
              />
            )}
          />
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <div className="container-page grid gap-8 md:grid-cols-2">
          {valueProps.map(({ icon: Icon, ...v }) => (
            <div key={v.title} className="card-soft flex gap-4 p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
              </span>
              <div>
                <h2 className="text-lg font-semibold">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow">Ready for funding</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Projects seeking a funding partner
              </h2>
            </div>
            <Link to="/projects" className="text-sm font-medium text-primary hover:underline">
              View all projects →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundable.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">How partnership works</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              From your grant to water on the ground
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.number}>
                <p className="text-sm font-medium text-primary">{s.number}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Fund your first project</h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Tell us your focus regions and budget, and we will match you with projects ready to
              go.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/projects">Review open projects</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() =>
                toast.success("Thanks — a partnerships lead would be in touch to set up a call.")
              }
            >
              Talk to our team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
