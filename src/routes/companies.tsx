import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Check, Droplets, FileText, Megaphone, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";

import { AssistantWorkspace } from "@/components/assistant/AssistantWorkspace";
import { Button } from "@/components/ui/button";
import { companiesEngine, type CompanyRec } from "@/lib/assistant";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "For companies — sponsor water, get ESG reporting | ImpactBridge" },
      {
        name: "description",
        content:
          "Sponsor clean-water projects in Nicaragua and receive audit-ready ESG and impact reporting aligned to SDG 6 — plus employee volunteering and brand storytelling.",
      },
      { property: "og:title", content: "For companies — ImpactBridge" },
      {
        property: "og:description",
        content:
          "Sponsor clean water in Nicaragua and receive verified, audit-ready ESG impact reports.",
      },
    ],
  }),
  component: CompaniesPage,
});

const valueProps = [
  {
    icon: BadgeCheck,
    title: "Verified SDG 6 impact",
    body: "Every sponsored project maps to Sustainable Development Goal 6 with measured, third-party-verifiable results.",
  },
  {
    icon: FileText,
    title: "Audit-ready ESG reports",
    body: "Structured impact reporting aligned to common ESG and CSR frameworks — ready to drop into your sustainability disclosures.",
  },
  {
    icon: Users,
    title: "Employee volunteering",
    body: "Give your teams skills-based volunteering placements on the projects your company funds.",
  },
  {
    icon: Megaphone,
    title: "Brand & storytelling",
    body: "Named project sponsorship, field photography and stories you can share with customers and staff.",
  },
];

const steps = [
  {
    number: "01",
    title: "Sponsor a project",
    body: "Choose a project or a portfolio that fits your CSR budget and sustainability priorities.",
  },
  {
    number: "02",
    title: "We implement with the community",
    body: "Local teams and volunteers deliver the water system, tracked against clear milestones.",
  },
  {
    number: "03",
    title: "You receive a verified impact report",
    body: "A dated, evidence-backed report — people reached, water delivered, SDG 6 alignment — for your ESG disclosures.",
  },
];

const reportMetrics = [
  { value: "5,200", label: "People with safe water" },
  { value: "1.4M", label: "Litres delivered / year" },
  { value: "3", label: "Water systems commissioned" },
  { value: "18,000", label: "Woman-hours saved / year" },
];

const tiers = [
  {
    name: "Community Partner",
    price: "$15k–$30k",
    tagline: "Fund one water project",
    features: [
      "Named project sponsorship",
      "Annual impact report",
      "Field photography & story",
      "SDG 6 alignment summary",
    ],
    featured: false,
  },
  {
    name: "Regional Partner",
    price: "$30k–$75k",
    tagline: "Fund a cluster across a region",
    features: [
      "Everything in Community Partner",
      "Quarterly impact reports",
      "Employee volunteering placements",
      "Audit-ready ESG data pack",
    ],
    featured: true,
  },
  {
    name: "National Partner",
    price: "Custom",
    tagline: "A multi-region water programme",
    features: [
      "Everything in Regional Partner",
      "Dedicated programme manager",
      "Co-branded reporting",
      "Third-party verification support",
    ],
    featured: false,
  },
];

function Recommendation({
  rec,
  onRequest,
}: {
  rec: CompanyRec;
  onRequest: (tier: string) => void;
}) {
  if (!rec.tier) {
    return (
      <div className="flex h-full min-h-56 items-center justify-center text-center">
        <p className="max-w-xs text-sm text-muted-foreground">
          Describe your CSR goals above and your recommended package will appear here.
        </p>
      </div>
    );
  }

  const tier = tiers.find((t) => t.name === rec.tier);

  return (
    <div>
      <div className="rounded-2xl border border-primary/40 bg-sage/40 p-5">
        <p className="flex items-center gap-2 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Recommended package
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-semibold">{rec.tier}</h3>
          {tier && <span className="font-display text-lg font-semibold">{tier.price}</span>}
        </div>
        {tier && <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{rec.rationale}</p>

      {tier && (
        <ul className="mt-4 space-y-2 text-sm">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {rec.regions.length > 0 && (
        <div className="mt-5">
          <p className="eyebrow">Suggested regions</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {rec.regions.map((r) => (
              <span
                key={r}
                className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button className="mt-6 w-full rounded-full" onClick={() => onRequest(rec.tier)}>
        Request the {rec.tier} package
      </Button>
    </div>
  );
}

function CompaniesPage() {
  const requestPackage = () =>
    toast.success("Thanks — we'll send an ESG sponsorship package and set up a call.");

  return (
    <>
      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">For companies</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Turn CSR budget into measurable water impact —{" "}
            <span className="text-primary">and audit-ready ESG reporting.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Sponsor community clean-water projects in Nicaragua and receive verified impact reports
            aligned to SDG 6, ready for your sustainability disclosures — with employee volunteering
            and brand storytelling built in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" onClick={requestPackage}>
              Request an ESG package
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#sample-report">See a sample report</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
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
          <div className="max-w-2xl">
            <p className="eyebrow">How corporate sponsorship works</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Sponsor once, report with confidence
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

      <section id="sample-report" className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Sample impact report</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              The numbers your ESG team needs — verified
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each sponsorship closes with a structured report: the outcomes delivered, the evidence
              behind them, and how they map to SDG 6. This is an illustrative example.
            </p>
          </div>
          <div className="card-soft overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-sage/60 px-6 py-4">
              <Droplets className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-sage-foreground">
                Water Impact Report · FY24 · SDG 6
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border">
              {reportMetrics.map((m) => (
                <div key={m.label} className="bg-card p-6">
                  <p className="font-display text-3xl font-semibold">{m.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-4">
              <p className="text-xs text-muted-foreground">
                Verified against field records and community sign-off · Illustrative figures for a
                three-project regional package.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <AssistantWorkspace
            eyebrow="ESG assistant"
            title="Find the right package for your goals"
            lead="Tell the assistant your budget, CSR goals and reporting needs, and it will recommend the ESG sponsorship package that fits best — then refine it as you add detail."
            engine={companiesEngine}
            outputTitle="Recommended for you"
            renderOutput={(output) => (
              <Recommendation
                rec={output}
                onRequest={(tier) =>
                  toast.success(`Thanks — we'll send the ${tier} ESG package and set up a call.`)
                }
              />
            )}
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Sponsorship packages</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Choose the scale of your impact
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  "card-soft flex flex-col p-7" + (t.featured ? " ring-2 ring-primary/40" : "")
                }
              >
                {t.featured && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
                <p className="mt-4 font-display text-2xl font-semibold">{t.price}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full rounded-full"
                  variant={t.featured ? "default" : "outline"}
                  onClick={requestPackage}
                >
                  Request this package
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Build your water impact programme
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Tell us your CSR goals and reporting frameworks, and we will put together a
              sponsorship and ESG package for your team.
            </p>
          </div>
          <Button size="lg" className="rounded-full" onClick={requestPackage}>
            Request an ESG package
          </Button>
        </div>
      </section>
    </>
  );
}
