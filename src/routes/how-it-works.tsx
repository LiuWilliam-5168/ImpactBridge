import { createFileRoute, Link } from "@tanstack/react-router";

import { HowItWorks } from "@/components/sections/HowItWorks";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How ImpactBridge works — from local need to working energy system" },
      {
        name: "description",
        content:
          "Communities share their energy needs, ImpactBridge creates the match with solutions, funding and volunteers, and people make it happen.",
      },
      { property: "og:title", content: "How ImpactBridge works" },
      {
        property: "og:description",
        content: "A three-step process connecting communities, partners and volunteers.",
      },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            A simple bridge between needs, resources and people
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            ImpactBridge turns scattered local information into a project concept that funders,
            partners and volunteers can act on — and keeps the community in the lead.
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="py-20 sm:py-24">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-md text-2xl font-semibold sm:text-3xl">
            Ready to see where your community stands?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/communities">Start a project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/projects">Explore projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
