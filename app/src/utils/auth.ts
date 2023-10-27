import { type SupabaseClient, type User } from "@supabase/auth-helpers-nextjs";

const _getIsUserLoggedIn = async (supabaseClientInstance: SupabaseClient): Promise<GetIsUserLoggedInResult> =>
{
  const { data: { session }, error: getSessionError } = await supabaseClientInstance.auth.getSession();

  if(getSessionError || !session?.user)
  {
    if(getSessionError)
    {
      console.warn("Error getting session, redirecting to login", getSessionError);
    }

    return { isUserLoggedIn: false };
  }

  const { data: { user }, error: getUserError } = await supabaseClientInstance.auth.getUser();

  if(getUserError)
  {
    console.log("User seems to be logged in but there was an error getting the user. Logging out user.", getUserError);
    return { isUserLoggedIn: false };
  }

  if(!user)
  {
    console.log("User is logged in but was null. This should not happen. Logging out user. This should be investigated.");
    return { isUserLoggedIn: false };
  }

  if(!user.confirmed_at)
  {
    // In this case this happens, we should send an additional confirmation email and redirect to an explanation page
    console.warn("User is not confirmed. This should not happen. User: ", user);
  }

  return {
    isUserLoggedIn: true,
    user
  };
};

type GetIsUserLoggedInResult = {
  isUserLoggedIn: false;
} | {
  isUserLoggedIn: true;
  user: User;
};

export const getIsUserLoggedIn = async (supabaseClientInstance: SupabaseClient): Promise<GetIsUserLoggedInResult> =>
{
  let getIsUserLoggedInResult: GetIsUserLoggedInResult;

  try
  {
    getIsUserLoggedInResult = await _getIsUserLoggedIn(supabaseClientInstance);
  }
  catch (e: unknown)
  {
    console.log("error getting is user logged in", e);
    getIsUserLoggedInResult = { isUserLoggedIn: false };
  }

  if(!getIsUserLoggedInResult.isUserLoggedIn)
  {
    await supabaseClientInstance.auth.signOut();
  }

  return getIsUserLoggedInResult;
};
