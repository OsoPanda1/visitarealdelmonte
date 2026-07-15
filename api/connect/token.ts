import { corsJsonResponse, handleCors } from "../_shared/cors";
import { fusionGateway } from "../../src/connect/fusion/FusionGateway";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  const cors = handleCors(request);
  if (cors) return cors;

  if (request.method !== "POST") {
    return corsJsonResponse(request, { error: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();
    const result = await fusionGateway.execute(body);

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
