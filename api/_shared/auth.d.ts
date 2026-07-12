interface AuthResult {
  authenticated: boolean;
  userId?: string;
  email?: string;
  role?: string;
  errorMessage?: string;
  errorResponse?: Response;
  supabase?: any;
}

export function verifyAuth(request: Request): Promise<AuthResult>;
export function requireAuth(request: Request): Promise<AuthResult>;
export function requireRole(request: Request, allowedRoles: string[]): Promise<AuthResult>;
