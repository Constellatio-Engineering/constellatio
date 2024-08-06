import { Header } from "@/components/organisms/Header/Header";
import useOnboardingResult from "@/hooks/useOnboardingResult";
import { useOnboardingStore } from "@/stores/onboarding.store";

import { type FunctionComponent, type ReactElement } from "react";

import * as styles from "./Layout.styles";
import { Footer } from "../organisms/Footer/Footer";

export const Layout: FunctionComponent<ReactElement> = (page) =>
{
  const { data: onboardingResult, isPending: isGetOnboardingResultLoading } = useOnboardingResult();
  const showOnboarding = !isGetOnboardingResultLoading && onboardingResult === null;
  const onboardingStepsIndex = useOnboardingStore(s => s.onboardingStepsIndex);

  return (
    <div css={styles.wrapper}>
      <Header variant="default"/>
      <main css={styles.main}>
        {(showOnboarding && onboardingStepsIndex !== 5) && <div css={styles.onboardingOverlay}/>}
        {page}
      </main>
      <Footer/>
    </div>
  );
};
