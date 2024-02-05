import { MeilisearchContext } from "@/provider/MeilisearchProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import { searchIndices } from "@/utils/search";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const forumQuestionsSearchResultsQueryKey = "forumQuestionsSearchResults";

export const useForumQuestionsSearchResults = () =>
{
  const { meilisearchInstance } = useContext(MeilisearchContext);
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const hasInput = searchValue?.length > 0;

  return useQuery({
    enabled: hasInput && meilisearchInstance != null,
    placeholderData: keepPreviousData,
    queryFn: async () =>
    {
      if(!meilisearchInstance)
      {
        return [];
      }

      return meilisearchInstance.index(searchIndices.forumQuestions).search(searchValue);
    },
    queryKey: [forumQuestionsSearchResultsQueryKey, searchValue],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
