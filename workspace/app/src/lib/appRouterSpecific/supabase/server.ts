// import type { CookieOptions } from "@supabase/ssr";
import { env } from "@constellatio/env";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function supabaseServerClient() 
{
  const cookieStore = cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() 
        {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) 
        {
          try 
          {
            cookiesToSet.forEach(({ name, options, value }) =>
              cookieStore.set(name, value, options),
            );
          }
          catch 
          {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
