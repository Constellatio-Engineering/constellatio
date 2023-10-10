import React, { type FunctionComponent } from "react";

import * as styles from "./../profileBadgesBlock/ProfileBadgesBlock.styles";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import IconButton from "../atoms/iconButton/IconButton";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import { MedalIcon } from "../Icons/MedalIcon";

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
