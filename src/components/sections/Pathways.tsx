import { Link } from "@tanstack/react-router";
import { Building2, Compass, Droplets, HandCoins } from "lucide-react";

import { Button } from "@/components/ui/button";

const pathways = [
  {
    icon: Droplets,
    title: "For Communities",
    tagline: "Turn your water problem into a project.",
    body: "Tell us about your community and get connected to funding, partners and volunteers to build a lasting water solution.",
    cta: "Start a project",
    to: "/communities" as const,
  },
  {
    icon: HandCoins,
    title: "For NGOs",
    tagline: "Fund water that communities run.",
    body: "Back vetted, community-led clean-water projects across Ghana with transparent tracking and field-level reporting.",
    cta: "Fund a project",
    to: "/ngos" as const,
  },
  {
    icon: Building2,
    title: "For Companies",
    tagline: "Sponsor impact, get ESG reporting.",
    body: "Direct CSR budget into measurable water projects and receive verified, audit-ready impact reports aligned to SDG 6.",
    cta: "Explore sponsorship",
    to: "/companies" as const,
  },
  {
    icon: Compass,
    title: "For Volunteers",
    tagline: "Use your skills. Make a difference.",
    body: "Contribute your skills on real clean-water projects while living with and learning from local communities.",
    cta: "Find a project",
    to: "/volunteers" as const,
  },
];

export function Pathways() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
