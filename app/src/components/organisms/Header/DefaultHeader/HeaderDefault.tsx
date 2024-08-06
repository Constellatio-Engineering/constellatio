import NotificationsBell from "@/components/molecules/notificationsBell/NotificationsBell";
import { UserDropdown } from "@/components/molecules/UserDropdown/UserDropdown";
import HeaderItemLink from "@/components/organisms/Header/DefaultHeader/HeaderItemLink";
import { OnboardingArticlesStep } from "@/components/organisms/Header/DefaultHeader/OnboardingArticlesStep/OnboardingArticlesStep";
import { OnboardingCasesStep } from "@/components/organisms/Header/DefaultHeader/OnboardingCasesStep/OnboardingCasesStep";
import { OnboardingForumStep } from "@/components/organisms/Header/DefaultHeader/OnboardingForumStep/OnboardingForumStep";
import HeaderItemPersonalSpace from "@/components/organisms/Header/DefaultHeader/OnboardingPersonalSpaceStep/HeaderItemPersonalSpace";
import { OnboardingPersonalSpaceStep } from "@/components/organisms/Header/DefaultHeader/OnboardingPersonalSpaceStep/OnboardingPersonalSpaceStep";
import HeaderItemSearchBar from "@/components/organisms/Header/DefaultHeader/OnboardingSearchStep/HeaderItemSearchBar";
import { OnboardingSearchStep } from "@/components/organisms/Header/DefaultHeader/OnboardingSearchStep/OnboardingSearchStep";
import OnboardingModal from "@/components/organisms/onboardingModal/OnboardingModal";
import useOnboardingResult from "@/hooks/useOnboardingResult";
import { useWasOnboardingPostponed } from "@/hooks/useWasOnboardingPostponed";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { appPaths } from "@/utils/paths";

import { useMantineTheme } from "@mantine/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent, useEffect } from "react";

import ConstellatioFullLogoAlphaVersion from "../../../../../public/images/icons/constellatio-full-logo-alpha-version.svg";
// import ConstellatioFullLogo from "../../../../../public/images/icons/constellatio-full-logo.svg";
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
              <Image css={styles.headerLogo} src={ConstellatioFullLogoAlphaVersion} alt="Constellatio"/>
            </Link>
            {links.map((link, linkIndex) =>
            {
              if(!showOnboarding)
              {
                return <HeaderItemLink link={link} pathname={pathname} key={linkIndex}/>;
              }

              if(linkIndex === 1)
              {
                return (
                  <OnboardingCasesStep
                    key={linkIndex}
                    link={link}
                    pathname={pathname}
                    onSkipPressHandler={skipOnboarding}
                    onboardingStepsIndex={onboardingStepsIndex}
                    setOnboardingStepsIndex={setOnboardingStepsIndex}
                  />
                );
              }

              if(linkIndex === 2)
              {
                return (
                  <OnboardingArticlesStep
                    key={linkIndex}
                    link={link}
                    pathname={pathname}
                    onSkipPressHandler={skipOnboarding}
                    onboardingStepsIndex={onboardingStepsIndex}
                    setOnboardingStepsIndex={setOnboardingStepsIndex}
                  />
                );
              }

              if(linkIndex === 3)
              {
                return (
                  <OnboardingForumStep
                    key={linkIndex}
                    link={link}
                    pathname={pathname}
                    onSkipPressHandler={skipOnboarding}
                    onboardingStepsIndex={onboardingStepsIndex}
                    setOnboardingStepsIndex={setOnboardingStepsIndex}
                  />
                );
              }

              return <HeaderItemLink link={link} pathname={pathname} key={linkIndex}/>;
            })}
          </div>
          <div css={styles.profileArea}>
            {showOnboarding ? (
              <OnboardingSearchStep onboardingStepsIndex={onboardingStepsIndex} setOnboardingStepsIndex={setOnboardingStepsIndex}/>
            ) : (
              <HeaderItemSearchBar/>
            )}
            {showOnboarding ? (
              <OnboardingPersonalSpaceStep
                onboardingStepsIndex={onboardingStepsIndex}
                pathname={pathname}
                onSkipPressHandler={skipOnboarding}
                setOnboardingStepsIndex={setOnboardingStepsIndex}
              />
            ) : (
              <HeaderItemPersonalSpace pathname={pathname}/>
            )}
            <span className="vertical-line">s</span>
            <NotificationsBell/>
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
