import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// The standalone app: TanStack Start (SSR) built by Nitro into `.output/` and run with
// `node .output/server/index.mjs`. The embeddable copilot has its own config: vite.embed.config.ts.
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    // In the cluster the ingress sends /api straight to the API. In development Vite does it.
    proxy: {
      "/api": { target: process.env.FAISS_API_INTERNAL_URL ?? "http://localhost:8000", changeOrigin: true },
    },
  },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    // Must come before the React plugin. `src/server.ts` is the server entry (health, /api proxy).
    tanstackStart({ server: { entry: "server" } }),
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
