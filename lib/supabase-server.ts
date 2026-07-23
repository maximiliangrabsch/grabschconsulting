import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client — full read/write access, bypasses RLS.
// Must never be imported from a Client Component or exposed to the browser.
// Only use inside Server Actions / Route Handlers under app/leads.

// No generated Database types for this project yet — using `any` keeps the
// query builder permissive instead of collapsing row types to `never`.
let cachedClient: ReturnType<typeof createClient<any, any, any>> | null = null;

export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_KEY missing. Set them in .env.local (see .env.example)."
    );
  }

  cachedClient = createClient<any, any, any>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cachedClient;
}
