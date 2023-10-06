
import { Tabs } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import { CaptionText } from "../atoms/CaptionText/CaptionText";
import IconButton from "../atoms/iconButton/IconButton";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import { FolderIcon } from "../Icons/Folder";
import { Trash } from "../Icons/Trash";
import { Switcher } from "../molecules/Switcher/Switcher";
// import { tabs } from "../organisms/caseNavBar/CaseNavBar.styles";
import * as styles from "../profilePersonalSpaceBlock/ProfilePersonalSpaceBlock.styles";

interface ProfilePersonalSpaceBlockHeadProps
{
  readonly selectedTab: number;
  readonly setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  readonly tabs: Array<{ icon?: { src: React.ReactNode }; number: number; title: string }>;
}

const ProfilePersonalSpaceBlockHead: FunctionComponent<ProfilePersonalSpaceBlockHeadProps> = ({ selectedTab, setSelectedTab, tabs }) => 
{
  return (
    <div css={styles.blockHead}>
      <div css={styles.blockHeadText}>
        <IconButton
          icon={<FolderIcon/>}
          css={styles.blockHeadIcon}
          onClick={() => { }}
          size="big"
        />
        <div>
          <div css={styles.blockHeadDescription}><CaptionText styleType="caption-01-medium" component="p">PERSONAL SPACE</CaptionText></div>
          <div css={styles.blockHeadTitle}><SubtitleText styleType="subtitle-01-medium" component="p">{tabs[selectedTab]?.number} {tabs[selectedTab]?.title}</SubtitleText></div>
        </div>
      </div>
      <div css={styles.blockHeadCallToAction}>
        {/* <Switch */}
        <Switcher
          className="switcher"
          size="medium"
          defaultValue={tabs[selectedTab]?.title}
          tabStyleOverwrite={{ flex: "1" }}>
     
          <Tabs.List>
            {tabs && tabs?.map((tab, tabIndex) => (
              <React.Fragment key={tabIndex}>
                <SwitcherTab
                  icon={tab?.icon?.src ?? <Trash/>}
                  value={tab.title}
                  onClick={() => setSelectedTab(tabIndex)}>{tab.title}
                </SwitcherTab>
              </React.Fragment>
            ))}
          </Tabs.List>
        </Switcher>
      </div>
    </div>
  );
};

export default ProfilePersonalSpaceBlockHead;
