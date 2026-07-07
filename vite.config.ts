import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") && (id.includes("react-dom") || id.includes("scheduler"))) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("three") || id.includes("@react-three")) {
              return "vendor-three";
            }
            if (id.includes("leaflet") || id.includes("react-leaflet")) {
              return "vendor-leaflet";
            }
            if (id.includes("recharts")) {
              return "vendor-recharts";
            }
            if (id.includes("supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("@tanstack/react-query")) {
              return "vendor-tanstack";
            }
            if (id.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (id.includes("date-fns")) {
              return "vendor-date";
            }
            if (id.includes("stripe")) {
              return "vendor-stripe";
            }
            if (id.includes("posthog")) {
              return "vendor-posthog";
            }
            if (id.includes("zod") || id.includes("react-hook-form")) {
              return "vendor-forms";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("@hookform")) {
              return "vendor-forms";
            }
            if (id.includes("react-router-dom")) {
              return "vendor-router";
            }
            return "vendor-other";
          }
        },
      },
    },
  },
});
