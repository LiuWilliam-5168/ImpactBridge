/**
 * AI assistant engines for the four ImpactBridge audiences.
 *
 * PROTOTYPE: deterministic, rule-based mocks that mimic the shape of a real
 * assistant — they parse a free-text description with keyword/regex heuristics,
 * pre-fill a structured output, and ask follow-up questions for anything missing.
 *
 * REAL-READY SEAM: every engine method is async and returns an `AssistantTurn`.
 * To make this real, replace the bodies of `start`/`answer` with a call to a
 * TanStack Start server function (the app already runs server fns with CSRF via
 * `src/start.ts`) that calls Claude and returns the same `AssistantTurn` shape:
 *
 *   // src/lib/assistant.server.ts  (server-only)
 *   import Anthropic from "@anthropic-ai/sdk";
 *   const client = new Anthropic(); // ANTHROPIC_API_KEY stays server-side
 *   const res = await client.messages.create({
 *     model: "claude-opus-5",
 *     max_tokens: 1024,
 *     output_config: { format: { type: "json_schema", schema: <AssistantTurn schema> } },
 *     messages: [{ role: "user", content: prompt }],
 *   });
 *
 * No UI changes are needed — the components only depend on the types below.
 */

import { filterOptions, projects, type Project } from "./projects";

export type AssistantMessage = { role: "assistant" | "user"; text: string };

export type AssistantTurn<T> = {
  /** Structured result rendered in the left pane. */
  output: T;
  /** The assistant's chat line for this turn. */
  message: string;
  /** True while the assistant is still waiting on the user (reply box enabled). */
  awaitingReply: boolean;
  /** True once the primary goal is complete (form filled / matches ready). */
  done: boolean;
};

export type AssistantEngine<T> = {
  placeholder: string;
  example: string;
  intro: string;
  initial: T;
  start(description: string): Promise<AssistantTurn<T>>;
  answer(reply: string, state: T): Promise<AssistantTurn<T>>;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Shared parsing helpers
// ---------------------------------------------------------------------------

const REGIONS = filterOptions.location.filter((r) => r !== "All regions");

const DISTRICT_HINTS: Record<string, string> = {
  somoto: "Madriz",
  cusmapa: "Madriz",
  "san lucas": "Madriz",
  telpaneca: "Madriz",
  "el terrero": "Madriz",
  "dry corridor": "Madriz",
  "corredor seco": "Madriz",
  "el cua": "Jinotega",
  "el cuá": "Jinotega",
  wiwili: "Jinotega",
  wiwilí: "Jinotega",
  pantasma: "Jinotega",
  "la dalia": "Matagalpa",
  "el tuma": "Matagalpa",
  "san ramon": "Matagalpa",
  "san ramón": "Matagalpa",
  "peñas blancas": "Matagalpa",
  juigalpa: "Chontales",
  "la libertad": "Chontales",
  "santo domingo": "Chontales",
  "rio mico": "Chontales",
  "río mico": "Chontales",
  amerrisque: "Chontales",
  rosita: "Costa Caribe Norte",
  bonanza: "Costa Caribe Norte",
  siuna: "Costa Caribe Norte",
  bambana: "Costa Caribe Norte",
  bilwi: "Costa Caribe Norte",
  "puerto cabezas": "Costa Caribe Norte",
  caribe: "Costa Caribe Norte",
  caribbean: "Costa Caribe Norte",
  miskito: "Costa Caribe Norte",
  "ciudad sandino": "Managua",
  tipitapa: "Managua",
  pochomil: "Managua",
};

function detectRegions(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const r of REGIONS) if (lower.includes(r.toLowerCase())) found.add(r);
  for (const [hint, region] of Object.entries(DISTRICT_HINTS)) {
    if (lower.includes(hint)) found.add(region);
  }
  if (/\bnorth|\bnorte\b/.test(lower)) {
    found.add("Jinotega");
    found.add("Madriz");
  }
  return [...found];
}

export const waterSources = [
  "Seasonal stream / pond",
  "Hand-dug wells",
  "River / stream",
  "Failing borehole",
  "Distant borehole",
  "Bagged / tanker (pipa) vendors",
  "No reliable source",
];

const SOURCE_PATTERNS: [RegExp, string][] = [
  [/seasonal (dam|stream)|dugout|\bpond\b|\bdam\b/, "Seasonal stream / pond"],
  [/hand-?dug|open well|\bwells?\b/, "Hand-dug wells"],
  [/river|stream/, "River / stream"],
  [/failing borehole|broken borehole|borehole.*(fail|broke|dry)/, "Failing borehole"],
  [/distant borehole|far.*borehole|borehole.*far away/, "Distant borehole"],
  [/bagged|bottled|bolsa|tanker|pipa|vendor/, "Bagged / tanker (pipa) vendors"],
  [/no (reliable )?(water|source)|nothing safe/, "No reliable source"],
];

function detectSource(text: string): string {
  const lower = text.toLowerCase();
  for (const [re, label] of SOURCE_PATTERNS) if (re.test(lower)) return label;
  return "";
}

function detectPopulation(text: string): string {
  const nums = (text.match(/\d[\d,]*/g) ?? [])
    .map((n) => Number.parseInt(n.replace(/,/g, ""), 10))
    .filter((n) => n >= 10 && n <= 200000);
  return nums.length ? String(nums[0]) : "";
}

function detectCommunityName(text: string): string {
  // Allows two-word Spanish place names ("El Terrero", "La Dalia") and accents.
  const WORD = "[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]+";
  const patterns = [
    new RegExp(
      `(?:village|community|town|comunidad|comarca)\\s+(?:of\\s+|called\\s+|named\\s+)?(${WORD}(?:\\s+${WORD})?)`,
    ),
    new RegExp(`\\bin\\s+(${WORD}(?:\\s+${WORD})?)\\s+(?:community|village|town)`),
  ];
  for (const re of patterns) {
    const m = text.match(re);
    const name = m?.[1];
    if (name && !REGIONS.some((r) => r.toLowerCase().startsWith(name.toLowerCase()))) {
      return name;
    }
  }
  return "";
}

const SKILL_SYNONYMS: [RegExp, string][] = [
  [/hydrogeolog|groundwater|aquifer/, "Hydrogeology"],
  [/solar|pv|pump/, "Solar pump installation"],
  [/drill|rig/, "Borehole drilling"],
  [/treatment|filtration|filter|purif/, "Water treatment engineering"],
  [/water quality|testing|turbidity|sampling|lab/, "Water quality testing"],
  [/wash|hygiene|sanitation|education|teach|train/, "WASH education"],
  [/civil|construction|mason|structural/, "Civil engineering"],
  [/plumb|pipe/, "Plumbing"],
  [/community|mobilis|mobiliz|engagement|outreach/, "Community mobilization"],
  [/project manage|programme manage|coordinat|logistics/, "Project management"],
  [/engineer/, "Civil engineering"],
];

function detectSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const [re, skill] of SKILL_SYNONYMS) if (re.test(lower)) found.add(skill);
  return [...found];
}

const KEYWORD_PATTERNS: [RegExp, string][] = [
  [/school|pupil|educat|children/, "schools"],
  [/clinic|health|maternal|vaccine|disease/, "health facilities"],
  [/women|girls|gender/, "women & girls"],
  [/sanitation|hygiene|wash/, "sanitation & hygiene"],
  [/mining|güiris|guiris|pollut|mercury/, "mining-affected water"],
  [/climate|drought|dry season/, "climate resilience"],
];

function detectKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const [re, kw] of KEYWORD_PATTERNS) if (re.test(lower)) found.add(kw);
  return [...found];
}

function detectBudget(text: string): number | null {
  const lower = text.toLowerCase();
  const m = lower.match(/\$?\s*(\d[\d,.]*)\s*(k|thousand|m|million)?/);
  if (!m || !m[1]) return null;
  let value = Number.parseFloat(m[1].replace(/,/g, ""));
  const unit = m[2];
  if (unit === "k" || unit === "thousand") value *= 1_000;
  else if (unit === "m" || unit === "million") value *= 1_000_000;
  if (value < 1000 && /\b(k|thousand)\b/.test(lower)) value *= 1_000;
  return value >= 1000 ? Math.round(value) : null;
}

function detectDurationWeeks(text: string): number | null {
  const m = text.toLowerCase().match(/(\d+)\s*(?:-\s*\d+\s*)?weeks?/);
  return m?.[1] ? Number.parseInt(m[1], 10) : null;
}

// ---------------------------------------------------------------------------
// Communities — assisted intake form-fill
// ---------------------------------------------------------------------------

export type CommunityIntake = {
  community: string;
  region: string;
  population: string;
  source: string;
  needs: string;
  contact: string;
};

export const emptyIntake: CommunityIntake = {
  community: "",
  region: "",
  population: "",
  source: "",
  needs: "",
  contact: "",
};

const INTAKE_QUESTIONS: { key: keyof CommunityIntake; q: string }[] = [
  { key: "community", q: "What's the name of your community?" },
  {
    key: "region",
    q: "Which part of Nicaragua is it in? (Madriz, Jinotega, Matagalpa, Chontales, Costa Caribe Norte or Managua)",
  },
  { key: "population", q: "Roughly how many people would the project serve?" },
  {
    key: "source",
    q: "What's your main water source right now? (e.g. seasonal stream, hand-dug wells, river, failing borehole, bagged/tanker water)",
  },
  { key: "contact", q: "Last thing — what's the best email or phone number to reach you on?" },
];

function firstMissingIntake(state: CommunityIntake) {
  return INTAKE_QUESTIONS.find((f) => !state[f.key].trim()) ?? null;
}

function mapIntakeReply(key: keyof CommunityIntake, reply: string): string {
  const trimmed = reply.trim();
  if (key === "population") return detectPopulation(reply) || trimmed;
  if (key === "region") return detectRegions(reply)[0] ?? trimmed;
  if (key === "source") return detectSource(reply) || trimmed;
  return trimmed;
}

export const communitiesEngine: AssistantEngine<CommunityIntake> = {
  placeholder:
    "Describe your community's water situation in your own words — where you are, how many people, your current water source and the main problem…",
  example:
    "Our community El Terrero in Madriz has about 600 people. We rely on a seasonal stream that dries up from January, so women and girls walk nearly two hours to fetch water and the school has no safe drinking water.",
  intro:
    "Tell me about your community's water situation and I'll fill in the form for you. I'll ask about anything I'm missing.",
  initial: emptyIntake,
  async start(description) {
    await sleep(750);
    const filled: CommunityIntake = {
      community: detectCommunityName(description),
      region: detectRegions(description)[0] ?? "",
      population: detectPopulation(description),
      source: detectSource(description),
      needs: description.trim(),
      contact: "",
    };
    const next = firstMissingIntake(filled);
    return {
      output: filled,
      message: next
        ? `Thanks — I've filled in what I could from your description (have a look on the left). ${next.q}`
        : "Great, I've filled everything in. Review it on the left and submit when you're ready.",
      awaitingReply: Boolean(next),
      done: !next,
    };
  },
  async answer(reply, state) {
    await sleep(500);
    const pending = firstMissingIntake(state);
    if (!pending) {
      return {
        output: state,
        message: "That's everything — you're all set.",
        awaitingReply: false,
        done: true,
      };
    }
    const updated: CommunityIntake = {
      ...state,
      [pending.key]: mapIntakeReply(pending.key, reply),
    };
    const next = firstMissingIntake(updated);
    return {
      output: updated,
      message: next
        ? `Got it. ${next.q}`
        : "Perfect — that's everything. Review the form on the left and hit submit.",
      awaitingReply: Boolean(next),
      done: !next,
    };
  },
};

// ---------------------------------------------------------------------------
// NGOs & Volunteers — project matching
// ---------------------------------------------------------------------------

export type MatchProfile = {
  regions: string[];
  skills: string[];
  keywords: string[];
  budget: number | null;
  durationWeeks: number | null;
};

export type ProjectMatch = { project: Project; reason: string };
export type MatchState = { profile: MatchProfile; matches: ProjectMatch[] };

const emptyProfile: MatchProfile = {
  regions: [],
  skills: [],
  keywords: [],
  budget: null,
  durationWeeks: null,
};

export const emptyMatchState: MatchState = { profile: emptyProfile, matches: [] };

function parseProfile(text: string): MatchProfile {
  return {
    regions: detectRegions(text),
    skills: detectSkills(text),
    keywords: detectKeywords(text),
    budget: detectBudget(text),
    durationWeeks: detectDurationWeeks(text),
  };
}

function mergeProfile(a: MatchProfile, b: MatchProfile): MatchProfile {
  return {
    regions: [...new Set([...a.regions, ...b.regions])],
    skills: [...new Set([...a.skills, ...b.skills])],
    keywords: [...new Set([...a.keywords, ...b.keywords])],
    budget: b.budget ?? a.budget,
    durationWeeks: b.durationWeeks ?? a.durationWeeks,
  };
}

function projectText(p: Project): string {
  return `${p.challenge} ${p.solution} ${p.type}`.toLowerCase();
}

function buildMatches(profile: MatchProfile, mode: "ngo" | "volunteer"): ProjectMatch[] {
  const scored = projects.map((p) => {
    let score = 0;
    const reasons: string[] = [];

    if (mode === "ngo" && p.status === "Seeking funding") {
      score += 5;
      reasons.push("actively seeking funding");
    }
    if (profile.regions.includes(p.region)) {
      score += 4;
      reasons.push(`in ${p.region}`);
    }
    if (mode === "volunteer") {
      const overlap = profile.skills.filter((s) => p.skills.includes(s));
      if (overlap.length) {
        score += 4 * overlap.length;
        reasons.push(`needs ${overlap.slice(0, 2).join(" & ")}`);
      }
      if (profile.budget == null && profile.durationWeeks && p.duration.includes("week")) {
        score += 1;
      }
    }
    if (
      mode === "ngo" &&
      profile.budget != null &&
      p.fundingGoal - p.fundingRaised <= profile.budget
    ) {
      score += 2;
      reasons.push("fundable within your budget");
    }
    const text = projectText(p);
    for (const kw of profile.keywords) {
      // Match on a singular stem so "schools" hits "school", "clinics" hits "clinic", etc.
      const stem = (kw.split(/[ &-]/)[0] ?? kw).replace(/s$/, "");
      if (stem.length > 2 && text.includes(stem)) {
        score += 2;
        reasons.push(`addresses ${kw}`);
      }
    }
    return { project: p, score, reason: reasons.slice(0, 2).join(" · ") };
  });

  const anySignal = scored.some((s) => s.score > 0);
  const ranked = scored
    .filter((s) => (anySignal ? s.score > 0 : true))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked.map((s) => ({
    project: s.project,
    reason:
      s.reason ||
      (mode === "ngo" ? "a strong fit for a first partnership" : "a good match to get started"),
  }));
}

export const ngosEngine: AssistantEngine<MatchState> = {
  placeholder:
    "Tell me what you fund — your focus regions, causes and typical grant size — and I'll shortlist the best projects…",
  example:
    "We're a foundation focused on maternal and child health in northern Nicaragua. We fund water and sanitation, usually $20–40k per project, and care most about clinics and schools.",
  intro:
    "Describe your funding focus — regions, causes and budget — and I'll shortlist the projects that fit best.",
  initial: emptyMatchState,
  async start(description) {
    await sleep(750);
    const profile = parseProfile(description);
    return {
      output: { profile, matches: buildMatches(profile, "ngo") },
      message:
        "Based on that, here are the projects that fit best — shown on the left. To refine the shortlist, what's your budget per project and any priority regions or causes?",
      awaitingReply: true,
      done: true,
    };
  },
  async answer(reply, state) {
    await sleep(500);
    const profile = mergeProfile(state.profile, parseProfile(reply));
    return {
      output: { profile, matches: buildMatches(profile, "ngo") },
      message:
        "I've refined your shortlist on the left. Tell me more to narrow it further, or you're all set.",
      awaitingReply: true,
      done: true,
    };
  },
};

export const volunteersEngine: AssistantEngine<MatchState> = {
  placeholder:
    "Tell me about your skills, interests and availability, and I'll find the projects where you'd have the most impact…",
  example:
    "I'm a civil engineer with some solar experience, comfortable with plumbing and community training. I'm available for about 3 weeks in September and interested in the northern highlands.",
  intro:
    "Tell me your skills, interests and availability and I'll match you with the projects that need you most.",
  initial: emptyMatchState,
  async start(description) {
    await sleep(750);
    const profile = parseProfile(description);
    return {
      output: { profile, matches: buildMatches(profile, "volunteer") },
      message:
        "Here are the projects that best match your skills — shown on the left. To fine-tune, what are your strongest skills and how long are you available?",
      awaitingReply: true,
      done: true,
    };
  },
  async answer(reply, state) {
    await sleep(500);
    const profile = mergeProfile(state.profile, parseProfile(reply));
    return {
      output: { profile, matches: buildMatches(profile, "volunteer") },
      message:
        "I've updated your matches on the left. Add anything else to refine, or you're ready to apply.",
      awaitingReply: true,
      done: true,
    };
  },
};

// ---------------------------------------------------------------------------
// Companies — recommended ESG sponsorship package
// ---------------------------------------------------------------------------

export type CompanyProfile = { budget: number | null; regions: string[]; goals: string[] };
export type CompanyRec = {
  profile: CompanyProfile;
  tier: string;
  regions: string[];
  rationale: string;
};

export const emptyCompanyRec: CompanyRec = {
  profile: { budget: null, regions: [], goals: [] },
  tier: "",
  regions: [],
  rationale: "",
};

function parseCompany(text: string): CompanyProfile {
  return { budget: detectBudget(text), regions: detectRegions(text), goals: detectKeywords(text) };
}

function mergeCompany(a: CompanyProfile, b: CompanyProfile): CompanyProfile {
  return {
    budget: b.budget ?? a.budget,
    regions: [...new Set([...a.regions, ...b.regions])],
    goals: [...new Set([...a.goals, ...b.goals])],
  };
}

function seekingRegions(): string[] {
  return [...new Set(projects.filter((p) => p.status === "Seeking funding").map((p) => p.region))];
}

function recommend(profile: CompanyProfile): CompanyRec {
  const tier =
    profile.budget != null
      ? profile.budget >= 75000
        ? "National Partner"
        : profile.budget >= 30000
          ? "Regional Partner"
          : "Community Partner"
      : profile.goals.length >= 3
        ? "National Partner"
        : "Regional Partner";

  const regions = (profile.regions.length ? profile.regions : seekingRegions()).slice(0, 3);

  const budgetText =
    profile.budget != null
      ? `a budget around $${profile.budget.toLocaleString("en-US")}`
      : "your stated goals";
  const goalText = profile.goals.length
    ? ` and a focus on ${profile.goals.slice(0, 2).join(" and ")}`
    : "";
  const rationale = `With ${budgetText}${goalText}, the ${tier} package gives you the right scale of verified SDG 6 impact and audit-ready ESG reporting.`;

  return { profile, tier, regions, rationale };
}

export const companiesEngine: AssistantEngine<CompanyRec> = {
  placeholder:
    "Tell me about your CSR goals, budget and reporting needs, and I'll recommend the best ESG sponsorship package…",
  example:
    "We're a mid-size company building our ESG programme. Budget is around $60k this year, we care most about SDG 6 and giving our staff volunteering days, and we'd love strong brand stories.",
  intro:
    "Describe your CSR goals, budget and reporting needs and I'll recommend the ESG sponsorship package that fits best.",
  initial: emptyCompanyRec,
  async start(description) {
    await sleep(750);
    const rec = recommend(parseCompany(description));
    return {
      output: rec,
      message:
        "Here's the package I'd recommend — details on the left. To tailor it, what's your budget and which outcomes matter most (SDG 6, employee volunteering, brand)?",
      awaitingReply: true,
      done: true,
    };
  },
  async answer(reply, state) {
    await sleep(500);
    const profile = mergeCompany(state.profile, parseCompany(reply));
    return {
      output: recommend(profile),
      message:
        "I've updated the recommendation on the left. Add more detail to refine it, or you're set.",
      awaitingReply: true,
      done: true,
    };
  },
};
