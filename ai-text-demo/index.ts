// tools/ai/text-demo.ts
// Nodo de prueba de streaming de texto con GPT-5.4 / Claude via Vercel AI Gateway
// Integra cardinalización mínima, observabilidad y EOCT básico.

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import "dotenv/config";

type FederationContext = {
  nodeId: string;
  federation: string;
  useCase: string;
  environment: "dev" | "staging" | "prod";
  operator: string;
};

type TelemetryEvent = {
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
  context: FederationContext;
  data?: Record<string, unknown>;
};

const FEDERATION_CONTEXT: FederationContext = {
  nodeId: process.env.NODE_ID || "nodo-cero-cli",
  federation: "F5", // IA y Automatización
  useCase: "text-demo-gpt54",
  environment: (process.env.NODE_ENV as "dev" | "staging" | "prod") || "dev",
  operator: process.env.OPERATOR_ID || "local-operator",
};

function emitTelemetry(event: TelemetryEvent) {
  // Por ahora, log a stdout; en RDM podrías mandar esto al endpoint de telemetría
  const payload = {
    ...event,
    timestamp: event.timestamp,
    context: event.context,
  };
  // Cardinalidad controlada: un solo JSON por evento
  // eslint-disable-next-line no-console
  console.log("[telemetry]", JSON.stringify(payload));
}

async function main() {
  const startedAt = new Date().toISOString();

  const gatewayUrl = process.env.VERCEL_AI_GATEWAY_URL;
  const gatewayToken = process.env.VERCEL_AI_GATEWAY_TOKEN;

  let model;
  let modelName: string;

  if (gatewayUrl && gatewayToken) {
    const openai = createOpenAI({
      baseURL: `${gatewayUrl}/openai/v1`,
      apiKey: gatewayToken,
    });
    modelName = process.env.VERCEL_AI_GATEWAY_MODEL || "claude-sonnet-4-20250514";
    model = openai(modelName);
    emitTelemetry({
      level: "info",
      message: "Iniciando text-demo con Vercel AI Gateway",
      timestamp: startedAt,
      context: FEDERATION_CONTEXT,
      data: { model: modelName, gateway: gatewayUrl },
    });
  } else if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    modelName = "gpt-4o";
    model = openai(modelName);
    emitTelemetry({
      level: "info",
      message: "Iniciando text-demo con OpenAI",
      timestamp: startedAt,
      context: FEDERATION_CONTEXT,
      data: { model: modelName },
    });
  } else {
    emitTelemetry({
      level: "error",
      message: "Ni VERCEL_AI_GATEWAY_URL ni OPENAI_API_KEY están definidos",
      timestamp: startedAt,
      context: FEDERATION_CONTEXT,
    });
    throw new Error("Configura VERCEL_AI_GATEWAY_URL o OPENAI_API_KEY en .env");
  }

  const result = streamText({
    model,
    prompt: "Invent a new holiday and describe its traditions.",
  });

  let streamedChars = 0;

  try {
    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
      streamedChars += textPart.length;
    }

    process.stdout.write("\n");

    const usage = await result.usage;

    emitTelemetry({
      level: "info",
      message: "text-demo completado",
      timestamp: new Date().toISOString(),
      context: FEDERATION_CONTEXT,
      data: {
        streamedChars,
        usage,
      },
    });

    // eslint-disable-next-line no-console
    console.log("Token usage:", usage);
  } catch (err) {
    emitTelemetry({
      level: "error",
      message:
        err instanceof Error ? err.message : "Error desconocido en text-demo",
      timestamp: new Date().toISOString(),
      context: FEDERATION_CONTEXT,
      data: {
        streamedChars,
      },
    });
    throw err;
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Error en text-demo:", err);
});
