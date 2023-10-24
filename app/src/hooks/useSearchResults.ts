import { MeilisearchContext } from "@/provider/MeilisearchProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import {
  type ArticleSearchIndexItem, type CaseSearchIndexItem, type DocumentSearchIndexItem, searchIndices, type UploadSearchIndexItem 
} from "@/utils/search";

import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

export type SearchResults = {
  articles: ArticleSearchIndexItem[];
  cases: CaseSearchIndexItem[];
  userDocuments: DocumentSearchIndexItem[];
  userUploads: UploadSearchIndexItem[];
};

export type SearchResultsKey = keyof SearchResults;

const initialSearchResults: SearchResults = {
  articles: [],
  cases: [],
  userDocuments: [],
  userUploads: [],
};

type UseSearchResults = () => {
  isLoading: boolean;
  refetch: () => void;
  searchResults: SearchResults;
};

export const searchResultsQueryKey = "searchResults";

const useSearchResults: UseSearchResults = () =>
{
  const { meilisearchInstance } = useContext(MeilisearchContext);
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const hasInput = searchValue?.length > 0;

  const { data: searchResults = initialSearchResults, isLoading, refetch } = useQuery({
    enabled: hasInput && meilisearchInstance != null,
    keepPreviousData: true,
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
        ]
      });

      return ({
        // Be careful with the order of the results!
        articles: (results?.[0]?.hits as ArticleSearchIndexItem[]) ?? [],
        cases: (results?.[1]?.hits as CaseSearchIndexItem[]) ?? [],
        userDocuments: (results?.[2]?.hits as DocumentSearchIndexItem[]) ?? [],
        userUploads: (results?.[3]?.hits as UploadSearchIndexItem[]) ?? [],
      });
    },
    queryKey: [searchResultsQueryKey, searchValue],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() =>
  {
    // console.log(searchResults.userUploads);
    // console.log(searchResults.userDocuments);
  }, [searchResults]);

  return { isLoading, refetch, searchResults };
};

export default useSearchResults;
