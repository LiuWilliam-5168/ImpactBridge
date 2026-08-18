import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { AssessmentSection } from "@/components/AssessmentSection";
import { FundingBar } from "@/components/ProjectCard";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Impact } from "@/components/sections/Impact";
import { Pathways } from "@/components/sections/Pathways";
import { WorldMap } from "@/components/WorldMap";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ImpactBridge — Energy access. Human connection. Real impact." },
      {
        name: "description",
        content:
          "ImpactBridge connects communities with renewable energy solutions, funding and people around the world.",
      },
      { property: "og:title", content: "ImpactBridge — Energy access. Human connection. Real impact." },
      {
        property: "og:description",
        content:
          "Connect rural communities with renewable energy solutions, funding, partners and skilled volunteers.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = projects[0]!;

  return (
    <>
      <section className="overflow-hidden pb-16 pt-16 sm:pt-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Community energy platform · 4 countries
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Energy access.
              <br />
              Human connection.
              <br />
              <span className="text-primary">Real impact.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              ImpactBridge connects communities with renewable energy solutions, funding and people
              around the world.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/projects">
                  Explore projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/communities">Start a community project</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <WorldMap />
            </div>

            <div className="card-soft mx-auto -mt-10 w-[min(22rem,100%)] p-5 sm:-mt-12 sm:ml-6">
              <p className="eyebrow">Featured project</p>
              <h2 className="mt-2 text-lg font-semibold">Solar Microgrid – Kenya</h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span>120 households</span>
                <span>$32,000 needed</span>
              </div>
              <div className="mt-4">
                <FundingBar percent={70} />
                <p className="mt-2 text-xs font-medium text-primary">70% funded</p>
              </div>
              <Button asChild size="sm" className="mt-5 w-full rounded-full">
                <Link to="/projects/$projectId" params={{ projectId: featured.id }}>
                  View project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Pathways />
      <HowItWorks />
      <AssessmentSection />
      <Impact />

      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Our vision</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Connecting people, not just infrastructure
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              A world where every community can access the energy, resources, knowledge and people
              needed to build a sustainable future.
            </p>
            <p className="text-ink">
              ImpactBridge is about more than energy infrastructure. It is about connecting people.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/about">Read our vision</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
