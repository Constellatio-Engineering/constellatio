import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SearchStoreProps = {
  isDrawerOpened: boolean;
  searchHistory: string[];
  searchValue: string;
  setSearchHistory: (searchHistory: string[]) => void;
  setSearchValue: (searchValue: string) => void;
  toggleDrawer: (isDrawerOpened: boolean) => void;
};

const useSearchBarStore = create(immer<SearchStoreProps>((set) => (
  {
    isDrawerOpened: false,
    searchHistory: [],
    searchValue: "",
    setSearchHistory: (searchHistory) =>
    {
      set((state) => 
      {
        state.searchHistory = searchHistory;
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
  }))
);

export default useSearchBarStore;
