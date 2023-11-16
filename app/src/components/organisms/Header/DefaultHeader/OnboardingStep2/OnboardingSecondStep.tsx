import { Bookmark } from "@/components/Icons/Bookmark";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";

import { type Dispatch, type FunctionComponent, type SetStateAction } from "react";

import HeaderItemPersonalSpace, { type THeaderItemPersonalSpaceProps } from "./HeaderItemPersonalSpace";

type TOnboardingSecondStep = THeaderItemPersonalSpaceProps & {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: Dispatch<SetStateAction<number>>;
};

const OnboardingSecondStep: FunctionComponent<TOnboardingSecondStep> = ({ onboardingStepsIndex, pathname, setOnboardingStepsIndex }) => 
{
  const { setOnboardingResult } = useSetOnboardingResult();

  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 1}
      popoverTarget={(
        <HeaderItemPersonalSpace pathname={pathname}/>
      )}
      popoverMenu={(
        <OnboardingTutorialStep
          currentStep={2}
          totalSteps={3}
          stepTitle="Persönlicher Bereich"
          onNextPressHandler={() => setOnboardingStepsIndex(2)}
          onSkipPressHandler={() => setOnboardingResult({ result: "skipped" })}>
          <OnboardingTutorialStepItem icon={<Bookmark size={20}/>} itemTitle="Favoriten" itemDescription="Füge Constellatio Inhalte mit nur einem Klick deinen Favoriten hinzu."/>
          <OnboardingTutorialStepItem icon={<DownloadIcon size={20}/>} itemTitle="Deine Dateien" itemDescription="Dein gesamtes Wissen an einem Ort: Lade vorhandene Unterlagen in unsere Constellatio Jura-Cloud."/>
        </OnboardingTutorialStep>
      )}
    />
  );
};

export default OnboardingSecondStep;
