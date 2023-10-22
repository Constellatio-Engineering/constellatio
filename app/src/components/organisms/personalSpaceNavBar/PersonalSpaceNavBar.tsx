import MenuTab from "@/components/atoms/menuTab/MenuTab";
import { type FavoriteCategoryNavTab } from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";

import { useQueryState } from "next-usequerystate";
import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceNavBar.styles";

export interface PersonalSpaceNavBarProps
{
  readonly selectedTabId: string;
  readonly setSelectedTabId: React.Dispatch<React.SetStateAction<string>>;
  readonly tabs: FavoriteCategoryNavTab[];
}

const PersonalSpaceNavBar: FunctionComponent<PersonalSpaceNavBarProps> = ({ selectedTabId, setSelectedTabId, tabs }) => 
{
  const [, setFavoriteTabQuery] = useQueryState("tab");

  return (
    <div css={styles.wrapper}>
      {tabs && tabs.map((tab, index) => (
        <MenuTab
          key={index}
          number={tab.itemsPerTab}
          onClick={() => 
          {
            void setFavoriteTabQuery(tab.slug);
            setSelectedTabId(tab.id);
          }}
          title={`${tab.title}`}
          active={selectedTabId === tab.id}
        />
      ))}
    </div>
  );
};

export default PersonalSpaceNavBar;
