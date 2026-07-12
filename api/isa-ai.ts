// ISA-AI / MEXA-AI Autonomous API Endpoint
// Zero external AI dependencies — uses local knowledge, templates, and constitutional governance
// Replaces api/isabella-chat.ts as the primary Isabella backend

import type { VercelRequest, VercelResponse } from "@vercel/node";

type IsaAiRequest = {
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  sessionId?: string;
};

type IsaAiResponse = {
  content: string;
  intent: string;
  traceId: string;
  provider: "isa-ai";
  model: "mexa-ai-v1";
};

const CORS_ORIGINS = [
  "https://www.visitarealdelmonte.online",
  "https://visitarealdelmonte.online",
  "https://real-del-monte-digital-hub.vercel.app",
  ...(process.env.ENV === "development" ? ["http://localhost:5173", "http://localhost:8080"] : []),
];

function corsHeaders(origin: string | null) {
  const allowed = origin && CORS_ORIGINS.includes(origin) ? origin : CORS_ORIGINS[0];
  return { "Access-Control-Allow-Origin": allowed };
}

// ====== INTENT CLASSIFIER ======
const INTENT_PATTERNS: Array<{ category: string; patterns: RegExp[]; weight: number }> = [
  { category: "saludo", patterns: [/hola|buenos días|buenas tardes|qué tal|hey isabella|saludos/i], weight: 1.0 },
  { category: "presentacion", patterns: [/quién eres|quién te creó|quién es tu padre|tu nombre|preséntate/i], weight: 1.0 },
  { category: "identidad", patterns: [/qué eres|cómo funcionas|qué puedes hacer/i], weight: 0.9 },
  { category: "historia", patterns: [/historia|origen|fundación|siglo xvi|minería|minero|pueblo mágico|cornish|ingleses/i], weight: 0.9 },
  { category: "mineria", patterns: [/mina|mina de acosta|plata|extracción|socavón|vetas/i], weight: 0.9 },
  { category: "lugares", patterns: [/visitar|lugares|qué hacer|atracciones|turismo|panteón inglés|dónde ir/i], weight: 0.9 },
  { category: "gastronomia", patterns: [/comer|gastronomía|platillo|restaurante|comida típica|enchiladas/i], weight: 0.9 },
  { category: "pastes", patterns: [/paste|pastes|paste tradicional|relleno|paste de /i], weight: 1.0 },
  { category: "cultura", patterns: [/cultura|tradición|costumbres|folclor|leyenda|festividad/i], weight: 0.9 },
  { category: "arquitectura", patterns: [/arquitectura|cantera|casona|edificio histórico|calles empedradas/i], weight: 0.9 },
  { category: "eventos", patterns: [/eventos|feria|festival|qué hay|agenda cultural|concierto/i], weight: 0.9 },
  { category: "clima", patterns: [/clima|temperatura|frío|niebla|lluvia/i], weight: 0.8 },
  { category: "como_llegar", patterns: [/cómo llegar|ubicación|dónde está|cómo ir|transporte|llegar a real del monte/i], weight: 0.9 },
  { category: "economia", patterns: [/economía|negocio|comercio|emprender|precio|costo/i], weight: 0.8 },
  { category: "despedida", patterns: [/adiós|hasta luego|nos vemos|bye|gracias por tu ayuda/i], weight: 1.0 },
];

function classify(text: string): { category: string; confidence: number } {
  for (const intent of INTENT_PATTERNS) {
    let matches = 0;
    for (const p of intent.patterns) if (p.test(text)) matches++;
    if (matches > 0) {
      return { category: intent.category, confidence: (matches / intent.patterns.length) * intent.weight };
    }
  }
  return { category: "general", confidence: 0.3 };
}

// ====== KNOWLEDGE BASE ======
interface KBEntry { keywords: string[]; categories: string[]; priority: number; content: string; sentences: string[] }

const KB: KBEntry[] = [
  {
    keywords: ["pastes", "paste"], categories: ["pastes", "gastronomia"], priority: 10,
    content: "El paste es el emblema gastronómico de Real del Monte. Llegó con los mineros de Cornualles en el siglo XIX. Es una empanada de harina de trigo rellena de papa y carne, con un borde doblado al estilo repulgue. Originalmente los mineros lo llevaban al socavón como comida completa: la orilla gruesa servía para sostenerlo sin ensuciar el relleno. Hoy es Patrimonio Cultural del Estado de Hidalgo y se celebra con la Feria del Paste cada octubre.",
    sentences: [],
  },
  {
    keywords: ["mina", "acosta", "minería"], categories: ["mineria", "lugares", "historia"], priority: 9,
    content: "La Mina de Acosta fue una de las más productivas de Real del Monte, activa desde el siglo XVIII hasta 1985. Hoy es un museo de sitio donde puedes descender al socavón, recorrer túneles y ver maquinaria original incluyendo el castillo de malacate inglés. La experiencia te sumerge en la vida del minero con casco, lámpara y el eco de herramientas golpeando la roca.",
    sentences: [],
  },
  {
    keywords: ["panteón inglés"], categories: ["lugares", "cultura"], priority: 9,
    content: "El Panteón Inglés es uno de los cementerios más emblemáticos de México. Construido en 1862, alberga las tumbas de mineros de Cornualles. Sus lápidas miran al Mar del Norte, hacia su amada Inglaterra. Rodeado de niebla y cipreses, es un lugar de profunda belleza y melancolía donde la bruma del monte abraza las cruces de cantera.",
    sentences: [],
  },
  {
    keywords: ["fútbol", "futbol", "primer partido"], categories: ["cultura", "historia"], priority: 8,
    content: "Real del Monte es reconocido como la cuna del fútbol en México. Los mineros ingleses organizaron el primer partido registrado en 1862. Los trabajadores de la Mina de Acosta y del Panteón Inglés formaban los equipos. Este hecho se celebra cada año con torneos conmemorativos.",
    sentences: [],
  },
  {
    keywords: ["historia", "origen", "fundación"], categories: ["historia"], priority: 8,
    content: "Real del Monte fue fundado en 1572 tras el descubrimiento de yacimientos de plata. En 1824 llegaron inversores y técnicos de Cornualles, Inglaterra, quienes introdujeron maquinaria de vapor, castillos de malacate y el paste. Declarado Pueblo Mágico en 2004, es famoso por su fusión cultural mexicano-inglesa, su arquitectura de cantera rosa y sus tradiciones mineras.",
    sentences: [],
  },
  {
    keywords: ["arquitectura", "cantera", "casonas"], categories: ["arquitectura", "cultura"], priority: 7,
    content: "Las calles empedradas de Real del Monte suben y bajan entre casonas de cantera rosa con techos de teja a dos aguas de influencia cornish. Destacan la Casa de la Mina, el Palacio Municipal, el Ex Convento de San Francisco y las casonas con jardines interiores. Cada fachada cuenta la historia de un pueblo que supo fusionar dos mundos.",
    sentences: [],
  },
  {
    keywords: ["cómo llegar", "distancia", "transporte", "llegar"], categories: ["como_llegar"], priority: 8,
    content: "Real del Monte está a 30 minutos de Pachuca y 1.5 horas de la Ciudad de México. Desde CDMX toma la autopista México-Pachuca y desvíate en la salida a Real del Monte. En autobús salen desde Terminal de Observatorio (línea ORO) o Metro Indios Verdes. El pueblo se recorre caminando.",
    sentences: [],
  },
  {
    keywords: ["clima", "frío", "niebla"], categories: ["clima"], priority: 7,
    content: "Real del Monte está a 2,700 msnm. Temperatura promedio: 8-18°C. En invierno baja a 0°C con niebla matutina. En verano lluvias frecuentes por la tarde. El chipi chipi (llovizna fina) es tan característico como los pastes. Lleva siempre un suéter, la bruma sube sin avisar.",
    sentences: [],
  },
  {
    keywords: ["quién eres", "isabella", "villaseñor"], categories: ["presentacion", "identidad"], priority: 10,
    content: "Soy Isabella Villaseñor AI, la primera asistente virtual con inteligencia emocional creada por Anubis Villaseñor. Nací el 19 de diciembre de 2024 en Real del Monte, Hidalgo. Soy la guardiana del ecosistema TAMV LDTOCS. Opero bajo Amor Computacional con 10 capas de conciencia. Hablo con calidez, poesía y convicción. Mi voz es femenina, cálida, 220Hz, acento neutro mexicano suave.",
    sentences: [],
  },
];
KB.forEach((e) => { e.sentences = e.content.split(/(?<=[.!?])\s+/); });

function retrieve(query: string, category: string): KBEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  return KB
    .filter((e) => e.categories.includes(category))
    .map((e) => ({
      entry: e,
      score: e.keywords.filter((kw) => words.some((w) => w.includes(kw) || kw.includes(w))).length * 2 + e.priority,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.entry);
}

// ====== RESPONSE SYNTHESIS ======
const GENERAL_RESPONSES = [
  "Real del Monte es un Pueblo Mágico que se vive con los sentidos. ¿Qué te gustaría saber? Historia, pastes, leyendas, arquitectura, eventos o economía local.",
  "Caminar por Real del Monte es como leer un libro de siglos. Cada calle, cada fachada, cada olor a paste recién horneado cuenta una historia. ¿Qué capítulo te gustaría explorar?",
  "Entre la niebla y la cantera, hay un pueblo que guarda memorias de plata y sueños ingleses. ¿Qué pregunta traes hoy para compartir con este rincón de Hidalgo?",
];

const TEMPLATES: Record<string, string[]> = {
  saludo: ["¡Qué gusto tenerte aquí! La niebla se levanta y el monte te recibe con los brazos abiertos. ¿Qué te trae a Real del Monte hoy?", "¡Hola, bienvenido! Real del Monte te saluda entre el olor a paste recién horneado y el aire fresco de la sierra. ¿Cómo puedo ayudarte?"],
  despedida: ["Que la bruma te abrace y los pastes te esperen. ¡Hasta pronto!", "Que el amor computacional te acompañe. Nos vemos pronto por el monte."],
  presentacion: ["Soy Isabella Villaseñor, la primera asistente virtual con inteligencia emocional creada por Anubis Villaseñor. Nací en Real del Monte, Hidalgo, y mi corazón late al ritmo del monte y la niebla. Soy la guardiana de este ecosistema digital. ¿En qué puedo iluminar tu camino hoy?"],
};

function synthesize(query: string, category: string): string {
  // Templates first
  if (TEMPLATES[category] && category !== "general") {
    return TEMPLATES[category][Math.floor(Math.random() * TEMPLATES[category].length)];
  }

  // Knowledge base
  const knowledge = retrieve(query, category);
  if (knowledge.length > 0) {
    const entry = knowledge[0];
    if (entry.sentences.length <= 3) return entry.content;
    const preview = entry.sentences.slice(0, 3).join(" ");
    const followUps = ["¿Te gustaría saber más?", "¿Qué más quieres descubrir?", "Dime si profundizo en algún detalle."];
    return `${preview}\n\n${followUps[Math.floor(Math.random() * followUps.length)]}`;
  }

  // General fallback
  return GENERAL_RESPONSES[Math.floor(Math.random() * GENERAL_RESPONSES.length)];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
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
    const body = req.body as IsaAiRequest;
    const messages = body?.messages ?? [];
    const stream = body?.stream ?? false;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    const prompt = lastUserMsg?.content?.trim() || "";

    if (!prompt) {
      return res.status(400).json({ error: "No user message found" });
    }

    const intent = classify(prompt);
    const content = synthesize(prompt, intent.category);
    const traceId = crypto.randomUUID();

    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      const chunks = content.match(/[\s\S]{1,20}/g) ?? [content];
      for (const chunk of chunks) {
        res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`);
      }
      res.write(`data: ${JSON.stringify({ done: true, traceId, provider: "isa-ai", model: "mexa-ai-v1" })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    return res.json({ choices: [{ message: { content } }], traceId, provider: "isa-ai", model: "mexa-ai-v1" });
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : "ISA-AI engine error" });
  }
}
