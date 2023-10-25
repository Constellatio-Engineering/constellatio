/* eslint-disable max-lines */
import MenuTab from "@/components/atoms/menuTab/MenuTab";
import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkBook } from "@/components/Icons/BookmarkBook";
import { CasesIcon } from "@/components/Icons/CasesIcon";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Search } from "@/components/Icons/Search";
import OnboardingTutorialStep from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStep";
import OnboardingTutorialStepItem from "@/components/molecules/onboardingTutorialStep/OnboardingTutorialStepItem";
import SearchField from "@/components/molecules/searchField/SearchField";
import { UserDropdown } from "@/components/molecules/UserDropdown/UserDropdown";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useOnboardingResult from "@/hooks/useOnboardingResult";
import useSearchResults from "@/hooks/useSearchResults";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useSearchBarStore from "@/stores/searchBar.store";
import { api } from "@/utils/api";
import { isDevelopment } from "@/utils/env";
import { paths } from "@/utils/paths";

import { useMantineTheme } from "@mantine/styles";
import { IconFolder } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FunctionComponent } from "react";

import HeaderDefaultLinkItem from "./HeaderDefaultLinkItem";
import HeaderDefaultRecreateSearch from "./HeaderDefaultRecreateSearch";
import ConstellatioFullLogo from "../../../../../public/images/icons/constellatio-full-logo.svg";
import OnboardingTutorialPopover from "../../onboardingTutorialPopover/OnboardingTutorialPopover";
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
  const { invalidateOnboardingResult } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const links: IHeaderLink[] = [
    { slug: paths.dashboard, title: "Dashboard" },
    { slug: paths.cases, title: "Fälle" },
    { slug: paths.dictionary, title: "Lexikon" },
  ];
  const { refetch: refetchSearchResults } = useSearchResults();
  const { pathname } = useRouter();
  const theme = useMantineTheme();
  const { isLoading: isGetOnboardingResultLoading, onboardingResult } = useOnboardingResult();
  const showOnboarding = !isGetOnboardingResultLoading && onboardingResult === null;
  const openDrawer = useSearchBarStore((s) => s.openDrawer);

  const { mutate: setOnboardingResult } = api.users.setOnboardingResult.useMutation({
    onError: (error) => console.error("Error while setting onboarding result", error),
    onSuccess: async () => invalidateOnboardingResult()
  });

  const [onboardingSteps, setOnboardingSteps] = useState<Array<{ opened: boolean; step: number }>>([
    { opened: true, step: 1 },
    { opened: false, step: 2 },
    { opened: false, step: 3 },
  ]);
  
  return (
    <>
      <SHeader>
        <div css={styles.wrapper({ theme, variant: "default" })}>
          <div css={styles.links}>
            <Link href="/">
              <Image src={ConstellatioFullLogo} alt="Constellatio"/>
            </Link>
            {links.map((link, linkIndex) =>
              linkIndex === 0 ? (
                showOnboarding ? (
                  <OnboardingTutorialPopover
                    key={linkIndex}
                    opened={onboardingSteps[0]!.opened}
                    popoverOnchange={(opened) => setOnboardingSteps([{ opened, step: 1 }, { opened: false, step: 2 }, { opened: false, step: 3 }])}
                    popoverMenu={(
                      <OnboardingTutorialStep
                        currentStep={1}
                        totalSteps={3}
                        stepTitle="Welcome to Constellatio!"
                        onNextPressHandler={() => setOnboardingSteps([{ opened: false, step: 1 }, { opened: true, step: 2 }, { opened: false, step: 3 }])}
                        onSkipPressHandler={() => setOnboardingResult({ result: "skipped" })}>
                        <OnboardingTutorialStepItem icon={<CasesIcon size={20}/>} itemTitle="Cases" itemDescription="Interactive games and guided solutions"/>
                        <OnboardingTutorialStepItem icon={<BookmarkBook size={20}/>} itemTitle="Dictionary" itemDescription="Detailed explanations for in-depth understanding"/>
                      </OnboardingTutorialStep>
                    )}
                    popoverTarget={(
                      <HeaderDefaultLinkItem link={link} pathname={pathname}/>
                    )}
                  />
                ) : (
                  <HeaderDefaultLinkItem link={link} pathname={pathname} key={linkIndex}/>
                ) 
              ) : (
                <HeaderDefaultLinkItem link={link} pathname={pathname} key={linkIndex}/>
              )
            )}
          </div>
          <div css={styles.profileArea}>
            {isDevelopment && <HeaderDefaultRecreateSearch/>}
            {
              showOnboarding ? (
                <OnboardingTutorialPopover
                  opened={onboardingSteps[2]!.opened}
                  popoverOnchange={(opened) => setOnboardingSteps([{ opened: false, step: 1 }, { opened: false, step: 2 }, { opened, step: 3 }])}
                  popoverMenu={(
                    <OnboardingTutorialStep
                      isLastStep
                      currentStep={3}
                      totalSteps={3}
                      stepTitle="Search"
                      onNextPressHandler={() => setOnboardingResult({ result: "completed" })}>
                      <OnboardingTutorialStepItem icon={<Search size={20}/>} itemTitle="Vast search" itemDescription="Save your time and search for everything at the speed of light"/>
                    </OnboardingTutorialStep>
                  )}
                  popoverTarget={(
                    <div className="search-input">
                      <SearchField
                        size="small"
                        onClick={() => openDrawer(refetchSearchResults)}
                      />
                    </div>
                  )}
                />
              ) : (
                <div className="search-input">
                  <SearchField
                    size="small"
                    onClick={() => openDrawer(refetchSearchResults)}
                  />
                </div>
              )
            }
            {
              showOnboarding ? (
                <OnboardingTutorialPopover
                  opened={onboardingSteps[1]!.opened}
                  popoverOnchange={(opened) => setOnboardingSteps([{ opened: false, step: 1 }, { opened, step: 2 }, { opened: false, step: 3 }])}
                  popoverTarget={(
                    <Link href={`${paths.personalSpace}`}>
                      <MenuTab
                        title="Personal Space"
                        icon={<IconFolder size={20}/>}
                        active={pathname?.toLowerCase().includes("personal-space")}
                      />
                    </Link>
                  )}
                  popoverMenu={(
                    <OnboardingTutorialStep
                      currentStep={2}
                      totalSteps={3}
                      stepTitle="Personal space"
                      onNextPressHandler={() => setOnboardingSteps([{ opened: false, step: 1 }, { opened: false, step: 2 }, { opened: true, step: 3 }])}
                      onSkipPressHandler={() => setOnboardingResult({ result: "skipped" })}>
                      <OnboardingTutorialStepItem icon={<Bookmark size={20}/>} itemTitle="Favourites" itemDescription="Save cases, dictionary articles, highlighted text and forum questions"/>
                      <OnboardingTutorialStepItem icon={<DownloadIcon size={20}/>} itemTitle="Your materials" itemDescription="Upload files to keep everything in one place"/>
                    </OnboardingTutorialStep>
                  )}
                />
              ) : (
                <Link href={`${paths.personalSpace}`}>
                  <MenuTab
                    title="Personal Space"
                    icon={<IconFolder size={20}/>}
                    active={pathname?.toLowerCase().includes("personal-space")}
                  />
                </Link>
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
