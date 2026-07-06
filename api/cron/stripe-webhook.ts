import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCorsHeaders } from "../_shared/cors";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"] as string | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: "missing_signature" });
  }

  try {
    const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const { verifyWebhookSignature } = await import("../_shared/stripe");
    const event = verifyWebhookSignature(body, sig, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { customer?: string; subscription?: string; metadata?: Record<string, string> };
        console.log("[stripe-webhook] checkout completed", session.customer, session.metadata);
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as { id?: string; status?: string };
        console.log("[stripe-webhook] subscription", sub.status, sub.id);
        break;
      }
      default:
        console.log("[stripe-webhook] unhandled event", event.type);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("[stripe-webhook] error", err);
    return res.status(400).json({ error: "webhook_error" });
  }
}
