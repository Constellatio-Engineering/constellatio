import { type IGenTextElement_RichTextContent } from "@/services/graphql/__generated/sdk";

// import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { Tabs } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { type DataType, generateTOC, renderTOC } from "./generateTocHelper";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import { Trash } from "../Icons/Trash";
import { Richtext } from "../molecules/Richtext/Richtext";
import { Switcher } from "../molecules/Switcher/Switcher";

type ITableTab = { icon: {src: React.ReactNode}; title: "Content" | "Facts" };   
export interface IFloatingPanelProps
{
  readonly content: DataType[];
  readonly facts: Maybe<IGenTextElement_RichTextContent> | undefined;
  readonly tabs: ITableTab[];
}

const FloatingPanel: FunctionComponent<IFloatingPanelProps> = ({ content, facts, tabs }) => 
{
  
  const [selectedTab, setSelectedTab] = useState<"Content" | "Facts">(tabs?.[0]?.title ?? "Content");
  const toc = generateTOC(content);
 
  return content ? (
    <div css={styles.wrapper}>
      <Switcher
        className="switcher"
        size="medium"
        defaultValue={selectedTab}
        tabStyleOverwrite={{ flex: "1" }}>
        <Tabs.List>
          {tabs && tabs?.map((tab, tabIndex) => (
            <React.Fragment key={tabIndex}>
              <SwitcherTab
                // defaultChecked={tab?.title === selectedTab}
                icon={tab?.icon?.src ?? <Trash/>}
                value={tab.title}
                onClick={() => setSelectedTab(tab?.title)}>{tab.title}
              </SwitcherTab>
            </React.Fragment>
          ))}
        </Tabs.List>
      </Switcher>
      {selectedTab === "Content" && content && renderTOC(toc)}
      {facts && facts.json && selectedTab === "Facts" && facts && (
        <div css={styles.facts}>
          <Richtext richTextContent={facts}/>
        </div>
      )}
    </div>
  ) : "";
};

export default FloatingPanel;

