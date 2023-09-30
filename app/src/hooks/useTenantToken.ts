import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

type UseTenantToken = () => UseQueryResult<{ searchToken: string | undefined}>;

const useTenantToken: UseTenantToken = () =>
{
  const supabase = useSupabaseClient();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() =>
  {
    const subscription = supabase.auth.onAuthStateChange((_event, session) =>
    {
      setIsUserLoggedIn(session != null);
    });

    return () => subscription.data.subscription.unsubscribe();
  }, []);

  const { data: searchToken, error, isLoading } = api.search.getTenantToken.useQuery(undefined, {
    enabled: isUserLoggedIn,
    refetchOnMount: "always",
    retry: false,
    staleTime: env.NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS - 1000,
  });

  return {
    error,
    isLoading,
    searchToken
  }; 
};

export default useTenantToken;
