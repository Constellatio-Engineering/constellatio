import React, { type FunctionComponent } from "react";

import * as styles from "./MenuListItem.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { useMantineTheme } from "@mantine/styles";

// make this interface accepts a button tag attributes
interface MenuListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  readonly title:string;
  readonly selected:boolean;
  readonly icon?: React.ReactNode;
}

const MenuListItem: FunctionComponent<MenuListItemProps> = ({ title, selected, icon,...props }) => {
  const theme = useMantineTheme();
  return (
    <button {...props} css={styles.wrapper({theme, selected})}>
      {icon && icon}
      <BodyText styleType={"body-01-medium"} component="span">{title}</BodyText>
    </button>
  );
};

export default MenuListItem;
