import madriz from "@/assets/project-kenya.jpg";
import caribeNorte from "@/assets/project-peru.jpg";
import jinotega from "@/assets/project-lesotho.jpg";
import matagalpa from "@/assets/project-nepal.jpg";
import chontales from "@/assets/hero-community.jpg";
import managua from "@/assets/volunteer-exchange.jpg";

// NOTE: imagery is placeholder — these files are reused from the earlier build and
// should be replaced with real Nicaragua clean-water photography.

export type VolunteerRole = {
  title: string;
  duration: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  community: string;
  country: string;
  /** Nicaraguan department or autonomous region — used by the location filter. */
  region: string;
  type: string;
  image: string;
  households: number;
  people: number;
  challenge: string;
  solution: string;
  solutionShort: string;
  fundingGoal: number;
  fundingRaised: number;
  volunteersNeeded: number;
  skills: string[];
  duration: string;
  status: "Seeking funding" | "Fully funded" | "In implementation";
  roles: VolunteerRole[];
  /** Rough map position in percent of the Nicaragua map viewport. */
  map: { x: number; y: number };
  experience: {
    accommodation: string;
    activities: string[];
    culture: string;
    volunteers: number;
  };
};

export const projects: Project[] = [
  {
    id: "solar-borehole-madriz",
    name: "Solar Borehole & Standpipe Network",
    community: "Comunidad El Terrero",
    country: "Nicaragua",
    region: "Madriz",
    type: "Solar borehole",
    image: madriz,
    households: 140,
    people: 620,
    challenge:
      "620 people in the Dry Corridor rely on a seasonal stream and hand-dug wells that run dry from January to May. Women and girls walk up to two hours a day to fetch water, and the primary school has no safe drinking source.",
    solution:
      "A solar-powered mechanised borehole feeding an overhead tank and a network of standpipes serving households, the school and the health post, run by a trained community water committee (CAPS).",
    solutionShort: "Solar borehole + standpipes",
    fundingGoal: 48000,
    fundingRaised: 31000,
    volunteersNeeded: 3,
    skills: ["Hydrogeology", "Solar pump installation", "Plumbing", "Community mobilization"],
    duration: "6 months",
    status: "Seeking funding",
    roles: [
      {
        title: "Solar Pump Volunteer",
        duration: "2–4 weeks",
        description:
          "Support pump sizing, panel mounting and commissioning with local technicians.",
      },
      {
        title: "Hydrogeology Volunteer",
        duration: "2 weeks",
        description: "Review the borehole yield test and advise on the distribution design.",
      },
      {
        title: "Community Mobilization",
        duration: "1–2 weeks",
        description:
          "Set up the water committee, tariff model and maintenance routine with residents.",
      },
    ],
    map: { x: 38, y: 45 },
    experience: {
      accommodation: "Homestay with a host family in the community, shared meals included.",
      activities: [
        "Water committee (CAPS) meetings",
        "School hygiene afternoons",
        "Sunday market in Somoto",
      ],
      culture:
        "Practise everyday Nicaraguan Spanish, cook nacatamales with your host family, join Chorotega heritage evenings.",
      volunteers: 3,
    },
  },
  {
    id: "river-treatment-caribe-norte",
    name: "River Water Treatment Plant",
    community: "Ribera del Bambana",
    country: "Nicaragua",
    region: "Costa Caribe Norte",
    type: "River water treatment",
    image: caribeNorte,
    households: 90,
    people: 410,
    challenge:
      "Artisanal gold mining (güirisería) upstream has turned the Río Bambana muddy and laden with mercury. Turbidity spikes far above treatable limits and waterborne illness is rising, yet families have no alternative source.",
    solution:
      "A community-scale treatment unit — sedimentation, filtration and disinfection sized for polluted river water — plus a water-quality monitoring routine handed over to local operators.",
    solutionShort: "River treatment + monitoring",
    fundingGoal: 62000,
    fundingRaised: 24500,
    volunteersNeeded: 2,
    skills: ["Water treatment engineering", "Water quality testing", "Civil engineering"],
    duration: "8 months",
    status: "Seeking funding",
    roles: [
      {
        title: "Water Treatment Volunteer",
        duration: "3–4 weeks",
        description: "Commission the filtration and dosing stages and train local operators.",
      },
      {
        title: "Water Quality Volunteer",
        duration: "2 weeks",
        description: "Set up turbidity and heavy-metal testing and a simple record-keeping system.",
      },
    ],
    map: { x: 61, y: 36 },
    experience: {
      accommodation: "Guesthouse rooms near the community centre.",
      activities: ["River monitoring walks", "Clinic health days", "Cacao farm visits"],
      culture:
        "Miskito and Mayangna language evenings, shared cooking, weekend baseball with the build team.",
      volunteers: 2,
    },
  },
  {
    id: "handpump-wash-jinotega",
    name: "Handpump Boreholes & WASH Program",
    community: "Comarcas de El Cuá",
    country: "Nicaragua",
    region: "Jinotega",
    type: "Handpump borehole",
    image: jinotega,
    households: 260,
    people: 1150,
    challenge:
      "Four neighbouring comarcas share two failing handpumps. Queues start before dawn and children miss school. Open-water use keeps diarrhoeal disease high through the dry season.",
    solution:
      "Three new handpump boreholes across the cluster paired with a school WASH programme — hygiene education, handwashing stations and locally trained pump caretakers.",
    solutionShort: "Handpump boreholes + WASH",
    fundingGoal: 38000,
    fundingRaised: 30000,
    volunteersNeeded: 4,
    skills: ["Borehole drilling", "WASH education", "Community health", "Project management"],
    duration: "10 months",
    status: "In implementation",
    roles: [
      {
        title: "Drilling Supervision Volunteer",
        duration: "3–4 weeks",
        description:
          "Support siting, drilling supervision and pump installation with the local rig team.",
      },
      {
        title: "WASH Education Volunteer",
        duration: "2 weeks",
        description: "Co-deliver the school hygiene curriculum and set up handwashing stations.",
      },
    ],
    map: { x: 48, y: 42 },
    experience: {
      accommodation: "Shared rooms in the community guesthouse, home-cooked meals.",
      activities: ["School hygiene clubs", "Caretaker training", "Coffee cooperative visit"],
      culture: "Spanish language practice, marimba evenings, communal meals with host families.",
      volunteers: 4,
    },
  },
  {
    id: "rainwater-schools-matagalpa",
    name: "Rainwater Harvesting for Schools",
    community: "El Tuma & La Dalia Schools",
    country: "Nicaragua",
    region: "Matagalpa",
    type: "Rainwater harvesting",
    image: matagalpa,
    households: 70,
    people: 480,
    challenge:
      "Two hillside schools sit far from any borehole. In the dry months pupils carry water from home or go without, and the schools cannot run a reliable handwashing routine.",
    solution:
      "Rooftop rainwater harvesting with ferrocement storage tanks and simple point-of-use filtration at each school, sized to bridge the dry season.",
    solutionShort: "Rooftop rainwater + storage",
    fundingGoal: 22000,
    fundingRaised: 8500,
    volunteersNeeded: 2,
    skills: ["Civil engineering", "Plumbing", "WASH education"],
    duration: "5 months",
    status: "Seeking funding",
    roles: [
      {
        title: "Construction Volunteer",
        duration: "2–3 weeks",
        description:
          "Build guttering, first-flush diverters and ferrocement tanks with local masons.",
      },
      {
        title: "WASH Education Volunteer",
        duration: "1–2 weeks",
        description: "Run pupil hygiene sessions and set up the school water-management group.",
      },
    ],
    map: { x: 47, y: 48 },
    experience: {
      accommodation: "Homestay in the village, walking distance to the schools.",
      activities: ["School build days", "Black pottery workshop", "Peñas Blancas massif hike"],
      culture: "Spanish language evenings, shared cooking, community fiestas patronales.",
      volunteers: 2,
    },
  },
  {
    id: "piped-network-chontales",
    name: "Small-Town Piped Water Expansion",
    community: "La Libertad Township",
    country: "Nicaragua",
    region: "Chontales",
    type: "Piped network",
    image: chontales,
    households: 320,
    people: 1400,
    challenge:
      "The town's small piped scheme reaches only the centre. Outer barrios buy from vendors at up to ten times the tariff, and the Río Mico nearby is degraded by upstream gold mining.",
    solution:
      "Extend the piped network with new mains, metered household connections and two managed water kiosks, keeping the community water board financially self-sustaining.",
    solutionShort: "Piped mains + kiosks",
    fundingGoal: 54000,
    fundingRaised: 54000,
    volunteersNeeded: 2,
    skills: ["Civil engineering", "Project management", "Water quality testing"],
    duration: "12 months",
    status: "Fully funded",
    roles: [
      {
        title: "Network Engineering Volunteer",
        duration: "3–4 weeks",
        description:
          "Support pipe-laying supervision, metering and pressure testing with the water board.",
      },
      {
        title: "Water Quality Volunteer",
        duration: "2 weeks",
        description: "Establish routine sampling at kiosks and household taps.",
      },
    ],
    map: { x: 53, y: 59 },
    experience: {
      accommodation: "Small guesthouse in the town centre.",
      activities: ["Water board meetings", "Kiosk open days", "Juigalpa statue museum"],
      culture:
        "Spanish language practice, shared meals, weekend rides out to the Amerrisque foothills.",
      volunteers: 2,
    },
  },
  {
    id: "solar-kiosks-managua",
    name: "Solar Filtration Water Kiosks",
    community: "Ciudad Sandino Peri-Urban",
    country: "Nicaragua",
    region: "Managua",
    type: "Water kiosk",
    image: managua,
    households: 180,
    people: 800,
    challenge:
      "A fast-growing peri-urban settlement has no piped supply. Households rely on bagged water and unregulated tanker (pipa) vendors, spending a large share of income on water of uncertain quality.",
    solution:
      "Solar-powered filtration kiosks dispensing affordable, tested water, run as small community enterprises that fund their own maintenance and refill.",
    solutionShort: "Solar filtration kiosks",
    fundingGoal: 30000,
    fundingRaised: 12000,
    volunteersNeeded: 2,
    skills: ["Solar pump installation", "Water quality testing", "Community mobilization"],
    duration: "6 months",
    status: "Seeking funding",
    roles: [
      {
        title: "Solar & Filtration Volunteer",
        duration: "2–3 weeks",
        description: "Install the solar array and filtration skid and train kiosk operators.",
      },
      {
        title: "Enterprise Setup Volunteer",
        duration: "1–2 weeks",
        description: "Help set up pricing, bookkeeping and the maintenance fund with operators.",
      },
    ],
    map: { x: 41, y: 60 },
    experience: {
      accommodation: "Homestay with a host family, 15 minutes from the kiosks.",
      activities: [
        "Kiosk enterprise training",
        "Community health days",
        "Pacific coast weekend in Pochomil",
      ],
      culture: "Spanish language exchange, shared cooking, community film nights.",
      volunteers: 2,
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function fundingPercent(p: Project): number {
  return Math.round((p.fundingRaised / p.fundingGoal) * 100);
}

export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export const filterOptions = {
  location: [
    "All regions",
    "Madriz",
    "Jinotega",
    "Matagalpa",
    "Chontales",
    "Costa Caribe Norte",
    "Managua",
  ],
  type: [
    "All types",
    "Solar borehole",
    "Handpump borehole",
    "River water treatment",
    "Rainwater harvesting",
    "Piped network",
    "Water kiosk",
  ],
  skills: [
    "All skills",
    "Hydrogeology",
    "Solar pump installation",
    "Borehole drilling",
    "Water treatment engineering",
    "Water quality testing",
    "WASH education",
    "Civil engineering",
    "Community mobilization",
    "Project management",
  ],
  funding: ["Any status", "Seeking funding", "In implementation", "Fully funded"],
  duration: ["Any duration", "Under 6 months", "6–12 months", "Over 12 months"],
};
