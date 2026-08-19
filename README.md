# ImpactBridge

> Energy access. Human connection. Real impact.

ImpactBridge is a web platform prototype that connects small and rural communities
needing better energy access with the renewable energy solutions, funding, implementation
partners, and skilled volunteers that can make projects happen.

Communities describe their location, population, energy needs, existing infrastructure,
and local skills. ImpactBridge generates a preliminary energy project concept — a suggested
solution, components, estimated funding range, and the volunteer skills required. Volunteers
can browse projects worldwide, match on their skills, and take part in meaningful cultural
exchange with local communities.

The product is positioned somewhere between a clean-tech platform, a social-impact
marketplace, and a volunteer community.

## Features

- **AI energy assessment** — communities enter their details and receive a preliminary
  project concept (recommended solution, components, funding range, timeline, and skills).
- **Project directory** — browse energy projects around the world with filters for location,
  type, skills, funding status, and duration, plus a world-map view.
- **Project detail pages** — challenge, proposed solution, funding progress, and individual
  volunteer roles for each project.
- **Volunteer experience** — a volunteer area framing each project as contribution +
  learning + cultural exchange, with accommodation and community-activity details.
- **Impact community** — a lightweight feed of field updates from projects and volunteers.
- **Impact metrics** — headline numbers on communities supported, people reached, and
  volunteers connected.

> **Prototype note:** This is a front-end prototype. Project data is currently hardcoded
> (`src/lib/projects.ts`) and the energy assessment is a deterministic mock
> (`src/lib/assessment.ts`), not a real model. The assessment is deliberately shaped as an
> `async` function so its call site can later be swapped for a real AI API without changing
> any UI code.

## Tech stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (SSR) with
  [TanStack Router](https://tanstack.com/router) (file-based routing) and
  [TanStack Query](https://tanstack.com/query)
- **UI:** React 19, TypeScript, [Tailwind CSS v4](https://tailwindcss.com),
  [shadcn/ui](https://ui.shadcn.com) (Radix primitives), [lucide-react](https://lucide.dev) icons
- **Build tooling:** [Vite 8](https://vite.dev)
- **Forms & validation:** react-hook-form, zod

## Getting started

You need [Node.js](https://nodejs.org) (v20+) and npm.

```sh
git clone git@github.com:LiuWilliam-5168/ImpactBridge.git
cd ImpactBridge
npm install
npm run dev
```

The dev server runs at **http://localhost:5173**.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview a production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

## Project structure

```
src/
├── routes/               # File-based routes (TanStack Router)
│   ├── __root.tsx        # App shell: header, footer, error/404 boundaries, <head>
│   ├── index.tsx         # Home
│   ├── projects.index.tsx        # /projects — directory + filters
│   ├── projects.$projectId.tsx   # /projects/:id — project detail
│   ├── communities.tsx   # /communities — "For Communities" + assessment
│   ├── community.tsx      # /community — impact community feed
│   ├── volunteers.tsx    # /volunteers — volunteer experience
│   ├── how-it-works.tsx  # /how-it-works
│   └── about.tsx         # /about
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── sections/         # Home-page sections (HowItWorks, Impact, Pathways)
│   ├── layout/           # SiteHeader, SiteFooter
│   ├── brand/            # Logo
│   └── *.tsx             # Feature components (WorldMap, ProjectCard, AssessmentSection)
├── lib/
│   ├── projects.ts       # Mock project dataset + helpers
│   ├── assessment.ts     # Mock AI energy assessment (swap for a real API here)
│   └── ...               # SSR error handling helpers
├── assets/               # Project & community imagery
├── router.tsx            # Router + QueryClient setup
├── server.ts             # SSR entry with error normalization
└── start.ts              # Request middleware (error handling, CSRF)
```

Routing is **file-based** — every file in `src/routes/` maps to a URL, and
`src/routeTree.gen.ts` is generated automatically (don't edit it by hand).

## Key user flows

The prototype is built around two journeys:

1. **Community → project concept:** Home → *Start a community project* → enter community
   information → generate a preliminary energy solution → view the recommended project →
   find funding / volunteers.
2. **Volunteer → contribution:** Home → *Explore projects* → select a project → view details
   → apply as a volunteer.
