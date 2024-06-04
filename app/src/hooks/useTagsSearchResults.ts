import { MeilisearchContext } from "@/provider/MeilisearchProvider";
import { searchIndices, type TagSearchIndexItem } from "@/utils/search/search";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const initialSearchResults: TagSearchIndexItem[] = [];

type UseSearchResults = (query: string) => {
  isLoading: boolean;
  refetch: () => void;
  tagsSearchResults: TagSearchIndexItem[];
};

const tagsSearchResultsQueryKey = "tagsSearchResults";

export const useTagsSearchResults: UseSearchResults = (query) =>
{
  const { meilisearchInstance } = useContext(MeilisearchContext);
  const hasInput = query?.length > 0;

  const { data: searchResults = initialSearchResults, isLoading, refetch } = useQuery({
    enabled: hasInput && meilisearchInstance != null,
    placeholderData: keepPreviousData,
    queryFn: async () =>
    {
      if(!meilisearchInstance)
      {
        return initialSearchResults;
      }

      const searchResult = await meilisearchInstance.index(searchIndices.tags).search<TagSearchIndexItem>(query);
      return searchResult.hits;
    },
    queryKey: [tagsSearchResultsQueryKey, query],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  });

  return { isLoading, refetch, tagsSearchResults: searchResults };
};
