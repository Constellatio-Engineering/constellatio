import { CasesIcon } from "@/components/Icons/CasesIcon";
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

export const OnboardingCasesStep: FunctionComponent<OnboardingCasesStepProps> = ({
  link,
  onboardingStepsIndex,
  pathname,
  setOnboardingStepsIndex
}) => 
{
  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 0}
      popoverMenu={(
        <OnboardingTutorialStep
          currentStep={1}
          totalSteps={4}
          stepTitle="Willkommen bei Constellatio!"
          onNextPressHandler={() => setOnboardingStepsIndex(1)}>
          <OnboardingTutorialStepItem
            icon={<CasesIcon size={20}/>}
            itemTitle="Interaktive Fälle"
            itemDescription="Mit unseren geführten Lösungen erarbeitest du dir die Schwerpunkte der Fälle"
          />
        </OnboardingTutorialStep>
      )}
      popoverTarget={(
        <HeaderItemLink link={link} pathname={pathname}/>
      )}
    />
  );
};
