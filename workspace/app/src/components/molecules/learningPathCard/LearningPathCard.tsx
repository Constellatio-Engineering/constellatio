"use client";

import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitInProgress } from "@/components/Icons/LearningPathUnitInProgress";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";

import { type IGenLearningPathUnit } from "@constellatio/cms/generated-types";
import { appPaths } from "@constellatio/shared/paths";
import Link from "next/link";
import { type FunctionComponent } from "react";

/* import { CheckCircle2 } from 'lucide-react'; */
// import { Badge } from '@/components/ui/badge'; // Using your existing Badge component
import * as styles from "./LearningPathCard.styles";

export type cardStatusType = "completed" | "in-progress" | "upcoming";

interface LearningPathCardProps 
{
  readonly completedCount: number;
  readonly learningPathId: string;
  readonly preTitle: string;
  readonly title: string;
  readonly totalCount: number;
  readonly unit: IGenLearningPathUnit;
} 

export const LearningPathCard: FunctionComponent<LearningPathCardProps> = ({
  completedCount,
  learningPathId,
  preTitle,
  title,
  totalCount,
  unit
}) =>
{
  let status: cardStatusType;

  if(completedCount === 0)
  {
    status = "upcoming";
  }
  else if(completedCount === totalCount)
  {
    status = "completed";
  }
  else
  {
    status = "in-progress";
  }

  const getProgressState = (status: cardStatusType) =>
  {
    switch (status) 
    {
      case "in-progress":
        return "solving-case";
      case "upcoming":
        return "not-started";
      default:
        return "completed";
    }
  };
  
  return (
    <Link href={`${appPaths.learningPaths}/${learningPathId}#${unit.id}`} css={styles.wrapper(status)}>
      <div css={[styles.iconWrapper, status === "completed" && styles.iconWrapperCompleted]}>
        {status === "completed" && <LearningPathUnitCompleted size={110}/>}
        {status === "in-progress" && <LearningPathUnitInProgress size={110}/>}
        {status === "upcoming" && <LearningPathUnitUpcoming size={110}/>}
      </div>
      <div>
        <p css={styles.preTitle}>{preTitle}</p>
        <p title={title} css={styles.title}>{title}</p>
        <p css={styles.preTitle}>{completedCount} / {totalCount}</p>
      </div>
      <div css={styles.statusLabelWrapper}>
        <StatusLabel progressState={getProgressState(status)}/>
      </div>
    </Link>
  );
};
