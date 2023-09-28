import { env } from "@/env.mjs";
import useTenantToken from "@/hooks/useTenantToken";
import useSearchStore from "@/stores/search.store";
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
  const { searchToken } = useTenantToken();

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
            indexUid: searchIndices.articles,
            q: searchValue,
          },
          {
            indexUid: searchIndices.userUploads,
            q: searchValue,
          }
        ]
      });                                           

      return ({
        // Be careful with the order of the results!
        articles: results?.[1]?.hits ?? [],
        cases: results?.[0]?.hits ?? [],
        userUploads: results?.[2]?.hits ?? [],
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
    useSearchStore.getState().setSearchResults(searchDataRes);
  }, [searchDataRes, isLoading]);

  return (
    <>{children}</>
  );
};

export default SearchOverlayWrapper;
