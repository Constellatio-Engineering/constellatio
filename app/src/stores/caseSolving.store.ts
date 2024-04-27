import { type CaseProgressState } from "@/db/schema";
import { getCaseProgressStateAsNumber } from "@/utils/case";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CaseStepIndex = 0 | 1 | 2;

export type ObservedHeadline = {
  id: string;
  level: number;
};

interface ICaseSolvingStore 
{
  caseStepIndex: CaseStepIndex | undefined;
  observedHeadlineId: string | undefined;
  overrideCaseStepIndex: (caseStepIndex: CaseStepIndex, caseProgressState: CaseProgressState) => void;
  setCaseStepIndex: (caseStepIndex: CaseStepIndex) => void;
  setObservedHeadlineId: (id: string | undefined) => void;
  setShowStepTwoModal: (showStepTwoModal: boolean) => void;
  showStepTwoModal: boolean;
}

const useCaseSolvingStore = create(
  immer<ICaseSolvingStore>((set) => ({
    caseStepIndex: undefined,
    observedHeadlineId: undefined,
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
    setObservedHeadlineId: (id) =>
    {
      set((state) => 
      {
        state.observedHeadlineId = id;
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
