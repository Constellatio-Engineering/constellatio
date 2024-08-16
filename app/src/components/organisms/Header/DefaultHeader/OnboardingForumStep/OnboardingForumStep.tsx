import { Forum } from "@/components/Icons/Forum";
import { Verified } from "@/components/Icons/Verified";
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
          totalSteps={4}
          stepTitle="Kuratiertes Forum"
          onNextPressHandler={() => setOnboardingStepsIndex(3)}>
          <OnboardingTutorialStepItem
            icon={<Forum size={20}/>}
            itemTitle="Schwarmintelligenz"
            itemDescription="Diskutiere mit der Community über die hilfreichste Antwort und stimme ab"
          />
          <OnboardingTutorialStepItem
            icon={<Verified size={20}/>}
            itemTitle="Verfifizierte Antworten"
            itemDescription="Volljuristen stellen sicher, dass du rechtlich korrekte Antworten siehst"
          />
        </OnboardingTutorialStep>
      )}
      popoverTarget={(
        <HeaderItemLink link={link} pathname={pathname}/>
      )}
    />
  );
};
