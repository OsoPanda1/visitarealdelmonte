import { z } from "zod";
import { createTraceId } from "@/core/context/trace";
import { getLastDecision } from "@/lib/isabella";
import { runRealitoKernel } from "@/lib/kernel";
import { withSpan } from "@/instrumentation.node";
import { validate } from "@/lib/validation";
import { handleApiError, apiResponse } from "@/lib/security/error-handler";

const recSchema = z.object({
  query: z.string().max(500).default(""),
  territory: z.string().max(50).default("RDM"),
  traceId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const data = validate(recSchema, body);
    const last = getLastDecision();
    const lastDecision = last?.decision;
    const traceId = data.traceId ?? last?.decision?.traceId ?? createTraceId();
    const territory = data.territory ?? "RDM";

    const response = await withSpan(
      "isabella.recommendations",
      () => {
        const result = runRealitoKernel(data.query, lastDecision);
        return { traceId, territory, decision: lastDecision, ...result };
      },
      { traceId, territory },
    );

    return apiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}
