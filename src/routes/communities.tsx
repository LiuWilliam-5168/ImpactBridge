import { createFileRoute } from "@tanstack/react-router";
import { FileText, Handshake, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import heroImage from "@/assets/hero-community.jpg";
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
import { filterOptions } from "@/lib/projects";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "For Communities — turn your water need into a project | ImpactBridge" },
      {
        name: "description",
        content:
          "Share information about your community's water situation and get connected to funding, partners and volunteers to build a lasting clean-water project.",
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

const waterSources = [
  "Seasonal dam / dugout",
  "Hand-dug wells",
  "River / stream",
  "Failing borehole",
  "Distant borehole",
  "Sachet / tanker vendors",
  "No reliable source",
];

const emptyForm = {
  community: "",
  region: "",
  population: "",
  source: "",
  needs: "",
  contact: "",
};

function CommunitiesPage() {
  const [form, setForm] = useState(emptyForm);
  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (!form.community || !form.contact) {
      toast.error("Please add your community name and a contact so we can reach you.");
      return;
    }
    toast.success("Thank you — we've received your community's details and will be in touch.");
    setForm(emptyForm);
  };

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
              You know your community best. Tell us about your water situation, people and local
              skills — we will shape it into a project and open the doors to funding, partners and
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
            alt="Community members gathered around a water point in a rural Ghanaian village"
            width={1408}
            height={1008}
            className="w-full rounded-3xl border border-border object-cover shadow-card"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Tell us about your community</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Share your water need</h2>
            <p className="mt-4 text-muted-foreground">
              A few details are enough to get started. Our team will follow up to shape a project
              with you — there is no cost to the community.
            </p>
          </div>

          <div className="card-soft mt-8 max-w-3xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="community">Community name</Label>
                <Input
                  id="community"
                  placeholder="e.g. Zorko Community"
                  value={form.community}
                  onChange={(e) => set("community", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={form.region} onValueChange={(v) => set("region", v)}>
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
                  value={form.population}
                  onChange={(e) => set("population", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Current main water source</Label>
                <Select value={form.source} onValueChange={(v) => set("source", v)}>
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
                  placeholder="e.g. The dam runs dry from December, the school has no safe water, and families walk two hours to fetch it."
                  value={form.needs}
                  onChange={(e) => set("needs", e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="contact">Your contact (email or phone)</Label>
                <Input
                  id="contact"
                  placeholder="name@example.com"
                  value={form.contact}
                  onChange={(e) => set("contact", e.target.value)}
                />
              </div>
            </div>

            <Button size="lg" className="mt-8 w-full rounded-full sm:w-auto" onClick={submit}>
              Submit your water need
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              This is a prototype — submissions are not yet stored. A real intake would route your
              details to the ImpactBridge team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
