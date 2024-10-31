import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { BoxIcon } from "@/components/Icons/BoxIcon";
import { FileIcon } from "@/components/Icons/FileIcon";
import { Toc } from "@/components/organisms/floatingPanel/Toc";

import { type IGenCase_Facts } from "@constellatio/cms/generated-types";
import { Tabs } from "@mantine/core";
import { type Maybe } from "graphql/jsutils/Maybe";
import { type FunctionComponent, useMemo, useRef, useState } from "react";

import * as styles from "./FloatingPanel.styles";
import { type DataType, generateTOC } from "./generateTocHelper";
import { CaptionText } from "../../atoms/CaptionText/CaptionText";
import IconButton from "../../atoms/iconButton/IconButton";
import { SwitcherTab } from "../../atoms/Switcher-tab/SwitcherTab";
import { Trash } from "../../Icons/Trash";
import { ExclamationMark } from "../../Icons/vector";
import { Richtext } from "../../molecules/Richtext/Richtext";
import { Switcher } from "../../molecules/Switcher/Switcher";

type ITableTab = {
  icon: { src: React.ReactNode };
  title: "Gliederung" | "Sachverhalt";
};

const tabs: ITableTab[] = [
  { icon: { src: <FileIcon size={16}/> }, title: "Gliederung" },
  { icon: { src: <BoxIcon size={16}/> }, title: "Sachverhalt" },
];

export interface IFloatingPanelProps
{
  readonly content: DataType[];
  readonly facts: Maybe<IGenCase_Facts> | undefined;
  readonly hidden?: boolean;
  readonly selectedTab?: "Gliederung" | "Sachverhalt";
  readonly variant?: "dictionary" | "case";
}

const FloatingPanel: FunctionComponent<IFloatingPanelProps> = ({
  content,
  facts,
  hidden,
  selectedTab = "Gliederung",
  variant
}) => 
{
  const [selectedTabState, setSelectedTabState] = useState<"Gliederung" | "Sachverhalt">(selectedTab);
  const toc = useMemo(() => generateTOC(content), [content]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return content?.length > 0 && (
    <div css={styles.wrapper({ hidden })}>
      {hidden && (
        <div className="hidden-overlay">
          <div>
            <IconButton icon={<ExclamationMark/>} size="medium"/>
            <CaptionText styleType="caption-01-medium" component="p">Beginne mit der geführten Lösung, um das Inhaltsverzeichnis anzuzeigen.</CaptionText>
          </div>
        </div>
      )}
      <Switcher
        className="switcher"
        size="medium"
        defaultValue={selectedTabState}
        tabStyleOverwrite={{ flex: "1" }}>
        {variant === "case" && facts && !hidden && (
          <Tabs.List>
            {tabs && tabs?.map((tab, tabIndex) => (
              <React.Fragment key={tabIndex}>
                <SwitcherTab
                  icon={tab?.icon?.src ?? <Trash/>}
                  value={tab.title}
                  onClick={() => setSelectedTabState(tab?.title)}>{tab.title}
                </SwitcherTab>
              </React.Fragment>
            ))}
          </Tabs.List>
        )}
        {variant === "dictionary" && (
          <div className="card-header">
            <BodyText styleType="body-01-medium" component="p"><FileIcon/>Gliederung</BodyText>
          </div>
        )}
      </Switcher>
      <div
        style={{
          height: hidden ? 300 : "auto",
          maxHeight: hidden ? 300 : "80vh",
          overflow: "auto",
          paddingBottom: 20
        }}
        ref={scrollAreaRef}>
        {selectedTabState === "Gliederung" && content && (
          <div css={styles.tocWrapper}>
            <Toc
              tocItems={toc}
              isExpanded={true}
              scrollAreaRef={scrollAreaRef}
            />
          </div>
        )}
        {facts && facts.json && selectedTabState === "Sachverhalt" && (
          <div css={styles.facts}>
            <Richtext data={facts} richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingPanel;

