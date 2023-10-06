import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import ProfileMenuUniversityTab from "@/components/atoms/profileMenuUniversityTab/ProfileMenuUniversityTab";
import { NoteIcon } from "@/components/Icons/Note";
import MenuListItem from "@/components/molecules/menuListItem/MenuListItem";

import { IconLogout } from "@tabler/icons-react";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileMenu.styles";
import ProfileMenuMainProfileInfo from "./ProfileMenuMainProfileInfo";

export type ITab ={
  icon?: React.ReactNode;
  selected: boolean;
  title: string;
};
type IProfileMenu = {
  readonly setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
  readonly tabs: ITab[];
};

const ProfileMenu: FunctionComponent<IProfileMenu> = ({ setTabs, tabs }) => 
{
  const placeHolderImg = "https://s3-alpha-sig.figma.com/img/6a78/feaa/1d046e0702962fc5ca99328cf4b4a2b8?Expires=1697414400&Signature=GIyeLjG6TqueeJrryvnnTVn3YHQxIyx9eygPZLKR0A0RhHVOemXY~9ufFcWnZ9whuNlsmM57QXTkmurO0~ZtTMaaoWoAncU-ZCXgaLJ2VC6SEArntutwf6-eBbMlx7KovpogLSUuFffVlNNr-n1MiBickmFewOQWhAqcIexe7EyFcDwd2-g-JKEqSj7DICypulIIL25gpCuH7VQojPgcESsHDIX7wgXaOo9EqlFzn1~Gbi1DKAcj0ep-d~hqd2WsPISgCL7oG~m7ET13ayNn8PItbg64iPba7keXZhllv2rxS15ObfF25sIY66jU3NPD7j0B6mw7tumT2gNXyRMGcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  
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
              setTabs(tabs.map((x: {selected: boolean;title: string}) => x.title === tab.title ? ({ ...x, selected: true }) : ({ ...x, selected: false })));
            }}
          />
        )
        )}
      </div>
      <div css={styles.groupedLinks}>
        <LinkButton title="View onboarding tips" icon={<NoteIcon/>}/>
        <LinkButton title="Log out" icon={<IconLogout/>}/>
      </div>
    </div>
  );
};

export default ProfileMenu;
