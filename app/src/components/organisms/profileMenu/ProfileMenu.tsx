import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";
import { supabase } from "@/lib/supabase";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import router from "next/router";
import { useQueryState } from "next-usequerystate";
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
  readonly setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
  readonly tabs: ITab[];
};

const ProfileMenu: FunctionComponent<IProfileMenu> = ({ setTabs, tabs }) => 
{
  const placeHolderImg = "https://s3-alpha-sig.figma.com/img/6a78/feaa/1d046e0702962fc5ca99328cf4b4a2b8?Expires=1697414400&Signature=GIyeLjG6TqueeJrryvnnTVn3YHQxIyx9eygPZLKR0A0RhHVOemXY~9ufFcWnZ9whuNlsmM57QXTkmurO0~ZtTMaaoWoAncU-ZCXgaLJ2VC6SEArntutwf6-eBbMlx7KovpogLSUuFffVlNNr-n1MiBickmFewOQWhAqcIexe7EyFcDwd2-g-JKEqSj7DICypulIIL25gpCuH7VQojPgcESsHDIX7wgXaOo9EqlFzn1~Gbi1DKAcj0ep-d~hqd2WsPISgCL7oG~m7ET13ayNn8PItbg64iPba7keXZhllv2rxS15ObfF25sIY66jU3NPD7j0B6mw7tumT2gNXyRMGcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const apiContext = api.useContext();
  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await router.replace("/login");
      await apiContext.invalidate();

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

  const [, setQuery] = useQueryState("q");
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
              // void router.replace({ query: { q: tab.slug } });
              void setQuery(tab.slug);
              setTabs(tabs.map((x: ITab) => x.slug === tab.slug ? ({ ...x, selected: true }) : ({ ...x, selected: false })));
            }}
          />
        )
        )}
      </div>
      <div css={styles.groupedLinks}>
        {/* <LinkButton title="View onboarding tips" icon={<NoteIcon/>}/> */}
        <LinkButton title="Log out" onClick={async () => handleSignOut()} icon={<IconLogout/>}/>
      </div>
    </div>
  );
};

export default ProfileMenu;
