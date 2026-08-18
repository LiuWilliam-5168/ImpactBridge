/**
 * Preliminary energy assessment.
 *
 * Prototype implementation: a deterministic, rule-based mock that mimics the
 * shape of a real AI response. The `generateAssessment` signature is async so
 * the call site can later be swapped for a server function hitting a real AI
 * API without changing any UI code.
 */

export type AssessmentInput = {
  location: string;
  population: string;
  electricityAccess: string;
  mainNeeds: string;
  infrastructure: string;
  localSkills: string;
  facilities: string[];
  resources: string[];
};

export type AssessmentResult = {
  concept: string;
  summary: string;
  focus: string[];
  components: string[];
  fundingRange: string;
  skills: string[];
  timeline: string;
  confidence: string;
};

export const facilityOptions = [
  "School",
  "Health centre",
  "Households",
  "Businesses",
  "Water pumping",
  "Community hall",
];

export const resourceOptions = ["Strong solar", "Wind", "River / hydro", "Biomass", "Unknown"];

export const emptyAssessmentInput: AssessmentInput = {
  location: "",
  population: "",
  electricityAccess: "",
  mainNeeds: "",
  infrastructure: "",
  localSkills: "",
  facilities: [],
  resources: [],
};

export const exampleAssessmentInput: AssessmentInput = {
  location: "Kenya",
  population: "500",
  electricityAccess: "Limited / unreliable",
  mainNeeds: "School, health center, households",
  infrastructure: "Small diesel generator",
  localSkills: "2 electricians",
  facilities: ["School", "Health centre", "Households"],
  resources: ["Strong solar"],
};

function estimateHouseholds(population: number): number {
  return Math.max(20, Math.round(population / 4.2));
}

export async function generateAssessment(input: AssessmentInput): Promise<AssessmentResult> {
  // Simulated latency so the prototype shows a realistic generating state.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const population = Number.parseInt(input.population.replace(/\D/g, ""), 10) || 500;
  const households = estimateHouseholds(population);
  const hasHydro = input.resources.includes("River / hydro");
  const hasWind = input.resources.includes("Wind");

  const concept = hasHydro
    ? "Micro-Hydro + Solar Hybrid"
    : hasWind
      ? "Solar PV + Wind Hybrid Microgrid"
      : "Solar PV + Battery Microgrid";

  const focus = (input.facilities.length ? input.facilities : ["School", "Health centre", "Households"]).map(
    (f) => (f === "Households" ? `${households} households` : f),
  );

  const components = [
    hasHydro ? "Run-of-river hydro unit" : "Solar PV system",
    "Battery storage",
    "Inverter system",
    "Distribution network",
    ...(hasWind ? ["Small wind turbine"] : []),
    ...(input.infrastructure.toLowerCase().includes("diesel") ? ["Diesel generator as backup only"] : []),
  ];

  const low = Math.round((households * 250 + 6000) / 1000) * 1000;
  const high = Math.round((low * 1.25) / 1000) * 1000;

  const skills = [
    "Electrical engineering",
    hasHydro ? "Hydro installation" : "Solar installation",
    "Project management",
    ...(input.localSkills.toLowerCase().includes("electric") ? ["Local technician training"] : []),
  ];

  return {
    concept,
    summary: `Based on a population of about ${population} in ${input.location || "your region"} with ${
      input.electricityAccess.toLowerCase() || "limited"
    } electricity access, a community-scale ${concept.toLowerCase()} is the most plausible starting point.`,
    focus,
    components,
    fundingRange: `€${low.toLocaleString("en-US")}–€${high.toLocaleString("en-US")}`,
    skills,
    timeline: population > 800 ? "9–14 months" : "5–8 months",
    confidence: "Preliminary concept — requires a site survey before engineering design.",
  };
}
