import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseTenantToken = () => UseQueryResult<{ searchToken: string | undefined}>;

const useTenantToken: UseTenantToken = () =>
{
  const { data: searchToken, error, isLoading } = api.search.getTenantToken.useQuery(undefined, {
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
