import { Svg } from "@/basic-components/SVG/Svg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import type { IGenCategory } from "@/services/graphql/__generated/sdk";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CategoryTab.style";

export interface CategoryTabProps extends IGenCategory
{
  readonly itemsNumber: number;
  readonly selected?: boolean;
}

const CategoryTab: FunctionComponent<CategoryTabProps> = ({
  icon,
  itemsNumber,
  selected,
  title
}) => 
{
  const theme = useMantineTheme(); // or however you retrieve your theme

  return (
    <button
      type="button"
      css={styles.wrapper}
      className={selected ? "selected" : ""}>
      <Svg css={styles.icon({ isSelected: selected, theme })} src={icon?.src} className="icon"/>
      {title && <BodyText styleType="body-01-medium" component="p">{title} <span css={styles.counter}>({itemsNumber})</span></BodyText>}
    </button>
  );
};

export default CategoryTab;
