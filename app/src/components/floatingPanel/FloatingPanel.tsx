import { Tabs } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import { Switcher } from "../molecules/Switcher/Switcher";

type ITableTabs = { icon: {src: React.ReactNode}; title: string }[];   
export interface IFloatingPanelProps
{
  readonly content: string;
  readonly tabs: ITableTabs;
}

const FloatingPanel: FunctionComponent<IFloatingPanelProps> = ({ content, tabs }) => 
{
  return (
    <div css={styles.wrapper}>
      <Switcher size="medium" tabStyleOverwrite={{ flex: "1" }}>
        <Tabs.List>
          {tabs && tabs?.map((tab, tabIndex) => (
            <React.Fragment key={tabIndex}>
              <SwitcherTab icon={tab?.icon?.src} value={tab.title}>{tab.title}</SwitcherTab>
            </React.Fragment>
          ))}
        </Tabs.List>
      </Switcher>
      {content}
    </div>
  );
};

export default FloatingPanel;
