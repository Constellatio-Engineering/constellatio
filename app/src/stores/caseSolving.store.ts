import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICaseSolvingStore 
{
  hasCaseSolvingStarted: boolean;
  isStepCompleted: boolean;
  setHasCaseSolvingStarted: (hasCaseSolvingStarted: boolean) => void;
  setIsStepCompleted: (isCompleted: boolean) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  showStepTwoModal: boolean;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    hasCaseSolvingStarted: false,
    isStepCompleted: false,
    setHasCaseSolvingStarted: (hasCaseSolvingStarted) => 
    {
      set((state) => 
      {
        state.hasCaseSolvingStarted = hasCaseSolvingStarted;
      });
    },
    setIsStepCompleted(isCompleted) 
    {
      set((state) => 
      {
        state.isStepCompleted = isCompleted;
      });
    },
    setShowStepTwoModal: (showStepTwoModal) =>
    {
      set((state) => 
      {
        state.showStepTwoModal = showStepTwoModal;
      });
    },
    showStepTwoModal: false
  }))
);

export default useCaseSolvingStore;
