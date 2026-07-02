// api/_shared/auth.ts — Autenticación unificada para Vercel Serverless/Edge Functions
// Verifica JWT del usuario (Supabase) o CRON_SECRET para cron jobs

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface AuthResult {
  authenticated: boolean;
  userId?: string;
  email?: string;
  role?: string;
  supabase?: SupabaseClient;
  errorMessage?: string;
}

export interface AuthResultWithResponse extends AuthResult {
  errorResponse?: Response;
}

/**
 * Verifica la autenticación de un request.
 */
export async function verifyAuth(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return { authenticated: false, errorMessage: "Missing Authorization header" };
  }

  const [scheme, token] = authHeader.split(" ", 2);

  if (scheme !== "Bearer" || !token) {
    return { authenticated: false, errorMessage: "Invalid Authorization scheme (use Bearer)" };
  }

  // 1) CRON_SECRET check
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && token === cronSecret) {
    return { authenticated: true, role: "cron" };
  }

  // 2) Supabase JWT verification
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { authenticated: false, errorMessage: "Supabase not configured" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return { authenticated: false, errorMessage: error?.message || "Invalid token" };
    }

    return {
      authenticated: true,
      userId: user.id,
      email: user.email,
      role: user.role,
      supabase,
    };
  } catch (err) {
    return {
      authenticated: false,
      errorMessage: err instanceof Error ? err.message : "Auth verification failed",
    };
  }
}

/**
 * Middleware helper: retorna AuthResultWithResponse.
 * Si no está autenticado, errorResponse contiene la Response 401.
 */
export async function requireAuth(request: Request): Promise<AuthResultWithResponse> {
  const result = await verifyAuth(request);

  if (!result.authenticated) {
    return {
      ...result,
      errorResponse: new Response(
        JSON.stringify({ error: result.errorMessage || "Unauthorized" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "WWW-Authenticate": 'Bearer realm="api"',
          },
        },
      ),
    };
  }

  return result;
}

/**
 * Verifica que el usuario tenga un rol específico.
 */
export async function requireRole(
  request: Request,
  allowedRoles: string[],
): Promise<AuthResultWithResponse> {
  const result = await requireAuth(request);

  if (result.errorResponse) return result;

  if (result.role === "cron") return result;

  if (!result.role || !allowedRoles.includes(result.role)) {
    return {
      ...result,
      errorResponse: new Response(
        JSON.stringify({ error: "Insufficient permissions" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      ),
    };
  }

  return result;
}
