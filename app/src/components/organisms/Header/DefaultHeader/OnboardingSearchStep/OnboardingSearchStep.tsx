import { Search } from "@/components/Icons/Search";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import type { SearchStoreProps } from "@/stores/onboarding.store";

import { type FunctionComponent } from "react";

import HeaderItemSearchBar from "./HeaderItemSearchBar";

type TOnboardingSearchStepProps = {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

export const OnboardingSearchStep: FunctionComponent<TOnboardingSearchStepProps> = ({ onboardingStepsIndex, setOnboardingStepsIndex }) =>
{
  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 4}
      popoverMenu={(
        <OnboardingTutorialStep
          isLastStep
          currentStep={5}
          totalSteps={5}
          stepTitle="Suche"
          onNextPressHandler={() => setOnboardingStepsIndex(5)}>
          <OnboardingTutorialStepItem
            icon={<Search size={20}/>}
            itemTitle="Umfassende, blitzschnelle Suche"
            itemDescription="Dank ausgeklügelter Filtermöglichkeiten und neuester Technik findest du immer sofort deine benötigten Inhalte."
          />
        </OnboardingTutorialStep>
      )}
      popoverTarget={(<HeaderItemSearchBar/>)}
    />
  );
};
