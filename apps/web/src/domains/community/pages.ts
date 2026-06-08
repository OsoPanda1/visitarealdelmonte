/**
 * apps/web — Dominio Comunidad (social, perfil, gamificación, donativos).
 */
import { lazy } from "react";

export const Comunidad = lazy(() => import("@/pages/Comunidad"));
export const ComunidadPage = lazy(() => import("@/pages/ComunidadPage"));
export const RedSocial = lazy(() => import("@/pages/RedSocial"));
export const Feed = lazy(() => import("@/pages/Feed"));
export const Perfil = lazy(() => import("@/pages/Perfil"));
export const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
export const Donar = lazy(() => import("@/pages/Donar"));
export const Apoya = lazy(() => import("@/pages/Apoya"));
export const GraciasDonativo = lazy(() => import("@/pages/GraciasDonativo"));
