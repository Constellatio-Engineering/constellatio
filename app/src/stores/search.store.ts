import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SearchStoreProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

const useSearchStore = create(
  immer<SearchStoreProps>((set) => ({
    searchValue: "",
    setSearchValue: (searchValue) => 
    {
      set((state) => 
      {
        state.searchValue = searchValue;
      });
    }
  })
  ));

export default useSearchStore;
