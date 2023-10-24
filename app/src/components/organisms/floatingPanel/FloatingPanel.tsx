import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { BoxIcon } from "@/components/Icons/BoxIcon";
import { FileIcon } from "@/components/Icons/FileIcon";
import { type IGenCase_Facts } from "@/services/graphql/__generated/sdk";

import { ScrollArea, Tabs, useMantineTheme } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { type Maybe } from "@trpc/server";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";
import { type DataType, generateTOC, renderTOC } from "./generateTocHelper";
import { CaptionText } from "../../atoms/CaptionText/CaptionText";
import IconButton from "../../atoms/iconButton/IconButton";
import { SwitcherTab } from "../../atoms/Switcher-tab/SwitcherTab";
import { Trash } from "../../Icons/Trash";
import { ExclamationMark } from "../../Icons/vector";
import { Richtext } from "../../molecules/Richtext/Richtext";
import { Switcher } from "../../molecules/Switcher/Switcher";

type ITableTab = { icon: {src: React.ReactNode}; title: "Content" | "Facts" };   
export interface IFloatingPanelProps
{
  readonly content: DataType[];
  readonly facts: Maybe<IGenCase_Facts> | undefined;
  readonly hidden?: boolean;
  readonly variant?: "dictionary" | "case";
}

const FloatingPanel: FunctionComponent<IFloatingPanelProps> = ({
  content,
  facts,
  hidden,
  variant
}) => 
{
  const tabs: ITableTab[] = [
    { icon: { src: <FileIcon size={16}/> }, title: "Content" },
    { icon: { src: <BoxIcon size={16}/> }, title: "Facts" },
  ];
  const { scrollableRef } = useScrollIntoView<
  HTMLDivElement,
  HTMLDivElement
  >({ axis: "x" });
  const [selectedTab, setSelectedTab] = useState<"Content" | "Facts">(tabs?.[0]?.title ?? "Content");
  const toc = generateTOC(content);
  const theme = useMantineTheme();

  return content?.length > 0 ? (
    <ScrollArea
      ref={scrollableRef}
      h={hidden ? 300 : 600}
      styles={() => ({ scrollbar: { zIndex: 1 } })}
      sx={{ borderRadius: "12px" }}>
      <div css={styles.wrapper({ hidden, theme })}>
        {hidden && (
          <div className="hidden-overlay">
            <div>
              <IconButton icon={<ExclamationMark/>} size="medium"/>
              <CaptionText styleType="caption-01-medium" component="p">To open the next chapter, please complete the tests
                in the previous chapter.
              </CaptionText>
            </div>
          </div>
        )}
        <Switcher
          className="switcher"
          size="medium"
          defaultValue={selectedTab}
          tabStyleOverwrite={{ flex: "1" }}>
          {variant === "case" && facts && !hidden && (
            <Tabs.List>
              {tabs && tabs?.map((tab, tabIndex) => (
                <React.Fragment key={tabIndex}>
                  <SwitcherTab
                    icon={tab?.icon?.src ?? <Trash/>}
                    value={tab.title}
                    onClick={() => setSelectedTab(tab?.title)}>{tab.title}
                  </SwitcherTab>
                </React.Fragment>
              ))}
            </Tabs.List>
          )}
          {variant === "dictionary" && (
            <div className="card-header">
              <BodyText styleType="body-01-medium" component="p"><FileIcon/>Content</BodyText>
            </div>
          )}
        </Switcher>
        {selectedTab === "Content" && content && renderTOC(toc)}
        {facts && facts.json && selectedTab === "Facts" && facts && (
          <div css={styles.facts}>
            <Richtext data={facts} richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}/>
          </div>
        )}
      </div>
  
    </ScrollArea>
  ) : "";
};

export default FloatingPanel;

