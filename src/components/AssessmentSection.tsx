import { Link } from "@tanstack/react-router";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
import {
  emptyAssessmentInput,
  exampleAssessmentInput,
  facilityOptions,
  generateAssessment,
  resourceOptions,
  type AssessmentInput,
  type AssessmentResult,
} from "@/lib/assessment";
import { cn } from "@/lib/utils";

const accessOptions = [
  "No access",
  "Limited / unreliable",
  "Few hours per day",
  "Grid connected but unstable",
];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200",
        active
          ? "border-primary/40 bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}

export function AssessmentSection() {
  const [form, setForm] = useState<AssessmentInput>(emptyAssessmentInput);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const set = (key: keyof AssessmentInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggle = (key: "facilities" | "resources", value: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));

  async function handleGenerate() {
    setLoading(true);
    setResult(null);
    try {
      const generated = await generateAssessment(form);
      setResult(generated);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="assessment" className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">AI energy assessment</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Find your energy solution</h2>
          <p className="mt-4 text-muted-foreground">
            Share what your community has and needs. ImpactBridge generates a preliminary project
            concept you can take to funders, partners and volunteers.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-soft p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">Community information</h3>
              <button
                type="button"
                onClick={() => setForm(exampleAssessmentInput)}
                className="text-xs font-medium text-primary hover:underline"
              >
                Use example data
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Country / location</Label>
                <Input
                  id="location"
                  placeholder="Kenya"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="population">Population</Label>
                <Input
                  id="population"
                  placeholder="500"
                  value={form.population}
                  onChange={(e) => set("population", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="access">Current electricity access</Label>
                <Select
                  value={form.electricityAccess}
                  onValueChange={(v) => set("electricityAccess", v)}
                >
                  <SelectTrigger id="access">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    {accessOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Available local skills</Label>
                <Input
                  id="skills"
                  placeholder="2 electricians"
                  value={form.localSkills}
                  onChange={(e) => set("localSkills", e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="needs">Main energy needs</Label>
                <Textarea
                  id="needs"
                  rows={2}
                  placeholder="School, health center, households"
                  value={form.mainNeeds}
                  onChange={(e) => set("mainNeeds", e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="infra">Existing infrastructure</Label>
                <Textarea
                  id="infra"
                  rows={2}
                  placeholder="Small diesel generator"
                  value={form.infrastructure}
                  onChange={(e) => set("infrastructure", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Label>Main facilities</Label>
              <div className="flex flex-wrap gap-2">
                {facilityOptions.map((f) => (
                  <Chip
                    key={f}
                    label={f}
                    active={form.facilities.includes(f)}
                    onClick={() => toggle("facilities", f)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Label>Available renewable resources</Label>
              <div className="flex flex-wrap gap-2">
                {resourceOptions.map((r) => (
                  <Chip
                    key={r}
                    label={r}
                    active={form.resources.includes(r)}
                    onClick={() => toggle("resources", r)}
                  />
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="mt-8 w-full rounded-full"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate preliminary solution
                </>
              )}
            </Button>
          </div>

          <div>
            {!result && !loading && (
              <div className="card-soft flex h-full min-h-80 flex-col items-center justify-center p-10 text-center">
                <Sparkles className="h-6 w-6 text-primary" />
                <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                  Your preliminary project concept will appear here — solution type, components,
                  funding range and the skills you need.
                </p>
              </div>
            )}

            {loading && (
              <div className="card-soft flex h-full min-h-80 flex-col items-center justify-center gap-3 p-10 text-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Assessing community data…</p>
              </div>
            )}

            {result && !loading && (
              <div className="card-soft overflow-hidden">
                <div className="border-b border-border bg-sage/60 px-6 py-5">
                  <p className="eyebrow">Preliminary project concept</p>
                  <h3 className="mt-2 text-2xl font-semibold">{result.concept}</h3>
                  <p className="mt-2 text-sm text-sage-foreground/80">{result.summary}</p>
                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow">Recommended focus</p>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {result.focus.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Potential components</p>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {result.components.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Estimated funding requirement</p>
                    <p className="mt-2 text-xl font-semibold">{result.fundingRange}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Indicative timeline {result.timeline}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow">Skills needed</p>
                    <p className="mt-2 text-sm">{result.skills.join(" · ")}</p>
                  </div>
                </div>

                <div className="border-t border-border px-6 py-5">
                  <p className="text-xs text-muted-foreground">
                    This is a preliminary, AI-generated concept for orientation only — not a final
                    engineering design. {result.confidence}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild className="rounded-full">
                      <Link to="/projects" search={{ view: "funding" }}>
                        Find funding
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link to="/volunteers">Find volunteers</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-full"
                      onClick={() => toast.success("Project concept saved to your workspace")}
                    >
                      Save project
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
