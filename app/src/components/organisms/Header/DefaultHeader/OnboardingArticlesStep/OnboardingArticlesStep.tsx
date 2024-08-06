import { BookmarkBook } from "@/components/Icons/BookmarkBook";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import type { SearchStoreProps } from "@/stores/onboarding.store";

import { type FunctionComponent } from "react";

import HeaderItemLink, { type THeaderItemLinkProps } from "../HeaderItemLink";

type OnboardingArticlesStepProps = THeaderItemLinkProps & {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

export const OnboardingArticlesStep: FunctionComponent<OnboardingArticlesStepProps> = ({
  link,
  onboardingStepsIndex,
  pathname,
  setOnboardingStepsIndex
}) => 
{
  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 1}
      popoverMenu={(
        <OnboardingTutorialStep
          currentStep={2}
          totalSteps={5}
          stepTitle="Lexikon"
          onNextPressHandler={() => setOnboardingStepsIndex(2)}>
          <OnboardingTutorialStepItem icon={<BookmarkBook size={20}/>} itemTitle="Lexikon" itemDescription="Detaillierte und abstrakte Darstellungen findest du in den verlinkten Lexikon-Artikeln."/>
        </OnboardingTutorialStep>
      )}
      popoverTarget={(
        <HeaderItemLink link={link} pathname={pathname}/>
      )}
    />
  );
};
