import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";

import { ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileNavMenuTablet.styles";
import MenuTab from "../../atoms/menuTab/MenuTab";
import { type tabs } from "../../pages/profilePage/ProfilePage";

interface IProfileNavMenuTabletProps
{
  readonly activeTabSlug?: string;
  readonly setTab: (tab: string) => Promise<URLSearchParams>;
  readonly tabs: typeof tabs;
}

const ProfileNavMenuTablet: FunctionComponent<IProfileNavMenuTabletProps> = ({ activeTabSlug, setTab, tabs }) => 
{
  return (
    <div css={styles.wrapper}>
      <ScrollArea w={"100%"} type={"never"}>
        <ContentWrapper stylesOverrides={styles.contentWrapper}>
          {tabs.map((tab, index) => (
            <MenuTab
              key={index}
              onClick={() => void setTab(tab.slug)}
              title={`${tab.title}`}
              active={activeTabSlug === tab.slug}
            />
          ))}
        </ContentWrapper>
      </ScrollArea>
    </div>
  );
};

export default ProfileNavMenuTablet;
