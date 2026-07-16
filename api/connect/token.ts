import { corsJsonResponse, handleCors } from "../_shared/cors";
import { isPrivateIP } from "../_shared/network-utils";
import { fusionGateway } from "../../src/connect/fusion/FusionGateway";

export const config = { runtime: "edge" };

const NONCE_STORE = new Set<string>();
const NONCE_TTL = 5 * 60 * 1000;
const REQUIRED_AUDIENCES = [
  "tamv-federation-core",
  "tamv-cell-node-1", "tamv-cell-node-2", "tamv-cell-node-3",
  "tamv-cell-node-4", "tamv-cell-node-5", "tamv-cell-node-6", "tamv-cell-node-7",
];

function sanitizeLog(msg: string): string {
  return msg.replace(/(bearer\s+|secret=|key=)[a-zA-Z0-9\-_.]+/gi, "$1[MASKED]");
}

function isExpired(timestamp: number): boolean {
  return Date.now() - timestamp > 30_000;
}

export default async function handler(request: Request): Promise<Response> {
  const cors = handleCors(request);
  if (cors) return cors;

  if (request.method !== "POST") {
    return corsJsonResponse(request, { error: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();
    const { nonce, timestamp, clientId, clientSecret, targetAudience, ...operation } = body;

    if (!nonce || typeof nonce !== "string") {
      return corsJsonResponse(request, { error: { code: "MISSING_NONCE" } }, 400);
    }
    if (!timestamp || typeof timestamp !== "number") {
      return corsJsonResponse(request, { error: { code: "MISSING_TIMESTAMP" } }, 400);
    }

    if (NONCE_STORE.has(nonce)) {
      return corsJsonResponse(request, { error: { code: "REPLAY_DETECTED" } }, 409);
    }
    NONCE_STORE.add(nonce);
    setTimeout(() => NONCE_STORE.delete(nonce), NONCE_TTL);

    if (isExpired(timestamp)) {
      return corsJsonResponse(request, { error: { code: "EXPIRED_REQUEST" } }, 400);
    }

    // Client authentication + audience validation
    if (clientId && clientSecret && targetAudience) {
      const fedSecret = process.env.TAMV_FEDERATION_SECRET;
      if (!fedSecret) {
        console.error("CRITICAL: TAMV_FEDERATION_SECRET not configured");
        return corsJsonResponse(request, { error: { code: "CONFIG_ERROR" } }, 500);
      }
      if (!REQUIRED_AUDIENCES.includes(targetAudience)) {
        return corsJsonResponse(request, { error: { code: "INVALID_AUDIENCE" } }, 403);
      }
      const isAuthorized = clientId === "tamv-gateway" && clientSecret === fedSecret;
      if (!isAuthorized) {
        console.warn(`[WARN] Auth failed for client: ${clientId}`);
        return corsJsonResponse(request, { error: { code: "UNAUTHORIZED" } }, 401);
      }
    }

    const result = await fusionGateway.execute(operation);

    if (!result.ok) {
      return corsJsonResponse(
        request,
        { error: { code: result.error.code, message: result.error.message } },
        result.error.statusCode,
      );
    }

    return corsJsonResponse(request, { success: true, data: result.data });
  } catch (err) {
    const msg = err instanceof Error ? sanitizeLog(err.message) : "Invalid request";
    return corsJsonResponse(request, { error: { code: "BAD_REQUEST", message: msg } }, 400);
  }
}
