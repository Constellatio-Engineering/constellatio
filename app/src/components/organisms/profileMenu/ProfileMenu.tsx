import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import { NoteIcon } from "@/components/Icons/Note";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";
import ProfileMenuSkeleton from "@/components/organisms/profileMenu/profileMenuSkeleton/ProfileMenuSkeleton";
import ErrorPage from "@/components/pages/errorPage/ErrorPage";
import { type tabs } from "@/components/pages/profilePage/ProfilePage";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";
import { useSignout } from "@/hooks/useSignout";
import useSubscription from "@/hooks/useSubscription";
import useUserDetails from "@/hooks/useUserDetails";
import { useWasOnboardingPostponed } from "@/hooks/useWasOnboardingPostponed";
import { useOnboardingStore } from "@/stores/onboarding.store";

import { IconLogout } from "@tabler/icons-react";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileMenu.styles";
import ProfileMenuMainProfileInfo from "./ProfileMenuMainProfileInfo";

type IProfileMenu = {
  readonly activeTabSlug?: string;
  readonly setTab: (tab: string) => Promise<URLSearchParams>;
  readonly tabs: typeof tabs;
};

const ProfileMenu: FunctionComponent<IProfileMenu> = ({ activeTabSlug, setTab, tabs }) =>
{
  const { handleSignOut } = useSignout();
  const { setOnboardingResult } = useSetOnboardingResult();
  const { error, isLoading, userDetails } = useUserDetails();
  const { isOnPaidSubscription, isOnTrailSubscription } = useSubscription();
  const [, setWasOnboardingPostponed] = useWasOnboardingPostponed();
  const setOnboardingStepsIndex = useOnboardingStore(s => s.setOnboardingStepsIndex);

  if(isLoading)
  {
    return <ProfileMenuSkeleton/>;
  }

  if(error)
  {
    return (
      <ErrorPage error={error.message}/>
    );
  }

  if(!userDetails)
  {
    return (
      <ErrorPage error="User Details not found"/>
    );
  }

  return (
    <div css={styles.wrapper}>
      <ProfileMenuMainProfileInfo userDetails={userDetails}/>
      <ProfileMenuUniversityTab university={userDetails.university} semester={userDetails.semester}/>
      <div css={styles.tabsListWrapper}>
        <div css={styles.tabsList}>
          {tabs.map(tab => (
            <MenuListItem
              key={tab.slug}
              title={tab.title}
              selected={tab.slug === activeTabSlug}
              onClick={() =>
              {
                if(isOnTrailSubscription || isOnPaidSubscription)
                {
                  void setTab(tab.slug);
                }
              }}
            />
          ))}
        </div>
        <div css={styles.groupedLinks}>
          <LinkButton
            title="Einführung wiederholen"
            icon={<NoteIcon/>}
            onClick={async () =>
            {
              setOnboardingStepsIndex(0);
              setWasOnboardingPostponed({ wasOnboardingPostponed: false });
              await setOnboardingResult({ result: null });
            }}
          />
          <LinkButton title="Ausloggen" onClick={handleSignOut} icon={<IconLogout/>}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
