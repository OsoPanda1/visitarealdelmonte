import { corsJsonResponse, handleCors } from "../_shared/cors";
import { fusionGateway } from "../../src/connect/fusion/FusionGateway";

export const config = { runtime: "edge" };

const NONCE_STORE = new Set<string>();
const NONCE_TTL = 5 * 60 * 1000;

function isExpired(timestamp: number): boolean {
  const clockSkew = 30_000;
  return Date.now() - timestamp > clockSkew;
}

export default async function handler(request: Request): Promise<Response> {
  const cors = handleCors(request);
  if (cors) return cors;

  if (request.method !== "POST") {
    return corsJsonResponse(request, { error: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();
    const { nonce, timestamp, ...operation } = body;

    if (!nonce || typeof nonce !== "string") {
      return corsJsonResponse(request, { error: { code: "MISSING_NONCE", message: "Nonce is required" } }, 400);
    }
    if (!timestamp || typeof timestamp !== "number") {
      return corsJsonResponse(request, { error: { code: "MISSING_TIMESTAMP", message: "Timestamp is required" } }, 400);
    }

    if (NONCE_STORE.has(nonce)) {
      return corsJsonResponse(request, { error: { code: "REPLAY_DETECTED", message: "Nonce already used" } }, 409);
    }

    NONCE_STORE.add(nonce);
    setTimeout(() => NONCE_STORE.delete(nonce), NONCE_TTL);

    if (isExpired(timestamp)) {
      return corsJsonResponse(request, { error: { code: "EXPIRED_REQUEST", message: "Timestamp is too old" } }, 400);
    }

    const result = await fusionGateway.execute(operation);

    if (!result.ok) {
      return corsJsonResponse(
        request,
        { error: { code: result.error.code, message: result.error.message, details: result.error.details } },
        result.error.statusCode,
      );
    }

    return corsJsonResponse(request, { success: true, data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return corsJsonResponse(request, { error: { code: "BAD_REQUEST", message } }, 400);
  }
}
