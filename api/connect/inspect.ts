import { corsJsonResponse, handleCors } from "../_shared/cors";
import { fusionGateway } from "../../src/connect/fusion/FusionGateway";
import { listContracts } from "../../src/connect/fusion/contracts";
import { connectorRegistry } from "../../src/connect/ConnectorRegistry";
import { triggerRouter } from "../../src/connect/TriggerRouter";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  const cors = handleCors(request);
  if (cors) return cors;

  if (request.method !== "GET") {
    return corsJsonResponse(request, { error: "Method not allowed" }, 405);
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return corsJsonResponse(request, { error: "Unauthorized" }, 401);
  }

  const result = await fusionGateway.execute({ type: "inspect:stats" });

  const data = result.ok && result.operation === "inspect:stats"
    ? {
        ...result.data,
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
          tokenTTL: c.tokenTTL,
          maxScopes: c.maxScopes,
        })),
      }
    : { error: "Failed to get stats" };

  return corsJsonResponse(request, { success: true, data });
}
