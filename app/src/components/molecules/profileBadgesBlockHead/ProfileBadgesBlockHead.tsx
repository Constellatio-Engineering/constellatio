import { Button } from "@/components/atoms/Button/Button";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { MedalIcon } from "@/components/Icons/MedalIcon";
import useBadges from "@/hooks/useBadges";
import useDashboardPageStore from "@/stores/dashboardPage.store";

import React, { type FunctionComponent } from "react";

import * as styles from "./../../organisms/profileBadgesBlock/ProfileBadgesBlock.styles";

const ProfileBadgesBlockHead: FunctionComponent = () =>
{
  const { getBadgesResult: { completedCount, totalCount } } = useBadges();

  const setIsBadgesDrawerOpened = useDashboardPageStore(s => s.setIsBadgesDrawerOpened);

  return (
    <div css={styles.badgesBlockHeader}>
      <IconButton icon={<MedalIcon/>} size="big"/>
      <div css={styles.headerLayout}>
        <div>
          <CaptionText css={styles.title} styleType="caption-01-medium" component="p">Badges</CaptionText>
          <SubtitleText css={styles.counter} styleType="subtitle-01-medium" component="p">{completedCount} / {totalCount}</SubtitleText>
        </div>
        <Button<"button"> onClick={() => setIsBadgesDrawerOpened(true)} styleType="secondarySimple">Alle ansehen</Button>
      </div>
    </div>
  );
};

export default ProfileBadgesBlockHead;
