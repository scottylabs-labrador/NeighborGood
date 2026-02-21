/**
 * Central API layer — the only place in the frontend that calls fetch().
 *
 * Why centralise here?
 *  - One place to add auth headers, logging, or retries later.
 *  - Pages stay clean; they just call Auth.google() and get a typed result.
 *  - Base URL comes from an env variable, so dev vs. production needs no
 *    code change — just a different .env file.
 */

// Vite exposes env variables prefixed with VITE_ at build time.
// Create a .env file at the project root with:
//   VITE_API_BASE=http://127.0.0.1:8001
// Falls back to localhost if the variable isn't set (handy for quick local runs).
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8001";

// ---------------------------------------------------------------------------
// Generic request helper
// ---------------------------------------------------------------------------

/**
 * Wraps fetch with consistent JSON handling and error throwing.
 *
 * The generic <T> lets callers declare exactly what shape they expect back:
 *   request<{ ok: boolean }>("/health")  →  Promise<{ ok: boolean }>
 *
 * FIX NOTE — three TS errors were caused by the old version of this function:
 *
 *  1. ts(2314) "Promise<T> requires 1 type argument"
 *     The return type was written as Promise<T> outside a generic function.
 *     Fixed by keeping <T> on the function signature: async function request<T>(...)
 *
 *  2. ts(2314) "Record requires 2 type arguments"
 *     Record<string, string> is correct, but was being written as just Record
 *     somewhere without the type arguments. Fixed below.
 *
 *  3. ts(2304) "Cannot find name 'T'"
 *     T was referenced in the return type but the function wasn't generic.
 *     Fixed by the <T> on the function signature.
 *
 * Why read as text first, then parse?
 * Some error responses (e.g. 502 Bad Gateway) aren't valid JSON. Reading text
 * first and catching the parse error prevents an unhandled exception.
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      // Spread any extra headers the caller provides (e.g. Authorization).
      ...options.headers,
    },
    // Spread the rest of the options (method, body, etc.) after headers
    // so callers can still override anything they need to.
    ...options,
  });

  // Read the body once as text; parse to JSON if possible.
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Body wasn't JSON (e.g. plain-text error from a proxy). Keep it as a string.
    data = text;
  }

  if (!res.ok) {
    // FastAPI returns errors as { detail: "..." }. Other servers may use
    // { message: "..." }. Fall back to a generic string if neither exists.
    // Record<string, string> — two type args — is required here (fixes error 2).
    const err = data as Record<string, string> | null;
    throw new Error(
      err?.detail ?? err?.message ?? `Request failed (${res.status})`
    );
  }

  // Cast to T — safe because the caller declared exactly what shape to expect.
  return data as T;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// All fields are optional because Google only guarantees "sub" is present.
// Always check for undefined before displaying name/email/picture.
export interface GoogleUser {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string; // Google's permanent, stable user ID — use this as your DB key,
                // not email (email can change, sub never does)
}

// ---------------------------------------------------------------------------
// Auth endpoints
// ---------------------------------------------------------------------------

export const Auth = {
  /**
   * Exchange a raw Google ID token for a verified user object.
   *
   * The token comes from Google's sign-in button callback. We forward it to
   * our backend rather than trusting it in the browser, because only the
   * backend can verify it cryptographically with Google's public keys.
   */
  google: (credential: string) =>
    request<{ ok: boolean; user: GoogleUser }>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    }),
};