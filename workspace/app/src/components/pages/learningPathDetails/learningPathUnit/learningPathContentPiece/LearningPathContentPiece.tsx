import Label from "@/components/atoms/label/Label";
import StatusLabel from "@/components/atoms/statusLabel/StatusLabel";
import { type cardStatusType } from "@/components/molecules/learningPathCard/LearningPathCard";

import { type IGenLearningPathUnit_ContentPieces } from "@constellatio/cms/generated-types";
import { appPaths } from "@constellatio/shared/paths";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./LearningPathContentPiece.styles";

export type contentPieceStatusType = "completed" | "in-progress" | "upcoming";

type Props = {
  readonly contentPiece: IGenLearningPathUnit_ContentPieces;
  readonly status: contentPieceStatusType;
};

export const LearningPathContentPiece: FunctionComponent<Props> = ({ contentPiece, status }) =>
{
  const variant = contentPiece.__typename === "Case" ? "case" : "dictionary";

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
    <Link href={variant === "case" ? `${appPaths.cases}/${contentPiece.id}` : `${appPaths.dictionary}/${contentPiece.id}`} css={styles.wrapper(status)}>
      <div css={styles.iconWrapper}>
        {variant === "case" ? <div>Case Icon</div> : <div>Dictionary Icon</div>}
      </div>
      <div>
        <Label variant={variant}/>
        <p title={contentPiece.title || ""} css={styles.title}>{contentPiece.title}</p>
      </div>
      <div css={styles.statusLabelWrapper}>
        <StatusLabel progressState={getProgressState(status)} variant={variant}/>
      </div>
    </Link>
  );
};
