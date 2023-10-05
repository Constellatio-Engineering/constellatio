import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileMenu.styles";
import ProfileMenuUniversityTab from "../profileMenuUniversityTab/ProfileMenuUniversityTab";
import ProfileMenuMainProfileInfo from "./ProfileMenuMainProfileInfo";
import MenuListItem from "../menuListItem/MenuListItem";
import { LinkButton } from "../atoms/LinkButton/LinkButton";
import { IconLogout } from "@tabler/icons-react";
import { NoteIcon } from "../Icons/Note";

export type ITab ={
  title:string;
  selected:boolean;
  icon?:React.ReactNode;
}
type IProfileMenu = {
  tabs:ITab[];
  setTabs:React.Dispatch<React.SetStateAction<ITab[]>>;
}

const ProfileMenu: FunctionComponent<IProfileMenu> = ({tabs, setTabs}) => {
  const placeHolderImg = "https://s3-alpha-sig.figma.com/img/6a78/feaa/1d046e0702962fc5ca99328cf4b4a2b8?Expires=1697414400&Signature=GIyeLjG6TqueeJrryvnnTVn3YHQxIyx9eygPZLKR0A0RhHVOemXY~9ufFcWnZ9whuNlsmM57QXTkmurO0~ZtTMaaoWoAncU-ZCXgaLJ2VC6SEArntutwf6-eBbMlx7KovpogLSUuFffVlNNr-n1MiBickmFewOQWhAqcIexe7EyFcDwd2-g-JKEqSj7DICypulIIL25gpCuH7VQojPgcESsHDIX7wgXaOo9EqlFzn1~Gbi1DKAcj0ep-d~hqd2WsPISgCL7oG~m7ET13ayNn8PItbg64iPba7keXZhllv2rxS15ObfF25sIY66jU3NPD7j0B6mw7tumT2gNXyRMGcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  
  return (
    <div css={styles.wrapper}>
      <ProfileMenuMainProfileInfo/>
      <ProfileMenuUniversityTab imgSrc={placeHolderImg} title="Humboldt University of Berlin" semester="II semester" />
      <div css={styles.tabsList}>
        {tabs && tabs.length > 0 && tabs.map((tab:ITab, index:number) =>
          <MenuListItem key={index} title={tab.title} selected={tab.selected} icon={tab.icon} onClick={() => {
            setTabs(tabs.map((x:{title:string,selected:boolean}) => x.title === tab.title ? ({...x, selected: true}): ({...x, selected: false})));
          }}/>
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
