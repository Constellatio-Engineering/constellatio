import { Search } from "@/components/Icons/Search";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";

import { type FunctionComponent } from "react";

import HeaderItemSearchBar from "./HeaderItemSearchBar";

type TOnboardingThirdStepProps = {
  readonly onboardingStepsIndex: number;
};

const OnboardingThirdStep: FunctionComponent<TOnboardingThirdStepProps> = ({ onboardingStepsIndex }) => 
{
  const { setOnboardingResult } = useSetOnboardingResult();

  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 2}
      popoverMenu={(
        <OnboardingTutorialStep
          isLastStep
          currentStep={3}
          totalSteps={3}
          stepTitle="Suche"
          onNextPressHandler={() => setOnboardingResult({ result: "completed" })}>
          <OnboardingTutorialStepItem icon={<Search size={20}/>} itemTitle="Umfassende, blitzschnelle Suche" itemDescription="Dank ausgeklügelter Filtermöglichkeiten und neuester Technik findest du immer sofort deine benötigten Inhalte."/>
        </OnboardingTutorialStep>
      )}
      popoverTarget={(
        <HeaderItemSearchBar/>
      )}
    />
  );
};

export default OnboardingThirdStep;
