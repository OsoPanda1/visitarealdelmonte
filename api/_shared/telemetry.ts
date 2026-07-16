const TELEMETRY_ENDPOINT = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/telemetry`
  : "http://localhost:3000/api/telemetry";

export interface TelemetryPayload {
  level: "info" | "warn" | "error";
  message: string;
  traceId?: string;
  data?: Record<string, unknown>;
}

let pending: TelemetryPayload[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

async function flush(): Promise<void> {
  const batch = pending.splice(0);
  pending = [];
  try {
    await fetch(TELEMETRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch }),
    });
  } catch {
    // Silently drop telemetry on failure
  }
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, 1000);
}

export function emitTelemetry(payload: TelemetryPayload): void {
  pending.push(payload);
  if (pending.length >= 10) {
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    flush();
  } else {
    scheduleFlush();
  }
}
