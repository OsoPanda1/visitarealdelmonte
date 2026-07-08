import { consentEvents, reviews, reviewsScore } from "@/infra/metrics/prometheus";
import { validate, feedbackSchema } from "@/lib/validation";
import { handleApiError, apiResponse } from "@/lib/security/error-handler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = validate(feedbackSchema, body);

    const rating = data.rating;
    const territory = data.territory ?? "unknown";
    if (rating != null) {
      const type = rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral";
      reviews.inc({ territory, type });
      reviewsScore.observe(rating);
    }
    const consent = data.consent;
    if (consent != null) {
      consentEvents.inc({ territory, status: consent ? "granted" : "denied" });
    }

    return apiResponse({ ok: true, ...data });
  } catch (error) {
    return handleApiError(error);
  }
}
