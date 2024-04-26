import { type CaseProgressState } from "@/db/schema";
import { getCaseProgressStateAsNumber } from "@/utils/case";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CaseStepIndex = 0 | 1 | 2;

interface ICaseSolvingStore 
{
  caseStepIndex: CaseStepIndex | undefined;
  observedHeadlinePath: string | undefined;
  overrideCaseStepIndex: (caseStepIndex: CaseStepIndex, caseProgressState: CaseProgressState) => void;
  setCaseStepIndex: (caseStepIndex: CaseStepIndex) => void;
  setObservedHeadlinePath: (observedHeadlinePath: string | undefined) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  showStepTwoModal: boolean;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    caseStepIndex: undefined,
    observedHeadlinePath: undefined,
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
    setObservedHeadlinePath: (observedHeadlinePath) =>
    {
      set((state) => 
      {
        state.observedHeadlinePath = observedHeadlinePath;
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
