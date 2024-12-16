import { env } from "@constellatio/env";
import { createBrowserClient } from "@supabase/ssr";

export function supabaseBrowserClient() 
{
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/* 
  TODO: 
    - fix deprecated information 
*/
