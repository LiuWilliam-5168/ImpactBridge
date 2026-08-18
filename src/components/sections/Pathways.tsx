import { Link } from "@tanstack/react-router";
import { Compass, Handshake, HousePlug } from "lucide-react";

import { Button } from "@/components/ui/button";

const pathways = [
  {
    icon: HousePlug,
    title: "For Communities",
    tagline: "Turn your energy needs into a project.",
    body: "Share information about your community and receive a preliminary energy concept and connections to potential partners.",
    cta: "Start a project",
    to: "/communities" as const,
  },
  {
    icon: Compass,
    title: "For Volunteers",
    tagline: "Use your skills. Make a difference.",
    body: "Discover projects where you can contribute your skills while experiencing local communities and cultures.",
    cta: "Find a project",
    to: "/volunteers" as const,
  },
  {
    icon: Handshake,
    title: "For Partners",
    tagline: "Support projects that create lasting impact.",
    body: "Help finance, develop or implement renewable energy projects in underserved communities.",
    cta: "Become a partner",
    to: "/about" as const,
  },
];

export function Pathways() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page grid gap-6 md:grid-cols-3">
        {pathways.map(({ icon: Icon, ...p }) => (
          <div key={p.title} className="card-soft card-hover flex flex-col p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm font-medium text-primary">{p.tagline}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            <Button asChild variant="outline" className="mt-6 w-full rounded-full">
              <Link to={p.to}>{p.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
