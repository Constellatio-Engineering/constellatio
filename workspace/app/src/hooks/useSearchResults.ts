import { MeilisearchContext } from "@/provider/MeilisearchProvider";

import { searchIndices } from "@constellatio/db-to-search";
import {
  type ArticleSearchIndexItem, type CaseSearchIndexItem, type DocumentSearchIndexItem, type ForumQuestionSearchIndexItem, type UploadSearchIndexItem 
} from "@constellatio/meilisearch/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

export type SearchResults = {
  articles: ArticleSearchIndexItem[];
  cases: CaseSearchIndexItem[];
  forumQuestions: ForumQuestionSearchIndexItem[];
  userDocuments: DocumentSearchIndexItem[];
  userUploads: UploadSearchIndexItem[];
};

export type SearchResultsKey = keyof Omit<SearchResults, "userDocuments">;

const initialSearchResults: SearchResults = {
  articles: [],
  cases: [],
  forumQuestions: [],
  userDocuments: [],
  userUploads: [],
};

type UseSearchResults = (overwriteSearchValue?: string) => {
  isLoading: boolean;
  refetch: () => void;
  searchResults: SearchResults;
};

export const searchResultsQueryKey = "searchResults";

const useSearchResults: UseSearchResults = (overwriteSearchValue) =>
{
  const router = useRouter();
  let searchValue = router.query.find as string;

  if(overwriteSearchValue != null)
  {
    searchValue = overwriteSearchValue;
  }

  const { meilisearchInstance } = useContext(MeilisearchContext);
  const hasInput = searchValue?.length > 0;

  const { data: searchResults = initialSearchResults, isPending: isLoading, refetch } = useQuery({
    enabled: hasInput && meilisearchInstance != null,
    placeholderData: keepPreviousData,
    queryFn: async () =>
    {
      if(!meilisearchInstance)
      {
        return initialSearchResults;
      }

      const { results } = await meilisearchInstance.multiSearch({
        queries: [
          {
            indexUid: searchIndices.articles,
            q: searchValue,
          },
          {
            indexUid: searchIndices.cases,
            q: searchValue,
          },
          {
            indexUid: searchIndices.userDocuments,
            q: searchValue,
          },
          {
            indexUid: searchIndices.userUploads,
            q: searchValue,
          },
          {
            indexUid: searchIndices.forumQuestions,
            q: searchValue,
          },
        ]
      });

      return ({
        // Be careful with the order of the results!
        articles: (results?.[0]?.hits as ArticleSearchIndexItem[]) ?? [],
        cases: (results?.[1]?.hits as CaseSearchIndexItem[]) ?? [],
        forumQuestions: (results?.[4]?.hits as ForumQuestionSearchIndexItem[]) ?? [],
        userDocuments: (results?.[2]?.hits as DocumentSearchIndexItem[]) ?? [],
        userUploads: (results?.[3]?.hits as UploadSearchIndexItem[]) ?? [],
      });
    },
    queryKey: [searchResultsQueryKey, searchValue],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  });

  return { isLoading, refetch, searchResults };
};

export default useSearchResults;
