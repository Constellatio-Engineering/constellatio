import { BodyText } from "@/components/atoms/BodyText/BodyText";
import type { IGenCategory } from "@/services/graphql/__generated/sdk";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";
import { Svg } from "../../../basic-components/SVG/Svg";
interface IProps extends IGenCategory
{
  readonly itemsNumber: number;
  readonly selected?: boolean;
}

const CategoryTab: FunctionComponent<IProps> = ({
  icon,
  itemsNumber,
  selected,
  title
}) => 
{
  const [isSelected, setIsSelected] = React.useState<boolean>(selected || false);
  const theme = useMantineTheme(); // or however you retrieve your theme

  return (
    <button
      type="button"
      css={styles.wrapper}
      className={isSelected ? "selected" : ""}
      onClick={() => setIsSelected(!isSelected)}>
      <Svg css={styles.icon({ isSelected, theme })} src={icon?.src} className="icon"/>
      {title && <BodyText styleType="body-01-medium" component="p">{title} <span css={styles.counter}>({itemsNumber})</span></BodyText>}
    </button>
  );
};

export default CategoryTab;
