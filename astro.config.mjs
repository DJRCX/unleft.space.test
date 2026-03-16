// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://unleft.space",
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    optimizeDeps: {
      include: ["nanostores", "@nanostores/react", "lucide-react", "clsx", "tailwind-merge", "framer-motion"],
    },
    ssr: {
      noExternal: ["nanostores", "@nanostores/react", "lucide-react", "clsx", "tailwind-merge", "framer-motion"],
    },
  },
});
