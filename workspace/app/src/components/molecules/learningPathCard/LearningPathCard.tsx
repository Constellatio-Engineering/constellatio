"use client";

import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";

import { type IGenLearningPathUnit } from "@constellatio/cms/generated-types";
import { appPaths } from "@constellatio/shared/paths";
import Link from "next/link";
import { type FunctionComponent } from "react";

/* import { CheckCircle2 } from 'lucide-react'; */
// import { Badge } from '@/components/ui/badge'; // Using your existing Badge component
import * as styles from "./LearningPathCard.styles";

type statusType = "completed" | "in-progress" | "upcoming";

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
  let status: statusType;

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

  return (
    <Link href={`${appPaths.learningPaths}/${learningPathId}#${unit.id}`} css={[styles.wrapper, status === "completed" && styles.wrapperCompleted, status === "in-progress" && styles.wrapperInProgress]}>
      <div css={styles.iconWrapper}>
        {status === "completed" ? (
          <LearningPathUnitCompleted size={110}/>
        ) : (
          <LearningPathUnitUpcoming size={110}/>
        )}
      </div>
      <div>
        <p css={styles.preTitle}>{preTitle}</p>
        <p title={title} css={styles.title}>{title}</p>
        <p css={styles.preTitle}>{completedCount} / {totalCount}</p>
      </div>
    </Link>
  );
};
