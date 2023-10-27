import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import { NoteIcon } from "@/components/Icons/Note";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";
import { type tabs, type UserDetails } from "@/components/pages/profilePage/ProfilePage";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
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

type IProfileMenu = UserDetails & {
  readonly activeTabSlug?: string;
  readonly setTab: (tab: string) => Promise<URLSearchParams>;
  readonly tabs: typeof tabs;
};

const ProfileMenu: FunctionComponent<IProfileMenu> = ({
  activeTabSlug,
  setTab,
  tabs,
  userDetails
}) =>
{
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);

  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await router.replace(paths.login);
      await invalidateEverything();

      notifications.show({
        message: "Come back soon!",
        title: "Signed out",
      });
    }
    catch (error) 
    {
      console.error("error while signing out", error);
    }
  };
  const isBigScreen = useMediaQuery("(min-width: 1100px)");

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
            <LinkButton title="View onboarding tips" icon={<NoteIcon/>}/>
            <LinkButton title="Log out" onClick={async () => handleSignOut()} icon={<IconLogout/>}/>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
