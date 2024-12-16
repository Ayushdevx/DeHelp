/**
 * An array of routes that are public.
 * These routes will be accessible without authentication.
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect the user to the dashboard.
 */

export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];

export const protectedRoutes = [
  "/dashboard",
];

/**
 * a prefix for all API routes
 * This will be used to prefix all API routes
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path for login. 
 * This will be used if no redirect path is provided.
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";