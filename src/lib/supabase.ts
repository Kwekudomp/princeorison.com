import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/** Returns the Supabase client, or null if env vars are not configured. */
export function getSupabaseClient(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}

/**
 * Supabase client — only use in service files that already
 * guard with `if (!supabase) return fallback`.
 */
export const supabase = {
  from: (table: string) => {
    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase not configured");
    return client.from(table);
  },
};
