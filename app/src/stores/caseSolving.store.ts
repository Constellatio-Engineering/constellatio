import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CaseStepIndex = 0 | 1 | 2;

interface ICaseSolvingStore 
{
  caseStepIndex: CaseStepIndex;
  isStepCompleted: boolean;
  setCaseStepIndex: (caseStepIndex: CaseStepIndex) => void;
  setIsStepCompleted: (isCompleted: boolean) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  setSolution: (solution: string) => void;
  showStepTwoModal: boolean;
  solution: string;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    caseStepIndex: 0,
    isStepCompleted: false,
    setCaseStepIndex: (caseStepIndex) => 
    {
      set((state) => 
      {
        state.caseStepIndex = caseStepIndex;
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
    setSolution: (solution) =>
    {
      set((state) => 
      {
        state.solution = solution;
      });
    },
    showStepTwoModal: false,
    solution: ""
  }))
);

export default useCaseSolvingStore;
