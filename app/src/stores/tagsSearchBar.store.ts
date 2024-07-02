import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TagsSearchStoreProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

export const useTagsSearchBarStore = create(
  immer<TagsSearchStoreProps>((set) => ({
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
