import { UserDropdown } from "@/components/molecules/UserDropdown/UserDropdown";
import OnboardingModal from "@/components/organisms/onboardingModal/OnboardingModal";
import useOnboardingResult from "@/hooks/useOnboardingResult";
import { useWasOnboardingPostponed } from "@/hooks/useWasOnboardingPostponed";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { isDevelopment } from "@/utils/env";
import { appPaths } from "@/utils/paths";

import { useMantineTheme } from "@mantine/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent, useEffect } from "react";

import HeaderDefaultRecreateSearch from "./HeaderDefaultRecreateSearch";
import HeaderItemLink from "./OnboardingStep1/HeaderItemLink";
import OnboardingFirstStep from "./OnboardingStep1/OnboardingFirstStep";
import HeaderItemPersonalSpace from "./OnboardingStep2/HeaderItemPersonalSpace";
import OnboardingSecondStep from "./OnboardingStep2/OnboardingSecondStep";
import HeaderItemSearchBar from "./OnboardingStep3/HeaderItemSearchBar";
import OnboardingThirdStep from "./OnboardingStep3/OnboardingThirdStep";
import ConstellatioFullLogo from "../../../../../public/images/icons/constellatio-full-logo.svg";
import ConstellatioLogoIcon from "../../../../../public/images/icons/constellatio-icon.svg";
import SearchOverlay from "../../searchOverlay/SearchOverlay";
import { SHeader } from "../Header.styles";
import * as styles from "../Header.styles";

interface IHeaderLink 
{
  slug: string;
  title: string;
}

const links: IHeaderLink[] = [
  { slug: appPaths.dashboard, title: "Dashboard" },
  { slug: appPaths.cases, title: "Fälle" },
  { slug: appPaths.dictionary, title: "Lexikon" },
  { slug: appPaths.forum, title: "Forum" },
];

const HeaderDefault: FunctionComponent = () => 
{
  const { pathname } = useRouter();
  const theme = useMantineTheme();
  const { data: onboardingResult, isPending: isGetOnboardingResultLoading } = useOnboardingResult();
  const [onboardingPostponedState, setWasOnboardingPostponed] = useWasOnboardingPostponed();
  const skipOnboarding = (): void => setWasOnboardingPostponed({
    dateOfPostponement: new Date(),
    wasOnboardingPostponed: true
  });
  const showOnboarding = !isGetOnboardingResultLoading && onboardingResult === null && !onboardingPostponedState.wasOnboardingPostponed;
  const onboardingStepsIndex = useOnboardingStore(s => s.onboardingStepsIndex);
  const setOnboardingStepsIndex = useOnboardingStore(s => s.setOnboardingStepsIndex);

  useEffect(() =>
  {
    const { setOnboardingStepsIndex } = useOnboardingStore.getState();

    if(onboardingResult == null) 
    {
      setOnboardingStepsIndex(0);
    }
  }, [onboardingResult]);
  
  return (
    <>
      <OnboardingModal
        onboardingStepsIndex={onboardingStepsIndex}
        setOnboardingStepsIndex={setOnboardingStepsIndex}
      />
      <SHeader withShadow>
        <div css={styles.wrapper({ theme, variant: "default" })}>
          <div css={styles.links}>
            <Link href={appPaths.dashboard}>
              <Image css={styles.tabletHeaderLogo} src={ConstellatioLogoIcon} alt="Constellatio"/>
              <Image css={styles.headerLogo} src={ConstellatioFullLogo} alt="Constellatio"/>
            </Link>
            {links.map((link, linkIndex) =>
              linkIndex === 1 ? (
                showOnboarding ? (
                  <OnboardingFirstStep
                    key={linkIndex}
                    link={link}
                    pathname={pathname}
                    onSkipPressHandler={skipOnboarding}
                    onboardingStepsIndex={onboardingStepsIndex}
                    setOnboardingStepsIndex={setOnboardingStepsIndex}
                  />
                ) : (
                  <HeaderItemLink link={link} pathname={pathname} key={linkIndex}/>
                ) 
              ) : (
                <HeaderItemLink link={link} pathname={pathname} key={linkIndex}/>
              )
            )}
          </div>
          <div css={styles.profileArea}>
            {isDevelopment && <HeaderDefaultRecreateSearch/>}
            {showOnboarding ? (
              <OnboardingThirdStep onboardingStepsIndex={onboardingStepsIndex} setOnboardingStepsIndex={setOnboardingStepsIndex}/>
            ) : (
              <HeaderItemSearchBar/>
            )}
            {showOnboarding ? (
              <OnboardingSecondStep
                onboardingStepsIndex={onboardingStepsIndex}
                pathname={pathname}
                onSkipPressHandler={skipOnboarding}
                setOnboardingStepsIndex={setOnboardingStepsIndex}
              />
            ) : (
              <HeaderItemPersonalSpace pathname={pathname}/>
            )}
            <span className="vertical-line">s</span>
            <div>
              <UserDropdown/>
            </div>
          </div>
        </div>
      </SHeader>
      <SearchOverlay/>
    </>
  );
  
};

export default HeaderDefault;
