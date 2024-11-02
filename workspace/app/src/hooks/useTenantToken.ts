import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { env } from "@constellatio/env";
import { useContext } from "react";

type UseTenantToken = () => UseQueryResult<{ searchToken: string | undefined}>;

const useTenantToken: UseTenantToken = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  const { data: searchToken, error, isLoading } = api.search.getTenantToken.useQuery(undefined, {
    enabled: isUserLoggedIn ?? false,
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
