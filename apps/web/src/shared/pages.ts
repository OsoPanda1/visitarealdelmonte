/**
 * apps/web — Shared (auth, layout, fallback, dominio dinámico).
 */
import { lazy } from "react";

export const Auth = lazy(() => import("@/pages/Auth"));
export const Login = lazy(() => import("@/pages/Login"));
export const Register = lazy(() => import("@/pages/Register"));
export const NotFound = lazy(() => import("@/pages/NotFound"));
export const DomainPage = lazy(() => import("@/pages/DomainPage"));
