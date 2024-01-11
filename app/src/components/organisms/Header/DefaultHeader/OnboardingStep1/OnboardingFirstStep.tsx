import { BookmarkBook } from "@/components/Icons/BookmarkBook";
import { CasesIcon } from "@/components/Icons/CasesIcon";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import type { SearchStoreProps } from "@/stores/onboarding.store";

import { type FunctionComponent } from "react";

import HeaderItemLink, { type THeaderItemLinkProps } from "./HeaderItemLink";

type OnboardingFirstStepProps = THeaderItemLinkProps & { 
  readonly onSkipPressHandler: () => void;
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

const OnboardingFirstStep: FunctionComponent<OnboardingFirstStepProps> = ({
  link,
  onboardingStepsIndex,
  onSkipPressHandler,
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
          totalSteps={3}
          stepTitle="Willkommen bei Constellatio!"
          onNextPressHandler={() => setOnboardingStepsIndex(1)}
          onSkipPressHandler={onSkipPressHandler}>
          <OnboardingTutorialStepItem icon={<CasesIcon size={20}/>} itemTitle="Fälle" itemDescription="Die Wissensvermittlung findet anhand interaktiver Fälle statt."/>
          <OnboardingTutorialStepItem icon={<BookmarkBook size={20}/>} itemTitle="Lexikon" itemDescription="Detaillierte und abstrakte Darstellungen findest du in den verlinkten Lexikon-Artikeln."/>
        </OnboardingTutorialStep>
      )}
      popoverTarget={(
        <HeaderItemLink link={link} pathname={pathname}/>
      )}
    />
  );
};

export default OnboardingFirstStep;
