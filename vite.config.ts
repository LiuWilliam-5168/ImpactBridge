import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    tanstackStart({ server: { entry: "server" } }),
    // Build the SSR server for Vercel's Build Output API (emits .vercel/output).
    // Build-only so the `vite dev` server is unaffected.
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
    viteReact(),
  ],
}));
