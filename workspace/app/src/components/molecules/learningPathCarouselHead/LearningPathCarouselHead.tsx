import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { MedalIcon } from "@/components/Icons/MedalIcon";

import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "../../organisms/profileBadgesBlock/ProfileBadgesBlock.styles";

type Props = {
  readonly completedCount: number;
  readonly isLoading: boolean;
  readonly totalCount: number;
};

const LearningPathCarouselHead: FunctionComponent<Props> = ({ completedCount, isLoading, totalCount }) =>
{
  return (
    <div css={styles.badgesBlockHeader}>
      <IconButton icon={<MedalIcon/>} style={{ pointerEvents: "none" }} size="big"/>
      <div css={styles.headerLayout}>
        <div>
          <CaptionText css={styles.title} styleType="caption-01-medium" component="p">LEKTION</CaptionText>
          {isLoading ? (
            <Skeleton height={20} mt={4} width={50}/>
          ) : (
            <SubtitleText css={styles.counter} styleType="subtitle-01-medium" component="p">
              {completedCount} / {totalCount}
            </SubtitleText>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPathCarouselHead;
