import { type CaseProgressState } from "@/db/schema";
import { getCaseProgressStateAsNumber } from "@/utils/case";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CaseStepIndex = 0 | 1 | 2;

interface ICaseSolvingStore 
{
  caseStepIndex: CaseStepIndex | undefined;
  overrideCaseStepIndex: (caseStepIndex: CaseStepIndex, caseProgressState: CaseProgressState) => void;
  setCaseStepIndex: (caseStepIndex: CaseStepIndex) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  showStepTwoModal: boolean;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    caseStepIndex: undefined,
    overrideCaseStepIndex: (caseStepIndex, caseProgressState) =>
    {
      const caseProgressStateAsNumber = getCaseProgressStateAsNumber(caseProgressState);

      if(caseStepIndex > caseProgressStateAsNumber)
      {
        return;
      }

      set((state) => 
      {
        state.caseStepIndex = caseStepIndex;
      });
    },
    setCaseStepIndex: (caseStepIndex) =>
    {
      set((state) =>
      {
        state.caseStepIndex = caseStepIndex;
      });
    },
    setShowStepTwoModal: (showStepTwoModal) =>
    {
      set((state) => 
      {
        state.showStepTwoModal = showStepTwoModal;
      });
    },
    showStepTwoModal: false,
  }))
);

export default useCaseSolvingStore;
