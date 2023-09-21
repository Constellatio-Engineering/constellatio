
import MenuTab from "@/components/atoms/menuTab/MenuTab";

import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceNavBar.styles";

interface INavTab 
{
  id: string;
  itemsPerTab: number;
  title: string;
}

interface PersonalSpaceNavBarProps
{
  readonly selectedTabId: string;
  readonly setSelectedTabId: React.Dispatch<React.SetStateAction<string>>;
  readonly tabs: INavTab[];
}

const PersonalSpaceNavBar: FunctionComponent<PersonalSpaceNavBarProps> = ({ selectedTabId, setSelectedTabId, tabs }) => 
{
  return (
    <div css={styles.wrapper}>
      {tabs && tabs.map((tab, index) => (
        <MenuTab
          key={index}
          number={tab.itemsPerTab}
          onClick={() => setSelectedTabId(tab.id)}
          title={`${tab.title}`}
          active={selectedTabId === tab.id}
        />
      ))}
    </div>
  );
};

export default PersonalSpaceNavBar;
