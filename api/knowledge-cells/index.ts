import { getCache } from "../cache";
import { getConfig } from "../bootstrap";

export interface KnowledgeCell {
  id: string;
  type: string;
  description: string;
  version: string;
  endpoint: string;
  status: "active" | "maintenance" | "deprecated";
}

const CELLS: Record<string, KnowledgeCell> = {
  "render-3d-holocube-v1": {
    id: "render-3d-holocube-v1",
    type: "Render3D",
    description: "Renderizado holográfico de cubos volumétricos con efectos de luz e integración de audio XR",
    version: "1.0.0",
    endpoint: "/api/knowledge-cells/render-3d",
    status: "active",
  },
  "render-4d-hypercube-v1": {
    id: "render-4d-hypercube-v1",
    type: "Render4D",
    description: "Renderiza y manipula hipercubos 4D con proyecciones Schlegel interactivas",
    version: "1.0.0",
    endpoint: "/api/knowledge-cells/render-4d",
    status: "active",
  },
  "ia-immersivefx-v1": {
    id: "ia-immersivefx-v1",
    type: "IA-ImmersiveFX",
    description: "Efectos inmersivos generados por IA con mapeo multisensorial",
    version: "1.0.0",
    endpoint: "/api/knowledge-cells/ia-fx",
    status: "active",
  },
};

const cache = getCache();
cache.set("knowledge_cells:registry", CELLS, 24 * 60 * 60 * 1000);

export function getCell(id: string): KnowledgeCell | undefined {
  return CELLS[id];
}

export function listCells(): KnowledgeCell[] {
  return Object.values(CELLS);
}

export function getActiveCells(): KnowledgeCell[] {
  return Object.values(CELLS).filter((c) => c.status === "active");
}

export { render3dHandler } from "./render-3d";
export { render4dHandler } from "./render-4d";
