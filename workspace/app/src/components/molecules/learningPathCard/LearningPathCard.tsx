import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";
import { type LearningPathCarouselProps } from "@/components/molecules/learningPathCarousel/LearningPathCarousel";

import { appPaths } from "@constellatio/shared/paths";
import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./LearningPathCard.styles";

type Props = LearningPathCarouselProps["units"][number] & {
  readonly learningPathId: string;
  readonly preTitle: string;
};

export const LearningPathCard: FunctionComponent<Props> = ({
  completedTasksCount,
  id: unitId,
  learningPathId,
  preTitle,
  progressState,
  title,
  totalTasksCount
}) =>
{
  return (
    <Link href={`${appPaths.learningPaths}/${learningPathId}#${unitId}`} css={styles.wrapper(progressState)}>
      <div css={[styles.iconWrapper, progressState === "completed" && styles.iconWrapperCompleted]}>
        {progressState === "completed" && <LearningPathUnitCompleted size={100}/>}
        {progressState === "in-progress" && <LearningPathUnitInProgress size={100}/>}
        {progressState === "upcoming" && <LearningPathUnitUpcoming size={100}/>}
      </div>
      <div>
        <p css={styles.preTitle}>{preTitle}</p>
        <p title={title ?? "Fehler: Kein Titel"} css={styles.title}>{title}</p>
        <p css={styles.preTitle}>{completedTasksCount} / {totalTasksCount}</p>
      </div>
      <div css={styles.statusLabelWrapper}>
        <StatusLabel progressState={progressState}/>
      </div>
    </Link>
  );
};
