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
  let defaultTitle: string;

  switch (variant)
  {
    case "dictionary":
    {
      defaultTitle = "Lexikon";
      break;
    }
    case "case":
    {
      defaultTitle = "Fälle";
      break;
    }
    case "forum":
    {
      defaultTitle = "Forum";
      break;
    }
    default:
    {
      defaultTitle = "Lexikon";
      break;
    }
  }

  return (
    <div css={styles.wrapper({ variant })}>
      <CaptionText styleType="caption-01-medium" component="p">{title ?? defaultTitle ?? children}</CaptionText>
    </div>
  );
};

export default Label;
