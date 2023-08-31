import React, { type PropsWithChildren, type FunctionComponent } from "react";

import * as styles from "./Label.styles";
import { useMantineTheme } from "@mantine/core";
import { CaptionText } from "../CaptionText/CaptionText";

export interface ILabelProps extends PropsWithChildren
{
  readonly variant:"dictionary" | "case" | "forum" | "neutral";
  readonly title?: string;
}

const Label: FunctionComponent<ILabelProps> = ({ children,variant,title }) => {
  const theme = useMantineTheme()
  return (
    <div css={styles.wrapper({theme,variant})}>
      <CaptionText styleType="caption-01-medium">{title??children}</CaptionText>
    </div>
  );
};

export default Label;
