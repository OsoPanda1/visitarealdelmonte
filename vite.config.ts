import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import compression from "vite-plugin-compression";

type ImageOptMod = { imageOptimizer: () => PluginOption };

async function loadOptimizer(): Promise<PluginOption | null> {
  try {
    const mod: ImageOptMod = await import("./scripts/image-optimizer.js");
    return mod.imageOptimizer();
  } catch {
    return null;
  }
}

export default defineConfig(async () => {
  const optimizer = await loadOptimizer();
  return {
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      compression({ algorithm: "gzip" }),
      compression({ algorithm: "brotliCompress" }),
      optimizer,
    ].filter(Boolean),
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        "@": "/src",
        "@components": "/src/components",
        "@hooks": "/src/hooks",
        "@services": "/src/services",
        "@utils": "/src/utils",
        "@types": "/src/types",
      },
    },
    envPrefix: ["VITE_"],
    cacheDir: ".vite",
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      include: [
        "@supabase/supabase-js",
        "react",
        "react-dom",
        "react-router-dom",
      ],
    },
    build: {
      target: "es2022",
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 500,
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks(id: string) {
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
  };
});
