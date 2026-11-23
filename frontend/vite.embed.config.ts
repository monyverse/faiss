import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// The embeddable copilot: one self-contained file that registers <faiss-copilot>.
// React and the styles are bundled in; the CSS is injected into the element's shadow root.
export default defineConfig({
  publicDir: false,
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  plugins: [tsconfigPaths({ projects: ["./tsconfig.json"] }), tailwindcss(), viteReact()],
  build: {
    outDir: "dist-embed",
    emptyOutDir: true,
    cssCodeSplit: false,
    target: "es2022",
    lib: {
      entry: "src/embed/element.tsx",
      name: "FaissCopilot",
      formats: ["iife"],
      fileName: () => "faiss-copilot.js",
    },
  },
});
