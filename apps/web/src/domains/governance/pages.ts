/**
 * apps/web — Dominio Gobernanza (filosofía, documentación, kit APIs, ecosistema LTOS).
 */
import { lazy } from "react";

export const Gobernanza = lazy(() => import("@/pages/Gobernanza"));
export const Reglamento = lazy(() => import("@/pages/Reglamento"));
export const ImpactoCivilizatorio = lazy(() => import("@/pages/ImpactoCivilizatorio"));
export const Filosofia = lazy(() => import("@/pages/Filosofia"));
export const QuienesSomos = lazy(() => import("@/pages/QuienesSomos"));
export const BiografiaCEO = lazy(() => import("@/pages/BiografiaCEO"));
export const Documentacion = lazy(() => import("@/pages/Documentacion"));
export const Documentation = lazy(() => import("@/pages/Documentation"));
export const Manuales = lazy(() => import("@/pages/Manuales"));
export const KitAPIs = lazy(() => import("@/pages/KitAPIs"));
export const DevHub = lazy(() => import("@/pages/DevHub"));
export const EcosistemaLTOS = lazy(() => import("@/pages/EcosistemaLTOS"));
export const Despliegue = lazy(() => import("@/pages/Despliegue"));
export const CasosDeUso = lazy(() => import("@/pages/CasosDeUso"));
export const Estrategia = lazy(() => import("@/pages/Estrategia"));
export const Introduccion = lazy(() => import("@/pages/Introduccion"));
