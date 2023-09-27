import { env } from "@/env.mjs";
import useSearchStore from "@/stores/search.store";
import { api } from "@/utils/api";
import { searchIndices } from "@/utils/search";

import { useQuery } from "@tanstack/react-query";
import { MeiliSearch } from "meilisearch";
import React, {
  type FunctionComponent, useEffect, useMemo, type ReactNode 
} from "react";

type SearchOverlayWrapperProps = {
  readonly children: ReactNode;
  readonly hasInput: boolean;
};

const SearchOverlayWrapper: FunctionComponent<SearchOverlayWrapperProps> = ({ children, hasInput }) => 
{
  const searchResults = useSearchStore((s) => s.searchResults);
  const searchValue = useSearchStore((s) => s.searchValue);
  const setSearchResults = useSearchStore((s) => s.setSearchResults);
  const setIsLoading = useSearchStore((s) => s.setIsLoading);

  const { data: searchToken } = api.search.getTenantToken.useQuery(undefined, {
    refetchOnMount: "always",
    retry: false,
    staleTime: env.NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS - 1000,
  });

  const meiliSearch = useMemo(() => !searchToken ? null : new MeiliSearch({
    apiKey: searchToken,
    host: env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL
  }), [searchToken]);

  const { data: searchDataRes = searchResults, isLoading } = useQuery({
    enabled: hasInput && meiliSearch != null,
    keepPreviousData: true,
    queryFn: async () =>
    {
      if(!meiliSearch)
      {
        return searchResults;
      }

      const { results } = await meiliSearch.multiSearch({
        queries: [
          {
            indexUid: searchIndices.cases,
            q: searchValue,
          },
          {
            indexUid: searchIndices.userUploads,
            q: searchValue,
          }
        ]
      });                                           

      return ({
        cases: results?.[0]?.hits ?? [],
        userUploads: results?.[1]?.hits ?? [],
      });

    },
    queryKey: ["search", searchValue],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 3000,
  });

  useEffect(() => 
  {
    setSearchResults(searchDataRes);
    setIsLoading(isLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDataRes, isLoading]);
  return (
    <>{children}</>
  );
};

export default SearchOverlayWrapper;
