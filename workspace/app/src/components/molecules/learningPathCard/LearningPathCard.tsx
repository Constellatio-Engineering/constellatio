"use client";

import Label from "@/components/atoms/label/Label";
import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { LearningPathUnitCompleted } from "@/components/Icons/LearningPathUnitCompleted";
import { LearningPathUnitUpcoming } from "@/components/Icons/LearningPathUnitUpcoming";

import { IGenLearningPath, type IGenLearningPathUnit } from "@constellatio/cms/generated-types";
import { appPaths } from "@constellatio/shared/paths";
import { Paper, Text, Stack } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { type FunctionComponent } from "react";
/* import { CheckCircle2 } from 'lucide-react'; */
// import { Badge } from '@/components/ui/badge'; // Using your existing Badge component

import * as styles from "./LearningPathCard.styles";

interface LearningPathCardProps 
{
  readonly completedCount: number;
  readonly learningPathId: string;
  readonly preTitle: string;
  readonly status: "completed" | "in-progress" | "upcoming";
  readonly title: string;
  readonly totalCount: number;
  readonly unit: IGenLearningPathUnit;
} 

export const LearningPathCard: FunctionComponent<LearningPathCardProps> = ({
  completedCount,
  learningPathId,
  preTitle,
  status,
  title,
  totalCount,
  unit
}) =>
{
  return (
    <Link href={`${appPaths.learningPaths}/${learningPathId}#${unit.id}`} css={styles.wrapper}>
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
