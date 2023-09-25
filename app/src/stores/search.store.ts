import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SearchStoreProps = {
  isDrawerOpened: boolean;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  toggleDrawer: (isDrawerOpened: boolean) => void;
};

const useSearchStore = create(
  immer<SearchStoreProps>((set) => ({
    isDrawerOpened: false,
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
  }))
);

export default useSearchStore;
