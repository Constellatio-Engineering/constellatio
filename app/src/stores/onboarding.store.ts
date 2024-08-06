import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type OnboardingStepIndex = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export type SearchStoreProps = {
  onboardingStepsIndex: OnboardingStepIndex;
  setOnboardingStepsIndex: (onboardingStepsIndex: OnboardingStepIndex) => void;
};

export const useOnboardingStore = create(
  immer<SearchStoreProps>((set) => ({
    onboardingStepsIndex: 0,
    setOnboardingStepsIndex: (onboardingStepsIndex) =>
    {
      set((state) =>
      {
        state.onboardingStepsIndex = onboardingStepsIndex;
      });
    },
  }))
);
