import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCorsHeaders } from "./cors";

export interface RenderOperation {
  operation: string;
  payload: Record<string, unknown>;
  context?: { userId?: string; sessionId?: string };
}

export function analyzeFrequencies(signal: number[]): Record<string, number> {
  if (!signal || signal.length < 20) {
    return { bass: 0, mid: 0, treble: 0 };
  }
  return {
    bass: signal.slice(0, 5).reduce((a, b) => a + b, 0) / 5,
    mid: signal.slice(5, 15).reduce((a, b) => a + b, 0) / 10,
    treble: signal.slice(15, 20).reduce((a, b) => a + b, 0) / 5,
  };
}

export function calculateImmersion(frequencies: Record<string, number>): number {
  const total = Object.values(frequencies).reduce((a, b) => a + b, 0);
  return Math.min(total / 300, 1);
}

export function frequencyToColor(frequency: number): string {
  const hue = (frequency % 360).toString();
  return `hsl(${hue}, 100%, 50%)`;
}

export function frequencyToRGB(frequency: number): { r: number; g: number; b: number } {
  const wavelength = 380 + (frequency % 321);
  let r = 0, g = 0, b = 0;
  if (wavelength >= 380 && wavelength < 440) {
    r = Math.abs(wavelength - 440) / (440 - 380);
    b = 1;
  } else if (wavelength >= 440 && wavelength < 490) {
    g = (wavelength - 440) / (490 - 440);
    b = 1;
  } else if (wavelength >= 490 && wavelength < 510) {
    g = 1;
    b = Math.abs(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1;
    g = Math.abs(wavelength - 645) / (645 - 580);
  } else if (wavelength >= 645 && wavelength <= 700) {
    r = 1;
  }
  return { r: Math.floor(r * 255), g: Math.floor(g * 255), b: Math.floor(b * 255) };
}

export function hammingDistance(a: number, b: number): number {
  let distance = 0;
  let xor = a ^ b;
  while (xor) {
    distance += xor & 1;
    xor >>= 1;
  }
  return distance;
}

export function generateRotationMatrix(angle: number, plane: string = "xy"): number[][] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const matrix: number[][] = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  if (plane === "xy" || plane === "yx") {
    matrix[0][0] = cos;
    matrix[0][1] = -sin;
    matrix[1][0] = sin;
    matrix[1][1] = cos;
  } else if (plane === "zw" || plane === "wz") {
    matrix[2][2] = cos;
    matrix[2][3] = -sin;
    matrix[3][2] = sin;
    matrix[3][3] = cos;
  }
  return matrix;
}

export function handleRenderCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = (req.headers.origin as string | undefined) ?? null;
  const cors = getCorsHeaders(origin);
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

export function renderError(res: VercelResponse, code: string, message: string, executionTime: number, status = 500): void {
  res.status(status).json({
    success: false,
    error: { code, message },
    performance: { executionTime },
    timestamp: new Date().toISOString(),
  });
}

export function renderSuccess(res: VercelResponse, data: Record<string, unknown>, startTime: number, context?: { userId?: string; sessionId?: string }): void {
  res.status(200).json({
    success: true,
    data,
    performance: { executionTime: Date.now() - startTime, startTime },
    timestamp: new Date().toISOString(),
    context,
  });
}
