import { Search } from "@/components/Icons/Search";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";

import { type Dispatch, type SetStateAction, type FunctionComponent } from "react";

import HeaderItemSearchBar from "./HeaderItemSearchBar";

type TOnboardingThirdStepProps = {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: Dispatch<SetStateAction<number>>;
};

const OnboardingThirdStep: FunctionComponent<TOnboardingThirdStepProps> = ({ onboardingStepsIndex, setOnboardingStepsIndex }) => 
{
  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 2}
      popoverMenu={(
        <OnboardingTutorialStep
          isLastStep
          currentStep={3}
          totalSteps={3}
          stepTitle="Suche"
          onNextPressHandler={() => setOnboardingStepsIndex(3)}>
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

export default OnboardingThirdStep;
