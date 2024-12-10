import { Medal } from "@/components/Icons/Medal";
import { Unit } from "@/components/Icons/Unit";
import { Richtext } from "@/components/molecules/Richtext/Richtext";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { type FunctionComponent } from "react";

import * as sharedStyles from "../LearningPathDetails.styles";
import * as styles from "./LearningPathHeader.styles";

type Props = Pick<IGenLearningPath, "description" | "estimatedDuration" | "title"> & {
  readonly totalTasks: number;
};

export const LearningPathHeader: FunctionComponent<Props> = ({
  description,
  estimatedDuration,
  title,
  totalTasks,
}) => 
{
  const durationInMinutes = estimatedDuration ?? 0;
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return (
    <div css={[sharedStyles.card, styles.wrapper]}>
      <div>
        <div css={styles.UnitIconAndTotalTaskWrapper}>
          <Unit size={100}/>
          <div css={styles.totalTasksNotificationWrapper}>
            <span css={styles.totalTasksNotification}>{totalTasks}</span>
          </div>
        </div>
      </div>
      <Title order={1}>{title}</Title>
      <Richtext data={description}/>
      <div css={styles.metricsWrapper}>
        <div css={styles.metricItem}>
          <div css={styles.metricIcon}>
            <IconClock size={24}/>
          </div>
          <div css={styles.metricText}>
            <span css={styles.metricLabel}>Dauer</span>
            <span css={styles.metricValue}>{hours}:{minutes}h</span>
          </div>
        </div>
        <div css={styles.metricItem}>
          <div css={styles.metricIcon}>
            <Medal size={24}/>
          </div>
          <div css={styles.metricText}>
            <span css={styles.metricLabel}>Inhalt</span>
            <span css={styles.metricValue}>{totalTasks} Aufgaben</span>
          </div>
        </div>
      </div>
    </div>
  );
};
