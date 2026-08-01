export { createClient as createBrowserClient } from "@/lib/supabase/client";

import { createClient } from "@/lib/supabase/client";

let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  browserClient ??= createClient();
  return browserClient;
}
