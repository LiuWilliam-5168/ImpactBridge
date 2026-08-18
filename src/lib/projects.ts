import kenya from "@/assets/project-kenya.jpg";
import lesotho from "@/assets/project-lesotho.jpg";
import nepal from "@/assets/project-nepal.jpg";
import peru from "@/assets/project-peru.jpg";

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
  /** Rough map position in percent of the map viewport. */
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
    id: "solar-microgrid-kenya",
    name: "Solar Microgrid",
    community: "Kijiji Community",
    country: "Kenya",
    region: "Africa",
    type: "Solar microgrid",
    image: kenya,
    households: 120,
    people: 500,
    challenge:
      "500 people currently have limited access to reliable electricity. The school closes at dusk and the health centre runs a diesel generator for a few hours each evening.",
    solution:
      "Solar PV + battery storage system serving households and essential community facilities, operated by a locally trained technical team.",
    solutionShort: "Solar PV + battery microgrid",
    fundingGoal: 40000,
    fundingRaised: 28000,
    volunteersNeeded: 3,
    skills: ["Solar installation", "Electrical engineering", "Project management", "Community engagement"],
    duration: "6 months",
    status: "Seeking funding",
    roles: [
      {
        title: "Solar Energy Volunteer",
        duration: "2–4 weeks",
        description: "Support panel mounting, wiring and commissioning alongside local electricians.",
      },
      {
        title: "Electrical Engineering Volunteer",
        duration: "2 weeks",
        description: "Review the distribution design and support safety testing of the microgrid.",
      },
      {
        title: "Community Engagement",
        duration: "1–2 weeks",
        description: "Run household workshops on energy use, tariffs and maintenance routines.",
      },
    ],
    map: { x: 57.5, y: 58 },
    experience: {
      accommodation: "Homestay with a host family in the village, shared meals included.",
      activities: ["Village energy committee meetings", "School science afternoons", "Weekly market day"],
      culture: "Learn Swahili basics, cook with your host family, join community football evenings.",
      volunteers: 3,
    },
  },
  {
    id: "renewable-energy-lesotho",
    name: "Highland Renewable Energy Project",
    community: "Ha Sekake",
    country: "Lesotho",
    region: "Africa",
    type: "Hybrid solar + wind",
    image: lesotho,
    households: 80,
    people: 340,
    challenge:
      "Highland households rely on paraffin and candles. Winter nights are long and the local clinic cannot store vaccines reliably.",
    solution:
      "Hybrid solar and small wind system with battery storage for the clinic, school and surrounding homesteads.",
    solutionShort: "Hybrid solar + wind with storage",
    fundingGoal: 26000,
    fundingRaised: 11500,
    volunteersNeeded: 2,
    skills: ["Energy systems", "Electrical engineering", "Data & monitoring"],
    duration: "2-week experience",
    status: "Seeking funding",
    roles: [
      {
        title: "Energy Systems Volunteer",
        duration: "2 weeks",
        description: "Size the hybrid system and set up monitoring for the first winter season.",
      },
      {
        title: "Electrical Engineering Volunteer",
        duration: "2 weeks",
        description: "Support installation and safety inspection of clinic circuits.",
      },
    ],
    map: { x: 55.5, y: 74 },
    experience: {
      accommodation: "Guesthouse rooms next to the community hall.",
      activities: ["Pony trekking with local herders", "Blanket weaving workshop", "Clinic open days"],
      culture: "Sesotho language evenings, traditional music, shared cooking over open fire.",
      volunteers: 2,
    },
  },
  {
    id: "micro-hydro-nepal",
    name: "Micro-Hydro for Two Villages",
    community: "Simkhola Valley",
    country: "Nepal",
    region: "Asia",
    type: "Micro-hydro",
    image: nepal,
    households: 210,
    people: 900,
    challenge:
      "Two mountain villages are far from the national grid. Grain milling is done by hand and children study by kerosene lamp.",
    solution:
      "A 35 kW run-of-river micro-hydro plant with a small distribution network and a community-run maintenance fund.",
    solutionShort: "35 kW run-of-river micro-hydro",
    fundingGoal: 65000,
    fundingRaised: 58500,
    volunteersNeeded: 4,
    skills: ["Civil engineering", "Hydro systems", "Project management", "Training & education"],
    duration: "12 months",
    status: "In implementation",
    roles: [
      {
        title: "Hydro Systems Volunteer",
        duration: "3–4 weeks",
        description: "Support intake and turbine commissioning with the local build team.",
      },
      {
        title: "Training & Education Volunteer",
        duration: "2 weeks",
        description: "Co-design the operator training programme with the village committee.",
      },
    ],
    map: { x: 70, y: 45 },
    experience: {
      accommodation: "Village lodge with shared rooms and home-cooked meals.",
      activities: ["Valley trekking", "Festival preparations", "School energy club"],
      culture: "Nepali language practice, momo cooking, tea house evenings with the build team.",
      volunteers: 4,
    },
  },
  {
    id: "clinic-solar-peru",
    name: "Andean Clinic Solar Upgrade",
    community: "Comunidad de Quillabamba",
    country: "Peru",
    region: "South America",
    type: "Solar for facilities",
    image: peru,
    households: 60,
    people: 260,
    challenge:
      "The rural clinic loses power several times a week, interrupting cold chain storage and evening consultations.",
    solution:
      "Rooftop solar with battery backup for the clinic plus efficient lighting for the adjoining school.",
    solutionShort: "Rooftop solar + battery backup",
    fundingGoal: 18000,
    fundingRaised: 18000,
    volunteersNeeded: 1,
    skills: ["Solar installation", "Health facility energy", "Spanish"],
    duration: "4 months",
    status: "Fully funded",
    roles: [
      {
        title: "Solar Installation Volunteer",
        duration: "2 weeks",
        description: "Install rooftop arrays and hand over maintenance routines to clinic staff.",
      },
    ],
    map: { x: 29, y: 68 },
    experience: {
      accommodation: "Family homestay in the valley, 20 minutes from the clinic.",
      activities: ["Clinic health days", "Weekly community assembly", "Highland farming"],
      culture: "Spanish and Quechua exchange, weaving cooperative visits, shared Sunday meals.",
      volunteers: 1,
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function fundingPercent(p: Project): number {
  return Math.round((p.fundingRaised / p.fundingGoal) * 100);
}

export function formatEuro(value: number): string {
  return `€${value.toLocaleString("en-US")}`;
}

export const filterOptions = {
  location: ["All locations", "Africa", "Asia", "South America"],
  type: ["All types", "Solar microgrid", "Hybrid solar + wind", "Micro-hydro", "Solar for facilities"],
  skills: [
    "All skills",
    "Solar installation",
    "Electrical engineering",
    "Energy systems",
    "Project management",
    "Community engagement",
  ],
  funding: ["Any status", "Seeking funding", "In implementation", "Fully funded"],
  duration: ["Any duration", "Under 6 months", "6–12 months", "Over 12 months"],
};
