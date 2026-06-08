/**
 * apps/web — Dominio Inteligencia (Isabella, agentes IA, tecnologías avanzadas).
 * Consume `@ai-core` para lógica de decisión.
 */
import { lazy } from "react";

export const IsabellaAI = lazy(() => import("@/pages/IsabellaAI"));
export const IAAgentes = lazy(() => import("@/pages/IAAgentes"));
export const Guardian = lazy(() => import("@/pages/Guardian"));
export const SistemasAvanzados = lazy(() => import("@/pages/SistemasAvanzados"));
export const XRTecnologia = lazy(() => import("@/pages/XRTecnologia"));
export const QuantumComputing = lazy(() => import("@/pages/QuantumComputing"));
export const BlockchainMSR = lazy(() => import("@/pages/BlockchainMSR"));
export const SeguridadTenochtitlan = lazy(() => import("@/pages/SeguridadTenochtitlan"));
export const Arquitectura = lazy(() => import("@/pages/Arquitectura"));
export const Arte = lazy(() => import("@/pages/Arte"));
export const EnciclopediaUniversal = lazy(() => import("@/pages/EnciclopediaUniversal"));
export const WikiTAMV = lazy(() => import("@/pages/WikiTAMV"));
export const MetaverseHome = lazy(() => import("@/pages/MetaverseHome"));
