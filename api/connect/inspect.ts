import { corsJsonResponse, handleCors } from "../_shared/cors";
import { isPrivateIP } from "../_shared/network-utils";
import { fusionGateway } from "../../src/connect/fusion/FusionGateway";
import { listContracts } from "../../src/connect/fusion/contracts";
import { connectorRegistry } from "../../src/connect/ConnectorRegistry";
import { triggerRouter } from "../../src/connect/TriggerRouter";

export const config = { runtime: "edge" };

const ALLOWED_ORIGINS = [
  "https://www.visitarealdelmonte.online",
  "https://fed1.visitarealdelmonte.online",
  "https://fed2.visitarealdelmonte.online",
  "https://fed3.visitarealdelmonte.online",
  "https://fed4.visitarealdelmonte.online",
  "https://fed5.visitarealdelmonte.online",
  "https://fed6.visitarealdelmonte.online",
  "https://fed7.visitarealdelmonte.online",
];

export default async function handler(request: Request): Promise<Response> {
  const origin = request.headers.get("origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin);
  const cors = handleCors(request);
  if (cors) return cors;

  if (request.method !== "GET") {
    return corsJsonResponse(request, { error: "Method not allowed" }, 405, allowed ? origin : undefined);
  }

  const authHeader = request.headers.get("x-tamv-inspect-key");
  const masterKey = process.env.TAMV_FEDERATION_SECRET;
  if (!masterKey || authHeader !== masterKey) {
    return corsJsonResponse(request, { error: "Unauthorized" }, 403, allowed ? origin : undefined);
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const result = await fusionGateway.execute({ type: "inspect:stats" });

  const memory = process.memoryUsage?.();
  const safeData = result.ok && result.operation === "inspect:stats"
    ? {
        status: "healthy",
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        memory: memory ? {
          rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
          heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
        } : undefined,
        network: {
          isPrivateEnv: isPrivateIP(clientIp),
          clientIpFiltered: clientIp.replace(/\d+$/, "xxx"),
        },
        connectors: connectorRegistry.list().map((c) => ({
          uid: c.uid,
          type: c.type,
          name: c.name,
          installations: (c.installations ?? []).length,
        })),
        destinationCount: triggerRouter.list().length,
        contracts: listContracts().map((c) => ({
          version: c.version,
          supportedTypes: c.supportedTypes,
        })),
        activeFederationsConfigured: 7,
      }
    : { status: "error", message: "Failed to get stats" };

  return corsJsonResponse(request, { success: true, data: safeData }, 200, allowed ? origin : undefined);
}
