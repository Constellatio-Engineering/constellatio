import { Bookmark } from "@/components/Icons/Bookmark";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import OnboardingTutorialPopover from "@/components/organisms/onboardingTutorialPopover/OnboardingTutorialPopover";
import type { SearchStoreProps } from "@/stores/onboarding.store";

import { type FunctionComponent } from "react";

import HeaderItemPersonalSpace, { type THeaderItemPersonalSpaceProps } from "./HeaderItemPersonalSpace";

type TOnboardingPersonalSpaceStep = THeaderItemPersonalSpaceProps & {
  readonly onboardingStepsIndex: number;
  readonly setOnboardingStepsIndex: SearchStoreProps["setOnboardingStepsIndex"];
};

export const OnboardingPersonalSpaceStep: FunctionComponent<TOnboardingPersonalSpaceStep> = ({
  onboardingStepsIndex,
  pathname,
  setOnboardingStepsIndex
}) =>
{
  return (
    <OnboardingTutorialPopover
      opened={onboardingStepsIndex === 3}
      popoverTarget={(
        <HeaderItemPersonalSpace pathname={pathname}/>
      )}
      popoverMenu={(
        <OnboardingTutorialStep
          currentStep={4}
          totalSteps={4}
          stepTitle="Alles an einem Ort"
          onNextPressHandler={() => setOnboardingStepsIndex(4)}>
          <OnboardingTutorialStepItem
            icon={<Bookmark size={20}/>}
            itemTitle="Favoriten"
            itemDescription="Füge Constellatio-Inhalte mit nur einem Klick deinen Favoriten hinzu"
          />
          <OnboardingTutorialStepItem
            icon={<DownloadIcon size={20}/>}
            itemTitle="Deine Dateien"
            itemDescription="Uploade deine vorhandenen Unterlagen in die Constellatio Jura-Cloud"
          />
        </OnboardingTutorialStep>
      )}
    />
  );
};
