/**
 * apps/web — Dominio RDM (turismo, mapa, rutas, atlas territorial).
 * Manifest de lazy imports. No reorganiza routing; sirve de surface estable
 * para que `App.tsx` y futuros moves físicos importen desde un solo lugar.
 */
import { lazy } from "react";

export const Index = lazy(() => import("@/pages/Index"));
export const Mapa = lazy(() => import("@/pages/Mapa"));
export const MapaVivo = lazy(() => import("@/pages/MapaVivo"));
export const Rutas = lazy(() => import("@/pages/Rutas"));
export const Lugares = lazy(() => import("@/pages/Lugares"));
export const Catalogo = lazy(() => import("@/pages/Catalogo"));
export const Eventos = lazy(() => import("@/pages/Eventos"));
export const Paquetes = lazy(() => import("@/pages/Paquetes"));
export const Estacionamientos = lazy(() => import("@/pages/Estacionamientos"));
export const TransporteLocal = lazy(() => import("@/pages/TransporteLocal"));
export const ShuttleCDMX = lazy(() => import("@/pages/ShuttleCDMX"));
export const Gastronomia = lazy(() => import("@/pages/Gastronomia"));
export const Ecoturismo = lazy(() => import("@/pages/Ecoturismo"));
export const Cultura = lazy(() => import("@/pages/Cultura"));
export const Historia = lazy(() => import("@/pages/Historia"));
export const PatrimonioCultural = lazy(() => import("@/pages/PatrimonioCultural"));
export const Relatos = lazy(() => import("@/pages/Relatos"));
export const Timeline = lazy(() => import("@/pages/Timeline"));
export const Dichos = lazy(() => import("@/pages/Dichos"));

// Atlas territorial
export const Atlas = lazy(() => import("@/pages/Atlas"));
export const AtlasMaximus = lazy(() => import("@/pages/AtlasMaximus"));
export const AtlasCalles = lazy(() => import("@/pages/AtlasCalles"));
export const AtlasCapitulos = lazy(() => import("@/pages/AtlasCapitulos"));
export const AtlasCementerio = lazy(() => import("@/pages/AtlasCementerio"));
export const AtlasLeyendas = lazy(() => import("@/pages/AtlasLeyendas"));
export const AtlasMinas = lazy(() => import("@/pages/AtlasMinas"));
export const AtlasPastes = lazy(() => import("@/pages/AtlasPastes"));
