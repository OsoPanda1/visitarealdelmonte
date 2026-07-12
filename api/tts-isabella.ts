// Isabella Voice Engine — Text-to-Speech via Vercel Function
// Fallback chain: Google Cloud TTS (Neural2) → Web Speech API (client-side)

import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = [
  "https://www.visitarealdelmonte.online",
  "https://visitarealdelmonte.online",
  "https://real-del-monte-digital-hub.vercel.app",
];

if (process.env.ENV === "development") {
  ALLOWED_ORIGINS.push("http://localhost:5173", "http://localhost:8080");
}

// Perfiles de voz TAMV: Frecuencias, velocidades y balances sintonizados
const TTS_PROFILES: Record<string, { speakingRate: number; pitch: number }> = {
  F1: { speakingRate: 0.85, pitch: -1.5 },
  F2: { speakingRate: 0.95, pitch: -0.5 },
  F3: { speakingRate: 1.0, pitch: 0.0 },
  F4: { speakingRate: 1.1, pitch: 1.0 },
  F5: { speakingRate: 1.0, pitch: 0.5 },
  F6: { speakingRate: 0.9, pitch: -1.0 },
  F7: { speakingRate: 0.8, pitch: -2.0 },
};

type SupportedLanguage = "es-MX" | "es-ES" | "en-US" | "pt-BR";

interface TTSRequestBody {
  text?: string;
  profile?: keyof typeof TTS_PROFILES;
  language?: SupportedLanguage | string;
}

function buildCorsHeaders(origin: string | null) {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Authorization, Content-Type, X-Isabella-Client, X-Isabella-Token",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "X-Content-Type-Options": "nosniff",
  };
}

function sanitizeText(input: unknown): string {
  if (typeof input !== "string") {
    throw new Error("Text must be a valid string");
  }

  const text = input.trim().replace(/[\s\n\r]+/g, " ");
  if (!text) {
    throw new Error("Text content cannot be empty");
  }

  if (text.length > 1500) {
    throw new Error(
      "Text payload exceeds the safe limits of Isabella Engine (Max 1500 chars)",
    );
  }

  return text;
}

function sanitizeProfile(input: unknown): keyof typeof TTS_PROFILES {
  if (!input || typeof input !== "string") return "F6";
  return (TTS_PROFILES[input] ? input : "F6") as keyof typeof TTS_PROFILES;
}

function sanitizeLanguage(input: unknown): SupportedLanguage {
  if (typeof input !== "string") return "es-MX";

  const lower = input.toLowerCase();
  if (lower.startsWith("es-mx")) return "es-MX";
  if (lower.startsWith("es-es")) return "es-ES";
  if (lower.startsWith("en-us")) return "en-US";
  if (lower.startsWith("pt-br")) return "pt-BR";

  return "es-MX";
}

// Token interno para evitar abuso desde infra no autorizada
function validateInternalToken(req: VercelRequest) {
  const serverToken = process.env.ISABELLA_INTERNAL_TOKEN;
  if (!serverToken) return;

  const headerToken =
    (req.headers["x-isabella-token"] as string | undefined)?.trim() ?? "";
  if (!headerToken || headerToken !== serverToken) {
    const err = new Error("Unauthorized infrastructure call");
    (err as any).statusCode = 403;
    throw err;
  }
}

// Motor de síntesis: Google Cloud TTS (Neural2)
async function callGoogleTTS(
  text: string,
  profile: keyof typeof TTS_PROFILES,
  language: SupportedLanguage,
): Promise<string | null> {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    console.warn("Isabella TTS: GOOGLE_TTS_API_KEY missing; bypassing cloud synthesis.");
    return null;
  }

  const configuration = TTS_PROFILES[profile] ?? TTS_PROFILES.F6;

  const voiceMapping: Record<SupportedLanguage, string> = {
    "es-MX": "es-MX-Neural2-B",
    "es-ES": "es-ES-Neural2-C",
    "en-US": "en-US-Neural2-F",
    "pt-BR": "pt-BR-Neural2-B",
  };

  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: language,
            name: voiceMapping[language] || "es-MX-Neural2-B",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: configuration.speakingRate,
            pitch: configuration.pitch,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorContext = await response.text().catch(() => "");
      console.error(`Google TTS API error [${response.status}]:`, errorContext);
      return null;
    }

    const data = (await response.json()) as { audioContent?: string };
    return data.audioContent ?? null;
  } catch (err) {
    console.error("Isabella TTS: critical connection failure:", err);
    return null;
  }
}

// Handler principal
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const origin = (req.headers.origin as string | undefined) ?? null;
  const corsHeaders = buildCorsHeaders(origin);

  Object.entries(corsHeaders).forEach(([key, value]) =>
    res.setHeader(key, value),
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Execution method injection denied" });
  }

  try {
    // Blindaje anti-abuso por infraestructura
    validateInternalToken(req);

    const body: TTSRequestBody =
      typeof req.body === "object" && req.body !== null ? req.body : {};

    const text = sanitizeText(body.text);
    const profile = sanitizeProfile(body.profile);
    const language = sanitizeLanguage(body.language);

    const audioBase64 = await callGoogleTTS(text, profile, language);

    if (audioBase64) {
      const audioBuffer = Buffer.from(audioBase64, "base64");
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length.toString());
      res.setHeader(
        "Cache-Control",
        "public, max-age=86400, s-maxage=86400",
      );
      res.setHeader("X-Isabella-Mode", "cloud");
      res.setHeader("X-Isabella-Lang", language);
      res.setHeader("X-Isabella-Profile", profile);
      return res.status(200).send(audioBuffer);
    }

    // Fallback a Web Speech API
    res.setHeader("X-Isabella-Mode", "local");
    res.setHeader("X-Isabella-Lang", language);
    res.setHeader("X-Isabella-Profile", profile);

    return res.status(200).json({
      mode: "local",
      text,
      profile,
      language,
      message:
        "Neural Cloud TTS bypassed. Delegating speech generation to Web Speech UI.",
    });
  } catch (e) {
    console.error("Isabella TTS handler error:", e);
    const status =
      e && typeof e === "object" && "statusCode" in e
        ? (e as any).statusCode || 400
        : 400;
    const errorMessage =
      e instanceof Error ? e.message : "Internal Core Engine Error";

    return res.status(status).json({ error: errorMessage });
  }
}
