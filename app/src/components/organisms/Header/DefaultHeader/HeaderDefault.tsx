import { UserDropdown } from "@/components/molecules/UserDropdown/UserDropdown";
import useOnboardingResult from "@/hooks/useOnboardingResult";
import { isDevelopment } from "@/utils/env";
import { paths } from "@/utils/paths";

import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FunctionComponent, useEffect } from "react";

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
const HeaderDefault: FunctionComponent = () => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1024px)");
  const { pathname } = useRouter();
  const theme = useMantineTheme();
  const { isLoading: isGetOnboardingResultLoading, onboardingResult } = useOnboardingResult();
  const showOnboarding = !isGetOnboardingResultLoading && onboardingResult === null;

  const links: IHeaderLink[] = [
    { slug: paths.dashboard, title: "Dashboard" },
    { slug: paths.cases, title: "Fälle" },
    { slug: paths.dictionary, title: "Lexikon" },
  ];

  const [onboardingStepsIndex, setOnboardingStepsIndex] = useState<number>(0);

  useEffect(() => 
  {
    if(onboardingResult == null) 
    {
      setOnboardingStepsIndex(0);
    }
  }, [onboardingResult]);
  
  return (
    <>
      <SHeader>
        <div css={styles.wrapper({ theme, variant: "default" })}>
          <div css={styles.links}>
            <Link href="/">
              <Image src={isTabletScreen ? ConstellatioLogoIcon : ConstellatioFullLogo} alt="Constellatio"/>
            </Link>
            {links.map((link, linkIndex) => 
              linkIndex === 1 ? (
                showOnboarding ? (
                  <OnboardingFirstStep
                    key={linkIndex}
                    link={link}
                    pathname={pathname}
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
            {
              showOnboarding ? (
                <OnboardingThirdStep onboardingStepsIndex={onboardingStepsIndex}/>
              ) : (
                <HeaderItemSearchBar/>
              )
            }
            {
              showOnboarding ? (
                <OnboardingSecondStep onboardingStepsIndex={onboardingStepsIndex} pathname={pathname} setOnboardingStepsIndex={setOnboardingStepsIndex}/>
              ) : (
                <HeaderItemPersonalSpace pathname={pathname}/>
              )
            }
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
