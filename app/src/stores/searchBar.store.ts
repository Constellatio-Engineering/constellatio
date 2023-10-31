import posthog from "posthog-js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SearchStoreProps = {
  closeDrawer: () => void;
  isDrawerOpened: boolean;
  openDrawer: (refetchSearchResults: () => void) => void;
  searchHistory: string[];
  searchValue: string;
  setSearchHistory: (searchHistory: string[]) => void;
  setSearchValue: (searchValue: string) => void;
};

const useSearchBarStore = create(
  immer<SearchStoreProps>((set) => ({
    closeDrawer: () => {
      /*TODO:: wo sonst? hier wird glaub beim laden auch ausgeführt  posthog.capture("search-close", {
      }); */

      set((state) => {
        if (state.isDrawerOpened) {
          posthog.capture("search-close");
          state.isDrawerOpened = false;
        }
      });
    },
    isDrawerOpened: false,
    openDrawer: (refetchSearchResults) => {
      posthog.capture("search-textfield-enter");

      refetchSearchResults();

      set((state) => {
        state.isDrawerOpened = true;
      });
    },
    searchHistory: [],
    searchValue: "",
    setSearchHistory: (searchHistory) => {
      set((state) => {
        state.searchHistory = searchHistory;
      });
    },
    setSearchValue: (searchValue) => {
      set((state) => {
        state.searchValue = searchValue;
      });
    },
  }))
);

export default useSearchBarStore;
