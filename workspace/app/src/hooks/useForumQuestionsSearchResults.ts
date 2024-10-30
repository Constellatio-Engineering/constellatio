import { MeilisearchContext } from "@/provider/MeilisearchProvider";
import { useForumQuestionsSearchStore } from "@/stores/forumQuestionsSearch.store";

import { searchIndices } from "@constellatio/db-to-search";
import { type ForumQuestionSearchIndexItem } from "@constellatio/meilisearch/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const forumQuestionsSearchResultsQueryKey = "forumQuestionsSearchResults";

export const useForumQuestionsSearchResults = () =>
{
  const { meilisearchInstance } = useContext(MeilisearchContext);
  const searchValue = useForumQuestionsSearchStore((s) => s.searchValue);
  const hasInput = searchValue?.length > 0;

  return useQuery({
    enabled: hasInput && meilisearchInstance != null,
    placeholderData: keepPreviousData,
    queryFn: async () =>
    {
      return meilisearchInstance!.index(searchIndices.forumQuestions).search<ForumQuestionSearchIndexItem>(searchValue);
    },
    queryKey: [forumQuestionsSearchResultsQueryKey, searchValue],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
