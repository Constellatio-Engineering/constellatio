import { Bookmark } from "@/components/Icons/Bookmark";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import type { SearchStoreProps } from "@/stores/onboarding.store";

import { type FunctionComponent } from "react";

import HeaderItemPersonalSpace, { type THeaderItemPersonalSpaceProps } from "./HeaderItemPersonalSpace";

type TOnboardingSecondStep = THeaderItemPersonalSpaceProps & {
  readonly onSkipPressHandler: () => void;
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

const OnboardingSecondStep: FunctionComponent<TOnboardingSecondStep> = ({
  onboardingStepsIndex,
  onSkipPressHandler,
  pathname,
  setOnboardingStepsIndex
}) =>
{
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
          onSkipPressHandler={onSkipPressHandler}>
          <OnboardingTutorialStepItem icon={<Bookmark size={20}/>} itemTitle="Favoriten" itemDescription="Füge Constellatio Inhalte mit nur einem Klick deinen Favoriten hinzu."/>
          <OnboardingTutorialStepItem icon={<DownloadIcon size={20}/>} itemTitle="Deine Dateien" itemDescription="Alles an einem Ort: Uploade deine vorhandenen Unterlagen in die Constellatio Jura-Cloud."/>
        </OnboardingTutorialStep>
      )}
    />
  );
};

export default OnboardingSecondStep;
