import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { NoteIcon } from "@/components/Icons/Note";

import React, { type FunctionComponent } from "react";

import * as styles from "./MaterialsLabel.styles";
import { CaptionText } from "../CaptionText/CaptionText";

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
        <NoteIcon/>
      ) : (
        <MoveDownIcon/>
      )}
      <CaptionText styleType="caption-01-medium">{title}</CaptionText>
    </div>
  );
};

export default MaterialsLabel;
