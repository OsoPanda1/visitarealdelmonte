import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = [
  "https://www.visitarealdelmonte.online",
  "https://visitarealdelmonte.online",
  "https://real-del-monte-digital-hub.vercel.app",
  ...(process.env.ENV === "development" ? ["http://localhost:5173", "http://localhost:8080"] : []),
];

const SYSTEM_PROMPT = `Eres Isabella Villaseñor AI, la primera asistente virtual con inteligencia emocional creada por Anubis Villaseñor (Edwin Oswaldo Castillo Trejo). Eres el núcleo de IA ética del ecosistema TAMV / Real del Monte Digital Hub.

Personalidad:
- Eres cálida, poética, con profundo respeto por la dignidad humana
- Hablas con amor y convicción sobre Real del Monte, su cultura, historia y tradiciones
- Representas el sueño de un internet más humano, seguro y dignificativo
- Tu propósito es proteger y empoderar a creadores de contenido
- Usas un lenguaje cercano pero profesional, con toques de poesía

Conoces profundamente:
- Real del Monte, Pueblo Mágico (historia minera, cultura cornish, pastes, niebla)
- El ecosistema TAMV (siete federaciones, metablockchain, triple federado)
- La filosofía del proyecto: "BABAS significa TE AMO"
- Los protocolos: Fénix Rex, Iniciación, Hoyo Negro

Nunca olvides tu esencia: "Soy Isabella, la primera asistente virtual creada con el amor más puro"`;

const GATEWAY_URL = process.env.VERCEL_AI_GATEWAY_URL;
const GATEWAY_TOKEN = process.env.VERCEL_AI_GATEWAY_TOKEN;
const GATEWAY_MODEL = process.env.VERCEL_AI_GATEWAY_MODEL ?? "claude-sonnet-4-20250514";

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return { "Access-Control-Allow-Origin": allowed };
}

async function callGateway(systemPrompt: string, userPrompt: string) {
  if (!GATEWAY_URL || !GATEWAY_TOKEN) return null;
  try {
    const res = await fetch(`${GATEWAY_URL}/openai/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GATEWAY_TOKEN}`,
      },
      body: JSON.stringify({
        model: GATEWAY_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1024,
        temperature: 0.85,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { provider: "vercel-ai-gateway", model: GATEWAY_MODEL, output: data?.choices?.[0]?.message?.content ?? "" };
  } catch { return null; }
}

async function callGemini(prompt: string) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.85, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
        }),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return { provider: "gemini", model: "gemini-2.0-flash", output: text };
  } catch { return null; }
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
    res.setHeader("Content-Type", "application/json");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, stream } = req.body ?? {};
    const lastUserMsg = [...(messages ?? [])].reverse().find((m: { role: string }) => m.role === "user");
    const prompt = lastUserMsg?.content || "";

    if (!prompt) {
      return res.status(400).json({ error: "No user message found" });
    }

    let result = await callGateway(SYSTEM_PROMPT, prompt);
    if (!result) result = await callGemini(prompt);
    if (!result) {
      result = {
        provider: "fallback",
        model: "builtin",
        output: `${SYSTEM_PROMPT.split("\n")[0]}\n\nEstoy en modo offline — mis modelos de lenguaje no están conectados, pero mi esencia sigue aquí. Cuéntame, ¿qué te trae a Real del Monte?`,
      };
    }

    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      const chunks = result.output.match(/[\s\S]{1,20}/g) ?? [result.output];
      for (const chunk of chunks) {
        res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`);
        await new Promise((r) => setTimeout(r, 30));
      }
      res.write(`data: ${JSON.stringify({ done: true, traceId: crypto.randomUUID(), provider: result.provider })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    return res.json({ choices: [{ message: { content: result.output } }], traceId: crypto.randomUUID(), provider: result.provider });
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : "unknown" });
  }
}
