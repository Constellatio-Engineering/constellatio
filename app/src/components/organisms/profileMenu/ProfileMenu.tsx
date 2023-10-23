import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import { NoteIcon } from "@/components/Icons/Note";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";
import { type tabs } from "@/components/pages/profilePage/ProfilePage";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";

import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import router from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileMenu.styles";
import ProfileMenuMainProfileInfo from "./ProfileMenuMainProfileInfo";

/* export type ITab ={
  icon?: React.ReactNode;
  slug: string;
  title: string;
};*/

type IProfileMenu = {
  readonly activeTabSlug?: string;
  readonly setTab: (tab: string) => Promise<URLSearchParams>;
  readonly tabs: typeof tabs;
};

const ProfileMenu: FunctionComponent<IProfileMenu> = ({ activeTabSlug, setTab, tabs }) =>
{
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const placeHolderImg = "https://upload.wikimedia.org/wikipedia/commons/c/ce/Huberlin-logo.svg";

  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await router.replace("/login");
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

  return (
    <div css={styles.wrapper}>
      <ProfileMenuMainProfileInfo/>
      <ProfileMenuUniversityTab imgSrc={placeHolderImg} title="Humboldt University of Berlin" semester="II semester"/>
      <div css={styles.tabsList}>
        {tabs?.map(tab => (
          <MenuListItem
            key={tab.slug}
            title={tab.title}
            selected={tab.slug === activeTabSlug}
            onClick={() => void setTab(tab.slug)}
          />
        )
        )}
      </div>
      <div css={styles.groupedLinks}>
        <LinkButton title="View onboarding tips" icon={<NoteIcon/>}/>
        <LinkButton title="Log out" onClick={async () => handleSignOut()} icon={<IconLogout/>}/>
      </div>
    </div>
  );
};

export default ProfileMenu;
