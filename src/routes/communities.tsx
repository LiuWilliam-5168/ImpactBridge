import { createFileRoute } from "@tanstack/react-router";
import { FileText, Handshake, Users } from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/hero-community.jpg";
import { AssistantWorkspace } from "@/components/assistant/AssistantWorkspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { communitiesEngine, waterSources, type CommunityIntake } from "@/lib/assistant";
import { filterOptions } from "@/lib/projects";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "For Communities — turn your water need into a project | ImpactBridge" },
      {
        name: "description",
        content:
          "Describe your community's water situation and our assistant fills in the form for you — then get connected to funding, partners and volunteers.",
      },
      { property: "og:title", content: "For Communities — ImpactBridge" },
      {
        property: "og:description",
        content: "Turn your community's water need into a fundable project.",
      },
    ],
  }),
  component: CommunitiesPage,
});

const support = [
  {
    icon: FileText,
    title: "A project you can share",
    body: "We shape your situation into a clear water project — solution type, scope and what it will cost.",
  },
  {
    icon: Handshake,
    title: "Routes to funding",
    body: "Matched with NGOs and corporate sponsors funding clean-water work in your region.",
  },
  {
    icon: Users,
    title: "People who can help",
    body: "Technical partners and volunteers whose skills fit the specific gaps in your project.",
  },
];

const regions = filterOptions.location.filter((r) => r !== "All regions");

function IntakeForm({
  output,
  setOutput,
}: {
  output: CommunityIntake;
  setOutput: (updater: (prev: CommunityIntake) => CommunityIntake) => void;
}) {
  const set = (key: keyof CommunityIntake, value: string) =>
    setOutput((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (!output.community || !output.contact) {
      toast.error("Please add your community name and a contact so we can reach you.");
      return;
    }
    toast.success("Thank you — we've received your community's details and will be in touch.");
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="community">Community name</Label>
          <Input
            id="community"
            placeholder="e.g. Comunidad El Terrero"
            value={output.community}
            onChange={(e) => set("community", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select value={output.region} onValueChange={(v) => set("region", v)}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="population">People served (approx.)</Label>
          <Input
            id="population"
            placeholder="e.g. 600"
            value={output.population}
            onChange={(e) => set("population", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="source">Current main water source</Label>
          <Select value={output.source} onValueChange={(v) => set("source", v)}>
            <SelectTrigger id="source">
              <SelectValue placeholder="Select a source" />
            </SelectTrigger>
            <SelectContent>
              {waterSources.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="needs">What is the main challenge?</Label>
          <Textarea
            id="needs"
            rows={3}
            placeholder="e.g. The stream runs dry from January and the school has no safe water."
            value={output.needs}
            onChange={(e) => set("needs", e.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact">Your contact (email or phone)</Label>
          <Input
            id="contact"
            placeholder="name@example.com"
            value={output.contact}
            onChange={(e) => set("contact", e.target.value)}
          />
        </div>
      </div>

      <Button className="mt-6 w-full rounded-full sm:w-auto" onClick={submit}>
        Submit your water need
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Prototype — submissions aren't stored yet. The assistant fills fields from your description;
        you can edit any of them directly.
      </p>
    </div>
  );
}

function CommunitiesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">For communities</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Turn your water problem into a project.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              You know your community best. Describe your water situation in your own words — our
              assistant turns it into a project and opens the doors to funding, partners and
              volunteers.
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
            alt="Community members gathered around a water point in a rural Nicaraguan village"
            width={1408}
            height={1008}
            className="w-full rounded-3xl border border-border object-cover shadow-card"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <AssistantWorkspace
            eyebrow="Tell us about your community"
            title="Describe it — we'll fill in the form"
            lead="Write a few sentences about your water situation. The assistant fills in what it can and asks about anything it's missing. There's no cost to the community."
            engine={communitiesEngine}
            outputTitle="Your water need"
            renderOutput={(output, setOutput) => (
              <IntakeForm output={output} setOutput={setOutput} />
            )}
          />
        </div>
      </section>
    </>
  );
}
