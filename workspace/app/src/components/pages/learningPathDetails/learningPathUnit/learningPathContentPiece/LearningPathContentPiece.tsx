import Label from "@/components/atoms/label/Label";
import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { ArticleIcon } from "@/components/Icons/ArticleIcon";
import { CaseIcon } from "@/components/Icons/CaseIcon";
import { type LearningPathUnitProps } from "@/components/pages/learningPathDetails/learningPathUnit/LearningPathUnit";
import { queryParams } from "@/utils/query-params";

import { appPaths } from "@constellatio/shared/paths";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./LearningPathContentPiece.styles";

export type contentPieceStatusType = "completed" | "in-progress" | "upcoming";

type Props = LearningPathUnitProps["unit"]["contentPieces"][number] & {
  readonly learningPathId: string;
  readonly unitId: string;
};

export const LearningPathContentPiece: FunctionComponent<Props> = ({
  __typename: contentPieceType,
  id,
  learningPathId,
  progressState,
  title,
  unitId
}) =>
{
  const variant = contentPieceType === "Case" ? "case" : "dictionary";
  const linkTarget = variant === "case" ? appPaths.cases : appPaths.dictionary;

  return (
    <Link
      href={(`${linkTarget}/${id}?${queryParams.referringLearningPath}=${learningPathId}&${queryParams.referringLearningPathUnit}=${unitId}`)}
      css={styles.wrapper(progressState === "completed")}>
      <div css={styles.iconWrapper}>
        {variant === "case" ? <CaseIcon size={66}/> : <ArticleIcon size={66}/>}
      </div>
      <div>
        <Label variant={variant}/>
        <p title={title || ""} css={styles.title}>{title}</p>
      </div>
      <div css={styles.statusLabelWrapper}>
        <StatusLabel progressState={progressState} variant={variant}/>
      </div>
    </Link>
  );
};
