import { createFileRoute, Link } from "@tanstack/react-router";

import volunteerImage from "@/assets/volunteer-exchange.jpg";
import { Impact } from "@/components/sections/Impact";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ImpactBridge — our vision for community energy" },
      {
        name: "description",
        content:
          "A world where every community can access the energy, resources, knowledge and people needed to build a sustainable future.",
      },
      { property: "og:title", content: "About ImpactBridge" },
      {
        property: "og:description",
        content: "More than energy infrastructure — ImpactBridge is about connecting people.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Community-led",
    body: "Projects start with local knowledge and stay under local ownership. We add structure, not direction.",
  },
  {
    title: "Technically honest",
    body: "Our AI assessment gives an orientation concept, clearly labelled as preliminary. Engineering follows a site survey.",
  },
  {
    title: "Built on relationships",
    body: "Funders, partners and volunteers stay connected to the community long after commissioning.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Our vision</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              A world where every community can build its own energy future
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A world where every community can access the energy, resources, knowledge and people
              needed to build a sustainable future.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              ImpactBridge is about more than energy infrastructure. It is about connecting people.
            </p>
          </div>
          <img
            src={volunteerImage}
            alt="A volunteer sharing a meal with community members at sunset"
            loading="lazy"
            width={1400}
            height={900}
            className="w-full rounded-3xl border border-border object-cover shadow-card"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="card-soft p-7">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Impact />

      <section className="border-t border-border bg-surface py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Become a partner</h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Help finance, develop or implement renewable energy projects in underserved
              communities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/projects">Review open projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/community">Meet the community</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
