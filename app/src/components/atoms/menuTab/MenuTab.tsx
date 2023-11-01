import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./MenuTab.styles";
import { CaptionText } from "../CaptionText/CaptionText";

export interface IMenuTabProps extends React.HTMLProps<HTMLDivElement> 
{
  readonly active?: boolean;
  readonly disabled?: boolean;
  readonly icon?: React.ReactNode;
  readonly number?: number;
  readonly title: string;
}

const MenuTab: FunctionComponent<IMenuTabProps> = ({
  active,
  disabled,
  icon,
  number,
  title,
  ...props
}) => 
{
  const theme = useMantineTheme();
  return title || icon ? (
    <div {...props} css={styles.menuTabStyles({ active, disabled, theme })}>
      <CaptionText styleType="caption-01-bold" component="p" tt="uppercase">
        {icon && icon}
        {title}{" "}
        {number !== null && number !== undefined && ( 
          <span css={styles.number}>({number})</span>
        )}
      </CaptionText>
    </div>
  ) : null;
};

export default MenuTab;
