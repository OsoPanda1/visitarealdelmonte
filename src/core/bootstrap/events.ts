/**
 * RDM Core Service — Bootstrap de eventos del sistema
 * Conecta el bus de eventos con el controlador de modos
 */

import { bus } from "../infra/event-bus";
import { updateSystemMode } from "../system/controller";
import type { SystemMetrics } from "../system/modes";
import { auditEvent } from "../audit/logger";

let initialized = false;

export function bootstrapCoreEvents() {
  if (initialized) return;
  initialized = true;

  const handleOverload = (payload: unknown) => {
    const metrics = (payload as { metrics: SystemMetrics }).metrics;
    const result = updateSystemMode(metrics);

    auditEvent(
      "SYSTEM_OVERLOAD_HANDLED",
      { metrics, newMode: result.currentMode, aiDecision: result.aiDecision },
      "system",
    );

    bus.emit("rdm.system.mode-changed.v1", {
      mode: result.currentMode,
      aiDecision: result.aiDecision,
      timestamp: new Date().toISOString(),
    });
  };

  bus.on("rdm.system.overload.v1", handleOverload);
}
