import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Globe2, HeartHandshake, Home, Users } from "lucide-react";

import volunteerImage from "@/assets/volunteer-exchange.jpg";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "For Volunteers — become part of a community | ImpactBridge" },
      {
        name: "description",
        content:
          "Contribute your skills to renewable energy projects, live with local communities and take part in real cultural exchange.",
      },
      { property: "og:title", content: "For Volunteers — ImpactBridge" },
      {
        property: "og:description",
        content: "Contribution, learning and cultural exchange on community energy projects.",
      },
    ],
  }),
  component: VolunteersPage,
});

const pillars = [
  {
    icon: HeartHandshake,
    title: "Contribution",
    body: "Work on a defined role with clear technical or social outcomes for the community.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    body: "Build field experience in off-grid energy systems alongside local technicians.",
  },
  {
    icon: Globe2,
    title: "Cultural exchange",
    body: "Live with host families, share meals and language, and stay connected afterwards.",
  },
];

const profileFields = [
  { label: "Skills", value: "Electrical engineering · Solar PV design" },
  { label: "Education", value: "MSc Renewable Energy Systems" },
  { label: "Professional experience", value: "4 years, distributed energy projects" },
  { label: "Languages", value: "English (fluent) · Swahili (basic)" },
  { label: "Interests", value: "Off-grid microgrids · Community training" },
  { label: "Availability", value: "2–4 weeks, from September" },
];

function VolunteersPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">For volunteers</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Don't just visit a place.{" "}
              <span className="text-primary">Become part of a community.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              ImpactBridge is not simply a volunteer marketplace. Every placement is tied to a real
              energy project, a real host community and a defined contribution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/projects">Find a project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/community">Meet other volunteers</Link>
              </Button>
            </div>
          </div>
          <img
            src={volunteerImage}
            alt="Volunteer and community members sharing a meal outdoors"
            width={1400}
            height={900}
            className="w-full rounded-3xl border border-border object-cover shadow-card"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, ...p }) => (
            <div key={p.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage">
                <Icon className="h-4 w-4 text-primary" strokeWidth={1.6} />
              </span>
              <div>
                <h2 className="text-base font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold sm:text-3xl">Open opportunities</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article key={p.id} className="card-soft card-hover flex flex-col overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.community}, ${p.country}`}
                  loading="lazy"
                  width={1400}
                  height={900}
                  className="h-40 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-muted-foreground">{p.country}</p>
                  <h3 className="mt-1.5 text-lg font-semibold">
                    {p.name} — {p.country}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{p.duration} experience</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Skills: {p.skills.slice(0, 2).join(" · ")}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Home className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p.experience.accommodation}
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p.experience.culture}
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p.experience.volunteers} volunteers on this project
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.experience.activities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="mt-6 w-full rounded-full">
                    <Link to="/projects/$projectId" params={{ projectId: p.id }}>
                      Explore opportunity
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Volunteer profile</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              One profile, matched to the projects that need you
            </h2>
            <p className="mt-4 text-muted-foreground">
              Your profile is the basis for future skill-based matching between volunteers and
              community projects.
            </p>
          </div>
          <div className="card-soft divide-y divide-border">
            {profileFields.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:justify-between">
                <span className="eyebrow">{f.label}</span>
                <span className="text-sm text-ink sm:text-right">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
