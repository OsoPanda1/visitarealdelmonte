// .env.schema.ts — Validación centralizada de variables de entorno con Zod
// Ejecutar: npx tsx .env.schema.ts
// Importar en bootstrap para validación en runtime

import { z } from "zod";

const envSchema = z.object({
  // === Supabase (requerido) ===
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),

  // === Sentry (opcional) ===
  VITE_SENTRY_DSN: z.string().optional(),

  // === PostHog (opcional) ===
  VITE_POSTHOG_KEY: z.string().optional(),
  VITE_POSTHOG_HOST: z.string().url().optional(),

  // === Entorno ===
  VITE_APP_ENV: z.enum(["development", "preview", "production", "test"]).default("development"),

  // === Vercel AI Gateway (opcional) ===
  VERCEL_AI_GATEWAY_URL: z.string().optional(),
  VERCEL_AI_GATEWAY_TOKEN: z.string().optional(),
  VERCEL_AI_GATEWAY_MODEL: z.string().optional(),

  // === Gemini / Fallback AI (opcional) ===
  GEMINI_API_KEY: z.string().optional(),

  // === Model Router (opcional) ===
  MODEL_ROUTER_URL: z.string().optional(),
  MODEL_ROUTER_TOKEN: z.string().optional(),
  HUGGINGFACE_API_TOKEN: z.string().optional(),
  ISABELLA_MODEL_NAME: z.string().optional(),
  REALITO_MODEL_NAME: z.string().optional(),
  OPENLLM_API_URL: z.string().optional(),
  OPENLLM_API_TOKEN: z.string().optional(),
  GOOGLE_TTS_API_KEY: z.string().optional(),

  // === TTS (opcional) ===
  VITE_TTS_ENDPOINT: z.string().optional(),

  // === Google OAuth (opcional) ===
  VITE_NEXT_PUBLIC_SUPABASE_REDIRECT_URL: z.string().url().optional(),

  // === Supabase server-side (sin prefijo VITE_) ===
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  CRON_SECRET: z.string().optional(),
  AUTONOMA_CLIENT_ID: z.string().optional(),
  AUTONOMA_SECRET_ID: z.string().optional(),

  // === Stripe (opcional) ===
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error("[env] Validation errors:", result.error.flatten().fieldErrors);
    throw new Error("Environment variable validation failed");
  }
  return result.data;
}

// Auto-ejecución si se invoca directamente
if (import.meta.main) {
  validateEnv(process.env as Record<string, string | undefined>);
  console.log("[env] All variables validated successfully");
}
