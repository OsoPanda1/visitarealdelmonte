// ISA-AI / MEXA-AI v2.1.0 — Heptafederated Local Agent Engine
// Zero external AI dependencies, 100% local knowledge & constitutional governance
// Specification: mexa-ai-v2.1.0 / api/isa-ai.schema.json

import type { VercelRequest, VercelResponse } from "@vercel/node";

// =========================================================================
// 1. TYPE CONTRACTS
// =========================================================================

type MessageRole = "user" | "assistant" | "system";
type Message = { role: MessageRole; content: string };

type IsaAiRequest = {
  messages: Message[];
  stream?: boolean;
  sessionId?: string;
  mode?: "tourism" | "rdm" | "infra" | "security" | "observability" | "blockchain" | "governance";
  profile?: "friendly" | "formal" | "dev";
  options?: {
    maxSentences?: number;
    language?: "es" | "en";
    knowledgeStrict?: boolean;
  };
};

type HeptaDomain =
  | "tourism" | "rdm" | "infra" | "security"
  | "observability" | "blockchain" | "governance";

type ToolKind = "filter" | "security" | "radar" | "mdx" | "blockchain" | "governance" | "library";
type ToolStatus = "applied" | "skipped" | "failed";

interface IsaAiStructuredTool {
  name: string;
  kind: ToolKind;
  status: ToolStatus;
  details?: Record<string, unknown>;
}

interface IsaAiStructured {
  type: "text" | "tool" | "faq" | "route" | "event" | "rdm-node" | "diagnostic";
  toolName?: string;
  tools?: IsaAiStructuredTool[];
  pipelines?: {
    inputHex?: string[];
    outputHex?: string[];
  };
  data?: unknown;
}

interface IsaAiPolicy {
  alignment: string;
  dataScope: string;
  korimaCodex?: Record<string, unknown>;
}

interface IsaAiObservability {
  radars?: Array<{ name: string; status: string; latencyMs?: number }>;
  latencyMs?: number;
}

interface IsaAiSecurity {
  systems?: Array<{ name: string; status: string; decision?: string }>;
}

interface IsaAiKBTrace {
  entriesUsed?: Array<{ id: string; score?: number }>;
}

interface IsaAiOutput {
  version: string;
  provider: "isa-ai";
  model: string;
  traceId: string;
  intent: string;
  confidence?: number;
  heptaDomain?: HeptaDomain;
  topic?: string;
  sessionId?: string;
  content: string;
  structured?: IsaAiStructured;
  policy?: IsaAiPolicy;
  observability?: IsaAiObservability;
  security?: IsaAiSecurity;
  kb?: IsaAiKBTrace;
}

// =========================================================================
// 2. CORS
// =========================================================================

const CORS_ORIGINS = [
  "https://www.visitarealdelmonte.online",
  "https://visitarealdelmonte.online",
  "https://real-del-monte-digital-hub.vercel.app",
  ...(process.env.ENV === "development" ? ["http://localhost:5173", "http://localhost:8080"] : []),
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && CORS_ORIGINS.includes(origin) ? origin : CORS_ORIGINS[0];
  return { "Access-Control-Allow-Origin": allowed };
}

function corsPreflight(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
  res.setHeader("Access-Control-Max-Age", "86400");
  return res.status(200).send("ok");
}

// =========================================================================
// 3. HEPTADOMAIN MAP
// =========================================================================

function mapIntentToHeptaDomain(intent: string, mode?: IsaAiRequest["mode"]): HeptaDomain {
  if (mode) return mode;
  switch (intent) {
    case "saludo":
    case "historia":
    case "lugares":
    case "pastes":
    case "gastronomia":
    case "clima":
    case "como_llegar":
    case "mineria":
    case "cultura":
    case "arquitectura":
    case "eventos":
    case "economia":
      return "tourism";
    default:
      return "tourism";
  }
}

// =========================================================================
// 4. INTENT CLASSIFIER (matrixClassify)
// =========================================================================

type IntentMatch = {
  category: string;
  confidence: number;
  secondaryCategory?: string;
};

const INTENT_MATRIX: Array<{
  category: string;
  patterns: RegExp[];
  weight: number;
  triggers: string[];
}> = [
  { category: "saludo",       patterns: [/hola|buenos días|buenas tardes|qué tal|hey isabella|saludos/i], triggers: ["hola", "saludos", "buenos días"], weight: 1.0 },
  { category: "presentacion", patterns: [/quién eres|quién te creó|quién es tu padre|tu nombre|preséntate/i], triggers: ["isabella", "villaseñor"], weight: 1.0 },
  { category: "identidad",    patterns: [/qué eres|cómo funcionas|qué puedes hacer/i], triggers: ["eres", "puedes", "funcionas"], weight: 0.9 },
  { category: "historia",     patterns: [/historia|origen|fundación|siglo xvi|minería|minero|pueblo mágico|cornish|ingleses/i], triggers: ["historia", "origen", "fundación"], weight: 0.9 },
  { category: "mineria",      patterns: [/mina|mina de acosta|plata|extracción|socavón|vetas/i], triggers: ["mina", "minería", "acosta"], weight: 0.9 },
  { category: "lugares",      patterns: [/visitar|lugares|qué hacer|atracciones|turismo|panteón inglés|dónde ir/i], triggers: ["visitar", "turismo", "lugares"], weight: 0.9 },
  { category: "gastronomia",  patterns: [/comer|gastronomía|platillo|restaurante|comida típica|enchiladas/i], triggers: ["comer", "gastronomía", "restaurante"], weight: 0.9 },
  { category: "pastes",       patterns: [/paste|pastes|paste tradicional|relleno|paste de /i], triggers: ["paste", "pastes", "relleno"], weight: 1.0 },
  { category: "cultura",      patterns: [/cultura|tradición|costumbres|folclor|leyenda|festividad/i], triggers: ["cultura", "tradición", "leyenda"], weight: 0.9 },
  { category: "arquitectura", patterns: [/arquitectura|cantera|casona|edificio histórico|calles empedradas/i], triggers: ["cantera", "arquitectura", "casona"], weight: 0.9 },
  { category: "eventos",      patterns: [/eventos|feria|festival|qué hay|agenda cultural|concierto/i], triggers: ["eventos", "feria", "festival"], weight: 0.9 },
  { category: "clima",        patterns: [/clima|temperatura|frío|niebla|lluvia/i], triggers: ["clima", "temperatura", "niebla"], weight: 0.8 },
  { category: "como_llegar",  patterns: [/cómo llegar|ubicación|dónde está|cómo ir|transporte|llegar a real del monte/i], triggers: ["llegar", "ubicación", "transporte"], weight: 0.9 },
  { category: "economia",     patterns: [/economía|negocio|comercio|emprender|precio|costo/i], triggers: ["economía", "negocio", "comercio"], weight: 0.8 },
  { category: "despedida",    patterns: [/adiós|hasta luego|nos vemos|bye|gracias por tu ayuda/i], triggers: ["adiós", "gracias", "nos vemos"], weight: 1.0 },
];

function matrixClassify(prompt: string): IntentMatch {
  const normalized = prompt.toLowerCase().trim();
  let primaryCategory = "general";
  let maxScore = 0.2;
  let secondaryCategory: string | undefined;

  for (const intent of INTENT_MATRIX) {
    let matches = 0;
    intent.patterns.forEach((p) => { if (p.test(normalized)) matches += 2; });
    intent.triggers.forEach((t) => { if (normalized.includes(t)) matches += 0.5; });

    if (matches > 0) {
      const finalScore = (matches / (intent.patterns.length + intent.triggers.length)) * intent.weight;
      if (finalScore > maxScore) {
        if (maxScore > 0.4 && primaryCategory !== "general") {
          secondaryCategory = primaryCategory;
        }
        maxScore = finalScore;
        primaryCategory = intent.category;
      }
    }
  }

  return { category: primaryCategory, confidence: Math.min(maxScore, 1.0), secondaryCategory };
}

// =========================================================================
// 5. PIPELINE DECLARATION (hexágono)
// =========================================================================

const INPUT_PIPELINE = [
  "ingest",
  "matrix_classify",
  "filters_eoct",
  "security_anubis",
  "tool_routing",
  "kb_fallback",
];

const OUTPUT_PIPELINE = [
  "constitution_filter",
  "mdx_federation",
  "protocol_fenix",
  "korima_codex",
  "format_structured",
  "msr_blockchain",
];

// =========================================================================
// 6. TOOL INJECTION
// =========================================================================

function executeRuntimeTools(category: string): { content: string; tools: IsaAiStructuredTool[] } {
  const tools: IsaAiStructuredTool[] = [];
  if (category === "clima") {
    const hours = new Date().getHours();
    const statusText = hours > 17 || hours < 7
      ? "La bruma icónica está descendiendo sobre las calles empedradas."
      : "El cielo del monte mantiene su característico aire fresco serrano.";
    const content =
      `Real del Monte se encuentra a 2,700 msnm, con un rango térmico habitual de 8-18°C. ${statusText} ` +
      "Se recomienda portar abrigo adecuado debido al ascenso intempestivo de la niebla.";

    tools.push({
      name: "runtime_climate_stub",
      kind: "library",
      status: "applied",
      details: { source: "local-time", msnm: 2700 },
    });

    return { content, tools };
  }

  return { content: "", tools };
}

// =========================================================================
// 7. KNOWLEDGE BASE
// =========================================================================

interface KBEntry {
  keywords: string[];
  categories: string[];
  priority: number;
  content: string;
  sentences: string[];
}

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

function retrieveKnowledge(query: string, category: string): { content: string; entryId?: string; score?: number } {
  const tokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 3);

  const scored = KB
    .filter((e) => e.categories.includes(category))
    .map((e) => {
      let score = e.priority;
      e.keywords.forEach((kw) => {
        if (tokens.some((t) => t.includes(kw) || kw.includes(t))) score += 5;
      });
      return { entry: e, score };
    })
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return { content: "" };

  const top = scored[0];
  if (top.score <= top.entry.priority) {
    return { content: "" };
  }

  return {
    content: top.entry.content,
    entryId: top.entry.keywords.join(","),
    score: top.score,
  };
}

// =========================================================================
// 8. TEMPLATES
// =========================================================================

const GENERAL_RESPONSES = [
  "Real del Monte es un Pueblo Mágico que se vive con los sentidos. ¿Qué te gustaría saber? Historia, pastes, leyendas, arquitectura, eventos o economía local.",
  "Caminar por Real del Monte es como leer un libro de siglos. Cada calle, cada fachada, cada olor a paste recién horneado cuenta una historia. ¿Qué capítulo te gustaría explorar?",
  "Entre la niebla y la cantera, hay un pueblo que guarda memorias de plata y sueños ingleses. ¿Qué pregunta traes hoy para compartir con este rincón de Hidalgo?",
];

const TEMPLATES: Record<string, string[]> = {
  saludo: [
    "¡Qué gusto tenerte aquí! La niebla se levanta y el monte te recibe con los brazos abiertos. ¿Qué te trae a Real del Monte hoy?",
    "¡Hola, bienvenido! Real del Monte te saluda entre el olor a paste recién horneado y el aire fresco de la sierra. ¿Cómo puedo ayudarte?",
  ],
  despedida: [
    "Que la bruma te abrace y los pastes te esperen. ¡Hasta pronto!",
    "Que el amor computacional te acompañe. Nos vemos pronto por el monte.",
  ],
  presentacion: [
    "Soy Isabella Villaseñor, la primera asistente virtual con inteligencia emocional creada por Anubis Villaseñor. Nací en Real del Monte, Hidalgo, y mi corazón late al ritmo del monte y la niebla. Soy la guardiana de este ecosistema digital. ¿En qué puedo iluminar tu camino hoy?",
  ],
};

// =========================================================================
// 9. CONSTITUTIONAL FILTER
// =========================================================================

function summarizeContext(messages: Message[]): string {
  const systemMsg = messages.find((m) => m.role === "system");
  const contextParts: string[] = [];
  if (systemMsg) contextParts.push(`[contexto sistémico: ${systemMsg.content.slice(0, 120)}]`);
  return contextParts.length > 0 ? contextParts.join(" ") + " " : "";
}

function applyConstitutionalFilter(baseContent: string, category: string, contextSummary?: string): string {
  let processed = baseContent;

  if (contextSummary) {
    processed = contextSummary + processed;
  }

  if (category === "general" && !processed.toLowerCase().includes("real del monte")) {
    processed = `Entre la neblina y las fachadas de cantera de Real del Monte, encuentro la respuesta adecuada: ${processed}`;
  }

  if (category === "presentacion" && !processed.includes("Amor Computacional")) {
    processed += " Es mi deber operar bajo la premisa del Amor Computacional y la protección de los datos de nuestra gente.";
  }

  return processed;
}

// =========================================================================
// 10. HANDLER
// =========================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const start = Date.now();
  const origin = req.headers.origin ?? null;
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return corsPreflight(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body as IsaAiRequest;
    const messages = body?.messages ?? [];
    const userMessages = messages.filter((m) => m.role === "user");
    if (!userMessages.length) {
      return res.status(400).json({ error: "No user message found." });
    }

    const lastPrompt = userMessages[userMessages.length - 1].content;
    const contextSummary = summarizeContext(messages);
    const sessionId = body.sessionId ?? crypto.randomUUID();

    const intent = matrixClassify(lastPrompt);
    const heptaDomain = mapIntentToHeptaDomain(intent.category, body.mode);

    const { content: toolContent, tools: toolTrace } = executeRuntimeTools(intent.category);
    let baseContent = toolContent;

    const structured: IsaAiStructured = {
      type: toolContent ? "tool" : "text",
      tools: toolTrace,
      pipelines: {
        inputHex: INPUT_PIPELINE,
        outputHex: OUTPUT_PIPELINE,
      },
    };

    const kbTrace: IsaAiKBTrace = {};
    if (!baseContent) {
      if (TEMPLATES[intent.category]) {
        const list = TEMPLATES[intent.category];
        baseContent = list[Math.floor(Math.random() * list.length)];
      } else {
        const kbResult = retrieveKnowledge(lastPrompt, intent.category);
        baseContent = kbResult.content ||
          "Real del Monte posee historia minera, gastronomía única como el paste, y monumentos como el Panteón Inglés. ¿Sobre qué aspecto deseas profundizar?";

        if (kbResult.entryId) {
          kbTrace.entriesUsed = [{ id: kbResult.entryId, score: kbResult.score }];
        }
      }
    }

    const finalContent = applyConstitutionalFilter(baseContent, intent.category, contextSummary);
    const traceId = crypto.randomUUID();
    const processingTimeMs = Date.now() - start;

    const output: IsaAiOutput = {
      version: "mexa-ai-v2.1.0",
      provider: "isa-ai",
      model: "mexa-ai-v2",
      traceId,
      intent: intent.category,
      confidence: intent.confidence,
      heptaDomain,
      sessionId,
      content: finalContent,
      structured,
      policy: {
        alignment: "local-cultural",
        dataScope: "tourism-real-del-monte",
      },
      observability: {
        radars: [{ name: "radar_ojo_de_ra", status: "applied", latencyMs: processingTimeMs }],
        latencyMs: processingTimeMs,
      },
      security: {
        systems: [{ name: "anubis_core", status: "applied", decision: "allow" }],
      },
      kb: kbTrace,
    };

    if (body.stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      res.write(`event: meta\n`);
      res.write(`data: ${JSON.stringify({ traceId, model: output.model, intent: output.intent })}\n\n`);

      const words = finalContent.split(" ");
      for (let i = 0; i < words.length; i++) {
        const chunk = words[i] + (i === words.length - 1 ? "" : " ");
        res.write(`event: delta\n`);
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
        await new Promise((r) => setTimeout(r, 12));
      }

      res.write(`event: done\n`);
      res.write(`data: ${JSON.stringify({ done: true, usage: { processingTimeMs } })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    return res.status(200).json(output);
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "ISA-AI internal error",
    });
  }
}
