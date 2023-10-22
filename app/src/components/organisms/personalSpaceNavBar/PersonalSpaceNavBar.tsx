import MenuTab from "@/components/atoms/menuTab/MenuTab";
import { type FavoriteCategoryNavTab } from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";
import { type NonEmptyArray } from "@/utils/types";

import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceNavBar.styles";

export interface PersonalSpaceNavBarProps
{
  readonly selectedTabSlug: string;
  readonly setSelectedTabSlug: (slug: string) => Promise<URLSearchParams>;
  readonly tabs: NonEmptyArray<FavoriteCategoryNavTab>;
}

const PersonalSpaceNavBar: FunctionComponent<PersonalSpaceNavBarProps> = ({ selectedTabSlug, setSelectedTabSlug, tabs }) =>
{
  return (
    <div css={styles.wrapper}>
      {tabs.map((tab, index) => (
        <MenuTab
          key={index}
          number={tab.itemsPerTab}
          onClick={() => 
          {
            void setSelectedTabSlug(tab.slug);
          }}
          title={`${tab.title}`}
          active={selectedTabSlug === tab.slug}
        />
      ))}
    </div>
  );
};

export default PersonalSpaceNavBar;
