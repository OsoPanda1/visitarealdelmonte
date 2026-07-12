// Isabella Voice Engine — Text-to-Speech via Vercel Function
// Fallback chain: Google Cloud TTS → Web Speech API (client-side)

import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = [
  "https://www.visitarealdelmonte.online",
  "https://visitarealdelmonte.online",
  "https://real-del-monte-digital-hub.vercel.app",
  ...(process.env.ENV === "development" ? ["http://localhost:5173", "http://localhost:8080"] : []),
];

const TTS_PROFILES: Record<string, { speakingRate: number; pitch: number }> = {
  F1: { speakingRate: 0.8, pitch: -2 },
  F2: { speakingRate: 1.0, pitch: 0 },
  F3: { speakingRate: 1.0, pitch: 1 },
  F4: { speakingRate: 1.2, pitch: 2 },
  F5: { speakingRate: 1.0, pitch: 1 },
  F6: { speakingRate: 0.9, pitch: -1 },
  F7: { speakingRate: 0.8, pitch: -2 },
};

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

async function callGoogleTTS(text: string, profile: string, language: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) return null;

  const p = TTS_PROFILES[profile] || TTS_PROFILES.F6;
  try {
    const res = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: language || "es-MX", name: "es-MX-Wavenet-B" },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: p.speakingRate,
            pitch: p.pitch,
          },
        }),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.audioContent || null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? null;
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(200).send("ok");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, profile, language } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    const voiceProfile = profile || "F6";
    const lang = language || "es-MX";

    // Try Google Cloud TTS first
    const audioBase64 = await callGoogleTTS(text, voiceProfile, lang);
    if (audioBase64) {
      const audioBuffer = Buffer.from(audioBase64, "base64");
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length);
      return res.status(200).send(audioBuffer);
    }

    // No cloud TTS available — tell client to use Web Speech API
    return res.status(200).json({
      mode: "local",
      text,
      profile: voiceProfile,
      message: "Cloud TTS unavailable, use Web Speech API",
    });
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : "unknown" });
  }
}
