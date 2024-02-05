import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SearchStoreProps = {
  closeDrawer: () => void;
  isDrawerOpened: boolean;
  openDrawer: () => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

export const useForumQuestionsSearchStore = create(
  immer<SearchStoreProps>((set) => ({
    closeDrawer: () => 
    {
      set((state) =>
      {
        state.isDrawerOpened = false;
      });
    },
    isDrawerOpened: false,
    openDrawer: () =>
    {
      set((state) =>
      {
        state.isDrawerOpened = true;
      });
    },
    searchValue: "",
    setSearchValue: (searchValue) =>
    {
      set((state) =>
      {
        state.searchValue = searchValue;
      });
    },
  }))
);
