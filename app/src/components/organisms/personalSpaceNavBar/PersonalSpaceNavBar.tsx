
import MenuTab from "@/components/atoms/menuTab/MenuTab";

import { useQueryState } from "next-usequerystate";
import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceNavBar.styles";
import { slugFormatter } from "../OverviewHeader/OverviewHeader";

interface INavTab 
{
  id: string;
  itemsPerTab: number;
  title: string;
}

export interface PersonalSpaceNavBarProps
{
  readonly selectedTabId: string;
  readonly setSelectedTabId: React.Dispatch<React.SetStateAction<string>>;
  readonly tabs: INavTab[];
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
            void setFavoriteTabQuery(slugFormatter(tab.title));  
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
