// frontend/api.ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8001";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = data?.detail || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}

export type GoogleUser = {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
};

export const Auth = {
  google: (credential: string) =>
    request<{ ok: boolean; user: GoogleUser }>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    }),
};
