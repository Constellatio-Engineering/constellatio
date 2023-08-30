import { Svg } from "@/basic-components/SVG/Svg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import type { IGenCategory } from "@/services/graphql/__generated/sdk";

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
}) => (
  <button
    css={styles.wrapper}
    type="button"
    className={selected ? "selected" : ""}>
    {icon && icon?.src && <Svg className="icon" src={icon?.src}/>}
    {title && <BodyText styleType="body-01-medium" component="p">{title}{itemsNumber !== null && itemsNumber !== undefined && <span className="counter"> ({itemsNumber})</span>}</BodyText>}
  </button>
);

export default CategoryTab;
