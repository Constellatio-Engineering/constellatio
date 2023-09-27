import { type CaseSearchIndexItem, type UploadSearchIndexItem } from "@/utils/search";

import { type Hits } from "meilisearch";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ToMeiliSearchResults<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: Hits<Record<string, any>>;
};

type ArraySearchResults = {
  cases: CaseSearchIndexItem[];
  userUploads: UploadSearchIndexItem[];
};

type MeiliSearchResults = ToMeiliSearchResults<ArraySearchResults>;

type SearchResults = MeiliSearchResults | ArraySearchResults;

type SearchStoreProps = {
  isDrawerOpened: boolean;
  isLoading: boolean;
  searchHistory: string[];
  searchResults: SearchResults;
  searchValue: string;
  setIsLoading: (isLoading: boolean) => void;
  setSearchResults: (searchResults: MeiliSearchResults) => void;
  setSearchValue: (searchValue: string) => void;
  toggleDrawer: (isDrawerOpened: boolean) => void;
  updateSearchHistory: (searchValue: string) => void;
};

const initialSearchResults: SearchResults = {
  cases: [],
  userUploads: [],
};

const useSearchStore = create(
  immer<SearchStoreProps>((set) => ({
    isDrawerOpened: false,
    isLoading: true,
    searchHistory: ["d", "s", "3"],
    searchResults: initialSearchResults,
    searchValue: "",
    setIsLoading: (isLoading) => 
    {
      set((state) => 
      {
        state.isLoading = isLoading;
      });
    },
    setSearchResults: (searchResults) => 
    {
      set((state) => 
      {
        state.searchResults = searchResults;
      });
    },
    setSearchValue: (searchValue) => 
    {
      set((state) => 
      {
        state.searchValue = searchValue;
      });
    },
    toggleDrawer: (isDrawerOpened) => 
    {
      set((state) => 
      {
        state.isDrawerOpened = isDrawerOpened;
      });
    },
    updateSearchHistory: (searchValue) =>
    {
      set((state) =>
      {
        if(!state.searchHistory.includes(searchValue))
        {
          state.searchHistory.push(searchValue);
        }
      });
    },
  }))
);

export default useSearchStore;
