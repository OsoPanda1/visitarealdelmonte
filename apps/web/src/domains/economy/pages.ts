/**
 * apps/web — Dominio Economía (comercios, membresías, directorio).
 * Consume `@economy` para lógica de negocio.
 */
import { lazy } from "react";

export const Comercios = lazy(() => import("@/pages/Comercios"));
export const ComerciosPanel = lazy(() => import("@/pages/ComerciosPanel"));
export const RegistroComercio = lazy(() => import("@/pages/RegistroComercio"));
export const NegociosPortal = lazy(() => import("@/pages/NegociosPortal"));
export const Directorio = lazy(() => import("@/pages/Directorio"));
export const Membership = lazy(() => import("@/pages/Membership"));
export const EconomiaFederada = lazy(() => import("@/pages/EconomiaFederada"));
