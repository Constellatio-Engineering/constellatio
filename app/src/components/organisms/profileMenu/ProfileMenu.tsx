import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import ErrorPage from "@/components/errorPage/ErrorPage";
import { NoteIcon } from "@/components/Icons/Note";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";
import ProfileMenuSkeleton from "@/components/organisms/profileMenu/profileMenuSkeleton/ProfileMenuSkeleton";
import { type tabs } from "@/components/pages/profilePage/ProfilePage";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useSetOnboardingResult from "@/hooks/useSetOnboardingResult";
import useUserDetails from "@/hooks/useUserDetails";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import router from "next/router";
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
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { setOnboardingResult } = useSetOnboardingResult();
  const isBigScreen = useMediaQuery("(min-width: 1100px)");
  const { error, isLoading, userDetails } = useUserDetails();

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

  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await router.replace(paths.login);
      await invalidateEverything();

      notifications.show({
        message: "Bis bald bei Constellatio!",
        title: "Ausloggen",
      });
    }
    catch (error) 
    {
      console.error("error while signing out", error);
    }
  };

  return (
    <div css={styles.wrapper}>
      <ProfileMenuMainProfileInfo userDetails={userDetails}/>
      <ProfileMenuUniversityTab title={userDetails.university} semester={`${userDetails.semester}. Semester`}/>
      {isBigScreen && (
        <>
          <div css={styles.tabsList}>
            {tabs.map(tab => (
              <MenuListItem
                key={tab.slug}
                title={tab.title}
                selected={tab.slug === activeTabSlug}
                onClick={() => void setTab(tab.slug)}
              />
            ))}
          </div>
          <div css={styles.groupedLinks}>
            <LinkButton title="Einführung wiederholen" icon={<NoteIcon/>} onClick={() => setOnboardingResult({ result: null })}/>
            <LinkButton title="Ausloggen" onClick={handleSignOut} icon={<IconLogout/>}/>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
