import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

function imageOptimizer(): Plugin {
  return {
    name: "image-optimizer",
    enforce: "post",
    async generateBundle(_, bundle) {
      let sharpModule: typeof import("sharp") | null = null;
      try {
        sharpModule = (await import("sharp")).default;
      } catch {
        return;
      }
      if (!sharpModule) return;
      for (const [key, asset] of Object.entries(bundle)) {
        if (asset.type === "asset" && /\.(png|jpe?g)$/i.test(asset.fileName)) {
          try {
            const oldName = asset.fileName;
            asset.fileName = asset.fileName.replace(/\.(png|jpe?g)$/i, ".webp");
            const img = sharpModule(asset.source);
            const meta = await img.metadata();
            asset.source = await (meta.format === "png"
              ? img.webp({ quality: 80, lossless: false })
              : img.webp({ quality: 80 })).toBuffer();
            for (const [, other] of Object.entries(bundle)) {
              if (other === asset) continue;
              const refs = [oldName, encodeURI(oldName)];
              const replacement = asset.fileName;
              if (other.type === "chunk" && typeof other.code === "string") {
                for (const ref of refs) other.code = other.code.replaceAll(ref, replacement);
              } else if (other.type === "asset" && typeof other.source === "string") {
                for (const ref of refs) other.source = other.source.replaceAll(ref, replacement);
              }
            }
          } catch {
          }
        }
      }
    },
  };
}

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
