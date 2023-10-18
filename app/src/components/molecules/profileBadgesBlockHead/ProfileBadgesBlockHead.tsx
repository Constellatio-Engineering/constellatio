import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { MedalIcon } from "@/components/Icons/MedalIcon";

import React, { type FunctionComponent } from "react";

import * as styles from "./../../organisms/profileBadgesBlock/ProfileBadgesBlock.styles";

const ProfileBadgesBlockHead: FunctionComponent = () => 
{
  return (
    <div css={styles.badgesBlockHeader}>
      <IconButton icon={<MedalIcon/>} size="big"/>
      <div>
        <CaptionText css={styles.title} styleType="caption-01-medium" component="p">Badges</CaptionText>
        <SubtitleText css={styles.counter} styleType="subtitle-01-medium" component="p">0 / 0</SubtitleText>
      </div>
    </div>
  );
};

export default ProfileBadgesBlockHead;
