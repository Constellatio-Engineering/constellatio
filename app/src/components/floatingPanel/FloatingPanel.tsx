import { Tabs } from "@mantine/core";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { type DataType, generateTOC, renderTOC } from "./generateTocHelper";
// import { TOCItemComponent } from "./tocItem";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import { Trash } from "../Icons/Trash";
import { Switcher } from "../molecules/Switcher/Switcher";

type ITableTab = { icon: {src: React.ReactNode}; title: "Content" | "Facts" };   
export interface IFloatingPanelProps
{
  readonly content: DataType[];
  readonly tabs: ITableTab[];
}

const FloatingPanel: FunctionComponent<IFloatingPanelProps> = ({ content, tabs }) => 
{
  const [selectedTab, setSelectedTab] = useState<"Content" | "Facts">(tabs?.[0]?.title ?? "Content");
  const toc = generateTOC(content);
 
  return (
    <div css={styles.wrapper}>
      <Switcher className="switcher" size="medium" tabStyleOverwrite={{ flex: "1" }}>
        <Tabs.List>
          {tabs && tabs?.map((tab, tabIndex) => (
            <React.Fragment key={tabIndex}>
              <SwitcherTab icon={tab?.icon?.src ?? <Trash/>} value={tab.title} onClick={() => setSelectedTab(tab?.title)}>{tab.title}</SwitcherTab>
            </React.Fragment>
          ))}
        </Tabs.List>
      </Switcher>
      {selectedTab === "Content" && content && renderTOC(toc)}
    </div>
  );
};

export default FloatingPanel;

