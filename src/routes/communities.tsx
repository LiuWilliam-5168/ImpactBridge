import { createFileRoute } from "@tanstack/react-router";
import { FileText, Handshake, Users } from "lucide-react";

import { AssessmentSection } from "@/components/AssessmentSection";
import heroImage from "@/assets/hero-community.jpg";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "For Communities — turn your energy needs into a project | ImpactBridge" },
      {
        name: "description",
        content:
          "Share information about your community and receive a preliminary energy project concept plus connections to funding, partners and volunteers.",
      },
      { property: "og:title", content: "For Communities — ImpactBridge" },
      {
        property: "og:description",
        content: "Turn your community's energy needs into a fundable project concept.",
      },
    ],
  }),
  component: CommunitiesPage,
});

const support = [
  {
    icon: FileText,
    title: "A concept you can share",
    body: "A structured project outline with solution type, components, funding range and required skills.",
  },
  {
    icon: Handshake,
    title: "Routes to funding",
    body: "Matched against foundations, impact funds and partner programmes active in your region.",
  },
  {
    icon: Users,
    title: "People who can help",
    body: "Technical partners and volunteers whose skills fit the specific gaps in your project.",
  },
];

function CommunitiesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">For communities</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Turn your energy needs into a project.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              You know your community best. Tell us about your location, people, facilities and local
              skills — we will translate it into a preliminary energy concept and open the doors to
              partners.
            </p>
            <div className="mt-10 space-y-6">
              {support.map(({ icon: Icon, ...s }) => (
                <div key={s.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">{s.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <img
            src={heroImage}
            alt="Local technicians installing solar panels on a village rooftop at sunset"
            width={1408}
            height={1008}
            className="w-full rounded-3xl border border-border object-cover shadow-card"
          />
        </div>
      </section>

      <AssessmentSection />
    </>
  );
}
