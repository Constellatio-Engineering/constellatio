import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./MenuTab.styles";
import { CaptionText } from "../CaptionText/CaptionText";

export interface IMenuTabProps
{
  readonly active?: boolean;
  readonly disabled?: boolean;
  readonly icon?: React.ReactNode;
  readonly title: string;
}

const MenuTab: FunctionComponent<IMenuTabProps> = ({
  active,
  disabled,
  icon,
  title
}) => 
{
  const theme = useMantineTheme();
  return (title || icon) ? (
    <div css={styles.menuTabStyles({ active, disabled, theme })}>
      <CaptionText styleType="caption-01-bold" component="span">{icon && icon}{title}</CaptionText>
    </div>
  ) : null;
};

export default MenuTab;
