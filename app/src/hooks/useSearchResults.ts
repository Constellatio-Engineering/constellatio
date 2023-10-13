import { MeilisearchContext } from "@/provider/MeilisearchProvider";
import type getPopularSearches from "@/services/content/getPopularSearches";
import { type IGenSearch } from "@/services/graphql/__generated/sdk";
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
  popularSearches: Promise<IGenSearch>;
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

  // const popularSearches: typeof popularSearches = fetch("/api/search/getPopularSearchesFromCaisy").then(async (res) => res.json());

  // const popularSearchesRes = async (): Promise<IGenSearch> => 
  // {
  //   const res = await fetch("/api/search/getPopularSearchesFromCaisy");
  //   const json = await res.json();
  //   const data = await json;

  //   return data;
  // };

  // const popularSearches = popularSearchesRes();

  const popularSearches = fetch("/api/search/getPopularSearchesFromCaisy").then(async (res) => res.json());

  return { isLoading, popularSearches, searchResults };
};

export default useSearchResults;
