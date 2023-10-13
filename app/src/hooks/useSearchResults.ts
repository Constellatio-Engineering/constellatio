import { MeilisearchContext } from "@/provider/MeilisearchProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import { type ArticleSearchIndexItem, type CaseSearchIndexItem, searchIndices, type UploadSearchIndexItem } from "@/utils/search";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export type SearchResults = {
  articles: ArticleSearchIndexItem[];
  cases: CaseSearchIndexItem[];
  userUploads: UploadSearchIndexItem[];
};

const initialSearchResults: SearchResults = {
  articles: [],
  cases: [],
  userUploads: [],
};

type UseSearchResults = () => {
  isLoading: boolean;
  searchResults: SearchResults;
};

const useSearchResults: UseSearchResults = () =>
{
  const { meilisearchInstance } = useContext(MeilisearchContext);
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const hasInput = searchValue?.length > 0;

  const { data: searchResults = initialSearchResults, isLoading } = useQuery({
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
        articles: (results?.[1]?.hits as ArticleSearchIndexItem[]) ?? [],
        cases: (results?.[0]?.hits as CaseSearchIndexItem[]) ?? [],
        userUploads: (results?.[2]?.hits as UploadSearchIndexItem[]) ?? [],
      });
    },
    queryKey: ["search", searchValue],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 3000,
  });

  return { isLoading, searchResults };
};

export default useSearchResults;
