import { BodyText } from "@/components/atoms/BodyText/BodyText";

import { type FunctionComponent } from "react";

import * as styles from "./MenuListItem.styles";

// make this interface accepts a button tag attributes
interface MenuListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  readonly icon?: React.ReactNode;
  readonly selected?: boolean;
  readonly title: string;
}

const MenuListItem: FunctionComponent<MenuListItemProps> = ({
  icon,
  selected,
  title,
  ...props
}) => 
{
  return (
    <button type="button" {...props} css={styles.wrapper({ selected })}>
      {icon && icon}
      <BodyText styleType="body-01-medium" component="span">{title}</BodyText>
    </button>
  );
};

export default MenuListItem;
