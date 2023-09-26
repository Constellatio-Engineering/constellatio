import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const getIsUserLoggedIn = async (supabaseClientInstance: SupabaseClient): Promise<boolean> =>
{
  const { data: { session }, error: getSessionError } = await supabaseClientInstance.auth.getSession();

  if(getSessionError || !session?.user)
  {
    if(getSessionError)
    {
      console.warn("Error getting session, redirecting to login", getSessionError);
    }

    return false;
  }

  return true;
};
