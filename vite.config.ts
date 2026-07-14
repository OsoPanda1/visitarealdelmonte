import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { imageOptimizer } from "./scripts/image-optimizer.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), imageOptimizer()],
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
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-framer";
          if (id.includes("three") || id.includes("@react-three")) return "vendor-three";
          if (id.includes("leaflet") || id.includes("react-leaflet") || id.includes("supercluster")) return "vendor-leaflet";
          if (id.includes("recharts")) return "vendor-recharts";
          if (id.includes("supabase")) return "vendor-supabase";
          if (id.includes("@tanstack/react-query")) return "vendor-tanstack";
          if (id.includes("lucide-react")) return "vendor-lucide";
          if (id.includes("date-fns")) return "vendor-date";
          if (id.includes("stripe")) return "vendor-stripe";
          if (id.includes("posthog")) return "vendor-posthog";
          if (id.includes("zod") || id.includes("react-hook-form") || id.includes("@hookform")) return "vendor-forms";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("react-router-dom")) return "vendor-router";
          if (id.includes("sonner")) return "vendor-sonner";
          if (id.includes("cmdk") || id.includes("vaul") || id.includes("input-otp") || id.includes("embla")) return "vendor-ui";
          if (id.includes("react-markdown") || id.includes("rehype") || id.includes("remark")) return "vendor-markdown";
          if (id.includes("zustand")) return "vendor-state";
          if (id.includes("class-variance-authority") || id.includes("clsx") || id.includes("tailwind-merge")) return "vendor-utils";
          if (id.includes("react-day-picker") || id.includes("react-resizable-panels")) return "vendor-ui-libs";
          if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
          return "vendor-other";
        },
      },
    },
  },
});
