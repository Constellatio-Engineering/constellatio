import { type CaseProgressState } from "@/db/schema";
import { getCaseProgressStateAsNumber } from "@/utils/case";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CaseStepIndex = 0 | 1 | 2;

interface ICaseSolvingStore 
{
  overrideCaseStepIndex: CaseStepIndex | undefined;
  resetOverrideCaseStepIndex: () => void;
  setOverrideCaseStepIndex: (caseStepIndex: CaseStepIndex, caseProgressState: CaseProgressState) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  setSolution: (solution: string) => void;
  showStepTwoModal: boolean;
  solution: string;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    overrideCaseStepIndex: undefined,
    resetOverrideCaseStepIndex: () =>
    {
      set((state) =>
      {
        state.overrideCaseStepIndex = undefined;
      });
    },
    setOverrideCaseStepIndex: (caseStepIndex, caseProgressState) =>
    {
      const caseProgressStateAsNumber = getCaseProgressStateAsNumber(caseProgressState);

      if(caseStepIndex >= caseProgressStateAsNumber)
      {
        console.log("You can't click on this step yet");
        return;
      }

      set((state) => 
      {
        state.overrideCaseStepIndex = caseStepIndex;
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
