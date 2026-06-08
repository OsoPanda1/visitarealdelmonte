/**
 * apps/admin — Surface administrativa.
 * Consume `@analytics` para dashboards y `@core-kernel` para readiness.
 */
import { lazy } from "react";

export const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
export const Dashboard = lazy(() => import("@/pages/Dashboard"));
