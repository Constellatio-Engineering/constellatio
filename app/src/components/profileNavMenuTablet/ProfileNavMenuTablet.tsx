import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileNavMenuTablet.styles";
import MenuTab from "../atoms/menuTab/MenuTab";
import { tabs } from "../pages/profilePage/ProfilePage";

interface IProfileNavMenuTabletProps{
  readonly activeTabSlug?: string;
  readonly setTab: (tab: string) => Promise<URLSearchParams>;
  readonly tabs: typeof tabs;
}
const ProfileNavMenuTablet: FunctionComponent<IProfileNavMenuTabletProps> = ({ setTab, tabs, activeTabSlug }) => {
  // const tabs = [1,2,3]
  return (
  <div css={styles.wrapper}>
{tabs.map((tab, index) => (
        <MenuTab
          key={index}
            onClick={() => void setTab(tab.slug)}
          title={`${tab.title}`}
          active={activeTabSlug === tab.slug}
        />
      ))}
  </div>
)};

export default ProfileNavMenuTablet;
