import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import { NoteIcon } from "@/components/Icons/Note";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";

import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import router from "next/router";
import { type Options } from "next-usequerystate";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileMenu.styles";
import ProfileMenuMainProfileInfo from "./ProfileMenuMainProfileInfo";

export type ITab ={
  icon?: React.ReactNode;
  selected: boolean;
  slug: string;
  title: string;
};
type IProfileMenu = {
  readonly setQuery: (value: string | ((old: string | null) => string | null) | null, options?: Options | undefined) => Promise<URLSearchParams>;
  readonly setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
  readonly tabs: ITab[];
};

const ProfileMenu: FunctionComponent<IProfileMenu> = ({ setQuery, setTabs, tabs }) => 
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
      console.log("error while signing out", error);
    }
  };

  return (
    <div css={styles.wrapper}>
      <ProfileMenuMainProfileInfo/>
      <ProfileMenuUniversityTab imgSrc={placeHolderImg} title="Humboldt University of Berlin" semester="II semester"/>
      <div css={styles.tabsList}>
        {tabs && tabs.length > 0 && tabs.map((tab: ITab, index: number) => (
          <MenuListItem
            key={index}
            title={tab.title}
            selected={tab.selected}
            icon={tab.icon}
            onClick={() => 
            {
              void setQuery(tab.slug);
              setTabs(tabs.map((x: ITab) => x.slug === tab.slug ? ({ ...x, selected: true }) : ({ ...x, selected: false })));
            }}
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
