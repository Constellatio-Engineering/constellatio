import { Richtext } from "@/components/molecules/Richtext/Richtext";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathHeader.styles";
import { IconClock } from "@tabler/icons-react";
import { Unit } from "@/components/Icons/Unit";

type Props = Pick<
  IGenLearningPath,
  "description" | "estimatedDuration" | "title"
> & {
  readonly totalTasks: number;
};

export const LearningPathHeader: FunctionComponent<Props> = ({
  description,
  estimatedDuration,
  title,
  totalTasks,
}) => {
  return (
    <div css={[sharedStyles.card, styles.wrapper]}>
      <div>
        <div css={styles.UnitIconAndTotalTaskWrapper}>
          <Unit />
          <div css={styles.totalTasksNotificationWrapper}>
            <span css={styles.totalTasksNotification}>{totalTasks}</span>
          </div>
        </div>
      </div>

      <Title order={1}>{title}</Title>

      <Richtext data={description} />

      <div css={styles.metricsWrapper}>
        <div css={styles.metricItem}>
          <div css={styles.metricIcon}>
            <IconClock size={24} />
          </div>
          <div css={styles.metricText}>
            <span css={styles.metricLabel}>Duration</span>
            <span css={styles.metricValue}>{estimatedDuration}</span>
          </div>
        </div>
        <div css={styles.metricItem}>
          <div css={styles.metricIcon}>?</div>
          <div css={styles.metricText}>
            <span css={styles.metricLabel}>Practice</span>
            <span css={styles.metricValue}>{totalTasks}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
