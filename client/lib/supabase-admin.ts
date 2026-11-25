/**
 * Lightweight Supabase RPC Client for Cloud Admin Authentication
 * Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (injected via GitHub Secrets / .env.local).
 * Never stores secrets or plaintext passwords in the public repository.
 */

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export async function callSupabaseRpc<T = any>(
  fnName: string,
  params: Record<string, any> = {}
): Promise<T> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Supabase RPC '${fnName}' failed (${res.status}): ${errText}`);
  }

  return (await res.json()) as T;
}
