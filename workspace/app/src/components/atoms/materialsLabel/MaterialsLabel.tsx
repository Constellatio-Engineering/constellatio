import { Heart } from "@/components/Icons/Heart";
import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { NoteIcon } from "@/components/Icons/Note";

import { type FunctionComponent } from "react";

import * as styles from "./MaterialsLabel.styles";
import { CaptionText } from "../CaptionText/CaptionText";

interface MaterialsLabelProps
{
  readonly title: string;
  readonly variant: "paper" | "file" | "heart";
}

const MaterialsLabel: FunctionComponent<MaterialsLabelProps> = ({ title, variant }) => 
{
  return (
    <div css={styles.wrapper}>
      {variant === "paper" ? (
        <NoteIcon/>
      ) : variant === "file" ? (
        <MoveDownIcon/>
      ) : (
        <Heart size={14}/>
      )}
      <CaptionText styleType="caption-01-medium">{title}</CaptionText>
    </div>
  );
};

export default MaterialsLabel;
