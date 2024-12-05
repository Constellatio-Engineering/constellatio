import Label from "@/components/atoms/label/Label";

import { type IGenLearningPathUnit_ContentPieces } from "@constellatio/cms/generated-types";
import { type FunctionComponent } from "react";

import * as styles from "./LearningPathContentPiece.styles";

type Props = {
  readonly contentPiece: IGenLearningPathUnit_ContentPieces;
  readonly isCompleted: boolean;
};

export const LearningPathContentPiece: FunctionComponent<Props> = ({ contentPiece, isCompleted }) =>
{
  // TODO @Noah: Je nachdem was besser ausssieht kann man das Label auch machen wie im Design

  return (
    <div css={[styles.wrapper, isCompleted && styles.completed]}>
      <Label variant={contentPiece.__typename === "Case" ? "case" : "dictionary"}/>
      <p>{contentPiece.title}</p>
    </div>
  );
};
