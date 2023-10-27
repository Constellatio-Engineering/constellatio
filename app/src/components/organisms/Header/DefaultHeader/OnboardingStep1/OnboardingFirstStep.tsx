import { BookmarkBook } from "@/components/Icons/BookmarkBook";
import { CasesIcon } from "@/components/Icons/CasesIcon";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";

import { type Dispatch, type FunctionComponent, type SetStateAction } from "react";

import HeaderItemLink, { type THeaderItemLinkProps } from "./HeaderItemLink";

type OnboardingFirstStepProps = THeaderItemLinkProps & { 
  readonly onboardingSteps: number;
  readonly setOnboardingSteps: Dispatch<SetStateAction<number>>;
};

const OnboardingFirstStep: FunctionComponent<OnboardingFirstStepProps> = ({
  link,
  onboardingSteps,
  pathname,
  setOnboardingSteps
}) => 
{
  const { setOnboardingResult } = useSetOnboardingResult();

  return (
    <OnboardingTutorialPopover
      opened={onboardingSteps === 1}
      popoverMenu={(
        <OnboardingTutorialStep
          currentStep={1}
          totalSteps={3}
          stepTitle="Willkommen bei Constellatio!"
          onNextPressHandler={() => setOnboardingSteps(2)}
          onSkipPressHandler={() => setOnboardingResult({ result: "skipped" })}>
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
