import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialsLabel.styles";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import { MoveDownIcon } from "../Icons/MoveDown";
import { NoteIcon } from "../Icons/Note";

interface MaterialsLabelProps
{
  readonly title: string;
  readonly variant: "paper" | "file";
}

const MaterialsLabel: FunctionComponent<MaterialsLabelProps> = ({ title, variant }) => 
{
  return (
    <div css={styles.wrapper}>
      {variant === "paper" ? (
        <MoveDownIcon/>
      ) : (
        <NoteIcon/>
      )}
      <CaptionText styleType="caption-01-medium">{title}</CaptionText>
    </div>
  );
};

export default MaterialsLabel;
