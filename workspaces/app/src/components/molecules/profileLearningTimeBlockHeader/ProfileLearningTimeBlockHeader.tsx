import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { ClockIcon } from "@/components/Icons/ClockIcon";

import { Skeleton } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileLearningTimeBlockHeader.styles";

type Props = {
  readonly isPending: boolean;
  readonly todaysLearningTime: {
    hours: number;
    minutes: number;
  };
};

const ProfileLearningTimeBlockHeader: FunctionComponent<Props> = ({ isPending, todaysLearningTime }) =>
{
  return (
    <div css={styles.blockHead}>
      <div css={styles.blockHeadText}>
        <IconButton
          icon={<ClockIcon/>}
          css={styles.blockHeadIcon}
          size="big"
        />
        <div>
          <div css={styles.blockHeadDescription}>
            <CaptionText styleType="caption-01-medium" component="p">
              Heutige Lernzeit
            </CaptionText>
          </div>
          <div css={styles.blockHeadTitle}>
            {isPending ? (
              <Skeleton width={70} height={20} mt={4}/>
            ) : (
              <SubtitleText styleType="subtitle-01-medium" component="p">
                {todaysLearningTime.hours}h {todaysLearningTime.minutes}m
              </SubtitleText>
            )}
          </div>
        </div>
      </div>
      {/* {tabs?.length > 0 && (
        <div css={styles.blockHeadCallToAction}>
           <Switch
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
      )}*/}
    </div>
  );
};

export default ProfileLearningTimeBlockHeader;
