import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { ClockIcon } from "@/components/Icons/ClockIcon";

import { Tabs } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileLearningTimeBlockHeader.styles";
import { Switcher } from "../Switcher/Switcher";

const ProfileLearningTimeBlockHeader: FunctionComponent<{
  readonly selectedTab: number;
  readonly setSelectedTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  readonly tabs: Array<{
    icon?: { src?: React.ReactNode };
    number?: number;
    title: string;

  }>;
}> = ({ selectedTab, setSelectedTabIndex, tabs }) => 
{
  return (
    <div css={styles.blockHead}>
      <div css={styles.blockHeadText}>
        <IconButton
          icon={<ClockIcon/>}
          css={styles.blockHeadIcon}
          onClick={() => {}}
          size="big"
        />
        <div>
          <div css={styles.blockHeadDescription}>
            <CaptionText styleType="caption-01-medium" component="p">
              {/* Wöchentliche Lernzeit */}
              Heutige Lernzeit
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
          tabStyleOverwrite={{ flex: "1", whiteSpace: "nowrap" }}>
          <Tabs.List>
            {setSelectedTabIndex && tabs &&
              tabs?.map((tab, tabIndex) => (
                <React.Fragment key={tabIndex}>
                  <SwitcherTab
                    onClick={() => setSelectedTabIndex(tabIndex)}
                    value={tab.title}>
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
