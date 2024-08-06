import { Forum } from "@/components/Icons/Forum";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import HeaderItemLink, { type THeaderItemLinkProps } from "@/components/organisms/Header/DefaultHeader/HeaderItemLink";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import type { SearchStoreProps } from "@/stores/onboarding.store";

import { type FunctionComponent } from "react";

type OnboardingCasesStepProps = THeaderItemLinkProps & {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

export const OnboardingForumStep: FunctionComponent<OnboardingCasesStepProps> = ({
  link,
  onboardingStepsIndex,
  pathname,
  setOnboardingStepsIndex
}) => 
{
  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 2}
      popoverMenu={(
        <OnboardingTutorialStep
          currentStep={3}
          totalSteps={5}
          stepTitle="Forum"
          onNextPressHandler={() => setOnboardingStepsIndex(3)}>
          <OnboardingTutorialStepItem
            icon={<Forum size={20}/>}
            itemTitle="Forum"
            itemDescription="Tausche dich mit anderen Studierenden aus und erhalte Antworten auf deine Fragen."
          />
        </OnboardingTutorialStep>
      )}
      popoverTarget={(
        <HeaderItemLink link={link} pathname={pathname}/>
      )}
    />
  );
};
