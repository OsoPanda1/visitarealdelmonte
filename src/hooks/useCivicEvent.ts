import { federationBus, type FederationEvent } from "@/federaciones/FederationBus";
import { logger } from "@/lib/logger";

interface CivicEventBase {
  id: string;
  occurredAt: string;
  type: string;
  source: string;
  federation?: string;
  correlationId?: string;
  payload: Record<string, unknown>;
}

export function useCivicEvent() {
  return async function emit(
    event: Omit<CivicEventBase, "id" | "occurredAt"> & Partial<Pick<CivicEventBase, "id" | "occurredAt">>,
  ) {
    try {
      await federationBus.emit({
        type: event.type,
        source: event.source as FederationEvent["source"],
        payload: event.payload,
        traceId: crypto.randomUUID().slice(0, 16),
      } as Omit<FederationEvent, "id" | "timestamp">);
    } catch (error) {
      logger.error("Event failed", { error: String(error) });
    }
  };
}
