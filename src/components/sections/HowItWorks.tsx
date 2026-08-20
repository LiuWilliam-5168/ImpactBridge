const steps = [
  {
    number: "01",
    title: "Communities share their needs",
    intro: "Communities or NGOs provide information about:",
    items: [
      "Location & region",
      "Population served",
      "Current water source",
      "Main water needs",
      "Existing infrastructure",
      "Local skills",
    ],
  },
  {
    number: "02",
    title: "ImpactBridge creates the match",
    intro: "We shape a viable water project and connect the community with:",
    items: [
      "Clean-water solutions",
      "Funding from NGOs",
      "Corporate sponsors",
      "Technical partners",
      "Skilled volunteers",
    ],
  },
  {
    number: "03",
    title: "People make it happen",
    intro:
      "Communities, funders, partners and volunteers work together to build a lasting local water solution.",
    items: [],
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Three steps from local need to clean water flowing
          </h2>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-4 hidden h-px bg-primary/25 md:block"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 left-0 hidden h-2 w-2 rounded-full bg-primary ring-4 ring-surface md:block"
                />
                <p className="text-sm font-medium text-primary md:pt-8">{step.number}</p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.intro}</p>
                {step.items.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="h-1 w-1 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
