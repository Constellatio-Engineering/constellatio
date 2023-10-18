import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileLearningTimeBlockHeader.styles";
import { Tabs } from "@mantine/core";
import { FolderIcon } from "../Icons/Folder";
import { Trash } from "../Icons/Trash";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import IconButton from "../atoms/iconButton/IconButton";
import { Switcher } from "../molecules/Switcher/Switcher";
import { tabs } from "../organisms/caseNavBar/CaseNavBar.styles";
import { ClockIcon } from "../Icons/ClockIcon";

const ProfileLearningTimeBlockHeader: FunctionComponent<{
  tabs: Array<{
    icon?: { src?: React.ReactNode };
    number?: number;
    title: string;
  }>;
  selectedTab: number;
}> = ({ tabs, selectedTab }) => {
  return (
    <div css={styles.blockHead}>
      <div css={styles.blockHeadText}>
        <IconButton
          icon={<ClockIcon />}
          css={styles.blockHeadIcon}
          onClick={() => {}}
          size="big"
        />
        <div>
          <div css={styles.blockHeadDescription}>
            <CaptionText styleType="caption-01-medium" component="p">
           YEAR'S AVERAGE LEARNING TIME
            </CaptionText>
          </div>
          <div css={styles.blockHeadTitle}>
            <SubtitleText styleType="subtitle-01-medium" component="p">
             ~~time~~
            </SubtitleText>
          </div>
        </div>
      </div>
      <div css={styles.blockHeadCallToAction}>
        {/* <Switch */}
        <Switcher
          className="switcher"
          size="medium"
          defaultValue={tabs[selectedTab]?.title}
          tabStyleOverwrite={{ flex: "1", whiteSpace: "nowrap" }}
        >
          <Tabs.List>
            {tabs &&
              tabs?.map((tab, tabIndex) => (
                <React.Fragment key={tabIndex}>
                  <SwitcherTab
                    value={tab.title}
                    // icon={tab?.icon?.src ?? <Trash/>}
                    // onClick={() => setSelectedTab(tabIndex)}
                  >
                    {tab.title}
                  </SwitcherTab>
                </React.Fragment>
              ))}
          </Tabs.List>
        </Switcher>
      </div>
    </div>
  );
};

export default ProfileLearningTimeBlockHeader;
