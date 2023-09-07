import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICaseSolvingStore 
{
  hasCaseSolvingStarted: boolean;
  setHasCaseSolvingStarted: (hasCaseSolvingStarted: boolean) => void;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    hasCaseSolvingStarted: false,
    setHasCaseSolvingStarted: (hasCaseSolvingStarted) => 
    {
      set((state) => 
      {
        state.hasCaseSolvingStarted = hasCaseSolvingStarted;
      });
    },
  }))
);

export default useCaseSolvingStore;
