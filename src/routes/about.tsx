import { createFileRoute, Link } from "@tanstack/react-router";

import volunteerImage from "@/assets/volunteer-exchange.jpg";
import { Impact } from "@/components/sections/Impact";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ImpactBridge — our vision for community water in Nicaragua" },
      {
        name: "description",
        content:
          "A Nicaragua where every community can access the clean water, resources, knowledge and people needed to build a healthy future.",
      },
      { property: "og:title", content: "About ImpactBridge" },
      {
        property: "og:description",
        content: "More than boreholes and pipes — ImpactBridge is about connecting people.",
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
    body: "Projects are scoped realistically and confirmed by a site survey before engineering. We do not over-promise on water.",
  },
  {
    title: "Built on relationships",
    body: "Funders, sponsors, partners and volunteers stay connected to the community long after the water is flowing.",
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
              A Nicaragua where every community can secure its own clean water
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A Nicaragua where every community can access the clean water, resources, knowledge and
              people needed to build a healthy future.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              ImpactBridge is about more than boreholes and pipes. It is about connecting people.
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
              Whether you are an NGO, a company or a skilled volunteer, help fund, build and sustain
              clean-water projects with communities across Nicaragua.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/ngos">Fund as an NGO</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/companies">Sponsor as a company</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
