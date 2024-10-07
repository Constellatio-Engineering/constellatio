import React, { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./Label.styles";
import { CaptionText } from "../CaptionText/CaptionText";

export interface ILabelProps extends PropsWithChildren
{
  readonly title?: string;
  readonly variant: "dictionary" | "case" | "forum" | "neutral";
}

const Label: FunctionComponent<ILabelProps> = ({ children, title, variant }) => 
{
  return (
    <div css={styles.wrapper({ variant })}>
      <CaptionText styleType="caption-01-medium" component="p">{title ?? children}</CaptionText>
    </div>
  );
};

export default Label;
