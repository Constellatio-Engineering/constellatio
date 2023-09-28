import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SearchStoreProps = {
  isDrawerOpened: boolean;
  searchHistory: string[];
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  toggleDrawer: (isDrawerOpened: boolean) => void;
  updateSearchHistory: (searchValue: string) => void;
};

const useSearchBarStore = create(
  immer<SearchStoreProps>((set) => ({
    isDrawerOpened: false,
    searchHistory: ["d", "s", "3"],
    searchValue: "",
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

export default useSearchBarStore;
